import Grid from '../mazes/Grid.js'
import Ellers from '../mazes/algorithms/Ellers.js'

const grid = new Grid(20)
Ellers.on(grid)

grid.distances = grid.middle_cell.distances
grid.draw()
