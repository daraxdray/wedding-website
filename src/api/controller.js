import { collection, addDoc,deleteDoc,updateDoc, getDocs,doc } from 'firebase/firestore'; // Firestore functions
import { db } from './firebase_config';

const filePath = '../data/visitor.json';
export async function  storeObjectToFile( newObject)  {
    try{
       
        await addDoc(collection(db, 'eventRSVPs'), newObject);
       
        alert('RSVP submitted successfully!');
        return true;
    }catch(e){
        console.log(e);
        return false;
    }
    // Check if the file exists
  
}

export const fetchRSVPs = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'eventRSVPs'));
        const rsvps = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return rsvps;
    } catch (error) {
        console.error('Error fetching RSVPs:', error);
        return [];
    }
};


export const updateRSVP = async (id, updatedData) => {
    try {
        const rsvpRef = doc(db, 'eventRSVPs', id);
        await updateDoc(rsvpRef, updatedData);
        console.log('RSVP updated successfully');
    } catch (error) {
        console.error('Error updating RSVP:', error);
    }
};

export const deleteRSVP = async (id) => {
    try {
        const rsvpRef = doc(db, 'eventRSVPs', id);
        await deleteDoc(rsvpRef);
        console.log('RSVP deleted successfully');
    } catch (error) {
        console.error('Error deleting RSVP:', error);
    }
};