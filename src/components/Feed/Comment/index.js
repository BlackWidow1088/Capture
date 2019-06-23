import React from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Comment extends React.Component {
    render = () => {
        return (
            <div className="fp-comment">
                <div className="fp-comment-header">
                    <div>
                        <div className='fp-comment-like'>
                            <FontAwesomeIcon icon="thumbs-up" size="lg" color='white' />
                        </div>
                        <div className='fp-comment-laugh'>
                            <FontAwesomeIcon icon="laugh-beam" size="lg" color='#ffeb3b' />
                        </div>
                        <div className='fp-comment-heart'>
                            <FontAwesomeIcon icon="heart" size="lg" color='white' />
                        </div>
                    </div>
                    <div className="fp-float-r">
                        <div>
                            100 comments
                         </div>
                        <div className="fp-margin-l-12">
                            100 shares
                        </div>
                    </div>
                </div>
                <div className="fp-comment-footer">
                    <div>
                        <FontAwesomeIcon className='fp-comment-action' icon={['far', "thumbs-up"]} size="lg" />
                        Like
                    </div>
                    <div>
                        <FontAwesomeIcon className='fp-comment-action' icon={['far', "share-square"]} size="lg" />
                        Share
                    </div>
                    <div>
                        <FontAwesomeIcon className='fp-comment-action' icon={['far', "comment-alt"]} size="lg" />
                        Comment
                        </div>
                </div>
            </div>

        )
    }

}

export default Comment