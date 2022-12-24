import { Box, HStack, Spacer, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CDSDatePicker } from "../common/DatePicker/CDSDatePicker";
import { CDSInput } from "../common/InputComponent";

import { NameWrap } from "../common/NameWrap";
import {
  CDSSearchSelect,
  SearchSelectInterface,
} from "../common/SearchSelect/CDSSearchSelect";

import { CustomSpinner } from "../common/Spinner";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { FullDonatiiInterface, FullDonatiiSearchInterface } from "./type";

export const FullDonatiiTable: React.FC = () => {
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [filterData, setFilterData] = useState<FullDonatiiSearchInterface>({
    nume: "",
    prenume: "",
    idGrupaSange: 0,
  });
  const changeFilterData = (data: Partial<FullDonatiiSearchInterface>) => {
    setFilterData({ ...filterData, ...data });
  };

  const [data, setData] = useState<FullDonatiiInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<SearchSelectInterface[]>([]);
  const onSort = async (index: number) => {
    await apiClient
      .post(`/api/Donatii/get-cadreMedicaleCount?order=${index}`, filterData)
      .then((res) => {
        setData(res.data.data);
        setLoading(true);
        createToast("Succes");
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get data.");
      });
  };
  const getData = async () => {
    await apiClient
      .post(`/api/Donatii/get-cadreMedicaleCount?order=${0}`, filterData)
      .then((res) => {
        setData(res.data.data);
        setLoading(true);
        createToast("Succes");
      })
      .catch((err) => {
        createError("Can't get data.");
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VStack w="100%">
        <HStack w="100%" justify="center" px={8} py={8}>
          <Box fontSize={40} fontWeight="bold" color="darkThemeGrey.100">
            Table Cadre Medicale Count
          </Box>
          <Spacer />
        </HStack>
        <HStack>
          <Box>Filter Data</Box>
          <NameWrap title="Nume">
            <CDSDatePicker
              value={filterData.nume}
              onChange={(value: string) => {
                changeFilterData({ nume: value });
              }}
            />
          </NameWrap>
          <NameWrap title="End date">
            <CDSDatePicker
              value={filterData.prenume}
              onChange={(value: string) => {
                changeFilterData({ prenume: value });
              }}
            />
          </NameWrap>
          <NameWrap title="Min count">
            <CDSSearchSelect
              options={options}
              value={filterData.idGrupaSange}
              onChange={(value: number | string | undefined) => {
                changeFilterData({
                  idGrupaSange: typeof value === "number" ? value : 0,
                });
              }}
            />
          </NameWrap>
        </HStack>
        {loading ? (
          <CDSTable
            onSort={onSort}
            tableData={data}
            onDelete={() => {}}
            onUpdate={() => {}}
          ></CDSTable>
        ) : (
          <CustomSpinner />
        )}
      </VStack>
    </>
  );
};
