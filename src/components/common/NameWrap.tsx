import { Box, VStack } from "@chakra-ui/react";
import React, { ReactNode } from "react";
interface NameWrapProps {
  title: string;
  children: ReactNode;
}
export const NameWrap: React.FC<NameWrapProps> = ({ title, children }) => {
  return (
    <VStack w="100%" align={"flex-start"} justify="flex-start">
      <Box fontSize={20} fontWeight={500} color="blue.700">
        {title}
      </Box>
      {children}
    </VStack>
  );
};
