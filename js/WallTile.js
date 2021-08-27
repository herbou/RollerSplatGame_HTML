class WallTile extends Tile {

  constructor(coordinates){
    super(coordinates);

    this.domObj.classList.add("wall-tile");
  }

}