(function() {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
		window.requestAnimationFrame = requestAnimationFrame
})()

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")


//temporary map initialization
	Game.walls.push({
		x:0,
		y:0,
		width:5,
		height:480
	})
	Game.walls.push({
		x:0,
		y:0,
		width:640,
		height:5
	})
	Game.walls.push({
		x:0,
		y:475,
		width:640,
		height:5
	})
	Game.walls.push({
		x:635,
		y:0,
		width:5,
		height:480
	})
	Game.walls.push({
		x:100,
		y:400,
		width:440,
		height:80
	})
	Game.walls.push({
		x:0,
		y:250,
		width:150,
		height:50
	})
	Game.traps.push({
		x:5,
		y:440,
		width:95,
		height:35
	})

//game loop
function gameLoop() {

	// P1 keys
	if (Game.keys[87]) {

		// up [w]

	}
	if (Game.keys[82] || Game.keys[84]) {

		// X/Y [r][t] - jump
		if (!Game.player1.jumping && Game.player1.grounded) {
			Game.player1.jumping = true
			Game.player1.grounded = false
			Game.player1.velY = -Game.player1.jumpHeight
			Game.keys[82] = false //to prevent instaneous use of double jump
			Game.keys[84] = false
		} else if (!Game.player1.doubleJumping) {
			Game.player1.jumping = true
			Game.player1.doubleJumping = true
			Game.player1.grounded = false
			Game.player1.velY = -Game.player1.jumpHeight
      if (Game.keys[68]) {
        if(Game.player1.velX <= Game.player1.walkSpeed/2){
          Game.player1.velX = Game.player1.walkSpeed/2
        }
      }
      if (Game.keys[65]) {
        if(Game.player1.velX >= -(Game.player1.walkSpeed/2)){
          Game.player1.velX = -(Game.player1.walkSpeed/2)
        }
      }
			Game.keys[82] = false
			Game.keys[84] = false
		}

	}

	if (Game.keys[68]) {

		// right [d] - move
		if (Game.player1.grounded) {

			if (Game.player1.velX + Game.player1.groundControl	<= Game.player1.walkSpeed){
				Game.player1.velX += Game.player1.groundControl
			} else if (Game.player1.velX <= Game.player1.walkSpeed) {
        Game.player1.velX = Game.player1.walkSpeed
      }

		} else {
				Game.player1.velX += Game.player1.airControl
		}

	}

	if (Game.keys[65]) {

		// left [a] - move
    if (Game.player1.grounded) {

			if (Game.player1.velX - Game.player1.groundControl	>= -Game.player1.walkSpeed){
				Game.player1.velX -= Game.player1.groundControl
			} else if (Game.player1.velX >= -Game.player1.walkSpeed) {
        Game.player1.velX = -Game.player1.walkSpeed
      }

		} else {
				Game.player1.velX -= Game.player1.airControl
		}

	}

	if (Game.keys[83]) {

		// down [s]

	}

	//physics
		//friction
		if (Game.player1.grounded) {
			Game.player1.velX *= 0.85
		} else {
			Game.player1.velX *= 0.975
		}

		//gravity
		if (Game.player1.velY + Game.player1.fallAcceleration <= Game.player1.fallSpeed) {
			Game.player1.velY += Game.player1.fallAcceleration
		} else {
			Game.player1.velY = Game.player1.fallSpeed
		}

		//movement
		Game.player1.x += Game.player1.velX
		Game.player1.y += Game.player1.velY

	//collision check
	Game.player1.grounded = false
	for (var i = 0; i < Game.walls.length; i++) {
		var dir = physics.colCheck(Game.player1, Game.walls[i])
		if (dir === "l" || dir === "r") {
			//sides
			Game.player1.velX = 0;
			Game.player1.jumping = false;
		} else if (dir === "b") {
			//ground
			Game.player1.grounded = true;
		} else if (dir === "t") {
			//celling
			Game.player1.velY *= 0;
		}
	}

	if (Game.player1.grounded) {
		Game.player1.jumping = false
		Game.player1.doubleJumping = false
		Game.player1.velY = 0
	}

	//idk what comment should be put here
	redraw()
	requestAnimationFrame(gameLoop)

}

function redraw() {

  ctx.globalAlpha = 1
  //background
  ctx.fillStyle = "#cfcfcf"
	ctx.fillRect(0, 0, canvas.width ,canvas.height)
	//player1
	ctx.fillStyle = "red"
	ctx.fillRect(Game.player1.x, Game.player1.y, Game.player1.width, Game.player1.height)
  //player2
	// ctx.fillStyle = "blue"
	// ctx.fillRect(Game.player2.x, Game.player2.y, Game.player2.width, Game.player2.height)

  //walls
	ctx.fillStyle = "black";
	ctx.beginPath();
	for (var i = 0; i < Game.walls.length; i++) {
		ctx.rect(Game.walls[i].x, Game.walls[i].y, Game.walls[i].width, Game.walls[i].height);
	}
	ctx.fill();

  //traps
  // ctx.globalAlpha = 0.75
  // ctx.fillStyle = "#bb4400";
	// ctx.beginPath();
	// for (var i = 0; i < Game.traps.length; i++) {
	// 	ctx.rect(Game.traps[i].x, Game.traps[i].y, Game.traps[i].width, Game.traps[i].height);
	// }
	// ctx.fill();

}

//event listeners
window.addEventListener("load", gameLoop)

document.body.addEventListener("keydown", function(e){
	Game.keys[e.keyCode] = true
})

document.body.addEventListener("keyup", function(e){
	Game.keys[e.keyCode] = false
})
