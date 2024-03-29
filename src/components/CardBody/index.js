// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles';


const CardBody = ({ children, withPadding, mergeStyles }) => (
  <div
    className={css(
      styles.cardBody,
      withPadding && styles.withPadding,
      mergeStyles
    )}
  >
    {children}
  </div>
);


CardBody.propTypes = {
  children: PropTypes.node,
  withPadding: PropTypes.bool,
  mergeStyles: PropTypes.object,
};

export default CardBody;
