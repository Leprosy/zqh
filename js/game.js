var Game = {};
Game.MAXX = 60;
Game.MAXY = 60;
Game.tile = 8;

window.onload = function() {
    init();
    Game.map = generateMap(10);
    renderMap();
};
