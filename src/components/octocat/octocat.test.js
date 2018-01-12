import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import chai, { expect as cExpect } from 'chai';

import '../../helpers/test-setup';
import Octocat from './index';

// ====

describe('<Octocat />', () => {
    describe('Snapshot', () => {
        it('should render without crashing.', () => {
            const wrapper = shallow(<Octocat />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('Structure', () => {
        it('should have an <a> when mount', () => {
            const wrapper = shallow(<Octocat />);
            cExpect(wrapper.find('a')).to.have.length(1);
        });
        
        it('should have an svg when mount', () => {
            const wrapper = shallow(<Octocat />);
            cExpect(wrapper.find('svg')).to.have.length(1);
        });
        
        it('should have three paths when mount', () => {
            const wrapper = shallow(<Octocat />);
            cExpect(wrapper.find('path')).to.have.length(3);
        });
    });

    describe('Props', () => {
        it('should render with the passed track image.', () => {
            const wrapper = shallow(
                <Octocat repoUrl='repo-url.html' />
            );

            cExpect(wrapper.find('a').props().href).to.be.eql('repo-url.html');
        });
        
        it('should render with the passed track image.', () => {
            const wrapper = shallow(
                <Octocat title='Fork me on Github' />
            );

            cExpect(wrapper.find('a').props().title).to.be.eql('Fork me on Github');
        });
    });
});