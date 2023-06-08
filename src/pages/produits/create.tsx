import { Box, FormControl, FormLabel, MenuItem, Select, TextField } from "@mui/material";
import { useGetIdentity } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { FC } from "react";
import { useQuery } from "react-query";
import { getFarmers } from "services/farmer";

export const ProduitCreate: FC<{ onClose?: () => void }> = ({ onClose }) => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm();

  const { data, isLoading, isError } = useQuery({
    queryFn: getFarmers(),
    queryKey: "farmers",
    enabled: true,
    // refetchOnWindowFocus: false,
  })

  const { data: user } = useGetIdentity<{ name: string, avatar: any, id: any }>();
  const userId = user && user.id;

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
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
            {((data && data.length > 0 && data) || []).map((item: any, index: number) => (
              <MenuItem value={item.id} key={index}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Create>
  );
};
