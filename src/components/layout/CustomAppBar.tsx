import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
// import MenuIcon from '@mui/icons-material/Menu';

export default function CustomAppBar() {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{flexGrow: 1}}
                        >
                            Clients
                        </Typography>
                    </Link>
                    <Link href="/clients">
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{flexGrow: 1, marginLeft: "20px"}}
                        >
                            New client
                        </Typography>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
