# plastic
A flexible text-based rpg engine built in JavaScript.

plas·tic  (*plăs′tĭk*)
*adj.*
1. Capable of being moulded; malleable, flexible, pliant. [from 17th c.]
2. *(medicine, now rare)* Producing tissue. [from 17th c.]
3. *(dated)* Creative, formative. [from 17th c.]
4. *(biology)* Capable of adapting to varying conditions; characterized by environmental adaptability.

## Purpose
The purpose of plastic is to provide a simple, flexible engine for handling character creation, meters, inventory and interactions in text-based games.

The language of the functions will be kept as agnostic as possible so as to accommodate any type of game the author imagines, from RPGs with battle mechanics to non-violent games that benefit from a similar mechanic but vastly different purpose.

## Current Status
ACTIVE DEVELOPMENT: [STAGE 1](https://github.com/jenniferlynparsons/plastic/tree/STAGE1) is the current stable build.

### Currently, the library provides functions that allow a developer to:
- create basic items
- create basic inventories
- create basic characters
- create basic quests
- update quest status
- do basic inventory item trades between characters
- various other helper functions

For more complete details, [please see the documentation](https://jenniferlynparsons.github.io/plastic/).


## Planned features

### Phase one
- a basic library of functions for controlling gameplay and character creation/tracking
- creation of demo games

At this phase, the author would implement the library into the game themselves, requiring front-end coding skills.

### Phase two
- integration with a persistent memory system (database?)
- refinement of library functions

This phase allows for saved games and enables the end user to start on one platform and continue on another, provided the game is hosted on an accessible server.

### Phase three
- a backend UI for writing games
- a frontend for playing games
- a method for exporting/packaging games for distribution

This phase establishes the most important feature of the tool: use by less technical authors to create games. This phase functions closer to a blogging system where the author writes the interactions and provides desired settings (inventory limits, names of interactions, etc.) for gameplay. The final game can be exported for distribution. The final format is yet to be determined.

## Interaction features
pickup/drop off
- rewards retrieve/discard

NPC interaction
- vitals counter
- rewards
- turn counter/toggle

tasks
- vitals counter
- rewards

## Meters/Tracking features
vitals meter
- custom range
- custom title/purpose
- repeatable
- positive and negative values
can be used for friendship meter, health meter, resource meter, etc.

inventory
- custom maximum
- custom minimum for auto re-equipping
- repeatable
- sub-categories
can have subcategories or multiple instances to track materials, weapons, gifts, etc.

utilities/tools
- take or give
- custom purpose
can be used for interaction with environment or other characters

gear
- enhance or degrade
can be used to prevent or invite interaction from environment or other characters

consumables
- take or give
- custom purpose
can be used for acquiring, purging, creating, destroying other items

skills
- active/inactive
- limit slots for use
useful for characters that have various abilities outside of tools/gear

role
- custom types for limiting skills, gear, tools, etc.
- adds/subtracts attributes




> ✨ Bootstrapped with Create Snowpack App (CSA).

## Available Scripts

### npm start

Runs the app in the development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.
Your app is ready to be deployed!

**For the best production performance:** Add a build bundler plugin like [@snowpack/plugin-webpack](https://github.com/snowpackjs/snowpack/tree/master/plugins/plugin-webpack) or [snowpack-plugin-rollup-bundle](https://github.com/ParamagicDev/snowpack-plugin-rollup-bundle) to your `snowpack.config.json` config file.

### Q: What about Eject?

No eject needed! Snowpack guarantees zero lock-in, and CSA strives for the same.