const BASE_URL = "http://localhost:8080";

const config = {
    URL: {
        auth: {
            signup: `${BASE_URL}/api/auth/register`,
            signin: `${BASE_URL}/api/auth/login`,
        },
    }
}
export default config;