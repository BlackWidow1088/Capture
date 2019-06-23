import React from 'react';
import './styles.css';
import Avatar from '@material-ui/core/Avatar';
class Header extends React.Component {
    render = () =>
        <div className="fp-header">
            <div className="fp-avatar">
            <Avatar aria-label="Recipe" alt="Natalie Osmann" src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/nataly_osmann.png'} />
            </div>
            <div className="fp-header-bar">
                <div className="fp-header-title">Natalie Osmann</div>
                <div className="fp-header-subheader">21 June 2019</div>
            </div>
        </div>
}

export default Header

