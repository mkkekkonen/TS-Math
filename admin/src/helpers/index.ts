interface IEntity {
  id: number
}

export default {
  getById: (list: IEntity[], id: number) => (
    list.find((item) => item.id === id)
  ),
  idExists: (list: IEntity[], id: number) => (
    list.some((item) => item.id === id)
  ),
  equals: (a: any, b: any) => a === b,
};
