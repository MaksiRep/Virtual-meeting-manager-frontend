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

    async getInitialMeetings(base, jwt){
        const response = await fetch(`${this._baseUrl}/Meetings/getMeetingsList`,
            {
                method: 'POST',
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(base)
            });
        return this._getResponseData(response);
    }

    async getCurrentUser(jwt){
        const response = await fetch(`${this._baseUrl}/Users/getCurrentUser`,
            {
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }});
        return this._getResponseData(response);
    }

    async getUserInfo(id, jwt) {
        const response = await fetch(`${this._baseUrl}/Users/getUserInfo`,
            {
                method: 'POST',
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: id
                })
            });
        return this._getResponseData(response);
    }

    async createMeeting(meeting, jwt) {
        const response = await fetch(`${this._baseUrl}/Meetings/createMeeting`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meeting)
        });
        return this._getResponseData(response);
    }

    async updateMeetingImage(id, url, jwt) {
        return await fetch(`${this._baseUrl}/Meetings/updateMeetingImage`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                meetingId: id,
                imageUrl: url
            })
        });
    }

    async getCurrentMeeting(id, jwt) {
        const response = await fetch(`${this._baseUrl}/Meetings/getMeetingInfo`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                meetingId: id,
            })
        });
        return this._getResponseData(response);
    }

    async updateMeeting(meeting, jwt) {
        return await fetch(`${this._baseUrl}/Meetings/updateMeeting`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meeting)
        });
    }

    async deleteMeeting(id, jwt) {
        return await fetch(`${this._baseUrl}/Meetings/deleteMeeting`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                meetingId: id
            })
        });
    }

    async getMeetingImage(id, jwt){
        const response = await fetch(`${this._baseUrl}/Meetings/getMeetingImage`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({meetingId: id})
        });
        return this._getResponseData(response);
    }

    async visitMeeting(id, jwt){
        return await fetch(`${this._baseUrl}/Meetings/visitMeeting`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({meetingId: id})
        });
    }

    async cancelMeetingVisiting(id, jwt){
        return await fetch(`${this._baseUrl}/Meetings/cancelMeetingVisiting`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({meetingId: id})
        });
    }

    async getUsersCount() {
        const response = await fetch(`${this._baseUrl}/Statistic/getUsersCount`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return this._getResponseData(response);
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
}

const api = new Api();

export default api;

