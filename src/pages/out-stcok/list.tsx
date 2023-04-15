// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiListInferencer } from "@refinedev/inferencer/mui";

// export const OutStockList: React.FC<IResourceComponentsProps> = () => {
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
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import {
    DateField,
    EditButton,
    ShowButton,
    useDataGrid
} from "@refinedev/mui";
import { List } from "pages/in-stock/components/List";
import React, { useState } from "react";
import { OutStockCreate } from "./create";


export const OutStockList = () => {
    const { dataGridProps } = useDataGrid({
        meta: {
            populate: "*"
        }
    });
    const [open, setOpen] = useState<boolean>(false)
    const onClose = () => {
        setOpen(false);
    }

    const columns = React.useMemo<GridColumns<any>>(
        () => [
            // {
            //     field: "client",
            //     headerName: "Client",
            //     type: "text",
            //     headerAlign: "left",
            //     align: "left",
            //     minWidth: 200,
            // },
            {
                field: "farmer",
                headerName: "Farmer",
                headerAlign: "left",
                align: "left",
                flex: 1,
                valueGetter: params => params.row.farmer?.name
            },
            {
                field: "product_name",
                headerName: "Produit",
                headerAlign: "left",
                align: "left",
                flex: 1,
                // valueGetter: params => params.row.produit ? params.row.produit.name : ""
            },
            {
                field: "containers",
                headerName: "Containers",
                type: "number",
                minWidth: 200,
            },
            {
                field: "poids",
                headerName: "Poids",
                type: "number",
                minWidth: 200,
            },
            {
                field: "prix",
                headerName: "prix",
                type: "number",
                minWidth: 200,
            },
            {
                field: "total",
                headerName: "Prix total",
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

    console.log({ dataGridProps });


    return (
        <List open={open} setOpen={setOpen}>
            <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
                <DialogTitle>
                    Create In Stock
                </DialogTitle>
                <DialogContent>
                    <OutStockCreate onClose={onClose} />
                </DialogContent>
            </Dialog>
            <DataGrid {...dataGridProps} columns={columns} autoHeight />
        </List>
    );
};
