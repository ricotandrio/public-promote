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
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input, Spinner, Snippet
} from "@nextui-org/react";
import '../assets/index.css';
import { DataContext } from '../context/DataContext';
import { extractYearMonthDay } from '../utils/ToDate';
import { HandleInfo } from '../utils/HandleInfo';
import EachImage from '../components/EachImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { items } from '../utils/DropDownList';
import { ProgressLoading } from '../utils/Loading';

const Home = () => {
  
  const { db, setDB } = useContext(DataContext);
  const [isOpen, setOpen] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<File>();

  const [select, setSelect] = useState(new Set(["category"]));
  
  const [hash, setHash] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFile(undefined);
  }, [isOpen]);

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
        
      <Modal isOpen={isOpen} backdrop={"blur"} className='pt-1' onClose={() => setOpen(false)}>
        <ModalContent>
          <ModalHeader>Create New Info</ModalHeader>
          <ModalBody>
            <form 
              action="" 
              onSubmit={(e) => {
                e.preventDefault();

                if(file && name){
                  setLoading(true);
                  HandleInfo(name, file, select, setSuccess, setFail, setHash, db, setDB, setLoading);
                  
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
                  if(e.target.files && e.target.files[0]){
                    console.log('file uploaded');
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <h1 className='mt-2 ml-2 text-sm'>Selected File: {file ? file.name : 'none'}</h1>

              <Dropdown className='ml-16'>
                <DropdownTrigger className='mt-5'>
                  <Button 
                    variant="solid"
                    className='bg-gray-100' 
                  >
                    {select}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu 
                  aria-label="dropdown menu" 
                  items={items}
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={select}
                  onSelectionChange={setSelect}
                >
                  {(item) => (
                    <DropdownItem
                      key={item.key}
                      color={"default"}
                    >
                      {item.label}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>

              <ModalFooter>
                <Button type='submit' variant="shadow" color='success' className='text-white'>CREATE</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
                  
      <Modal isOpen={success} backdrop={"blur"}  hideCloseButton className='pt-14 pb-10'>
        <ModalContent>
          <ModalBody className='flex items-center text-green-500'>
            <FontAwesomeIcon icon={faThumbsUp} className='text-5xl' />
            <h2 className='mt-3 text-sm'>The unique hash code is used for deleting posts.</h2>
            <Snippet
              tooltipProps={{
                color: "foreground",
                content: "copy unique hash code",
                disableAnimation: true,
                placement: "right",
                closeDelay: 0
              }}
              className='mt-3'
            >
              {hash}
            </Snippet>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={fail} backdrop={"blur"}  hideCloseButton className='py-14'>
        <ModalContent>
          <ModalBody className='flex items-center text-red-500'>
            <FontAwesomeIcon icon={faCircleExclamation} className='text-5xl'/>
            <h2>failed</h2>
          </ModalBody>
        </ModalContent>
      </Modal>
      
      <ProgressLoading loading={loading} />
    </>
  );
}

export default Home;