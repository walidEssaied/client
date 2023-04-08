import { IResourceComponentsProps } from "@refinedev/core";
import { MuiListInferencer } from "@refinedev/inferencer/mui";

export const InStockList: React.FC<IResourceComponentsProps> = () => {
  return (
    <MuiListInferencer
      fieldTransformer={(field: any) => {
        if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
          return false;
        }

        return field;
      }}
    />
  );
};
