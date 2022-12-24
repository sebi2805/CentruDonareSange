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
    idFunctie: null,
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
  const onSort = async (index: number) => {
    await apiClient
      .get(`/api/CadreMedicale/get-all?order=${index}`)
      .then((res) => {
        setData(res.data.data);
        setLoading(true);
        console.log(res.data.data);

        createToast("Succes");
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get data.");
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
        console.log(currentData);

        console.log(
          data.map((d) => {
            if (d.idCadruMedical === currentData.idCadruMedical)
              return res.data.data;
            else return d;
          })
        );

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
      });
  };
  const onChange = (data: Partial<CadreMedicaleInterface>) => {
    setCurrentData({ ...currentData, ...data });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VStack w="100%" bg="darkThemeGrey.600">
        <HStack w="100%" justify="center" px={8} py={8}>
          <Box fontSize={40} fontWeight="bold" color="darkThemeGrey.100">
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
                  isNumeric={false}
                  placeholder="Introduceti nume"
                  value={currentData.nume}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ nume: e.target.value });
                  }}
                />
              </NameWrap>
              <NameWrap title="Prenume">
                <CDSInput
                  isNumeric={false}
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
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      idFunctie: typeof value === "number" ? value : null,
                    });
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
