import { Button } from "@mui/material";
import {
    TitleProps,
    useLink,
    useRouterContext,
    useRouterType,
} from "@refinedev/core";
import React from "react";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    return (
        <Button fullWidth variant="text" disableRipple>
            <ActiveLink to="/">
                {collapsed ? (
                    <img
                        src="https://www.dolibarr.org/medias/image/www.dolibarr.org/images/dolibarr_logo_white.svg"
                        alt="QSDQSDQSd"
                        width="28px"
                        style={{ maxHeight: "38px" }}
                    />
                ) : (
                    <img
                        src="https://www.dolibarr.org/medias/image/www.dolibarr.org/images/dolibarr_logo_white.svg"
                        alt="DQSDQS"
                        width="140px"
                    />
                )}
            </ActiveLink>
        </Button>
    );
};
