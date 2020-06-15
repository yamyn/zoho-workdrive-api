const axios = require('axios');
const FormData = require('form-data');

const zFileTypes = require('../shared/zohoFiles.enum');

class filesService {
    constructor() {
        this.request = axios;
    }

    hWithAuth = token => ({ Authorization: `Bearer ${token}` });
    IdArrCopyMapper = idArr =>
        idArr.map(id => ({
            attributes: {
                resource_id: id,
            },
            type: 'files',
        }));
    IdArrMoveMapper = idArr =>
        idArr.map(({ id, parentId }) => ({
            attributes: {
                parent_id: parentId,
            },
            id,
            type: 'files',
        }));
    IdArrDeleteMapper = idArr =>
        idArr.map(id => ({
            attributes: {
                status: '61',
            },
            id,
            type: 'files',
        }));

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

    async renameFile(flId, name, token, domain) {
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
            url: `https://workdrive.zoho.${domain}/api/v1/files/${flId}`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const { data } = await this.request(fetchParams);

        return {
            id: data.data.id,
            name: data.data.attributes.name,
        };
    }

    async copyFiles(idArr, parentId, token, domain) {
        const body = {
            data: this.IdArrCopyMapper(idArr),
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

    async moveFiles(idArr, token, domain) {
        const body = {
            data: this.IdArrMoveMapper(idArr),
        };

        const fetchParams = {
            method: 'patch',
            url: `https://workdrive.zoho.${domain}/api/v1/files`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async deleteFiles(idArr, token, domain) {
        const body = {
            data: this.IdArrDeleteMapper(idArr),
        };

        const fetchParams = {
            method: 'patch',
            url: `https://workdrive.zoho.${domain}/api/v1/files`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const res = await this.request(fetchParams);
        if (res.status === 204) return { message: `Files with id - ${idArr.join(', ')} was removed` };
    }

    async getList(frId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/files/${frId}/files`,
            headers: this.hWithAuth(token),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async getOneFileInfo(fileId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/files/${fileId}`,
            headers: this.hWithAuth(token),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }
}

module.exports = new filesService();
