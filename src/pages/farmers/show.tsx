import { IResourceComponentsProps } from "@refinedev/core";
import { MuiShowInferencer } from "@refinedev/inferencer/mui";

export const FarmerShow: React.FC<IResourceComponentsProps> = () => {
  return (
    <MuiShowInferencer
      fieldTransformer={(field: any) => {
        if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
          return false;
        }

        return field;
      }}
    />
  );
};
