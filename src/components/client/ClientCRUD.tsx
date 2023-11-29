"use client";
import {
    Container,
    Breadcrumbs,
    Typography,
    Grid,
    Box,
    Paper,
} from "@mui/material";
import Link from "next/link";
import {useRef, useEffect, SyntheticEvent} from "react";
import ReceiptListEmbedded from "../receipt/ReceiptListEmbedded";
import useClientModel from "./model/useClientModel";
import {Client} from "@/domain/entities";
import ClientForm from "./ClientForm";
import SaveButton from "../layout/SaveButton";

export default function CRUDClient() {
    const {
        active,
        changeActiveClient,
        isSaving,
        addReceiptActiveClient,
        create,
        update,
        setActive,
        clients,
        getAll,
        isValidating,
        validate,
        error,
        _resetActive,
    } = useClientModel();

    const mounted = useRef(false);

    const disabled = isSaving;

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (!isSaving && !error) {
                _resetActive();
            }
        }
    }, [isSaving]);

    //Client
    const handleChangeClient = (e: SyntheticEvent) => {
        let client = {} as Partial<Client>;
        let key = (e.target as HTMLTextAreaElement).id as keyof Client;
        if (key !== "receipts" && key !== "isValid")
            if (key !== "client_id")
                client[key] = (e.target as HTMLTextAreaElement).value;
            else client[key] = +(e.target as HTMLTextAreaElement).value;
        changeActiveClient(client);
    };

    const handleValidateClient = () => {
        validate();
    };

    //Submit
    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!active._id) create();
        else update();
    };

    return (
        <Container maxWidth="md">
            <Breadcrumbs aria-label="breadcrumb" separator={"‣"}>
                <Link color="inherit" href="/">
                    Home
                </Link>
                <Link color="inherit" href="/clients">
                    Clientes
                </Link>
            </Breadcrumbs>
            <Typography component={"h1"} variant={"h1"}>
                {active._id ? "Edit client" : "New client"}
            </Typography>

            <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Paper sx={{padding: "20px 30px", marginTop: "20px"}}>
                            <Typography variant={"overline"} component={"span"}>
                                Client data
                            </Typography>

                            <ClientForm
                                disabled={disabled}
                                active={active}
                                handleChangeClient={handleChangeClient}
                                handleValidateClient={handleValidateClient}
                                setActive={setActive}
                                isSaving={isSaving}
                                clients={clients}
                                getAll={getAll}
                                isValidating={isValidating}
                                error={error}
                            />
                        </Paper>
                    </Grid>
                    <Box position={"fixed"} bottom={"20px"} right={"20px"}>
                        <SaveButton
                            loading={isSaving}
                            disabled={disabled}
                            error={error}
                        />
                    </Box>
                </Grid>
            </form>
            <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                    <Paper sx={{padding: "20px 30px", marginTop: "20px"}}>
                        <Typography variant={"overline"} component={"span"}>
                            Receipts list
                        </Typography>

                        <Grid
                            item
                            md={12}
                            sm={12}
                            xs={12}
                            style={{marginBottom: "15px"}}
                        >
                            <ReceiptListEmbedded
                                addReceiptActiveClient={addReceiptActiveClient}
                                active={active}
                            />
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
