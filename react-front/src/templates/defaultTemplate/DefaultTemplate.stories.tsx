import React from 'react';
import { storiesOf } from '@storybook/react';

import { DefaultTemplate } from './DefaultTemplate';

storiesOf('DefaultTemplate', module)
  .add('default', () => (
    <DefaultTemplate />
  ));
