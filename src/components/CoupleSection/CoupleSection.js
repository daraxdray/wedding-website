import React from 'react';
import { Link } from 'react-router-dom'

import shape1 from '../../images/couple/shape-1.png'
import shape2 from '../../images/couple/shape-2.png'
import shape3 from '../../images/couple/shape-3.png'
import shape4 from '../../images/couple/shape-4.png'
import AppConfig from '../../api/config';



const CoupleSection = (props) => {

    return (
        <section className={`couple-section section-padding ${props.cClass}`} id="couple">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col col-lg-11">
                        <div className="couple-area clearfix">
                            <div className="couple-item bride">
                                <div className="row align-items-center">
                                    <div className="col-lg-4">
                                        <div className="couple-img">
                                            <img src={AppConfig.bride.headshot} alt="" />
                                            <div className="couple-shape">
                                                <img src={shape3} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <div className="couple-text">
                                            <h3>{AppConfig.bride.fName} {AppConfig.bride.lName}</h3>
                                            <p>{AppConfig.bride.about}</p>
                                            <div className="social">
                                                <ul>
                                                    <li><Link to={`${AppConfig.bride.fb}`}><i className="ti-facebook"></i></Link></li>
                                                    <li><Link to={`${AppConfig.bride.tw}`}><i className="ti-twitter-alt"></i></Link></li>
                                                    <li><Link to={`${AppConfig.bride.in}`}><i className="ti-instagram"></i></Link></li>
                                                    <li><Link to={`${AppConfig.bride.pn}`}><i className="ti-pinterest"></i></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="couple-item groom">
                                <div className="row align-items-center">
                                    <div className="col-lg-7 order-lg-1 order-2">
                                        <div className="couple-text">
                                            <h3>{AppConfig.groom.fName} {AppConfig.groom.lName}</h3>
                                            <p>{AppConfig.groom.about}</p>
                                            <div className="social">
                                                <ul>
                                                <li><Link to={`${AppConfig.groom.fb}`}><i className="ti-facebook"></i></Link></li>
                                                    <li><Link to={`${AppConfig.groom.tw}`}><i className="ti-twitter-alt"></i></Link></li>
                                                    <li><Link to={`${AppConfig.groom.in}`}><i className="ti-instagram"></i></Link></li>
                                                    <li><Link to={`${AppConfig.groom.pn}`}><i className="ti-pinterest"></i></Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 order-lg-2 order-1">
                                        <div className="couple-img">
                                            <img src={AppConfig.groom.headshot} alt="" />
                                            <div className="couple-shape">
                                                <img src={shape4} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shape-1">
                <img src={shape1} alt="" />
            </div>
            <div className="shape-2">
                <img src={shape2} alt="" />
            </div>
        </section>

    );
}



export default CoupleSection;