import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Immutable from 'immutable';

import { HomePage } from './Home';
import { categoryApi } from '../../services/api';
import { Category, ICategory } from '../../models';
import { mergeCategories } from '../../store/actions/categories';

interface Props {
  mergeCategories: Function
}

interface State {}

class HomePageContainer extends React.Component<Props, State> {
  async componentDidMount() {
    const { mergeCategories } = this.props;

    const categoryData = await categoryApi.getAllCategories();
    const categoryArr = categoryData.map((dataItem: ICategory) => new Category(dataItem.id, dataItem.name));
    const categoryList = Immutable.fromJS(categoryArr);
    mergeCategories(categoryList);
  }

  render() {
    return (
      <HomePage />
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  mergeCategories: (categories: Immutable.List<Category>) => dispatch(mergeCategories(categories)),
});

export default connect(undefined, mapDispatchToProps)(HomePageContainer);
