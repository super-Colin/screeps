
// method extensions
interface Creep {
  sayHello: () => void;
  mine: () => void;
  startTask: (workUpdate: Task) => void; // start a task
  continueTask: () => void; // continue whatever the current task is
  // continueTask: () => void; 
  // continueTask: () => void; 

}



// memory extension samples
interface CreepMemory {
  role:string;
  homeRoomName:string;
  thinking:boolean;
  thoughts:{};
  task: {
    task: string;
    status: string;
    blocked: boolean;
    L_task: string;
    L_status: string;
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

// interface RoomMemory {
//   tasks?: string;
//   requests?: string;
// }

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


// // `global` extension samples
// declare namespace NodeJS {
//   interface Global {
//     log: any;
//   }
// }


type WORKER_ROLE = "miner" 


interface Task {
  tId:string;
  name:string;
  priority:number;
  finished: boolean;
  rooms?:[roomName: string];
  creeps?:[creepName: string];
  blocked?: boolean;
  checkAgainAt?: number;// A Game.time number
}

interface TaskMatrix {
  tmId:string;
  name?:string;
  priority: string;
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
  raId: string;
  roomName: string;
  tasks: TaskMatrix;
  spawnQueue:[creep: CreepBlueprint];
  completed?: TaskMatrix;
  feelingsCompiledWith?:string;
  danger?: boolean;
}





interface CreepBlueprint {
  name: string;
  role: string;
  modifiers: string[];
  bodyParts: BodyPartConstant[];
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











  