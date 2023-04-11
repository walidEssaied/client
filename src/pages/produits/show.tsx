import { Box, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
 DateField,
 NumberField,
 Show,
 TextFieldComponent as TextField,
} from "@refinedev/mui";

export const ProduitShow = () => {
 const { queryResult } = useShow({
  meta: {
   populate: "*",
  }
 });
 const { data, isLoading } = queryResult;

 const record = data?.data;

 console.log({ record });

 return (
  <Show isLoading={isLoading}>
   <Stack gap={1}>
    <Typography variant="body1" fontWeight="bold">
     Id
    </Typography>
    <NumberField value={record?.id ?? ""} />
    <Typography variant="body1" fontWeight="bold">
     Name
    </Typography>
    <TextField value={record?.name} />
    <Typography variant="body1" fontWeight="bold">
     Tag
    </Typography>
    <TextField value={record?.tag} />
    <Typography variant="body1" fontWeight="bold">
     Price
    </Typography>
    <NumberField value={record?.price ?? ""} />
    <Typography variant="body1" fontWeight="bold">
     Containers
    </Typography>
    <NumberField value={record?.containers ?? ""} />
    <Typography variant="body1" fontWeight="bold">
     Farmer
    </Typography>
    {record && record.farmer?.name ? (
     <TextField value={record?.farmer.name} />
    ) : (
     <Typography variant="body1" fontWeight="semibold" color="GrayText">No farmer is set for this product</Typography>
    )}
    <Typography variant="body1" fontWeight="bold">
     Created At
    </Typography>
    <DateField value={record?.createdAt} />
   </Stack>
   <Stack>
    <Typography variant="body1" fontWeight="bold">
     Out stock
    </Typography>
    <Box>
     Not order for now!
    </Box>
   </Stack>
  </Show>
 );
};
