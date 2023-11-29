"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography/Typography";
import {
    Box,
    Breadcrumbs,
    Collapse,
    Divider,
    List,
    ListItem,
    ListItemText,
    Skeleton,
    Switch,
} from "@mui/material";
import Link from "next/link";
import theme from "@/app/theme";
import useClientModel from "./model/useClientModel";
import ReceiptListItem from "../receipt/ReceiptListItem";
import {Client, Receipt} from "@/domain/entities";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ClientList() {
    const {
        getAll,
        clients,
        active,
        updateReceiptActiveClient,
        changeActiveClient,
        update,
        _resetActive,
        isSaving,
        isFetching,
    } = useClientModel();

    React.useEffect(() => {
        getAll();
    }, []);

    React.useEffect(() => {
        if (active?._id) {
            update();
        }
    }, [active._id]);

    React.useEffect(() => {
        if (active?._id && !isSaving) {
            _resetActive();
        }
    }, [isSaving]);

    const handleChangeApproved = (
        e: React.ChangeEvent<HTMLInputElement>,
        receipt: Receipt,
        client: Client
    ) => {
        changeActiveClient(client);
        updateReceiptActiveClient({
            ...receipt,
            ...{isApproved: e.target.checked},
        });
    };

    let Clients;
    if (isFetching) {
        Clients = Array.from({length: 5}, (_, i) => i.toString()).map((i) => {
            return <Skeleton key={i} variant="text" sx={{fontSize: "2rem"}} />;
        });
    } else {
        Clients = clients.map((client) => {
            let Receipts = client.receipts?.map((receipt, i) => {
                return (
                    <ReceiptListItem
                        key={receipt._id || i}
                        receipt={receipt}
                        action={
                            <Switch
                                checked={receipt.isApproved}
                                onChange={(e) => {
                                    handleChangeApproved(e, receipt, client);
                                }}
                                disabled={isSaving}
                            />
                        }
                    />
                );
            });
            return (
                <React.Fragment key={client._id}>
                    <ListItem>
                        <ListItemText
                            primary={"Company name: " + client.company_name}
                            secondaryTypographyProps={{component: "div"}}
                            secondary={
                                <Box
                                    display={"flex"}
                                    justifyContent={"flex-start"}
                                    alignItems={"center"}
                                >
                                    <Typography component={"div"}>
                                        {`${
                                            client.client_id
                                                ? "Client id: " +
                                                  client.client_id?.toString()
                                                : ""
                                        }
                                    ${
                                        client.fiscal_id
                                            ? "Fiscal id: " +
                                              client.fiscal_id?.toString()
                                            : ""
                                    }
                                    `}
                                    </Typography>
                                    {client.isValid ? (
                                        <CheckIcon />
                                    ) : (
                                        <CancelIcon />
                                    )}
                                </Box>
                            }
                        />
                    </ListItem>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {Receipts}
                        </List>
                    </Collapse>
                    <Divider />
                </React.Fragment>
            );
        });
    }

    if (Clients.length === 0)
        Clients.push(
            <Box key={0} display="flex" justifyContent={"center"}>
                <Typography variant="body2">No clients found</Typography>
            </Box>
        );

    return (
        <Container maxWidth="md">
            <Breadcrumbs aria-label="breadcrumb" separator={"‣"}>
                <Link color="inherit" href="/">
                    Home
                </Link>
            </Breadcrumbs>
            <Typography component={"h1"} variant={"h1"}>
                Clients
            </Typography>
            <Paper
                elevation={3}
                sx={{
                    marginTop: "25px",
                    boxShadow: theme.shadows[2],
                    minHeight: "200px",
                }}
            >
                <List
                    sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                    }}
                    component="nav"
                >
                    {Clients}
                </List>
            </Paper>
        </Container>
    );
}
