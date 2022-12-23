import { VStack } from "@chakra-ui/react";
import React from "react";
import { SideBarItem } from "./SideBarItem";
export const SideBar: React.FC = () => {
  return (
    <VStack h="100vh" w={52} bg="darkThemeGrey.700" pt={20}>
      <SideBarItem url="../cadremedicale" name="CadreMedicale Table" />
      <SideBarItem url="../functii" name="Functii Table" />
      <SideBarItem url="../donatori" name="Donatori Table" />
      <SideBarItem url="../grupesange" name="GrupeSange Table" />
      <SideBarItem url="../recipiente" name="Recipient Table" />
      <SideBarItem url="../donatii" name="Donatii Table" />
      <SideBarItem url="../saloane" name="Saloane Table" />
      <SideBarItem url="../echipamente" name="Echipamente Table" />
      <SideBarItem url="../reviziitehnice" name="ReviziiTehnice Table" />
    </VStack>
  );
};
