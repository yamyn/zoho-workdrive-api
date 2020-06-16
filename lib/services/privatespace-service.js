const axios = require('axios');

class privatespaceService {
    constructor() {
        this.request = axios;
    }

    hWithAuth = token => ({ Authorization: `Bearer ${token}` });

    async getPrivateFolder(userId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/users/${userId}/privatespace`,
            headers: this.hWithAuth(token),
        };

        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async getPrivateFiles(psId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/privatespace/${psId}/files`,
            headers: this.hWithAuth(token),
        };

        const { data } = await this.request(fetchParams);

        return data.data;
    }
}

module.exports = new privatespaceService();
