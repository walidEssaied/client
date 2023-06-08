import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  DateField,
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export const InStockShow = () => {
  const { queryResult } = useShow({
    meta: {
      populate: "*",
    }
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} />
        <Typography variant="body1" fontWeight="bold">
          Containers
        </Typography>
        <NumberField value={record?.containers ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Prix Vente
        </Typography>
        <NumberField value={record?.prix_vente ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Qte Vendu
        </Typography>
        <NumberField value={record?.qte_vendu ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Qte Restant
        </Typography>
        <NumberField value={record?.qte_restant ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Description
        </Typography>
        <TextField value={record?.description} />
        <Typography variant="body1" fontWeight="bold">
          Qte Total
        </Typography>
        <NumberField value={record?.qte_total ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Prix Achat
        </Typography>
        <NumberField value={record?.prix_achat ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Farmer
        </Typography>
        {record && record.farmer?.name ? (
          <TextField value={record?.farmer.name} />
        ) : (
          <Typography variant="body1" fontWeight="semibold" color="GrayText">No farmer is set for this product</Typography>
        )}
        <Typography variant="body1" fontWeight="bold">
          Product
        </Typography>
        {record && record.produit?.name ? (
          <TextField value={record?.produit.name} />
        ) : (
          <Typography variant="body1" fontWeight="semibold" color="GrayText">No farmer is set for this in stock order</Typography>
        )}
      </Stack>
      <Stack mt={2} spacing={2}>
        <Typography variant="body1" fontWeight="bold">
          Orders on this in
        </Typography>
        {record && record!.outs.map((item: any) => (
          <Stack p={2} direction="row" spacing={2} border={1} bgcolor="white">
            <Typography>
              <b>Description</b>
              {" "} {item.description}
            </Typography>
            <Typography>
              <b>Prix</b>
              {" "} {item.prix_total}
            </Typography>
            <Typography>
              <b>Poids</b>
              {" "} {item.poids}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Show>
  );
};
