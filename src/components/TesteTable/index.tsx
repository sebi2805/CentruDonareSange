import { Box, HStack, Spacer, useDisclosure, VStack } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ErrorServiceContext } from "../../App";

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
import { TesteInterface } from "./types";

export const TesteTable: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createError, createToast } = useContext(ErrorServiceContext);
  const [options, setOptions] = useState<SearchSelectInterface[]>([]);
  const [data, setData] = useState<TesteInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<TesteInterface>({
    hcv: "",
    hiv: "",
    verificareGrupajulSanguin: "",
    diabet: "",
    idDonatie: 0,
  });
  const optionsNegativPozitiv: SearchSelectInterface[] = [
    { label: "pozitiv", value: "pozitiv" },
    { label: "negativ", value: "negativ" },
  ];
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
      .get(`/api/Teste/get-all`)
      .then((res) => {
        setData(res.data.data);
        setLoading(true);
        createToast("Succes");
      })
      .catch((err) => {
        console.log(err);
        createError("Can't get data.");
      });
    await getDonatiiWithoutTest();
  };
  const getDonatiiWithoutTest = async () => {
    await apiClient
      .get(`/api/Donatii/getDonatiiWithoutTest`)
      .then((res) => {
        setOptions(
          res.data.data?.map((d: DonatiiInterface) => {
            return { value: d.idDonatie, label: d.idDonatie };
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
      hcv: "",
      hiv: "",
      verificareGrupajulSanguin: "",
      diabet: "",
      idDonatie: 0,
    });
  };
  const onOpenUpdate = (index: number) => {
    onOpen();
    console.log({ ...data[index], isEdit: true, index: index });

    setCurrentData({ ...data[index], isEdit: true, index: index });
  };

  const onUpdate = () => {
    apiClient
      .put(`/api/Teste/update?id=${currentData.idTest}`, currentData)
      .then((res) => {
        setData(
          data.map((d) => {
            if (d.idTest === currentData.idTest) return res.data.data;
            else return d;
          })
        );
        getDonatiiWithoutTest();
        createToast("Test updated succesufully");
      })
      .catch((err) => {
        createError("Test update error");
      });
  };
  const onCreate = () => {
    apiClient
      .post(`/api/Teste/create`, currentData)
      .then((res) => {
        setData([...data, res.data.data]);
        setLoading(true);
        onCloseModal();
        getDonatiiWithoutTest();
        createToast("Test created succesufully");
      })
      .catch((err) => {
        console.log(err);
        createError("Test create error");
      });
  };

  const onDelete = (index: number) => {
    apiClient
      .delete(`/api/Teste/delete?id=${data[index].idTest}`)
      .then((res) => {
        setData(data.filter((d, i) => i !== index));
        createToast("Test deleted succesufully");
      })
      .catch((err) => {
        createError("Test delete error");
        console.log(err);
      });
  };
  const onChange = (data: Partial<TesteInterface>) => {
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
            Table Teste
          </Box>
          <Spacer />
          <CDSModal
            data={currentData}
            onOpen={onOpen}
            isOpen={isOpen}
            onClose={onCloseModal}
            onCreate={onCreate}
            onUpdate={onUpdate}
            title="Create test"
          >
            <VStack w="100%" h="100%" justify={"flex-start"}>
              <NameWrap title="Rezultat HIV">
                <CDSSearchSelect
                  options={optionsNegativPozitiv}
                  placeholder="Introduceti HIV"
                  value={currentData.hiv}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({ hiv: typeof value === "string" ? value : "" });
                  }}
                />
              </NameWrap>

              <NameWrap title="Rezultat HCV">
                <CDSSearchSelect
                  options={optionsNegativPozitiv}
                  placeholder="Introduceti rezultat revizie tehnica"
                  value={currentData.hcv}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({ hcv: typeof value === "string" ? value : "" });
                  }}
                />
              </NameWrap>

              <NameWrap title="Rezultat diabet">
                <CDSSearchSelect
                  options={optionsNegativPozitiv}
                  placeholder="Introduceti rezultat diabet"
                  value={currentData.diabet}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      diabet: typeof value === "string" ? value : "",
                    });
                  }}
                />
              </NameWrap>
              <NameWrap title="Rezultat Verificare Grupajul Sanguin">
                <CDSSearchSelect
                  options={optionsNegativPozitiv}
                  placeholder="Introduceti rezultat verificare grupajul sanguin"
                  value={currentData.hiv}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      verificareGrupajulSanguin:
                        typeof value === "string" ? value : "",
                    });
                  }}
                />
              </NameWrap>
              <NameWrap title="Donatie">
                <CDSSearchSelect
                  options={options}
                  placeholder="Introduceti donatia"
                  value={currentData.idDonatie.toString()}
                  onChange={(value: number | undefined | null | string) => {
                    onChange({
                      idDonatie: typeof value === "number" ? value : 0,
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
