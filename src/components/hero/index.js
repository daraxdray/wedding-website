import React from 'react'
import TimeCountDown from '../countdown'
import AppConfig from '../../api/config'


const Hero = (props) => {
    return (
        <section className="static-hero" id='home'>
            <div className="hero-container">
                <div className="hero-inner">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-xl-8 col-lg-6 col-12">
                                <div className="wpo-static-hero-inner">
                                    <div className="shape-1"><img src={AppConfig.hero1.shape1} alt=""/></div>
                                    <div data-swiper-parallax="300" className="slide-title">
                                        <h2>  {AppConfig.bride.fName} <span>&</span> {AppConfig.groom.fName}</h2>
                                    </div>
                                    <div data-swiper-parallax="400" className="slide-text">
                                        <p>{AppConfig.gettingMarried}</p>
                                    </div>
                                    <div className="wpo-wedding-date">
                                        <div className="clock-grids">
                                            <TimeCountDown/>
                                        </div>
                                    </div>
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
                        <img src={AppConfig.hero1.hImg1} alt=""/>
                    </div>
                    {/* <div className="static-hero-shape-1" style={{width:150, height:150}}><img src={AppConfig.hero1.shape2} alt=""/></div> */}
                    <div className="static-hero-shape-2" ><img src={AppConfig.hero1.shape3} alt=""/></div>
                </div>
            </div>
        </section>
    )
}

export default Hero;