const axios = require('axios');

class urlService {
    constructor() {
        this.request = axios;
    }

    hWithAuth = token => ({ Authorization: `Bearer ${token}` });

    async getByLink(link, token) {
        const fetchParams = {
            method: 'get',
            url: link,
            headers: this.hWithAuth(token),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }
}

module.exports = new urlService();
