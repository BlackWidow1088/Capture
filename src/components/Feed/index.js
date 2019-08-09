import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import UserHeader from '../UserHeader';
import Description from './Description';
import TileLayout from './TileLayout';
import MoreOptionIcon from '../MoreOptionIcon';
import Comment from './Comment';

// TODO: move moreoptionicon and related feed in Home

export default class Feed extends React.Component {
    render = () => {
        return (
            this.props.feed && <div className="fp-c-card fp-c-feed">
                {
                    this.props.isRelatedFeed &&
                    <div className='fp-l-position--relative' style={{ top: '-3px', float: 'right', right: '12px' }}>
                        <MoreOptionIcon onClick={this.props.closeRelatedFeed}
                            icon={['fas', 'times-circle']}
                        />
                    </div>
                }
                <TileLayout feed={this.props.feed} updateImageIndex={this.props.updateImageIndex}/>
                {/* <UserHeader user={feed.user} date={feed.date} />
                <Description description={feed.description} />
                <Comment /> */}
            </div>
        )
    }
}
Feed.propTypes = {
};