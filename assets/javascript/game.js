// Star Wars RPG

// Theme ideas: money presidents, soccer stars

/*

Game states:
  splash screen
  game start
  character select
  opponent select
  new round
  win round
  battle
  attack
  counter
	win game
	lose game
	game over

Data:
  character
  opponents
  opponent defeated
  health points
  attack strength
  counter attack strength
  round
  attack points bonus (after beating an opponent)

Happy path:
  Player lands on site
  Player selects a character to start the game
  Player selects an opponent to battle first
  Player attacks opponent, decreasing health points
  Opponent counters, decreasing player health points
  Player attacks deplete opponent health, resulting in win
  Player attack strength increases
  Player defeats remaining opponents
  Player wins game

var characterRoster = [
  georgeW,
  abeL,
  alexH,
  andJ,
]

*/

var playerCharacter = {};
var enemyList = [];
var enemiesDefeated = [];
var round = 0;

class Contender {
  constructor(name,healthPoints,attackPower,counterPower,powerUp) {
    this.name = name;
    this.healthPoints = healthPoints;
    this.attackPower = attackPower;
    this.counterPower = counterPower;
    this.powerUp = powerUp;
  }

  takeDamage(attStrength) {
    this.healthPoints = this.healthPoints - attStrength;
  }

	addAP(extraAttack) {
		this.attackPower = this.attackPower + extraAttack;
	}
}

var presidents = [
["Washington",1,10,4,2],
["Lincoln",5,5,3,1],
["Hamilton",10,4,6,1],
["Jackson",20,2,7,3]
];

function characterSelect() {

}

function enemySelect() {

}

function newRound() {

}

function winRound() {

}

function loseGame() {

}

function winGame() {

}

/*

Testing object creation

var playerCharacter = new Contender(...presidents[0]);
var enemyA = new Contender(...presidents[1]);
var enemyB = new Contender(...presidents[2]);
var enemyC = new Contender(...presidents[3]);

console.log(`${playerCharacter.name} has ${playerCharacter.healthPoints} health points.`)
playerCharacter.takeDamage(enemyA.attackPower);
console.log(`${playerCharacter.name} now has ${playerCharacter.healthPoints} health points.`)

*/