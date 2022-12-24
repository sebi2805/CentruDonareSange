import { Box, HStack, Spacer, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CDSInput } from "../common/InputComponent";

import { NameWrap } from "../common/NameWrap";
import { SearchSelectInterface } from "../common/SearchSelect/CDSMultiSelect";
import { CDSSearchSelect } from "../common/SearchSelect/CDSSearchSelect";

import { CustomSpinner } from "../common/Spinner";
import { GrupeSangeInterface } from "../GrupeSangeTable/types";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { DonatiiFullInterface, DonatiiJoinFilter } from "./types";

export const DonatiiJoinTable: React.FC = () => {
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [filterData, setFilterData] = useState<DonatiiJoinFilter>({
    prenume: "",
    nume: "",
    idGrupaSange: null,
  });
  const defaultFilterData = { prenume: "", nume: "", idGrupaSange: null };
  const [options, setOptions] = useState<SearchSelectInterface[]>([]);
  const changeFilterData = (data: Partial<DonatiiJoinFilter>) => {
    setFilterData({ ...filterData, ...data });
  };
  const [empty, setEmpty] = useState<boolean>(false);
  const [data, setData] = useState<DonatiiFullInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSort = async (index: number) => {
    await apiClient
      .post(`/api/Donatii/get-donatii-full?order=${index}`, filterData)
      .then((res) => {
        if (res.data.data.length === 0) {
          createError("No data found.");
          setEmpty(true);
        } else {
          setData(res.data.data);
          createToast("Succes");
          setEmpty(false);
        }
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get data.");
      });
  };
  const getData = async () => {
    await apiClient
      .post(`/api/Donatii/get-donatii-full?order=${0}`, {})
      .then((res) => {
        setData(res.data.data);
        setLoading(true);
        createToast("Succes");
      })
      .catch((err) => {
        createError("Can't get data.");
      });
    await apiClient
      .get("/api/GrupeSange/get-all?order=0")
      .then((res) => {
        setOptions(
          res.data.data.map((item: GrupeSangeInterface) => ({
            value: item.idGrupaSange,
            label: item.denumire,
          }))
        );
      })
      .catch((err) => {
        createError("Can't get options.");
      });
  };
  useEffect(() => {
    if (JSON.stringify(filterData) === JSON.stringify(defaultFilterData))
      return;
    const timeout = setTimeout(() => {
      onSort(0);
    }, 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VStack w="100%">
        <HStack w="100%" justify="center" px={8} py={8}>
          <Box fontSize={40} fontWeight="bold" color="darkThemeGrey.100">
            Table Donatii Full
          </Box>
          <Spacer />
        </HStack>
        <HStack>
          <NameWrap title="Nume">
            <CDSInput
              isNumeric={false}
              placeholder={"Nume"}
              value={filterData.nume.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeFilterData({ nume: e.target.value });
              }}
            />
          </NameWrap>
          <NameWrap title="Prenume">
            <CDSInput
              placeholder="Prenume"
              isNumeric={false}
              value={filterData.prenume.toString()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                changeFilterData({ prenume: e.target.value });
              }}
            />
          </NameWrap>
          <NameWrap title="Grupa Sange">
            <CDSSearchSelect
              value={filterData.idGrupaSange}
              options={options}
              onChange={(value: number | string | null | undefined) => {
                setFilterData({
                  ...filterData,
                  idGrupaSange:
                    typeof value === "string" ? parseInt(value) : value || null,
                });
              }}
            />
          </NameWrap>
        </HStack>
        {loading ? (
          <CDSTable
            isNotUpdatable
            isEmpty={empty}
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
