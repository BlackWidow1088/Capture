// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles';


const Clearfix = ({ children }) => (
  <div className={css(styles.clearfix)}>
    {children}
  </div>
);

Clearfix.propTypes = {
  children: PropTypes.node,
};

export default Clearfix;
