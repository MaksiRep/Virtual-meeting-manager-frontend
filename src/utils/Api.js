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

    // getInitialMeetings(base, jwt){
    //     return fetch(`${this._baseUrl}/Meetings/getMeetingsList`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 authorization: `bearer ${jwt}`,
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(base)
    //         })
    //         .then((res) => {
    //             return this._getResponseData(res)
    //         });
    // }

    async getInitialMeetings(base, jwt){
        const response = (await fetch(`${this._baseUrl}/Meetings/getMeetingsList`,
            {
                method: 'POST',
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(base)
            }))
        return this._getResponseData(response);
    }

    async getCurrentUser(jwt){
        const response = (await fetch(`${this._baseUrl}/Users/getCurrentUser`,
            {
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }}))
        return this._getResponseData(response)
    }

    async getUserInfo(id, jwt) {
        const response = (await fetch(`${this._baseUrl}/Users/getUserInfo`,
            {
                method: 'POST',
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: id
                })
            }))
        return this._getResponseData(response)
    }

    createMeeting(meeting, jwt) {
        return fetch(`${this._baseUrl}/Meetings/createMeeting`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meeting)
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

