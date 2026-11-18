<?php

declare(strict_types=1);

namespace App\Service;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;

class TodoService
{
    /**
     * Initializes the service with Doctrine entity manager and todo repository.
     */
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly TodoRepository $todoRepository,
    ) {
    }

    /**
     * Retrieves all todo items in ascending order.
     *
     * @return list<Todo>
     */
    public function getAllTodos(): array
    {
        return $this->todoRepository->findAllOrdered();
    }

    /**
     * Creates and persists a new todo item with the given title.
     */
    public function createTodo(string $title): Todo
    {
        $todo = new Todo();
        $todo->setTitle(trim($title));

        $this->entityManager->persist($todo);
        $this->entityManager->flush();

        return $todo;
    }
}
