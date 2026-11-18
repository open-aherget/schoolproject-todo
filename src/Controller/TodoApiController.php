<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Todo;
use App\Service\TodoService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/todos', name: 'api_todos_')]
class TodoApiController extends AbstractController
{
    /**
     * Initializes the controller with the todo business service.
     */
    public function __construct(
        private readonly TodoService $todoService,
    ) {
    }

    /**
     * Returns all todo items as a JSON list.
     */
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $todos = $this->todoService->getAllTodos();
        $payload = array_map(
            fn (Todo $todo): array => $this->serializeTodo($todo),
            $todos
        );

        return $this->json($payload, Response::HTTP_OK);
    }

    /**
     * Creates a new todo item from the incoming JSON payload.
     */
    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        try {
            $data = $request->toArray();
        } catch (JsonException) {
            return $this->json(
                ['message' => 'Invalid JSON payload.'],
                Response::HTTP_BAD_REQUEST
            );
        }

        $title = $data['title'] ?? null;

        if (!is_string($title) || trim($title) === '') {
            return $this->json(
                ['message' => 'Title must not be empty.'],
                Response::HTTP_BAD_REQUEST
            );
        }

        $todo = $this->todoService->createTodo($title);

        return $this->json(
            $this->serializeTodo($todo),
            Response::HTTP_CREATED
        );
    }

    /**
     * Maps a Todo entity into the JSON structure expected by the frontend client.
     *
     * @return array{id: int|null, title: string, completed: bool}
     */
    private function serializeTodo(Todo $todo): array
    {
        return [
            'id' => $todo->getId(),
            'title' => $todo->getTitle(),
            'completed' => $todo->isCompleted(),
        ];
    }
}
