import { DataGrid, GridColumns } from "@mui/x-data-grid";
import {
  DateField,
  EditButton,
  List,
  ShowButton,
  useDataGrid
} from "@refinedev/mui";
import React from "react";

export const FarmerList = () => {
  const { dataGridProps } = useDataGrid();

  const columns = React.useMemo<GridColumns<any>>(
    () => [
      // {
      //   field: "id",
      //   headerName: "Id",
      //   type: "number",
      //   minWidth: 50,
      // },
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
    [],
  );


  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  );
};
