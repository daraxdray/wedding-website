import React, { Fragment } from 'react';
import Navbar from '../../components/Navbar'
import { AccessCodeGenerator } from '../../components/RSVP/access_code_generator';
import TimeCountDown from '../../components/countdown';



const GetAccessCode = () => {

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
                                       
                                        <AccessCodeGenerator />
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

export default GetAccessCode;