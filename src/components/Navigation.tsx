import React, { useContext, useEffect, useState } from 'react'
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Button,
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Snippet, NavbarMenuToggle, NavbarMenu
} from "@nextui-org/react";
import '../assets/index.css';
import { DataContext } from '../context/DataContext';
import { HandleInfo } from '../utils/HandleInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { items } from '../utils/DropDownList';
import { ProgressLoading } from '../utils/Loading';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const { db, setDB } = useContext(DataContext);
  const [isOpen, setOpen] = useState<boolean>(false);

  const [success, setSuccess] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const [select, setSelect] = useState(new Set(["category"]));
  
  const [hash, setHash] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFile(null);
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

  const location = useLocation();

  const checkActive = (path: string): boolean => {
    if(location.pathname === path){
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    console.log(select);
  }, [select]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <Navbar className='absolute w-full top-0 border' onMenuOpenChange={setIsMenuOpen} shouldHideOnScroll>
        <NavbarContent>
          <NavbarBrand className=''>
            Public Promote
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
        </NavbarContent>

        <NavbarMenu className='sm:hidden'>
          <NavbarItem isActive={ checkActive("/") }>
            <Link className='text-xl' to="/">Home</Link>
          </NavbarItem>
          <NavbarItem isActive={ checkActive("/about") }>
            <Link className='text-xl' to="/about">About</Link>
          </NavbarItem>
          <NavbarItem isActive={ checkActive("/help") }>
            <Link className='text-xl' to="/help">Help</Link>
          </NavbarItem>
        </NavbarMenu>
        
        <NavbarContent className='hidden sm:flex' justify='center'>
          <NavbarItem isActive={ checkActive("/") }>
            <Link className='text-xl' to="/">Home</Link>
          </NavbarItem>
          <NavbarItem isActive={ checkActive("/about") }>
            <Link className='text-xl' to="/about">About</Link>
          </NavbarItem>
          <NavbarItem isActive={ checkActive("/help") }>
            <Link className='text-xl' to="/help">Help</Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className='' justify='end'>
          <NavbarItem>
            <Button className='text-white' radius='full' variant='shadow' color='success' onClick={() => setOpen(true)}>
              ADD INFO
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

                
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
                    HandleInfo({ name, file, select, db, setSuccess, setFail, setHash, setDB, setLoading });
                    
                    setFile(null);
                    setName('');
                    setOpen(false);
                    setSelect(new Set(["category"]));
                  }
                }}
              >
                
                <Input type='name' label='name' className='mb-5' value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}/>
                <Input 
                  type='file' 
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
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
                    onSelectionChange={ setSelect }
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
  )
}

export default Navigation;