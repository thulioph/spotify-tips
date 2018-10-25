import React from 'react';
import { compose, withState, withHandlers } from 'recompose';

const enhance = compose(
  withState('value', 'updateValue', 0),
  withHandlers({
    handleClick: (props) => () => {
      props.updateValue(props.value + 1);
    },
  }),
);

const LoginPage = enhance(({ value, handleClick }) =>
  <div>
    <h1>Login Page - {value}</h1>
    <button onClick={handleClick}>click</button>
  </div>
);

export default LoginPage;