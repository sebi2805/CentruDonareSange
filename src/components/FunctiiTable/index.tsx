import {
  Box,
  HStack,
  Spacer,
  Spinner,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { NameWrap } from "../common/NameWrap";
import { CustomSpinner } from "../common/Spinner";
import { CDSInput } from "../common/InputComponent";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { FunctiiInterface } from "./types";
import { useError } from "../common/ErrorService";
import { ErrorServiceContext } from "../../App";

export const FunctiiTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createToast, createError } = useContext(ErrorServiceContext);
  const [data, setData] = useState<FunctiiInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<FunctiiInterface>({
    denumire: "",
    salariuBaza: 0,
  });
  const getData = async () => {
    await apiClient
      .get(`/api/Functii/get-all`)
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onCloseModal = () => {
    onClose();
    setCurrentData({ denumire: "", salariuBaza: 0 });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(`/api/Functii/update?id=${currentData.idFunctie}`, currentData)
      .then((res) => {
        setData(
          data.map((d) => {
            if (d.idFunctie === currentData.idFunctie) return res.data.data;
            else return d;
          })
        );
        onCloseModal();
        createToast("CadruMedical updated succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("CadruMedical update error");
      });
  };
  const onCreate = () => {
    apiClient
      .post(`/api/Functii/create`, currentData)
      .then((res) => {
        console.log(res.data.data);
        setData([...data, res.data.data]);
        setLoading(true);
        onCloseModal();
        createToast("CadruMedical created succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("CadruMedical create error");
      });
  };
  const onDelete = (index: number) => {
    apiClient
      .delete(`/api/Functii/delete?id=${data[index].idFunctie}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("CadruMedical deleted succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("CadruMedical delete error");
      });
  };
  const onChange = (data: Partial<FunctiiInterface>) => {
    setCurrentData({ ...currentData, ...data });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <VStack w="100%" h="100%">
        <HStack w="100%" justify="center" px={8} py={8}>
          <Box fontSize={40} fontWeight="bold" color="blue.800">
            Table Functii
          </Box>
          <Spacer />
          <CDSModal
            onOpen={onOpen}
            isOpen={isOpen}
            data={currentData}
            onClose={onCloseModal}
            onCreate={onCreate}
            onUpdate={onUpdate}
            title="Create functie"
          >
            <VStack w="100%" h="100%" justify={"flex-start"}>
              <NameWrap title="Denumire">
                <CDSInput
                  placeholder="Introduceti denumirea"
                  value={currentData.denumire}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ denumire: e.target.value });
                  }}
                />
              </NameWrap>
              <NameWrap title="Salariu de baza">
                <CDSInput
                  placeholder="Introduceti salariul de baza"
                  value={currentData.salariuBaza?.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ salariuBaza: parseInt(e.target.value) });
                  }}
                />
              </NameWrap>
            </VStack>
          </CDSModal>
        </HStack>
        {loading ? (
          <CDSTable
            tableData={data}
            onDelete={onDelete}
            onUpdate={onOpenUpdate}
          ></CDSTable>
        ) : (
          <CustomSpinner />
        )}
      </VStack>
    </>
  );
};