
// Kailey Conrad  - Python game updated: 8/13/2023     JS Game Updated: 5/25/2025
// Purpose: Create text-based game in JavaScript from old Python game

// const of all the rooms in the game, and where they are in relation to the other rooms
const rooms = {
    "Main Room": { south: "Painting Room", Item: "Shard" },
    "Painting Room": { west: "Library", north: "Main Room", Item: "Photo" },
    "Library": { south: "Kitchen", north: "Play Room", east: "Painting Room", west: "Throne Room", Item: "Notebook" },
    "Kitchen": { north: "Library", east: "Clock Room", Item: "Childs Art" },
    "Clock Room": { west: "Kitchen", Item: "Broken Clock" },
    "Play Room": { south: "Library", east: "Music Room", Item: "Stuffed Toy" },
    "Music Room": { west: "Play Room", Item: "Record" },
    "Throne Room": { east: "Library", Item: "Hades" }
};

//setting the default state as the main room
let state = "Main Room";

//setting default inventory as blank as no items have been picked up yet
let inventory = [];

//const of all items that are able to be picked up
const items = ['Shard', 'Photo', 'Notebook', 'Childs Art', 'Broken Clock', 'Stuffed Toy', 'Record'];

//instrucctions so that any player can play the game
function instructions() {
    alert(
        `Welcome to "Cycles". A game of life - or death.\n` +
        "Collect 7 artifacts. Reveal the truth.\n" +
        "Or don't and face the consequences.It's all up to you.\n" +
        "To move, simply enter the direction you'd like to go for example: go South, go North, go East, go West\n" +
        "To pick up an item and add it to your Inventory, simply: get 'item_name'\n" +
        "I think that's all you need to know.\n" +
        "--------------"
    );
}

//get state function  to get the room from direction
function getNewState(currentState, direction) {
    const room = rooms[currentState];
    if (room && room[direction]) {
        return room[direction];
    }
    return currentState;
}

// get item function, gets the room's item
function getItem(state) {
    return rooms[state].Item;
}

// room descriptions
function describeRoom(state) {
    if (state === "Main Room") {
        console.log("You arrive in a desolate room. Spectral figures drift around...");
        console.log("Faint whispers of long forgotten conversations hang in the air...");
        console.log("The emptiness of the room tugs at you, beckoning you to stay.");
    }
    if (state === "Painting Room") {
        console.log("You arrive in a desolate room. Spectral figures drift around...");
        console.log("Faint whispers of long forgotten conversations hang in the air...");
        console.log("The emptiness of the room tugs at you, beckoning you to stay.");
    }
    if (state === "Library") {
        console.log("You arrive in a desolate room. Spectral figures drift around...");
        console.log("Faint whispers of long forgotten conversations hang in the air...");
        console.log("The emptiness of the room tugs at you, beckoning you to stay.");
    }
    if (state === "Kitchen") {
        console.log("You arrive in a desolate room. Spectral figures drift around...");
        console.log("Faint whispers of long forgotten conversations hang in the air...");
        console.log("The emptiness of the room tugs at you, beckoning you to stay.");
    }
    if (state === "Clock Room") {
        console.log("You arrive in a desolate room. Spectral figures drift around...");
        console.log("Faint whispers of long forgotten conversations hang in the air...");
        console.log("The emptiness of the room tugs at you, beckoning you to stay.");
    }
    if (state === "Play Room") {
        console.log("You arrive in a desolate room. Spectral figures drift around...");
        console.log("Faint whispers of long forgotten conversations hang in the air...");
        console.log("The emptiness of the room tugs at you, beckoning you to stay.");
    }
    if (state === "Music Room") {
        console.log("You arrive in a desolate room. Spectral figures drift around...");
        console.log("Faint whispers of long forgotten conversations hang in the air...");
        console.log("The emptiness of the room tugs at you, beckoning you to stay.");
    }
    if (state === "Throne Room") {
        console.log("You arrive in a desolate room. Spectral figures drift around...");
        console.log("Faint whispers of long forgotten conversations hang in the air...");
        console.log("The emptiness of the room tugs at you, beckoning you to stay.");
    }
    // NEED TO: Add in the other rooms, flesh out the full descriptions.
}

//item descriptions - unfinished with placeholders.
function describeItem(item) {
    switch (item) {
        case "Shard":
            console.log("The glimmering shard emits a soft, ethereal light...");
            break;
        case "Photo":
            console.log("The photo, aged by time, shows two children under a sunset...");
            break;
        case "Notebook":
            console.log("The glimmering shard emits a soft, ethereal light... (placeholder)");
            break;
        case "Childs Art":
            console.log("The glimmering shard emits a soft, ethereal light... (placeholder)");
            break;
        case "Broken Clock":
            console.log("The glimmering shard emits a soft, ethereal light... (placeholder)");
            break;
        case "Stuffed Toy":
            console.log("The glimmering shard emits a soft, ethereal light... (placeholder)");
            break;
        case "Record":
            console.log("The glimmering shard emits a soft, ethereal light... (placeholder)");
            break;
    }
}
//NEED TO: copy paste descriptions from the python code to fully flesh out the items.

