import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import moment from "moment";
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
import { EchipamenteInterface } from "../EchipamenteTable/types";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { SaloaneInterface } from "./types";

export const SaloaneTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [options, setOptions] = useState<SearchSelectInterface[]>([]);
  const [data, setData] = useState<SaloaneInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<SaloaneInterface>({
    oraInceput: 0,
    oraSfarsit: 24,
    suprafata: 0,
  });
  const getData = async () => {
    await apiClient
      .get(`/api/Saloane/get-all`)
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
  const onCloseModal = () => {
    onClose();
    setCurrentData({
      oraInceput: 0,
      oraSfarsit: 24,
      suprafata: 0,
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(`/api/Saloane/update?id=${currentData.idSalon}`, currentData)
      .then((res) => {
        setData(
          data.map((d) => {
            if (d.idSalon === currentData.idSalon) return res.data.data;
            else return d;
          })
        );
        createToast("Saloane updated succesufully");
      })
      .catch((err) => {
        createError("Saloane update error");
      });
  };
  const onCreate = () => {
    apiClient
      .post(`/api/Saloane/create`, currentData)
      .then((res) => {
        setData([...data, res.data.data]);
        setLoading(true);
        onCloseModal();
        createToast("Saloane created succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("Saloane create error");
      });
  };

  const onDelete = (index: number) => {
    apiClient
      .delete(`/api/Saloane/delete?id=${data[index].idSalon}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("Saloane deleted succesufully");
      })
      .catch((err) => {
        createError("Saloane delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<SaloaneInterface>) => {
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
            Table Saloane
          </Box>
          <Spacer />
          <CDSModal
            data={currentData}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onCloseModal}
            onCreate={onCreate}
            onUpdate={onUpdate}
            title="Create salon"
          >
            <VStack w="100%" h="100%" justify={"flex-start"}>
              <NameWrap title="Ora Inceput">
                <CDSInput
                  placeholder="Introduceti ora de inceput"
                  value={currentData.oraInceput.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ oraInceput: parseInt(e.target.value) });
                  }}
                />
              </NameWrap>
              <NameWrap title="Ora Sfarsit">
                <CDSInput
                  placeholder="Introduceti ora de inceput"
                  value={currentData.oraSfarsit.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ oraSfarsit: parseInt(e.target.value) });
                  }}
                />
              </NameWrap>
              <NameWrap title="suprafata">
                <CDSInput
                  placeholder="Introduceti suprafata"
                  value={currentData.suprafata.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ suprafata: parseInt(e.target.value) });
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
