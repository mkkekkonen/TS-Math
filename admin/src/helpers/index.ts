interface IEntity {
  id: number
}

export default {
  getById: (list: IEntity[], id: number) => (
    list.find((item) => item.id === id)
  ),
};
