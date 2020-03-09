import React from 'react';

import { MathNav } from './MathNav';

import { Category, Subcategory, Page } from '../../models';

import {
  categories as defaultCategories,
  subcategories as defaultSubcategories,
  pages as defaultPages,
} from '../../data';

interface Props {
  categories: Category[],
  subcategories: Subcategory[],
  pages: Page[],
};

export const MathNavContainer = ({
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

MathNavContainer.defaultProps = {
  categories: defaultCategories,
  subcategories: defaultSubcategories,
  pages: defaultPages,
};
