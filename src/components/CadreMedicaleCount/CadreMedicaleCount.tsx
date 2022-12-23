import {
  Box,
  filter,
  HStack,
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CadreMedicaleInterface } from "../CadreMedicaleTable/types";
import { CDSDatePicker } from "../common/DatePicker/CDSDatePicker";
import { CDSInput } from "../common/InputComponent";

import { NameWrap } from "../common/NameWrap";
import { SearchSelectInterface } from "../common/SearchSelect/CDSMultiSelect";
import { CDSSearchSelect } from "../common/SearchSelect/CDSSearchSelect";

import { CustomSpinner } from "../common/Spinner";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { CadreMedicaleCount, FilterCadreMedicaleCount } from "./types";

export const CadreMedicaleCountTable: React.FC = () => {
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [filterData, setFilterData] = useState<FilterCadreMedicaleCount>({
    minCount: 0,
    idCadruMedical: 0,
  });
  const [options, setOptions] = useState<SearchSelectInterface[]>([]);
  const changeFilterData = (data: Partial<FilterCadreMedicaleCount>) => {
    setFilterData({ ...filterData, ...data });
  };

  const [data, setData] = useState<CadreMedicaleCount[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    await apiClient
      .get("/api/CadreMedicale/get-cadreMedicale?order=0")
      .then((res) => {
        setOptions(
          res.data.data.map((item: CadreMedicaleInterface) => ({
            value: item.idCadruMedical,
            label: item.nume + item.prenume,
          }))
        );
      })
      .catch((err) => {
        createError("Can't get options.");
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VStack w="100%" h="100%">
        <HStack w="100%" justify="center" px={8} py={8}>
          <Box fontSize={40} fontWeight="bold" color="blue.800">
            Table Cadre Medicale Count
          </Box>
          <Spacer />
        </HStack>
        <HStack>
          <NameWrap title="Cadru Medical">
            <CDSSearchSelect
              options={options}
              onChange={(value: number | string | undefined) => {
                setFilterData({
                  ...filterData,
                  idCadruMedical:
                    typeof value === "number" ? value : parseInt(value || "0"),
                });
              }}
            />
          </NameWrap>
          <NameWrap title="Min count">
            <CDSInput
              isNumeric
              value={filterData.minCount.toString()}
              onBlur={() => {
                onSort(0);
              }} // on blur, sort by count
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeFilterData({ minCount: parseInt(e.target.value) });
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