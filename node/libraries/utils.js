const utils = {
    userCompare : (userA, userB) => {
        const elA = userA.login.toUpperCase();
        const elB = userB.login.toUpperCase();

        let comparison = 0;
        if (elA > elB) {
            comparison = 1;
        } else if (elA < elB) {
            comparison = -1;
        }
        return comparison;
    }
};

module.exports = utils;