// Save/Load functions that save player data locally

async function saveGame(playerName) {
    const saveData = { playerName, state, inventory };
    try {
        const response = await fetch("http://localhost:3000/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(saveData)
        });
        if (response.ok) console.log("Game saved successfully.");
        else console.error("Failed to save game.");
    } catch (error) {
        console.error("Error saving game:", error);
    }
}

async function loadGame(playerName) {
    try {
        const response = await fetch(`http://localhost:3000/load/${playerName}`);
        if (response.ok) {
            const data = await response.json();
            state = data.state;
            inventory = data.inventory;
            console.log("Game loaded successfully.");
        } else {
            //no save found
            console.log("No save found for that player.");
        }
    } catch (error) {
        console.error("Error loading game:", error);
    }
}

// main game loop with the addition of being able to save/load and enter player name

async function main() {
    const playerName = prompt("Enter your player name:");

    const load = prompt("Do you want to load your last game? (yes/no)").toLowerCase();
    if (load === "yes") {
        await loadGame(playerName);
    }

//while there is a player, the game loop begins
while (true) {
    console.log(`Welcome, to the ${state}`);
    describeRoom(state);
    console.log(`Your current inventory: [${inventory.join(", ")}]`);
    console.log(inventory.length < 7 ? "Looks like there's still room for more stuff." : "Your inventory is full.");

    const item = getItem(state);
    console.log(`You take a moment to look around the room again and find a ${item}.`);
    describeItem(item);

    //adding in combat functionality for if in the last room with Hades
    if (item === "Hades") {
        if (inventory.length < 7) {
        console.log("He shoots you a cold glare... You are not ready. The GAME of Cycles is now OVER.");
        console.log("Suddenly, Hades attacks you!");

        //combat triggered if inventory < 7, sets health as a new parameter
        let playerHealth = 10;
        let hadesHealth = 100;

        //combat loop - randomized attack values
        //hades attacks first
        while (playerHealth > 0 && hadesHealth > 0) {
            const hadesAttack = Math.floor(Math.random() * 10) + 1;
            playerHealth -= hadesAttack;
            console.log(`Hades attacks! You take ${hadesAttack} damage. Your health is now ${playerHealth}.`);

            if (playerHealth <= 0) {
                console.log("You fall to the ground, overwhelmed by darkness.");
                console.log("GAME OVER.");
                break;
            }

            //Player has option to attack or flee
            const action = prompt("Do you ATTACK or FLEE?").toLowerCase();

            //if they attack, their attack is randomized, if they flee, there is a chance that they successfully flee, or fail
            if (action === "attack") {
                const playerAttack = Math.floor(Math.random() * 5) + 1;
                hadesHealth -= playerAttack;
                console.log(`You strike back! You deal ${playerAttack} damage. Hades' health is now ${hadesHealth}.`);
            } else if (action === "flee") {
                const escapeChance = Math.floor(Math.random() * 10) + 1;
                if (escapeChance > 5) {
                    console.log("You manage to flee, barely escaping with your life.");
                    // Move player back to Library to collect more items
                    state = "Library";
                    break;
                } else {
                    console.log("You try to flee, but Hades blocks your path!");
                    // Loop continues, Hades will attack again
                }
            } else {
                console.log("You hesitate... and Hades takes the opportunity to strike again.");
                // No action taken, loop continues
            }
        }
        break;
    } else {
        //if they have all the items, there is the good ending interaction, then game end
        console.log("You tell him of the items you collected. He replies with a nod.");
        const choice = prompt("You're faced with a decision. Do you want to remember? Yes, or no?").toLowerCase();
        if (choice === "yes") {
            console.log("So, you choose to remember.");
        } else {
            console.log("Ah, you choose to forget.");
        }
        console.log("Congratulations, you have completed the game of Cycles.");
        break;
    }
    }
    //NEED TO fully copy over interaction from python.

    //prompt to get direction or item grab from player
    let input = prompt("Which direction would you like to go? Or would you like to get the item in the room?").toLowerCase();

    //basic error handling
    if (input.startsWith("go ")) {
        let direction = input.slice(3).trim();
        const newState = getNewState(state, direction);
        if (newState === state) {
            console.log("There's a wall there. Try another direction.");
        } else {
            state = newState;
        }
    } else if (input === `get ${item.toLowerCase()}`) {
        if (inventory.includes(item)) {
            console.log("That item is just a mirage - it's already in your inventory.");
            //creative: maybe instead of mirage, player passes through item 'oh look - it's already in your inventory type idea'
        } else {
            inventory.push(item);
            console.log(`${item} added to inventory.`);
        }
    } else {
        console.log("Looks like you can't do that. Try another direction.");
    }

    console.log("-------");
}}
