import { configure } from '@storybook/react';

import '../src/css/bootstrap.css';
import '../src/css/bootstrap-reboot.css';
import '../src/css/bootstrap-grid.css';

// automatically import all files ending in *.stories.js
const req = require.context('../src/', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
