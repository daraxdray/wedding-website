import React from 'react'
import TimeCountDown from '../countdown';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import AppConfig from '../../api/config';

const Hero3 = (props) => {
    return (
        <section className="wpo-hero-slider wpo-hero-style-3">
            <div className="wedding-announcement">
                <div className="couple-text">
                    <h2>{AppConfig.bride.fName} & {AppConfig.groom.fName}</h2>
                    <p>{AppConfig.gettingMarried}</p>
                    <div className="wpo-wedding-date">
                        <div className="clock-grids">
                            <TimeCountDown/>
                        </div>
                    </div>
                </div>
            </div>
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                speed={1800}
                parallax={true}
                navigation
            >
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${AppConfig.hero3.slide1})` }}>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${AppConfig.hero3.slide2})` }}>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="swiper-slide">
                        <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${AppConfig.hero3.slide3})` }}>
                        </div>
                    </div>
                </SwiperSlide>
                ...
            </Swiper>

        </section>
    )
}

export default Hero3;