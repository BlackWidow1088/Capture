import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';

import { updateMap } from '../../actions';

class Search extends React.Component {
    componentWillMount() {
        this.props.updateMap({isFullLayout: true})
    }
    componentWillUnmount() {
        this.props.updateMap({isFullLayout: false})
    }
    render = () => {
        return <div></div>
    }
}
const mapStateToProps = (state) => ({})
export default connect(mapStateToProps, { updateMap })(Search);