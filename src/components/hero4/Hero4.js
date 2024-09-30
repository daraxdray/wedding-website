import React from 'react'
import LocationMap from '../Modal'
import shape1 from '../../images/slider/flower1.png'
import shape2 from '../../images/slider/flower2.png'
import AppConfig from '../../api/config'


const Hero4 = (props) => {
    return (
        <section className="static-hero-s3">
            <div className="hero-container">
                <div className="hero-inner">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6">
                                <div className="wpo-event-item">
                                    <div className="wpo-event-text">
                                    <h2>{AppConfig.bride.fName} & {AppConfig.groom.fName}</h2>
                                        <p>{AppConfig.gettingMarried}</p>
                                        <ul>
                                            <li>{AppConfig.marriageDate} <br/>
                                                {AppConfig.time}</li>
                                            <li>{AppConfig.venue}</li>
                                            <li><LocationMap /></li>
                                        </ul>
                                    </div>
                                    <div className="shape-1"><img src={shape1} alt="" /></div>
                                    <div className="shape-2"><img src={shape2} alt="" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero4;