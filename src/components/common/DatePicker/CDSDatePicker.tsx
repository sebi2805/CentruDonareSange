import { Box, Input, InputProps, Text } from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
interface CDSDatePickerInterface extends Omit<InputProps, "onChange"> {
  onChange: (date: string) => void;
  error?: string;
  value: string;
}
export const CDSDatePicker: React.FC<CDSDatePickerInterface> = (props) => {
  const { onChange, error, value, ...others } = props;
  const [errorDate, setError] = useState<boolean>(true);
  const [inputDate, setDate] = useState<string>(
    value ?? `${moment().toISOString()}`
  );
  const dateToIso = (date: string) => {
    return moment(date).toISOString();
  };
  const isoToDate = (date: string) => {
    return moment(date).format("YYYY-MM-DD");
  };
  const msgError: string = "This date isn't valid. ";
  function dateIsValid(date: string) {
    const d = moment(date);
    return d.isValid();
  }
  useEffect(() => {
    onChange(isoToDate(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setError(dateIsValid(inputDate));
    onChange(moment(inputDate).add("hours", 3).toISOString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputDate]);
  const dateChangeHandler = (e: React.ChangeEvent<HTMLDataElement>) => {
    setDate(dateToIso(e.currentTarget.value));
  };
  return (
    <Box h="100%">
      <Input
        placeholder="Select Date and Time..."
        size={"lg"}
        type="date"
        borderWidth={1}
        borderRadius={4}
        borderColor={errorDate || error ? "gray.300" : "danger.500"}
        focusBorderColor={errorDate && error ? "danger.500" : "blue.800"}
        {...others}
        value={moment(value).format("YYYY-MM-DD")}
        onChange={dateChangeHandler}
      />
      <Box h={2}>
        {error && <Text color={"danger.500"}>{error}</Text>}
        {errorDate || <Text color={"danger.500"}>{msgError}</Text>}
      </Box>
    </Box>
  );
};
