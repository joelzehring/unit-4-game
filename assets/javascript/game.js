$(document).ready(function() { // jQuery

	class Contender {
	  constructor(name,healthPoints,attackPoints,counterPoints,bonusPoints) {
		  this.name = name;
		  this.healthPoints = healthPoints;
		  this.attackPoints = attackPoints;
		  this.counterPoints = counterPoints;
		  this.bonusPoints = bonusPoints;
	  }
	
	  takeDamage(attStrength) {
			var newHealth = this.healthPoints - attStrength;
		  this.healthPoints = newHealth;
	  }
	
	  levelUp(fightBonus) {
      var newAttack = this.attackPoints + fightBonus;
		  this.attackPoints = newAttack;
    }
	}
	
	var george,abe,alex,andy = {};
	
	var isHeroSelected = false;
	var isEnemySelected = false;
	var hero = {};
	var activeEnemy = {};
	
	function newGame() {
		george = new Contender("george",120,8,15,11);
		abe = new Contender("abe",100,10,5,12);
		alex = new Contender("alex",150,6,10,7);
		andy = new Contender("andy",180,4,25,5);
	
	  isHeroSelected = false;
	  isEnemySelected = false;
	  hero = {};
	  activeEnemy = {};
	
	  $(".instructions").text("Choose a hero.");
		$(".attack-button").hide();
		$(".reset-button").hide();
	  $("section").removeClass().addClass("character").show("fast");
		$(".george-deets .hp").text(george.healthPoints);
		$(".abe-deets .hp").text(abe.healthPoints);
		$(".alex-deets .hp").text(alex.healthPoints);
		$(".andy-deets .hp").text(andy.healthPoints);
	}
	
	newGame();
	
	$(".character").on("click",function(){
		if (!isHeroSelected) {
			$(this).addClass("hero");
			hero = eval($(this).attr("pres"));
			isHeroSelected = true;
			$(this).siblings().addClass("enemy");
		  $(".instructions").animate(200).text("Choose an enemy to battle.");    
		}
	
		else if (!isEnemySelected) {
		$(this).addClass("active-enemy").removeClass("enemy");
			activeEnemy = eval($(this).attr("pres"));
			isEnemySelected = true;
			$(".attack-button").show("fast");
		  $(".instructions").text("Use the button to attack.");
	}
	
		else {
			$(".instructions").text("Hero and enemy are already selected. Time to attack!");
		}
	});
	
	$(".attack-button").on("click",function(){
		if (activeEnemy.healthPoints > 0) {
      activeEnemy.takeDamage(hero.attackPoints);
      hero.levelUp(activeEnemy.bonusPoints);
      $(".active-enemy .hp").text(activeEnemy.healthPoints);
      $(".active-enemy .damage").text(0 - hero.attackPoints).show(10).hide(1500);
	
		  if (activeEnemy.healthPoints <= 0) {
		    $(".active-enemy").hide(1500).addClass("defeated").removeClass("active-enemy");
		    $(".attack-button").hide("hide");
        isEnemySelected = false;
        $(".instructions").text("You win this round. Choose another enemy to battle.");
        
        if ($(".defeated").length == 3) {
          $(".instructions").text("You are the Champion! Use the button to play again.");
          $(".reset-button").show("fast").click(function() {newGame()});
        }
		  }
				
			if (hero.healthPoints > 0) {
				hero.takeDamage(activeEnemy.counterPoints);
        $(".hero .hp").text(hero.healthPoints);
        $(".hero .damage").text(0 - activeEnemy.attackPoints).show(10).hide(1500);
			}
	
		  if (hero.healthPoints <= 0) {
		    $(".instructions").text("You lose. Use the button to play again.");
		    $(".attack-button").hide("fast");
		    $(".reset-button").show("fast").click(function() {newGame()});
		  }
		}
	});
	
}); // jQuery