import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';

import Toggle from '../../Toggle';
import { findUserName } from '../../../utils/scrap.utils';
import MoreOptionIcon from '../../MoreOptionIcon';

class RelatedFeed extends React.Component {
    state = {
        showPhotos: true,
        currentImageIndex: -1
    }
    toggleRelatedFeed = () => {
        this.setState({ showPhotos: !this.state.showPhotos })
    }
    render = () => {
        let data = [[]];
        const feed = this.props.relatedFeed.filter(item => item.feedId === this.props.feedId)
        if (feed.length) {
            feed[0].fotos.forEach((item, index) => {
                item.imgSrc = `${process.env.PUBLIC_URL}/data/fotos/${findUserName(item.user.username)}/Journeys/0/${item.src}`
                item.imageIndex= `feed${item.id}${item.src}`
                const id = index%3;
                if(!data[id]) {
                    data.push([])
                }
                data[id].push(item);
            });
        }
        return (
            <div className={feed.length && this.props.isVisible ? 'fp-related-feed-container' : 'fp-related-feed-container fp-visibility-hide'}>
                <Toggle toggle={this.toggleRelatedFeed} isActive={this.state.showPhotos} />
                <div className='fp-position-relative' style={{top: '-3px',float: 'right', right: '12px' }}>
                        <MoreOptionIcon onClick={this.props.close}
                            icon={['fas', 'times-circle']}
                        />
                </div>
                {
                    this.state.showPhotos ?
                        <div className='fp-display-flex'>
                            <div>
                                {
                                    data.map(foto => 
                                        <div key={Math.random()}  className={feed.length? 'fp-related-column' : 'fp-visibility-hide'}>
                                            {
                                                foto.map(item => 
                                                <img key={Math.random()} alt={0} src={item.imgSrc} 
                                                className={this.state.currentImageIndex === item.imageIndex ? 'fp-img-border':''}
                                                onClick={() => {
                                                    this.setState({currentImageIndex: item.imageIndex})
                                                    this.props.showFeed(item.id)
                                                }}/>)
                                            }
                                        </div>
                                        )
                                }
                            </div>
                        </div> :
                        <div>
                            travellers
                        </div>
                }
            </div>
        )
    }

}


const mapStateToProps = (state, ownprops) => ({
    relatedFeed: state.feed.relatedFeed
});

export default connect(mapStateToProps)(RelatedFeed);