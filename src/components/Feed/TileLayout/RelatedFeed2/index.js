import React from 'react';
import './styles.scss';

class RelatedFeed2 extends React.Component {
    render = () =>
        <div className='fp-related-feed2'>
            <div className='fp-position-relative'>
                {
                    this.props.fotos.map((item, index) => 
                    index < 6 &&
                    <img key={index} src={`${process.env.PUBLIC_URL}/data/fotos/${this.props.formattedName}/Journeys/0/${item.foto}`} />
                    )
                }
            </div>
        </div>
    
}

export default RelatedFeed2