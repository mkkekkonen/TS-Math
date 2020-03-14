import React from 'react';
import { connect } from 'react-redux';

import Immutable from 'immutable';

import { HomePage } from './Home';
import { Category, ICategory } from '../../models';
import { loadCatgories } from '../../store/actions/categories';
import { loadSubcategories } from '../../store/actions/subcategories';
import { loadPages } from '../../store/actions/pages';

interface Props {
  loadCategories: Function
  loadSubcategories: Function
  loadPages: Function
}

interface State {}

class HomePageContainer extends React.Component<Props, State> {
  componentDidMount() {
    const { loadCategories, loadSubcategories, loadPages } = this.props;

    loadCategories();
    loadSubcategories();
    loadPages();
  }

  render() {
    return (
      <HomePage />
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadCategories: () => dispatch(loadCatgories()),
  loadSubcategories: () => dispatch(loadSubcategories()),
  loadPages: () => dispatch(loadPages()),
});

export default connect(undefined, mapDispatchToProps)(HomePageContainer);
