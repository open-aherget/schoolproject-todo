<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class FrontendController extends AbstractController
{
    /**
     * Renders the base HTML container for the React single page application.
     */
    #[Route('/app/{reactRouting}', name: 'app_frontend', requirements: ['reactRouting' => '.*'], defaults: ['reactRouting' => ''])]
    public function index(): Response
    {
        return $this->render('frontend/index.html.twig');
    }
}