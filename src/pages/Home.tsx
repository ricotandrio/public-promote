import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/DataContext';
import { extractYearMonthDay } from '../utils/ToDate';
import EachImage from '../components/EachImage';
import { motion } from 'framer-motion';
import { motionAnimate, motionExit, motionInitial } from '../App';

const Home = () => {
  
  const { db } = useContext(DataContext);

  const [success, setSuccess] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  }, [success]);

  useEffect(() => {
    setTimeout(() => {
      setFail(false);
    }, 2000);
  }, [fail]);

  return (
    <>
      <motion.div
        initial={ motionInitial }
        animate={ motionAnimate }
        exit={ motionExit }
      >

        <main className='relative mt-24 flex flex-col items-center'>
          <section className='w-full flex items-center justify-center mb-10 mt-10'>
            <h1 className='text-2xl'>INFO</h1>
          </section>
          <section className='sm:w-full flex items-center justify-center flex-col p-3 w-[90%]'>
            {
              db.map((element, index) => (
                <EachImage key={index} src={element.image} code={element.hash} date={extractYearMonthDay({ date: element.date })}/>
              ))
            }
          </section>
        </main>

      </motion.div>
    </>
  );
}

export default Home;