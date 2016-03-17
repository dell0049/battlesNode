// JavaScript Document
//code to veiw object
//window.onload = view;
window.onload = init;



	var model = {
		//These three properties keep us from hardcoding values
		boardSize: 7, 
		numShips: 3,
		shipLength: 3,
		//shipsSunk (initialized to 0 for the start of the game)
		// keeps the current nember of ships that have been sunk by the player
		shipSunk: 0, 
		//ships locations hardcoded for now 
		/*ships: [ {locations: ["06", "16", "26",], hits: [" ", " ", " "] },
				 {locations: ["24", "34", "44",], hits: [" ", " ", " "] },
				 {locations: ["10", "11", "12",], hits: [" ", " ", " "] }],*/
		//new location arrays initilized whit 0s
		ships: [ {locations: [0, 0, 0], hits: ["", "", ""] },
				 {locations: [0, 0, 0], hits: ["", "", ""] },
				 {locations: [0, 0, 0], hits: ["", "", ""] }
				 ],	
		fire : function(guess){
			for (var i = 0; i < this.numShips; i++) {
				 var ship = this.ships[i];
				 var index = ship.locations.indexOf(guess);
				//var locations = ship.locations;
				//The indexOf method searches an array for a matching value
				//var index = locations.indexOf(guess);
				if (index >=0) {
					ship.hits[index] = "hit";
					view.displayHit(guess);
					view.displayMessage("HIT!")
					if (this.isSunk(ship)){
						view.displayMessage("You sank my Battleship!");
						this.shipsSunk++;
						}
					return true;
					}
				
				}
				view.displayMiss(guess);
				view.displayMessage("You Missed Wah WAh!")
				return false;
			},
		
		isSunk: function(ship){
			for (var i=0; i < this.shipLength; i ++) {
				if (ship.hits[i] !== "hit") {
					return false;
					}
				
				}  
			return true;
			},
			
		generateShipLocations: function() {
			var locations;
			for (var i = 0; i < this.numShips; i++){
				do {
					locations = this.generateShip();
				   } while (this.collision(locations));
					this.ships[i].locations = locations;
				}
			console.log("Ships array: ");
		    console.log(this.ships);
			},
		generateShip: function()  {
			var direction = Math.floor(Math.random() * 2);
			var row, col; 
			
			if (direction === 1) {
				// generate a startring loction for a horixpntal ship
				row = Math.floor(Math.random() * this.boardSize);
				col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
				}else{
					//generate a starting loctation for a vertical ship
				row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
				col = Math.floor(Math.random() * this.boardSize);
					}
			var newShipLocations = [];
			for (var i = 0; i < this.shipLength; i++){
				if (direction === 1 ) {
					//add location to array for new horizontal ship
					newShipLocations.push(row + "" + (col + i));
					}else{
						//add location to array for new vertical ship
						newShipLocations.push((row + i) + "" + col);
						}
				}
			
			return newShipLocations;		
		
		},
	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++){
			var ship = this.ships[i];
			for (var j =0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j])  >= 0){
					
					return true;
					}
				}
			}
		return false;
		}		
	
	};
	var view = {
	//this method tajes a string messagr and displays it
	// in the message display area displayMessage area
	displayMessage: function(msg) {
			var messageArea = document.getElementById("messageArea");
			messageArea.innerHTML = msg;
		},
		displayHit: function(location) {
			// refrence element with getElementById 
			 var cell = document.getElementById(location);
			 //adds the class"hiT" to cell with settAttribute method
			 cell.setAttribute("class" , "hit");
			 },
		
		displayMiss: function(location){
				var cell = document.getElementById(location);
			 //adds the class"miss" to cell with settAttribute method
			 cell.setAttribute("class" , "miss");
				}
	
	
	};
	//controller . we are defining our controller object with a value of 0
	var controller ={
		guesses: 0,
		

		processGuess: function(guess){
			var location = parseGuess(guess);
			if (location) {
				this.guesses++;
				var hit = model.fire(location);
				if (hit && model.shipSunk === model.numShips){
					view.displayMessage("You sank all my battleships, in" + this.guesses + "guesses");
					}
				
				}	
			}
	    };
	function parseGuess(guess) {
			var alphabet = ["A", "B", "C", "D", "E", "F", "G",];
			
			if (guess === null || guess.length !==2) {
				alert("Oops , please enter a letter and number on the board.");
				
			} else {
				firstChar = guess.charAt(0);
				var row = alphabet.indexOf(firstChar);
				var column = guess.charAt(1);
				
				if (isNaN(row) || isNaN (column)){
					alert("Oops, tha ins't on the board.");
					}else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
						alert("Oops that is off the board");
						}else {
							return row + column;
							}
				}
				return null;
	}
		function init() {
			// get a refrence to fire button using the buttons ID
			var fireButton = document.getElementById("fireButton");
			//click handler
			fireButton.onclick = handleFireButton;
			
			 var guesssInput = document.getElementById("guessInput");
			guessInput.onkeypress = handleKeypress;
			
			model.generateShipLocations();
			}
		
		//key press handler
		
		function handleKeypress(e) {
			var fireButton = document.getElementById("fireButton");
			if (e.keyCode ===13) {
				fireButton.click();
				return false;
				}
			
			}
		// get the player's guess from the form
		// and get it to the controller.
		function handleFireButton(){
			var guessInput = document.getElementById("guessInput");
			var guess = guessInput.value;
			controller.processGuess(guess);
			
			guessInput.value = "";
			
			}
	
	/*controller.processGuess("A0");
	controller.processGuess("A6");
	controller.processGuess("B6");
	controller.processGuess("C6");
	controller.processGuess("C4");
	controller.processGuess("D4");
	controller.processGuess("E4");
	controller.processGuess("B0");
	controller.processGuess("B1");
	controller.processGuess("B2");*/
		
	
	/*console.log(parseGuess("A0"));
	console.log(parseGuess("B6"));
	console.log(parseGuess("G3"));
	console.log(parseGuess("H0"));
	console.log(parseGuess("A7"));	*/
		
/*model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");*/
	
	
	/*var ships = [{ locations: ["10", "20", "30"], hits: [" ", " ", " ", ] },
				 { locations: ["32", "33", "34"], hits: [" ", " ", " ", ] },
				 { locations: ["63", "64", "65"], hits: [" ", " ", " ", ] }]};
	*/
	
	
	//represents that sequence in code
	/*view.displayMiss("00");
	view.displayHit("34");
	view.displayMiss("55");
	view.displayHit("12");
	view.displayMiss("25");
	view.displayHit("26");*/
	
	//view.displayMessage("Yo you working bitch?");
	