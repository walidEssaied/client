// import { IResourceComponentsProps } from "@refinedev/core";
// import { MuiShowInferencer } from "@refinedev/inferencer/mui";

// export const FarmerShow: React.FC<IResourceComponentsProps> = () => {
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
import { Button, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useShow } from "@refinedev/core";
import {
  DateField,
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";
import { useState } from "react";
import { ComponentToPrintContainer } from "./components/Exemple";

export const FarmerShow = () => {
  const [product, setProduct] = useState<string | null>(null);
  const { queryResult } = useShow({
    meta: {
      populate: "*"
    }
  });
  const { data, isLoading } = queryResult;

  const record = data?.data;

  console.log({ record });

  const outs = record ? record.outs : []

  // const products = record && record.outs.filter((item: any, index: any) => item.productName === )

  const lookup = outs.reduce((a: any, e: any) => {
    a[e.product_name] = ++a[e.product_name] || 0;
    return a;
  }, {});

  console.log(outs.filter((e: any) => lookup[e.product_name]));
  const products = record ? record.produits : [];

  const sameProducts = record ? record?.outs?.filter((item: any, index: any) => item.tag === product) : []
  console.log({ sameProducts });
  var totalContainers = sameProducts.reduce(function (acc: any, obj: any) { return acc + obj.containers; }, 0);
  var totalPoids = sameProducts.reduce(function (acc: any, obj: any) { return acc + obj.poids; }, 0);
  const p = sameProducts.length > 0 ? {
    product_name: sameProducts ? sameProducts[0]?.tag : "Product name",
    poids: totalPoids,
    containers: totalContainers,
  } : null;
  console.log({ p });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Name
        </Typography>
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          Phone
        </Typography>
        <NumberField value={record?.phone ?? ""} />
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.createdAt} />
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight="bold">Outs</Typography>
          <Typography variant="body1" fontWeight="bold">Select per product</Typography>
          <Select onChange={(e) => setProduct(String(e.target.value))}>
            {products.map((item: any) => {
              return (
                <MenuItem value={item.tag}>{item.name}</MenuItem>
              )
            })}
          </Select>
          <Button onClick={() => setProduct(null)}>All order</Button>
          {(sameProducts && p !== null) &&
            <Stack sx={{ p: 1, backgroundColor: "#639463", color: "white" }} direction="row" spacing={2} justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography>
                  <b>
                    Product: {" "}
                  </b>
                  {p.product_name ?? "No product name"}
                </Typography>
                <Typography>
                  <b>
                    poids total (KG): {" "}
                  </b>
                  {p.poids}
                </Typography>
                <Typography>
                  <b>
                    Containers: {" "}
                  </b>
                  {p.containers}
                </Typography>
              </Stack>
              <ComponentToPrintContainer
                farmer={record ? record : null}
                out={p}
              />
            </Stack>
          }
          {!product && (record?.outs || []).map((item: any) => (
            <Stack sx={{ p: 1, backgroundColor: "#639463", color: "white" }} direction="row" spacing={2} justifyContent="space-between">
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography>
                  <b>
                    Product: {" "}
                  </b>
                  {item.product_name ?? "No product name"}
                </Typography>
                <Typography>
                  <b>
                    poids total: {" "}
                  </b>
                  {item.poids}
                </Typography>
                <Typography>
                  <b>
                    Containers: {" "}
                  </b>
                  {item.containers}
                </Typography>
              </Stack>
              <ComponentToPrintContainer
                farmer={record ? record : null}
                out={item}
              />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Show>
  );
};
