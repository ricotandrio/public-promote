import {motion} from 'framer-motion';
import { motionAnimate, motionExit, motionInitial } from '../App';

export default function Help() {
  const text = "";

  return (
    <>
      <motion.div
        initial={ motionInitial }
        animate={ motionAnimate }
        exit={ motionExit }
      >

        <section className='relative mt-24'>
        <section className='w-full flex flex-col items-center justify-center mb-10 mt-10'>
            <h1 className='text-2xl'>HELP</h1>
            <div className='sm:w-1/2 text-justify mt-5 p-3 w-[90%]'>
              <ul className='list-decimal'>
                <li>Click the "Add Info" button located at the top right corner to upload new information.</li>
                <li>Fill out the form with necessary details like name, category, and a poster image for the advertisement, which can be either a JPG or PNG file.</li>
                <li>Click the "Create" button and patiently wait for the file to complete its uploading process.</li>
                <li>Upon successful upload, you'll be provided with a unique hash code. Remember to save this code, as it is crucial for deleting the post in the future. Once lost, it cannot be retrieved.</li>
              </ul>
            </div>
          </section>

        </section>

      </motion.div>

    </>
  )
}
