import { VStack } from "@chakra-ui/react";
import React from "react";
import { SideBarItem } from "./SideBarItem";
export const SideBar: React.FC = () => {
  return (
    <VStack h="100vh" w={72} bg="darkThemeGrey.700" pt={20}>
      <VStack align="flex-start" justify="flex-start" h="100%" pb={4}>
        <SideBarItem url="../cadremedicales" name="CadreMedicale Table" />
        <SideBarItem url="../functiis" name="Functii Table" />
        <SideBarItem url="../teste" name="Teste Table" />
        <SideBarItem url="../donatori" name="Donatori Table" />
        <SideBarItem url="../grupesange" name="GrupeSange Table" />
        <SideBarItem url="../recipiente" name="Recipient Table" />
        <SideBarItem url="../donatiis" name="Donatii Table" />
        <SideBarItem url="../saloane" name="Saloane Table" />
        <SideBarItem url="../echipaments" name="Echipamente Table" />
        <SideBarItem url="../reviziitehnice" name="ReviziiTehnice Table" />
        <SideBarItem
          url="../echipamenteSaloane"
          name="EchipamentSaloane Table"
        />
        <SideBarItem url="../donatiiJoin" name="DonatiiJoin Table" />
        <SideBarItem
          url="../cadreMedicaleCount"
          name="CadreMedicaleCount Table"
        />
        <SideBarItem
          url="../cadreMedicaleFunctii"
          name="CadreMedicaleFunctii View"
        />
        <SideBarItem url="../functiiCount" name="Functiicount View" />
      </VStack>
    </VStack>
  );
};
