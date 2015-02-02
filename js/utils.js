function init() {
    Crafty.init(Game.MAXX * Game.tile, Game.MAXY * Game.tile, 'game');
    Crafty.background('#004');
}

function generateMap(nRooms) {
    var rooms = [], ok, i, j;

    for (i = 0; i < nRooms; ++i) {
        ok = true;
        var room = { x: Math.round(Math.random() * Game.MAXX),
                     y: Math.round(Math.random() * Game.MAXY),
                     w: Math.round(Math.random() * 15) + 10,
                     h: Math.round(Math.random() * 15) + 10 }

        // Check inside map
        if (!(room.x + room.w <= Game.MAXX) || !(room.y + room.h <= Game.MAXY)) {
            ok = false;
        }

        // Check intersections
        for (j = 0; j < rooms.length; ++j) {
            var check = rooms[j];

            if ((room.x <= check.x + check.w && room.x + room.w >= check.x) &&
                (room.y <= check.y + check.h && room.y + room.h >= check.y)) {
                console.log(check, room);
                ok = false;
            }
        }

        // Attach
        if (ok) {
            rooms.push(room);
        } else {
            --i;
        }
    }

    return rooms;
}

function renderMap() {
    var i, x, y;
    var colors = ["#FF0000", "#CCCCCC", "#00FF00", "#CC44AA", "#AAFF00", "#0000FF", "#7700EE", "#0077AA"]; 

    for (i = 0; i < Game.map.length; ++i) {
        var room = Game.map[i];

        for (x = room.x; x <= room.x + room.w; ++x) {
            for (y = room.y; y <= room.y + room.h; ++y) {
                Crafty.e("2D, Canvas, Color")
                      .attr({ x: x * Game.tile, y: y * Game.tile, w: Game.tile - 2, h: Game.tile - 2 })
                      .color(colors[i]);
            }
        }
    }
}