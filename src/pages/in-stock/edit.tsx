// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const InStockEdit: React.FC<IResourceComponentsProps> = () => {
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
import { Box, TextField } from "@mui/material";
import { Edit, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";

export const InStockEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const inStockData = queryResult?.data?.data;

  const { autocompleteProps: outsAutocompleteProps } = useAutocomplete({
    resource: "outs",
    defaultValue: inStockData?.outs,
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
          {...register("produit_name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.produit_name}
          helperText={(errors as any)?.produit_name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Produit Name"
          name="produit_name"
        />
        {/* <Controller
          control={control}
          name="outs"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={[] as any}
          render={({ field }) => (
            <Autocomplete
              {...outsAutocompleteProps}
              {...field}
              multiple
              onChange={(_, value) => {
                field.onChange(
                  value?.map((item: any) => item?.id ?? item),
                );
              }}
              getOptionLabel={(item) => {
                return (
                  outsAutocompleteProps?.options?.find(
                    (p) =>
                      p?.id?.toString() ===
                      (item?.id ?? item)?.toString(),
                  )?.title ?? ""
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
                  label="Outs"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.outs}
                  helperText={(errors as any)?.outs?.message}
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
      </Box>
    </Edit>
  );
};

