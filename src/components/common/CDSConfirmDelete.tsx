import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";

interface ConfirmDelete {
  children: ReactNode;
  index: number;
  handleDelete: (id: number, onClose: () => void) => void;
}
export const CDSConfirmDelete: React.FC<ConfirmDelete> = ({
  children,
  handleDelete,
  index,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const openModal = () => {
    setLoading(false);
    onOpen();
  };
  const handleDeleteButton = () => {
    setLoading(true);
    handleDelete(index, onClose);
  };
  const colorBg = useColorModeValue("white", "darkThemeGrey.600");
  const colorBgHover = useColorModeValue("blue.100", "darkThemeGrey.500");
  return (
    <Box
      w="100%"
      h="100%"
      borderRadius={5}
      bg={colorBg}
      _hover={{ bg: colorBgHover }}
    >
      <Flex
        onClick={openModal}
        color="danger.500"
        w="100%"
        h="100%"
        textAlign={"left"}
        alignItems={"flex-start"}
      >
        {children}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody bg={useColorModeValue("white", "darkThemeGrey.600")}>
            <VStack w="100%">
              <VStack w="100%">
                <Box
                  textAlign={"left"}
                  fontSize={20}
                  pt={4}
                  w="100%"
                  fontWeight={600}
                >
                  Delete for all eternity?
                </Box>
                <Flex w="100%">
                  {" "}
                  Are you sure you want to &nbsp;
                  <Text color={"danger.500"}> permanently delete &nbsp;</Text>
                  this?
                </Flex>
              </VStack>
              <HStack w="100%" pt={4}>
                <Spacer />
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  isLoading={loading ?? false}
                  backgroundColor={"danger.600"}
                  _hover={{ backgroundColor: "danger.700" }}
                  color={"white"}
                  onClick={() => {
                    handleDeleteButton();
                  }}
                  autoFocus
                >
                  Yes! Delete it
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
