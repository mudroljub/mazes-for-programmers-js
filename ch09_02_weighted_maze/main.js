import WeightedGrid from '../mazes/WeightedGrid.js'
import RecursiveBacktracker from '../mazes/algorithms/RecursiveBacktracker.js'

const grid = new WeightedGrid(20)
RecursiveBacktracker.on(grid)
grid.braid(1) // if not braided there's only one path

const { first_cell, last_cell } = grid
grid.distances = first_cell.distances.path_to(last_cell)

const output1 = document.getElementById('output1')
const ctx1 = output1.getContext('2d')

const cellSize = 20
grid.resize_canvas(output1, cellSize)
grid.draw(cellSize, 0, ctx1)

const { random_id } = grid.distances
const lava_cell = grid.cell_by_id(random_id)
lava_cell.weight = 50

grid.distances = first_cell.distances.path_to(last_cell)

const output2 = document.getElementById('output2')
const ctx2 = output2.getContext('2d')
grid.resize_canvas(output2, cellSize)
grid.draw(cellSize, 0, ctx2)
