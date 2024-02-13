
class Grid {
  constructor(size = 3) {
    this.size = size
    this.listOfButtons = []
    this.listOfNodes = []
    this.listOfDefaultNodes = []
    this.progress = 0;
  }

  setGrid() {
    let j = Math.floor((Math.random() * this.size)) + 1;
    this.listOfDefaultNodes = []
    for (let i = 0; i < j; i++) {
      let k = Math.floor((Math.random() * this.size * this.size));
      this.listOfDefaultNodes.push(k);
    }

    for (let i = 0; i < this.size * this.size; i++) {
      // SET NEIGHBORS ///////////////////////////////////////////////////////////
      this.listOfNodes[i].neighbors = [];

      let leftCheck1 = ((i - 1) % this.size) != -1;
      let leftCheck2 = ((i - 1) % this.size) != this.size - 1;
      if (leftCheck1 && leftCheck2) {  // LEFT NODE
        this.listOfNodes[i].neighbors.push(this.listOfNodes[i - 1]);
      }
      let rightCheck1 = (i + 1) <= this.size * this.size - 1;
      let rightCheck2 = ((i + 1) % this.size) != 0;
      if (rightCheck1 && rightCheck2) {  // RIGHT NODE
        this.listOfNodes[i].neighbors.push(this.listOfNodes[i + 1]);
      }
      if ((i - this.size) >= 0) {    // TOP NODE
        this.listOfNodes[i].neighbors.push(this.listOfNodes[i - this.size]);
      }
      if ((i + this.size) <= (this.size * this.size) - 1) {    // BOTTOM NODE
        this.listOfNodes[i].neighbors.push(this.listOfNodes[i + this.size]);
      }

      // SET DEFAULTS ////////////////////////////////////////////////////////////
      this.listOfNodes[i].isDefault = this.listOfDefaultNodes.includes(i);
      this.listOfNodes[i].active = this.listOfDefaultNodes.includes(i);
      this.listOfNodes[i].update();
    }

    this.progressUpdate();
  }

  resetGrid() {
    for (let i = 0; i < this.size * this.size; i++) {
      this.listOfNodes[i].active = this.listOfNodes[i].isDefault;
      this.listOfNodes[i].update();
    }

    this.progressUpdate();
  }

  buttonPressed(index) {
    if (this.progress == (this.size * this.size)) {
      return;
    }
    this.listOfNodes[index].buttonPressed();
    for (let i = 0; i < this.listOfNodes[index].neighbors.length; i++) {
      this.listOfNodes[index].neighbors[i].buttonPressed();
    }
    this.progressUpdate();
  }

  progressUpdate() {
    this.progress = 0;
    for (let i = 0; i < (this.size * this.size); i++) {
      if (!this.listOfNodes[i].active) {
        this.progress++;
      }
    }
  }

  gridComplete() {
    for (let i = 0; i < (this.size * this.size); i++) {
      this.listOfNodes[i].update(true);
    }
  }
}

export default Grid;
