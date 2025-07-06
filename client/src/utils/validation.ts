export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must include a lowercase letter";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must include an uppercase letter";
    }
    if (!/[0-9]/.test(password)) {
        return "Password must include a number";
    }
    if (!/[^a-zA-Z0-9]/.test(password)) {
        return "Password must include a special character";
    }
    return null;
}