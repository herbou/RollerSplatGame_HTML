class Level {
  static tileWidth;
  static paintColor;
  static defaultBallRoadTile;

  constructor(paintColor, levelData){
    Level.paintColor  = paintColor;

    this.levelData   = levelData;
    this.domObj      = document.querySelector(".level");


    this.rows = this.levelData.length;
    this.columns = this.levelData[0].length;



    this.TILE_TYPE_ROAD = 0;
    this.TILE_TYPE_WALL = 1;

    this.tiles = [];
    this.roadTilesCount = 0;
    this.paintedTilesCount = 0;


    
    this.fixArrayBorders()

    this.generateTiles()
    // Paint default ball road tile :
    this.paintTile(Level.defaultBallRoadTile);
    
  }

  fixArrayBorders() {
    //fix levelData ,all borders should be == 1
    for (let i=0; i<this.rows; i++){
      this.levelData[i][0] = 1;
      this.levelData[i][this.columns-1] = 1;
    }
    for (let i=1; i<this.columns-1; i++){
      this.levelData[0][i] = 1;
      this.levelData[this.rows-1][i] = 1;
    }
  }

  generateTiles(){
    for (let i=0; i<this.rows; i++){
      let tilesArray = [];
      for (let j=0; j<this.columns; j++){
        const tileType = this.levelData[i][j] ; // 0: Wall tile  ,   1: Road tile
        let tile = this.drawTile(tileType, new Vector2(i,j));
        tilesArray = [...tilesArray, tile];

        //count road tiles :
        if (tile.type == "RoadTile"){
          this.roadTilesCount++;

          if (Level.defaultBallRoadTile == null)
            Level.defaultBallRoadTile = tile;
        }
      }
      this.tiles = [...this.tiles, tilesArray]
    }

    this.domObj.style.gridTemplateRows    = `repeat(${this.rows}, 1fr)`;
    this.domObj.style.gridTemplateColumns = `repeat(${this.columns}, 1fr)`;

    //get tile width:
    this.calculateTileWidth();
  }

  calculateTileWidth(){
    Level.tileWidth = this.domObj.clientWidth/this.columns;
  }

  drawTile(tileType, coords){
    let tile;

    if (tileType == this.TILE_TYPE_ROAD)    
      tile = new RoadTile(coords)
    else if (tileType == this.TILE_TYPE_WALL)    
      tile = new WallTile(coords)

    this.domObj.appendChild(tile.domObj);

    return tile;
  }

  paintTile(roadTile){
    if (roadTile.isPainted)
      return;

    roadTile.paint(Level.paintColor);
    this.paintedTilesCount++;
  }

  getTile(coords){
    return this.tiles[coords.x][coords.y];
  }

  getNextTile(currentTile, direction){
    let nextCoords = currentTile.coordinates.add(direction);

    return this.getTile(nextCoords);
  }
  
  canMove(currentTile, direction){
    return this.getNextTile(currentTile, direction).type == "RoadTile";
  }

  markLevelAsCompleted(){
    this.domObj.classList.add("completed")
  }
}
