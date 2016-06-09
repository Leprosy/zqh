/**
 * Game stuff
 */
var Game = {};

// Map
Game.map = null;

// Parameters
Game.size = 10;
Game.moveSpeed = 250;

// Assets data
Game.materials = {};

// Flags
/* Game.isMoving = false;
Game.isPlaying = false; */
Game.debug = false;

// @TODO: Should refactor these into a class?
Game.player = {};
Game.player.x = 0;
Game.player.y = 0;


/**
 * Generate the 2D map
 */
Game.render2dMap = function(map) {
    var tile = $("#map").width() / map.width;
    Game.map2dSize = tile;

    Crafty.init(map.width * tile, map.height * tile, "map");
    Crafty.background('#004');

    for (i = 0; i < map.floors.length; ++i) {
        var floor = map.floors[i];

        Crafty.e("2D, Canvas, Color")
              .attr({ x: floor.x * tile, y: floor.y * tile, w: tile - 1, h: tile - 1 })
              .color("#666666");
    }

    for (i = 0; i < map.walls.length; ++i) {
        var wall = map.walls[i];

        Crafty.e("2D, Canvas, Color")
              .attr({ x: wall.x * tile, y: wall.y * tile, w: tile - 1, h: tile - 1 })
              .color("#ffffff");
    }

    //for (i = 0; i < map.objects.length; ++i) {}
    Game.map2dPoint = Crafty.e("2D, Canvas, Color")
                            .attr({ x: map.start.x * tile, y: map.start.y * tile, w: tile - 1, h: tile - 1 })
                            .color("#00ff00");
}

/**
 * Initializes 3D engine
 */
Game.init = function() {
    console.info("zqh: initializing...");
    Game.init3d();
    Game.initAssets();
    //window.addEventListener('resize', function() { engine.resize(); }); <-- resize event
};

/**
 * Init 3d core components
 */
Game.init3d = function() {
    // Init components
    console.info("zqh: 3d components...");

    Game.canvas = document.getElementById("3d");
    Game.engine = new BABYLON.Engine(Game.canvas, true);
    Game.scene = new BABYLON.Scene(Game.engine);
    Game.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -Game.size), Game.scene);
    Game.camera.attachControl(Game.canvas, true);
    //Game.camera.setTarget(BABYLON.Vector3.Zero());

    // Lights
    console.info("zqh: light");
    Game.amb_light = new BABYLON.DirectionalLight('light1', new BABYLON.Vector3(0, -1, 0), Game.scene);
    Game.amb_light.diffuse = new BABYLON.Color3(1, 1, 1);
    Game.amb_light.specular = new BABYLON.Color3(0, 0, 0);
    Game.amb_light.intensity = 0.2;

    Game.light = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0, 0), Game.scene);
    Game.light.diffuse = new BABYLON.Color3(1, 1, 0.8);
    Game.light.specular = new BABYLON.Color3(0.1, 0.1, 0.1);
    Game.light.intensity = 1.2;
    Game.light.range = Game.size * 6;

    Game.shadowGen = new BABYLON.ShadowGenerator(1024, Game.amb_light);

    // Skydome
    console.info("zqh: sky");

    // Finish
    Game.engine.runRenderLoop(function () {
        Game.render();
    });

    console.info("zqh: 3d components...OK");
};

/**
 * Assets loader
 */
Game.initAssets = function() { // TODO: This need heavy refactor, to include multiple textures for each category
    console.info("zqh: loading assets...");

    // Materials
    var materialList = ["wall", "floor", "sky", "roof"];
    var manager = new BABYLON.AssetsManager(Game.scene);

    materialList.forEach(function(el, i, arr) {
        var task = manager.addTextureTask("", "img/textures/" + el + "1.png");

        task.onSuccess = function(task) {
            var material = new BABYLON.StandardMaterial("", Game.scene);
            material.diffuseTexture = task.texture;
            material.diffuseTexture.wAng = 0.5 * Math.PI;
            Game.materials[el + "1"] = material;
        }
    });

    manager.onFinish = function(tasks) {
        console.info("zqh: loading assets...OK"); // GAME CAN START AT THIS POINT
    };
    manager.onTaskSuccess = function(task) {
        console.info("zqh: loaded", task.url);
    }
    manager.onError = function(a) {
        console.error("zqh: error loading", a);
    }

    manager.load();
};

/**
 * Loads a map from the backend
*/
Game.loadMap = function(url) { // url = backend.php/map/2
    // TODO: delete previous map
    $.get(url, function(data) {
        Game.map = data.map;
        $("h1").html(data.map.name);
        Game.render2dMap(data.map);
        Game.buildMap(data.map);
        console.info("zqh: map loaded", Game.map);
    });
}

/**
 * Render a map in 3d canvas. TODO: Merge meshes/geometries?
 */
