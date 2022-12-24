import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CDSInput } from "../common/InputComponent";

import { NameWrap } from "../common/NameWrap";
import {
  CDSMultiSelect,
  SearchSelectInterface,
} from "../common/SearchSelect/CDSMultiSelect";
import { CDSSearchSelect } from "../common/SearchSelect/CDSSearchSelect";

import { CustomSpinner } from "../common/Spinner";
import { EchipamenteInterface } from "../EchipamenteTable/types";
import { CDSModal } from "../ModalComponent";
import { SaloaneInterface } from "../SaloaneTable/types";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import {
  CreateEchipamentSalonInterface,
  EchipamentSalonInterface,
} from "./types";

export const EchipamenteSaloane: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);

  const [data, setData] = useState<EchipamentSalonInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<EchipamentSalonInterface>({
    idEchipament: 0,
    idSalon: 0,
  });
  const [createData, setCreateData] = useState<CreateEchipamentSalonInterface>({
    idEchipament: [],
    idSalon: [],
  });
  const [optionsSaloane, setOptionsSaloane] = useState<SearchSelectInterface[]>(
    []
  );

  const [optionsEchipamente, setOptionsEchipamente] = useState<
    SearchSelectInterface[]
  >([]);
  const onSort = async (index: number) => {
    await apiClient
      .get(`/api/GrupeSange/get-all?order=${index}`)
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
      .get(`/api/SaloaneEchipamente/get-all`)
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
      .get(`/api/Saloane/get-all`)
      .then((res) => {
        setOptionsSaloane(
          res.data.data.map((d: SaloaneInterface) => ({
            value: d.idSalon,
            label: d.idSalon,
          }))
        );
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get options.");
      });
    await apiClient
      .get(`/api/Echipamente/get-all`)
      .then((res) => {
        setOptionsEchipamente(
          res.data.data.map((d: EchipamenteInterface) => ({
            value: d.idEchipament,
            label: d.denumireTehnica,
          }))
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
      idEchipament: 0,
      idSalon: 0,
    });
    setCreateData({
      idEchipament: [],
      idSalon: [],
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(
        `/api/SaloaneEchipamente/update?idSalon=${currentData.idEchipament}&idEchipament=${currentData.idEchipament}`,
        {
          idSalon: [currentData.idSalon],
          idEchipament: [currentData.idEchipament],
        }
      )
      .then((res) => {
        setData(
          data.map((d, i) => {
            if (i == currentData.index) return res.data.data;
            else return d;
          })
        );
        createToast("EchipamenteSaloane updated succesufully");
      })
      .catch((err) => {
        createError("EchipamenteSaloane update error");
      });
  };

  const onCreate = () => {
    apiClient
      .post(`/api/SaloaneEchipamente/create`, createData)
      .then((res) => {
        setData([...data, ...res.data.data]);
        setLoading(true);
        onCloseModal();
        createToast("EchipamenteSaloane created succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("EchipamenteSaloane create error");
      });
  };

  const onDelete = (index: number) => {
    apiClient
      .delete(
        `/api/SaloaneEchipamente/delete?idEchipament=${data[index].idEchipament}&idSalon=${data[index].idSalon}`
      )
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("EchipamenteSaloane deleted succesufully");
      })
      .catch((err) => {
        createError("EchipamenteSaloane delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<EchipamentSalonInterface>) => {
    setCurrentData({ ...currentData, ...data });
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
            Table EchipamenteSaloane
          </Box>
          <Spacer />
          <CDSModal
            data={currentData}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onCloseModal}
            onCreate={onCreate}
            onUpdate={onUpdate}
            title="Create grupa sange"
          >
            <VStack w="100%" h="100%" justify={"flex-start"}>
              {!currentData.isEdit ? (
                <>
                  <NameWrap title="Saloane">
                    <CDSMultiSelect
                      options={optionsSaloane}
                      onChange={(values: number[]) => {
                        setCreateData({ ...createData, idSalon: values });
                      }}
                      value={createData.idSalon.map((s) => s.toString())}
                    />
                  </NameWrap>

                  <NameWrap title="Echipamente">
                    <CDSMultiSelect
                      options={optionsEchipamente}
                      onChange={(values: number[]) => {
                        setCreateData({ ...createData, idEchipament: values });
                      }}
                      value={createData.idEchipament.map((s) => s.toString())}
                    />
                  </NameWrap>
                </>
              ) : (
                <>
                  <NameWrap title="Saloane">
                    <CDSSearchSelect
                      options={optionsSaloane}
                      value={currentData.idSalon}
                      onChange={(value: number | string | null | undefined) => {
                        onChange({
                          idSalon:
                            typeof value === "number"
                              ? value
                              : parseInt(value || ""),
                        });
                      }}
                    />
                  </NameWrap>

                  <NameWrap title="Echipamente">
                    <CDSSearchSelect
                      options={optionsEchipamente}
                      value={currentData.idEchipament}
                      onChange={(value: number | string | null | undefined) => {
                        onChange({
                          idEchipament:
                            typeof value === "number"
                              ? value
                              : parseInt(value || ""),
                        });
                      }}
                    />
                  </NameWrap>
                </>
              )}
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
