<?php die("this is home.php") ?>
<!DOCTYPE html>
<html>
    <head>
        <style>
        .content{width:80%;margin:1em auto;}
        </style>
        <link rel="stylesheet" href="css/pure.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <title>This is zqh á</title>
    </head>

    <body>
        <div class="content" id="game">
            <h1></h1>
            <div class="pure-g">
                <div class="pure-u-1-5">
                    <div id="side"></div>
                </div>

                <div class="pure-u-3-5">
                    <canvas id="3d"></canvas>
                </div>

                <div class="pure-u-1-5">
                    <div id="map"></div>
                    <div id="commands">
                        <table>
                            <tr>
                                <td></td>
                                <td><button onclick="Game.forward()">^</button></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td><button onclick="Game.rotateLeft()">&lt;</button></td>
                                <td><button onclick="Game.backward()">v</button></td>
                                <td><button onclick="Game.rotateRight()">></button></td>
                            </tr>
                        </table>
                        <hr/>
                        Rooms: <input id="rooms" value="4" size="2" /><button onclick="Game.loadMap('index.php/map/' + $('#rooms').val())">Load map</button>
                        <hr />
                        <button onclick="Game.animate()">Start</button>
                    </div>
                </div>
            </div>
        </div>

        <script src="js/jquery.js"></script>
        <script src="js/crafty.js"></script>
        <script src="js/babylon.js"></script>
        <script src="js/game.js"></script>

    </body>
</html>