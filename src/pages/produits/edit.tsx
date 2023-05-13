// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const ProduitEdit: React.FC<IResourceComponentsProps> = () => {
//   return (
//     <MuiEditInferencer
//       fieldTransformer={(field: any) => {
//         if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
//           return false;
//         }

//         return field;
//       }}
//     />
//   );
// };



import { Autocomplete, Box, TextField } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const ProduitEdit = () => {
 const {
  saveButtonProps,
  refineCore: { queryResult },
  register,
  control,
  formState: { errors },
 } = useForm();

 const produitsData = queryResult?.data?.data;

 const { autocompleteProps: outAutocompleteProps } = useAutocomplete({
  resource: "outs",
  defaultValue: produitsData?.out,
 });

 return (
  <Edit saveButtonProps={saveButtonProps}>
   <Box
    component="form"
    sx={{ display: "flex", flexDirection: "column" }}
    autoComplete="off"
   >
    <TextField
     {...register("id", {
      required: "This field is required",
      valueAsNumber: true,
     })}
     error={!!(errors as any)?.id}
     helperText={(errors as any)?.id?.message}
     margin="normal"
     fullWidth
     InputLabelProps={{ shrink: true }}
     type="number"
     label="Id"
     name="id"
     disabled
    />
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
    {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
    <TextField
     {...register("createdAt", {
      required: "This field is required",
     })}
     error={!!(errors as any)?.createdAt}
     helperText={(errors as any)?.createdAt?.message}
     margin="normal"
     fullWidth
     InputLabelProps={{ shrink: true }}
     label="Created At"
     name="createdAt"
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
    {/* <Controller
     control={control}
     name="farmer"
     rules={{ required: "This field is required" }}
     // eslint-disable-next-line
     defaultValue={null as any}
     render={({ field }) => (
      <Autocomplete
       {...farmerAutocompleteProps}
       {...field}
       onChange={(_, value) => {
        field.onChange(value);
       }}
       getOptionLabel={(item) => {
        return (
         farmerAutocompleteProps?.options?.find(
          (p) =>
           p?.id?.toString() ===
           item?.name?.toString(),
         )?.name ?? ""
        );
       }}
       isOptionEqualToValue={(option, value) =>
        value === undefined ||
        option?.id?.toString() ===
        value?.name?.toString()
       }
       renderInput={(params) => (
        <TextField
         {...params}
         label="Farmer"
         margin="normal"
         variant="outlined"
         error={!!(errors as any)?.farmer?.name}
         helperText={
          (errors as any)?.farmer?.name?.message
         }
         required
        />
       )}
      />
     )}
    /> */}
    {/* <Controller
     control={control}
     name="out"
     rules={{ required: "This field is required" }}
     // eslint-disable-next-line
     defaultValue={null as any}
     render={({ field }) => (
      <Autocomplete
       {...outAutocompleteProps}
       {...field}
       onChange={(_, value) => {
        field.onChange(value?.id ?? value);
       }}
       getOptionLabel={(item) => {
        return (
         outAutocompleteProps?.options?.find(
          (p) =>
           p?.id?.toString() ===
           (item?.id ?? item)?.toString(),
         )?.name ?? ""
        );
       }}
       isOptionEqualToValue={(option, value) =>
        value === undefined ||
        option?.id?.toString() ===
        (value?.id ?? value)?.toString()
       }
       renderInput={(params) => (
        <TextField
         {...params}
         label="Out"
         margin="normal"
         variant="outlined"
         error={!!(errors as any)?.out}
         helperText={(errors as any)?.out?.message}
         required
        />
       )}
      />
     )}
    /> */}
    {/* <TextField
     {...register("user.username", {
      required: "This field is required",
     })}
     error={!!(errors as any)?.user?.username}
     helperText={(errors as any)?.user?.username?.message}
     margin="normal"
     fullWidth
     InputLabelProps={{ shrink: true }}
     type="text"
     label="User"
     name="user.username"
    /> */}
   </Box>
  </Edit>
 );
};

