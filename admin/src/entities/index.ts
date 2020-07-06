export interface ICategory {
  id: number
  name: string
  index?: number
}

export interface ISubcategory {
  id: number
  name: string
  categoryId: number
  index?: number
}

export interface IPage {
  id: number
  name: string
  urlTitle: string
  subcategoryId: number
  index?: number
}
