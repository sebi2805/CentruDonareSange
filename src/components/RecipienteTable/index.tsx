import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";

import { CDSInput } from "../common/InputComponent";
import { NameWrap } from "../common/NameWrap";

import { CustomSpinner } from "../common/Spinner";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";
import { RecipienteInterface } from "./types";

export const RecipienteTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);

  const [data, setData] = useState<RecipienteInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<RecipienteInterface>({
    denumire: "",
    culoare: "",
    temperaturaInceput: 0,
    temperaturaSfarsit: 0,
  });
  const onSort = async (index: number) => {
    await apiClient
      .get(`/api/Recipiente/get-all?order=${index}`)
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
      .get(`/api/Recipiente/get-all`)
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
      culoare: "",
      temperaturaInceput: 0,
      temperaturaSfarsit: 0,
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(`/api/Recipiente/update?id=${currentData.idRecipient}`, currentData)
      .then((res) => {
        setData(
          data.map((d) => {
            if (d.idRecipient === currentData.idRecipient) return res.data.data;
            else return d;
          })
        );
        createToast("Recipient updated succesufully");
      })
      .catch((err) => {
        createError("Recipient update error");
      });
  };
  const onCreate = () => {
    apiClient
      .post(`/api/Recipiente/create`, currentData)
      .then((res) => {
        setData([...data, res.data.data]);
        setLoading(true);
        onCloseModal();
        createToast("Recipient created succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("Recipient create error");
      });
  };

  const onDelete = (index: number) => {
    apiClient
      .delete(`/api/Recipiente/delete?id=${data[index].idRecipient}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("Recipient deleted succesufully");
      })
      .catch((err) => {
        createError("Recipient delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<RecipienteInterface>) => {
    setCurrentData({ ...currentData, ...data });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <VStack w="100%" h="100%">
        <HStack w="100%" justify="center" px={8} py={8}>
          <Box fontSize={40} fontWeight="bold" color="darkThemeGrey.100">
            Table Recipiente
          </Box>
          <Spacer />
          <CDSModal
            data={currentData}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onCloseModal}
            onCreate={onCreate}
            onUpdate={onUpdate}
            title="Create recipient"
          >
            <VStack w="100%" h="100%" justify={"flex-start"}>
              <NameWrap title="Denumire">
                <CDSInput
                  isNumeric={false}
                  placeholder="Introduceti denumire"
                  value={currentData.denumire}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ denumire: e.target.value });
                  }}
                />
              </NameWrap>
              <NameWrap title="Culoare">
                <CDSInput
                  isNumeric={false}
                  placeholder="Introduceti culoare"
                  value={currentData.culoare}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ culoare: e.target.value });
                  }}
                />
              </NameWrap>
              <NameWrap title="Interval Temperatura Inceput">
                <CDSInput
                  isNumeric={false}
                  placeholder="Introduceti temperatura inceput"
                  value={currentData.temperaturaInceput.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ temperaturaInceput: parseInt(e.target.value) });
                  }}
                />
              </NameWrap>
              <NameWrap title="Interval Temperatura Sfarsit">
                <CDSInput
                  isNumeric={false}
                  placeholder="Introduceti temperatura sfarsit"
                  value={currentData.temperaturaSfarsit.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ temperaturaSfarsit: parseInt(e.target.value) });
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
