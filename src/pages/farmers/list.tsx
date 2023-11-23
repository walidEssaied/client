import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetIdentity } from "@refinedev/core";
import { DateField, EditButton, ShowButton, useDataGrid } from "@refinedev/mui";
import { PaymentAlert } from "components/alerts/paymentAlert";
import { List } from "pages/in-stock/components/List";
import React, { useState } from "react";
import { FarmerCreate } from "./create";

export const FarmerList = () => {
  const { dataGridProps, tableQueryResult } = useDataGrid();
  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };

  const columns = React.useMemo<GridColDef<any>[]>(
    () => [
      {
        field: "name",
        headerName: "Name",
        minWidth: 200,
      },
      {
        field: "phone",
        headerName: "Phone",
        type: "number",
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
  const { data } = tableQueryResult;

  const { data: user } = useGetIdentity<{
    alert_payment: boolean;
    name: string;
  }>({});

  return (
    <List open={open} setOpen={setOpen}>
      {user?.alert_payment && <PaymentAlert />}
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Create Farmer</DialogTitle>
        <DialogContent>
          <FarmerCreate onClose={onClose} />
        </DialogContent>
      </Dialog>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
