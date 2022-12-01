import {
  Button,
  HStack,
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
interface CDSModalProps {
  data?: any;
  onCreate: () => void;
  onClose: () => void;
  isOpen: boolean;
  onOpen: () => void;
  onUpdate: (id: number) => void;
  children: ReactNode;
  title: string;
}
export const CDSModal: React.FC<CDSModalProps> = ({
  onCreate,
  onUpdate,
  children,
  title,
  data,
  onClose,
  isOpen,
  onOpen,
}) => {
  return (
    <>
      <Button
        bg="blue.700"
        color="white"
        fontSize={24}
        fontWeight={600}
        h={16}
        w={36}
        colorScheme="blue"
        onClick={onOpen}
      >
        Create
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bg="blue.100">{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter bg="blue.100">
            <HStack justify={"flex-end"} w="100%">
              <Button
                color="white"
                bg="blue.700"
                onClick={() => {
                  data.isEdit ? onUpdate(data.index) : onCreate();
                }}
              >
                {data.isEdit ? "Update" : "Create"}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
