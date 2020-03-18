import React from 'react';
import { storiesOf } from '@storybook/react';

import { HomePage } from './Home';

storiesOf('HomePage', module)
  .add('default', () => (
    <HomePage />
  ));
