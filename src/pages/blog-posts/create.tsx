import { IResourceComponentsProps } from "@refinedev/core";
import { MuiCreateInferencer } from "@refinedev/inferencer/mui";

export const BlogPostCreate: React.FC<IResourceComponentsProps> = () => {
  return (
    <MuiCreateInferencer
      fieldTransformer={(field: any) => {
        if (["locale", "updatedAt", "publishedAt"].includes(field.key)) {
          return false;
        }

        return field;
      }}
    />
  );
};
