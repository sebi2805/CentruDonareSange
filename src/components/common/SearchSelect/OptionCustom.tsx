import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
interface OptionIntefface {
  children: ReactNode;
  innerProps: any;
}
export const OptionCustom: React.FC<OptionIntefface> = ({
  children,
  innerProps,
}) => {
  return (
    <Box
      px={2}
      color="neutralDarkGrey"
      _hover={{ bg: "darkThemeGrey.600" }}
      _active={{
        bg: "darkThemeGrey.600",
        transform: "scale(0.98)",
        borderColor: "neutralDarkGrey",
      }}
      _focus={{
        boxShadow:
          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
      }}
      {...innerProps}
    >
      {children}
    </Box>
  );
};
