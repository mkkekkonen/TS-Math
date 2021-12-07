import React from 'react';
import { storiesOf } from '@storybook/react';

import Immutable from 'immutable';

import { MathNav } from './MathNav';

import { categories, subcategories, pages } from '../../data';

storiesOf('MathNav', module)
  .add('default', () => (
    <MathNav
      categories={Immutable.List(categories)}
      subcategories={Immutable.List(subcategories)}
      pages={Immutable.List(pages)}
    />
  ));
