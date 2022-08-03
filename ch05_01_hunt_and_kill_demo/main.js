import Grid from '../mazes/Grid.js'
import HuntAndKill from '../mazes/algorithms/HuntAndKill.js'

const grid = new Grid(20)
console.log(grid)
HuntAndKill.on(grid)

console.log(grid.toString())

grid.init_distances()
grid.draw()