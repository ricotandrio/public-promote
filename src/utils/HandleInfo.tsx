import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { mydb, storage } from '../config/firebase';
import { v4 } from "uuid";
import { Dispatch } from 'react';

export const HandleInfo = async (name: string, file: File, setSuccess: Dispatch<boolean>, setFail: Dispatch<boolean>) => {
  const obj_date = new Date();
  const hash = v4();
  const storageRef = ref(storage, `storage/${hash}`);

  uploadBytes(storageRef, file)
  .then(async () => {
    window.alert("success");
    const url = await getDownloadURL(storageRef);

    if(url){
      try{
        await setDoc(doc(mydb, "banner", hash), {
          name: name,
          hash: hash,
          image: url,
          date: obj_date.toISOString()
        }, { merge: true });
        
        setSuccess(true);
      } catch(e) {
        setFail(true);
      }
    }
  })
  .catch((error) => {
    console.error("Error uploading file:", error);
    setFail(true);
  });
};
