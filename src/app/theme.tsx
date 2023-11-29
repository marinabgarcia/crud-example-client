import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
    palette: {
        primary: {
            main: "#82643E",
            dark: "#82643E",
            light: "#82643E",
        },
    },
    typography: {
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 700,
        fontWeightBold: 900,
        caption: {
            fontWeight: "400",
            fontSize: "0.7rem",
        },
        body1: {
            fontWeight: 600,
            fontSize: "0.9rem",
            lineHeight: "initial",
        },
        body2: {
            fontSize: "14px",
            fontWeight: 400,
        },
        subtitle1: {
            fontSize: "2.1rem",
            "@media(max-width: 714px)": {
                "&": {
                    fontSize: "1.5rem",
                },
            },
            fontWeight: 600,
            lineHeight: "initial",
        },
        subtitle2: {
            fontWeight: 300,
            fontSize: "1.2rem",
            "@media(max-width: 714px)": {
                "&": {
                    fontSize: "1rem",
                },
            },
            lineHeight: "initial",
        },
        h1: {
            fontSize: "3.8rem",
            lineHeight: "inherit",
            fontWeight: "800",
            "@media(max-width: 714px)": {
                "&": {
                    fontSize: "1.94rem",
                },
            },
        },
        h2: {
            fontSize: "1.8rem",
            fontWeight: "300",
            marginBottom: "0px!important",
            "@media(max-width: 714px)": {
                "&": {
                    fontSize: "1.4rem",
                },
            },
        },
        h3: {
            fontWeight: 800,
            fontSize: "1.3rem",
        },
        h4: {
            fontWeight: 500,
            fontSize: "1.2rem",
        },
        h5: {
            fontWeight: 600,
            fontSize: "1rem",
            lineHeight: "initial",
        },
        h6: {
            fontWeight: 500,
            fontSize: ".85rem",
        },
        fontFamily: [
            "SkModernist",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
});

export default theme;
