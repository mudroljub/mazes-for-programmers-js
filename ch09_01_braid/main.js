import Grid from '../mazes/Grid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new Grid(20)
RecursiveBacktracker.on(grid)
grid.braid(0.5) // remove deadends

grid.distances = grid.middle_cell.distances
grid.draw()