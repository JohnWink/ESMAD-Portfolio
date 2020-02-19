/**
 * Classe que modela um utilizador
 */
export default class User {
    constructor(username, password, xp, level, userQuestionId,userLikes,admin) {
        this.username = username
        this.password = password
        this.xp = xp
        this.level = level
        this.userQuestionId = userQuestionId
        this.userLikes = userLikes
        this.admin = admin
    }

    
    static compareUserLevel(userA, userB) {
        if (userA.level > userB.level)
            return -1;
        if (userA.level < userB.level)
            return 1;
        return 0;
    }
}