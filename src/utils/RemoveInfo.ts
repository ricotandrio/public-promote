import React, { Dispatch } from 'react'
import { Data } from '../context/DataContext'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { mydb, storage } from '../config/firebase'
import { deleteObject, ref } from 'firebase/storage'

export const RemoveInfo = async (code: string, setLoading: Dispatch<boolean>, setCurrCode: Dispatch<string>, setOpen: Dispatch<boolean>) => {

  try {

    await Promise.all([
      deleteDoc(doc(mydb, "banner", code)), 
      deleteObject(ref(storage, `storage/${code}`))
    ]);
    
    setOpen(false);
    setLoading(false);
    setCurrCode('');
  } catch (error) {
    console.error("Error deleting:", error);
    setLoading(false);
  }
}
