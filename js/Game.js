class Game {

  constructor(levelNumber, color, level, ball){
    // DOM references :
    this.levelNumberUI   = document.querySelector(".level-number")

    this.levelNumber     = levelNumber //starts from 0
    this.color           = color
    this.currentLevel    = level
    this.ball            = ball
    this.isLevelCompleted   = false
    this.isUserInputEnabled = true
    this.roadTiles = []


    this.initializeLevel()
  }



  initializeLevel(){
    this.updateLevelNumberUI();

    // Recalculate tile width and ball size on screen change:
    window.addEventListener("resize", _=>this.recalculateTilesAndBallPosition())
  }


  updateLevelNumberUI(){
    this.levelNumberUI.innerText = this.levelNumber+1
  }


  moveAndPaint(direction){
      if (!this.isUserInputEnabled)
        return;

      this.isUserInputEnabled = false;

      //Get the target tile & move the ball to that target :
      let targetRoadTile = this.getTargetTile(direction);

      this.moveBall(targetRoadTile);
      
      this.paintTiles(this.roadTiles);

      this.checkIfLevelCompleted();
      
      this.isUserInputEnabled = true;
  }


  getTargetTile(direction){
    let targetRoadTile = this.ball.currentRoadTile;
    const canMoveInDirection = this.currentLevel.canMove(this.ball.currentRoadTile, direction)

    if (canMoveInDirection){
      this.roadTiles = [];
      let nextTile = this.ball.currentRoadTile;

      do {
        nextTile = this.currentLevel.getNextTile(nextTile, direction);
        if (nextTile.type == "RoadTile")
          this.roadTiles.push(nextTile);
      }while (nextTile.type == "RoadTile");
    
      if (this.roadTiles.length > 0)
        targetRoadTile = this.roadTiles[this.roadTiles.length-1];
    
    }
    return targetRoadTile;
  }


  moveBall(targetRoadTile){
    this.ball.setPosition(targetRoadTile);
  }


  paintTiles(tiles){
    if (tiles == null)
      return;

    tiles.forEach(tile => this.currentLevel.paintTile(tile));
  }


  checkIfLevelCompleted(){
    if (this.currentLevel.paintedTilesCount == this.currentLevel.roadTilesCount){
      this.isLevelCompleted = true;
      this.currentLevel.markLevelAsCompleted();

      setTimeout(() => this.loadNextLevel(), 1000);
    }
  }


  loadNextLevel(){
    if (this.levelNumber == levels.length-1)
      alert("No more levels available");

    this.levelNumber = (this.levelNumber==levels.length-1)
                          ?this.levelNumber: (this.levelNumber+1)

    window.localStorage.setItem("level", this.levelNumber)
    window.location.reload();
  }


  recalculateTilesAndBallPosition(){
    this.currentLevel.calculateTileWidth();
    this.ball.setPosition(ball.currentRoadTile);
    this.ball.setSize(Level.tileWidth);
  }


}

