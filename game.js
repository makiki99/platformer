Game = {

	player1 : {

		walkSpeed: 7.5,
		groundControl: 2.5,
		airControl: 0.75,
		verticalControl: 0.2,
		jumpHeight: 16,
		shorthopHeight: 8,
		fallAcceleration: 1.4,
		fallSpeed: 16,

		hp: 100,
		energy: 100,
		x : 240,
		y : 120,
		width: 32,
		height: 32,
		velX: 0,
		velY: 0,
		grounded: false,
		jumping: false,
		doubleJumping: false,
		holdJump: false,
		weapon: "SHINE",
		projectiles: [],

		attack: function(){
			//TODO
		},

		altAttack: function(){
			//TODO
		},

	},

	keys : [],

	walls: [],
	traps: [],

}
