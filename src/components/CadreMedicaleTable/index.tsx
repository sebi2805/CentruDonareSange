import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
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
import { FunctiiInterface } from "../FunctiiTable/types";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { CadreMedicaleInterface } from "./types";
export const CadreMedicaleTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [options, setOptions] = useState<SearchSelectInterface[]>([]);
  const [data, setData] = useState<CadreMedicaleInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<CadreMedicaleInterface>({
    nume: "",
    prenume: "",
    dataAngajarii: "",
    idFunctie: 0,
  });
  const getData = async () => {
    await apiClient
      .get(`/api/CadreMedicale/get-all`)
      .then((res) => {
        setData(res.data.data);
        setLoading(true);

        createToast("Succes");
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get data.");
      });
    await apiClient
      .get(`/api/Functii/get-all`)
      .then((res) => {
        setOptions(
          res.data.data?.map((f: FunctiiInterface) => {
            return { value: f.idFunctie, label: f.denumire };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get options.");
      });
  };
  const onCloseModal = () => {
    onClose();
    setCurrentData({ nume: "", prenume: "", dataAngajarii: "", idFunctie: 0 });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(
        `/api/CadreMedicale/update?id=${currentData.idCadruMedical}`,
        currentData
      )
      .then((res) => {
        console.log(res.data.data);
        setData(
          data.map((d) => {
            if (d.idCadruMedical === currentData.idCadruMedical)
              return res.data.data;
            else return d;
          })
        );
        createToast("CadruMedical updated succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("CadruMedical update error");
      });
  };
  const onCreate = () => {
    apiClient
      .post(`/api/CadreMedicale/create`, currentData)
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
      .delete(`/api/CadreMedicale/delete?id=${data[index].idCadruMedical}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("CadruMedical deleted succesufully");
      })
      .catch((err) => {
        createError("CadruMedical delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<CadreMedicaleInterface>) => {
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
            Table CadreMedicale
          </Box>
          <Spacer />
          <CDSModal
            data={currentData}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onCloseModal}
            onCreate={onCreate}
            onUpdate={onUpdate}
            title="Create cadru medical"
          >
            <VStack w="100%" h="100%" justify={"flex-start"}>
              <NameWrap title="Nume">
                <CDSInput
                  placeholder="Introduceti nume"
                  value={currentData.nume}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ nume: e.target.value });
                  }}
                />
              </NameWrap>
              <NameWrap title="Prenume">
                <CDSInput
                  placeholder="Introduceti prenume"
                  value={currentData.prenume}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ prenume: e.target.value });
                  }}
                />
              </NameWrap>
              <NameWrap title="Data Angajarii">
                <CDSDatePicker
                  onChange={(date: string) => {
                    onChange({ dataAngajarii: date });
                  }}
                  value={currentData.dataAngajarii}
                />
              </NameWrap>
              <NameWrap title="Id Functie">
                <CDSSearchSelect
                  value={currentData.idFunctie}
                  options={options}
                  onChange={(value: number | undefined) => {
                    onChange({ idFunctie: value });
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
