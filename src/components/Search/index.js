import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './styles.scss';

// TODO: query parameters not passed correctly in react router
class Search extends React.Component {
    state = {
        value: null
    }
    componentWillMount() {
        console.log(this.props.location)
        this.setState({value: this.props.location.search});
        this.unlisten = this.props.history.listen((location, action) => { 
            this.setState({value: location.search});
        });
    }
    componentWillUnmount() {
        this.unlisten();
    }
    render() {
        return (
            <div>
                {this.state.value}
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => ({
})
export default connect(null, {  })(withRouter(Search));