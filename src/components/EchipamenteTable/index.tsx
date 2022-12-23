import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";
import { CDSDatePicker } from "../common/DatePicker/CDSDatePicker";

import { CDSInput } from "../common/InputComponent";
import { NameWrap } from "../common/NameWrap";

import { CustomSpinner } from "../common/Spinner";
import { EchipamenteInterface } from "../EchipamenteTable/types";
import { CDSModal } from "../ModalComponent";
import { CDSTable } from "../TableComponent";
import { apiClient } from "../utils/apiClient";

export const EchipamentTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);

  const [data, setData] = useState<EchipamenteInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<EchipamenteInterface>({
    denumireTehnica: "",
    serie: "",
    dataCumparare: moment().toISOString(),
  });
  const onSort = async (index: number) => {
    await apiClient
      .get(`/api/Echipamente/get-all?order=${index}`)
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
      .get(`/api/Echipamente/get-all`)
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
      dataCumparare: moment().toISOString(),
      denumireTehnica: "",
      serie: "",
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(
        `/api/Echipamente/update?id=${currentData.idEchipament}`,
        currentData
      )
      .then((res) => {
        setData(
          data.map((d) => {
            if (d.idEchipament === currentData.idEchipament)
              return res.data.data;
            else return d;
          })
        );
        createToast("Echipament updated succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("Echipament update error");
      });
  };
  const onCreate = () => {
    apiClient
      .post(`/api/Echipamente/create`, currentData)
      .then((res) => {
        setData([...data, res.data.data]);
        setLoading(true);
        onCloseModal();
        createToast("Echipament created succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("Echipament create error");
      });
  };

  const onDelete = (index: number) => {
    apiClient
      .delete(`/api/Echipamente/delete?id=${data[index].idEchipament}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("RevizieTehnica deleted succesufully");
      })
      .catch((err) => {
        createError("RevizieTehnica delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<EchipamenteInterface>) => {
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
          <Box fontSize={40} fontWeight="bold" color="blue.800">
            Table Echipamente
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
              <NameWrap title="Denumire Tehnica">
                <CDSInput
                  isNumeric={false}
                  placeholder="Introduceti denumirea tehnica"
                  value={currentData.denumireTehnica}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ denumireTehnica: e.target.value });
                  }}
                />
              </NameWrap>

              <NameWrap title="Data Cumpararii">
                <CDSDatePicker
                  onChange={(date: string) => {
                    onChange({ dataCumparare: date });
                  }}
                  value={currentData.dataCumparare || ""}
                />
              </NameWrap>
              <NameWrap title="Serie">
                <CDSInput
                  isNumeric={false}
                  value={currentData.serie}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChange({ serie: e.target.value });
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
