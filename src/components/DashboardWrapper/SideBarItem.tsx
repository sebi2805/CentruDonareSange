import { Button } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
interface SideBarItemProps {
  url: string;
  name: string;
}
export const SideBarItem: React.FC<SideBarItemProps> = ({ url, name }) => {
  const navigation = useNavigate();

  const isCurrentPath = url
    .toLocaleLowerCase()
    .includes(document.location.pathname.toLocaleLowerCase());

  return (
    <>
      <Button
        w="90%"
        h={12}
        colorScheme="blue"
        onClick={() => {
          navigation(url);
        }}
        color={isCurrentPath ? "blue.400" : "white"}
        bg="darkThemeGrey.600"
        border={isCurrentPath ? "4px" : "0px"}
        borderColor={"blue.400"}
      >
        {name}
      </Button>
    </>
  );
};
