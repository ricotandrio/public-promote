import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { mydb, storage } from '../config/firebase';
import { v4 } from "uuid";
import { Dispatch, useContext } from 'react';
import { Data, DataContext } from '../context/DataContext';

export const HandleInfo = async (
  name: string, 
  file: File, 
  category: Set<string>, 
  setSuccess: Dispatch<boolean>, 
  setFail: Dispatch<boolean>, 
  setHash: Dispatch<string>,
  db: Data[],
  setDB: Dispatch<Data[]>,
  setLoading: Dispatch<boolean>
) => {

  const obj_date = new Date();
  const hash = v4();
  setHash(hash);

  const storageRef = ref(storage, `storage/${hash}`);

  uploadBytes(storageRef, file)
  .then(async () => {
    const url = await getDownloadURL(storageRef);
    const castSetCategory = Array.from(category);
    
    if(url){
      try{
        setDB([
          ...db,
          {
            name: name,
            hash: hash,
            image: url,
            date: obj_date.toISOString(),
            category: castSetCategory[0],
          }
        ]);

        await setDoc(doc(mydb, "banner", hash), {
          name: name,
          hash: hash,
          image: url,
          date: obj_date.toISOString(),
          category: castSetCategory[0],
        }, { merge: true });
        
        setLoading(false);
        setSuccess(true);
        return {
          name: name,
          hash: hash,
          image: url,
          date: obj_date.toISOString(),
          category: castSetCategory[0],
        };
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

