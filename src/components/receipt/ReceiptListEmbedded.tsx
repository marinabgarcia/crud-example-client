"use client";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import * as React from "react";
import ReceiptCRUDDialog from "./ReceiptCRUDDialog";
import {Client, Receipt} from "@/domain/entities";
import ReceiptListItem from "./ReceiptListItem";
import {Switch} from "@mui/material";

interface ReceiptListEmbeddedProps {
    addReceiptActiveClient: (receipt: Receipt) => void;
    active: Partial<Client>;
}

export default function ReceiptListEmbedded(props: ReceiptListEmbeddedProps) {
    const {addReceiptActiveClient, active} = props;

    return (
        <>
            <Box sx={{flexGrow: 1, maxWidth: 752}}>
                <ReceiptCRUDDialog
                    addReceiptActiveClient={addReceiptActiveClient}
                />
                <List>
                    {active.receipts?.map((receipt, i) => {
                        return (
                            <ReceiptListItem
                                key={receipt._id || i}
                                receipt={receipt}
                            />
                        );
                    })}
                </List>
            </Box>
        </>
    );
}
