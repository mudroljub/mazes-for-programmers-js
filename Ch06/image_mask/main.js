import Mask from '../../mazes/Mask.js'
import MaskedGrid from '../../mazes/MaskedGrid.js'
import RecursiveBacktracker from '../../mazes/algorithms/RecursiveBacktracker.js'

const c = document.createElement('canvas')
const ctx = c.getContext('2d')
const image = document.getElementById('maze_img')
ctx.drawImage(image, 0, 0)

const mask = Mask.from_img(ctx.getImageData(0, 0, image.width, image.height))
const grid = new MaskedGrid(mask)
RecursiveBacktracker.on(grid)

console.log(grid.toString())

// let start = grid.middle_cell;
// grid.distances = start.distances;

const cellSize = 5
const output = document.getElementById('output')
output.width = cellSize * image.width + 1
output.height = cellSize * image.height + 1
const ctx2 = output.getContext('2d')
grid.draw(cellSize, 0, ctx2)