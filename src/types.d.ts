
// method extensions
interface Creep {
  // sayHello: () => void;
  mine: () => void;
  startTask: (workUpdate: Task) => void; // start a task
  continueTask: () => void; // continue whatever the current task is
  // continueTask: () => void; 
  // continueTask: () => void; 

}

interface Room {
  think: (spawnsDictionary: RoomsAndSpawnsDictionary) => void,
  updateEnergyIncome: () => void,
}




// memory extension samples
interface CreepMemory {
  role:string;
  homeRoomSpawn:string;
  homeRoomName:string;
  thinking:boolean;
  thoughts:{};
  task: {
    name: string;
    status: string;
    blocked: boolean;
    next?: string
    backup?: string
    targetId: {
      main: string,
      next?: string,
      backup?: string
    }
  },
  targetId: {
    task: string;
    ally: string;
    enemy: string;
    L_task: string;
    L_ally: string;
    L_enemy: string;
  }
}

interface SpawnMemory {
  roomName:string,
  isMainInRoom:boolean;
  isHub:boolean;
  desiredWorkers?:number;
  actualWorkers?:number;
  spawnQueue: CreepBlueprint[];
  feelings:{
    needWorkers:boolean,
  },
  thoughts?:{}
}
// interface FlagMemory {
//   source?: string;
//   upgradeDepot?: boolean;
// }

interface RoomMemory {
  spawns?:string[]
  creeps?:string[]
  // tasks?: string;
  // requests?: string;
  logistics?: {
    energyIncome: number;
    energyOutflow: number;
    defenseLevel: number;
    calculations: {
      energyIncome: ongoingCount
    }
  }
}

// interface RoomTerrain {
//   getRawBuffer(): Uint8Array
// }



interface Memory {
  manualTasks:{
    scoutRoom: string;
  },
  feelings:{ // these will be changable manually, but the mind will also adjust if needed
    useMoreCpu: boolean;
    useLessCpu: boolean;
    cpuUseModifier: number; // higher = use more
    memoryUseModifier: number; // higher = use more

    aggresive: boolean; // attack somewhere
    defensesive: boolean; // hole up in base
    stretchy: boolean; // scout, remote mine..
    creepsToIgnore?: [{
      creepName?: string
      reason?: string
    }]; // don't waste cpu on these guys for w/e reason
  },
  thoughts:{
    logistics:{
      roomStats:{
        roomName?:{
          energyIncome?: number;
          energyMax?: number;
          defenseLevel?: number;
        }
      }
    }
    ongoing:{
      lastTick?:any;
      total?:any;
    }
  },
  creepsOfInterest?: [string?]
}





interface Task {
  name:string;
  priority: number; // higher is more important to get done
  finished: boolean;
  rooms?:[roomName: string];
  creeps?:[creepName: string];
  blocked?: boolean;
  checkAgainAt?: number;// A Game.time number
}

interface TaskMatrix {
  name?:string;
  priority: string; // higher is more important to get done
  tasks:Task[];
}


interface ActionPlan {
  spawns:{
    name: string;
    update?: SpawnMemory;
  }[]
  creeps:{
    name: string;
    update?: Task;
  }[]
}

interface RoomAgenda {
  roomName: string;
  tasks: TaskMatrix;
  spawnQueue: CreepBlueprint[];
  completed?: TaskMatrix;
  feelingsCompiledWith?:string;
  danger?: boolean;
}


interface RoomsAndSpawnsDictionary{
  [room:string]:string[]
}
// interface RoomsAndCreepsDictionary{
//   [room:string]:string[]
// }









interface CreepBlueprint {
  name: string;
  role: string;
  modifiers: string[];
  bodyParts: BodyPartConstant[];
}


// runningAverage will be updated every tickFrequency, with a per tick value
interface ongoingCount {
  tickUpdateFrequency: number; // how many ticks between runningAverage updates
  referenceValue: number; // the value being tracked
  runningAverage: number; // updated every tickFrequency
  runningTotal: number; // increases each time the update is called, reset every tickFrequency
  lastUpdateTick: number, // the tick runningAverage was last updated
  nextUpdateTick: number, // the tick runningAverage will be updated next
  functionName?: string;
  timeoutOnTick?: number;
}















// Categorizing parts of the code for self reference, like targeted debugging
type CAT_SPAWN = "SPAWN"
type CAT_TASK = "TASK"
type CAT_ROLE = "ROLE"
type CAT_ACT = "ACT"
type CAT_THINK = "THINK"
type CAT_FEEL = "FEEL"
type CAT_DECIDE = "DECIDE"
type CAT_HIVEMIND = "HIVEMIND"
type CAT_MEMORY = "MEMORY"

type CODE_CATEGORY =
    CAT_SPAWN
  | CAT_TASK
  | CAT_ROLE
  | CAT_ACT
  | CAT_DECIDE
  | CAT_FEEL
  | CAT_THINK
  | CAT_HIVEMIND
  | CAT_MEMORY


type TASK_MINE = "mine"
type TASK_HARVEST = ""
type TASK_ = ""
// type TASK_ = ""
// type TASK_ = ""






// Room needs
type NEED_DEFENSE = "defense"
type NEED_ATTACK = "attack"
type NEED_ENERGY = "energy"
type NEED_MINES = "mines"

type ROOM_NEEDS =
    NEED_DEFENSE
  | NEED_ATTACK
  | NEED_ENERGY
  | NEED_MINES




// Roles with jobs and behaviors assigned
// Workers
type ROLE_WORKER_GENERAL = "general" // what a new room will spawn, mines and transports energy back to spawn, if full upgrades controller
type ROLE_WORKER_MINER = "miner" // a slow creep that prefers to sit still on a source and mine 
type ROLE_WORKER_BUILDER = "builder" // prefers to build on construction sites
type ROLE_WORKER_MOVER = "mover" // a fast creep that prefers to transport things
// Combat
type ROLE_DEFENSE_ARCHER = "dArcher"
type ROLE_DEFENSE_MELEE = "dMelee"
type ROLE_ATTACK_ARCHER = "aArcher"
type ROLE_ATTACK_MELEE = "aMelee"


type CREEP_ROLE =
    ROLE_WORKER_GENERAL
  | ROLE_WORKER_MINER
  | ROLE_WORKER_BUILDER
  | ROLE_WORKER_MOVER
  // Combat
  | ROLE_DEFENSE_ARCHER
  | ROLE_DEFENSE_MELEE
  | ROLE_ATTACK_ARCHER
  | ROLE_ATTACK_MELEE



// Modifiers for when generating new creep bodies
type BODY_MOD_STATIONARY = "stationary" // single move part
type BODY_MOD_SLOW = "slow" // fewer move parts
type BODY_MOD_FAST = "fast" // extra move parts
type BODY_MOD_WEAK = "weak" // fewer carry parts
type BODY_MOD_STRONG = "strong" // extra carry parts
type BODY_MOD_UNSKILLED = "unskilled" // fewer work parts
type BODY_MOD_SKILLED = "skilled" // extra work parts


type BODY_MODIFIER = 
    BODY_MOD_STATIONARY
  | BODY_MOD_SLOW
  | BODY_MOD_FAST
  | BODY_MOD_WEAK
  | BODY_MOD_STRONG
  | BODY_MOD_SKILLED
  | BODY_MOD_UNSKILLED






  