<!DOCTYPE html>
<html>
    <head>
        <style>
        </style>
        <meta charset="UTF-8">
        <title>zqh</title>
    </head>

    <body>
        <div id="game"></div>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <!-- <script src="js/game.js"></script> -->
        <script src="js/components.js"></script>
        <script src="js/utils.js"></script>
        <script src="js/crafty.js"></script>
        <script src="http://threejs.org/build/three.min.js"></script>
<script>
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
</script>
    </body>
</html>