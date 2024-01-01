import { motionAnimate, motionExit, motionInitial } from '../App';
import {motion} from 'framer-motion';

const About = () => {
  const text = "Are you facing challenges creating advertisements or finding participants for your questionnaire? This application prototype simplifies the process, allowing anyone to post their advertisements for free without creating accounts. To remove an advertisement, users simply delete it using the unique hash key provided upon posting.";

  return (
    <>
      <motion.div
        initial={ motionInitial }
        animate={ motionAnimate }
        exit={ motionExit }
      > 
        <section className='relative mt-24'>
          <section className='w-full flex flex-col items-center justify-center mb-10 mt-10'>
            <h1 className='text-2xl'>ABOUT</h1>

            <div className='sm:w-1/2 text-justify mt-5 p-3 w-[90%]'>
              <p>{text}</p>
            </div>
          </section>
        </section>

      </motion.div>

    </>
  )
}

export default About;