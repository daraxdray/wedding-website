import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../SectionTitle'
import blogs from '../../api/blogs'
import HotelSection from '../RSVP/hotels'
import { FinalFormField } from '../RSVP/custom'

const BlogSection = (props) => {


    const [selected, setSelected] = useState();
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const [forms, setForms] = useState({
        name: '',
        email: '',
        address: '',
        meal: '',
        attend: '',
        reservationDays: 1,
        checkIn: '2024-12-19',
        checkOut: '2024-12-24',
        guest: '01',
        currency: ''
    });
    const [response, setResponse] = useState({
        attending: false,
        fromNigeria: false,
        specialAccom: true,
        currentStep: 0
    })




    return (
        <section className={`wpo-blog-section section-padding  ${props.blogClass}`}>
            <div className="container">
                <SectionTitle topTitle={'News'} MainTitle={'Book An Hotel'} />
                {/* <div className="wpo-blog-items">
                    <div className="row">
                        {blogs.map((blog, Bitem) => (
                            <div className="col col-lg-4 col-md-6 col-12" key={Bitem}>
                                <div className="wpo-blog-item">
                                    <div className="wpo-blog-img">
                                        <img src={blog.screens} alt=""/>
                                        <div className="thumb">{blog.thumb} </div>
                                    </div>
                                    <div className="wpo-blog-content">
                                        <h2><Link onClick={ClickHandler} to={`/blog-single/${blog.id}`}>{blog.title}</Link></h2>
                                        <ul>
                                            <li>By <Link onClick={ClickHandler} to={`/blog-single/${blog.id}`}>{blog.author}</Link></li>
                                            <li>{blog.create_at}</li>
                                        </ul>
                                        <p>{blog.description}</p>
                                        <Link className="read-more" onClick={ClickHandler} to={`/blog-single/${blog.id}`}>Read More..</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}
                <HotelSection setSelected={setSelected} selected={selected} />
                    
                        <div className="w-50 m-auto wpo-contact-form-area "  >
                            {selected != null && <FinalFormField forms={forms} setForms={setForms} response={response} selected={selected} setSelected={setSelected} />}
                        </div>
                    
                
            </div>
        </section>
    )
}



export default BlogSection;