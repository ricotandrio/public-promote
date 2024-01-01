import { Dispatch } from 'react'
import { deleteDoc, doc } from 'firebase/firestore'
import { mydb, storage } from '../config/firebase'
import { deleteObject, ref } from 'firebase/storage'

type RemoveInfoProps = {
  code: string
  setLoading: Dispatch<boolean>
  setCurrCode: Dispatch<string>
  setOpen: Dispatch<boolean>
}

export const RemoveInfo = async (props: RemoveInfoProps) => {

  try {

    await Promise.all([
      deleteDoc(doc(mydb, "banner", props.code)), 
      deleteObject(ref(storage, `storage/${props.code}`))
    ]);
    
    props.setOpen(false);
    props.setLoading(false);
    props.setCurrCode('');
  } catch (error) {
    console.error("Error deleting:", error);
    props.setLoading(false);
  }
}
