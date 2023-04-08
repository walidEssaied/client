import React from "react";

import {
 useBack,
 useNavigation,
 useRefineContext,
 useResource,
 useRouterType,
 useTranslate,
 userFriendlyResourceName,
} from "@refinedev/core";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
 Box,
 Card,
 CardContent,
 CardHeader,
 IconButton,
 Typography
} from "@mui/material";
import { Breadcrumb, CreateProps, SaveButton } from "@refinedev/mui";


/**
 * `<Create>` provides us a layout to display the page.
 * It does not contain any logic but adds extra functionalities like action buttons and giving titles to the page.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/create} for more details.
 */
export const Create: React.FC<CreateProps> = ({
 title,
 children,
 saveButtonProps,
 resource: resourceFromProps,
 isLoading = false,
 breadcrumb: breadcrumbFromProps,
 wrapperProps,
 headerProps,
 contentProps,
 headerButtonProps,
 headerButtons,
 footerButtonProps,
 footerButtons,
 goBack: goBackFromProps,
}) => {
 const translate = useTranslate();
 const { options: { breadcrumb: globalBreadcrumb } = {} } =
  useRefineContext();

 const routerType = useRouterType();
 const back = useBack();
 const { goBack } = useNavigation();

 const { resource, action } = useResource(resourceFromProps);

 const breadcrumb =
  typeof breadcrumbFromProps === "undefined"
   ? globalBreadcrumb
   : breadcrumbFromProps;

 const breadcrumbComponent =
  typeof breadcrumb !== "undefined" ? (
   <>{breadcrumb}</> ?? undefined
  ) : (
   <Breadcrumb />
  );

 const defaultFooterButtons = (
  <SaveButton
   {...(isLoading ? { disabled: true } : {})}
   {...saveButtonProps}
  />
 );

 return (
  <Card {...(wrapperProps ?? {})}>
   {breadcrumbComponent}
   <CardHeader
    sx={{ display: "flex", flexWrap: "wrap" }}
    title={
     title ?? (
      <Typography variant="h5">
       {translate(
        `${resource?.name}.titles.create`,
        `Create ${userFriendlyResourceName(
         resource?.meta?.label ??
         resource?.options?.label ??
         resource?.label ??
         resource?.name,
         "singular",
        )}`,
       )}
      </Typography>
     )
    }
    avatar={
     typeof goBackFromProps !== "undefined" ? (
      goBackFromProps
     ) : (
      <IconButton
       onClick={
        action !== "list" ||
         typeof action !== "undefined"
         ? routerType === "legacy"
          ? goBack
          : back
         : undefined
       }
      >
       <ArrowBackIcon />
      </IconButton>
     )
    }
    action={
     headerButtons ? (
      <Box
       display="flex"
       gap="16px"
       {...(headerButtonProps ?? {})}
      >
       {headerButtons
        ? typeof headerButtons === "function"
         ? headerButtons({
          defaultButtons: null,
         })
         : headerButtons
        : null}
      </Box>
     ) : undefined
    }
    {...(headerProps ?? {})}
   />
   <CardContent {...(contentProps ?? {})}>{children}</CardContent>
  </Card>
 );
};
