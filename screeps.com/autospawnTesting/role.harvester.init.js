
const harvesterRoleMeta = {
    roleName: 'harvester',
    rc1: {
        numberToMaintain: 4,
        bodyParts: [WORK, CARRY, CARRY, MOVE]
    },
    rc2: {
        numberToMaintain: 7,
        bodyParts: [WORK, CARRY, CARRY, CARRY, MOVE]
    },
    rc3: {
        numberToMaintain: 8,
        bodyParts: [WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
    },
    rc4: {
        numberToMaintain: 9,
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
    },
    rc5: {
        numberToMaintain: 12,
        bodyParts: [WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    }
}

module.exports = harvesterRoleMeta;