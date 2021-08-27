
let levelNumber = parseInt(window.localStorage.getItem("level") || 0);
let color = colors[levelNumber%colors.length];

const currentLevel = new Level(color, levels[levelNumber]);
const ball = new Ball();

const game = new Game(levelNumber, color, currentLevel, ball)


// Fade out effect in the start: 
const fade = document.querySelector(".fade");
fade.style.backgroundColor = "transparent";
setTimeout (()=>fade.style.pointerEvents = "none", 500)




// Show msg in the last level:
if (levelNumber == levels.length-1)
  showLastLevelThing()

function showLastLevelThing(){
  setTimeout (()=>{
    let msg = document.createElement("b")
    msg.innerText = "Sorry, this is the last level and I can't let you win ;) ."
    msg.style.position = "absolute"
    msg.style.opacity = ".7"
    msg.style.maxWidth = "450px"
    msg.style.left = "50%"
    msg.style.top = "10px"
    msg.style.transform = "translateX(-50%)"
    document.body.appendChild(msg)
  },5000)
}






// Reset button:
const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", _=>{
  if(confirm("Are you sure you want to reset the game?")){
    window.localStorage.setItem("level", 0)
    window.location.reload();
  }
})





// Add listeners to arrow keys (keyboard) :
document.addEventListener("keyup", e=>handleUserInput(e.key));

function isArrowKey(keyName){
  return keyName.startsWith("Arrow");
}


// Add listeners to arrow keys (ui) :
const btnArrows = document.querySelectorAll(".btn");
btnArrows.forEach(btn => btn.addEventListener("click", e=>handleUserInput(e.target.id)));


function handleUserInput(key){
  if (game.isUserInputEnabled && !game.isLevelCompleted && isArrowKey(key)){
    let moveDirection = getMoveDirection(key);
    game.moveAndPaint(moveDirection);
  }
}


function getMoveDirection(key){
  let direction = new Vector2(0, 0);
    switch (key){
      case "ArrowLeft"  : direction = Vector2.left;  break;
      case "ArrowRight" : direction = Vector2.right; break;
      case "ArrowUp"    : direction = Vector2.up;    break;
      case "ArrowDown"  : direction = Vector2.down;  break;
      
      default : this.isUserInputEnabled = true; return null;
    }

  return direction
}






// Dark theme toggle:
const darkThemeToggle = document.querySelector(".dark-theme-toggle")

const savedTheme = window.localStorage.getItem("theme") || "light"
toggleTheme((darkThemeToggle.checked = savedTheme=="dark"))

darkThemeToggle.addEventListener("change", _=> {
  toggleTheme(darkThemeToggle.checked)
  window.localStorage.setItem("theme", darkThemeToggle.checked?"dark":"light")
})

function toggleTheme(isDarkThemeChecked){
  document.body.classList.toggle("dark-theme", isDarkThemeChecked)
}







// UI buttons toggle:
const uiKeysToggle = document.querySelector(".ui-keys-toggle")
const uiKeys       = document.querySelector(".keys")

const uiKeysEnabled = window.localStorage.getItem("ui-keys-enabled") || "true"
toggleUiKeys((uiKeysToggle.checked = uiKeysEnabled=="true"))

uiKeysToggle.addEventListener("change", _=> {
  toggleUiKeys(uiKeysToggle.checked)
  window.localStorage.setItem("ui-keys-enabled", uiKeysToggle.checked?"true":"false")
})

function toggleUiKeys(isUiKeysEnabled){
  uiKeys.classList.toggle("enabled",isUiKeysEnabled)
}



