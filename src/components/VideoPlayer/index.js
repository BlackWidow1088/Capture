import React from 'react';
import { Player } from 'video-react';

export default props => {
  return (
    <Player
      playsInline
      poster={props.img}
      src={props.video}
    />
  );
};