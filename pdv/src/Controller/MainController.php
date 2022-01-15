<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index(): Response
    {
        return $this->render('homepage/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }

    /**
     * @Route("/schedule", name="schedule")
     */
    public function schedule(): Response
    {
        return $this->render('schedule/index.html.twig', [
            'controller_name' => 'MainController',
        ]);
    }
}
