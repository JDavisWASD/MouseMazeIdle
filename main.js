
//  3B. If == 1 adjacent cell is in the maze:
//      3C. Add the random wall to the maze
//      3D. Add adjacent cells to the list of walls
//  3E. Remove the random wall from the list of walls

buildMaze(7, 7);

//Prim's Algorithm
function buildMaze(height, width) {
    const UNSET = 0;
    const WALL = 1;
    const PATH = 2;
    let grid = [];
    let maze = new Set();
    let walls = new Set();

//1. Create a grid full of walls
    for (let x = 0; x < width; x++) {
        grid[x] = [];
        for (let y = 0; y < height; y++) {
            let cell = {
                x: x,
                y: y,
                status: UNSET,
                adjacent_cells: []
            };
            grid[x][y] = cell;
            if (grid[x - 1] && grid[x - 1][y]) {
                let west = grid[x - 1][y];
                cell.adjacent_cells.push(west);
                west.adjacent_cells.push(cell);
            }

            if (grid[x][y - 1]) {
                let south = grid[x][y - 1];
                cell.adjacent_cells.push(south);
                south.adjacent_cells.push(cell);
            }
        }
    }

//2. Pick a cell at random
    let startingX = Math.floor(Math.random() * grid.length);
    let startingY = Math.floor(Math.random() * grid[startingX].length);
    let startingCell = grid[startingX][startingY];
    let currentCell = startingCell;
//  2A. Add that cell to the maze
    startingCell.status = PATH;
    maze.add(startingCell);
//  2B. Add adjacent cells to the list of walls
    for (let i = 0; i < startingCell.adjacent_cells.length; i++) {
        walls.add(startingCell.adjacent_cells[i]);
    }

//3. While there are walls in the list:
    while (walls.size > 0) {
//  3A. Pick a random wall from the list
    }




//Outputs for testing ----------------------------------------------------------
    console.log(startingCell);
    for (let i = 0; i < startingCell.adjacent_cells.length; i++) {
        console.log(startingCell.adjacent_cells[i]);
    }
}