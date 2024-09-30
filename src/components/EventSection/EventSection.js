import React from 'react'
import LocationMap from '../Modal'
import SectionTitleS2 from '../SectionTitleS2'
import { useGlobalState } from '../../data/globalState'


const Events = [

    {
        title: 'Traditional ',
        li1: 'Saturday, 21 Dec, 2024 2:00 PM – 07:00 PM',
        li2: 'Hall D\' Telavee',
        li3: '60 Iwofe Road, Port Harcourt',
        li4: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.719692206049!2d6.9557661!3d4.8181183999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cf62cb06b56b%3A0x76cf7f261af9411f!2sHall%20De%20Telavee!5e0!3m2!1sen!2sde!4v1725659393062!5m2!1sen!2sde",

    },
    {
        title: 'The Joining',
        li1: 'Sunday, 22 Dec, 2024 11:00 AM',
        li2: 'The Lord Seekers Mission',
        li3: '60 Iwofe Road, Port Harcourt, NIGERIA',
        li4: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d759.9432493732131!2d7.022939294307318!3d4.821825139656357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cdc9521b4725%3A0x8f6818b00027b49a!2sTontex%20Gardens!5e0!3m2!1sen!2sde!4v1725134611057!5m2!1sen!2sde",
    },
    {
        title: 'Wedding Party',
        li1: 'Sunday, 22 Dec, 2024 01:00 PM ',
        li2: 'Aztech Arcum Event Centre',
        li3: '77 Ken Saro-Wiwa Rd, Port Harcourt',
        li4: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.6842690679105!2d7.013764975766531!3d4.8241709951513325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cddafc1e92c9%3A0x1721f9b55f85ef96!2sAztech%20Arcum%20Event%20Centre!5e0!3m2!1sen!2sde!4v1725659637524!5m2!1sen!2sde",
    },

]

const EventSection = (props) => {
    const { state, dispatch } = useGlobalState();

    const openWelcomeModal = () => {
        dispatch({
            type: "OPEN_WELCOME_MODAL",
            payload: true
        })
    }

    return (
        <section className={`wpo-event-section section-padding ${props.eClass}`} id="event">
            <div className="container">
                <SectionTitleS2 MainTitle={'When & Where'} />
                <div className="wpo-event-wrap">
                    <div className="row">
                        {Events.map((event, eitem) => (
                            <div className="col col-lg-4 col-md-6 col-12" key={eitem}>
                                <div className="wpo-event-item">
                                    <div className="wpo-event-text">
                                        <h2>{event.title}</h2>
                                        <ul>
                                            <li>{event.li1}</li>
                                            <li>{event.li2}</li>
                                            <li>{event.li3}</li>
                                            <li><LocationMap mapLink={event.li4} /></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='container m-auto text-center'>
                <button className="theme-btn btn-lg" onClick={() => openWelcomeModal()}><span className="text">Attend Now </span> <span className="mobile">
                    <i className="fi flaticon-user"></i>
                </span></button>
            </div>
        </section>
    )
}

export default EventSection;