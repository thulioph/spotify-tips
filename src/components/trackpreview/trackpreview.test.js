import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import chai, { expect as cExpect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import '../../helpers/test-setup';
import TrackPreview from './index';

// ====

chai.use(sinonChai);

// ====

describe('<TrackPreview />', () => {
    describe('Snapshot', () => {
        it('should render without crashing.', () => {
            const wrapper = shallow( <TrackPreview /> );
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
    
    describe('Structure', () => {
        it('should have a box when mount', () => {
            const wrapper = shallow(<TrackPreview />);
            const classname = wrapper.find('div').get(0).props.className;
            
            cExpect(classname).to.be.eql('box track-preview');
        });
        
        it('should have an article when mount', () => {
            const wrapper = shallow(<TrackPreview />);
            
            cExpect(wrapper.find('article')).to.have.length(1);
        });
    });
    
    describe('Props', () => {
        it('should not have a js-active class when isVisilbe is false.', () => {
            const wrapper = shallow(
                <TrackPreview isVisible={false} />
            );

            cExpect(wrapper.find('div').get(0).props.className).to.not.contains('js-active');
        });

        it('should have a js-active class when isVisilbe is true.', () => {
            const wrapper = shallow(
                <TrackPreview isVisible={true} />
            );

            cExpect(wrapper.find('div').get(0).props.className).to.contains('js-active');
        });

        it('should have a strong tag with trackName displayed.', () => {
            const wrapper = shallow(
                <TrackPreview trackName='Segue o baile' />
            );

            cExpect(wrapper.find('strong').props().children).to.be.eql('Segue o baile');
        });
        
        it('should have a img tag with trackImage displayed.', () => {
            const wrapper = shallow(
                <TrackPreview trackImage='track-image.png' />
            );

            cExpect(wrapper.find('img').props().src).to.be.eql('track-image.png');
        });

        it('should have a small tag with trackArtist displayed.', () => {
            const wrapper = shallow(
                <TrackPreview trackArtist='Braza' />
            );

            cExpect(wrapper.find('small').props().children).to.be.eql('Braza');
        });

        it('should not have an audio tag if trackPreviewUrl is not given.', () => {
            const wrapper = shallow( <TrackPreview /> );

            cExpect(wrapper.find('audio')).to.have.length(0);
        });
        
        it('should have an audio tag with trackPreviewUrl displayed.', () => {
            const wrapper = shallow(
                <TrackPreview trackPreviewUrl='track-file.mp3' />
            );

            cExpect(wrapper.find('audio').props().src).to.be.eql('track-file.mp3');
        });
    });
});