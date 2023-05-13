// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

// export const OutStockCreate: React.FC<IResourceComponentsProps> = () => {
//   return (
//     <MuiCreateInferencer
//       fieldTransformer={(field: any) => {
//         if (["locale", "updatedAt", "publishedAt", "createdAt"].includes(field.key)) {
//           return false;
//         }

//         return field;
//       }}
//     />
//   );
// };

import { FormControl, FormLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useGetIdentity } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { FC, useEffect } from "react";
import { useQuery } from "react-query";
import { getFarmers } from "services/farmer";

export const OutStockCreate: FC<{ onClose?: () => void }> = ({ onClose }) => {
 const {
  saveButtonProps,
  register,
  formState: { errors },
  watch,
  setValue,
 } = useForm();

 const { data, isLoading, isError } = useQuery({
  queryFn: getFarmers(),
  queryKey: "farmers",
  enabled: true,
  refetchOnWindowFocus: false,
 })

 const formValues = watch();

 const selectedFarmer: any = (!isError && !isLoading && data) && (data || []).filter((item: any) => item.id === formValues.farmer)[0]
 const products: [] = selectedFarmer !== undefined ? selectedFarmer?.produits : []

 const prix = formValues.prix;
 const poids = formValues.poids;
 const produit = formValues.produitData;

 console.log({ formValues });

 useEffect(() => {
  const t = prix * poids;
  setValue("total", t)
  console.log({ produit });
  if (produit) {
   setValue("produit", produit.id);
   setValue("product_name", produit.name);
   setValue("product_id", produit.id);
   setValue("tag", produit.tag);
   console.log(produit.id)
   console.log(produit.name)
  }
 }, [prix, poids, produit])

 const { data: user } = useGetIdentity<{ name: string, avatar: any, id: any }>();
 const userId = user && user.id;

 return (
  <Create isLoading={isLoading} saveButtonProps={saveButtonProps}>
   <Stack direction="row" alignItems="start" columnGap={2}>
    <FormControl sx={{ mt: -1, width: 100 }}>
     <FormLabel sx={{ mb: -2 }}>Client</FormLabel>
     <TextField
      {...register("client", {
       required: "This field is required",
       onChange: (e) => {
        const t: number = Number(formValues.poids) * Number(formValues.client);
        console.log({ t });
        setValue("total", t)
       }
      })}
      error={!!(errors as any)?.client}
      helperText={(errors as any)?.client?.message}
      margin="normal"
      sx={{
       width: 100
      }}
      InputLabelProps={{ shrink: true }}
      type="text"
      name="client"
     />
    </FormControl>

    <FormControl sx={{ mt: -1, width: 200 }}>
     <FormLabel>Farmer</FormLabel>
     <Select label="Farmer" {...register("farmer")}>
      {isLoading && (
       <MenuItem value="">Loading in orders...</MenuItem>
      )}
      {isError && (
       <MenuItem value="">Error while getting in orders...</MenuItem>
      )}
      {(data || []).map((item: any, index: number) => (
       <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
      ))}
     </Select>
    </FormControl>

    {(selectedFarmer && products) && (
     <FormControl sx={{ mt: -1 }}>
      <FormLabel>Products</FormLabel>
      <Select label="Product related" {...register("produitData")}>
       {(products || []).map((item: any, index: number) => (
        <MenuItem value={item} key={index}>{item.name}</MenuItem>
       ))}
      </Select>
     </FormControl>
    )}

    <FormControl sx={{ mt: -1, width: 100 }}>
     <FormLabel sx={{ mb: -2 }}>Containers</FormLabel>
     <TextField
      {...register("containers", {
       required: "This field is required",
       valueAsNumber: true,
      })}
      error={!!(errors as any)?.containers}
      helperText={(errors as any)?.containers?.message}
      margin="normal"
      // fullWidth
      sx={{
       width: 100
      }}
      InputLabelProps={{ shrink: true }}
      type="number"
      name="containers"
     />
    </FormControl>

    <FormControl sx={{ mt: -1, display: "none" }}>
     <TextField
      type="hidden"
      {...register("user", {
       required: "This field is required",
      })}
      error={!!(errors as any)?.user}
      helperText={(errors as any)?.user?.message}
      margin="normal"
      value={userId}
      InputLabelProps={{ shrink: true }}
      name="user"
     />
    </FormControl>

    <FormControl sx={{ mt: -1, width: 100 }}>
     <FormLabel sx={{ mb: -2 }}>Poids</FormLabel>
     <TextField
      {...register("poids", {
       required: "This field is required",
       valueAsNumber: true,
      })}
      error={!!(errors as any)?.poids}
      helperText={(errors as any)?.poids?.message}
      margin="normal"
      // fullWidth
      sx={{
       width: 100
      }}
      InputLabelProps={{ shrink: true }}
      type="number"
      name="poids"
     />
    </FormControl>

    <FormControl sx={{ mt: -1, width: 100 }}>
     <FormLabel sx={{ mb: -2 }}>Prix</FormLabel>
     <TextField
      {...register("prix", {
       required: "This field is required",
       valueAsNumber: true,
       onChange: (e) => {
        const t: number = Number(formValues.poids) * Number(formValues.prix);
        console.log({ t });
        setValue("total", t)
       }
      })}
      defaultValue={0}
      error={!!(errors as any)?.prix}
      helperText={(errors as any)?.prix?.message}
      margin="normal"
      // fullWidth
      sx={{
       width: 100
      }}
      InputLabelProps={{ shrink: true }}
      type="number"
      name="prix"
     />
    </FormControl>

    <FormControl sx={{ mt: -1, width: 100 }}>
     <FormLabel sx={{ mb: -2 }}>Total</FormLabel>
     <TextField
      {...register("total", {
       required: "This field is required",
       valueAsNumber: true,
      })}
      error={!!(errors as any)?.total}
      helperText={(errors as any)?.total?.message}
      margin="normal"
      // fullWidth
      sx={{
       width: 100
      }}
      InputLabelProps={{ shrink: true }}
      type="number"
      name="total"
     />
    </FormControl>
   </Stack>
  </Create>
 );
};
