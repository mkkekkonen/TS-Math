export class Page {
  constructor(public id: number, public name: string, public urlTitle: string, public subcategoryId: number, public index?: number) {}
}

export interface IPage {
  id: number
  name: string
  urlTitle: string
  subcategoryId: number
  index?: number
}
