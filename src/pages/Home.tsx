import React, { useContext, useEffect, useState } from 'react'
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Card,
  Button,
  Image,
  CardFooter,
  CardHeader,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Spinner
} from "@nextui-org/react";
import '../assets/index.css';
import { DataContext } from '../context/DataContext';
import { extractYearMonthDay } from '../utils/ToDate';
import { HandleInfo } from '../utils/HandleInfo';

interface EachImageProps {
  src: string;
  code: string;
  date: string;
}

const EachImage = ({ src, code, date }: EachImageProps) => {

  const [warning, setWarning] = useState<string>("Code");
  const [loading, setLoading] = useState<boolean>(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [currCode, setCurrCode] = useState<string>('');

  const { db, setDB } = useContext(DataContext);

  const handleRemove = () => {
    if(currCode === ''){
      setWarning("Code fields is empty!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if(currCode === code || currCode === import.meta.env.VITE_ADMIN_KEY){
        setDB(db.filter((element) => element.hash !== code));
      } else {
        setWarning("Wrong code, please try again")
      }
      setCurrCode('');
      setLoading(false);
    }, 5000);
  }

  return (
    <>
      <Card
        isFooterBlurred
        radius='lg'
        className='border-none bg-black mb-10'
      >
        <Image
          className='object-cover'
          alt='image'
          src={src}
        />
        <CardFooter className="m-2 justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_16px)] shadow-small ml-2 z-10">
          <p className="text-tiny text-white/80">{date}</p>
          <Button 
            onPress={onOpen}
            isLoading={loading}
            className="text-tiny text-white " variant="ghost" color="danger" radius="lg" size="sm"
          >
            REMOVE
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={"blur"} className='pt-1'>
        <ModalContent>
          <ModalHeader>Input Your Info Code</ModalHeader>
          <ModalBody>
            <div className="flex w-auto flex-wrap md:flex-nowrap gap-4">
              <Input type="code" label={warning} value={currCode} onChange={(e) => setCurrCode(e.target.value)} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="success" variant="light" onClick={() => handleRemove()}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={loading}  backdrop={"blur"}  hideCloseButton className='py-14'>
        <ModalContent>
          <ModalBody>
            <Spinner label="" color="success" labelColor="success"/>
          </ModalBody>
        </ModalContent>
      </Modal>
      
    </>
  )
}

const Home = () => {
  
  const { db } = useContext(DataContext);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<File>();
  console.log(db);

  useEffect(() => {
    setFile(undefined);
  }, [isOpen]);

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 2000);
  }, [success]);

  useEffect(() => {
    setTimeout(() => {
      setFail(false);
    }, 2000);
  }, [fail]);

  return (
    <>
      <Navbar className='absolute w-full top-0 border border-black' shouldHideOnScroll>
        <NavbarBrand className='border border-black'>
          HelloWorld !
        </NavbarBrand>

        <NavbarContent className='border border-black' justify='center'>
          <NavbarItem isActive>
            <a className='text-xl' href="">Home</a>
          </NavbarItem>
          <NavbarItem>
            <a className='text-xl' href="">About</a>
          </NavbarItem>
          <NavbarItem>
            <a className='text-xl' href="">Help</a>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className='border border-black' justify='end'>
          <NavbarItem>
            <Button className='text-white' radius='full' variant='shadow' color='success' onClick={() => setOpen(true)}>
              ADD INFO
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className='relative mt-24 border border-black'>
        <section className='w-full flex items-center justify-center mb-10 mt-10'>
          <h1 className='text-2xl'>INFO</h1>
        </section>
        <section className='w-full flex items-center justify-center flex-col'>
          {
            db.map((element, index) => (
              <EachImage key={index} src={element.image} code={element.hash} date={extractYearMonthDay(element.date)}/>
            ))
          }
        </section>
      </main>

      <Modal isOpen={isOpen} backdrop={"blur"} className='pt-1'>
        <ModalContent>
          <ModalHeader>Create New Info</ModalHeader>
          <ModalBody>
            <form 
              action="" 
              onSubmit={(e) => {
                e.preventDefault();

                if(file && name){
                  HandleInfo(name, file, setSuccess, setFail);
                  setFile(undefined);
                  setName('');
                  setOpen(false);
                }
              }}
            >
              <Input type='name' label='name' className='mb-5' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
              <Input 
                type='file' 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  console.log('file uploaded');
                  if(e.target.files && e.target.files[0]){
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <h1 className='mt-2 ml-2'>Selected File: {file ? file.name : 'none'}</h1>
              <ModalFooter>
                <Button type='submit' variant="shadow" color='success' className='text-white'>CREATE</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={success} backdrop={"blur"}  hideCloseButton className='py-14'>
        <ModalContent>
          <ModalBody>
            <Spinner label="sucess" color="success" labelColor="success"/>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={fail} backdrop={"blur"}  hideCloseButton className='py-14'>
        <ModalContent>
          <ModalBody>
            <Spinner label="failed" color="warning" labelColor="warning"/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Home;