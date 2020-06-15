const axios = require('axios');

class foldersService {
    constructor() {
        this.request = axios;
    }

    hWithAuth = token => ({ Authorization: `Bearer ${token}` });

    async createFolder(parentId, name, token, domain) {
        const body = {
            data: {
                attributes: {
                    name,
                    parent_id: parentId,
                },
                type: 'files',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${domain}/api/v1/files`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async renameFolder(frId, name, token, domain) {
        const body = {
            data: {
                attributes: {
                    name,
                },
                type: 'files',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `https://workdrive.zoho.${domain}/api/v1/files/${frId}`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const { data } = await this.request(fetchParams);

        return {
            id: data.data.id,
            name: data.data.attributes.name,
        };
    }

    async copyFolder(frId, parentId, token, domain) {
        const body = {
            data: {
                attributes: {
                    resource_id: frId,
                },
                type: 'files',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${domain}/api/v1/files/${parentId}/copy`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async deleteFolder(frId, token, domain) {
        console.log(frId);
        const fetchParams = {
            method: 'delete',
            url: `https://workdrive.zoho.${domain}/api/v1/files/${frId}`,
            headers: this.hWithAuth(token),
        };
        const res = await this.request(fetchParams);
        if (res.status === 204) return { message: `Folder with id - ${frId} was removed` };
    }
}

module.exports = new foldersService();
