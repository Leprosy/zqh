<?php
/* Setup */
require 'vendor/autoload.php';
$app = new \Slim\Slim();


/* Routes */
// Home
$app->get("/", function() use ($app) {
    var_dump("home");
});

// Version
$app->get("/version", function() use ($app) {
    var_dump(\Lib\Config::VERSION);
});

// Build
$app->get("/map/:rooms", function($rooms) use ($app) {
    $map = new \Lib\Map(60, 60);
    $map->generate($rooms);
    $app->render("map.php", array("map" => $map->getJSON()));
});


/* Run backend */
$app->run();