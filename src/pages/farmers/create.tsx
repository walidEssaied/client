import { Box, FormControl, TextField } from "@mui/material";
import { useGetIdentity } from "@refinedev/core";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { FC } from "react";

export const FarmerCreate: FC<{ onClose?: () => void }> = ({ onClose }) => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    formState: { errors },
  } = useForm();

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
      </Box>
    </Create>
  );
};
