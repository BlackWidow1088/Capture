// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'aphrodite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SpriteIcon from '../SpriteIcon';
import styles from './styles';


const SquareLogo = ({ mergeStyles, searchJourney, icon }) => {
  return (
    <div onClick={searchJourney} className={css(styles.squareLogoContainer)}>
      {/* <SpriteIcon name="squareLogo" /> */}
      <FontAwesomeIcon icon={icon} size='3x' color={'#29487d'} />
    </div>
  );
};

SquareLogo.propTypes = {
  mergeStyles: PropTypes.object,
};

SquareLogo.defaultProps = {

};

export default SquareLogo;
