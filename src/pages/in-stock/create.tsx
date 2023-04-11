// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

// export const InStockCreate: React.FC<IResourceComponentsProps> = () => {
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
// import { Box, FormControl, FormLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
// import { Create } from "@refinedev/mui";
// import { useForm } from "@refinedev/react-hook-form";
// import { useQuery } from "react-query";
// import { getFarmers } from "services/farmer";

// export const InStockCreate = () => {
//   const {
//     saveButtonProps,
//     refineCore: { formLoading },
//     register,
//     control,
//     formState: { errors },
//     watch,
//   } = useForm();


//   const { data, isLoading, isError } = useQuery({
//     queryFn: getFarmers(),
//     queryKey: "farmers",
//     enabled: true,
//     refetchOnWindowFocus: false,
//   })

//   const formValues = watch();
//   console.log({ formValues });
//   console.log({ data });

//   const selectedFarmer: any = (!isError && !isLoading && data) && (data || []).filter((item: any) => item.id === formValues.farmer)[0]
//   console.log({ selectedFarmer })
//   const products: [] = selectedFarmer !== undefined ? selectedFarmer?.attributes?.produits.data : []
//   console.log({ products });

//   return (
//     <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
//       <Box
//         component="form"
//         sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
//         autoComplete="off"
//       >
//         <TextField
//           {...register("poids", {
//             required: "This field is required",
//             valueAsNumber: true,
//           })}
//           error={!!(errors as any)?.poids}
//           helperText={(errors as any)?.poids?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="number"
//           label="Poids"
//           name="poids"
//         />
//         <TextField
//           {...register("prix_kg", {
//             required: "This field is required",
//             valueAsNumber: true,
//           })}
//           error={!!(errors as any)?.prix_kg}
//           helperText={(errors as any)?.prix_kg?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="number"
//           label="Prix Kg"
//           name="prix_kg"
//         />
//         <TextField
//           {...register("total", {
//             required: "This field is required",
//             valueAsNumber: true,
//           })}
//           error={!!(errors as any)?.total}
//           helperText={(errors as any)?.total?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="number"
//           label="Total"
//           name="total"
//         />
//         <TextField
//           {...register("containers", {
//             required: "This field is required",
//             valueAsNumber: true,
//           })}
//           error={!!(errors as any)?.containers}
//           helperText={(errors as any)?.containers?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="number"
//           label="Containers"
//           name="containers"
//         />
//         <TextField
//           {...register("prix_vente", {
//             required: "This field is required",
//             valueAsNumber: true,
//           })}
//           error={!!(errors as any)?.prix_vente}
//           helperText={(errors as any)?.prix_vente?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="number"
//           label="Prix Vente"
//           name="prix_vente"
//         />
//         <TextField
//           {...register("qte_vendu", {
//             required: "This field is required",
//             valueAsNumber: true,
//           })}
//           error={!!(errors as any)?.qte_vendu}
//           helperText={(errors as any)?.qte_vendu?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="number"
//           label="Qte Vendu"
//           name="qte_vendu"
//         />
//         <TextField
//           {...register("qte_restant", {
//             required: "This field is required",
//             valueAsNumber: true,
//           })}
//           error={!!(errors as any)?.qte_restant}
//           helperText={(errors as any)?.qte_restant?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="number"
//           label="Qte Restant"
//           name="qte_restant"
//         />
//         <TextField
//           {...register("description", {
//             required: "This field is required",
//           })}
//           error={!!(errors as any)?.description}
//           helperText={(errors as any)?.description?.message}
//           margin="normal"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//           type="text"
//           label="Description"
//           name="description"
//         />
//       </Box>
//       <Stack>
//         <FormControl>
//           <FormLabel>Farmer</FormLabel>
//           <Select label="Farmer" {...register("farmer")}>
//             {isLoading && (
//               <MenuItem value="">Loading farmers...</MenuItem>
//             )}
//             {isError && (
//               <MenuItem value="">Error while getting farmers...</MenuItem>
//             )}
//             {(data || []).map((item: any, index: number) => (
//               <MenuItem value={item.id} key={index}>{item.attributes.name}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         {(selectedFarmer && products) && (
//           <FormControl>
//             <FormLabel>Product related</FormLabel>
//             <Select label="Product related" {...register("produit")}>
//               {(products || []).map((item: any, index: number) => (
//                 <MenuItem value={item.id} key={index}>{item.attributes.name}</MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}
//       </Stack>
//     </Create>
//   );
// };

import { Box, FormControl, FormLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { Create } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { FC } from "react";
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
    handleSubmit
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
  const products: [] = selectedFarmer !== undefined ? selectedFarmer?.attributes?.produits.data : []

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

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <form id="create-out-order" onSubmit={onSubmit}>
        <Stack>
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
                <MenuItem value={item.id} key={index}>{item.attributes.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {(selectedFarmer && products) && (
            <FormControl>
              <FormLabel>Product related</FormLabel>
              <Select label="Product related" {...register("produit")}>
                {(products || []).map((item: any, index: number) => (
                  <MenuItem value={item.id} key={index}>{item.attributes.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Stack>
      </form>
    </Create>
  );
};

