import React from 'react';
import './styles.scss';

import Toggle from '../Toggle';

export default class RelatedFeed extends React.Component {
    state = {
        showFood: false,
        currentImageIndex: -1
    }
    toggleRelatedFeed = () => {
        this.setState({ showFood: !this.state.showFood })
    }
    render = () => {
        let feed = this.props.feed
        return (
            <div className={feed ? 'fp-c-card fp-c-related-feed': 'fp-c-card fp-c-related-feed fp-is-hidden'}>
                <Toggle toggle={this.toggleRelatedFeed} isActive={this.state.showFood} />
                {
                    feed && 
                    (() => {
                        let fotos = feed.feed.map(data => ({ ...data.fotos[0], relatedFeedId: data.id, originalFeedId: feed.feedId }))
                        if (this.state.showFood) {
                            fotos = fotos.filter(data => data.category === 'food')
                        } else {
                            fotos = fotos.filter(data => data.category !== 'food')
                        }
                        return (
                            <div className='fp-l-display--grid fp-l-related-feed__container'>
                                {
                                    fotos.map(item =>
                                        <img key={item.fotoId} alt={0} src={item.foto}
                                            className={this.state.currentImageIndex === item.fotoId ? 'fp-c-related-feed__image fp-is-active' : 'fp-c-related-feed__image'}
                                            onClick={() => {
                                                this.setState({ currentImageIndex: item.fotoId })
                                                this.props.showRelatedFeed(item.relatedFeedId, item.originalFeedId)
                                            }} />)

                                }
                            </div>
                        )
                    })()

                    // :
                    // <div>
                    //     travellers
                    // </div>
                }
            </div>
        )
    }

}
