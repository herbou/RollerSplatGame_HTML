class Vector2 {

  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  add(vector){
    return new Vector2(this.x+vector.x, this.y+vector.y);
  }

  static right = new Vector2(0,1);
  static left  = new Vector2(0,-1);
  static up    = new Vector2(-1,0);
  static down  = new Vector2(1,0);

}
