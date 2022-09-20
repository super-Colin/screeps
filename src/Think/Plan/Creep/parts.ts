




export const planBodyParts = function():BodyPartConstant[]{

  return ["carry", "move", "work", "work"]
}


export const planCreep = function(role:string):CreepBlueprint{

  return {
    name: (role+"_"+ Game.time),
    role: role,
    modifiers: [],
    bodyParts: planBodyParts(),
  }
}