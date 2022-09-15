


// Spawn a worthless to suicide for debugging purposes
Game.spawns['Spawn1'].spawnCreep([MOVE], 'suicider123', {
    memory: {
        role: 'suicider',
        roleNum : 1
    }
})

Game.spawns['Spawn1'].spawnCreep([MOVE], 'suicider123', {memory: {role: 'suicider', roleNum: 1}})






// Emojis
// ❌  ✔️
// 🔴 🟠 🟡 🟢 🔵 🟣 ⚫️ ⚪️ 🟤
// 🟥 🟧 🟨 🟩 🟦 🟪 ⬛️ ⬜️ 🟫
//  ⚙️  💥  🔅  🔆  🥓  🍰  🎂  🏎  🏍  ⚓️  💡  🔒  📈  📉  💢  ❗️  ❓  🌀  🎵  💲


// 🔵 = Creep doing it's main job
// 🟣 = Creep doing a fallback job

// 🟤 = Building doing it's job

// 🔴 = Thing is under attack!


// 🔨 = Build
// 🔧 = Repair
// ⚡️ = Upgrade
// 💰 = Store 
// ❗️❓ =confused
// ✔️ = Good / Succeeded
// ❌ = Bad / Failed