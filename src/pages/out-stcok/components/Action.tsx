import { DeleteOutline, Done } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useMemo } from 'react';
import { UseMutationResult } from "react-query";

interface Props {
    item: any;
    productUpdated: Array<any>;
    setProductUpdated: React.Dispatch<React.SetStateAction<any[]>>;
    remove: any;
    updateProductById: (data: any) => void
    updateProductByIdMutation: UseMutationResult<unknown, unknown, any, unknown>
}

export function Actions({ item, productUpdated, setProductUpdated, remove, updateProductById, updateProductByIdMutation }: Props) {
    const calculateExpensiveValue = (item: any): any => {
        setProductUpdated((products) => [...products, item.id])
    }
    const expensiveValue = useMemo(() => calculateExpensiveValue(item), [item]);

    // use expensiveValue in your component

    return (
        <Stack direction="row" spacing={2}>
            <Typography sx={{ width: "50%" }}>
                <b>Total</b> {(Number(item.attributes.prix_vente) * Number(item.qte_vendu)) ? Number(item.attributes.prix_vente) * Number(item.qte_vendu) : "Processing"} (DT)
            </Typography>
            <Box>
                <IconButton>
                    <Done onClick={() => { updateProductById(item); if (updateProductByIdMutation.isSuccess) { expensiveValue(item) } }} sx={{ color: "green", mr: 5 }} />
                </IconButton>
            </Box>
            <DeleteOutline onClick={() => { remove(item.id) }} sx={{ color: "red" }} />
        </Stack>
    );
}
