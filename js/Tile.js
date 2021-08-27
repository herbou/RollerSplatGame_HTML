class Tile {

  constructor(coordinates){
    this.domObj = document.createElement("div");
    this.domObj.classList.add("tile");

    this.type = this.constructor.name;
    this.coordinates = coordinates;
  }

}