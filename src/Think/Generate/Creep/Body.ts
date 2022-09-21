



const bodyPartsCosts={

}



export const planCreep = function (role: CREEP_ROLE, energyAvailable: number, modifiers: BODY_MODIFIER[] =[]): CreepBlueprint | false{

  let parts = planBodyParts(role, energyAvailable, modifiers)
  if( ! parts ){return false;}

  return {
    name: (role + "_" + Game.time),
    role: role,
    modifiers: modifiers,
    bodyParts: parts,
  }
}



// toDO : add way to add up total body cost

export const planBodyParts = function (role: CREEP_ROLE, energyAvailable: number, modifiers: BODY_MODIFIER[] = []): BodyPartConstant[] | false{
  let parts: BodyPartConstant[] = [];
  let bodyCost;
  // worker roles
  switch(role){

    case "miner":
      bodyCost = 400
      for (let i = 0; i < energyAvailable % bodyCost; i++) {
        parts.push("move", "carry", "work", "work", "work");
      }
      // if we got at least 1 set of parts return it, otherwise try something smaller
      if (energyAvailable > bodyCost) { return parts }

    case "mover":
      bodyCost = 350
      for (let i = 0; i < energyAvailable % bodyCost; i++) {
        parts.push("move", "carry", "move", "carry", "work", "move");
      }
      // if we got at least 1 set of parts return it, otherwise try something smaller
      if (energyAvailable > bodyCost) { return parts }


    case "builder":
      bodyCost = 300
      for (let i = 0; i < energyAvailable % bodyCost; i++) {
        parts.push("move", "move", "carry", "carry", "work", );
      }
      // if we got at least 1 set of parts return it, otherwise try something smaller
      if (energyAvailable > bodyCost) {return parts}


      // the cheapest, that will focus on filling the spawn and extensions first
    case "general":
    default:
      bodyCost = 250
      for (let i = 0; i < energyAvailable % bodyCost; i++){
        parts.push("move", "move", "work", "carry");
      }
      // if we got at least 1 set of parts return it, otherwise if nothing return false
      if (energyAvailable > bodyCost){
        return parts
      }else{
        return false;
      }
  }
}



// export const planBodyParts = function ():{

// }



