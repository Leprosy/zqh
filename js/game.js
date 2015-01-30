var Game = {};
Game.MAXX = 100;
Game.MAXY = 100;
Game.tile = 8;

window.onload = function() {
    init();
    Game.map = generateMap(2);
    renderMap();
};
