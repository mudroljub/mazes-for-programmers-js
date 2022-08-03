import { sample } from '../utils.js'

/* depth-first search */
export default class RecursiveBacktracker {
  static on(grid, start_at = grid.random_cell) {
    const stack = [start_at]

    while (stack.length) {
      const current = stack[stack.length - 1]
      const neighbors = current.neighbors.filter(cell => cell.unvisited)
      if (!neighbors.length)
        stack.pop()
      else {
        const neighbor = sample(neighbors)
        current.link(neighbor)
        stack.push(neighbor)
      }
    }
  }
}