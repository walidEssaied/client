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
import { ComponentToPrintClientContainer } from "pages/farmers/components/PrintClientFacture";

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
          {/* {record?.client.name} */}
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
          {record?.product_name}
        </Typography>
        <Typography variant="body1" fontWeight="bold">
          Client
        </Typography>
        <Typography variant="body1">
          {record?.client}
        </Typography>
      </Stack>
      {record && (
        <ComponentToPrintClientContainer
          label="Facture"
          out={record}
        />
      )}
    </Show>
  );
};
