import RecursiveBacktracker from './RecursiveBacktracker.js'
import WeaveGrid from './WeaveGrid.js'

const h = 20
const w = 20
const grid = new WeaveGrid(h, w)
RecursiveBacktracker.on(grid)

console.log(grid.toString())

const cellSize = 20
const output = document.getElementById('output')
output.width = cellSize * w + 1
output.height = cellSize * h + 1
const ctx = output.getContext('2d')
grid.draw(ctx, cellSize, 0.1)

