import React, { useState } from 'react';
import SectionTitle from '../SectionTitle'


import shape1 from '../../images/rsvp/shape1.png'
import shape2 from '../../images/rsvp/shape2.png'
import AppConfig from '../../api/config';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
const StorySection = (props) => {
    const [viewChat,setView] = useState(false);

    return (
        <section className="story-section section-padding" id="story">
            <div className="container">
                <div className="row">
                    <SectionTitle MainTitle={'Our Sweet Story'} />
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="story-timeline">
                            <div className="row">
                                <div className="col offset-lg-6 col-lg-6 col-12 text-holder">
                                    <span className="heart">
                                        <i className="fi flaticon-balloon"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="story-timeline-item s1">
                                <div className="row align-items-center">
                                    <div className="col col-lg-6 col-12">
                                        <div className="img-holder right-align-text fadeInLeftSlow" style={{ marginRight: 16 }} data-wow-duration="1500ms">
                                            <img src={AppConfig.ourStory.img1} className="img img-responsive" alt="stroy" />
                                        </div>
                                        
                                    </div>
                                    <div className="col col-lg-6 col-12">
                                        <div className="story-text left-align-text fadeInRightSlow" data-wow-duration="2000ms">
                                            <h3>{AppConfig.ourStory.t1}</h3>
                                            <span className="date">{AppConfig.ourStory.d1}</span>
                                            <div className="line-shape">
                                                <div className="outer-ball">
                                                    <div className="inner-ball"></div>
                                                </div>
                                            </div>
                                            <p>{AppConfig.ourStory.description}</p>

                                            <button className='btn mt-5 theme-btn bg-dark' onClick={()=>setView((view)=> !view)}>
                                            😂😍 View Our First Chat 😂😍
                                            </button>
                                        {viewChat && <div  data-wow-duration="1500ms">
                                        <Swiper
                                                // install Swiper modules
                                                modules={[Navigation, Pagination, A11y]}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                pagination={{ clickable: true }}
                                                // loop={true}
                                                speed={500}
                                                parallax={true}
                                                navigation
                                                autoplay={true}
                                                style={{height:'50%', width:'100%', marginTop:60}}
                                                
                                            >
                                                <SwiperSlide>
                                                <img src={AppConfig.ourStory.img11}  className="img img-responsive" alt="stroy" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                <img src={AppConfig.ourStory.img12} className="img img-responsive" alt="stroy" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                <img src={AppConfig.ourStory.img13} className="img img-responsive" alt="stroy" />
                                                </SwiperSlide>
                                                ...
                                            </Swiper>    
                                        </div>}
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="story-timeline-item">
                                <div className="row align-items-center">
                                    <div className="col col-lg-6 col-12 order-lg-1 order-2 text-holder left-text">
                                        <div className="story-text right-align-text fadeInLeftSlow" data-wow-duration="2000ms">
                                            <h3>{AppConfig.ourStory.t2}</h3>
                                            <span className="date">{AppConfig.ourStory.d2}</span>
                                            <div className="line-shape s2">
                                                <div className="outer-ball">
                                                    <div className="inner-ball"></div>
                                                </div>
                                            </div>
                                            <p>{AppConfig.ourStory.description1}</p>
                                            <div className="line-shape s2">
                                                <div className="outer-ball">
                                                    <div className="inner-ball"></div>
                                                </div>
                                            </div>
                                            {/* <p>{AppConfig.ourStory.description2}</p> */}
                                        </div>
                                    </div>
                                    <div className="col col-lg-6 col-12 order-lg-2 order-1">
                                        <div className="img-holder left-align-text">

                                            <img src={AppConfig.ourStory.img2} alt="stroy" className="img img-responsive fadeInRightSlow" data-wow-duration="1500ms"/>
                                           

                                            <span className="heart">
                                                <i className="fi flaticon-dance"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="story-timeline-item">
                                <div className="row align-items-center">
                                    <div className="col col-lg-6 col-12">
                                        <div className="img-holder right-align-text left-site right-heart">
                                            <img src={AppConfig.ourStory.img3} alt="stroy" className="img img-responsive fadeInLeftSlow" data-wow-duration="1500ms" />
                                            <span className="heart">
                                                <i className="fi flaticon-dove"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col col-lg-6 col-12">
                                        <div className="story-text left-align-text fadeInRightSlow" data-wow-duration="2000ms">
                                            <h3>{AppConfig.ourStory.t3}</h3>
                                            <span className="date">{AppConfig.ourStory.d3}</span>
                                            <div className="line-shape">
                                                <div className="outer-ball">
                                                    <div className="inner-ball"></div>
                                                </div>
                                            </div>
                                            <p>{AppConfig.ourStory.description3}</p>
                                            <div className="line-shape">
                                                <div className="outer-ball">
                                                    <div className="inner-ball"></div>
                                                </div>
                                            </div>
                                            <p>{AppConfig.ourStory.description4}</p>
                                            <p>{AppConfig.ourStory.description5}</p>
                                            <div className="line-shape">
                                                <div className="outer-ball">
                                                    <div className="inner-ball"></div>
                                                </div>
                                            </div>
                                            <p>{AppConfig.ourStory.description6}</p>
                                            <p>{AppConfig.ourStory.description7}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shape-1">
                <div className="sticky-shape">
                    <img src={shape1} alt="" />
                </div>
            </div>
            <div className="shape-2">
                <div className="sticky-shape">
                    <img src={shape2} alt="" />
                </div>
            </div>
        </section>
    )
}


export default StorySection;