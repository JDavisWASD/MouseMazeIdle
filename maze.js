function buildMaze(height, width) {
/* Prim's Algorithm
   1. Create a grid full of walls
   2. Pick a cell at random
     2A. Add that cell to the maze
     2B. Add adjacent cells to the list of walls
   3. While there are walls in the list:
     3A. Pick a random wall from the list
     3B. If == 1 adjacent cell is in the maze:
         3C. Add the random wall to the maze
         3D. Add adjacent cells to the list of walls
     3E. Remove the random wall from the list of walls */

    let maze = [];
    let paths = new Set();
    let walls = new Set();  //Maybe rename to possibleCells?
    let iteratable = null;
    let randomIndex = null;
    let currentCell = null;
    let adjacentCellCount = null;

    for (let y = 0; y < height; y++) {
        maze[y] = [];
        for (let x = 0; x < width; x++) {
            let cell = {
                x: x,
                y: y,
                status: 'wall',
                adjacentCells: []
            };
            maze[y][x] = cell;
            if (maze[y - 1] && maze[y - 1][x]) {
                let west = maze[y - 1][x];
                cell.adjacentCells.push(west);
                west.adjacentCells.push(cell);
            }

            if (maze[y][x - 1]) {
                let south = maze[y][x - 1];
                cell.adjacentCells.push(south);
                south.adjacentCells.push(cell);
            }
        }
    }

    let startingY = Math.floor(Math.random() * maze.length);
    let startingX = Math.floor(Math.random() * maze[startingY].length);
//    let startingCell = maze[maze.length-1][0];
    let startingCell = maze[startingY][startingX];
    startingCell.status = 'mouse';
//    startingCell.status = 'path';
    paths.add(startingCell);
    for (let i = 0; i < startingCell.adjacentCells.length; i++) {
        walls.add(startingCell.adjacentCells[i]);
    }

    while (walls.size > 0) {
        iteratable = [...walls.values()];
        randomIndex = Math.floor(Math.random() * iteratable.length);
        currentCell = iteratable[randomIndex];
        adjacentCellCount = 0;
        for (let i = 0; i < currentCell.adjacentCells.length; i++) {
            if (currentCell.adjacentCells[i].status == 'path' ||
                    currentCell.adjacentCells[i].status == 'mouse') {
                adjacentCellCount++;
            }
        }

        if (adjacentCellCount == 1 && currentCell.status != 'mouse') {
            currentCell.status = 'path';
            paths.add(currentCell);
            for (let i = 0; i < currentCell.adjacentCells.length; i++) {
                walls.add(currentCell.adjacentCells[i]);
            }
        }

        walls.delete(currentCell);
    }
    return maze;
}

function drawMaze(maze) {
    output = "<div class='column'>";
    for (let y = 0; y < maze.length + 2; y++) {
        output += "<div class='wall'></div>";
    }
    output += '</div>';

    for (y = 0; y < maze.length; y++) {
        output += "<div class='column'><div class='wall'></div>";
        for (let x = 0; x < maze[y].length; x++) {
            output += "<div class='" + maze[y][x].status + "'></div>";
        }
        output += "<div class='wall'></div></div>"
    }

    output += "<div class='column'>";
    for (y = 0; y < maze.length + 2; y++) {
        output += "<div class='wall'></div>";
    }
    output += '</div>';
    document.getElementById('maze').innerHTML = output;
}

function spawnMouse(paths) {
}

function spawnCheese(paths) {
}