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
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}
export const TableRow: React.FC<TableRowProps> = ({
  rowData,
  index,
  onDelete,
  onUpdate,
}) => {
  const confirmDelete = (index: number, onClose: () => void) => {
    onDelete(index);
    onClose();
  };
  return (
    <Tr fontWeight={500} color="darkThemeGrey.700" fontSize={16}>
      <Td borderRight="1px solid" borderRightColor="neutralGrey" isNumeric>
        {index + "."}
      </Td>
      {Object.keys(rowData).map((k: any, i) => {
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
      <Td isNumeric>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<Options stroke={theme.colors.blue[700]} />}
            variant="outline"
          />
          <MenuList bg={"darkThemeGrey.600"}>
            <CDSConfirmDelete handleDelete={confirmDelete} index={index}>
              <MenuItem
                color={"danger.500"}
                onClick={() => {
                  onDelete(index);
                }}
              >
                Delete
              </MenuItem>
            </CDSConfirmDelete>
            <MenuItem
              color={"danger.1500"}
              onClick={() => {
                onUpdate(index);
              }}
            >
              Update
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
};
