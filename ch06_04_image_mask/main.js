import Mask from '../mazes/Mask.js'
import MaskedGrid from '../mazes/MaskedGrid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const c = document.createElement('canvas')
const ctx = c.getContext('2d')
const image = document.getElementById('maze_img')
ctx.drawImage(image, 0, 0)

const mask = Mask.from_img(ctx.getImageData(0, 0, image.width, image.height))
const grid = new MaskedGrid(mask)
RecursiveBacktracker.on(grid)

const cellSize = 11
const output = document.getElementById('output')

grid.init_distances(grid.random_cell)
grid.resize_canvas(output, cellSize)
grid.draw(cellSize, 0)