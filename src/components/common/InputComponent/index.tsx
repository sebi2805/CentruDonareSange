import React from "react";
import {
  Box,
  Input,
  InputProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export interface WDInputProps extends InputProps {
  error?: string;
  value?: string;
  ref?: React.MutableRefObject<null>;
}

export const CDSInput: React.FC<WDInputProps> = (props) => {
  const { error, value, ...others } = props;
  const colorFocusBorder = useColorModeValue("blue.800", "blue.400");
  const borderColor = useColorModeValue("gray.300", "darkThemeGrey.100");
  const dangerColor = useColorModeValue("danger.500", "darkThemeRed.400");
  return (
    <Box w="100%">
      <Input
        ref={props.ref}
        value={value}
        borderRadius={4}
        borderColor={error ? dangerColor : borderColor}
        focusBorderColor={error ? dangerColor : colorFocusBorder}
        _placeholder={{ weight: "400", color: "gray.400" }}
        padding={6}
        {...others}
      />
      <Box h={2} w="100%">
        {error && <Text color={"danger.500"}>{error}</Text>}
      </Box>
    </Box>
  );
};
