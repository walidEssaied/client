import { Edit, useAutocomplete } from "@refinedev/mui";
import { Box, TextField, Autocomplete } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

export const FarmerEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm();

  const farmersData = queryResult?.data?.data;

  const { autocompleteProps: produitsAutocompleteProps } = useAutocomplete({
    resource: "produits",
    defaultValue: farmersData?.produits,
  });

  const { autocompleteProps: insAutocompleteProps } = useAutocomplete({
    resource: "ins",
    defaultValue: farmersData?.ins,
  });

  const { autocompleteProps: outsAutocompleteProps } = useAutocomplete({
    resource: "outs",
    defaultValue: farmersData?.outs,
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
        <TextField
          {...register("phone", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.phone}
          helperText={(errors as any)?.phone?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Phone"
          name="phone"
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
        {/* <Controller
          control={control}
          name="produits"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={[] as any}
          render={({ field }) => (
            <Autocomplete
              {...produitsAutocompleteProps}
              {...field}
              multiple
              onChange={(_, value) => {
                field.onChange(
                  value?.map((item: any) => item?.id ?? item),
                );
              }}
              getOptionLabel={(item) => {
                return (
                  produitsAutocompleteProps?.options?.find(
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
                  label="Produits"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.produits}
                  helperText={
                    (errors as any)?.produits?.message
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
        <TextField
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
        />
      </Box>
    </Edit>
  );
};
