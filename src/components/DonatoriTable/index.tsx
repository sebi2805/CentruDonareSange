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
import { GrupeSangeInterface } from "../GrupeSangeTable/types";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { DonatoriInterface } from "./types";

export const DonatoriTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [options, setOptions] = useState<SearchSelectInterface[]>([]);
  const [data, setData] = useState<DonatoriInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<DonatoriInterface>({
    nume: "",
    prenume: "",
    dataNasterii: "",
    inaltime: 0,
    greutate: 0,
    idGrupaSange: 0,
    cnp: "",
    sex: "",
  });
  const onSort = async (index: number) => {
    await apiClient
      .get(`/api/Donatori/get-all?order=${index}`)
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
      .get(`/api/Donatori/get-all`)
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
      .get(`/api/GrupeSange/get-all`)
      .then((res) => {
        setOptions(
          res.data.data?.map((e: GrupeSangeInterface) => {
            return { value: e.idGrupaSange, label: e.denumire };
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
    setCurrentData({
      nume: "",
      prenume: "",
      dataNasterii: "",
      inaltime: 0,
      greutate: 0,
      idGrupaSange: 0,
      cnp: "",
      sex: "",
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(`/api/Donatori/update?id=${currentData.idDonator}`, currentData)
      .then((res) => {
        setData(
          data.map((d) => {
            if (d.idDonator === currentData.idDonator) return res.data.data;
            else return d;
          })
        );
        onCloseModal();
        createToast("Donator updated succesufully");
      })
      .catch((err) => {
        createError("Donator update error");
      });
  };
  const onCreate = () => {
    apiClient
      .post(`/api/Donatori/create`, currentData)
      .then((res) => {
        setData([...data, res.data.data]);
        setLoading(true);
        onCloseModal();
        createToast("Donator created succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("Donator create error");
      });
  };

  const onDelete = (index: number) => {
    apiClient
      .delete(`/api/Donatori/delete?id=${data[index].idDonator}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("Donator deleted succesufully");
      })
      .catch((err) => {
        createError("Donator delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<DonatoriInterface>) => {
    setCurrentData({ ...currentData, ...data });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const optionsSex: SearchSelectInterface[] = [
    { value: "masculin", label: "masculin" },
    { value: "feminin", label: "feminin" },
  ];
  return (
    <>
      <VStack w="100%">
        <HStack w="100%" justify="center" px={8} py={8}>
          <Box fontSize={40} fontWeight="bold" color="darkThemeGrey.100">
            Table ReviziiTehnice
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
              <NameWrap title="Data Nasterii">
                <CDSDatePicker
                  onChange={(date: string) => {
                    onChange({ dataNasterii: date });
                  }}
                  value={currentData.dataNasterii || ""}
                />
              </NameWrap>

              <NameWrap title="Inaltime">
                <CDSInput
                  isNumeric
                  placeholder="Introduceti inaltime"
                  value={currentData.inaltime.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ inaltime: parseInt(e.target.value) });
                  }}
                />
              </NameWrap>
              <NameWrap title="Greutate">
                <CDSInput
                  isNumeric
                  placeholder="Introduceti greutate"
                  value={currentData.greutate.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ greutate: parseInt(e.target.value) });
                  }}
                />
              </NameWrap>
              <NameWrap title="CNP">
                <CDSInput
                  isNumeric={false}
                  placeholder="Introduceti CNP"
                  value={currentData.cnp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ cnp: e.target.value });
                  }}
                />
              </NameWrap>
              <NameWrap title="Sex">
                <CDSSearchSelect
                  value={currentData.sex}
                  options={optionsSex}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      sex: typeof value === "string" ? value : "",
                    });
                  }}
                />
              </NameWrap>
              <NameWrap title="Id Grupa Sange">
                <CDSSearchSelect
                  value={currentData.idGrupaSange}
                  options={options}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      idGrupaSange: typeof value === "number" ? value : 0,
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
