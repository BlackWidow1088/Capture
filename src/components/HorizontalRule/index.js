// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';

import styles from './styles';


const HorizontalRule = ({ mergeStyles }) => (
  <div className={css(styles.horizontalRule, mergeStyles)} />
)

HorizontalRule.propTypes = {
  mergeStyles: PropTypes.object,
};

export default HorizontalRule;
