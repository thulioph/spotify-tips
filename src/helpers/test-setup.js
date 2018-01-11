import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// ====

const exposedProperties = ['window', 'navigator', 'document'];

global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
    }
});

global.navigator = {
    userAgent: 'node.js'
};

// ====

Enzyme.configure({ adapter: new Adapter() });