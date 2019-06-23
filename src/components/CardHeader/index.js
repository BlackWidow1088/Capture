// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import SpriteIcon from '../SpriteIcon';
import styles from './styles';


const CardHeader = ({ children, icon }) => {
  const iconElement = icon && (
    <SpriteIcon name={icon} mergeStyles={styles.icon} />
  );

  return (
    <h3 className={css(styles.cardHeader)}>
      {iconElement}
      {children}
    </h3>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.string,
};

CardHeader.defaultProps = {

};

export default CardHeader;
