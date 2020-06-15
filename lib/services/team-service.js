const axios = require('axios');

class teamService {
    constructor() {
        this.request = axios;
    }

    hWithAuth = token => ({ Authorization: `Bearer ${token}` });

    async getUsersTeams(zUserId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/users/${zUserId}/teams`,
            headers: this.hWithAuth(token),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async getTeamInfo(teamId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/teams/${teamId}`,
            headers: this.hWithAuth(token),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async getCurrentUser(teamId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/teams/${teamId}/currentuser`,
            headers: this.hWithAuth(token),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }
}

module.exports = new teamService();
