
class Node {
  constructor(id, gridButton) {
    this.id = id
    this.gridButton = gridButton
    this.active = false
    this.isDefault = false;
    this.neighbors = []
  }

  update(isFinal = false) {
    if (isFinal) {
      document.getElementById("button" + this.id).src = "images/buttonFinal.gif";
    }
    else if (this.active) {
      document.getElementById("button" + this.id).src = "images/buttonOn.png";
    }
    else {
      document.getElementById("button" + this.id).src = "images/buttonOff.png";
    }
  }

  buttonHover(isHovering) {
    let str = "images/button";
    if (this.active) {
      str += "On";
    }
    else {
      str += "Off";
    }

    if (isHovering) {
      str += "Hover";
    }

    document.getElementById("button" + this.id).src = str + ".png";
  }

  buttonPressed() {
    this.active = !this.active;
    this.update();
  }
}

export default Node;
