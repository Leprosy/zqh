<?php

/**
 * Map module
 */
namespace Lib;

/**
 * This class represents a room in the map
 * 
 * @author leprosy
 */
class Room {
    public $x;
    public $y;
    public $width;
    public $height;
    public $floor;
    public $roof;

    public function __construct($x, $y, $width, $height) {
        $this->x = $x;
        $this->y = $y;
        $this->floor = 0;
        $this->roof = 0;
        $this->width = $width;
        $this->height = $height;
    }

    /**
     * This method checks if a room overlaps this room
     * 
     * @param unknown $room
     * @return boolean
     */
    public function intersects($room) {
        if (($this->x <= $room->x + $room->width + 1 && $this->x + $this->width + 1 >= $room->x) &&
            ($this->y <= $room->y + $room->height + 1 && $this->y + $this->height + 1 >= $room->y)) {
            return true;
        }
    }

    /**
     * Check if this room is inside a map
     * 
     * @param unknown $map
     * @return boolean
     */
    public function inside($map) {
        return ($this->x + $this->width < $map->width- 1) &&
               ($this->y + $this->height < $map->height - 1);
    }

    /**
     * Check if a point is inside this room
     * 
     * @param unknown $x
     * @param unknown $y
     * @return boolean
     */
    public function contains($x, $y) {
        return ($x >= $this->x && $x <= $this->x + $this->width - 1 &&
               $y >= $this->y && $y <= $this->y + $this->height - 1);
    }
}


/**
 * This class represents a map made of several rooms, connected by corridors.
 * @author leprosy
 *
 */
class Map {
    public $width;
    public $height;
    public $name;
    public $rooms;
    public $map;

    public function __construct($width, $height) {
        $this->name = "";
        $this->rooms = array();
        $this->map = null;
        $this->width = $width;
        $this->height = $height;
    }

    public function getJSON() {
        $this->map["name"] = $this->name;
        return $this->map;
    }

    public function generate($nRooms) {
        //Data structure
        $this->map = array(
                "walls" => array(),
                "colmap" => array(array()),
                "floors" => array(array()),
                "roofs" => array(array()),
                "objects" => array(array()),
        );

        for ($x = 0; $x < $this->width; $x++) {
            for ($y = 0; $y < $this->height; $y++) {
                $this->map["colmap"][$x][$y] = 0;
                $this->map["floors"][$x][$y] = 0;
                $this->map["roofs"][$x][$y] = 0;
                $this->map["objects"][$x][$y] = 0;
            }
        }

        //Name
        $this->generateName();

        // Rooms and corridors
        $this->generateRooms($nRooms);
        $this->generateCorridors();

        //Objects(start points, deco, monster generators...)
        $firstR = $this->rooms[0];
        $lastR = $this->rooms[$nRooms - 1];
        $this->map["objects"][rand($firstR->x + 2, $firstR->x + $firstR->width - 2)][rand($firstR->y + 2, $firstR->y + $firstR->width - 2)] = 1;
        $this->map["objects"][rand($lastR->x + 2, $lastR->x + $lastR->width - 2)][rand($lastR->y + 2, $lastR->y + $lastR->width - 2)] = 2;

        // Compile map json
        // Map
        $floors = array();
        $roofs = array();
        $objects = array();

        for ($x = 1; $x < $this->width - 1; $x++) {
            for ($y = 1; $y < $this->height - 1; $y++) {
                if ($this->map["floors"][$x][$y] != 0) {
                    $floors[] = array(
                            "x" => $x,
                            "y" => $y,
                            "v" => $this->map["floors"][$x][$y]
                    );

                    $roofs[] = array(
                            "x" => $x,
                            "y" => $y,
                            "v" => $this->map["roofs"][$x][$y]
                    );

                    // Draw walls
                    for ($i = -1; $i < 2; $i++) {
                        if ($this->map["floors"][$x][$y + $i] == 0) {
                            $this->map["colmap"][$x][$y + $i] = 1;
                            $this->map["walls"][] = array(
                                    "x" => $x,
                                    "y" => $y + $i,
                                    "v" => 1 // @todo: How we can set the wall deco?
                            );
                        }
                        if ($this->map["floors"][$x + $i][$y] == 0) {
                            $this->map["colmap"][$x + $i][$y] = 1;
                            $this->map["walls"][] = array(
                                    "x" => $x + $i,
                                    "y" => $y,
                                    "v" => 1 // @todo: How we can set the wall deco?
                            );
                        }
                    }
                }

                if ($this->map["objects"][$x][$y] != 0) {
                    $objects[] = array(
                            "x" => $x,
                            "y" => $y,
                            "v" => $this->map["objects"][$x][$y]
                            );
                }
            }
        }

        $this->map["floors"] = $floors;
        $this->map["roofs"] = $roofs;
        $this->map["objects"] = $objects;
    }

