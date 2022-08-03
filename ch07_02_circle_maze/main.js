import PolarGrid from '../mazes/PolarGrid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new PolarGrid(10)
RecursiveBacktracker.on(grid)

grid.init_path(grid.first_cell, grid.last_cell)
grid.draw(20)
