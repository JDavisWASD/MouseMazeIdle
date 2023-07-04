class PrimsMaze {
    constructor (width, height) {
        this.maze = this.#buildMaze(width, height);
    }

    #buildMaze(width, height) {
        let grid = [];
        let frontier = new Set();
        console.log("Frontier size: " + frontier.size);

//1. Make grid of walls
        for (let y = 0; y < height; y++) {
            grid[y] = [];
            for (let x = 0; x < width; x++) {
                grid[y][x] = {
                    x: x,
                    y: y,
                    status: "wall"
                };
            }
        }

//2. Pick random cell & Set that cell as a path
        let startY = Math.floor(Math.random() * grid.length);
        let startX = Math.floor(Math.random() * grid[startY].length);
        grid[startY][startX].status = "path";
        console.log(grid[startY][startX]);

//3. Compute frontier cells
//      - Has distance of 2
//      - Status == "wall"
//      - Is within grid dimensions
        if (grid[startY][startX - 2]
            && grid[startY][startX - 2].status == "wall") {
                frontier.add(grid[startY][startX - 2]);
        }
        if (grid[startY][startX + 2]
            && grid[startY][startX + 2].status == "wall") {
                frontier.add(grid[startY][startX + 2]);
        }
        if (grid[startY - 2]
            && grid[startY - 2][startX]
            && grid[startY - 2][startX].status == "wall") {
                frontier.add(grid[startY - 2][startX]);
        }
        if (grid[startY + 2]
            && grid[startY + 2][startX]
            && grid[startY + 2][startX].status == "wall") {
                frontier.add(grid[startY + 2][startX]);
        }
        console.log(frontier);
        console.log("Frontier size: " + frontier.size);

//4. While the frontier list is not empty:
//      - Pick a random cell from the frontier list
//      - Set that cell as a path
//      - Compute new frontier cells
//      - Remove current cell from frontier list
        while (frontier.size > 0) {
/*
If you hold the current cell in a variable I think you can remove it from
the frontier set right away and use the for loop for all cells including
the starting cell
*/
        }

        return grid;
    }
}

export default PrimsMaze;