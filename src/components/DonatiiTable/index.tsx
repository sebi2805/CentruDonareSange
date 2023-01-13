import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CadreMedicaleInterface } from "../CadreMedicaleTable/types";
import { CDSDatePicker } from "../common/DatePicker/CDSDatePicker";

import { NameWrap } from "../common/NameWrap";

import {
  CDSSearchSelect,
  SearchSelectInterface,
} from "../common/SearchSelect/CDSSearchSelect";
import { CustomSpinner } from "../common/Spinner";
import { DonatoriInterface } from "../DonatoriTable/types";
import { CDSModal } from "../ModalComponent";
import { RecipienteInterface } from "../RecipienteTable/types";
import { SaloaneInterface } from "../SaloaneTable/types";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { DonatiiInterface } from "./types";

export const DonatiiTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [optionsCadreMedicale, setOptionsCadreMedicale] = useState<
    SearchSelectInterface[]
  >([]);
  const [optionsDonatori, setOptionsDonatori] = useState<
    SearchSelectInterface[]
  >([]);
  const [optionsRecipiente, setOptionsRecipiente] = useState<
    SearchSelectInterface[]
  >([]);
  const [optionsSalon, setOptionsSalon] = useState<SearchSelectInterface[]>([]);

  const [data, setData] = useState<DonatiiInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<DonatiiInterface>({
    idCadruMedical: null,
    idDonator: null,
    idRecipient: null,
    idSalon: null,

    dataRecoltare: moment().format("YYYY-MM-DD"),
  });
  const onSort = async (index: number) => {
    await apiClient
      .get(`/api/Donatii/get-all?order=${index}`)
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
      .get(`/api/Donatii/get-all`)
      .then((res) => {
        setData(res.data.data);
        setTimeout(() => {
          setLoading(true);
        }, 2000);

        createToast("Succes");
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get data.");
      });
    await apiClient
      .get(`/api/CadreMedicale/get-all`)
      .then((res) => {
        setOptionsCadreMedicale(
          res.data.data?.map((e: CadreMedicaleInterface) => {
            return {
              value: e.idCadruMedical,
              label: e.c_nume + " " + e.c_prenume,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get options.");
      });
    await apiClient
      .get(`/api/Saloane/get-all`)
      .then((res) => {
        setOptionsSalon(
          res.data.data?.map((e: SaloaneInterface) => {
            return { value: e.idSalon, label: e.idSalon };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get options.");
      });
    await apiClient
      .get(`/api/Donatori/get-all`)
      .then((res) => {
        setOptionsDonatori(
          res.data.data?.map((e: DonatoriInterface) => {
            return { value: e.idDonator, label: e.d_nume + " " + e.d_prenume };
          })
        );
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get options.");
      });
    await apiClient
      .get(`/api/Recipiente/get-all`)
      .then((res) => {
        setOptionsRecipiente(
          res.data.data?.map((e: RecipienteInterface) => {
            return { value: e.idRecipient, label: e.den_recipient };
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
      idCadruMedical: 0,
      idDonator: 0,
      idRecipient: 0,
      idSalon: 0,

      dataRecoltare: "",
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(`/api/Donatii/update?id=${currentData.idDonatie}`, currentData)
      .then((res) => {
        setData(
          data.map((d) => {
            if (d.idDonatie === currentData.idDonatie) return res.data.data;
            else return d;
          })
        );
        createToast("Dinatii updated succesufully");
        onCloseModal();
      })
      .catch((err) => {
        createError("Dinatii update error");
      });
  };
  const onCreate = () => {
    apiClient
      .post(`/api/Donatii/create`, currentData)
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
      .delete(`/api/Donatii/delete?id=${data[index].idDonatie}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("Donator deleted succesufully");
      })
      .catch((err) => {
        createError("Donator delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<DonatiiInterface>) => {
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
            Table Donatii
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
              <NameWrap title="Id Cadru Medical">
                <CDSSearchSelect
                  value={currentData.idCadruMedical}
                  options={optionsCadreMedicale}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      idCadruMedical: typeof value === "number" ? value : null,
                    });
                  }}
                />
              </NameWrap>
              <NameWrap title="Id Donator">
                <CDSSearchSelect
                  value={currentData.idDonator}
                  options={optionsDonatori}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      idDonator: typeof value === "number" ? value : null,
                    });
                  }}
                />
              </NameWrap>
              <NameWrap title="Id Recipient">
                <CDSSearchSelect
                  value={currentData.idRecipient}
                  options={optionsRecipiente}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      idRecipient: typeof value === "number" ? value : null,
                    });
                  }}
                />
              </NameWrap>
              <NameWrap title="Id Salon">
                <CDSSearchSelect
                  value={currentData.idSalon}
                  options={optionsSalon}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      idSalon: typeof value === "number" ? value : null,
                    });
                  }}
                />
              </NameWrap>
              <NameWrap title="Data Recoltare">
                <CDSDatePicker
                  placeholder="Selectati data recoltare"
                  value={currentData.dataRecoltare ?? ""}
                  onChange={(value: string) => {
                    onChange({
                      dataRecoltare: value,
                    });
                  }}
                />
              </NameWrap>
              <NameWrap title="Data Expediere">
                <CDSDatePicker
                  placeholder="Selectati data expediere"
                  value={currentData.dataExpediere || ""}
                  onChange={(value: string) => {
                    onChange({
                      dataExpediere: value,
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
