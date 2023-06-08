// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const FarmerShow: React.FC<IResourceComponentsProps> = () => {
//   return (
//     <MuiShowInferencer
//       fieldTransformer={(field: any) => {
//         if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
//           return false;
//         }

//         return field;
//       }}
//     />
//   );
// };
import { Archive } from "@mui/icons-material";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
 Show
} from "@refinedev/mui";
import { useState } from "react";
import { useMutation } from "react-query";
import { updateOut } from "services/out";
import { ComponentToPrintContainer } from "./components/Print";
import { ComponentToPrintClientContainer } from "./components/PrintClientFacture";

export const FarmerShow = () => {
 const [showIns, setShowIns] = useState(false);
 const [showArchivedOuts, setShowArchivedOuts] = useState(false);
 const [product, setProduct] = useState<string | null>("");
 const { queryResult } = useShow({
  liveMode: "auto",
  meta: {
   populate: "*"
  }
 });
 const { data, isLoading } = queryResult;

 const record = data?.data;


 const products = record ? record.produits : [];
 const filtredOuts = record ? record.outs.filter((item: any) => item.is_archive !== true).filter((item: any) => item.tag.includes(product)) : [];
 const archivedOuts = record ? record.outs.filter((item: any) => item.is_archive === true) : [];



 const mutation = useMutation(updateOut, {
  onSuccess: () => {
   queryResult.refetch();
  }
 })

 const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
   return;
  }
 };

 return (
  <Show isLoading={isLoading}>
   <Stack gap={1}>
    <Stack direction="row" alignItems="center" justifyContent="end">
     <Button onClick={() => setShowIns(!showIns)}>
      {!showIns ? "Show Ins" : "Hide Ins"}
     </Button>
     <Button onClick={() => setShowArchivedOuts(!showArchivedOuts)}>
      {!showArchivedOuts ? "Show Archive" : "Hide Archive"}
     </Button>
    </Stack>
    <Snackbar open={mutation.isSuccess} autoHideDuration={6000} onClose={handleClose}>
     <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
      Out archived with success!
     </Alert>
    </Snackbar>
    <TableContainer component={Paper}>
     <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
       <TableRow>
        <TableCell>Id</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Phone</TableCell>
        <TableCell align="right">Created At</TableCell>
       </TableRow>
      </TableHead>
      <TableBody>
       <TableRow
        // key={row.name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
       >
        <TableCell component="th" scope="row">
         {/* {row.name} */}
         {record?.id ?? ""}
        </TableCell>
        <TableCell align="right">
         {/* {row.calories} */}
         {record?.name ?? ""}
        </TableCell>
        <TableCell align="right">
         {/* {row.fat} */}
         {record?.phone ?? ""}
        </TableCell>
        <TableCell align="right">
         {record?.createdAt}
         {/* {row.carbs} */}
        </TableCell>
        <TableCell align="right">
         {/* {row.protein} */}
        </TableCell>
       </TableRow>
      </TableBody>
     </Table>
    </TableContainer>
    <Stack spacing={2} mt={2}>
     <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h4" fontWeight="bold">Outs</Typography>
      {product !== "" && (
       <Typography variant="h5" fontWeight="medium">
        Filtred by
        <Typography sx={{ color: "#3b3ba2", p: 1, backgroundColor: "#b3b3d4", borderRadius: 5, textAlign: "center", display: "inline", ml: 1 }}>
         <b>{product}</b>
        </Typography>
       </Typography>
      )}
      <Stack direction="row" alignItems="end" spacing={2}>
       <ComponentToPrintContainer
        farmer={record ? record : null}
        outs={filtredOuts}
        label="Print All"
       />
       <FormControl sx={{ width: 150 }} variant="standard">
        <InputLabel id="demo-simple-select-label">Print by tag</InputLabel>
        <Select value={product === null ? "" : product} onChange={(e) => setProduct(String(e.target.value))}>
         {products.map((item: any) => {
          return (
           <MenuItem value={item.tag}>{item.tag}</MenuItem>
          )
         })}
        </Select>
       </FormControl>
       <Button onClick={() => setProduct("")} color="error">Reset</Button>
      </Stack>
     </Stack>
     {filtredOuts.map((item: any) => (
      <Stack sx={{ p: 1, backgroundColor: "#639463", color: "white" }} direction="row" spacing={2} justifyContent="space-between" alignItems="center">
       <Box>
        <Stack direction="row" spacing={2} alignItems="center">
         <Typography>
          <b>
           Product: {" "}
          </b>
          {item.product_name ?? "No product name"}
         </Typography>
         <Typography>
          <b>
           poids total: {" "}
          </b>
          {item.poids}
         </Typography>
         <Typography>
          <b>
           Containers: {" "}
          </b>
          {item.containers}
         </Typography>
        </Stack>
       </Box>
       <Stack direction="row" spacing={2}>
        <ComponentToPrintClientContainer
         label="Facture"
         out={item}
        />
        <Button startIcon={<Archive />} sx={{ color: "#471fa5" }} onClick={() => { mutation.mutate({ ...item, is_archive: true }) }}>Archive</Button>
       </Stack>
      </Stack>
     ))}
    </Stack>

    {showArchivedOuts && (
     <Stack spacing={2} mt={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
       <Typography variant="h4" fontWeight="bold">Archived Outs</Typography>
      </Stack>
      {showArchivedOuts && archivedOuts.map((item: any) => (
       <Stack sx={{ p: 1, backgroundColor: "#639463", color: "white" }} direction="row" spacing={2} justifyContent="space-between" alignItems="center">
        <Box>
         <Stack direction="row" spacing={2} alignItems="center">
          <Typography>
           <b>
            Product: {" "}
           </b>
           {item.product_name ?? "No product name"}
          </Typography>
          <Typography>
           <b>
            poids total: {" "}
           </b>
           {item.poids}
          </Typography>
          <Typography>
           <b>
            Containers: {" "}
           </b>
           {item.containers}
          </Typography>
         </Stack>
        </Box>
        <Stack direction="row" spacing={2}>
         <ComponentToPrintClientContainer
          label="Facture"
          out={item}
         />
        </Stack>
       </Stack>
      ))}
     </Stack>
    )}



    {showIns && (
     <Stack spacing={2} mt={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
       <Typography variant="h4" fontWeight="bold">Ins</Typography>
      </Stack>
      {!product && (record?.ins || []).map((item: any) => (
       <Stack sx={{ p: 1, backgroundColor: "#639463", color: "white" }} direction="row" spacing={2} justifyContent="space-between">
        <Stack direction="row" spacing={2} alignItems="center">
         <Typography>
          <b>
           Product: {" "}
          </b>
          {item.produit_name ?? "No product name"}
         </Typography>
         <Typography>
          <b>
           Containers: {" "}
          </b>
          {item.containers ?? "No containers"}
         </Typography>
         <Typography>
          <b>
           Name: {" "}
          </b>
          {record ? record.name : "No name"}
         </Typography>
        </Stack>
       </Stack>
      ))}
     </Stack>
    )}

   </Stack>
  </Show >
 );
};