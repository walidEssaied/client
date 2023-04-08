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

import { DeleteOutline, Done } from "@mui/icons-material";
import { Box, Button, FormControl, FormLabel, IconButton, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "@refinedev/react-hook-form";
import { useFieldArray } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { getClients } from "services/client";
import { getIns, updateIn } from "services/in";
import { CreateOut } from "services/out";
import { Create } from "./components/CreatePage";

export const OutStockCreate = () => {


  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
    watch,
    handleSubmit
  } = useForm();

  const { data, isLoading, isError } = useQuery({
    queryFn: getIns(),
    queryKey: "ins",
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const { data: dataClient, isLoading: isLoadingClient, isError: isErrorClient } = useQuery({
    queryFn: getClients(),
    queryKey: "clients",
    enabled: true,
    refetchOnWindowFocus: false,
  })

  const formValues = watch();
  console.log({ formValues });
  // console.log({ data });

  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "in"
    }
  )



  const updateProductByIdMutation = useMutation((data: any) => updateIn(data), {
    onSuccess: (response) => {
      alert("Product updated successfully");
      console.log({ response });
      queryClient.refetchQueries("ins")
    },
    onError: (error) => {
      console.log(error)
    },
  });
  var productsUpdates: Array<any> = [];
  const updateProductById = (data: any) => {
    console.log({ dataProduct: data });
    const productName = data.attributes.produit.data.attributes.name;
    const product = formValues.in.filter((item: any) => item.attributes.produit.data.attributes.name === productName)[0];
    const qteVendu: number = product.qte_vendu;
    const oldQteVendu: number = product.attributes.qte_vendu;
    const newQteVendu: number = Number(qteVendu) + Number(oldQteVendu);
    const newQteRestant: number = Number(product.attributes.qte_restant) - Number(qteVendu);
    console.log({ newQteRestant });
    console.log({ newQteVendu });
    const procedToUpdate = product.attributes.qte_total === Number(newQteRestant) + Number(newQteVendu);
    if (procedToUpdate) {

      const updatedQteVenduAndRestant = {
        itemId: data.id,
        id: product.id,
        attributes: {
          qte_vendu: newQteVendu,
          qte_restant: newQteRestant
        }
      }
      console.log({ updatedQteVenduAndRestant });
      updateProductByIdMutation.mutate(updatedQteVenduAndRestant)
      // remove(data.id)
    } else {
      alert("Please verify your stcok");
    }
  }

  const createOutMutation = useMutation((data) => CreateOut(data), {
    onSuccess: (data) => {
      navigate("/outs");
      // console.log({ data });
    }
  });

  const onSubmit = handleSubmit((data) => {
    const products = data.in.map((item: any) => {
      return ({ product: item.attributes.produit.data.attributes.name, farmer: item.attributes.farmer.data.attributes.name, quantityVendu: item.qte_vendu, prix: Number(item.attributes.prix_vente) * Number(item.qte_vendu) })
    });
    const d: any = { ...data, ins: data.in.map((item: any) => item.id), details: products };
    createOutMutation.mutate(d);
  });


  return (
    <Create isLoading={formLoading}>
      <form id="create-out-order" onSubmit={onSubmit}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column" }}
          autoComplete="off"
        >
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
            {...register("description", {
              required: "This field is required",
            })}
            error={!!(errors as any)?.description}
            helperText={(errors as any)?.description?.message}
            margin="normal"
            fullWidth
            InputLabelProps={{ shrink: true }}
            type="text"
            label="Description"
            name="description"
          />


        </Box>
        <Stack>
          <FormControl>
            <FormLabel>Client</FormLabel>
            <Select label="Client" {...register("client")}>
              {isLoadingClient && (
                <MenuItem value="">Loading client...</MenuItem>
              )}
              {isErrorClient && (
                <MenuItem value="">Error while getting client...</MenuItem>
              )}
              {(dataClient || []).map((item: any, index: number) => (
                <MenuItem value={item.id} key={index}>{item.attributes.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>In orders</FormLabel>
            <Select label="In orders" onChange={(e) => {
              append(e.target.value);
            }
            }>
              {isLoading && (
                <MenuItem value="">Loading in orders...</MenuItem>
              )}
              {isError && (
                <MenuItem value="">Error while getting in orders...</MenuItem>
              )}
              {(data || []).map((item: any, index: number) => (
                <MenuItem value={item} key={index}>{item.attributes.produit.data.attributes.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={() => navigate("/clients/create")}>Add Client</Button>
          <Stack direction="row" spacing={5} mt={2}>
            <Stack mt={1} p={1} bgcolor="" spacing={2} width="60%" alignItems="start">
              {fields.map((item: any, index) => {
                console.log({ item })
                // if ([...productUpdated].includes(item.id)) {
                //   return "Item updated";
                // }
                return (
                  <Stack key={index} direction="row" justifyContent="space-between" width="100%" spacing={2} p={2} border={1} alignItems="center">
                    {
                      productsUpdates.includes(item.id) ? "Item updated" : (
                        <>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Typography sx={{ width: "50%" }}>
                              <b>Produit</b> {item.attributes.produit.data.attributes.name}
                            </Typography>
                            <Typography sx={{ width: "50%" }}>
                              <b>Farmer</b> {item.attributes.farmer.data.attributes.name}
                            </Typography>
                            <Typography sx={{ width: "50%" }}>
                              <b>Prix vente</b> {item.attributes.prix_vente} (DT)
                            </Typography>
                            <Typography sx={{ width: "50%" }}>
                              <b>Quantity restant</b> {item.attributes.qte_restant} (KG)
                            </Typography>
                            <TextField sx={{ width: "50%" }}
                              {...register(`in.${index}.qte_vendu`, {
                                required: "This field is required",
                                valueAsNumber: true,
                              })}
                              error={Number(formValues.in[index].qte_vendu) > Number(item.attributes.qte_restant)}
                              helperText={(errors as any)?.qte_vendu?.message || Number(formValues.in[index].qte_vendu) > Number(item.attributes.qte_restant) ? "Verify quantity, quantity must be in stock" : ""}
                              margin="normal"
                              // fullWidth
                              InputLabelProps={{ shrink: true }}
                              type="number"
                              label="Quantity to sell"
                              defaultValue={0}
                              name={`in.${index}.qte_vendu`}
                            />

                            {/* <TextField sx={{ width: "50%" }}
                    {...register(`${index}.prix_total`, {
                      required: "This field is required",
                      valueAsNumber: true,
                    })}
                    error={Number(formValues.in[index].prix_total) > Number(item.attributes.qte_restant)}
                    helperText={(errors as any)?.prix_total?.message}
                    margin="normal"
                    // fullWidth
                    InputLabelProps={{ shrink: true }}
                    type="number"
                    label="Prix Total"
                    name="prix_total"
                  /> */}
                          </Stack>
                          <Stack direction="row" spacing={2}>
                            <Typography sx={{ width: "50%" }}>
                              <b>Total</b> {(Number(item.attributes.prix_vente) * Number(item.qte_vendu)) ? Number(item.attributes.prix_vente) * Number(item.qte_vendu) : "Processing"} (DT)
                            </Typography>
                            <Box>
                              <IconButton>
                                <Done onClick={() => { updateProductById(item) }} sx={{ color: "green", mr: 5 }} />
                              </IconButton>
                            </Box>
                            <DeleteOutline onClick={() => { remove(item.id) }} sx={{ color: "red" }} />
                          </Stack></>
                      )
                    }

                  </Stack>
                )
              })}
            </Stack>
            <Stack width="40%">
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
                {...register("amount_paid", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
                error={!!(errors as any)?.amount_paid}
                helperText={(errors as any)?.amount_paid?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="number"
                label="Amount Paid"
                name="amount_paid"
              />
              <TextField
                {...register("amount_remaining", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
                error={!!(errors as any)?.amount_remaining}
                helperText={(errors as any)?.amount_remaining?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="number"
                label="Amount Remaining"
                name="amount_remaining"
              />
              <TextField
                {...register("prix_total", {
                  required: "This field is required",
                  valueAsNumber: true,
                })}
                error={!!(errors as any)?.prix_total}
                helperText={(errors as any)?.prix_total?.message}
                margin="normal"
                fullWidth
                InputLabelProps={{ shrink: true }}
                type="number"
                label="Prix Total"
                name="prix_total"
              />
            </Stack>

          </Stack>
        </Stack>

        <Button type="submit">Save</Button>
        <Button>Cancel</Button>
      </form>
    </Create >
  );
};
