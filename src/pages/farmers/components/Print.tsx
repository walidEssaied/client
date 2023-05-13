import { Print } from '@mui/icons-material';
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useGetIdentity } from '@refinedev/core';
import { FC, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';



const FactureContent: FC<{
  title: string,
  content: string | number,
  outs?: any,
  farmer: any,
  totalContainers: number,
  totalPoids: number,
  totalPrix: number,
}> = ({
  title,
  content,
  outs,
  farmer,
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
                <TableCell align="left" sx={{ fontWeight: 700, color: "green", border: 0.5, borderTopRightRadius: 8, width: 150, fontSize: 10, p: 1 }}>Agent's name</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: "green", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>Farmer</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: "green", border: 0.5, borderTopRightRadius: 8, width: 100, fontSize: 10, p: 1 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 0.5, borderColor: "green" }}>
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: "solid 1px green" } }}
              >
                <TableCell align="left" sx={{ fontSize: 10, p: 1 }}>
                  {userName ? userName : "-"}
                </TableCell>
                <TableCell align="left" sx={{ fontSize: 10, p: 1 }}>
                  {farmer ? farmer.name : "Farmer"}
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
                <TableCell align="left" sx={{ fontWeight: 700, color: "green", border: 0.5, borderTopRightRadius: 8, width: 150, fontSize: 10, p: 1 }}>Produit</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: "green", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>Containers</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: "green", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>Poids</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: "green", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>Prix</TableCell>
                <TableCell align="left" sx={{ fontWeight: 700, color: "green", border: 0.5, borderTopRightRadius: 8, width: 100, fontSize: 10, p: 1 }}>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ border: 0.5, borderColor: "greeb" }}>
              {(outs || []).map((item: any, index: any) => {
                return (
                  <TableRow
                    key={index}
                  >
                    <TableCell align="left" sx={{ border: 0.5, borderColor: "green", fontSize: 10, p: 1 }}>
                      {item.product_name ?? "product name"}
                    </TableCell>
                    <TableCell align="left" sx={{ border: 0.5, borderColor: "green", fontSize: 10, p: 1 }}>
                      {item.containers ?? "containers"}
                    </TableCell>
                    <TableCell align="left" sx={{ border: 0.5, borderColor: "green", fontSize: 10, p: 1 }}>
                      {item.poids ?? "poids"}
                    </TableCell>
                    <TableCell align="left" sx={{ border: 0.5, borderColor: "green", fontSize: 10, p: 1 }}>
                      {item.prix ?? "prix"}
                    </TableCell>
                    <TableCell align="left" sx={{ border: 0.5, borderColor: "green", fontSize: 10, p: 1 }}>
                      {item.total ?? "total"}
                    </TableCell>
                  </TableRow>
                )
              })}

            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <TableContainer component={Box}>
          <Table sx={{ width: "auto" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: 700, color: "green", border: 0.5, borderTopRightRadius: 8, width: 150, fontSize: 10, p: 1 }}>
                  Total
                </TableCell>
                <TableCell align="left" sx={{ color: "green", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>
                  <Typography color="gray" fontSize={10}>{totalContainers ?? "containers"}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ color: "green", border: 0.5, borderTopRightRadius: 8, width: 70, fontSize: 10, p: 1 }}>
                  <Typography color="gray" fontSize={10}>{totalPoids ?? "poids"}</Typography>
                </TableCell>
                <TableCell align="left" sx={{ width: 70 }}></TableCell>
                <TableCell align="left" sx={{ color: "green", border: 0.5, borderTopRightRadius: 8, width: 100, fontSize: 10, p: 1 }}>
                  <Typography color="gray" fontSize={10}>
                    {totalPrix ?? "prix"}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
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

export const ComponentToPrint: FC<{ componentRef?: React.MutableRefObject<null>, outs?: any, farmer?: any }> = ({ componentRef, outs, farmer }) => {
  var totalContainers = (outs || []).reduce(function (acc: any, obj: any) { return acc + obj.containers; }, 0);
  var totalPoids = (outs || []).reduce(function (acc: any, obj: any) { return acc + obj.poids; }, 0);
  var totalPrix = (outs || []).reduce(function (acc: any, obj: any) { return acc + obj.total; }, 0);
  // var totalPoids = outs.reduce(function (acc: any, obj: any) { return acc + obj.poids; }, 0);
  // const p = outs.length > 0 ? {
  //  poids: totalPoids,
  //  containers: totalContainers,
  // } : null;
  // console.log({ p });

  console.log({
    totalPoids,
    totalPrix
  });

  return (
    <Box p={4} ref={componentRef} mt={0} sx={{ backgroundColor: "#1581153d", height: "2500px" }}>
      <Box>
        <Stack direction="row" alignItems="start">
          <FactureContent
            content="empty"
            title="outs"
            outs={outs}
            farmer={farmer}
            totalContainers={totalContainers}
            totalPoids={totalPoids}
            totalPrix={totalPrix}
          />
        </Stack>
      </Box>
    </Box>
  )
}
export const ComponentToPrintContainer: FC<{ outs: any, farmer: any, label: string }> = ({ outs, farmer, label }) => {
  console.log({ outs: outs });
  const date = new Date();
  console.log({ farmer });
  const new_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "    |     " + date.getHours() + ":" + date.getMinutes();

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      alert(`Facture for farmer [${farmer ? farmer.name : ""}] printed successfully`);
    },
    onPrintError: () => {
      alert("Verify your facture")
    },
    documentTitle: `facture_for_${farmer ? farmer.name : ""}_${new_date}`,
  });

  return (
    <Box>
      <Box sx={{ display: "none" }}>
        <ComponentToPrint componentRef={componentRef} outs={outs} farmer={farmer} />
      </Box>
      <Button startIcon={<Print />} sx={{ color: "green" }} onClick={() => { handlePrint() }}>
        {label}
      </Button>
    </Box>
  );
};