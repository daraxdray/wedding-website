import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../api/firebase_config';
import { CloudDownload, MailOutline, Phone, VerifiedUserOutlined } from '@material-ui/icons';
import AppConfig from '../../api/config';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { toast } from 'react-toastify';
import { useGlobalState } from '../../data/globalState';
import { useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';

// interface UserData {
//   email: string;
//   firstName?: string;
//   lastName?: string;
//   accessCode?: string;
// }




export const AccessCodeGenerator = () => {
  const [step, setStep] = useState('email');
  const [userData, setUserData] = useState({ email: '', phone:'' });
  const [loading, setLoading] = useState(false);
  const [isPhone, setToPhone] = useState(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const generateAccessCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^\+\d{1,3}\d{6,14}$/; // Starts with +, followed by country code (1-3 digits) and a valid phone number
    return phoneRegex.test(phoneNumber);
  }


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const usersRef = collection(db, 'eventRSVPs'); // Reference to the collection
      let q;
      if (isPhone) {
        if(!validatePhoneNumber(userData.phone)){
          return toast.error("Invalid Phone Inputed")
        }
        q = query(usersRef, where('phone', '==', userData.phone)); // Query by email
      } else {
        if(!validateEmail(userData.email)){
          return toast.error("Invalid Email Inputed")
        }
        q = query(usersRef, where('email', '==', userData.email)); // Query by email

      }
      const querySnapshot = await getDocs(q); // Fetch the query results

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0]; // Get the first document
        const existingUser = existingDoc.data();
        console.error(existingUser);


        if (!existingUser.accessCode) {
          // If accessCode doesn't exist, generate and update
          const newAccessCode = generateAccessCode();

          const docRef = doc(db, 'eventRSVPs', existingDoc.id); // Reference to the document

          await updateDoc(docRef, {
            accessCode: newAccessCode, // Only update the accessCode field
          });

          existingUser.accessCode = newAccessCode; // Update local object
        }

        // Update local state with user data
        setUserData((prev) => ({
          ...prev,
          name: existingUser.name,
          accessCode: existingUser.accessCode,
        }));

        setStep('code');
      } else {

        // No user found, go to 'names' step
        // navigate('/')
        // dispatch({
        //   type:"OPEN_WELCOME_MODAL",
        //   payload:true
        // })
        // return toast.error('You have not registered yet please do register!');

        setStep('names');
      }
    } catch (err) {
      console.error(err);
      setError('Error checking email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNamesSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const accessCode = generateAccessCode();
      await addDoc(collection(db, 'eventRSVPs'), {
        ...userData,
        accessCode
      });
      setUserData(prev => ({ ...prev, accessCode }));
      setStep('code');
    } catch (err) {
      console.log(err)
      setError('Error saving user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadQR = () => {

    const qrCodeBox = document.getElementById('qr-code-box');

    if (!qrCodeBox) return;

    domtoimage.toPng(qrCodeBox)
      .then((dataUrl) => {
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = `qr-code-${Date.now()}.png`;
        downloadLink.click();
      })
      .catch((error) => {
        console.error('Failed to download image:', error);
      });

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Code Generator</h1>
          <p className="text-gray-600">Generate your secure access code</p>
        </div>

        {error && (
          <div className="bg-red-50 text-center text-danger p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {step === 'email' && (
          isPhone == true ? <form
            onSubmit={handleEmailSubmit}
            className="d-flex flex-column align-items-center justify-content-center text-center  py-5"
          >
            <div className='w-50  mt-1 text-end'>
              <label className='text-secondary '>(+2348105****)</label>
            </div>
            <div className="input-group w-50">
              {/* Icon */}
              <span className="input-group-text bg-white border rounded-start">
                <Phone className="text-secondary" />
              </span>
              {/* Input Field */}
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="Enter your phone number"
                className="form-control px-3 py-2  rounded-end"
                required
              />
            </div>
            <div className='w-50  mt-1 text-start'>
              <Button
                className={`btn text-start align-left mt-2 justify-start`}
                onClick={() => setToPhone(false)}>Use Email</Button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="theme-btn mt-5"
            >
              {loading ? 'Checking...' : 'Continue'}
            </button>
          </form> :
            <form
              onSubmit={handleEmailSubmit}
              className="d-flex flex-column align-items-center justify-content-center text-center  py-5"
            >
              <div className='w-50  mt-1 text-end'>
                <label className='text-secondary '>(dray***@gmail***)</label>
              </div>
              <div className="input-group w-50">
                {/* Icon */}
                <span className="input-group-text bg-white border rounded-start">
                  <MailOutline className="text-secondary" />
                </span>
                {/* Input Field */}
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter your email"
                  className="form-control px-3 py-2  rounded-end"
                  required
                />
              </div>
              <div className='w-50 align-left align-start mt-1 text-start'>

                <Button
                  className={`btn text-start align-left mt-2 justify-start`}
                  onClick={() => setToPhone(true)}>
                  Use Phone
                </Button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="theme-btn mt-5"
              >
                {loading ? 'Checking...' : 'Continue'}
              </button>
            </form>
        )}

        {step === 'names' && (
          <form onSubmit={handleNamesSubmit} className="space-y-4 text-center">
            <div className="relative relative form-field col">
              <VerifiedUserOutlined className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, firstName: e.target.value }))}
                placeholder="Full Name"
                className="px-5 py-3 border rounded-lg focus:ring-2  focus:border-transparent w-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="theme-btn mt-5"
            >
              {loading ? 'Generating...' : 'Generate Access Code'}
            </button>
          </form>
        )}

        {step === 'code' && userData.accessCode && (
          <div className="space-y-6 text-center">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg font-semibold mb-2">Your Access Code:</p>
              <p className="text-3xl font-bold text-blue-600 tracking-wider">
                {userData.accessCode}
              </p>
            </div>

            <div className="flex justify-center m-auto w-full bg-white mb-5" id='qr-code-box'>
              <div className="shape-1"><img src={AppConfig.hero1.shape1} alt="" /></div>
              <div data-swiper-parallax="300" className="slide-title">
                <h2>  {AppConfig.bride.fName} <span>&</span> {AppConfig.groom.fName}</h2>
              </div>
              <QRCodeSVG
                id="qr-code"
                value={userData.accessCode}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>

            <button
              onClick={handleDownloadQR}
              className="theme-btn"
            >
              <CloudDownload className="h-5 w-5" />
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};