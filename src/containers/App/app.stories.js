import React from 'react';
import { storiesOf } from '@storybook/react';

import App from './index'

storiesOf('App', module)
  .add('example', () => (
    <App />
  ))
