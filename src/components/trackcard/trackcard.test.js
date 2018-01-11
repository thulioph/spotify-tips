import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import chai, { expect as cExpect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import '../../helpers/test-setup';
import TrackCard from './index';

// ====

chai.use(sinonChai);

// ====

describe('<TrackCard />', () => {
    describe('Snapshot', () => {
        it('should render without crashing.', () => {
            const wrapper = shallow(<TrackCard />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('Structure', () => {
        it('should have an article when mount', () => {
            const wrapper = shallow(<TrackCard />);
            cExpect(wrapper.find('article')).to.have.length(1);
        });
        
        it('should have an figure when mount', () => {
            const wrapper = shallow(<TrackCard />);
            cExpect(wrapper.find('figure')).to.have.length(1);
        });
        
        it('should have an img when mount', () => {
            const wrapper = shallow(<TrackCard />);
            cExpect(wrapper.find('img')).to.have.length(1);
        });
        
        it('should have an figcaption when mount', () => {
            const wrapper = shallow(<TrackCard />);
            cExpect(wrapper.find('figcaption')).to.have.length(1);
        });
    });
    
    describe('Props', () => {
        it('should render with the passed track image.', () => {
            const wrapper = shallow(
                <TrackCard trackImage='track-image.jpg' />
            );

            cExpect(wrapper.find('img').props().src).to.be.eql('track-image.jpg');
        });
        
        it('should render with the passed track name.', () => {
            const wrapper = shallow(
                <TrackCard trackName='I love Quebrada' />
            );

            cExpect(wrapper.find('img').props().alt).to.be.eql('I love Quebrada');
            cExpect(wrapper.find('h2').props().children).to.be.eql('I love Quebrada');
        });
        
        it('should render with the passed artist name.', () => {
            const wrapper = shallow(
                <TrackCard artistName='Emicida' />
            );

            cExpect(wrapper.find('span').props().children).to.be.eql('Emicida');
        });
    });

    describe('Events', () => {
        it('should call displayInfo when article is clicked.', () => {
            let changed = sinon.spy();

            const wrapper = mount(
                <TrackCard displayInfo={changed} />
            );
            
            wrapper.find('article').simulate('click');
            cExpect(changed).to.have.been.called;
        });
    });
});