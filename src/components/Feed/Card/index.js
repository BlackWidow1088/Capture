import React from 'react';
import './styles.css';
import Avatar from '@material-ui/core/Avatar';
class Card extends React.Component {
    state = { showOptions: false }
    render() {
        return (
            <div className="container">
                <div className="card" id="card-visitors">
                    <input type="checkbox" id="card-visitors-indicator" checked={this.state.showOptions} onChange={() => this.setState({ showOptions: !this.state.showOptions })} />
                    <div className="header">
                        <label className="indicator" for="card-visitors-indicator">
                            <svg className="open" width={18} height={27}>
                                <line x1={1.5} y1={12} x2={2} y2={25} strokeLinecap={'round'} style={{ stroke: '#FFFFFF', strokeWidth: 3 }} />
                                <line x1={9} y1={7} x2={9} y2={25} strokeLinecap={'round'} style={{ stroke: '#FFFFFF', strokeWidth: 3 }} />
                                <line x1={16.5} y1={2} x2={16.5} y2={25} strokeLinecap={'round'} style={{ stroke: '#FFFFFF', strokeWidth: 3 }} />
                            </svg>
                            <svg className="close" width={15} height={25}>
                                <line x1={1.5} y1={13.5} x2={15} y2={0} style={{ stroke: '#FFFFFF', strokeWidth: 3 }} />
                                <line x1={1.5} y1={11.5} x2={15} y2={25} style={{ stroke: '#FFFFFF', strokeWidth: 3 }} />
                            </svg>
                        </label>
                        <div className="content">
                            <div className="data">
                                <div className="top">
                                    <p className="title">Visitors</p>
                                    <p className="date">01 Sep 2016 - 15 Sep 2016</p>
                                </div>
                                <div className="graph">
                                  inner content
                                </div>
                            </div>
                            <Avatar className="avatar" aria-label="Recipe" alt="Natalie Osmann" src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/nataly_osmann.png'} />
                            <p className="title">Today</p>
                            <p className="date">15 Sep 2016</p>
                            <div>Comments and likes go here</div>
                            <div className="float">
                                {/* <img style={{width: '100%'}} src={process.env.PUBLIC_URL + '/data/fotos/NatalieOsmann/nataly_osmann.png'}></img> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="info">
                            Bottom icons for like comment will go here
                    </div> */}
                </div>
            </div>
        );
    }

}

export default Card;