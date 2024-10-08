import React, { useEffect, useState } from 'react';
import { FlutterWaveButton, closePaymentModal, useFlutterwave } from 'flutterwave-react-v3';
import AppConfig from '../../api/config';
import { useGlobalState } from '../../data/globalState';

export default function Donate({ inputAmount, buttonText = null, paymentDone = () => { }, email = 'theoxygen@gmail.com', phone = '', name = '', purpose = '', isValid = true }) {
    const [amount, setAmount] = useState(inputAmount)
    const [payBy, setPayBy] = useState(false)
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




    const config = {
        public_key: "FLWPUBK-2fb0df460c91a31b925ed5a01972c51c-X",
        tx_ref: "titanic-48981487343MDI0NzMx",
        amount: amount,
        currency: "NGN",
        payment_options: "card, mobilemoneyghana, ussd",
        redirect_url: AppConfig.appUrl,
        meta: {
            purpose: purpose,
        },
        customer: {
            email: email,
            phone_number: phone,
            name: name,
        },
        customizations: {
            title: purpose,
            description: "The Oxygen Day",
            logo: "https://test.trashcoin.eu/static/media/shape.bb9d74528ad7c0bc21d42e529d1bd68e.svg",
        }
    };

    const fwConfig = {
        ...config,
        text: 'Pay with Flutterwave!',

    };
    const handleFlutterPayment = useFlutterwave(config);

    return (

        <>
            {isValid ? '' : <p className='text-warning'>"Ensure all fields are properly inputed"</p>}
            <div className='row m-auto w-75' style={{ alignContent: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div className='submit-area col-12 col-lg-6'>
                    <a href={isValid ? AppConfig.paypalLink : "#"}  className='theme-btn bg-transparent border'>
                        <div className=' '  style={{ width: 80,height:30 }}>
                            <img src={AppConfig.paypal} style={{ width: 20, height: 30 }} />
                        </div>
                    </a>
                </div>
                <div className="submit-area col-12 col-lg-6">
                    <button type="button" disabled={!isValid} onClick={() => setPayBy((val) => !val)} className="theme-btn bg-secondary">{buttonText != null ? 'Checkout(₦)' : 'Donate (₦)'}</button>
                </div>
            </div>


            {payBy && <><div className="form-field mt-5 " style={{ alignContent: 'center', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', }} >

                <div className='row m-auto w-75' >
                    <input
                        value={amount}
                        type="number"
                        name="amount"
                        onBlur={(e) => { }}
                        onChange={(e) => setAmount(e.target.value)}
                        className="form-control w-75"
                        placeholder="Enter Amount (₦)"
                        disabled={purpose == 'Accomodation'}
                    />

                    <button type="button" onClick={() => {
                        if (amount == null || name == '' || email == '') {
                            alert("Please provide email and name to proceed");
                            return
                        }
                        handleClose();
                        handleFlutterPayment({
                            callback: (response) => {
                                paymentDone();
                                console.log(response);
                                closePaymentModal() // this will close the modal programmatically
                            },
                            onClose: () => { },
                        })
                    }} className="btn btn-sm bg-success text-white border  w-25">Proceed</button>

                </div>
            </div> </>}

        </>

    );
}


