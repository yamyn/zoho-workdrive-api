const axios = require('axios');

const roles = require('../shared/wsRoles.enum');

class workspaceService {
    constructor() {
        this.request = axios;
    }

    hWithAuth = token => ({ Authorization: `Bearer ${token}` });

    async getAllTeamFolders(teamId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/teams/${teamId}/workspaces`,
            headers: this.hWithAuth(token),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async getTeamFolderInfo(teamId, wsId, token, domain) {
        const wsAll = await this.getAllTeamFolders(teamId, token, domain);
        const currentWs = wsAll.find(ws => ws.id === wsId);

        return currentWs;
    }

    async createTeamFolder(teamID, wsName, isPublicTeam, description, token, domain) {
        const body = {
            data: {
                attributes: {
                    name: wsName,
                    parent_id: teamID,
                    is_public_within_team: isPublicTeam,
                    description: description,
                },
                type: 'workspaces',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${domain}/api/v1/workspaces`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async renameTeamFolder(wsId, wsName, token, domain) {
        const body = {
            data: {
                attributes: {
                    name: wsName,
                },
                id: wsId,
                type: 'workspaces',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `https://workdrive.zoho.${domain}/api/v1/workspaces/${wsId}`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const { data } = await this.request(fetchParams);

        return {
            id: data.data.id,
            name: data.data.attributes.name,
        };
    }

    async deleteTeamFolder(wsId, token, domain) {
        const fetchParams = {
            method: 'delete',
            url: `https://workdrive.zoho.${domain}/api/v1/workspaces/${wsId}`,
            headers: this.hWithAuth(token),
        };
        const res = await this.request(fetchParams);
        if (res.status === 204) return { message: `Workspace with id - ${wsId} was removed` };
    }

    async getAllTeamFolderUsers(wsId, token, domain) {
        const fetchParams = {
            method: 'get',
            url: `https://workdrive.zoho.${domain}/api/v1/workspaces/${wsId}/permissions`,
            headers: this.hWithAuth(token),
        };

        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async addMemberToTeamFolder(wsId, userEmail, role, token, domain) {
        const body = {
            data: {
                attributes: {
                    resource_id: wsId,
                    shared_type: 'workspace',
                    email_id: userEmail,
                    role_id: roles.onServer[role],
                },
                type: 'permissions',
            },
        };

        const fetchParams = {
            method: 'post',
            url: `https://workdrive.zoho.${domain}/api/v1/permissions`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const { data } = await this.request(fetchParams);

        return data.data;
    }

    async updateuserRoleinTeamFolder(userId, role, token, domain) {
        const body = {
            data: {
                attributes: {
                    role_id: roles.onServer[role],
                },
                id: userId,
                type: 'permissions',
            },
        };

        const fetchParams = {
            method: 'patch',
            url: `https://workdrive.zoho.${domain}/api/v1/permissions/${userId}`,
            headers: this.hWithAuth(token),
            data: JSON.stringify(body),
        };
        const { data } = await this.request(fetchParams);

        return { id: data.data.id, role: roles.fromServer[data.data.attributes.role_id] };
    }

    async deleteUserFromTeamFolder(userId, token, domain) {
        const fetchParams = {
            method: 'delete',
            url: `https://workdrive.zoho.${domain}/api/v1/permissions/${userId}`,
            headers: this.hWithAuth(token),
        };
        const res = await this.request(fetchParams);
        if (res.status === 204) return { message: `User with id - ${userId} was removed` };
    }
}

module.exports = new workspaceService();
