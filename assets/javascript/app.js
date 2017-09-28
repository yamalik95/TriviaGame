$(function() {

	var game = {
		answered: false,
		score: 0,
		time: 0,
		auto: false,
		on: false,
		correctChoice: null,
		userChoice: null,
		scoreToAdd: 0,
		gameCount: null,
		timerOn: false,
		choice: [],
		turnCount: 0,
		questions: [
		[["Who is the God of the sky, lightning, thunder, law, order, justice, King of the Gods and the 'Father of Gods and men'?", "Ares Poseidon Zeus Atlas 2"]
		,["Who is the God of sexual desire, attraction, love and procreation?", "Apollo Poseidon Ares Eros 3"]
		,["Who is the God of music, poetry, art, oracles, archery, plague, medicine, light and knowledge?", "Cronos Apollo Dionysus Hades 1"]
		,["Who is the God of the grape harvest, winemaking and wine, of ritual madness, religious ecstasy and theatre?", "Dionysus Helios Hermes Pan 0"]
		,["Who is the nothingness that all else sprung from and filled the gap between Heaven and Earth as well as created the first beings?", "Poseidon Morpheus Kratos Chaos 3"]
		,["Who is the God that is the father of all the monsters, a monster himslef as a fire-breathing dragon, and is the most powerful and fearful God?", "Typhon Uranus Prometheus Kratos 0"]
		],
		[["Who is the Goddess of the Earth, known as the great primal mother of all and often referred to as 'Mother Earth'?", "Artemis Gaia Harmonia Hera 1"]
		,["Who is the Goddess of the spirit of insanity, madness, crazed frenzy, and the dead?", "Hestia Electra Demeter Mania 3"]
		,["Who is the Goddess of love, beauty, and eternal youth?", "Calypso Athena Aphrodite Tyche 2"]
		,["Who is the Goddess of force and raw energy?", "Bia Selene Rhea Persephone 0"]
		,["Who is the Goddess of victory, known as the Winged Goddess of Victory?", "Nike Pheme Nyx Kotys 0"]
		,["Who is the Goddess that is responsible for the fertility of the Earth, and also presides over sacred law along with the cycle of life and death?", "Demeter Artemis Hera Hestia 0"]
		],
		[["Who is the Hero that had his entire body except his heel dipped by his mother in the river Styx which made every part of him except his heel immortal?", "Heracles Achilles Alexander Jason 1"]
		,["Who is the Hero that is the son of Zeus and a mortal, known for his extraordinary strength, courage, cleverness, and his success in the 'Twelve Labours'?", "Alexander Daedalus Heracles Jason 2"]
		,["Who is the Hero that is best known for his hubris which lead him to fly too close to the sun?", "Daedalus Jason Bellerophon Icarus 3"]
		,["Who is the Hero that is best known as the slayer of the Gorgon Medusa and then used her severed head as a weapon against a sea monster?", "Perseus Theseus Odysseus Daedalus 0"]
		,["Who is the Hero that is best remembered for his divine intelligence and wisdom, as well as his slaying of the Minotaur?", "Theseus Jason Bellerophon Alexander 0"]
		,["Who is the Hero that is a genius inventor, and is best known for his construction of the Labyrinth?", "Jason Bellerophon Daedalus Alexander 2"]
		],
		[["Which Creature was born to a Cretian King and is hideously deformed with a head of a bull, enormous, supernaturally powerful, and ravenous?", "Cyclopse Chimera Cerberus Minotaur 3"]
		,["Which Creature was a winged pure white stallion, beautiful, born from the blood of Medusa as son of Poseidon, and devoted to Zeus?", "Pegasus Echidna Cerberus Orthrus 0"]
		,["Which Creature was half-man and half-creature, primal, savage, rowdy, boisterous, lived in caves, and were devoted to Dionysus?", "Sphinx Cyclopse Medusa Centaur 3"]
		,["Which Creature sang with such excessive beauty and were so seductive as women that anyone who listened would die?", "Medusa Scylla Siren Sphinx 2"]
		,["Which Creature is half-man and half-lion, and would slay anyone that would not answer its riddles?", "Sphinx Medusa Cyclopse Polyphemus 0"]
		,["Which Creature is a female fire breathing lion with a tail of a serpent and a goat's head on her back, and acted as an omen before a disaster?", "Medusa Chimera Cerberus Arachne 1"]
		]
		],
		positions: [ [1,1],[1,2],[1,3],[1,4],[1,5],[1,6],  [2,1],[2,2],[2,3],[2,4],[2,5],[2,6],  [3,1],[3,2],[3,3],[3,4],[3,5],[3,6],  [4,1],[4,2],[4,3],[4,4],[4,5],[4,6] ],
		positionsHold: [ [1,1],[1,2],[1,3],[1,4],[1,5],[1,6],  [2,1],[2,2],[2,3],[2,4],[2,5],[2,6],  [3,1],[3,2],[3,3],[3,4],[3,5],[3,6],  [4,1],[4,2],[4,3],[4,4],[4,5],[4,6] ],
		autoChoose: function() {
			var position = Math.floor(Math.random()*game.positions.length)
			game.choice = game.positions[position]
			game.positions.splice(position, 1)
			var tile = $("#tile" + game.choice[0] + game.choice[1])
			tile.css("color", "gold")
			game.scoreToAdd = game.choice[1]*100
			return game.choice
		},
		countDown: function(div) {
			if (game.time > 0) {
				$(div).html(game.time)
			} else {
				$(div).html("")
			}
			game.time--
		},
		showQuestion: function(index) {
			$("#instructions").css("font-size", "40px")
			$("#instructions").html(game.questions[index[0]-1][index[1]-1][0])
			var options = game.questions[index[0]-1][index[1]-1][1].split(" ")
			var option1 = "<div class='button' id = 'option0' value='0'>"+options[0]+"</div>"
			var option2 = "<div class='button' id = 'option1' value='1'>"+options[1]+"</div>"
			var option3 = "<div class='button' id = 'option2' value='2'>"+options[2]+"</div>"
			var option4 = "<div class='button' id = 'option3' value='3'>"+options[3]+"</div>"
			$("#optionContainer").html(option1+option2+option3+option4+"<div id='timer'></div>")
			$("#optionContainer").css("display", "block")
			return options
		},
		inTeam: function(index) {
			var team = (game.turnCount%2)+1
			var otherTeam = (team%2)+1
			game.correctChoice = game.showQuestion(index)[4]
			var tile = $("#tile" + game.choice[0] + game.choice[1])
			tile.css("color", "gold")
			game.scoreToAdd = game.choice[1]*100
			game.countDown("#timer")
			game.timerOn = true
			var questionCountDown = setInterval(function(){game.countDown("#timer")}, 1000)
			$(".button").on("click", function() {
				if (game.timerOn) {		
					game.userChoice = $(this).attr('value')
					game.checkAnswer("#team"+team, "Team "+team+": ")
					game.timerOn = false
					game.answered = true
					clearInterval(questionCountDown)
					clearInterval(game.gameCount)
					if (game.on) {
						setTimeout(function(){
							tile.html("")
							tile.css("background-color", "transparent")
							$("#instructions").css("font-size", "80px")
							$("#instructions").html("Team " + ((team%2)+1) + " Choice is...")
							$("#optionContainer").html("")
							$(".scoreContainer1#team"+team).css("color", "white")
							$(".scoreContainer1#team"+otherTeam).css("color", "gold")
							game.answered = false
							if (game.turnCount === 24) {
								$(".scoreContainer1#team"+team).css("color", "gold")
								game.on = false
								game.endGame()
							}
						}, 2000)
					}
				}
			})
			game.gameCount = setInterval(function(){
				if (game.answered === false) {
					game.timerOn = false
					clearInterval(questionCountDown)
					$("#timer").html("Time's Up!")
					$("#option" + game.correctChoice).css("color", "gold")
					clearInterval(game.gameCount)
					setTimeout(function() {
						tile.html("")
						tile.css("background-color", "transparent")
						$("#instructions").css("font-size", "80px")
						$("#instructions").html("Team " + ((team%2)+1) + " Choice is...")
						$("#optionContainer").html("")
						$(".scoreContainer1#team"+team).css("color", "white")
						$(".scoreContainer1#team"+otherTeam).css("color", "gold")
						if (game.turnCount === 24) {
							$(".scoreContainer1#team"+team).css("color", "gold")
							game.on = false
							game.endGame()
						}
					}, 2000)
				}
			}, 20000)
			game.turnCount++
		},
		inAuto: function() {
			if (game.on) {
				var tile = $("#tile" + game.choice[0] + game.choice[1])
				game.answered = false
				game.time = 20
				game.countDown("#timer")
				game.timerOn = true
				var questionCountDown = setInterval(function(){game.countDown("#timer")}, 1000)
				$(".button").on("click", function() {
					if (game.timerOn) {		
						game.userChoice = $(this).attr('value')
						game.checkAnswer("#total", "Total Score: ")
						game.answered = true
						clearInterval(questionCountDown)
						clearInterval(game.gameCount)
						if(game.positions.length === 0) {
							game.on = false 
							setTimeout(function(){game.endGame()}, 2000)
						}
						setTimeout(function(){
							if (game.on) {
								game.correctChoice = game.showQuestion(game.autoChoose())[4]
								game.inAuto()
							}
							tile.html("")
							tile.css("background-color", "transparent")		
						}, 2000)
					}
				})
				game.gameCount = setInterval(function(){
					if (game.positions.length === 0) {
						game.on = false
						setTimeout(function(){game.endGame()}, 2000)						
					}
					if (game.answered === false) {
						game.timerOn = false
						clearInterval(questionCountDown)
						$("#timer").html("Time's Up!")
						$("#option" + game.correctChoice).css("color", "gold")
						clearInterval(game.gameCount)
						setTimeout(function() {
							if (game.on) {
								game.correctChoice = game.showQuestion(game.autoChoose())[4]
							}
							game.inAuto()
							tile.html("")
							tile.css("background-color", "transparent")
						}, 2000)
					}
					game.answered = false
				}, 20000)
			} else {
				game.endGame()
			}
		},
		checkAnswer: function(id, score) {
			if (game.userChoice === game.correctChoice) {
				game.score += game.scoreToAdd
				$(".scoreContainer1"+id).html("CORRECT!")
				$("#option" + game.correctChoice).css("color", "gold")
				setTimeout(function() {
					$(".scoreContainer1"+id).html(score + game.score)
				}, 2000)
			} else {
				$(".scoreContainer1"+id).html("INCORRECT!")
				$("#option" + game.correctChoice).css("color", "gold")
				setTimeout(function() {
					$(".scoreContainer1"+id).html(score + game.score)
				}, 2000)
			}		
		},
		endGame() {
			if (game.auto) {
				$.each(game.positionsHold, function(index) {
					game.positions.push(game.positionsHold[index])
				})
				game.auto = false
			}
			$("#instructions").css('font-size','50px')
			$("#instructions").html("GAME OVER</br>If you would like to play again, select one of the buttons below:")
			$("#optionContainer").html("<div class = 'button' id = 'user'>Team</div><div class = 'button' id = 'auto'>Auto</div>")
			$(".tile").css("color", "white")
		},
		resetGame() {
			game.turnCount = 0
			game.score = 0
			game.on = true
			game.timerOn = false
			$(".tile").css("background-color", "black")
			$(".tile").each(function(index){$(this).html($(this).attr("value"))})
			$("#instructions").css('font-size', '34px')
			$("#instructions").css("font-size", "80px")
			$("#optionContainer").css("display", "none")
			if (game.auto) {
				$(".scoreContainer1#total").html("Total Score: 0")
				$(".scoreContainer1#total").css("display", "block")
				$(".scoreContainer1#team1").css("display", "none")
				$(".scoreContainer1#team2").css("display", "none")
			} else {
				$(".scoreContainer1#total").css("display", "none")
				$(".scoreContainer1#team1").html("Team 1: 0")
				$(".scoreContainer1#team2").html("Team 2: 0")
				$("#instructions").html("Team 1 Choice is...")
				$(".scoreContainer1#team1").css("display", "block")
				$(".scoreContainer1#team1").css("color", "gold")
				$(".scoreContainer1#team2").css("display", "block")
				$(".scoreContainer1#team2").css("color", "white")
				$(".tile").css("cursor", "pointer")	
			}

		}
	}

	$(document).on("click", "#auto", function() {
		game.auto = true
		game.resetGame()
		game.time = 3
		game.countDown("#instructions")
		var startCountDown = setInterval(function(){game.countDown("#instructions")}, 1000)
		setTimeout(function(){
			clearInterval(startCountDown)
			game.correctChoice = game.showQuestion(game.autoChoose())[4]
			game.inAuto()
			$(".scoreContainer1#total").css("display", "block")
		}, 3100)
	})

	$(document).on("click", "#user", function() {
		game.resetGame()
	})

	$(document).on("click", ".tile", function() {
		game.time = 20
		if (game.on && !game.timerOn) {
			game.choice = $(this).attr('id').substr(4).split("")
			game.answered = false
			game.inTeam(game.choice)
		}
	})

})






