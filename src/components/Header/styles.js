import { StyleSheet } from 'aphrodite';
import {
  primaryColor,
  darkerPrimaryColor,
  headerHeight
} from '../../style-variables.js';


export default StyleSheet.create({
  headerContainer: {
    position: 'relative',
    zIndex: 10,
    height: headerHeight,
    minWidth: '100%',
  },
  header: {
    position: 'fixed',
    width: '100%',
    top: '0',
    height: headerHeight,
    backgroundColor: 'white',
    borderBottom: `1px solid ${darkerPrimaryColor}`,
    color: '#FFFFFF',
  },
  headerContents: {
    display: 'flex',
    justifyContent: 'space-between',
    height: headerHeight
  },
  // headerSearch: {
  //   margin: 'auto'
  //   // flex: '1 1 auto',
  // },
  headerNavigation: {
    flex: '0 0 auto',
    height: headerHeight,
    lineHeight: headerHeight,
  },
  headerNavigationChunk: {
    display: 'inline-block',
    height: headerHeight,
    padding: '0 9px',
  },
  // logo: {
  //   margin: '9px 5px 7px 5px',
  //   // float: 'left',
  // },
  // searchInput: {
  //   borderStyle: 'solid',
  //   borderWidth: '1px',
  //   borderColor: `${darkerPrimaryColor}`,
  //   borderRadius: '3px',
  //   outline: 'none',
  //   color: '#333',
  // },
});
