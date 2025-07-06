const BASE_URL = "http://localhost:8080";

const config = {
    URL: {
        auth: {
            signup: `${BASE_URL}/api/auth/register`,
            signin: `${BASE_URL}/api/auth/login`,
            forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
            resetPassword: `${BASE_URL}/api/auth/reset-password`,
        },
    }
}
export default config;