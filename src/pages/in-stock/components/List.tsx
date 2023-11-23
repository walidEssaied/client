import React from "react";

import {
    useRefineContext,
    useResource,
    useRouterType,
    useTranslate,
    userFriendlyResourceName,
} from "@refinedev/core";

import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { Breadcrumb, CreateButton, ListProps } from "@refinedev/mui";

/**
 * `<List>` provides us a layout for displaying the page.
 * It does not contain any logic but adds extra functionalities like a refresh button.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/mui/components/basic-views/list} for more details.
 */
export const List: React.FC<
  ListProps & { open: boolean; setOpen: (open: boolean) => void }
> = ({
  title,
  canCreate,
  children,
  createButtonProps,
  resource: resourceFromProps,
  breadcrumb: breadcrumbFromProps,
  wrapperProps,
  headerProps,
  contentProps,
  headerButtonProps,
  headerButtons,
  open,
  setOpen,
}) => {
  const translate = useTranslate();
  const { options: { breadcrumb: globalBreadcrumb } = {} } = useRefineContext();

  const routerType = useRouterType();

  const { resource } = useResource(resourceFromProps);

  const isCreateButtonVisible =
    canCreate ??
    ((resource?.canCreate ?? !!resource?.create) || createButtonProps);

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

  const defaultHeaderButtons = isCreateButtonVisible ? (
    <CreateButton
      resource={
        routerType === "legacy"
          ? resource?.route
          : resource?.identifier ?? resource?.name
      }
      {...createButtonProps}
      onClick={() => setOpen(true)}
    />
  ) : null;

  return (
    <Card {...(wrapperProps ?? {})}>
      {breadcrumbComponent}
      <CardHeader
        sx={{ display: "flex", flexWrap: "wrap" }}
        title={
          title ?? (
            <Typography variant="h5">
              {translate(
                `${resource?.name}.titles.list`,
                userFriendlyResourceName(
                  resource?.meta?.label ??
                    resource?.options?.label ??
                    resource?.label ??
                    resource?.name,
                  "plural"
                )
              )}
            </Typography>
          )
        }
        action={
          <Box display="flex" gap="16px" {...headerButtonProps}>
            {headerButtons
              ? typeof headerButtons === "function"
                ? headerButtons({
                    defaultButtons: defaultHeaderButtons,
                    createButtonProps: {},
                  })
                : headerButtons
              : defaultHeaderButtons}
          </Box>
        }
        {...(headerProps ?? {})}
      />
      <CardContent {...(contentProps ?? {})}>{children}</CardContent>
    </Card>
  );
};
