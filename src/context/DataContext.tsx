import React, { createContext, useState } from 'react';

interface Data {
  link: string;
  hash: string;
  date: string;
}

interface DataContextType {
  db: Data[];
  setDB: React.Dispatch<React.SetStateAction<Data[]>>;
}

export const DataContext = createContext<DataContextType>({} as DataContextType);

const dummyDB = [
  {
    "link": "https://media.discordapp.net/attachments/989321529915482222/1173966621803556914/Poster_DIGIN.jpg?ex=659d3f9d&is=658aca9d&hm=f9f3d1a37141a9def232ff6134d49ccb6bb9b0eea543d8a9f4d944cdbcc944ca&=&format=webp&width=373&height=663",
    "hash": "abcde",
    "date": "2022-03-26T18:14:29Z",
    "name": "skjfsdfs",
  }
]

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [db, setDB] = useState<Data[]>(dummyDB);

  const contextValue: DataContextType = {
    db,
    setDB,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
