import React, { useState } from 'react'
import {Card, Skeleton, Button, Modal, ModalContent, ModalBody, Spinner} from "@nextui-org/react";

const Loading = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const toggleLoad = () => {
      setIsLoaded(!isLoaded);
  };
  return (
    <>
      <div className="flex flex-col gap-3">
        <Skeleton isLoaded={isLoaded} className="rounded-lg">
          <div className="h-24 rounded-lg bg-secondary"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
          </Skeleton>
        </div>
      </div>
    </>
  )
}

interface ProgressLoadingProps {
  loading: boolean;
}

export const ProgressLoading: React.FC<ProgressLoadingProps> = ({ loading }) => {
  return (
    <>
      <Modal isOpen={loading} backdrop="blur" hideCloseButton className='py-14'>
        <ModalContent>
          <ModalBody>
            <Spinner label="" color="success" labelColor="success"/>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Loading;