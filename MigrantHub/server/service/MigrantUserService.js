const MigrantUserRepository = require('../repository/MigrantUserRepository');


module.exports = {
    async getMigrantUser(businessUserId) {
        return MigrantUserRepository.getMigrantUser(businessUserId);
    },

    async editMigrantUser(migrantUserId, parsedMigrantUserObject) {
        const migrantUserObject = parsedMigrantUserObject;

        if (migrantUserObject.languages === undefined) {
            migrantUserObject.languages = [];
        }

        if (migrantUserObject.workExperience === undefined) {
            migrantUserObject.workExperience = [];
        }

        if (migrantUserObject.family === undefined) {
            migrantUserObject.family = [];
        }

        return MigrantUserRepository.editMigrantUser(migrantUserId, migrantUserObject);
    },
}
