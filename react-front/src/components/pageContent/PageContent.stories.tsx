import React from 'react';
import { storiesOf } from '@storybook/react';

import { PageContent } from './PageContent';

storiesOf('PageContent', module)
  .add('distancepoints', () => (
    <PageContent baseFileName="1_1_1_distancepoints" />
  ));
