# Plastic
A flexible text-based rpg engine built in JavaScript.

plas·tic (plăs′tĭk)
adj.
1. Capable of being moulded; malleable, flexible, pliant. [from 17th c.]
2. (medicine, now rare) Producing tissue. [from 17th c.]
3. (dated) Creative, formative. [from 17th c.]
4. (biology) Capable of adapting to varying conditions; characterized by environmental adaptability.

## Purpose

The purpose of Plastic is to provide a simple to implement, flexible engine for handling character creation, meters, inventory and interactions in text-based games.
The language of the functions will be kept as agnostic as possible so as to accommodate any type of game the author imagines, from RPGs with battle mechanics to non-violent games that benefit from a similar mechanic but vastly different purpose.

## Game

### Structure
The game structure contains HTML skeleton of the game itself, as well as wrapping up the library of functions that control navigation, button clicks, form validation, etc. and the animation library. Additionally, the game is the container for the available grammars that contain the text, visuals, available inventory items, skills, etc. all of the settings below are created first in the game structure.

### User settings/Game controls
This object includes user settings such as whether audio is turned on or off, a user name and profile, and which game state is active if the user is allowed more than one open game at a time.

### Game State
The game state is an array of settings that determine the current state of the game including the progress (percentage complete, status of available and completed interactions, inventories, etc.) and saved state (true/false).
The game state also contains the available text and other elements of the game (visuals, music, etc.). This allows for randomization of the entire game based on available grammars either chosen by a user or generated randomly from a set of predetermined grammars.

### Character
A character is a container for a set of stats and are the means of interacting with inventories and interactions. A user may have multiple players.
They have a set of stats including things like meters (health, friendship), characteristics (visual look, personality) and roles (player/NPC, allowed skills and static buffs/handicaps).

## Interactions

### NPC interaction
Interaction with an NPC (or multiple NPCs) will effect the player character as well as the game state. NPCs can change character inventory and meters or be changed by them. NPC interactions can also lock or unlock sections of the game and assign tasks to player characters.

### Tasks
Tasks contain interactions a character must make to complete a goal. Tasks can effect player character stats and inventories, change game state, and contain their own inventories and group interactions, unlock/lock interactions. Their interactions can be limited to a specific order and their availability can be locked or unlocked by game state, interactions, and NPCs.

## Meters/Tracking

### Meters
Meters are simple integer ranges. They have a min and max, title, and purpose. The status of a meter can effect game state, character stats, other meters, and interaction availability. They can be limited by those same features.

### Roles
Character roles are used to determine available skills, gear, tools, etc. useable by the player. Roles can also change meters, adding or subtracting values. A character can have multiple roles (player/NPC, skill-based, etc.).

### Skills
Available skills are determined by roles and can effect and be effected by meters, tasks and inventories. The player can have a min/max number of skills.

### Inventory
Inventories are objects that contain other objects. They have a min, max and title, and can be auto-renewable or limited. They can contain other inventories. Inventories can have items taken from them, added to them, and the inventory can be locked or unlocked.

A note on caches : A cache is a special kind of inventory linked to an interaction rather than a character.

## Items

### Tools
Tools are used for interaction with the environment or other characters, causing change to meters, inventory, etc. They are objects that have settings such as what meters they effect and by how much as well as availability for use.

### Gear
Gear enhances or degrades meters and can be used to prevent or invite interaction from environment or other characters. Gear is either equipped or unequipped by a character. Gear can have a range of effectiveness and be enhanced or limited based on player roles.

### Consumables
Consumables can be used for acquiring, purging, creating, destroying other items as well as changing meters, skills, and roles.
