const BASE_URL = "http://localhost:8080";

const config = {
    URL: {
        auth: {
            baseAuth: `${BASE_URL}/api/auth`,
            signup: `${BASE_URL}/api/auth/register`,
            signin: `${BASE_URL}/api/auth/login`,
            forgotPassword: `${BASE_URL}/api/auth/forgot-password`,
            resetPassword: `${BASE_URL}/api/auth/reset-password`,
            me: `${BASE_URL}/api/auth/me`,
            refreshToken: `${BASE_URL}/api/auth/refresh-token`,
            update: (id: string) => `${BASE_URL}/api/auth/update/${id}`,
            delete: (id: string) => `${BASE_URL}/api/auth/delete/${id}`,
        },
        moodAi: {
            BASE_URL: "https://mood-ai-api.onrender.com",
            predict: `https://mood-ai-api.onrender.com/predict`,
        }
    }
}
export default config;