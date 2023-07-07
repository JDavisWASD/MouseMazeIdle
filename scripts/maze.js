class PrimsMaze {
    constructor (width, height) {
        this.maze = this.#buildMaze(width, height);
    }

//1. Make grid of walls
//2. Pick random cell & Set that cell as a path
//3. Compute frontier cells
//      - Has distance of 2
//      - Status == "wall"
//      - Is within grid dimensions
//4. While the frontier list is not empty:
//      - Pick a random cell from the frontier list
//      - Set that cell as a path
//      - Compute in between cell
//      - Set that cell as a path
//      - Compute new frontier cells
//      - Remove current cell from frontier list

    #buildMaze(width, height) {
        let grid = [];
        let frontier = new Set();

        for (let y = 0; y < height; y++) {
            grid[y] = [];
            for (let x = 0; x < width; x++) {
                grid[y][x] = {
                    x: x,
                    y: y,
                    status: "wall",
                    neighbors: []
                };

                if (grid[y][x - 1]) {
                    let westNeighbor = grid[y][x - 1];
                    grid[y][x].neighbors.push(westNeighbor);
                    westNeighbor.neighbors.push(grid[y][x]);
                }
                if (grid[y - 1] && grid[y - 1][x]) {
                    let northNeighbor = grid[y - 1][x];
                    grid[y][x].neighbors.push(northNeighbor);
                    northNeighbor.neighbors.push(grid[y][x]);
                }
            }
        }

        console.log("Starting Grid:");
        this.drawMaze(grid);

        let currentY = Math.floor(Math.random() * grid.length);
        let currentX = Math.floor(Math.random() * grid[currentY].length);
        let currentCell = grid[currentY][currentX];
        currentCell.status = "path";

        console.log("Starting Cell: ("
        + currentCell.y
        + ","
        + currentCell.x
        + ")");
        this.drawMaze(grid);

        if (grid[currentY][currentX - 2]
            && grid[currentY][currentX - 2].status == "wall") {
                frontier.add(grid[currentY][currentX - 2]);
        }
        if (grid[currentY][currentX + 2]
            && grid[currentY][currentX + 2].status == "wall") {
                frontier.add(grid[currentY][currentX + 2]);
        }
        if (grid[currentY - 2]
            && grid[currentY - 2][currentX]
            && grid[currentY - 2][currentX].status == "wall") {
                frontier.add(grid[currentY - 2][currentX]);
        }
        if (grid[currentY + 2]
            && grid[currentY + 2][currentX]
            && grid[currentY + 2][currentX].status == "wall") {
                frontier.add(grid[currentY + 2][currentX]);
        }

        while (frontier.size > 0) {
            let interatable = [...frontier.values()];
            let randI = Math.floor(Math.random() * interatable.length);
            currentY = interatable[randI].y;
            currentX = interatable[randI].x;
            currentCell = grid[currentY][currentX];
            grid[currentY][currentX].status = "path";

            let i = 0;
            let carveFound = false;

            console.log("Frontier Cell: ("
            + currentCell.y
            + ","
            + currentCell.x
            + ")");
            this.drawMaze(grid);

//BUG IS FROM HERE

            while (i < currentCell.neighbors.length && carveFound == false) {
                let neighborCell = currentCell.neighbors[i];
                let j = 0;

                console.log("Neighbor Cell: ("
                + neighborCell.y
                + ","
                + neighborCell.x
                + ")");

                while (j < neighborCell.neighbors.length
                    && carveFound == false) {

                        console.log("Neighbor^2 Cell: ("
                        + neighborCell.neighbors[j].y
                        + ","
                        + neighborCell.neighbors[j].x
                        + ")");

                        if (neighborCell.neighbors[j].status == "path"
                            && neighborCell.neighbors[j] != currentCell) {
                                carveFound = true;
                                neighborCell.status = "path";

                                console.log("In Between Cell: ("
                                + neighborCell.neighbors[j].y
                                + ","
                                + neighborCell.neighbors[j].x
                                + ")");
                                this.drawMaze(grid);
                            }
                        j++;
                }
                i++;
            }

//TO HERE

            if (grid[currentY][currentX - 2]
                && grid[currentY][currentX - 2].status == "wall") {
                    frontier.add(grid[currentY][currentX - 2]);
            }
            if (grid[currentY][currentX + 2]
                && grid[currentY][currentX + 2].status == "wall") {
                    frontier.add(grid[currentY][currentX + 2]);
            }
            if (grid[currentY - 2]
                && grid[currentY - 2][currentX]
                && grid[currentY - 2][currentX].status == "wall") {
                    frontier.add(grid[currentY - 2][currentX]);
            }
            if (grid[currentY + 2]
                && grid[currentY + 2][currentX]
                && grid[currentY + 2][currentX].status == "wall") {
                    frontier.add(grid[currentY + 2][currentX]);
            }
            frontier.delete(currentCell);
        }
        return grid;
    }

    drawMaze(grid) {
        let output = "";
        for (let y = 0; y < grid.length; y++) {
            for (let x = 0; x < grid[y].length; x++) {
                if (grid[y][x].status == "wall") {
                    output += "■ ";
                }
                else {
                    output += "  ";
                }
            }
            output += "\n";
        }
        console.log(output);
    }
}

export default PrimsMaze;