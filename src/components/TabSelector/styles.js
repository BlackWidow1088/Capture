import { StyleSheet } from 'aphrodite';
import { headerHeight, lightGrey } from '../../style-variables';

export default StyleSheet.create({
  tabSelector: {
    position: 'relative',
    height: headerHeight,
    lineHeight: headerHeight,
    background: '#FFFFFF',
    border: `1px solid ${lightGrey}`
  },
});
