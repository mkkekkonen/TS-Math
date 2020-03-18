import Immutable from 'immutable';

interface IModel {
  id: number
}

export const convertModelListToIdMap = <T extends IModel>(list: Immutable.List<T>) => {
  return list.reduce((accum, item) => accum.set(`${item.id}`, item), Immutable.Map<T>({}));
};
