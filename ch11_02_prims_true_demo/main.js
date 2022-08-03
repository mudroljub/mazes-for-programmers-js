import { TruePrims } from '../mazes/algorithms/Prims.js'
import Grid from '../mazes/Grid.js'

const grid = new Grid(20)
TruePrims.on(grid)

grid.init_distances()
grid.draw()