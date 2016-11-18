//define(["./cart", "./inventory"], function(cart, inventory) {
define(function() {
    var Engine = {
        size: 10
    };

    // Rescales the canvas accordingly to parent size
    function rescale() {
        console.info("zqh: Rescaling...");
        var cparent = $("canvas").parent();
        $("canvas").width(cparent.width());
        $("canvas").height(cparent.width() * 0.8);
    };

    // Init the 3d engine
    function init3d() {
        // Init components
        console.group("zqh: 3d components...");

        // Get canvas, set size
        rescale();
        Engine.canvas = document.getElementById("3d");
        Engine.engine = new BABYLON.Engine(Engine.canvas, true);
        Engine.scene = new BABYLON.Scene(Engine.engine);
        Engine.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -Engine.size), Engine.scene);
        Engine.camera.attachControl(Engine.canvas, true);

        // Lights
        /* console.log("zqh: light");
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

        // Skydome(WIP)
        console.log("zqh: sky");

        // Post process
        var px = 8; //Pixel size
        BABYLON.Effect.ShadersStore.colorifyVertexShader = "precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 worldViewProjection;varying vec2 vUV;void main(){gl_Position=worldViewProjection*vec4(position,1.),vUV=uv;}";
        BABYLON.Effect.ShadersStore.colorifyPixelShader = "precision highp float;varying vec2 vUV;uniform sampler2D textureSampler;uniform vec3 color;void main(){vec4 texel=texture2D(textureSampler,vUV);vec3 luma=vec3(.299,.587,.114);float v=dot(texel.xyz,luma);gl_FragColor=vec4(v*color,texel.w);}";
        BABYLON.Effect.ShadersStore.julianVertexShader = "precision highp float;attribute vec3 position;attribute vec2 uv;uniform mat4 worldViewProjection;varying vec2 vUV;void main(){gl_Position=worldViewProjection*vec4(position,1.),vUV=uv;}";
        BABYLON.Effect.ShadersStore.julianPixelShader = "precision highp float;varying vec2 vUV;uniform sampler2D textureSampler;void main(){float pixel_w=" + px + ".,pixel_h=" + px + ".,rt_w=3000.,rt_h=3000.;vec3 tc=vec3(1.,0.,0.);float dx=pixel_w*(1./rt_w),dy=pixel_h*(1./rt_h);vec2 coord=vec2(dx*floor(vUV.x/dx),dy*floor(vUV.y/dy));tc=texture2D(textureSampler,coord).xyz;gl_FragColor=vec4(tc,1.);}";
        var postProcess0 = new BABYLON.PassPostProcess("sc", 1.0, Game.camera);
        var julian = new BABYLON.PostProcess("julian", "julian", null, null, 1, Game.camera);

        */
        // Finish
        Engine.engine.runRenderLoop(function () {
            // Render scene
            Engine.scene.render();
        });

        console.info("zqh: 3d components...OK");
        console.groupEnd();
    };

    return {
        // Init everything 3d
        init: function() {
            console.info("zqh: Initializing 3d engine...");
            init3d();
            //initAssets();

            window.addEventListener('resize', function() {
                rescale();
                Engine.engine.resize();
            });
        },

        // Debug - returns the engine internals
        status: function() {
            console.log("Status", Engine);
        }
    }
});