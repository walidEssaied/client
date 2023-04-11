import { Print } from '@mui/icons-material';
import { Box, Button, Stack, Typography } from '@mui/material';
import { FC, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';


const Facture: FC<{ title: string, content: string }> = ({ title, content }) => {
 return (
  <Stack direction="column" justifyContent="center">
   <Box sx={{ border: 1, borderColor: "green", width: "auto", borderTopLeftRadius: 5, borderTopRightRadius: 5, p: 0.5, pr: 2 }}>
    <Typography sx={{ color: "green" }} fontWeight="bold" fontSize={15}>
     {title}
    </Typography>
   </Box>
   {content !== "empty" && (
    <Box sx={{ border: 1, borderColor: "green", width: "auto", px: 2, py: 0.5 }}>
     <Typography sx={{ color: "black" }} fontWeight="semibold" fontSize={12}>
      {content ? content : "-"}
     </Typography>
    </Box>
   )}
  </Stack>
 )
}

const ComponentToPrint: FC<{ componentRef: React.MutableRefObject<null>, out: any, farmer: any }> = ({ componentRef, out, farmer }) => {
 const date = new Date();
 const new_date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "    |     " + date.getHours() + ":" + date.getMinutes();
 return (
  <Box p={4} ref={componentRef} mt={5}>
   <Typography textAlign="center" fontWeight="bold" variant="h4">
    Facture
   </Typography>
   <Box>
    <Stack direction="row" alignItems="start">
     <Facture
      title="Farmer"
      content={farmer ? farmer.name : "-"}
     />
     <Facture
      title="Date"
      content={new_date}
     />
    </Stack>
    <Stack direction="row" alignItems="start" mt={2}>
     <Facture
      title="Produit"
      content={out ? out.product_name : "-"}
     />
     <Facture
      title="Poids"
      content={out ? out.poids : "-"}
     />
     <Facture
      title="Containers"
      content={out ? out.containers : "-"}
     />
     <Facture
      title="Prix"
      content={out ? out.prix : "-"}
     />
     <Facture
      title="Prix total"
      content={out ? out.total : "-"}
     />
    </Stack>
   </Box>
   <Box mt={1}>
    <Stack direction="row" alignItems="start">
     <Facture
      title="Total"
      content="empty"
     />
     <Facture
      title="Poids"
      content={"7000"}
     />
    </Stack>
   </Box>

  </Box>
 )
}
export const ComponentToPrintContainer: FC<{ out: any, farmer: any }> = ({ out, farmer }) => {
 const componentRef = useRef(null);
 const handlePrint = useReactToPrint({
  content: () => componentRef.current,
 });

 return (
  <Box>
   <Box sx={{ display: "none" }}>
    <ComponentToPrint componentRef={componentRef} out={out} farmer={farmer} />
   </Box>
   <Button startIcon={<Print />} sx={{ color: "white" }} onClick={() => { handlePrint() }}>
    Imprimer facture
   </Button>
  </Box>
 );
};