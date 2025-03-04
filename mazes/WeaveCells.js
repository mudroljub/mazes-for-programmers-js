import Cell from './Cell.js'

export class OverCell extends Cell {
  constructor(row, column, grid) {
    super(row, column)
    this.grid = grid
  }

  link(cell, bidi = true) {
    let neighbor = null
    if (this.north && cell.south && this.north.id == cell.south.id)
      neighbor = this.north
    else if (this.south && cell.north && this.south.id == cell.north.id)
      neighbor = this.south
    else if (this.east && cell.west && this.east.id == cell.west.id)
      neighbor = this.east
    else if (this.west && cell.east && this.west.id == cell.east.id)
      neighbor = this.west

    if (neighbor)
      this.grid.tunnel_under(neighbor)
    else
      super.link(cell, bidi)
  }

  get neighbors() {
    const list = super.neighbors
    if (this.can_tunnel_north) list.push(this.north.north)
    if (this.can_tunnel_south) list.push(this.south.south)
    if (this.can_tunnel_east) list.push(this.east.east)
    if (this.can_tunnel_west) list.push(this.west.west)
    return list
  }

  get can_tunnel_north() {
    return this.north?.north && this.north.horizontal_passage
  }

  get can_tunnel_south() {
    return this.south?.south && this.south.horizontal_passage
  }

  get can_tunnel_east() {
    return this.east?.east && this.east.vertical_passage
  }

  get can_tunnel_west() {
    return this.west?.west && this.west.vertical_passage
  }

  get horizontal_passage() {
    return this.linked(this.east) && this.linked(this.west) &&
      !this.linked(this.north) && !this.linked(this.south)
  }

  get vertical_passage() {
    return !this.linked(this.east) && !this.linked(this.west) &&
      this.linked(this.north) && this.linked(this.south)
  }
}

export class UnderCell extends Cell {
  constructor(over_cell) {
    super(over_cell.row, over_cell.column)

    if (over_cell.horizontal_passage) {
      this.north = over_cell.north
      over_cell.north.south = this
      this.south = over_cell.south
      over_cell.south.north = this
      this.link(this.north)
      this.link(this.south)
    } else {
      this.east = over_cell.east
      over_cell.east.west = this
      this.west = over_cell.west
      over_cell.west.east = this
      this.link(this.east)
      this.link(this.west)
    }
  }

  get horizontal_passage() {
    return this.east || this.west
  }

  get vertical_passage() {
    return this.north || this.south
  }
}

export class SimpleOverCell extends OverCell {
  // the same as Cell
  get neighbors() {
    const list = []
    if (this.north) list.push(this.north)
    if (this.south) list.push(this.south)
    if (this.east) list.push(this.east)
    if (this.west) list.push(this.west)
    return list
  }
}