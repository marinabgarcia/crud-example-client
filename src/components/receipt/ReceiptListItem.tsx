import {
    ListItem,
    IconButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
} from "@mui/material";
import dayjs from "dayjs";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import {Receipt} from "@/domain/entities";

interface ReceiptListItemProps {
    receipt: Receipt;
    action?: React.ReactNode;
}
export default function ReceiptListItem(props: ReceiptListItemProps) {
    const {receipt, action} = props;
    return (
        <ListItem secondaryAction={action ? action : null}>
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    receipt.date
                        ? "Date: " + dayjs(receipt.date).format("MM/DD/YYYY")
                        : ""
                }
                secondary={`${
                    receipt.tax_amount
                        ? "Tax amount: " + receipt.tax_amount?.toString()
                        : ""
                } ${
                    receipt.tax_percentage
                        ? "Tax percentage: " +
                          receipt.tax_percentage?.toString()
                        : ""
                }`}
            />
        </ListItem>
    );
}
