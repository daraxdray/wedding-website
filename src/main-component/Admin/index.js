import React, { Fragment, useEffect, useState } from 'react';
import PageTitle from '../../components/pagetitle'
import Navbar2 from '../../components/Navbar2';
import UserList from '../../components/Admin/user_list'
import Scrollbar from '../../components/scrollbar'
import Footer from '../../components/footer/Footer';
import { db } from '../../api/firebase_config';
import { collection, getDocs } from 'firebase/firestore';

const AdminComponent = () => {
    const [users, setUserList] = useState([])
    const [loading, setLoading] = useState(false)
    
    const fetchNames = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "eventRSVPs")); // 'items' is your Firestore collection name
            const eventList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUserList(eventList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching items: ", error);
            setLoading(false);
        }
    };

    
    useEffect(()=>{
       fetchNames(); 
    },[]);

    return (
        <Fragment>
            <Navbar2 />
            <PageTitle pageTitle={'Admin List'} pagesub={'Listing all Users'} />
            
            <UserList userList={users} />
            <Footer />
            <Scrollbar />
        </Fragment>
    )
};
export default AdminComponent;

