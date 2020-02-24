import React from 'react';
import { storiesOf } from '@storybook/react';

import { MathNav } from './MathNav';

import { Category, Subcategory, Page } from '../../models';

const categories = [
  new Category(1, 'Analytic Geometry'),
  new Category(2, 'Mechanics'),
];

const subcategories = [
  new Subcategory(1, 'Cartesian Coordinates', 1),
  new Subcategory(2, 'Kinematics', 2),
  new Subcategory(3, 'Line', 1),
  new Subcategory(4, 'Dynamics', 2),
];

const pages = [
  new Page(1, 'Distance Between Two Points', 'distancepoints', 1),
  new Page(2, 'Midpoint of a Line Segment', 'segmentmidpoint', 1),
  new Page(3, 'Slope', 'slope', 3),
  new Page(4, 'Directional Angle and Slope', 'angleslope', 3),
  new Page(5, 'Planar Velocity', 'planarvelocity', 2),
  new Page(6, 'Constant Acceleration and Location', 'constaccel', 2),
  new Page(7, 'Newton\'s Second Law', 'newton2', 4),
];

storiesOf('MathNav', module)
  .add('default', () => (
    <MathNav
      categories={categories}
      subcategories={subcategories}
      pages={pages}
    />
  ));
