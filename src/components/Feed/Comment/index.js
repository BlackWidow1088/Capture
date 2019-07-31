import React from 'react';
import './styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Comment extends React.Component {
    render = () => {
        return (
            <div className="fp-c-comment">
                <div className="fp-c-comment__header">
                    <div>
                        <div className='fp-c-comment__like'>
                            <FontAwesomeIcon icon="thumbs-up" size="lg" color='white' />
                        </div>
                        <div className='fp-c-comment__laugh'>
                            <FontAwesomeIcon icon="laugh-beam" size="lg" color='#ffeb3b' />
                        </div>
                        <div className='fp-c-comment__heart'>
                            <FontAwesomeIcon icon="heart" size="lg" color='white' />
                        </div>
                    </div>
                    <div className="fp-l-float--right">
                        <div>
                            100 comments
                         </div>
                        <div className="fp-l-margin--left-12">
                            100 shares
                        </div>
                    </div>
                </div>
                <div className="fp-c-comment__footer">
                    <div>
                        <FontAwesomeIcon className='fp-c-comment__action' icon={['far', "thumbs-up"]} size="lg" />
                        Like
                    </div>
                    <div>
                        <FontAwesomeIcon className='fp-c-comment__action' icon={['far', "share-square"]} size="lg" />
                        Share
                    </div>
                    <div>
                        <FontAwesomeIcon className='fp-c-comment__action' icon={['far', "comment-alt"]} size="lg" />
                        Comment
                        </div>
                </div>
            </div>

        )
    }

}

export default Comment