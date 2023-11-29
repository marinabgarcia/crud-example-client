import theme from "@/app/theme";
import {Tooltip, Fab, CircularProgress, Snackbar} from "@mui/material";
import React, {useRef, useEffect, memo} from "react";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import {IError} from "../client/model/useClientModel";

interface SaveButtonProps {
    loading: boolean;
    error: Array<IError>;
    disabled?: boolean;
}

//TODO separate in two components
const SaveButton = memo(function SaveButton(props: SaveButtonProps) {
    // const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);
    const isInitialMount = useRef(true);
    const isInitialMount2 = useRef(true);

    const {loading, error, disabled} = props;

    useEffect(() => {
        //TODO findout why is rendering two times
        if (isInitialMount.current) isInitialMount.current = false;
        else if (isInitialMount2.current) isInitialMount2.current = false;
        else if (!loading) {
            if (!!error && error.length > 0) setErrorOpen(true);
            else {
                setSuccess(true);
                const timer = setTimeout(() => {
                    setSuccess(false);
                }, 5000);
                return () => clearTimeout(timer);
            }
        }
    }, [loading]);

    return (
        <div>
            <Tooltip title="Guardar" aria-label="Guardar">
                <Fab
                    type="submit"
                    color="primary"
                    aria-label="edit"
                    sx={{
                        margin: theme.spacing(1),
                        color: "white",
                    }}
                    disabled={loading || disabled}
                >
                    {success ? <CheckIcon /> : <SaveIcon />}
                </Fab>
            </Tooltip>
            {loading && (
                <CircularProgress
                    size={68}
                    color="secondary"
                    sx={{
                        margin: theme.spacing(1),
                        position: "absolute",
                        top: -6,
                        left: -6,
                        zIndex: 1,
                    }}
                />
            )}

            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                open={success}
                //onClose={handleClose}
                ContentProps={{
                    "aria-describedby": "message-id",
                }}
                message={<span id="message-id">Se guardaron los cambios</span>}
            ></Snackbar>
            {error && (
                <Snackbar
                    anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                    open={errorOpen}
                    onClose={() => setErrorOpen(false)}
                    ContentProps={{
                        "aria-describedby": "message-id",
                    }}
                    message={
                        <>
                            {Array.isArray(error)
                                ? error.length > 0 &&
                                  error?.map((item) => {
                                      return (
                                          <span
                                              id="message-id"
                                              key={item.field}
                                          >
                                              {item.error}
                                          </span>
                                      );
                                  })
                                : error}
                        </>
                    }
                ></Snackbar>
            )}
        </div>
    );
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
    return (
        oldProps.loading === newProps.loading &&
        oldProps.error === newProps.error &&
        oldProps.disabled === newProps.disabled
    );
}

export default SaveButton;
