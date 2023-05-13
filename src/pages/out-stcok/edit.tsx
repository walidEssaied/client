// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiEditInferencer } from "@refinedev/inferencer/mui";

// export const OutStockEdit: React.FC<IResourceComponentsProps> = () => {
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

export const OutStockEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const outStockData = queryResult?.data?.data;

  const { autocompleteProps: clientAutocompleteProps } = useAutocomplete({
    resource: "clients",
    defaultValue: outStockData?.client,
  });

  const { autocompleteProps: insAutocompleteProps } = useAutocomplete({
    resource: "ins",
    defaultValue: outStockData?.ins,
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
          {...register("poids", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.poids}
          helperText={(errors as any)?.poids?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Poids"
          name="poids"
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
          {...register("prix", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.prix}
          helperText={(errors as any)?.prix?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Prix"
          name="prix"
        />
        <TextField
          {...register("total", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.total}
          helperText={(errors as any)?.total?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Total"
          name="total"
        />
        <TextField
          {...register("product_name", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.product_name}
          helperText={(errors as any)?.product_name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Product Name"
          name="product_name"
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
          name="client"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...clientAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) => {
                return (
                  clientAutocompleteProps?.options?.find(
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
                  label="Client"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.client}
                  helperText={
                    (errors as any)?.client?.message
                  }
                  required
                />
              )}
            />
          )}
        /> */}
        {/* <Controller
          control={control}
          name="ins"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={[] as any}
          render={({ field }) => (
            <Autocomplete
              {...insAutocompleteProps}
              {...field}
              multiple
              onChange={(_, value) => {
                field.onChange(
                  value?.map((item: any) => item?.id ?? item),
                );
              }}
              getOptionLabel={(item) => {
                return (
                  insAutocompleteProps?.options?.find(
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
                  label="Ins"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.ins}
                  helperText={(errors as any)?.ins?.message}
                  required
                />
              )}
            />
          )}
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
