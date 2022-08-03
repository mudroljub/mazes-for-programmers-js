import Grid from '../mazes/Grid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new Grid(20, 20, 'weighted')
RecursiveBacktracker.on(grid)
grid.braid(1) // if not braided there's only one path
grid.init_path()

const output1 = document.getElementById('output1')
const ctx1 = output1.getContext('2d')

const cellSize = 20
grid.resize_canvas(output1, cellSize)
grid.draw(cellSize, 0, ctx1)

const lava_cell = grid.cell_by_id(grid.distances.random)
lava_cell.weight = 50

grid.init_path()

const output2 = document.getElementById('output2')
const ctx2 = output2.getContext('2d')
grid.resize_canvas(output2, cellSize)
grid.draw(cellSize, 0, ctx2)
