import nookies from "nookies";

type CookieProps = {
    name: string,
    value?: string
}

export const setCookie = ({name, value}: CookieProps) => {
    nookies.set(null, name, value || "", {
        maxAge: 60 * 60 * 24,
        path: "/",
      });
}

export const getCookie = ({name}: CookieProps) => {
    const cookies = nookies.get(null);
    return cookies[name];
}

export const deleteCookie = ({name}: CookieProps) => {
    nookies.destroy(null, name, { path: '/' });
}