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
import { RemoveInfo } from '../utils/RemoveInfo';
import { ProgressLoading } from '../utils/Loading';


type EachImageProps = {
  src: string;
  code: string;
  date: string;
}

const EachImage = (props: EachImageProps) => {

  const [warning, setWarning] = useState<string>("Code");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [currCode, setCurrCode] = useState<string>('');

  const { db, setDB } = useContext(DataContext);

  const handleRemove = () => {
    if(currCode === ''){
      setWarning("Code fields is empty!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if(currCode === props.code || currCode === import.meta.env.VITE_ADMIN_KEY){
        RemoveInfo({ code: props.code, setLoading, setCurrCode, setOpen });
        setDB(db.filter((element) => element.hash !== props.code));
      } else {
        setWarning("Wrong code, please try again")
        setLoading(false);
        setCurrCode('');
      }
    }, 2000);
  }

  return (
    <>
      <Card
        isFooterBlurred
        radius='lg'
        className='flex bg-black mb-10 md:max-w-[40%] '
      >
        <Image
          className='object-cover'
          alt='image'
          src={props.src}
        />
        <CardFooter className="m-2 justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_16px)] shadow-small ml-2 z-10">
          <p className="text-tiny text-white/80">{props.date}</p>
          <Button 
            isLoading={loading}
            onClick={() => setOpen(true)}
            className="text-tiny text-white " variant="ghost" color="danger" radius="lg" size="sm"
          >
            REMOVE
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} backdrop={"blur"} className='pt-1' onClose={() => setOpen(false)}>
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

      <ProgressLoading loading={loading}/>    
    </>
  )
}

export default EachImage;