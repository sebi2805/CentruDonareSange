import { Box, Text } from "@chakra-ui/react";

import React, { ReactElement, useEffect, useState } from "react";
import {
  default as Select,
  default as StateManagedSelect,
  SingleValue,
} from "react-select";
import { theme } from "../../../theme";
import { CustomOption } from "./CDSMultiSelect";
export interface SearchSelectInterface {
  value: number | string;
  label: string;
}
interface CDSSearchProps extends Omit<StateManagedSelect, "onChange"> {
  onChange: (val: number | undefined | string) => void;
  error?: string;
  options: SearchSelectInterface[];
  value?: number | string;
  placeholder?: string;
  isDisabled?: boolean;
}

export const CDSSearchSelect: React.FC<CDSSearchProps> = (
  props
): ReactElement<any, any> => {
  const danger = theme.colors.danger[500];
  const neutralGrey = theme.colors.neutralGrey;
  const { onChange, options, error, value, ...others } = props;
  //   const CustomOption = (props: any) => {
  //     const { data, innerProps } = props;
  //     return <OptionCustom innerProps={innerProps}>{data.label}</OptionCustom>;
  //   };

  const [selectValue, setSelectValue] = useState<
    SingleValue<SearchSelectInterface>
  >(options.filter((opt) => opt.value === value)[0] ?? null);

  const handleChange = (newValue: SingleValue<SearchSelectInterface>) => {
    setSelectValue(newValue);
  };

  useEffect(() => {
    onChange(selectValue?.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectValue]);

  useEffect(() => {
    handleChange(options.filter((opt) => opt.value === value)[0] ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: `1px solid ${neutralGrey}`,
      boxShadow: "0 0 #fff",
      width: "100%",
      height: "100%",
      "&:hover": {
        border: `1px solid ${neutralGrey}`,
      },
    }),

    menu: (provided: any, state: any) => ({
      ...provided,
      minWidth: "fit-content",
    }),
    container: (provided: any) => ({
      ...provided,
      width: "100%",
      height: "100%",
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999999,
    }),
  };

  const customStylesError = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      height: "100%",
      border: state.isFocus
        ? `1px solid ${neutralGrey}`
        : `1px solid ${danger}`,
      boxShadow: "0 0 #fff",
      "&:hover": {
        border: `1px solid ${neutralGrey}`,
      },
    }),
    container: (provided: any) => ({
      ...provided,
      width: "100%",
      height: "100%",
    }),
    menu: (provived: any, state: any) => ({
      ...provived,
      minWidth: "fit-content",
    }),
  };

  return (
    <Box w="100%" h="100%" pb={1.5}>
      <Select
        isDisabled={props.isDisabled ?? false}
        components={{ Option: CustomOption }}
        options={options}
        {...others}
        onChange={handleChange}
        styles={error ? customStylesError : customStyles}
        value={selectValue}
        menuPortalTarget={document.body}
        menuShouldBlockScroll={true}
        menuPosition={"fixed"}
      ></Select>
      {error && <Text color={"danger.500"}>{error}</Text>}
    </Box>
  );
};
