import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { SideBar } from "./SideBar";
interface DashboardWrapperProps {
  children: ReactNode;
}
export const DashboardWrapper: React.FC<DashboardWrapperProps> = ({
  children,
}) => {
  return (
    <HStack w="100%" spacing={0} align="flex-start">
      <SideBar />
      <VStack w="100%" h="100vh" spacing={0} overflow="hidden">
        <Flex
          w="100%"
          h={20}
          align="center"
          justify={"center"}
          bg="darkThemeGrey.700"
          fontWeight={"bold"}
          fontSize={32}
          color="darkThemeGrey.100"
        >
          {" "}
          Centru Donare Sange
        </Flex>
        <Box w="100%" overflow={"auto"} position="relative">
          {children}
        </Box>
      </VStack>
    </HStack>
  );
};
