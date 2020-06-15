const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const moment = require('moment');

class WorkdriveService {
    teamFolder = 'EmpMonitor';
    email;

    constructor() {
        this.request = axios;
        this.fd = FormData;
        this.moment = moment;
    }

    hWithAuth = token => ({ Authorization: `Bearer ${token}` });

    async getUsersTeams(zUserId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/users/${zUserId}/teams`,
            headers: this.hWithAuth(token),
        };
        const { data } = await axios(fetchParams);

        return data;
    }

    async getParentFoldersOpt({ id, url }) {
        const fetchParams = {
            method: 'get',
            url,
            headers: this.headers,
        };
        const { data } = await axios(fetchParams);
        let empMonitor = data.data.find(wspace => wspace.attributes.name === this.teamFolder);
        if (!empMonitor) empMonitor = await this.createTeamFolder(id);

        return { id: empMonitor.id, url: empMonitor.relationships.folders.links.related };
    }

    async createTeamFolder(teamID) {
        const body = {
            data: {
                attributes: {
                    name: this.teamFolder,
                    parent_id: teamID,
                    is_public_within_team: true,
                    description: 'EmpMonitor service screenshots main folder',
                },
                type: 'workspaces',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${this.domain}/api/v1/workspaces`,
            headers: this.headers,
            data: JSON.stringify(body),
        };
        const { data } = await axios(fetchParams);

        return data.data;
    }

    async getFoldersOpt({ id, url }, folderName) {
        const isEmailFolder = folderName === this.email;
        let folder;
        const fetchParams = {
            method: 'get',
            url,
            headers: this.headers,
        };
        const { data } = await axios(fetchParams);
        if (data.data.length !== 0) {
            folder = data.data.find(folder => folder.attributes.name === folderName);
        }

        if (data.data.length === 0 || !folder) {
            folder = await this.createFolder(id, folderName);
        }

        if (!isEmailFolder) {
            return folder.id;
        }
        return { id: folder.id, url: folder.relationships.folders.links.related };
    }

    async createFolder(parentFoldId, folderName) {
        const body = {
            data: {
                attributes: {
                    name: folderName,
                    parent_id: parentFoldId,
                },
                type: 'files',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${this.domain}/api/v1/files`,
            headers: this.headers,
            data: JSON.stringify(body),
        };
        const { data } = await axios(fetchParams);

        return data.data;
    }

    async uploadScreenshotToDrive(file, folderId) {
        const data = new FormData();
        data.append('content', fs.createReadStream('./Знімок екрану з 2020-05-22 10-14-23.png'), { type: 'image/png' });
        const headers = {
            ...this.headers,
            ...data.getHeaders(),
        };
        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${
                this.domain
            }/api/v1/upload?filename=${Date.now()}.png&parent_id=${folderId}&override-name-exist=true`,
            headers,
            data,
        };
        await axios(fetchParams);
    }
}

module.exports = new WorkdriveService();
