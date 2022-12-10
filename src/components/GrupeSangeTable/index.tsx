import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CDSInput } from "../common/InputComponent";

import { NameWrap } from "../common/NameWrap";

import {
  CDSSearchSelect,
  SearchSelectInterface,
} from "../common/SearchSelect/CDSSearchSelect";
import { CustomSpinner } from "../common/Spinner";
import { DonatiiInterface } from "../DonatiiTable/types";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { GrupeSangeInterface } from "./types";

export const GrupeSangeTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [options, setOptions] = useState<SearchSelectInterface[]>([]);
  const [data, setData] = useState<GrupeSangeInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<GrupeSangeInterface>({
    denumire: "",
    antigene: "",
    anticorpi: "",
  });

  const getData = async () => {
    await apiClient
      .get(`/api/GrupeSange/get-all`)
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
      denumire: "",
      antigene: "",
      anticorpi: "",
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    console.log({ ...data[index], isEdit: true, index: index });

    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(`/api/GrupeSange/update?id=${currentData.idGrupaSange}`, currentData)
      .then((res) => {
        setData(
          data.map((d) => {
            if (d.idGrupaSange === currentData.idGrupaSange)
              return res.data.data;
            else return d;
          })
        );
        createToast("Grupa Sange updated succesufully");
      })
      .catch((err) => {
        createError("Grupa Sange update error");
      });
  };

  const onCreate = () => {
    apiClient
      .post(`/api/GrupeSange/create`, currentData)
      .then((res) => {
        setData([...data, res.data.data]);
        setLoading(true);
        onCloseModal();

        createToast("Grupa Sange created succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("Grupa Sange create error");
      });
  };

  const onDelete = (index: number) => {
    apiClient
      .delete(`/api/GrupeSange/delete?id=${data[index].idGrupaSange}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("Grupa Sange deleted succesufully");
      })
      .catch((err) => {
        createError("Grupa Sange delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<GrupeSangeInterface>) => {
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
            Table Grupe Sange
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
              <NameWrap title="Denumire">
                <CDSInput
                  placeholder="Introduceti denumire"
                  value={currentData.denumire}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ denumire: e.target.value });
                  }}
                />
              </NameWrap>

              <NameWrap title="AntiGene">
                <CDSInput
                  placeholder="Introduceti antigene"
                  value={currentData.antigene.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ antigene: e.target.value });
                  }}
                />
              </NameWrap>

              <NameWrap title="AntiCorpi">
                <CDSInput
                  placeholder="Introduceti antigene"
                  value={currentData.anticorpi}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ anticorpi: e.target.value });
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
