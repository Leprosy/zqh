<?php
/* Setup */
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';
$app = new \Slim\App(['settings' => ['displayErrorDetails' => true]]);


/* Routes */
// Home
$app->get("/", function(Request $request, Response $response) use ($app) {
    return $response->withJson(array("version" => \Lib\Config::VERSION));
});

// Map
$app->get("/map/{rooms}", function(Request $request, Response $response) use ($app) {
    $rooms = $request->getAttribute("rooms");
    $map = new \Lib\Map(60, 60);
    $map->generate($rooms);

    return $response->withJson(array("map" => $map->getJSON()));
});


/* Run backend */
$app->run();
