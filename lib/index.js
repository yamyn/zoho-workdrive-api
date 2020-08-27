const workdriveService = require('./services/index');

class WorkdriveController {
    constructor(accessToken, domain) {
        this.wdService = workdriveService;
        this.accessToken = accessToken;
        this.domain = domain;
    }

    team = {
        all: async ({ zuid, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.teamService.getUsersTeams(zuid, accessToken, domain);
        },
        info: async ({ teamId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.teamService.getTeamInfo(teamId, accessToken, domain);
        },
        currentUser: async ({ teamId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.teamService.getCurrentUser(teamId, accessToken, domain);
        },
    };

    ws = {
        all: async ({ teamId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.workspaceService.getAllTeamFolders(teamId, accessToken, domain);
        },
        info: async ({ teamId, wsId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.workspaceService.getTeamFolderInfo(teamId, wsId, accessToken, domain);
        },
        create: async ({ teamId, name, isPublicTeam, description, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.workspaceService.createTeamFolder(
                teamId,
                name,
                isPublicTeam,
                description,
                accessToken,
                domain,
            );
        },
        rename: async ({ wsId, name, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.workspaceService.renameTeamFolder(wsId, name, accessToken, domain);
        },
        delete: async ({ wsId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.workspaceService.deleteTeamFolder(wsId, accessToken, domain);
        },

        users: {
            all: async ({ wsId, accessToken = this.accessToken, domain = this.domain }) => {

                return this.wdService.workspaceService.getAllTeamFolderUsers(wsId, accessToken, domain);
            },
            add: async ({ wsId, email, role, accessToken = this.accessToken, domain = this.domain }) => {

                return this.wdService.workspaceService.addMemberToTeamFolder(wsId, email, role, accessToken, domain);
            },
            newRole: async ({ userId, role, accessToken = this.accessToken, domain = this.domain }) => {

                return this.wdService.workspaceService.updateuserRoleinTeamFolder(userId, role, accessToken, domain);
            },
            delete: async ({ userId, accessToken = this.accessToken, domain = this.domain }) => {

                return this.wdService.workspaceService.deleteUserFromTeamFolder(userId, accessToken, domain);
            },
        },
    };

    ps = {
        info: async ({ userId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.privatespaceService.getPrivateFolder(userId, accessToken, domain);
        },
        files: async ({ psId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.privatespaceService.getPrivateFiles(psId, accessToken, domain);
        },
    };

    folder = {
        info: async ({ folderId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.getOneFileInfo(folderId, accessToken, domain);
        },
        create: async ({ parentId, name, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.foldersService.createFolder(parentId, name, accessToken, domain);
        },
        rename: async ({ folderId, name, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.renameFile(folderId, name, accessToken, domain);
        },
        copy: async ({ folderId, parentId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.foldersService.copyFolder(folderId, parentId, accessToken, domain);
        },
        delete: async ({ folderId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.foldersService.deleteFolder(folderId, accessToken, domain);
        },
    };

    files = {
        create: async ({ parentId, name, zFileType, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.createFile(parentId, name, zFileType, accessToken, domain);
        },
        upload: async ({ parentId, name, overrideNameExist, readableStream, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.uploadFile(
                parentId,
                name,
                overrideNameExist,
                readableStream,
                accessToken,
                domain,
            );
        },
        download: async ({ fileId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.downloadFile(fileId, accessToken, domain);
        },
        rename: async ({ fileId, name, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.renameFile(fileId, name, accessToken, domain);
        },
        copy: async ({ idArr, parentId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.copyFiles(idArr, parentId, accessToken, domain);
        },
        move: async ({ idArr, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.moveFiles(idArr, accessToken, domain);
        },
        delete: async ({ idArr, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.deleteFiles(idArr, accessToken, domain);
        },
        list: async ({ folderId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.getList(folderId, accessToken, domain);
        },
        info: async ({ fileId, accessToken = this.accessToken, domain = this.domain }) => {

            return this.wdService.filesService.getOneFileInfo(fileId, accessToken, domain);
        },
    };

    url = ({ link, accessToken = this.accessToken }) => {

        return this.wdService.urlService.getByLink(link, accessToken);
    };
}

module.exports = WorkdriveController;
