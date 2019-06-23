// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { css } from 'aphrodite';

import SpriteIcon from '../SpriteIcon';
import styles from './styles';


const SquareLogo = ({ mergeStyles }) => {
  return (
    <Link to="/" className={css(styles.squareLogoContainer, mergeStyles)}>
      <SpriteIcon name="squareLogo" />
    </Link>
  );
};

SquareLogo.propTypes = {
  mergeStyles: PropTypes.object,
};

SquareLogo.defaultProps = {

};

export default SquareLogo;
