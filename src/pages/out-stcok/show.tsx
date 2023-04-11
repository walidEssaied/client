// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const OutStockShow: React.FC<IResourceComponentsProps> = () => {
//   return (
//     <MuiShowInferencer
//       fieldTransformer={(field: any) => {
//         if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
//           return false;
//         }

//         return field;
//       }}
//     />
//   );
// };

import { Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  DateField,
  NumberField,
  Show
} from "@refinedev/mui";

export const OutStockShow = () => {
  const { queryResult } = useShow(
    {
      meta: {
        populate: "*",
      }
    }
  );
  const { data, isLoading } = queryResult;

  const record = data?.data;
  console.log({ record });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Containers
        </Typography>
        <NumberField value={record?.containers ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Poids
        </Typography>
        <NumberField value={record?.poids ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} />
        <Typography variant="body1" fontWeight="bold">
          Prix Total
        </Typography>
        <NumberField value={record?.total ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Client
        </Typography>
        <Typography variant="body1">
          {record?.client.name}
        </Typography>
      </Stack>
      <Stack mt={2} spacing={2}>
      <Typography variant="body1" fontWeight="bold">
          Farmer
        </Typography>
        <Typography variant="body1">
          {record?.farmer.name}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Product
        </Typography>
        <Typography variant="body1">
          {record?.produit.name}
        </Typography>
        {/* {record && record!.details.map((item: any) => (
          <Stack p={2} direction="row" spacing={2} border={1} bgcolor="white">
            <Typography>
              <b>Product</b>
              {" "} {item.product}
            </Typography>
            <Typography>
              <b>Quantity</b>
              {" "} {item.quantityVendu}
            </Typography>
            <Typography>
              <b>Farmer</b>
              {" "} {item.farmer}
            </Typography>
            <Typography>
              <b>Prix</b>
              {" "} {item.prix}
            </Typography>
          </Stack>
        ))} */}
      </Stack>
    </Show>
  );
};
