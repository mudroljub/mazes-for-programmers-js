import SideWinder from '../mazes/algorithms/SideWinder.js'
import Grid from '../mazes/Grid.js'

const grid = new Grid(8, 8)
SideWinder.on(grid)

const [farthest_id] = grid.first_cell.distances.max()
const farthest_cell = grid.cell_by_id(farthest_id)

const [goal_id] = farthest_cell.distances.max()
const goal_cell = grid.cell_by_id(goal_id)

grid.distances = farthest_cell.distances.path_to(goal_cell)
console.log(grid.toString())
grid.draw(30)