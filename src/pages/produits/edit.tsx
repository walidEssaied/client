import { IResourceComponentsProps } from "@refinedev/core";
import { MuiEditInferencer } from "@refinedev/inferencer/mui";

export const ProduitEdit: React.FC<IResourceComponentsProps> = () => {
  return (
    <MuiEditInferencer
      fieldTransformer={(field: any) => {
        if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
          return false;
        }

        return field;
      }}
    />
  );
};
