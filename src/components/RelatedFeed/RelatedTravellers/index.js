import React from 'react';
import './styles.scss';
import Header from '../../../../Header';

class RelatedTravellers extends React.Component {
    render() {
        return (
            <div className={this.props.user ? 'fp-related-travellers' : 'fp-is-hidden'}>
                <Header user={this.props.user}/>
            </div>
        )
    }
}

export default RelatedTravellers;