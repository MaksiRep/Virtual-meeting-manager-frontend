import {baseUrl} from "./constants";

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json();
}

export function registerUser(email, password) {
    return fetch(`${baseUrl}/Auth/signUp`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
        .then((res) => {
            return getResponseData(res);
        });
}

export function loginUser(email, password) {
    return fetch(`${baseUrl}/Auth/signIn`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then((res) => {
            return getResponseData(res);
        });
}



export function checkToken(jwt) {
    return fetch(`${baseUrl}/Auth/`,{
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${jwt}`
        }
    })
        .then((res) => {
            return getResponseData(res);
        });
}