import { Box, FormControl, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useQuery } from "react-query";
import { getFarmers } from "services/farmer";

export const ProduitCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
    watch,
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
  console.log({ selectedFarmer })
  const products: [] = selectedFarmer !== undefined ? selectedFarmer?.attributes?.produits.data : []
  console.log({ products });
  console.log(data);

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
        />
        <TextField
          {...register("tag", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.tag}
          helperText={(errors as any)?.tag?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Tag"
          name="tag"
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
              <MenuItem value={item.id} key={index}>{item.attributes.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Create>
  );
};
