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
        bg="blue.400"
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
          <ModalHeader bg="darkThemeGrey.700" color="white">
            {title}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody bg="darkThemeGrey.600">{children}</ModalBody>
          <ModalFooter bg="darkThemeGrey.600">
            <HStack justify={"flex-end"} w="100%">
              <Button
                color="white"
                colorScheme={"blue"}
                bg="blue.400"
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
