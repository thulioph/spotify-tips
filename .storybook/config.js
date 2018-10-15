import { configure, setAddon } from '@storybook/react';
import infoAddon, { setDefaults } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';

const req = require.context('../src', true, /\.stories\.jsx?$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
setAddon(infoAddon);

setDefaults({
  header: true,
  source: true,
  styles: stylesheet => {
    stylesheet.infoBody = {
      infoBody: {
        padding: '10px'
      }
    };
    return stylesheet;
  },
  maxPropsIntoLine: 1
});

setOptions({
  name: 'App',
  url: '#',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true,
  sortStoriesByKind: true
});