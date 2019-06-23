// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles';


const Card = ({ children }) => {
  return (
    <div className={css(styles.card)}>
      { children }
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node,
};

Card.defaultProps = {

};

export default Card;
