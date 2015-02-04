var Game = {};
Game.MAXX = 80;
Game.MAXY = 80;
Game.tile = 8;

window.onload = function() {
    init();
    Game.map = generateMap(7);
    renderMap();
};
