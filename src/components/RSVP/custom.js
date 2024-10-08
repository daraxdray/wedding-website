
import React, { useCallback, useEffect, useState } from 'react'
import SimpleReactValidator from 'simple-react-validator';
import SectionTitle from '../../components/SectionTitle'

import vec1 from '../../images/rsvp/flower1.png'
import vec2 from '../../images/rsvp/flower2.png'

import shape1 from '../../images/rsvp/shape1.png'
import shape2 from '../../images/rsvp/shape2.png'
import AppConfig from '../../api/config';
import Donate from './donate';
import HotelSection from './hotels';
import { storeObjectToFile } from '../../api/controller';
import { useGlobalState } from '../../data/globalState';


 export const FinalFormField = React.memo(({ donate = false ,forms = {}, setForms = (val)=>{}, selected = 0, setSelected = (val)=>{}, handleClose, response}) => {
    const [loading, setLoading] = useState(null);
    const [allValid, setAllValid] = useState(false);
    const [reservationDays, setReserveDays] = useState(1);
    
    const minDate = "2024-12-19";
    const maxDate = "2024-12-24";
    const [validator] = useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));
    const getDays = () => {
        if (forms.checkIn == '' || forms.checkOut == '') return 1;
        const d1 = new Date(forms.checkIn)
        const d2 = new Date(forms.checkOut)
        const timeDifference = d2 - d1;
    if(d1 < new Date(minDate)) return alert("'Please checkin date must be on or after December 19, 2024");
    if(d2 > new Date(maxDate)) return alert("'Please check out date must be on or before December 24, 2024");
        
        if (timeDifference < -1) {
            setAllValid(false);
            
            setForms({...forms,checkOut:''})
            alert("'Please select a date on or after December 19, 2024")
            return
        }
        // Convert time difference from milliseconds to days
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        setReserveDays(daysDifference);
    }

    const changeHandler = (e) => {
        
        setForms({ ...forms, [e.target.name]: e.target.value })

        if (validator.allValid()) {
            validator.hideMessages();
            setAllValid(true)
        } else {
            validator.showMessages();
            setAllValid(false);
        }
    };

    const submitHandler = useCallback((e) => {

        e.preventDefault();
        if (validator.allValid()) {
            validator.hideMessages();

            storeObjectToFile({ ...forms, ...response });
            handleClose()
        } else {
            validator.showMessages();
        }
    });
    return <>
        <form onSubmit={(e) => submitHandler(e)} className="contact-validation-active" >

            {response.specialAccom && selected != null && <div className="alert alert-secondary alert-sm m-5 w-75 m-auto mt-3 mb-3" >
                <div className='row'>
                    <div className='col'>
                        <p className='text-secondary'>Selected Hotel</p>
                    </div>
                </div>
                {<p className='text-dark'>{AppConfig.hotels[selected].room} Rooms - N{(AppConfig.hotels[selected].price * reservationDays).toLocaleString()}  for <strong>{reservationDays} Days</strong><div className='text-danger btn btn-sm ml-5' onClick={() => setSelected(null)}>Clear</div></p>}
            </div>}
            <div className="form-field ">
                <input
                    value={forms.name}
                    type="text"
                    name="name"
                    // onBlur={(e) => changeHandler(e)}
                    onChange={changeHandler}
                    className="form-control"
                    placeholder="Your Name" />
                {validator.message('name', forms.name, 'required|alpha_space')}
            </div>
            <div className="form-field">
                <input
                    value={forms.email}
                    type="email"
                    name="email"
                    // onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    className="form-control"
                    placeholder="Your Email" />
                {validator.message('email', forms.email, 'required|email')}
            </div>

            {donate == false && response.specialAccom && <div className="row">
                <div className="form-field col">
                    <label>Check In</label>
                    <input
                        value={forms.checkIn}
                        type="date"
                        name="checkIn"
                        min={minDate}
                        max={maxDate}
                        // onBlur={(e) => changeHandler(e)}
                        onChange={(e) => changeHandler(e)}
                        className="form-control"
                    />
                    {validator.message('checkIn', forms.checkIn, 'required')}
                </div>

                <div className="form-field col">
                    <label>Check Out</label>
                    <input
                        value={forms.checkOut}
                        type="date"
                        name="checkOut"
                        min={minDate}
                        max={maxDate}
                        onBlur={(e) => getDays()}
                        onChange={(e) => changeHandler(e)}
                        className="form-control"
                    />
                    {validator.message('checkOut', forms.checkOut, 'required')}
                </div>

            </div>}
            {donate == false && <div className="form-field">
                <label>Number of Guest</label>
                <select
                    // onBlur={(e) => changeHandler(e)}
                    onChange={(e) => changeHandler(e)}
                    value={forms.guest}
                    type="text"
                    className="form-control"
                    name="guest">
                    <option>Number Of Guest</option>
                    <option >01</option>
                    <option >02</option>
                </select>
                {/* {validator.message('guest', forms.guest, 'alpha_num')}  */}
            </div>}
            {/* <div className="form-field">
                                                <input
                                                    value={forms.attend}
                                                    type="text"
                                                    name="attend"
                                                    onBlur={(e) => changeHandler(e)}
                                                    onChange={(e) => changeHandler(e)}
                                                    className="form-control"
                                                    placeholder="What Will You Be Attending" />
                                                {validator.message('attend', forms.attend, 'required')}
                                            </div> */}





            {donate == true ?

                <div className="submit-area">
                    <Donate paymentDone={submitHandler}
                        {...forms} purpose='Donate' />
                </div>
                :
                response.specialAccom ? <div className="submit-area">
                    {
                        <Donate inputAmount={AppConfig.hotels[selected]?.price * reservationDays} buttonText="Checkout" paymentDone={submitHandler} isValid={allValid}
                            {...forms} purpose='Accomodation' />
                    }
                </div> :
                    <div className="submit-area">
                        <button type="submit" className={`theme-btn ${loading ? 'disabled' : ''}`} >Submit Now</button>
                    </div>}
        </form >
    </>

})


