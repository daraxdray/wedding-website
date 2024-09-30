import React from 'react'

import AppConfig from '../../api/config'


const Hero2 = (props) => {
    return (
        <section className="static-hero-s2" id='home'>
            <div className="hero-container">
                <div className="hero-inner">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6 col-12">
                                <div className="wpo-static-hero-inner">
                                    <div className="shape-1"><img src={AppConfig.hero2.shape1} alt="" /></div>
                                    <div data-swiper-parallax="300" className="slide-title">
                                    <h2>{AppConfig.groom.fName} <span>&</span> {AppConfig.bride.fName}</h2>
                                    </div>
                                    <div data-swiper-parallax="400" className="slide-text">
                                    <p>{AppConfig.gettingMarried}</p>
                                    </div>
                                    <div className="shape-2"><img src={AppConfig.hero2.shape2} alt="" /></div>
                                    <div className="clearfix"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="static-hero-right">
                <div className="static-hero-img">
                    <div className="static-hero-img-inner">
                        <img src={AppConfig.hero2.hImg1} alt="" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero2;