$(document).ready(function(){

	class Contender {
	  constructor(name,healthPoints,attackPoints,counterPoints,bonusPoints) {
	    this.name = name;
	    this.healthPoints = healthPoints;
	    this.attackPoints = attackPoints;
	    this.counterPoints = counterPoints;
	    this.bonusPoints = bonusPoints;
	  }

	  takeDamage(attStrength) {
	    //this.healthPoints = 
			return this.healthPoints - attStrength;
	  }
	}

	var presidents = [
		["george",10,2,1,1],
		["abe",10,1,1,1],
		["alex",10,1,1,1],
		["andy",10,1,1,1]
	];

	var george = new Contender(...presidents[0]);
	var abe = new Contender(...presidents[1]);
	var alex = new Contender(...presidents[2]);
	var andy = new Contender(...presidents[3]);
	
  var isHeroSelected = false;
  var isEnemySelected = false;
  var enemyQueue = [];
	var hero = {};
	var activeEnemy = {};
	var newEnemyHP = 0;
	var newHeroHP = 0;

	console.log(george);
	
	function newGame() {

		george = new Contender(...presidents[0]);
		abe = new Contender(...presidents[1]);
		alex = new Contender(...presidents[2]);
		andy = new Contender(...presidents[3]);
		
		isHeroSelected = false;
		isEnemySelected = false;
		enemyQueue = [];
		hero = {};
		activeEnemy = {};

		$("section").show();	
		$("button").hide();
		$(".instructions").text("Select a hero.");

	// Select a hero and push other characters to enemyQueue

		$("section").on("click", function() {
			if (!isHeroSelected) {

				// Assign class to section
				$(this).addClass("hero");

				// Assign hero data
				isHeroSelected = true;
				hero = eval($(this).attr("pres"));

				// Designate other sections as enemy sections
				$(this).siblings().addClass("enemy");

				// Assign enemies to array, not sure I'll need it though
				var enemies = eval($(this).siblings());
				for (var i of enemies) {
					enemyQueue.push($(i).attr("pres"));
				}
			}
			 
			newBattle();
		});
	} // end function newGame()

	function newBattle() {
		$(".instructions").text("Select an enemy to battle.");
		$("button").hide();

		// Select an enemy to battle
		$(".enemy").on("click", function() {
			if (!isEnemySelected) {
				// Assign class to section
				$(this).addClass("active-enemy");

				// Assign activeEnemy data
				activeEnemy = eval($(this).attr("pres"));
				isEnemySelected = true;
				console.log(activeEnemy);
			}
			
			newRound();

		});
	} // end function newBattle()

	function newRound() {
		$(".instructions").text("Use the button to attack the enemy!");

		$(".attack-button").show();

		$(".attack-button").on("click", function() {

			if (hero.healthPoints < 1) {
				// Game over
				$(".active-enemy").removeClass("active-enemy");
				$(".hero").removeClass("hero");
				$(".enemy").removeClass("enemy");
				$(".attack-button").hide();
				$(".reset-button").show();
				$(".instructions").text("You lost. Use the button to play again.");
				$(".reset-button").on("click", function(){
					newGame();
				});
			}

			else if (activeEnemy.healthPoints < 1) {
				// Battle won, new battle
				$(".active-enemy").hide().removeClass("active-enemy enemy");
				isEnemySelected = false;
				activeEnemy = {};
				$(".attack-button").hide();
					newBattle();
			}

			else {
				// Update health points and display
				newEnemyHP = activeEnemy.takeDamage(hero.attackPoints); //activeEnemy.healthPoints - hero.attackPoints;
				activeEnemy.healthPoints = newEnemyHP
				$(".active-enemy .hp").text(newEnemyHP);

				newHeroHP = hero.takeDamage(activeEnemy.counterPoints); // hero.healthPoints - activeEnemy.counterPoints;
				hero.healthPoints = newHeroHP
				$(".hero .hp").text(newHeroHP);

				console.log("hero " + hero.healthPoints, "activeEnemy " + activeEnemy.healthPoints)
			}
		});
	} // end function newRound()

	newGame()

});