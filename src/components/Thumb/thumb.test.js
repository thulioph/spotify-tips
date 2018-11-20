import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Thumb from './index';

describe('Thumb component', () => {
  let component;
  let mockFunc;
  let ThumbComponent;
  
  beforeEach(() => {
    mockFunc = jest.fn();

    ThumbComponent = (
      <Thumb
        image={'my-image.png'}
        title={'My Title'}
        subTitle={'My Subtitle'}
        handleClick={mockFunc}
      />
    );

    component = mount(ThumbComponent);
  });

  it('Should render the correct snapshot', () => {
    const component = renderer.create(ThumbComponent).toJSON();
    expect(component).toMatchSnapshot();
  });

  it('Should render with the correct properties.', () => {
    expect(component.find('img').props().src).toBe('my-image.png');
    expect(component.find('.card-title').text()).toEqual('My Title');
    expect(component.find('.card-subtitle').text()).toEqual('My Subtitle');
  });

  it('Should call handleClick when the card is clicked.', () => {
    component.find('.card').simulate('click');

    expect(mockFunc).toBeCalled();
    expect(mockFunc).toBeCalledTimes(1);
  });
});