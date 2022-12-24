import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CDSInput } from "../common/InputComponent";
import { NameWrap } from "../common/NameWrap";
import { CustomSpinner } from "../common/Spinner";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { CadrulMedicalFunctieInterface } from "./types";

export const CadreMedicaleFunctii: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createToast, createError } = useContext(ErrorServiceContext);
  const [data, setData] = useState<CadrulMedicalFunctieInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<CadrulMedicalFunctieInterface>(
    {
      nume: "",
      prenume: "",
      idCadruMedical: 0,
      denumire: "",
      salariuBaza: 0,
    }
  );
  const onSort = async (index: number) => {
    await apiClient
      .get(`/api/CadreMedicaleFunctii/get-all?order=${index}`)
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
      .get(`/api/CadreMedicaleFunctii/get-all?order=0`)
      .then((res) => {
        setData(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onCloseModal = () => {
    onClose();
    setCurrentData({
      ...currentData,
      nume: "",
      prenume: "",
      idCadruMedical: 0,
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(
        `/api/CadreMedicaleFunctii/update?id=${currentData.idCadruMedical}`,
        currentData
      )
      .then((res) => {
        setData(
          data.map((d) => {
            if (d.idCadruMedical === currentData.idCadruMedical)
              return res.data.data;
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
      .post(`/api/CadreMedicaleFunctii/create`, currentData)
      .then((res) => {
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
      .delete(
        `/api/CadreMedicaleFunctii/delete?id=${data[index].idCadruMedical}`
      )
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("CadruMedical deleted succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("CadruMedical delete error");
      });
  };
  const onChange = (data: Partial<CadrulMedicalFunctieInterface>) => {
    setCurrentData({ ...currentData, ...data });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <VStack w="100%">
        <HStack w="100%" justify="center" px={8} py={8}>
          <Box fontSize={40} fontWeight="bold" color="darkThemeGrey.100">
            View CadreMedicalFunctii
          </Box>
          <Spacer />
          <CDSModal
            onOpen={onOpen}
            isOpen={isOpen}
            data={currentData}
            onClose={onCloseModal}
            onCreate={onCreate}
            onUpdate={onUpdate}
            title="Insert into View Cadre Medicale Functii"
          >
            <VStack w="100%" h="100%" justify={"flex-start"}>
              <NameWrap title="Nume">
                <CDSInput
                  isNumeric={false}
                  placeholder="Introduceti numele"
                  value={currentData.nume}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ nume: e.target.value });
                  }}
                />
              </NameWrap>
              <NameWrap title="Salariu de baza">
                <CDSInput
                  isNumeric
                  placeholder="Introduceti prenumele"
                  value={currentData.prenume}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ prenume: e.target.value });
                  }}
                />
              </NameWrap>
            </VStack>
          </CDSModal>
        </HStack>
        {loading ? (
          <CDSTable
            onSort={onSort}
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
