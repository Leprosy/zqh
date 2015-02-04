var colors = ["#FF0000", "#CC99CC", "#00FF00", "#00CCCC", "#AAFFFF", "#0000FF", "#7700EE", "#0077AA"]; 

function init() {
    Crafty.init(Game.MAXX * Game.tile, Game.MAXY * Game.tile, 'game');
    Crafty.background('#004');
}

function generateMap(nRooms) {
    var rooms = [], ok, i, j;

    // Create main rooms
    for (i = 0; i < nRooms; ++i) {
        ok = true;
        var room = { x: Math.round(Math.random() * Game.MAXX),
                     y: Math.round(Math.random() * Game.MAXY),
                     w: Math.round(Math.random() * 8) + 8,
                     h: Math.round(Math.random() * 8) + 8 }

        // Check inside map
        if (!(room.x + room.w <= Game.MAXX) || !(room.y + room.h <= Game.MAXY)) {
            ok = false;
        }

        // Check intersections
        for (j = 0; j < rooms.length; ++j) {
            var check = rooms[j];

            if ((room.x <= check.x + check.w && room.x + room.w >= check.x) &&
                (room.y <= check.y + check.h && room.y + room.h >= check.y)) {
                //console.log(check, room);
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

    // Create corridors
    //Vertical
    var min = 9999;
    var minroom = -1;

    for (i = 1; i < nRooms; ++i) {
        if ((rooms[0].x >= rooms[i].x && rooms[0].x <= rooms[i].x + rooms[i].w) || 
            (rooms[i].x >= rooms[0].x && rooms[i].x <= rooms[0].x + rooms[0].w)) {
            var diff = Math.abs(rooms[0].y + (rooms[0].h / 2) - (rooms[i].y + (rooms[i].h / 2)));

            if (diff < min) {
                min = diff;
                minroom = i;
            }
        }
    }

    var hor = Math.round(Math.random() * 60);
    var corridor = { x: hor, y: 0, w: 2, h: 0 }

    if (rooms[0].y < rooms[minroom].y) { //
        corridor.y = rooms[0].y + rooms[0].h;
        corridor.h = rooms[minroom].y - (rooms[0].y + rooms[0].h);
    } else {
        corridor.y = rooms[minroom].y + rooms[minroom].h;
        corridor.h = rooms[0].y - (rooms[minroom].y + rooms[minroom].h);
    }

    rooms.push(corridor);

    console.log('%c connected to ' + minroom, 'color: ' + colors[minroom], diff);

    // Horizontal
    /* for (i = 1; i < nRooms; ++i) {
        if ((rooms[0].y >= rooms[i].y && rooms[0].y <= rooms[i].y + rooms[i].h) || 
            (rooms[i].y >= rooms[0].y && rooms[i].y <= rooms[0].y + rooms[0].h)){
            console.log('connected to ' + i)
        }
    } */

    return rooms;
}

function renderMap() {
    var i, x, y;

    for (i = 0; i < Game.map.length; ++i) {
        var room = Game.map[i];

        for (x = room.x; x <= room.x + room.w; ++x) {
            for (y = room.y; y <= room.y + room.h; ++y) {
                Crafty.e("2D, Canvas, Color")
                      .attr({ x: x * Game.tile, y: y * Game.tile, w: Game.tile - 2, h: Game.tile - 2 })
                      .color(i > 6 ? '#FFFFFF' : colors[i]);
            }
        }
    }
}