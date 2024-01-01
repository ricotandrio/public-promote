import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { mydb, storage } from '../config/firebase';
import { v4 } from "uuid";
import { Dispatch } from 'react';
import { Data } from '../context/DataContext';

type HandleInfoProps = {
  name: string,
  file: File,
  select: Set<string>, 
  db: Data[],
  setSuccess: Dispatch<boolean>, 
  setFail: Dispatch<boolean>,
  setHash: Dispatch<string>,
  setDB: Dispatch<Data[]>,
  setLoading: Dispatch<boolean>,
}
export const HandleInfo = async (props: HandleInfoProps) => {

  const obj_date = new Date();
  const hash = v4();
  props.setHash(hash);

  const storageRef = ref(storage, `storage/${hash}`);

  uploadBytes(storageRef, props.file)
  .then(async () => {
    const url = await getDownloadURL(storageRef);
    const castSetCategory = Array.from(props.select);
    
    if(url){
      try{
        const newData = {
          name: props.name,
          hash: hash,
          image: url,
          date: obj_date.toISOString(),
          category: castSetCategory[0],
        };

        props.setDB([
          ...props.db, newData
        ]);

        await setDoc(doc(mydb, "banner", hash), newData, { merge: true });
        
        props.setLoading(false);
        props.setSuccess(true);
        return newData;
      } catch(e) {
        props.setFail(true);
      }
    }
  })
  .catch((error) => {
    console.error("Error uploading file:", error);
    props.setFail(true);
  });
};

