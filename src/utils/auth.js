import {baseUrl} from "./constants";

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json();
}

export async function registerUser(userInfo) {
    const response = await fetch(`${baseUrl}/Auth/registration`,
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    });
    return getResponseData(response);
}

export async function loginUser(userInfo) {
    const response = await fetch(`${baseUrl}/Auth/signIn`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userInfo)
    });
    return getResponseData(response);
}



export function refreshToken(access, refresh) {
    return fetch(`${baseUrl}/Auth/refreshToken`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization" : `Bearer ${access}`
        },
        body: JSON.stringify({
            accessToken: access,
            refreshToken: refresh
        })
    })
        .then((res) => {
            return getResponseData(res);
        });
}