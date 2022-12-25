import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CDSInput } from "../common/InputComponent";
import { NameWrap } from "../common/NameWrap";
import { CustomSpinner } from "../common/Spinner";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { FunctiiCountInterface } from "./types";

export const FunctiiCount: React.FC = () => {
  const { createToast, createError } = useContext(ErrorServiceContext);
  const [data, setData] = useState<FunctiiCountInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const onSort = async (index: number) => {
    await apiClient
      .get(`/api/FunctiiCount/get-all?order=${index}`)
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
      .get(`/api/FunctiiCount/get-all`)
      .then((res) => {
        setData(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get data.");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box>
        <VStack w="100%">
          <HStack w="100%" justify="center" px={8} py={8}>
            <Box fontSize={40} fontWeight="bold" color="darkThemeGrey.100">
              View FunctiiCount
            </Box>
            <Spacer />
          </HStack>
          {loading ? (
            <CDSTable
              isNotUpdatable
              onSort={onSort}
              tableData={data}
              onDelete={() => {}}
              onUpdate={() => {}}
            ></CDSTable>
          ) : (
            <CustomSpinner />
          )}
        </VStack>
      </Box>
    </>
  );
};
