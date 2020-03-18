export class Subcategory {
  constructor(public id: number, public name: string, public categoryId: number, public index?: number) {}
}

export interface ISubcategory {
  id: number
  name: string
  categoryId: number
  index?: number
}
