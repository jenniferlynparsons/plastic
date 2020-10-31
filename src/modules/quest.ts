import Inventory from "./inventory";
// ~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~
// ## Quest

interface DataInterface {
  questType: string;
  name: string;
  state: string;
  inventory: {};
  precondition: () => boolean;
  postcondition: () => boolean;
}

// #### Quest
// The Quest creator function accepts a data object.
export class Quest {
  questType: string;
  name: string;
  state: string;
  inventory: {};
  precondition: () => boolean;
  postcondition: () => {};

  constructor(data: DataInterface) {
    this.questType = "";
    this.name = "";
    this.state = "";

    if (data.name && data.state) {
      this.name = data.name;
      this.state = data.state;
    }
    if (data.questType) {
      this.questType = data.questType;
    }
    data.precondition
      ? (this.precondition = data.precondition)
      : (this.precondition = () => true);

    data.postcondition
      ? (this.postcondition = data.postcondition)
      : (this.postcondition = () => true);

    data.inventory
      ? (this.inventory = new Inventory(data.inventory))
      : (this.inventory = new Inventory([]));
  }

  // #### changeState
  // Updates the Quest state and availability
  changeState() {
    if (this.isAvailable()) {
      this.state = "active";
    }
    if (this.isCompleteable()) {
      this.state = "closed";
    }
  }

  // #### isAvailable
  // Returns true if the Quest is available to start
  isAvailable() {
    return this.state == "open" && this.precondition();
  }

  // #### isActive
  // returns true if the Quest is active
  isActive() {
    return this.state == "active";
  }

  // #### isCompleteable
  // returns true if the Quest is complete
  isCompleteable() {
    return this.state == "active" && this.postcondition();
  }

  // #### isComplete
  // returns true if the Quest is complete
  isComplete() {
    return this.state == "closed";
  }

  // #### getState
  // returns the current Quest state string
  getState() {
    return this.state;
  }
}
