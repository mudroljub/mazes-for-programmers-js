import AldousBroder from '../mazes/algorithms/AldousBroder.js';
import Grid from '../mazes/Grid.js';

const grid = new Grid(20)
AldousBroder.on(grid)

grid.distances = grid.middle_cell.distances
grid.draw()
