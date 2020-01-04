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
		return this.attackPoints + fightBonus;
	  }
	}
	
	var george,abe,alex,andy = {};
	
	var isHeroSelected = false;
	var isEnemySelected = false;
	var hero = {};
	var activeEnemy = {};
	
	function newGame() {
		george = new Contender("george",10,5,1,1);
		abe = new Contender("abe",10,1,1,1);
		alex = new Contender("alex",10,1,1,1);
		andy = new Contender("andy",10,1,1,1);
	
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
			$(this).addClass("hero").animate();
			hero = eval($(this).attr("pres"));
			isHeroSelected = true;
			$(this).siblings().addClass("enemy");
		$(".instructions").text("Choose an enemy to battle.");    
		}
	
		else if (!isEnemySelected) {
		$(this).addClass("active-enemy").removeClass("enemy").animate();
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
      $(".active-enemy .hp").text(activeEnemy.healthPoints);
      $(".active-enemy .damage").text(0 - hero.attackPoints).show(50).hide(1000);
	
		  if (activeEnemy.healthPoints <= 0) {
		    $(".active-enemy").hide(2000).addClass("defeated").removeClass("active-enemy");
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
        $(".hero .damage").text(0 - activeEnemy.attackPoints).show(50).hide(1000);
			}
	
		  else {
		    $(".instructions").text("You lose. Use the button to play again.");
		    $(".attack-button").hide("fast");
		    $(".reset-button").show("fast").click(function() {newGame()});
		  }
		}
	});
	
	//$(".instructions").text("Choose a hero.");
	//$(".instructions").text("Choose an enemy to battle.");
	//$(".instructions").text("Use the button to attack.");
	//$(".instructions").text("You win! Use the button to play again.");
	//$(".instructions").text("You lose. Use the button to play again.");
	
}); // jQuery