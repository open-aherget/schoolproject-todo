<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Todo;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Todo>
 */
class TodoRepository extends ServiceEntityRepository
{
    /**
     * Initializes the repository with the Doctrine manager registry.
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Todo::class);
    }

    /**
     * Returns all todo items ordered ascending by their identifier.
     *
     * @return list<Todo>
     */
    public function findAllOrdered(): array
    {
        return $this->findBy([], ['id' => 'ASC']);
    }
}
