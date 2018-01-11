import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import chai, { expect as cExpect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import '../../helpers/test-setup';
import TrackProgress from './index';

// ====

chai.use(sinonChai);

// ====

describe('<TrackProgress />', () => {
    describe('Snapshot', () => {
        it('should render without crashing.', () => {
            const wrapper = shallow(<TrackProgress />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('Structure', () => {
        it('should have a div when mount', () => {
            const wrapper = shallow(<TrackProgress />);
            cExpect(wrapper.find('div')).to.have.length(1);
        });
    });

    describe('Props', () => {
        it('should render with the passed time.', () => {
            const wrapper = shallow(
                <TrackProgress time={'50%'} />
            );

            cExpect(wrapper.find('div').props().style.width).to.be.eql('50%');
            
            const wrapper2 = shallow(
                <TrackProgress time={'92%'} />
            );

            cExpect(wrapper2.find('div').props().style.width).to.be.eql('92%');
        });
    });
});