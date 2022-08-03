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

    let grid = [];  //Maybe rename to maze?
//    let maze = new Set();
    let walls = new Set();  //Maybe rename to possibleCells?
    let iteratable = null;
    let randomIndex = null;
    let currentCell = null;
    let adjacentCellCount = null;

    for (let x = 0; x < width; x++) {
        grid[x] = [];
        for (let y = 0; y < height; y++) {
            let cell = {
                x: x,
                y: y,
                status: 'wall',
                adjacentCells: []
            };
            grid[x][y] = cell;
            if (grid[x - 1] && grid[x - 1][y]) {
                let west = grid[x - 1][y];
                cell.adjacentCells.push(west);
                west.adjacentCells.push(cell);
            }

            if (grid[x][y - 1]) {
                let south = grid[x][y - 1];
                cell.adjacentCells.push(south);
                south.adjacentCells.push(cell);
            }
        }
    }

    let startingX = Math.floor(Math.random() * grid.length);
    let startingY = Math.floor(Math.random() * grid[startingX].length);
    let startingCell = grid[startingX][startingY];
    startingCell.status = 'path';
//    maze.add(startingCell);
    for (let i = 0; i < startingCell.adjacentCells.length; i++) {
        walls.add(startingCell.adjacentCells[i]);
    }

    while (walls.size > 0) {
        iteratable = [...walls.values()];
        randomIndex = Math.floor(Math.random() * iteratable.length);
        currentCell = iteratable[randomIndex];
        adjacentCellCount = 0;
        for (let i = 0; i < currentCell.adjacentCells.length; i++) {
            if (currentCell.adjacentCells[i].status == 'path') {
                adjacentCellCount++;
            }
        }

        if (adjacentCellCount == 1) {
            currentCell.status = 'path';
            for (let i = 0; i < currentCell.adjacentCells.length; i++) {
                walls.add(currentCell.adjacentCells[i]);
            }
        }

        walls.delete(currentCell);
    }
    return grid;
}

function drawMaze(maze) {
    output = '';
    for (let x = 0; x < maze.length; x++) {
        output += "<div class='column'>";
        for (let y = 0; y < maze[x].length; y++) {
            output += "<div class='" + maze[x][y].status + "'></div>";
        }

        output += '</div>';
    }

    document.getElementById('maze').innerHTML = output;
}