import {baseUrl} from "./constants";


class Api {
    constructor() {
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`)
        }
        return res.json();
    }

    getInitialMeetings(jwt){
        return fetch(`${this._baseUrl}/Meetings/getMeetingList`,
            {
                method: 'POST',
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }})
            .then((res) => {
                return this._getResponseData(res)
            });
    }

    getUserInfo(jwt){
        return fetch(`${this._baseUrl}/Users/getCurrentUser`,
            {
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }})
            .then((res) => {
                return this._getResponseData(res)
            });
    }

    postNewCard(name, link, jwt) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => {
                return this._getResponseData(res);
            });
    }

    setUserInfo(name, info, jwt){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: info
            })
        })
            .then((res) => {
                return this._getResponseData(res);
            });
    }

    deleteCard(id, jwt) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                return this._getResponseData(res);
            });
    }
}

const api = new Api();

export default api;

