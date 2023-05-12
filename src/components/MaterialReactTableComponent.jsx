import React from "react";
import MaterialReactTable from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";

const MaterialReactTableComponent = ({
  columns,
  dataList,
  columnVisibility,
  handleDelete,
}) => {
  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={dataList}
        enableColumnActions={false}
        enableSorting={false}
        enableEditing
        initialState={{
          density: "compact",
          columnVisibility,
        }}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableHiding={false}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={(e) => handleDelete(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </>
  );
};

export default MaterialReactTableComponent;
