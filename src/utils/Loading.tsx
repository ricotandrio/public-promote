import {Skeleton, Modal, ModalContent, ModalBody, Spinner} from "@nextui-org/react";
import { useState } from "react";

const Loading = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <>
      <div className="flex flex-col gap-3 p-10">
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

type ProgressLoadingProps = {
  loading: boolean;
}

export const ProgressLoading = (props: ProgressLoadingProps) => {
  return (
    <>
      <Modal isOpen={props.loading} backdrop="blur" hideCloseButton className='py-14'>
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