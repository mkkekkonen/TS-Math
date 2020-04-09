import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { useParams } from 'react-router-dom';
import Immutable from 'immutable';

import { MathPage } from './MathPage';

import { loadData } from '../../store/actions/data';

import { getCategories } from '../../store/selectors/categories';
import { getSubcategories } from '../../store/selectors/subcategories';
import { getPages } from '../../store/selectors/pages';

import { Category, Subcategory, Page } from '../../models';

interface Props {
  categories?: Immutable.Map<string, Category>
  subcategories?: Immutable.Map<string, Subcategory>
  pages: Immutable.Map<string, Page>
  loadData: Function
}

interface State {}

const MathPageContainer = ({
  categories,
  subcategories,
  pages,
  loadData,
}: Props) => {
  useEffect(() => {
    loadData();
  }, []);

  const { urlTitle } = useParams();

  return (
    <MathPage
      urlTitle={urlTitle}
      categories={categories}
      subcategories={subcategories}
      pages={pages}
    />
  );
};

const mapStateToProps = (state: any) => ({
  categories: getCategories(state),
  subcategories: getSubcategories(state),
  pages: getPages(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch(loadData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MathPageContainer);
