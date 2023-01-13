import {
  Box,
  Flex,
  Icon,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { TableRow } from "./TableRow";
import { log } from "console";

interface CDSTableProps {
  isEmpty?: boolean;
  tableData: any[];
  isNotUpdatable?: boolean;
  onUpdate: (index: number) => void;
  onDelete: (index: number) => void;
  onSort: (index: number) => void;
}

export const CDSTable: React.FC<CDSTableProps> = ({
  tableData,
  onDelete,
  isEmpty,
  onUpdate,
  onSort,
  isNotUpdatable,
}) => {
  const [sortValue, setSortValue] = useState<number>(0);
  const [ascending, setAscending] = useState<boolean>(true);
  const onSortInternal = (index: number) => {
    if (index === sortValue) {
      if (ascending) {
        setAscending(false);
        if (onSort) onSort((index + 1) * 2 - 1);
      } // because 2*1 -1 =1 => asc on first attribute
      else {
        setAscending(true);
        if (onSort) onSort((index + 1) * 2);
      }
    } else {
      setAscending(false);
      setSortValue(index);
      if (onSort) onSort((index + 1) * 2 - 1);
    }
  };

  return (
    <VStack w="100%" align={"flex-start"} justify="flex-start">
      <TableContainer
        w="100%"
        maxH={`calc(100vh - 220px)`}
        overflowY={"auto"}
        px={4}
      >
        <Table
          variant="simple"
          size="md"
          border="2px solid"
          borderColor="neutralGrey"
        >
          {tableData !== null &&
          tableData !== undefined &&
          tableData?.length > 0 ? (
            <>
              <Thead
                bg="darkThemeGrey.800"
                color="white"
                top="0"
                position={"sticky"}
                zIndex={100}
              >
                <Tr>
                  <Th fontWeight={"bold"} fontSize={16} isNumeric color="white">
                    Index
                  </Th>
                  {Object?.keys(tableData[0] ?? {})?.map((k, i) => {
                    return (
                      <Th
                        color="white"
                        cursor={"pointer"}
                        key={k + i}
                        onClick={() => {
                          onSortInternal(i);
                        }}
                        w="100%"
                      >
                        <Flex
                          w="100%"
                          fontWeight={"bold"}
                          fontSize={16}
                          justify={"flex-end"}
                        >
                          <Box>{k}</Box>
                          <Spacer />
                          <Icon
                            as={
                              sortValue === i
                                ? ascending
                                  ? ChevronDownIcon
                                  : ChevronUpIcon
                                : ChevronUpIcon
                            }
                          />
                        </Flex>
                      </Th>
                    );
                  })}
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody minH={"fit-content"}>
                {!isEmpty ? (
                  <>
                    {tableData?.map((t, i) => {
                      return (
                        <TableRow
                          isNotUpdatable={isNotUpdatable}
                          index={i}
                          rowData={t}
                          key={i + "TableRow"}
                          onDelete={onDelete}
                          onUpdate={onUpdate}
                        />
                      );
                    })}
                  </>
                ) : null}
              </Tbody>
            </>
          ) : null}
        </Table>
      </TableContainer>
    </VStack>
  );
};
