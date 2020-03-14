import React from 'react';
import { connect } from 'react-redux';

import Immutable from 'immutable';

import { MathNav } from './MathNav';

import { Category, Subcategory, Page } from '../../models';
import { getCategories } from '../../store/selectors/categories';
import { getSubcategories } from '../../store/selectors/subcategories';
import { getPages } from '../../store/selectors/pages';

interface Props {
  categories: Immutable.List<Category>,
  subcategories: Immutable.List<Subcategory>,
  pages: Immutable.List<Page>,
};

const MathNavContainer = ({
  categories,
  subcategories,
  pages,
  ...props
}: Props) => {
  return (
    <MathNav
      categories={categories}
      subcategories={subcategories}
      pages={pages}
    />
  );
}

const mapStateToProps = (state: any) => ({
  categories: getCategories(state).toList(),
  subcategories: getSubcategories(state).toList(),
  pages: getPages(state).toList(),
});

export default connect(mapStateToProps)(MathNavContainer);
