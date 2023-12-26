import {baseUrl} from "./constants";


class Api {
    constructor() {
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return res.text().then(text => {throw new Error(text)});
        }
        return res.json();
    }

    async getRoleList(jwt) {
        const response = await fetch(`${this._baseUrl}/Admin/getRoleList`,
            {
                method: 'GET',
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });
        return this._getResponseData(response);
    }

    async updateUserRoles(roles, jwt) {
        return await fetch(`${this._baseUrl}/Admin/updateUserRoles`,
            {
                method: 'POST',
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(roles)
            });
    }

    async changePassword(info, jwt) {
        return await fetch(`${this._baseUrl}/Users/changePassword`,
            {
                method: 'POST',
                headers: {
                    authorization: `bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(info)
            });
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

    async forgotPassword(email) {
        return await fetch(`${this._baseUrl}/Auth/forgotPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        });
    }

    async resetPassword(info) {
        const response = fetch(`${this._baseUrl}/Auth/resetPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        });
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

    async getMeetingUsers(id, jwt) {
        const response = await fetch(`${this._baseUrl}/Meetings/getMeetingUsers`, {
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

    async getUsersList(skip, take, jwt) {
        const response = await fetch(`${this._baseUrl}/Users/getUsersList`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: '',
                skip: skip,
                take: take
            })
        });
        return this._getResponseData(response);
    }

    async updateUserInfo(user, jwt) {
        return await fetch(`${this._baseUrl}/Users/updateUserInfo`, {
            method: 'POST',
            headers: {
                authorization: `bearer ${jwt}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }
}

const api = new Api();

export default api;

