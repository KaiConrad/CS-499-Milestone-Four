#Kailey Conrad 8/13/2023
#Purpose: Create a text-based game where the player has to pick up 7 items before encountering Hades to win - if they meet him before hand, they lose.
#Self-Note: Create discriptions of rooms and their discriptions as well as items and their descriptions at later date.
    #Perhaps also give user more guidance as to what directions will work and when.

#Goals with final version:
    #Accept  broader inputs to make input less clunky w/ directions - DONE
    #Add descriptions for items - working
    #Add descriptions for rooms - working
    #Add more to failed ending
    #Add more to success ending - working
        #Add player's choice of reincarnation with or without knowing who they were before they died. - working


#Dictionary of rooms, directions and items.
rooms = {
    'Main Room': {'south': 'Painting Room', 'Item': 'Shard'},
    'Painting Room': {'west': 'Library', 'north': 'Main Room', 'Item': 'Photo'},
    'Library': {'south': 'Kitchen', 'north': 'Play Room', 'east': 'Painting Room', 'west': 'Throne Room', 'Item': 'Notebook'},
    'Kitchen': {'north': 'Library', 'east': 'Clock Room', 'Item': 'Childs Art'},
    'Clock Room': {'west': 'Kitchen', 'Item': 'Broken Clock' },
    'Play Room': {'south': 'Library', 'east':'Music Room', 'Item': 'Stuffed Toy'},
    'Music Room': {'west': 'Play Room', 'Item': 'Record'},
    'Throne Room': {'east': 'Library', 'Item': 'Hades'}

}


#Start the game in the main room.
state = 'Main Room'

#define how to move from room-to-room and update the player's location
def get_new_state(state, direction):
    new_state = state
    for i in rooms:
        if i == state:
            if direction in rooms[i]:
                new_state = rooms[i][direction]
    return new_state

#define how items are gotten - referenceing the information from the dictionary.
def getItem(state):
    return rooms[state]['Item']

#Create and later output instructions for the player to know how to play.
def instructions():
    print('Welcome to "Cycles". A game of life - or death.')
    print("Collect 7 artifacts. Reveal the truth.")
    print("Or don't and face the concequences. It's all up to you.")
    print("To move, simply enter the direction you'd like to go for example: go South, go North, go East, go West")
    print("To pick up an item and add it to your Inventory, simply: get 'item_name'")
    print("I think that's all you need.")
    print("--------------")

#output the instructions
instructions()

#Set a basis for the Inventory system - it's empty now.
Inventory = []

#List the items possible for collecting.
items = ['Shard', 'Photo', 'Notebook','Childs Art', 'Broken Clock', 'Stuffed Toy' , 'Record']

while(1):

    # Add IF room = x statements of the room and then output chunks of description matching those. Similar for IF item then itemdesc = description.
    #Output the state the player is in, their current inventory as well as possible items they could collect.
    print("Welcome, to the", state)
    if state == 'Main Room':
        print("You arrive in a desolate room. Spectral figures drift around without purpose, their translucent forms weaving mindlessly through the atmosphere.")
        print("Faint whispers of long forgotten conversations hang in the air, a symphony of dead language.")
        print("The emptiness of the room tuggs at you, beckoning you to stay.")

    print('Your current inventory includes:', Inventory)
    if len(Inventory) < 7:
        print("Looks like there's still room for more stuff.")
    if len(Inventory) == 7:
        print("Woah, that's a lot of stuff. I don't think your inventory has room for anything else.")

    item = getItem(state)

    print("You take a moment to look around the room again and find a", item)
    #nest if statements in here or above the previous print for if item == then "desc"
    if item == 'Shard':
        print("The glimmering shard emits a soft, etherial light that dances and flickers like a distant star.")
        print("It's surface is smoothed and polished, adorned with inticate, swirling patterns that seem to shift with every pasing moment.")
        print("You don't even need to touch it - just standing near it allows you to bask in a subtle pulsating warmth that resonates with the faint echo of life's essence.")
    if item == 'Photo':
        print("The photo, aged by time and tears captures a moment of two children, side by side, backlit by a neverending sunset.")
        print("Their faces, once vibrant are now obscured by a dream-like haze, blanketing their identies in mystery.")
        print("Dispite the lack of clear features, their intertwined hands and joyus posture evoke a familiarity in your soul.")
        print("On the bottom edge of the photo, you can just make out the words: 'A & B, SUMMER 20--' the last two digits of the year smudged by the writer's hand.")
    if item == 'Notebook':
        print("The glimmering shard emits a soft, etherial light that dances and flickers like a distant star.")
    if item == 'Childs Art':
        print("The glimmering shard emits a soft, etherial light that dances and flickers like a distant star.")
    if item == 'Broken Clock':
        print("The glimmering shard emits a soft, etherial light that dances and flickers like a distant star.")
    if item == 'Stuffed Toy':
        print("The glimmering shard emits a soft, etherial light that dances and flickers like a distant star.")
    if item == 'Record':
        print("The glimmering shard emits a soft, etherial light that dances and flickers like a distant star.")


    print('-------')

    #If the item in the room is Hades, end the game if items collected are < 7, if items collected = 7, player wins.
    if item == 'Hades':
        if len(Inventory) < 7:
            print("He shoots you a cold glare, and suddenly...nothing. Not a single thing. It's an endless black abyss, and the GAME of Cycles is now OVER")
            exit(0)
        if len(Inventory) == 7:
            print("He welcomes you into his throne room. You tell him of the items you collected. Of who you were - of who you are. He replies with a simple nod.")
            choice = input("You're faced with a decidion. Do you want to remember? Yes, or no?")
            if choice == str('yes').lower():
                print("So, you choose to remember.")
            if choice == str('no').lower():
                print("Ah, you choose to forget.")
            print("Congratulations, you have completed the game of Cycles.")
            exit(0)

    #Ask player what action they would like to take, only allowing cardnial directions and the getting of the item within the room.
    #If they do not put an acceptiable direction output an error message.
    direction = input('Which direction would you like to go? Or, alternatively, would you like to get the item in the room?').lower()
    if direction == 'go east' or direction=='go west' or direction=='go north' or direction=='go south':
        direction=direction[3:]
        new_state = get_new_state(state, direction)
        if new_state == state:
            print ("There's a wall there. Try another direction.")
        else:
            state = new_state
    elif direction == str('get ' + item).lower():
        # If the item is available for them to pick up, add it to their inventory oterwise output an error message.
        if item in Inventory:
            print('Taking a second glance, it seems that item is just a mirage - an impression left behind by the item currently in your inventory.')
        else:
            Inventory.append(item)
    #If player inputs something that is otherwise not triggering an action or error message, output an error message.
    else:
        print("Looks like you can't do that. Try another direction or item. Maybe that'll work.")


