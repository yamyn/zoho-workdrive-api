const workdriveService = require('./services/index');

class WorkdriveController {
    constructor(accessToken, domain) {
        this.wdService = workdriveService;
        this.accessToken = accessToken;
        this.domain = domain;
    }

    team = {
        all: async ({ zuid, accessToken, domain }) => {
            accessToken = accessToken ? accessToken : this.accessToken;
            domain = domain ? domain : this.domain;

            return this.wdService.teamService.getUsersTeams(zuid, accessToken, domain);
        },
        info: async ({ teamId, accessToken, domain }) => {
            accessToken = accessToken ? accessToken : this.accessToken;
            domain = domain ? domain : this.domain;

            return this.wdService.teamService.getTeamInfo(teamId, accessToken, domain);
        },
        currentUser: async ({ teamId, accessToken, domain }) => {
            accessToken = accessToken ? accessToken : this.accessToken;
            domain = domain ? domain : this.domain;

            return this.wdService.teamService.getCurrentUser(teamId, accessToken, domain);
        },
    };

    ws = {
        all: async ({ teamId, accessToken, domain }) => {
            accessToken = accessToken ? accessToken : this.accessToken;
            domain = domain ? domain : this.domain;

            return this.wdService.workspaceService.getAllTeamFolders(teamId, accessToken, domain);
        },
        info: async ({ teamId, wsId, accessToken, domain }) => {
            accessToken = accessToken ? accessToken : this.accessToken;
            domain = domain ? domain : this.domain;

            return this.wdService.workspaceService.getTeamFolderInfo(teamId, wsId, accessToken, domain);
        },
        create: async ({ teamId, name, isPublicTeam, description, accessToken, domain }) => {
            accessToken = accessToken ? accessToken : this.accessToken;
            domain = domain ? domain : this.domain;

            return this.wdService.workspaceService.createTeamFolder(
                teamId,
                name,
                isPublicTeam,
                description,
                accessToken,
                domain,
            );
        },
        rename: async ({ wsId, name, accessToken, domain }) => {
            accessToken = accessToken ? accessToken : this.accessToken;
            domain = domain ? domain : this.domain;

            return this.wdService.workspaceService.renameTeamFolder(wsId, name, accessToken, domain);
        },
        delete: async ({ wsId, accessToken, domain }) => {
            accessToken = accessToken ? accessToken : this.accessToken;
            domain = domain ? domain : this.domain;

            return this.wdService.workspaceService.deleteTeamFolder(wsId, accessToken, domain);
        },
        users: {
            all: async ({ wsId, accessToken, domain }) => {
                accessToken = accessToken ? accessToken : this.accessToken;
                domain = domain ? domain : this.domain;

                return this.wdService.workspaceService.getAllTeamFolderUsers(wsId, accessToken, domain);
            },
            add: async ({ wsId, email, role, accessToken, domain }) => {
                accessToken = accessToken ? accessToken : this.accessToken;
                domain = domain ? domain : this.domain;

                return this.wdService.workspaceService.addMemberToTeamFolder(wsId, email, role, accessToken, domain);
            },
            newRole: async ({ userId, role, accessToken, domain }) => {
                accessToken = accessToken ? accessToken : this.accessToken;
                domain = domain ? domain : this.domain;

                return this.wdService.workspaceService.updateuserRoleinTeamFolder(userId, role, accessToken, domain);
            },
            delete: async ({ userId, accessToken, domain }) => {
                accessToken = accessToken ? accessToken : this.accessToken;
                domain = domain ? domain : this.domain;

                return this.wdService.workspaceService.deleteUserFromTeamFolder(userId, accessToken, domain);
            },
        },
    };
}

module.exports = WorkdriveController;
