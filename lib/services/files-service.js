const axios = require('axios');
const FormData = require('form-data');

const zFileTypes = require('../shared/zohoFiles.enum');

class filesService {
    constructor() {
        this.request = axios;
    }

    hWithAuth = token => ({ Authorization: `Bearer ${token}` });

    async createFile(parentId, name, zFileType, token, domain) {
        const body = {
            data: {
                attributes: {
                    name,
                    service_type: zFileTypes[zFileType],
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

    async uploadFile(parentId, name, overrideNameExist, stream, token, domain) {
        const fd = new FormData();
        fd.append('content', stream);

        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${domain}/api/v1/upload?filename=${name}.png&parent_id=${parentId}&override-name-exist=${overrideNameExist}`,
            headers: { ...this.hWithAuth(token), ...fd.getHeaders() },
            data: fd,
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async downloadFile(fileId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/download/${fileId}`,
            headers: this.hWithAuth(token),
        };
        const { data } = await this.request(fetchParams);

        return data;
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

module.exports = new filesService();
