let BASE_URL = "";

//localhost
if (process.env.NODE_ENV === "development" && !process.env.REACT_APP_ENVI) {
    BASE_URL = "http://localhost:3000/api";
}

if (
    process.env.NODE_ENV === "development" &&
    process.env.REACT_APP_ENVI === "EXTERNAL_API"
) {
    BASE_URL = "http://localhost:3000/api";
}

if (process.env.NODE_ENV === "production") {
    BASE_URL = "http://localhost:3000/api";
}

const constants = {
    BASE_URL: BASE_URL,
};

export default constants;
