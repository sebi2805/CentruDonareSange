import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { TableRow } from "./TableRow";

interface CDSTableProps {
  tableData: any[];
  onUpdate: (index: number) => void;
  onDelete: (index: number) => void;
}

export const CDSTable: React.FC<CDSTableProps> = ({
  tableData,
  onDelete,
  onUpdate,
}) => {
  return (
    <VStack w="100%" h="100%" align={"flex-start"} justify="flex-start">
      <TableContainer w="100%" h="100%" px={4}>
        <Table
          variant="simple"
          size="md"
          border="2px solid"
          borderColor="neutralGrey"
        >
          <Thead bg="blue.100" color="blue.700">
            <Tr>
              <Th fontWeight={"bold"} fontSize={16} isNumeric>
                Index
              </Th>
              {Object.keys(tableData[0])?.map((k, i) => {
                return (
                  <Th key={k + i}>
                    <Flex
                      w="100%"
                      fontWeight={"bold"}
                      fontSize={16}
                      justify={
                        typeof tableData[0][k] === "number"
                          ? "flex-end"
                          : "flex-start"
                      }
                    >
                      {k}
                    </Flex>
                  </Th>
                );
              })}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData?.map((t, i) => {
              return (
                <TableRow
                  index={i}
                  rowData={t}
                  key={i + "TableRow"}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};
