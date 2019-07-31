import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import UserHeader from '../../UserHeader';
import { updateActiveFeed } from '../../../actions';

class ProfileLink extends React.Component {
    render = () => {
        let user = this.props.user || {username: 'App', userpic: 'journey.jpg', uid: 'app'}, count = 0;
        // this.props.updateActiveFeed({ feedId: this.props.feedId, photoId: null, user: user });
        return (
        <div>
            <UserHeader user={user}/>
            <div className='fp-l-display--grid fp-l-profile-link__grid'>
                {
                    this.props[this.props.category].map(item => {
                        let src = `${item.foto}`
                        if(user.username === 'App') {
                            src = `${item.foto}`
                        }
                        return (
                            <img key={count++} alt={user.username} src={src} />
                        )
                    })
                }
            </div>
        </div>
        )
    }
}
const mapStateToProps = (state) => ({
})
export default connect(mapStateToProps, { updateActiveFeed })(ProfileLink);