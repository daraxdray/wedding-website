import React from 'react'
import {Link}  from 'react-router-dom'


const Footer = (props) =>{

    const ClickHandler = () =>{
        window.scrollTo(10, 0);
    }

    const SubmitHandler = (e) =>{
        e.preventDefault()
     }

  return(

    <footer className="wpo-site-footer">
        <div className="wpo-upper-footer">
            <div className="container">
                <div className="row">
                    <div className="col col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="widget about-widget">
                            <div className="widget-title">
                                <Link onClick={ClickHandler} className="logo" to="/"><small>The</small>Oxygen<span><i
                                    className="fi flaticon-dove"></i></span></Link>
                            </div>
                            <p>They say love is a beautiful thing, but without BREATHE, you cannot experience it. Here's to the Oxygens that keeps us alive and in love. 
                                <br/>Cheers to us🥂</p>
                            <ul>
                                <li>
                                    <Link onClick={ClickHandler} to="/">
                                        <i className="ti-facebook"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} to="/">
                                        <i className="ti-twitter-alt"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} to="/">
                                        <i className="ti-instagram"></i>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={ClickHandler} to="/">
                                        <i className="ti-google"></i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="widget link-widget">
                            <div className="widget-title">
                                <h3>Information</h3>
                            </div>
                            <ul>
                                <li><Link onClick={ClickHandler} to="/">About Us</Link></li>
                                <li><Link onClick={ClickHandler} to="/">Latest News</Link></li>
                                <li><Link onClick={ClickHandler} to="#">Accomodation</Link></li>
                                <li><Link onClick={ClickHandler} to="/">Our story</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="widget wpo-service-link-widget">
                            <div className="widget-title">
                                <h3>Contact Us</h3>
                            </div>
                            <div className="contact-ft">
                                <ul>
                                    <li><i className="fi flaticon-email"></i>hello@theoxygens24.com</li>
                                    <li><i className="fi flaticon-phone-call"></i>+234 806 459 8781</li>
                                    <li><i className="fi flaticon-maps-and-flags"></i>Portharcourt – Nigeria
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col col-xl-3  col-lg-4 col-md-6 col-sm-12 col-12">
                        <div className="widget newsletter">
                            <div className="widget-title">
                                <h3>Newsletter</h3>
                            </div>
                            <form onSubmit={SubmitHandler}>
                                <input type="text" placeholder="Email" required/>
                                <button type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="wpo-lower-footer">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <p className="copyright"> &copy; 2024 TheOxygen. Design By <Link onClick={ClickHandler}
                                to="/">Damilola</Link>. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
} 

export default Footer;