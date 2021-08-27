class RoadTile extends Tile {

  constructor(coordinates){
    super(coordinates);

    this.domObj.classList.add("road-tile");
    this.isPainted = false;
  }

  paint(color){
    if (!this.isPainted){
      this.domObj.style.backgroundColor = color;
      this.isPainted = true;
    }
  }

}