import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import { formatPostTimestamp } from '../../utils/time.utils';

class UserHeader extends React.Component {
    render = () => {
        return (
            <div className="fp-c-user-header" onClick={()=>this.props.onSelect(this.props.index)}>
                <div className="fp-c-user-header__avatar">
                    <img alt={this.props.user.username} src={`${this.props.user.userpic}`} />
                </div>
                <div className="fp-c-user-header__bar">
                    {  this.props.user && this.props.user.username && <div className="fp-c-user-header__title">{this.props.user.username}</div>}
                    {  this.props.date && <div className="fp-c-user-header--subheader">{formatPostTimestamp(this.props.date)}</div>}
                    {  this.props.data && <div className="fp-c-user-header--subheader">{this.props.data}</div>}
                </div>
            </div>
        )
    }
}

UserHeader.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        username: PropTypes.string,
        userpic: PropTypes.string.isRequired
    }).isRequired,
    date: PropTypes.instanceOf(Date),
    data: PropTypes.string
};

export default UserHeader

