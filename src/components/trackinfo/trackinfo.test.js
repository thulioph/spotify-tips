import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import chai, { expect as cExpect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import '../../helpers/test-setup';
import TrackInfo from './index';

// ====

chai.use(sinonChai);

// ====

describe('<TrackInfo />', () => {
    describe('Snapshot', () => {
        it('should render without crashing.', () => {
            const wrapper = shallow( <TrackInfo /> );
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('Structure', () => {
        it('should have an aside when mount', () => {
            const wrapper = shallow( <TrackInfo /> );
            cExpect(wrapper.find('aside')).to.have.length(1);
        });
        
        it('should have a nav when mount', () => {
            const wrapper = shallow( <TrackInfo /> );
            cExpect(wrapper.find('nav')).to.have.length(1);
        });

        it('should not have a level-item when mount without infoList.', () => {
            const wrapper = shallow(<TrackInfo />);
            cExpect(wrapper.find('.level-item')).to.have.length(0);
        });

        it('should have a level-item title when mount with infoList', () => {
            const arr = [
                { title: 'My title', legend: 'My legend', value: '200%' },
            ];

            const wrapper = shallow(
                <TrackInfo infoList={arr} />
            );

            cExpect(wrapper.find('.level-item').props().title).to.be.eql('My title');
        });
        
        it('should have a heading when mount with infoList', () => {
            const arr = [
                { title: 'My title', legend: 'My legend', value: '200%' },
            ];

            const wrapper = shallow(
                <TrackInfo infoList={arr} />
            );

            cExpect(wrapper.find('.heading')).to.have.length(1);
            cExpect(wrapper.find('.heading').props().children).to.be.eql('My legend');
        });
        
        it('should have a title when mount with infoList', () => {
            const arr = [
                { title: 'My title', legend: 'My legend', value: '200%' },
            ];

            const wrapper = shallow(
                <TrackInfo infoList={arr} />
            );

            cExpect(wrapper.find('.title')).to.have.length(1);
            cExpect(wrapper.find('.title').props().children).to.be.eql('200%');
        });
    });

    describe('Props', () => {
        it('should render one level-item with the passed infoList.', () => {
            const arr = [
                { title: 'My title', legend: 'My legend', value: '200%' },
            ];

            const wrapper = shallow( <TrackInfo infoList={arr} /> );
            cExpect(wrapper.find('.level-item').children()).to.have.length(1);
        });
        
        it('should render two level-item with the passed infoList.', () => {
            const arr = [
                { title: 'My title', legend: 'My legend', value: '200%' },
                { title: 'My title', legend: 'My legend', value: '200%' },
            ];

            const wrapper = shallow( <TrackInfo infoList={arr} /> );

            cExpect(wrapper.find('.level-item').children()).to.have.length(2);
        });

        it('should have the js-active class when isVisible is true.', () => {
            const wrapper = shallow(<TrackInfo isVisible={true} />);
            cExpect(wrapper.find('aside').props().className).to.contains('js-active');
        });
        
        it('should not have the js-active class when isVisible is false.', () => {
            const wrapper = shallow(<TrackInfo isVisible={false} />);
            cExpect(wrapper.find('aside').props().className).to.not.contains('js-active');
        });
    });
});