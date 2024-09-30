import React from 'react'
import TimeCountDown from '../countdown';
import AppConfig from '../../api/config';


const Hero5 = (props) => {
    return (
        <section className="wpo-hero-style-4">
            <div className="wedding-announcement">
                <div className="couple-text">
                    <h2>{AppConfig.bride.fName} & {AppConfig.groom.fName}</h2>
                    <p>{AppConfig.gettingMarried}</p>
                    <div className="wpo-wedding-date">
                        <div className="clock-grids">
                            <TimeCountDown />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero5;