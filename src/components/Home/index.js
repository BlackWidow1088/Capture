// eslint-disable-next-line no-unused-vars
import React from 'react';
import Feed from '../Feed';


const Home = () => {
  return (
    <div>
      <div>
        <Feed mode='landscape' fotos={['Screenshot (25).png', 'Screenshot (25).png', 'Screenshot (26).png', 'Screenshot (27).png', 'Screenshot (28).png']}/>
        <Feed mode='portrait' fotos={['portrait.png', 'Screenshot (49).png', 'Screenshot (30).png','Screenshot (49).png',  'Screenshot (33).png', 'Screenshot (32).png']}/>
      </div>
    </div>
  );
};

Home.propTypes = {

};

Home.defaultProps = {

};

export default Home;
