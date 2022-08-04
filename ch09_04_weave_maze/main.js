import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'
import WeaveGrid from '../mazes/WeaveGrid.js'

const grid = new WeaveGrid(20)
RecursiveBacktracker.on(grid)

grid.init_distances()
const cellSize = 20
grid.draw(cellSize, 0.1)
