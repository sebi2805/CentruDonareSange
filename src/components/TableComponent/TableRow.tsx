import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { theme } from "../../theme";
import { ReactComponent as Options } from "../assets/Options.svg";
import { CDSConfirmDelete } from "../common/CDSConfirmDelete";
interface TableRowProps {
  rowData: any;
  index: number;
  isNotUpdatable?: boolean;
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}
export const TableRow: React.FC<TableRowProps> = ({
  rowData,
  index,
  onDelete,
  isNotUpdatable,
  onUpdate,
}) => {
  const confirmDelete = (index: number, onClose: () => void) => {
    onDelete(index);
    onClose();
  };
  return (
    <Tr fontWeight={500} color="darkThemeGrey.100" fontSize={16}>
      <Td borderRight="1px solid" borderRightColor="neutralGrey" isNumeric>
        {index + 1 + "."}
      </Td>
      {Object.keys(rowData)?.map((k: any, i) => {
        return (
          <Td
            borderRight="1px solid"
            borderRightColor="neutralGrey"
            isNumeric={typeof rowData[k] === "number"}
            key={rowData[k] + index + k}
          >
            {rowData[k]}
          </Td>
        );
      })}
      {!isNotUpdatable ? (
        <Td isNumeric>
          <Menu>
            <MenuButton
              bg={"darkThemeGrey.600"}
              as={IconButton}
              aria-label="Options"
              icon={<Options stroke={"#fff"} />}
              variant="outline"
            />
            <MenuList bg={"darkThemeGrey.600"}>
              <CDSConfirmDelete handleDelete={confirmDelete} index={index}>
                <MenuItem
                  bg="darkThemeGrey.600"
                  _hover={{ bg: "darkThemeGrey.800" }}
                  color={"danger.500"}
                >
                  Delete
                </MenuItem>
              </CDSConfirmDelete>
              <MenuItem
                bg="darkThemeGrey.600"
                _hover={{ bg: "darkThemeGrey.800" }}
                onClick={() => {
                  onUpdate(index);
                }}
              >
                Update
              </MenuItem>
            </MenuList>
          </Menu>
        </Td>
      ) : null}
    </Tr>
  );
};
