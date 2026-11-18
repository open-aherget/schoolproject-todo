<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\TodoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TodoRepository::class)]
class Todo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private string $title = '';

    #[ORM\Column]
    private bool $completed = false;

    /**
     * Gets the unique identifier of the todo item.
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * Gets the title of the todo item.
     */
    public function getTitle(): string
    {
        return $this->title;
    }

    /**
     * Sets the title of the todo item.
     */
    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Checks whether the todo item is marked as completed.
     */
    public function isCompleted(): bool
    {
        return $this->completed;
    }

    /**
     * Sets the completion state of the todo item.
     */
    public function setCompleted(bool $completed): static
    {
        $this->completed = $completed;

        return $this;
    }
}
