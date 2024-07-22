import Cookies from "js-cookie";

export const SaveCookie = (name, value) => {
    Cookies.set(name, JSON.stringify(value), {
        expires: 10,
        path: '/',
        secure: true,
        sameSite: 'strict'
    });
};

export const GetCookie = (name) => {
    const cookieValue = Cookies.get(name);
    if (cookieValue === undefined) {
        return false; 
    } else {        
        let get = JSON.parse(cookieValue);
        return get
    };
};

export const RemoveCookie = (name) => {
    Cookies.remove(name);
};