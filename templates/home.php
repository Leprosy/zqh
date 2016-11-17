<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="css/bootflat.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">
        <style>
        body{background-color:#000}
        .container{background-color:#333; color:#fff}
        </style>
        <title>This is zqh</title>
    </head>

    <body>
        <div class="container">
            <h1>Zqh</h1>

            <div class="row">
                <div class="col-md-10">
                    <h4>Main content</h4>

                    <div class="panel">
                        <ul id="myTab1" class="nav nav-tabs nav-justified">
                            <li class="active"><a href="#game" data-toggle="tab">Game</a></li>
                            <li class=""><a href="#char" data-toggle="tab">Character</a></li>
                        </ul>

                        <div id="myTabContent" class="tab-content">
                            <div class="tab-pane fade active in" id="game">
                                <div class="row">
                                    <div class="col-md-9">
                                        <canvas id="3d"></canvas>
                                    </div>

                                    <div class="col-md-3" id="commands">
                                        <div id="map"></div>

                                        <div class="row">
                                            <div class="col-md-4">
                                                Action1
                                            </div>
                                            <div class="col-md-4">
                                                Action1
                                            </div>
                                            <div class="col-md-4">
                                                Action1
                                            </div>
                                            <div class="col-md-4">
                                                Action1
                                            </div>
                                            <div class="col-md-4"></div>
                                            <div class="col-md-4"></div>
                                        </div>
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
                                    </div>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="char">
                              <p>This is the player description</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-md-2">
                    <h4>Side bar</h4>
                    Rooms: <input id="rooms" value="4" size="2" />
                    <button onclick="Game.loadMap('index.php/map/' + $('#rooms').val())">Load map</button>
                </div>
            </div>
        </div>

        <script src="js/jquery.js"></script>
        <script src="js/bootflat.js"></script>
        <script src="js/crafty.js"></script>
        <script src="js/babylon.js"></script>
        <script src="js/game.js"></script>

    </body>
</html>