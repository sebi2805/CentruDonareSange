import { Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { default as StateManagedSelect, MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { theme } from "../../../theme";
import { OptionCustom } from "./OptionCustom";
export interface SearchSelectInterface {
  value: string;
  label: string;
}
interface WDSearchProps extends Omit<StateManagedSelect, "onChange"> {
  onChange: (val: string[]) => void;
  error?: string;
  options: SearchSelectInterface[];
  value: string[];
  placeholder?: string;
  isDisabled?: boolean;
}

export const CustomOption = (props: any) => {
  const { data, innerProps } = props;
  return <OptionCustom innerProps={innerProps}>{data.label}</OptionCustom>;
};

export const WDMultiSelect: React.FC<WDSearchProps> = (props) => {
  const danger = theme.colors.danger[500];
  const neutralGrey = theme.colors.neutralGrey;
  const blue500 = theme.colors.blue[500];
  const { onChange, options, error, value, ...others } = props;
  const [didMount, setDidMount] = useState<boolean>(false);
  const computeInitialOptions = () => {
    const newOptions = options;
    value.forEach((val) => {
      if (options.filter((option) => option.value === val).length === 0) {
        newOptions.push({
          value: val,
          label: val.charAt(0).toUpperCase() + val.slice(1),
        });
      }
    });
    return newOptions;
  };

  const [optionsValues, setOptionsValues] = useState<SearchSelectInterface[]>(
    computeInitialOptions()
  );

  const [selectValue, setSelectValue] = useState<
    MultiValue<SearchSelectInterface>
  >(optionsValues.filter((option) => props.value.includes(option.value)));

  // useEffect(() => {
  //   setSelectValue(
  //     optionsValues.filter((option) => props.value.includes(option.value))
  //   );
  // }, [value]);
  // useEffect(() => {
  //   setOptionsValues(computeInitialOptions());
  // }, [options]);
  // useEffect(() => {
  //   setSelectValue(
  //     optionsValues.filter((option) => props.value.includes(option.value))
  //   );
  // }, [value]);
  // useEffect(() => {
  //   setOptionsValues(computeInitialOptions());
  // }, [options]);
  useEffect(() => {
    setDidMount(true);
  }, []);

  const handleChange = (newValue: MultiValue<SearchSelectInterface>) => {
    setSelectValue(newValue);
    const newOptionsValues = optionsValues;

    newValue.forEach((val) => {
      if (optionsValues.filter((valOp) => valOp === val).length === 0) {
        newOptionsValues.push(val);
      }
    });
    setOptionsValues(newOptionsValues);
  };

  useEffect(() => {
    if (didMount) {
      onChange(
        selectValue.map((val) => {
          return val.value;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectValue]);

  const customStyles = {
    control: (provided: any, state: any) => {
      return {
        ...provided,
        minHeight: "52px",
        boxShadow: "0 0 #fff",
        border: state.isFocused
          ? `2px solid ${blue500}`
          : `1px solid ${neutralGrey}`,
        "&:hover": {
          border: state.isFocused
            ? `2px solid ${blue500}`
            : `1px solid ${neutralGrey}`,
        },
      };
    },
  };

  const customStylesError = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: "100%",
      height: "100%",
      border: state.isFocused
        ? `1px solid ${neutralGrey}`
        : `2px solid ${danger}`,
      boxShadow: "0 0 #fff",
      "&:hover": {
        border: state.isFocused
          ? `1px solid ${neutralGrey}`
          : `2px solid ${danger}`,
      },
    }),
    container: (provided: any, state: any) => ({
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
    <>
      <CreatableSelect
        isDisabled={props.isDisabled ?? false}
        components={{ Option: CustomOption }}
        options={optionsValues}
        {...others}
        isMulti={true}
        onChange={handleChange}
        styles={error ? customStylesError : customStyles}
        value={selectValue}
      ></CreatableSelect>
      {error && <Text color={"danger.500"}>{error}</Text>}
    </>
  );
};