Game.buildMap = function(map) {
    // Render map meshes
    Game._buildMesh(map.floors, Game.size, 0.1, 0, "floor");
    Game._buildMesh(map.roofs, Game.size, 0.1, Game.size, "roof");
    Game._buildMesh(map.walls, Game.size, 1, Game.size / 2, "wall");

    // Render sprites: Pending
    // Testing code
    Game.sprm_alien = new BABYLON.SpriteManager("sprm_alien", "img/sprites/sprite1.png", 100, 150, Game.scene); //100 monsters, 150px cell
    Game.sprite = new BABYLON.Sprite("alien", Game.sprm_alien);

    Game.sprite.position.x = map.start.x * Game.size;
    Game.sprite.position.z = map.start.y * Game.size;
    Game.sprite.position.y = Game.size / 2;
    Game.sprite.size = 9;
    Game.sprite.playAnimation(0, 3, true, 200) //Animation from keys 0-3, true is inf.loop, 200 ms
    //Game.sprite.cellIndex = 2; //Go to key 2 of animation

    // Set player position. The first object is the starting point.
    Game.camera.position.x = map.start.x * Game.size;
    Game.camera.position.z = map.start.y * Game.size;
    Game.camera.position.y = Game.size / 2;
    Game.player.x = map.start.x;
    Game.player.y = map.start.y;
};
Game._buildMesh = function(collection, size, width, y, txt) {
    for (i = 0; i < collection.length; ++i) {
        var item = collection[i];
        var mesh = BABYLON.Mesh.CreateBox(txt + item.x + "x" + item.y, size, Game.scene);
        mesh.position.x = item.x * Game.size;
        mesh.position.z = item.y * Game.size;
        mesh.position.y = y;
        mesh.scaling.y = width;

        mesh.material = Game.materials[txt + "1"];

        Game.shadowGen.getShadowMap().renderList.push(mesh);
        mesh.receiveShadows = true;

        console.log(item);
    }
};

/**
 * 3d render update
 */
Game.render = function() {
    // Light & skydome in position
    if (!Game.debug) {
        Game.light.position.x = Game.camera.position.x;
        Game.light.position.z = Game.camera.position.z;
        Game.light.position.y = Game.size / 2;
    }

    // Render scene
    Game.scene.render();
};


/**
 * Collision with an object or wall
 
Game.checkCollision = function(x, y) {
    return (Game.map.colmap[x][y] == 1);
}

Game._drawArrow = function(origin, dir, length) {
    var length = length * Game.size;
    var hex = 0xffff00;
    var arrowHelper = new THREE.ArrowHelper(dir, origin, lenght, hex);
    Game.scene.add(arrowHelper);
}

/**
 * Player rotations and translations
 
Game.forward = function() { Game._move(-1); };
Game.backward = function() { Game._move(1); };
Game._move = function(d) {
    if (!Game.isMoving) {
        var x = Game.camera.position.x;
        var z = Game.camera.position.z;
        var vert = Math.round(Math.cos(Game.camera.rotation.y));
        var horz = Math.round(Math.sin(Game.camera.rotation.y));
        var newx = x + d * horz * Game.size;
        var newz = z + d * vert * Game.size;

        var newPx = Game.player.x + d * horz;
        var newPy = Game.player.y + d * vert;

        if (Game.checkCollision(newPx, newPy)) {;
            return;
        } else {
            Game.isMoving = true;
            Game.player.x = newPx;
            Game.player.y = newPy;
            Game.map2dPoint.x = newPx * Game.map2dSize;
            Game.map2dPoint.y = newPy * Game.map2dSize;
            var tw = new Tween(Game.camera.position).to({ x: newx, z: newz }, Game.moveSpeed)
                                                    .onFinish(function() { Game.isMoving = false })
                                                    .start();
        }
    }
};

Game.rotateRight = function() { Game._rotate(-1); };
Game.rotateLeft = function() { Game._rotate(1); };
Game._rotate = function(d) {
    if (!Game.isMoving) {
        Game.isMoving = true;
        var y = Game.camera.rotation.y;
        var tw = new Tween(Game.camera.rotation).to({ y: y + d * (Math.PI / 2) }, Game.moveSpeed)
                                                .onFinish(function() { Game.isMoving = false})
                                                .start();
    }
}

Game.keyboardHandler = function(e) {
    switch (e.keyCode) {
        case 37: // left arrow key
            Game.rotateLeft();
            e.preventDefault();
            break;
        case 38: // up arrow key
            Game.forward();
            e.preventDefault();
            break;
        case 39: // right arrow key
            Game.rotateRight();
            e.preventDefault();
        case 40: // up arrow key
            Game.backward();
            e.preventDefault();
            break;
        default:
            console.log("unmapped_keycode", e.keyCode);
    }
};




/**
 * App entry point
 */
window.onload = function() {
    //3d init
    Game.init();

    // Set keyboard handler
    //$(window).keydown(Game.keyboardHandler);
}