import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar'
import Hero from '../../components/hero'
import Scrollbar from '../../components/scrollbar'
import CoupleSection from '../../components/CoupleSection/CoupleSection';
import VideoSection from '../../components/VideoSection';
import StorySection from '../../components/StorySection/StorySection';
import PortfolioSection from '../../components/PortfolioSection/PortfolioSection';
import RSVP from '../../components/RSVP';
import CtaSection from '../../components/CtaSection/CtaSection';
import BrideGrooms from '../../components/BrideGrooms/BrideGrooms';
import EventSection from '../../components/EventSection/EventSection';
import PartnerSection from '../../components/PartnerSection/PartnerSection';
import BlogSection from '../../components/BlogSection/BlogSection';
import Footer from '../../components/footer/Footer';
import AppConfig from '../../api/config';
import WelcomeModal from '../../components/WelcomeModal';
import PortfolioSection2 from '../../components/PortfolioSection2/PortfolioSection2';
import PortfolioSection3 from '../../components/PortfolioSection3/PortfolioSection3';
import { AccessCodeGenerator } from '../../components/RSVP/access_code_generator';
import TimeCountDown from '../../components/countdown';
import { AccessCodeVeriifier } from '../../components/RSVP/verify_access_code';



const VerifyAccessCode = () => {

    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header-s1'} />
            <section className="static-hero" id='home'>
                <div className="hero-container">
                    <div className="hero-inner">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-xl-12 col-lg-12 col-12">
                                    <div className="wpo-static-hero-inner m-auto">
                                       
                                        <AccessCodeVeriifier />
                                        <div className="wpo-wedding-date ">
                                            <div className="clock-grids m-auto w-50" >
                                                <TimeCountDown />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        

            


        </Fragment>
    )
};

export default VerifyAccessCode;