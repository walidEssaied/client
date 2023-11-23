import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
} from "@mui/x-data-grid";
import { DateField, EditButton, ShowButton, useDataGrid } from "@refinedev/mui";
import { List } from "pages/in-stock/components/List";
import React, { useState } from "react";
import { OutStockCreate } from "./create";

export const OutStockList = () => {
  const [next, setNext] = React.useState<string | undefined>(undefined);
  const { dataGridProps, tableQueryResult } = useDataGrid<any>({
    initialPageSize: 5,
  });
  const { data } = tableQueryResult;

  const [open, setOpen] = useState<boolean>(false);
  const onClose = () => {
    setOpen(false);
  };

  const columns = React.useMemo<GridColDef<any>[]>(
    () => [
      {
        field: "farmer",
        headerName: "Farmer",
        headerAlign: "left",
        align: "left",
        flex: 1,
        minWidth: 150,
        valueGetter: (params) => params.row.farmer?.name,
      },
      {
        field: "product_name",
        headerName: "Produit",
        headerAlign: "left",
        align: "left",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "client",
        headerName: "Client",
        headerAlign: "left",
        align: "left",
        flex: 1,
        minWidth: 150,
      },
      {
        field: "containers",
        headerName: "Containers",
        type: "number",
        minWidth: 100,
      },
      {
        field: "poids",
        headerName: "Poids",
        type: "number",
        minWidth: 100,
      },
      {
        field: "prix",
        headerName: "prix",
        type: "number",
        minWidth: 100,
      },
      {
        field: "total",
        headerName: "Prix total",
        type: "number",
        minWidth: 150,
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

  const handlePaginationChange = (
    model: GridPaginationModel,
    details: GridCallbackDetails<any>
  ) => {
    // Fetch data for the new page using the updated paginationModel
    // Example: Call an API with paginationModel parameters to fetch new data
  
    const lastRow = data?.data[data.data.length - 1];
    console.log({ lastRow });
  
    // Adjust the property access to get the correct 'createdAt' value
    const next = lastRow?.createdAt;
  
    if (next) {
      setNext(next);
    }
  
    // Trigger the DataGrid's pagination change
    dataGridProps.onPaginationModelChange?.(model, details);
  };

  const {
    onPaginationModelChange,
    sortModel,
    onSortModelChange,
    ...restDataGridProps
  } = dataGridProps;

  return (
    <List open={open} setOpen={setOpen}>
      <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
        <DialogTitle>Create Out Stock</DialogTitle>
        <DialogContent>
          <OutStockCreate onClose={onClose} />
        </DialogContent>
      </Dialog>
      <DataGrid
        pagination
        {...restDataGridProps}
        pageSizeOptions={[5, 10, 25, 100]}
        paginationMode="server"
        columns={columns}
        onPaginationModelChange={handlePaginationChange}
        autoHeight
      />
    </List>
  );
};