    public function generateRooms($nRooms) {
        // Create main rooms
        for ($i = 0; $i < $nRooms; ++$i) {
            $ok = true;
            $room = new Room(rand(1, $this->width),
                             rand(1, $this->height),
                             rand(8, 16),
                             rand(8, 16));

            // @todo: Change this to make variable room deco
            $room->floor = 1;
            $room->roof = 1;

            // Check boundaries
            // Inside map?
            if (!$room->inside($this)) {
                $ok = false;
            } else {
                // Don't overlap any other room?
                foreach ($this->rooms as $tRoom) {
                    if ($room->intersects($tRoom)) {
                        $ok = false;
                        break;
                    }
                }
            }

            // Add room if it's ok
            if ($ok) {
                $this->rooms[] = $room;
            } else {
                --$i;
            }
        }

        // Add rooms to map array
        foreach ($this->rooms as $room) {
            for ($x = 0; $x < $room->width; ++$x) {
                for ($y = 0; $y < $room->height; ++$y) {
                    $dx = $room->x + $x;
                    $dy = $room->y + $y;
                    $this->map["floors"][$dx][$dy] = $room->floor;
                    $this->map["roofs"][$dx][$dy] = $room->roof;
                }
            }
        }
    }

    public function generateCorridors() {
        for ($i = 1; $i < count($this->rooms); $i++) {
            $roomA = $this->rooms[$i - 1];
            $roomB = $this->rooms[$i];
            $pointA = array(rand($roomA->x + 2, $roomA->x + $roomA->width - 2),
                    rand($roomA->y + 2, $roomA->y + $roomA->height - 2));
            $pointB = array(rand($roomB->x + 2, $roomB->x + $roomB->width - 2),
                    rand($roomB->y + 2, $roomB->y + $roomB->height - 2));

            while (($pointB[0] != $pointA[0]) || ($pointB[1] != $pointA[1])) {
                if ($pointB[0] != $pointA[0]) {
                    if ($pointB[0] > $pointA[0]) $pointB[0]--;
                    else $pointB[0]++;
                } else if ($pointB[1] != $pointA[1]) {
                    if ($pointB[1] > $pointA[1]) $pointB[1]--;
                    else $pointB[1]++;
                }

                $include = true;

                foreach ($this->rooms as $checkRoom) {
                    if ($checkRoom->contains($pointB[0], $pointB[1])) {
                        $include = false;
                    }
                }

                if ($include) {
                    // @todo: replace 1 with the desired floor value(deco)
                    $this->map["floors"][$pointB[0]][$pointB[1]] = 1;
                    $this->map["roofs"][$pointB[0]][$pointB[1]] = 1;
                }
            }
        }
    }

    public function generateName() {
        $base = array("Cavern", "Labyrinth", "Maze", "Cave", "Pit", "Dungeon", "Lair", "Cove", "Hole");
        $adj = array("Sorrow", "Despair", "Lost Souls", "Blood", "Doom", "Death");

        $this->name = $base[array_rand($base)] . " of " . $adj[array_rand($adj)];
    }
}
