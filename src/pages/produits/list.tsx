import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DateField, EditButton, ShowButton, useDataGrid } from "@refinedev/mui";
import { List } from "pages/in-stock/components/List";
import React, { useState } from "react";
import { ProduitCreate } from "./create";

export const ProduitList = () => {
  const { dataGridProps } = useDataGrid();
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };

  const columns = React.useMemo<GridColDef<any>[]>(
    () => [
      {
        field: "id",
        headerName: "Id",
        type: "number",
        minWidth: 50,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 200,
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
        field: "tag",
        headerName: "Tag",
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

  return (
    <List open={open} setOpen={setOpen}>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Create Farmer</DialogTitle>
        <DialogContent>
          <ProduitCreate onClose={onClose} />
        </DialogContent>
      </Dialog>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
