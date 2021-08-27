class Ball {

  constructor(){
    this.domObj = document.querySelector(".ball");

    this.setPosition(Level.defaultBallRoadTile);
    this.setSize(Level.tileWidth);
    this.setColor(Level.paintColor);
    
    this.domObj.style.opacity = "1";
  }

  setSize(width_px){
    this.domObj.style.width = `${width_px}px`;
  }

  setColor(color){
    document.querySelector(".ball .circle")
      .style.backgroundColor = color;
  }

  setPosition(targetTile){
    this.coordinates = targetTile.coordinates;
    this.currentRoadTile = targetTile;

    this.domObj.style.left = `${Level.tileWidth * this.coordinates.y}px`;
    this.domObj.style.top  = `${Level.tileWidth * this.coordinates.x}px`;
  }

}