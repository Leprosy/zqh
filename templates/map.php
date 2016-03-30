<!DOCTYPE html>
<html>
    <head>
        <style>
        </style>
        <meta charset="UTF-8">
        <title>zqh</title>
    </head>

    <body>
        <h3>Map</h3>
        <div id="game"></div>

        <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/crafty/0.7.0/crafty-min.js"></script>

        <script>
        var tile = 8;
        var map = <?php echo json_encode($map) ?>;
        Crafty.init(map.width * tile, map.height * tile, 'game');
        Crafty.background('#004');
        console.log(map);

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

        </script>
    </body>
</html>

