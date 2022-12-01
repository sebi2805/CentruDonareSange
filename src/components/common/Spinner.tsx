import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";
export const CustomSpinner: React.FC = () => {
  return (
    <Flex h="60vh" justifyContent={"center"} alignItems={"center"}>
      <Spinner
        size="xl"
        color={"blue.700"}
        thickness="4px"
        speed="0.65s"
        emptyColor="blue.100"
      />
    </Flex>
  );
};