import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
interface SideBarItemProps {
  url: string;
  name: string;
}
export const SideBarItem: React.FC<SideBarItemProps> = ({ url, name }) => {
  const navigation = useNavigate();
  return (
    <>
      <Button
        w="90%"
        h={12}
        colorScheme="blue"
        onClick={() => {
          navigation(url);
        }}
        color="white"
        bg="blue.700"
      >
        {name}
      </Button>
    </>
  );
};
