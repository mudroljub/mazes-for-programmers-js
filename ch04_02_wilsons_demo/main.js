import Grid from '../mazes/Grid.js'
import Wilsons from '../mazes/algorithms/Wilsons.js'

const grid = new Grid(20)
Wilsons.on(grid)

grid.distances = grid.middle_cell.distances
grid.draw()