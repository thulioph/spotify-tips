import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Thumb from './index'

const stories = storiesOf('Thumb', module);
stories.addDecorator(withKnobs);

stories.add('full render', () => (
    <Thumb
      image={
        text('image', 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180')
      }
      title={
        text('title', 'Card Title')
      }
      subTitle={
        text('subTitle', 'Card SubTitle')
      }
      handleClick={() => action('handleClick')()}
    />
  ))
