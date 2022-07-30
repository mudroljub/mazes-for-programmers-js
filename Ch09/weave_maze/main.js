import WeaveGrid from '../../mazes/WeaveGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const h = 20
const w = 20
const grid = new WeaveGrid(h, w)
RecursiveBacktracker.on(grid)

console.log(grid.toString())

// let start = grid.cell(Math.floor(grid.rows / 2), Math.floor(grid.columns / 2));
// grid.distances = start.distances;

const cellSize = 20
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(cellSize, 0.1)
