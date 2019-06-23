import React from 'react';
import './styles.scss';
import Header from './Header';
import Description from './Description';
import TileLayout from './TileLayout';
import Comment from './Comment';
import MoreOptionIcon from './MoreOptionIcon';

class Feed extends React.Component {
    render = () =>
        <div className="fp-feed">
            <div>
                <Header />
                <Description description={`
                Inner content here aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                aaaaaaaaaaaa \n aaaaaaaaaaaaaaaaaaaaaaaaa \n aaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
                `} />
                <MoreOptionIcon />
                <TileLayout mode={this.props.mode} fotos={this.props.fotos}/>
                <Comment/>
            </div>
            {/* <MoreFeed showMoreOptions={this.state.showMoreOptions} /> */}
        </div>
}

export default Feed