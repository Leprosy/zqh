<?php
/* Setup */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);

// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
    $view = new \Slim\Views\Twig('templates/');
    $view->addExtension(new \Slim\Views\TwigExtension(
            $container['router'],
            $container['request']->getUri()
    ));

    return $view;
};

/* Routes */
// Home
$app->get("/", function(Request $request, Response $response) use ($app) {
    return $this->view->render($response, "home.html", ["name" => "Taldo"]);
});


/* Run */
$app->run();
