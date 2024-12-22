import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

import { collection, query, where, getDocs, addDoc, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../api/firebase_config';
import { CloudDownload, MailOutline, VerifiedUserOutlined } from '@material-ui/icons';
import AppConfig from '../../api/config';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image-more';
import { toast } from 'react-toastify';
import { useGlobalState } from '../../data/globalState';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import { Button } from '@material-ui/core';


// interface UserData {
//   email: string;
//   firstName?: string;
//   lastName?: string;
//   accessCode?: string;
// }




export const AccessCodeVeriifier = () => {
  const [step, setStep] = useState('email');
  const [userData, setUserData] = useState({ accessCode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useGlobalState();
  const [hasPermission, setHasPermission] = useState(null); // Track permission state

  const navigate = useNavigate();
  const generateAccessCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };


  const requestCameraPermission = async () => {
    console.log(navigator.mediaDevices)

    try {
      const permissionStatus = await navigator.permissions.query({ name: 'camera' });
      console.log(permissionStatus.state);
      if (permissionStatus.state === 'granted') {
        setHasPermission(true);
      } else if (permissionStatus.state === 'prompt') {
        // Ask for permission
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasPermission(true);
      } else {
        setHasPermission(false);
        setStatus('Camera access is denied. Please allow camera permissions in your device settings.');
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
      setError(`An error occurred while accessing the camera. ${error}`);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    requestCameraPermission()
  }, [])

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const usersRef = collection(db, 'eventRSVPs'); // Reference to the collection
      const q = query(usersRef, where('email', '==', userData.email)); // Query by email
      const querySnapshot = await getDocs(q); // Fetch the query results

      if (!querySnapshot.empty) {
        const existingDoc = querySnapshot.docs[0]; // Get the first document
        const existingUser = existingDoc.data();



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
        navigate('/')
        dispatch({
          type: "OPEN_WELCOME_MODAL",
          payload: true
        })
        return toast.error('You have not registered yet please do register!');

        // setStep('names');
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

  const [scanResult, setScanResult] = useState('');
  const [status, setStatus] = useState('');
  const [verifyScan, setVerifyScan] = useState(0);

  // Helper to check the date
  const isEventDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // getMonth is 0-based
    return month === 7 && (day === 21 || day === 22);
  };

  // Handle successful QR code scan
  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);
      setError('')

      // Check event date
      // if (!isEventDate()) {
      //   setStatus('Please wait until the date of the event (21st or 22nd July).');
      //   return;
      // }

      try {
        // Assume QR code contains a user ID or unique identifier
        const userId = data.trim();

        // Update Firestore table
        const usersRef = collection(db, 'eventRSVPs'); // Reference to the collection
        const q = query(usersRef, where('accessCode', '==', userId)); // Query by access-code

        const querySnapshot = await getDocs(q); // Fetch the query results

        if (querySnapshot.empty) {
          setStatus(`No user with code found!`);
          setError(`No user with code found!`)
          return
        }
        const userValue = querySnapshot.docs[0].data()
        setUserData(userValue)
        const dataRef = doc(db, 'eventRSVPs', querySnapshot.docs[0].id); // Reference to the document

        const scanData = {
          status: 'visited',
          scanDate: new Date().toISOString(),
          checkInTimes: (userValue.checkInTimes ?? 0) + 1
        };
        toast.success('Attendance Taken!');
        // Update or set the document
        await updateDoc(dataRef, scanData);


        setStatus(`User ${userId} marked as visited successfully!`);
      } catch (error) {
        console.error('Error updating Firestore:', error);
        setStatus('An error occurred while updating the status.');
      }
    }
  };

  const handleError = (error) => {
    // console.log(error)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{verifyScan ? 'Scanner' : 'Verify Access Code'}</h1>
          <p className="text-gray-600">Please verify your secure access code</p>
          <div className='col mt-5'>
            {/* {verifyScan ? */}
              <div className='row'>
                <button className={`${verifyScan?'text-dark':'view-cart-btn'} col`} onClick={() => setVerifyScan(false)}>Code<i className='flaticon-review'></i></button>
                <button
                  className={`${verifyScan?'view-cart-btn':'btn-sm-outline text-dark'} col`}
                  onClick={()=>setVerifyScan(true)}>
                  Scan
                </button>
              </div>
              
              {/* <div className='row'>
                <Button
                  className={`btn col`}
                  onClick={()=>{}}>
                  
                  Code
                </Button>
                <button className='btn-sm-outline col' onClick={() => setVerifyScan(true)}>Scan<i className='flaticon-review'></i></button>
              </div> */}
            {/* // } */}
          </div>
        </div>

        {status != '' && <div>
          <p><strong>Scan Result:</strong> {scanResult}</p>
          <p style={{ color: 'green' }}>{status}</p>
        </div>}
        {error && (
          <div className="bg-red-50 text-center text-danger p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div>
          <p className="text-gray-600">{userData.name}</p>
          <p className="text-gray-600">{userData.email}</p>
          <p className="text-gray-600">{userData.accessCode}</p>
        </div>


        {!verifyScan && (
          <form

            className="d-flex flex-column align-items-center justify-content-center text-center  py-5"
          >
            <div className="input-group w-50">
              {/* Icon */}
              <span className="input-group-text bg-white border rounded-start">
                <VerifiedUserOutlined className="text-secondary" />
              </span>
              {/* Input Field */}
              <input
                type="number"
                value={userData.accessCode}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, accessCode: e.target.value }))
                }
                placeholder="Enter your access code"
                className="form-control px-3 py-2  rounded-end"
                required
              />
            </div>
            <div className='row'>
              <div className='col'>
                <button
                  type="button"
                  onClick={() => handleScan(userData.accessCode)}
                  disabled={loading}
                  className="view-cart-btn mt-5"
                >
                  {loading ? 'Checking...' : 'Verify'}
                </button>
              </div>

            </div>
          </form>
        )}




        {verifyScan && <div style={{ textAlign: 'center', marginTop: '20px' }}>

          <QrReader
            onResult={(result, error) => {
              if (result) handleScan(result?.text);
              if (error) handleError(error);
            }}
            constraints={{ facingMode: 'environment' }}
            style={{ width: '300px', margin: '0 auto' }}
          />

        </div>}


      </div>
    </div>
  );
};