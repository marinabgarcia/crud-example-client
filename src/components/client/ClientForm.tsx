import {Client} from "@/domain/entities";
import {
    Avatar,
    Card,
    CardHeader,
    CircularProgress,
    Grid,
    TextField,
} from "@mui/material";
import Autocomplete, {createFilterOptions} from "@mui/material/Autocomplete";
import React, {SyntheticEvent, useEffect, useRef} from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import {IError} from "./model/useClientModel";

const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: Client) => option.company_name,
});

interface ClientFormProps {
    disabled: boolean;
    active: Partial<Client> | null;
    handleChangeClient: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setActive: (client: Partial<Client>) => void;
    isSaving: boolean;
    clients: Client[];
    getAll: () => void;
    handleValidateClient: () => void;
    isValidating: boolean;
    error: IError[];
}

export default function ClientForm(props: ClientFormProps) {
    const {
        disabled,
        active,
        handleChangeClient,
        setActive,
        isSaving,
        clients,
        getAll,
        handleValidateClient,
        isValidating,
        error,
    } = props;
    const [desClient, setDesClient] = React.useState("");
    const timer = useRef<null | number>(null);

    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            if (!isSaving && !error) {
                setDesClient("");
            }
        }
    }, [isSaving]);

    const handleSelectClient = (
        e: SyntheticEvent,
        value: Partial<Client> | null,
        reason: string
    ) => {
        let inputDescription = "";
        if (value && value._id && value.company_name) {
            inputDescription = value.company_name;
            setActive(value);
        } else if (
            value &&
            value.company_name &&
            value.company_name.indexOf("Add") !== -1
        ) {
            inputDescription = "New client";
            setActive({
                company_name: value.company_name
                    .replaceAll('"', "")
                    .replaceAll("Add new client ", ""),
                fiscal_id: "",
                client_id: 0,
                receipts: [],
                _id: "",
                isValid: false,
            });
        } else if (reason === "clear") {
            inputDescription = "";
            setActive({});
        }
        setDesClient(inputDescription);
    };

    function handleChangeClientInput(
        e: SyntheticEvent,
        value: string,
        reason: string
    ) {
        if (value && reason === "input" && value.length > 2) {
            clearTimeout(timer.current as number);
            timer.current = window.setTimeout(
                () => triggerChangeClient(value),
                300
            );
        }
        setDesClient(value);
    }

    const triggerChangeClient = (searchPhase: string) => {
        //TODO: search with a search phase to limit the results
        getAll();
    };

    return (
        <Grid item md={12} sm={12} xs={12} style={{marginBottom: "15px"}}>
            <Autocomplete
                value={active?.company_name ? active : null}
                isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                }
                onChange={(event, newValue, reason) => {
                    handleSelectClient(event, newValue, reason);
                }}
                filterOptions={(options, params) => {
                    if (params.inputValue !== "") {
                        const filtered = filterOptions(clients, params);

                        // Suggest the creation of a new value
                        if (params && params.inputValue !== "") {
                            filtered.push({
                                company_name: `Add new client "${params.inputValue}"`,
                                fiscal_id: "",
                                client_id: 0,
                                receipts: [],
                                _id: "",
                                isValid: false,
                            });
                        }

                        return filtered;
                    } else return [];
                }}
                noOptionsText={"Type for search"}
                loadingText={"Searching..."}
                selectOnFocus
                handleHomeEndKeys
                id={"company_name"}
                options={clients}
                getOptionLabel={(option: any) => {
                    return option.company_name;
                }}
                disabled={false}
                renderOption={(props, option) => {
                    return (
                        /* @ts-ignore */
                        <Card
                            variant="outlined"
                            style={{width: "100%"}}
                            {...props}
                            key={option._id}
                        >
                            <CardHeader
                                avatar={
                                    <Avatar>
                                        <AddIcon />
                                    </Avatar>
                                }
                                title={option.company_name}
                                subheader={
                                    (option.client_id ? option.client_id : "") +
                                    (option.fiscal_id
                                        ? " - Fiscal id: " + option.fiscal_id
                                        : "")
                                }
                            />
                        </Card>
                    );
                }}
                fullWidth={false}
                style={{width: "100%"}}
                loading={isSaving}
                onInputChange={handleChangeClientInput}
                inputValue={desClient ? desClient : ""}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={"Search client by company name *"}
                        margin={"normal"}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isSaving ? (
                                        <CircularProgress
                                            color="primary"
                                            size={20}
                                        />
                                    ) : null}

                                    {params.InputProps.endAdornment}
                                </>
                            ),

                            autoComplete: "off",
                        }}
                    />
                )}
            />
            {(active?._id !== undefined ||
                desClient?.indexOf("Add") !== -1) && (
                <>
                    <TextField
                        id="company_name"
                        placeholder="Company name"
                        variant="outlined"
                        margin={"normal"}
                        label={"Company name *"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        InputProps={{
                            disabled: disabled,
                            type: "text",
                        }}
                        disabled={disabled}
                        fullWidth
                        value={
                            active && active.company_name
                                ? active.company_name
                                : ""
                        }
                        onChange={handleChangeClient}
                    />
                    <TextField
                        id="fiscal_id"
                        placeholder="Fiscal id"
                        variant="outlined"
                        label={"Fiscal id *"}
                        margin={"normal"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            disabled: disabled,
                            type: "text",
                            endAdornment: (
                                <>
                                    {isValidating ? (
                                        <CircularProgress
                                            color="primary"
                                            size={20}
                                        />
                                    ) : active.isValid ? (
                                        <CheckIcon />
                                    ) : (
                                        <CancelIcon />
                                    )}
                                </>
                            ),
                        }}
                        required
                        disabled={disabled}
                        fullWidth
                        value={
                            active && active.fiscal_id ? active.fiscal_id : ""
                        }
                        onChange={handleChangeClient}
                        onBlur={handleValidateClient}
                    />
                    <TextField
                        id="client_id"
                        placeholder="Client id"
                        variant="outlined"
                        label={"Client id *"}
                        margin={"normal"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        InputProps={{
                            disabled: disabled,
                            type: "number",
                        }}
                        disabled={disabled}
                        fullWidth
                        value={
                            active && active.client_id ? active.client_id : ""
                        }
                        onChange={handleChangeClient}
                    />
                </>
            )}
        </Grid>
    );
}
