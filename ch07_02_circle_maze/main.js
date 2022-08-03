import PolarGrid from '../mazes/PolarGrid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new PolarGrid(10)
RecursiveBacktracker.on(grid)

grid.distances = grid.first_cell.distances

grid.draw(20)
