import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

const Thumb = ({ image, title, subTitle, handleClick }) => {
  return (
    <Card onClick={handleClick}>
      <CardImg top width="100%" src={image} alt={title} />

      <CardBody>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{subTitle}</CardSubtitle>
      </CardBody>
    </Card>
  );
};

Thumb.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  handleClick: PropTypes.func,
};

Thumb.defaultProps = {
  image: '',
  title: '',
  subTitle: '',
  handleClick: null,
};

export default Thumb;