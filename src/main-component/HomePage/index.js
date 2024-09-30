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



const HomePage = () => {
    
    return (
        <Fragment>
            <Navbar hclass={'wpo-site-header-s1'} />
            <Hero />
            <CoupleSection />
            {AppConfig.isVisible.storySection && <StorySection />}
            {AppConfig.isVisible.videoSection && <VideoSection />}
            {AppConfig.isVisible.ctaSection && <CtaSection />}
            {AppConfig.isVisible.portfolioSection && <PortfolioSection />}
            {AppConfig.isVisible.portfolioSection && <PortfolioSection3 />}
            {AppConfig.isVisible.rsvp && <RSVP />}
            {AppConfig.isVisible.brideGrooms && <BrideGrooms />}
            {AppConfig.isVisible.eventSection && <EventSection />}
            {AppConfig.isVisible.partnerSection && <PartnerSection />}
            {AppConfig.isVisible.blogSection && <BlogSection />}
            {AppConfig.isVisible.footer && <Footer />}
            {AppConfig.isVisible.scrollbar && <Scrollbar />}
            <WelcomeModal />
        </Fragment>
    )
};

export default HomePage;