import { FormControl, FormLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useGetIdentity } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { FC, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { getFarmers } from "services/farmer";
import { CreateIn } from "services/in";

export const InStockCreate: FC<{ onClose?: () => void }> = ({ onClose }) => {
 const {
  saveButtonProps,
  refineCore: { formLoading },
  register,
  formState: { errors },
  watch,
  handleSubmit,
  setValue
 } = useForm();


 const { data, isLoading, isError } = useQuery({
  queryFn: getFarmers(),
  queryKey: "farmers",
  enabled: true,
  refetchOnWindowFocus: false,
 })

 const formValues = watch();
 console.log({ formValues });
 console.log({ data });

 const selectedFarmer: any = (!isError && !isLoading && data) && (data || []).filter((item: any) => item.id === formValues.farmer)[0]
 const products: [] = selectedFarmer !== undefined ? selectedFarmer?.produits : []

 const createOutMutation = useMutation((data) => CreateIn(data), {
  onSuccess: (data) => {
   if (onClose) {
    onClose();
   }
  }
 });

 const onSubmit = handleSubmit((data: any) => {
  createOutMutation.mutate(data);
 });
 const { data: user } = useGetIdentity<{ name: string, avatar: any, id: any }>();
 const userId = user && user.id;
 const product = formValues.product;
 useEffect(() => {
  if (product) {
   setValue("produit_name", product.name);
   setValue("produit", product.id);
  }
 }, [product])

 console.log({ product });

 return (
  <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
   <form id="create-out-order" onSubmit={onSubmit}>
    <Stack>
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
     <TextField
      {...register("containers", {
       required: "This field is required",
       valueAsNumber: true,
      })}
      error={!!(errors as any)?.containers}
      helperText={(errors as any)?.containers?.message}
      margin="normal"
      fullWidth
      InputLabelProps={{ shrink: true }}
      type="number"
      label="Containers"
      name="containers"
     />
     <FormControl>
      <FormLabel>Farmer</FormLabel>
      <Select label="Farmer" {...register("farmer")}>
       {isLoading && (
        <MenuItem value="">Loading farmers...</MenuItem>
       )}
       {isError && (
        <MenuItem value="">Error while getting farmers...</MenuItem>
       )}
       {(data || []).map((item: any, index: number) => (
        <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
       ))}
      </Select>
     </FormControl>
     {(selectedFarmer && products) && (
      <FormControl>
       <FormLabel>Product related</FormLabel>
       <Select label="Product related" {...register("product")}>
        {(products || []).map((item: any, index: number) => (
         <MenuItem value={item} key={index}>{item.name}</MenuItem>
        ))}
       </Select>
      </FormControl>
     )}
    </Stack>
   </form>
  </Create>
 );
};

