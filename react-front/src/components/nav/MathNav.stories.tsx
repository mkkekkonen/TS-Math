import React from 'react';
import { storiesOf } from '@storybook/react';

import { MathNav } from './MathNav';

import { categories, subcategories, pages } from '../../data';

storiesOf('MathNav', module)
  .add('default', () => (
    <MathNav
      categories={categories}
      subcategories={subcategories}
      pages={pages}
    />
  ));
