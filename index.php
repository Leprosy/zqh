<?php
/**
 * App setup
 */
//Configuration parameters
$config = ['settings' => ['displayErrorDetails' => true,],];

// Autoload & app object
require "vendor/autoload.php";
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
$app = new \Slim\App($config);
$container = $app->getContainer();

// Templating
$container["view"] = function($container) {
    $view = new \Slim\Views\Twig('templates/', ['cache' => false]); //'path/to/cache']);
    $view->addExtension(new \Slim\Views\TwigExtension(
            $container['router'],
            $container['request']->getUri()
    ));

    return $view;
};



/**
 * Routes
 **/
// Pre dispatch(does nothing for now)
$app->add(function ($request, $response, $next) {
    $response = $next($request, $response);
    return $response;
});

// Home
$app->get("/", function(Request $request, Response $response) {
    return $this->view->render($response, "home.php", ["name" => "Taldo"]);
})->setName("home");

// Map
$app->get("/map/{rooms}", function(Request $request, Response $response) {
    $rooms = $request->getAttribute("rooms");
    $map = new \Lib\Map(60, 60);
    $map->generate($rooms);

    return $response->withJson(array("map" => $map->getJSON()));
});



/**
 * Run app
 **/
$app->run();