const RSVPCUSTOM = (props) => {
    const [selected, setSelected] = useState(0);
    const { state, dispatch } = useGlobalState();
    const setOpen = (value) => {
        dispatch({
            type: "OPEN_WELCOME_MODAL",
            payload: value
        })
    }
    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
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
        specialAccom: false,
        currentStep: 0
    })
   

    const updateStep = (step, reply) => {

        if (reply == null) {
            props.handlClose();
            return
        }
        //check what step and update the response on state.
        if (step == 1) {
            setResponse((resp) => ({ ...resp, attending: reply, currentStep: step }))
        }
        else if (step == 2) {
            setResponse((resp) => ({ ...resp, fromNigeria: reply, currentStep: step }))
        }
        else if (step == 3) {
            setResponse((resp) => ({ ...resp, specialAccom: reply, currentStep: step }))
        }
        else if (step == 4) {

        } else {
            setResponse((resp) => ({
                attending: false,
                fromNigeria: false,
                specialAccom: false, currentStep: 0
            }))

        }
    }

 

    return (
        <section className={`wpo-contact-section ${props.pt}`} id="RSVPCUSTOM">
            <div className="container ">
                <div className="wpo-contact-section-wrapper "  >
                    <div className="wpo-contact-form-area " >
                        <div data-swiper-parallax="300" className="slide-title text-center">
                            <h2>  {AppConfig.bride.fName} <span>&</span> {AppConfig.groom.fName}</h2>
                        </div>
                        {response.currentStep == 0 && <>
                            <SectionTitle MainTitle={'Are you attending?'} />
                            <div className="row align-items-center">
                                <div className="col col-lg-12 col-12 order-lg-1 order-2 text-holder left-text">
                                    <div className="story-text right-align-text fadeInLeftSlow" data-wow-duration="2000ms">

                                        <span className="date">{AppConfig.welcomeModal.isAttending}</span>
                                        <div className="line-shape s2">
                                            <div className="outer-ball">
                                                <div className="inner-ball"></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className='row'>
                                <div className="submit-area col">
                                    <button type="button" onClick={() => updateStep(1, true)} className="theme-btn bg-success">Yes</button>
                                </div>
                                <div className="submit-area col">
                                    <button type="button" onClick={() => updateStep(1, false)} className="theme-btn">No</button>
                                </div>
                            </div> </>}
                        {response.currentStep == 1 && <>
                            {response.attending ? <><SectionTitle MainTitle={'Are you Coming from Nigeria?'} />

                                <div className="row align-items-center">
                                    <div className="col col-lg-12 col-12 order-lg-1 order-2 text-holder left-text">
                                        <div className="story-text right-align-text fadeInLeftSlow" data-wow-duration="2000ms">
                                            <span className="date">{AppConfig.welcomeModal.attendanceConfirmed}</span>
                                        </div>
                                    </div>

                                </div>
                                <div className='row'>
                                    <div className="submit-area col">
                                        <button type="button" onClick={() => updateStep(2, true)} className="theme-btn bg-success">Yes</button>
                                    </div>
                                    <div className="submit-area col">
                                        <button type="button" onClick={() => updateStep(2, false)} className="theme-btn">No</button>
                                    </div>
                                </div></>
                                : <>
                                    <SectionTitle MainTitle={'Oops!!'} />
                                    <div className="row align-items-center">
                                        <div className="col col-lg-12 col-12 order-lg-1 order-2 text-holder left-text">
                                            <div className="story-text right-align-text fadeInLeftSlow" data-wow-duration="2000ms">

                                                <span className="date">{AppConfig.welcomeModal.noAttending}</span>
                                                <div className="line-shape s2">
                                                    <div className="outer-ball">
                                                        <div className="inner-ball"></div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <div className='row'>
                                        <FinalFormField forms={forms} response={response} setForms={setForms} selected={selected} setSelected = {setSelected} handleClose={handleClose} donate={true} />

                                        <div className="submit-area col">
                                            <button type="button" onClick={() => handleClose()} className="btn text-danger">Cancel</button>
                                        </div>
                                    </div>
                                </>}
                        </>}
                        {response.currentStep == 2 && <>
                            {<>
                                <SectionTitle MainTitle={'Special Accommodation?'} />
                                <div className="row align-items-center">
                                    <div className="col col-lg-12 col-12 order-lg-1 order-2 text-holder left-text">
                                        <div className="story-text right-align-text fadeInLeftSlow" data-wow-duration="2000ms">

                                            <span className="date">{AppConfig.welcomeModal.notFromNigeria}</span>
                                            <div className="line-shape s2">
                                                <div className="outer-ball">
                                                    <div className="inner-ball"></div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div className='row'>

                                    <div className="submit-area col">
                                        <button type="button" onClick={() => updateStep(3, true)} className="theme-btn bg-success">Yes</button>
                                    </div>

                                    <div className="submit-area col">
                                        <button type="button" onClick={() => updateStep(3, false)} className="theme-btn">No</button>
                                    </div>
                                </div>
                            </>}
                        </>}
                        {response.currentStep == 3 && <>
                            {response.specialAccom ? <><SectionTitle MainTitle={'Great!!!?'} />

                                <div className="row align-items-center">
                                    <div className="col col-lg-12 col-12 order-lg-1 order-2 text-holder left-text">
                                        <div className="story-text right-align-text fadeInLeftSlow" data-wow-duration="2000ms">
                                            <span className="date">{AppConfig.welcomeModal.attendFromNigeria}</span>
                                        </div>
                                    </div>

                                </div>
                                <HotelSection setSelected={setSelected} selected={selected} />
                                <FinalFormField forms={forms} setForms={setForms} response={response} selected={selected} setSelected = {setSelected} handleClose={handleClose} />


                            </>
                                : <>
                                    <SectionTitle MainTitle={'Great!!!?'} />
                                    <div className="row align-items-center">
                                        <div className="col col-lg-12 col-12 order-lg-1 order-2 text-holder left-text">
                                            <div className="story-text right-align-text fadeInLeftSlow" data-wow-duration="2000ms">

                                                <span className="date">Please proceed to fill out the RSVP details. Let us know your name and How many days you will be staying. Thank you!</span>
                                                <div className="line-shape s2">
                                                    <div className="outer-ball">
                                                        <div className="inner-ball"></div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                    <FinalFormField setForms={setForms} forms={forms} response={response} selected={selected} setSelected = {setSelected} handleClose={handleClose} />
                                </>}
                        </>}
                        <div className='row justify-content-center align-items-center mt-5 '>
                            <div onClick={() => updateStep(0, false)} className='col text-center btn btn-sm'>Refresh</div>
                        </div>

                    </div>
                    <div className="vector-1">
                        <img src={vec1} alt="" />
                    </div>
                    <div className="vector-2">
                        <img src={vec2} alt="" />
                    </div>
                </div>

            </div>
            <div className="shape-1">
                <img src={shape1} alt="" />
            </div>
            <div className="shape-2">
                <img src={shape2} alt="" />
            </div>
        </section>
    )
}
export default RSVPCUSTOM;
