export class Category {
  constructor(public id: number, public name: string, public index?: number) {}
}

export interface ICategory {
  id: number
  name: string
  index?: number
}
