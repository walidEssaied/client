import { Error } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { useGetIdentity } from "@refinedev/core";
import { FC } from "react";

export const PaymentAlert: FC = () => {

 const { data: user } = useGetIdentity<{
  alert_payment: boolean,
  name: string,
 }>({});


 return (
  <Stack sx={{ p: 2, backgroundColor: "red", textAlign: "center" }} alignItems="center" justifyContent="center" width="100%" direction="column" spacing={1} borderRadius={1} mb={1}>
   <Error sx={{ width: "100px", fontSize: 40, color: "white" }} />
   <Typography color="white" sx={{ textTransform: "uppercase" }}>
    <u>{user?.name ?? ""}</u>
   </Typography>
   <Typography textAlign="center" fontWeight="bold" color="white">
    Please make payment within a maximum of 48 hours, otherwise the solution will be closed and your data will be lost.
   </Typography>
   <Typography textAlign="center" fontWeight="bold" color="white">
    For payment, please contact the administrators of Agrirp as soon as possible.
   </Typography>
  </Stack>
 )
}