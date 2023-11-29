"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {DatePicker} from "@mui/x-date-pickers";
import {Receipt} from "@/domain/entities";
import dayjs, {Dayjs} from "dayjs";
import {Box} from "@mui/material";

interface ReceiptCRUDDialogProps {
    addReceiptActiveClient: (receipt: Receipt) => void;
}

export default function ReceiptCRUDDialog(props: ReceiptCRUDDialogProps) {
    const {addReceiptActiveClient} = props;
    const [open, setOpen] = React.useState(false);

    const [receipt, setReceipt] = React.useState<Partial<Receipt>>({});

    const handleChangeReceipt = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setReceipt({
            ...receipt,
            [event.target.id]: event.target.value,
        });
    };

    const handleChangeDate = (date: Dayjs | null) => {
        console.log(date);
        if (date)
            setReceipt({
                ...receipt,
                date: date.format("MM/DD/YYYY") as string,
            });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = (e: React.SyntheticEvent) => {
        e.preventDefault();
        addReceiptActiveClient(receipt as Receipt);
        setReceipt({});
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Box width="100%" display="flex" justifyContent={"flex-end"}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    New receipt
                </Button>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleAccept}>
                    <DialogTitle>Subscribe</DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{marginBottom: "10px"}}>
                            Complete the data of the receipt.
                        </DialogContentText>
                        <DatePicker
                            label="Date"
                            slotProps={{
                                textField: {
                                    variant: "standard",
                                    fullWidth: true,
                                    required: true,
                                },
                            }}
                            value={
                                receipt && receipt.date
                                    ? (dayjs(receipt.date) as Dayjs | null)
                                    : null
                            }
                            onChange={(newValue) => handleChangeDate(newValue)}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="tax_percentage"
                            label="Tax percentage"
                            type="number"
                            fullWidth
                            variant="standard"
                            required
                            value={
                                receipt && receipt.tax_percentage
                                    ? receipt.tax_percentage
                                    : ""
                            }
                            onChange={handleChangeReceipt}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="tax_amount"
                            label="Tax amount"
                            type="number"
                            fullWidth
                            required
                            variant="standard"
                            value={
                                receipt && receipt.tax_amount
                                    ? receipt.tax_amount
                                    : ""
                            }
                            onChange={handleChangeReceipt}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}
