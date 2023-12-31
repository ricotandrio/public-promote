import React, { createContext, useEffect, useState } from 'react';
import Loading from '../utils/Loading';
import { DocumentSnapshot, collection, getDocs } from 'firebase/firestore';
import { mydb } from '../config/firebase';

export interface Data {
  date: string;
  hash: string;
  image: string;
  name: string;
  category: string;
}

interface DataContextType {
  db: Data[];
  setDB: React.Dispatch<React.SetStateAction<Data[]>>;
}

export const DataContext = createContext<DataContextType>({} as DataContextType);

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [db, setDB] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const contextValue: DataContextType = { db, setDB };

  useEffect(() => {
    setLoading(true); 
    try {
      const getDB = async () => {
        const data = await getDocs(collection(mydb, "banner"));
        const newData: Data[] = [];

        // Collect data in a temporary array
        data.docs.forEach((curr: DocumentSnapshot) => {
          newData.push(curr.data() as Data);
        });

        setDB(newData); // Update state once with all the collected data
        setLoading(false);
      }

      getDB();
    } catch(e) {
      console.error(e);
    }

  }, []);

  if(loading === true){
    return <Loading/>;
  } else {

    return (
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
    );
  }
};

export default DataProvider;
