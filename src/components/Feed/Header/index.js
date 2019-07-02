import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import Avatar from '@material-ui/core/Avatar';
import { findUserName } from '../../../utils/scrap.utils';
import { formatPostTimestamp } from '../../../utils/time.utils';

class Header extends React.Component {
    render = () => {
        const formattedName = findUserName(this.props.user.username);
        return (
            <div className="fp-header">
                <div className="fp-avatar">
                    <Avatar aria-label="Recipe" alt={this.props.user.username} src={`${process.env.PUBLIC_URL}/data/fotos/${formattedName}/${this.props.user.userpic}`} />
                </div>
                <div className="fp-header-bar">
                    <div className="fp-header-title">{this.props.user.username}</div>
                    {  this.props.date && <div className="fp-header-subheader">{formatPostTimestamp(this.props.date)}</div>}
                    {  this.props.data && <div className="fp-header-subheader">{this.props.data}</div>}
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    user: PropTypes.shape({
        uid: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        userpic: PropTypes.string.isRequired
    }).isRequired,
    date: PropTypes.instanceOf(Date),
    data: PropTypes.string
};

export default Header

