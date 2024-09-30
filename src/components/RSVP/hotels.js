import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactFancyBox from 'react-fancybox'
import AppConfig from "../../api/config";



const HotelSection = (props) => {
    const { selected, setSelected } = props;

    var settings = {
        dots: false,
        arrows: true,
        speed: 500,
        slidesToShow: 2,
        // slidesToScroll: 1,
        // slidesToShow: 3,

        autoplay: true,
        responsive: [
            {
                breakpoint: 1500,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: true,

                }
            }
        ]
    };

    return (

        <section className={`wpo-portfolio-section-s2 section-padding ${props.pClass}`}>
            <div className="sortable-gallery">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="portfolio-grids gallery-container clearfix">
                            <Slider {...settings}>
                                {AppConfig.hotels.map((partner, pitem) => (
                                    <div key={pitem} className={`col btn ${selected != null && selected == pitem ? ' btn-sm border-success' : ''}`} onClick={() => setSelected(pitem)}>
                                        <div className="grid  " key={pitem}>
                                            <img src={partner.pImg} alt="" />
                                        </div>
                                        <div className="col">
                                        <p className="text-center ">{partner.room} Rooms</p>
                                        <p className="text-center text-danger">N{partner.price}</p>
                                        </div>
                                    </div>

                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default HotelSection;