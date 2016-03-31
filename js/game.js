var Game = {};
Game.MAXX = 60;
Game.MAXY = 60;
Game.tile = 8;

window.onload = function() {
    init();
    Game.map = generateMap(10);
    renderMap();
};


/*
    var scene, camera, renderer;
    var geometry, material, mesh, light, lamp;

    init();
    animate();

    function init() {

        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        geometry = new THREE.BoxGeometry( 200, 200, 200 );
        material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );

        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );


        lamp = new THREE.Mesh( new THREE.BoxGeometry( 5, 5, 5 ),
                new THREE.MeshBasicMaterial( { color: 0xfffff, wireframe: false } ) );
        scene.add( lamp );
        lamp.position.y = 300;

        light = new THREE.PointLight(0xffffff, 1, 1000);
        light.position.set(0, 300, 0);
        scene.add(light);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );

        document.body.appendChild( renderer.domElement );
    }

    function animate() {
        requestAnimationFrame( animate );
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        renderer.render( scene, camera );
    }
*/
