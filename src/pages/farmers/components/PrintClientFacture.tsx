import { Print } from '@mui/icons-material';
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useGetIdentity } from '@refinedev/core';
import { FC, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';



const FactureContent: FC<{
 title: string,
 content: string | number,
 out?: any,
 client: any,
 totalContainers: number,
 totalPoids: number,
 totalPrix: number,
}> = ({
 title,
 content,
 out,
 client,
 totalContainers,
 totalPoids,
 totalPrix,
}) => {

  const { data: user } = useGetIdentity<{ name: string, avatar: any, id: any }>();
  const userName = user && user.name;
  const date = new Date();
  const new_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " | " + date.getHours() + ":" + date.getMinutes();

  function getRandomInt(min: number, max: number) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min)) + min;
  }

  return (
   <Box>
    <Stack direction="row" alignItems="center" alignContent="center" justifyContent="center" mb={4} spacing={2}>
     <Typography variant="h5" color="black">Facture :</Typography>
     <Typography variant="h5">{getRandomInt(10000000, 99999999)}</Typography>
    </Stack>
    <TableContainer component={Box} >
     <Table sx={{ width: "auto" }} aria-label="simple table">
      <TableHead>
       <TableRow>
        <TableCell align="left" sx={{ fontWeight: 700, color: "#3d27e9", border: 0.5, borderTopRightRadius: 8, width: 150, fontSize: 10, p: 1 }}>Agent's name</TableCell>
        <TableCell align="left" sx={{ fontWeight: 700, color: "#3d27e9", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>Client</TableCell>
        <TableCell align="left" sx={{ fontWeight: 700, color: "#3d27e9", border: 0.5, borderTopRightRadius: 8, width: 100, fontSize: 10, p: 1 }}>Date</TableCell>
       </TableRow>
      </TableHead>
      <TableBody sx={{ border: 0.5, borderColor: "#3d27e9" }}>
       <TableRow
        sx={{ '&:last-child td, &:last-child th': { border: "solid 1px #3d27e9" } }}
       >
        <TableCell align="left" sx={{ fontSize: 10, p: 1 }}>
         {userName ? userName : "-"}
        </TableCell>
        <TableCell align="left" sx={{ fontSize: 10, p: 1 }}>
         {client ? client : "client"}
        </TableCell>
        <TableCell align="left" width={100} sx={{ fontSize: 8, p: 1 }}>
         {new_date ? new_date : "-"}
        </TableCell>
       </TableRow>
      </TableBody>
     </Table>
    </TableContainer>
    <br />
    <TableContainer component={Box} >
     <Table sx={{ width: "auto" }} aria-label="simple table">
      <TableHead>
       <TableRow>
        <TableCell align="left" sx={{ fontWeight: 700, color: "#3d27e9", border: 0.5, borderTopRightRadius: 8, width: 150, fontSize: 10, p: 1 }}>Produit</TableCell>
        <TableCell align="left" sx={{ fontWeight: 700, color: "#3d27e9", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>Containers</TableCell>
        <TableCell align="left" sx={{ fontWeight: 700, color: "#3d27e9", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>Poids</TableCell>
        <TableCell align="left" sx={{ fontWeight: 700, color: "#3d27e9", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>Prix</TableCell>
        <TableCell align="left" sx={{ fontWeight: 700, color: "#3d27e9", border: 0.5, borderTopRightRadius: 8, width: 100, fontSize: 10, p: 1 }}>Total</TableCell>
       </TableRow>
      </TableHead>
      <TableBody sx={{ border: 0.5, borderColor: "#3d27e9", heigth: "500px !important" }}>
       <TableRow>
        <TableCell align="left" sx={{ border: 0.5, borderColor: "#3d27e9", fontSize: 10, p: 1 }}>
         {out.product_name ?? "product name"}
        </TableCell>
        <TableCell align="left" sx={{ border: 0.5, borderColor: "#3d27e9", fontSize: 10, p: 1 }}>
         {out.poids ?? "poids"}
        </TableCell>
        <TableCell align="left" sx={{ border: 0.5, borderColor: "#3d27e9", fontSize: 10, p: 1 }}>
         {out.containers ?? "poids"}
        </TableCell>
        <TableCell align="left" sx={{ border: 0.5, borderColor: "#3d27e9", fontSize: 10, p: 1 }}>
         {out.prix ?? "prix"}
        </TableCell>
        <TableCell align="left" sx={{ border: 0.5, borderColor: "#3d27e9", fontSize: 10, p: 1 }}>
         {out.total ?? "total"}
        </TableCell>
       </TableRow>
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
       <br />
      </TableBody>
     </Table>
    </TableContainer>
    <Box mt={4}>
     <Typography variant="h5" color="black">Signature</Typography>
     <br />
     <Typography variant="body2" color="black">............................</Typography>
    </Box>
   </Box>
  )
 }

export const ComponentToPrint: FC<{ componentRef?: React.MutableRefObject<null>, out?: any, client?: any }> = ({ componentRef, out, client }) => {
 var totalContainers = out ? out.containers : "containers";
 var totalPoids = out ? out.poids : "poids";
 var totalPrix = out ? out.total : "total";

 console.log({
  totalPoids,
  totalPrix
 });

 return (
  <Box p={4} ref={componentRef} mt={0} sx={{ backgroundColor: "white", height: "3508px" }}>
   <Box>
    <Stack direction="row" alignItems="start">
     <FactureContent
      content="empty"
      title="out"
      out={out}
      client={client}
      totalContainers={totalContainers}
      totalPoids={totalPoids}
      totalPrix={totalPrix}
     />
    </Stack>
   </Box>
  </Box>
 )
}
export const ComponentToPrintClientContainer: FC<{ out?: any, label: string }> = ({ out, label }) => {
 console.log({ out });
 const date = new Date();
 const new_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "    |     " + date.getHours() + ":" + date.getMinutes();

 const clientName = out.client ? out.client : "Client";
 const componentRef = useRef(null);
 const handlePrint = useReactToPrint({
  content: () => componentRef.current,
  onAfterPrint: () => {
   alert(`Facture for client [${clientName ? clientName : ""}] printed successfully`);
  },
  onPrintError: () => {
   alert("Verify your facture")
  },
  documentTitle: `facture_for_${clientName ? clientName : ""}_${new_date}`,
 });

 return (
  <Box>
   <Box sx={{ display: "none" }}>
    <ComponentToPrint componentRef={componentRef} out={out} client={clientName} />
   </Box>
   <Button startIcon={<Print />} color="secondary" onClick={() => { handlePrint() }}>
    {label}
   </Button>
  </Box>
 );
};