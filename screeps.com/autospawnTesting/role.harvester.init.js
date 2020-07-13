
const harvesterRoleMeta = {
    roleName: 'harvester',
    rc1: {
        numberToMaintain: 3,
        bodyParts: [WORK, CARRY, MOVE, MOVE]
    },
    rc2: {
        numberToMaintain: 4,
        bodyParts: [WORK, CARRY, CARRY, CARRY, MOVE]
    },
    rc3: {
        numberToMaintain: 5,
        bodyParts: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
    },
    rc4: {
        numberToMaintain: 6,
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
    }
}

module.exports = harvesterRoleMeta;