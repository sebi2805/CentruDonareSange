import React, { useState } from "react";
import {
  Box,
  Input,
  InputProps,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export interface CDSInputProps extends InputProps {
  error?: string;
  value?: string;
  isNumeric: boolean;
  ref?: React.MutableRefObject<null>;
}

export const CDSInput: React.FC<CDSInputProps> = (props) => {
  const [internalError, setInternalError] = useState<string>("");
  const { error, value, isNumeric, onChange, ...others } = props;
  const onChangeDto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNumeric && isNaN(parseInt(e.target.value)) && e.target.value !== "")
      setInternalError("Only numeric input");
    else {
      setInternalError("");
      if (onChange) onChange(e);
    }
  };
  const colorFocusBorder = useColorModeValue("darkThemeGrey.100", "blue.400");
  const borderColor = useColorModeValue("gray.300", "darkThemeGrey.100");
  const dangerColor = useColorModeValue("danger.500", "darkThemeRed.400");
  return (
    <Box w="100%" h="100%">
      <Input
        ref={props.ref}
        color="darkThemeGrey.100"
        value={value === "NaN" ? "" : value}
        onChange={onChangeDto}
        borderRadius={4}
        borderColor={error ? dangerColor : borderColor}
        focusBorderColor={error ? dangerColor : colorFocusBorder}
        _placeholder={{ weight: "400", color: "gray.400" }}
        padding={6}
        {...others}
      />
      <Box h={4} w="100%">
        {(internalError || error) && (
          <Text color={"danger.500"}>{error || internalError}</Text>
        )}
      </Box>
    </Box>
  );
};
