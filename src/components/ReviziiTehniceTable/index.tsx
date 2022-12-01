import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CDSDatePicker } from "../common/DatePicker/CDSDatePicker";
import { useError } from "../common/ErrorService";

import { CDSInput } from "../common/InputComponent";
import { NameWrap } from "../common/NameWrap";

import {
  CDSSearchSelect,
  SearchSelectInterface,
} from "../common/SearchSelect/CDSSearchSelect";
import { CustomSpinner } from "../common/Spinner";
import { EchipamenteInterface } from "../EchipamenteTable/types";
import { FunctiiInterface } from "../FunctiiTable/types";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { ReviziiTehniceInterface } from "./types";

export const CadreMedicaleTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [options, setOptions] = useState<SearchSelectInterface[]>([]);
  const [data, setData] = useState<ReviziiTehniceInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<ReviziiTehniceInterface>({
    dataRevizieTehnica: moment().toString(),
    rezultatRevizieTehnica: "",
    idEchipament: 0,
  });
  const getData = async () => {
    await apiClient
      .get(`/api/ReviziiTehnice/get-all`)
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
      .get(`/api/Echipamente/get-all`)
      .then((res) => {
        setOptions(
          res.data.data?.map((e: EchipamenteInterface) => {
            return { value: e.idEchipament, label: e.denumireTehnica };
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
      dataRevizieTehnica: moment().toString(),
      rezultatRevizieTehnica: "",
      idEchipament: 0,
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(
        `/api/ReviziiTehnice/update?id=${currentData.idRevizieTehnica}`,
        currentData
      )
      .then((res) => {
        console.log(res.data.data);
        setData(
          data.map((d) => {
            if (d.idRevizieTehnica === currentData.idRevizieTehnica)
              return res.data.data;
            else return d;
          })
        );
        createToast("RevizieTehnica updated succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("RevizieTehnica update error");
      });
  };
  const onCreate = () => {
    apiClient
      .post(`/api/ReviziiTehnice/create`, currentData)
      .then((res) => {
        setData([...data, res.data.data]);
        setLoading(true);
        onCloseModal();
        createToast("RevizieTehnica created succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("RevizieTehnica create error");
      });
  };

  const onDelete = (index: number) => {
    apiClient
      .delete(`/api/ReviziiTehnice/delete?id=${data[index].idEchipament}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("RevizieTehnica deleted succesufully");
      })
      .catch((err) => {
        createError("RevizieTehnica delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<ReviziiTehniceInterface>) => {
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
              <NameWrap title="Rezultat Revizie Tehnica">
                <CDSInput
                  placeholder="Introduceti rezultat revizie tehnica"
                  value={currentData.rezultatRevizieTehnica}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ rezultatRevizieTehnica: e.target.value });
                  }}
                />
              </NameWrap>

              <NameWrap title="Data Reviziei">
                <CDSDatePicker
                  onChange={(date: string) => {
                    onChange({ dataRevizieTehnica: date });
                  }}
                  value={currentData.dataRevizieTehnica || ""}
                />
              </NameWrap>
              <NameWrap title="Id Echipament">
                <CDSSearchSelect
                  value={currentData.idEchipament}
                  options={options}
                  onChange={(value: number | undefined) => {
                    onChange({ idEchipament: value });
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
