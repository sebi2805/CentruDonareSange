import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, HStack, Spacer, VStack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
export const MainPage: React.FC = () => {
  const navigation = useNavigate();
  const handleNavigate = () => {
    navigation("/cadreMedicales");
  };

  return (
    <VStack
      pt={16}
      h="100vh"
      w="100%"
      bg="darkThemeGrey.700"
      color={"darkThemeGrey.100"}
    >
      <Box fontWeight={"bold"} fontSize={32}>
        Proiect Baze de date
      </Box>
      <Box fontWeight={"bold"} fontSize={32}>
        2022-2023
      </Box>

      <HStack
        align={"center"}
        justify={"center"}
        cursor={"pointer"}
        onClick={handleNavigate}
      >
        <Box fontWeight={"bold"} fontSize={32}>
          {" "}
          Centru Donare Sange
        </Box>
        <Box>
          <ArrowForwardIcon boxSize={8} />
        </Box>
      </HStack>
      <Spacer />
      <HStack
        w="100%"
        justify={"flex-start"}
        pl={4}
        fontWeight={600}
        fontSize={16}
      >
        <Box>Profesor coordonator: Lect.dr. Silviu Laurențiu Vasile</Box>
      </HStack>

      <HStack justify={"flex-end"} w="100%" pr={4} pt={12}>
        <VStack align={"flex-start"} fontWeight={600} fontSize={16}>
          <Box>Student: Vîrtopeanu Sebastian-Filip </Box>
          <Box>Facultatea de Matematica si Informatica</Box>
          <Box>CTI, Grupa 264</Box>
        </VStack>
      </HStack>

      <Spacer />
      <VStack
        w="100%"
        align={"flex-start"}
        spacing={0}
        pl={4}
        pb={4}
        fontSize={12}
        fontWeight={600}
      >
        <Box>
          *Proiectul a fost realizat cu ajutorul urmatoarelor tehnologii:
        </Box>
        <Box pl={4}>
          React, Chakra UI, TypeScript, Node.js, .NET, Entity Framework Core,
          Microsoft SQL Server Management Studio
        </Box>
      </VStack>
    </VStack>
  );
};
