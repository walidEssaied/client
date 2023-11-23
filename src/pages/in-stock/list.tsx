// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiListInferencer } from "@refinedev/inferencer/mui";

// export const InStockList: React.FC<IResourceComponentsProps> = () => {
//   return (
//     <MuiListInferencer
//       fieldTransformer={(field: any) => {
//         if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
//           return false;
//         }

//         return field;
//       }}
//     />
//   );
// };

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateField, EditButton, ShowButton, useDataGrid } from "@refinedev/mui";
import React, { useState } from "react";
import { List } from "./components/List";
import { InStockCreate } from "./create";

export const InStockList = () => {
  const { dataGridProps } = useDataGrid();
  const [open, setOpen] = useState<boolean>(false);

  const columns = React.useMemo<GridColDef<any>[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />;
        },
      },
      {
        field: "containers",
        headerName: "Containers",
        type: "number",
        minWidth: 200,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
        align: "center",
        headerAlign: "center",
        minWidth: 80,
      },
    ],
    []
  );

  const onClose = () => {
    setOpen(false);
  };

  return (
    <List open={open} setOpen={setOpen}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create In Stock</DialogTitle>
        <DialogContent>
          <InStockCreate onClose={onClose} />
        </DialogContent>
      </Dialog>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
