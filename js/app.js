const app = {
  init: function () {
    console.log('init !');
    // J'enregistre div#board dans app.drawBoardDiv
    app.drawBoardDiv = document.getElementById('board');
    app.drawBoard();
    app.listenKeyboardEvents();
  },
  gameOver: false,
  player: {
    x: 0,
    y: 0,
    direction: 'right',
  },
  targetCell: {
    x: 5,
    y: 3
  },
  drawBoard: function(){

    for(let y = 0; y < 4; y++){
      const row = document.createElement('div');
      row.className = "row";
 
      for (let x = 0; x < 6; x++){
        const cell = document.createElement('div');
        cell.className = "cell";

        if(x === app.targetCell.x && y === app.targetCell.y) {
          cell.classList.add('targetCell');
        }


        if(x === app.player.x && y === app.player.y) {
          const playerDiv = document.createElement('div');
          playerDiv.className = "player";
          playerDiv.classList.add(app.player.direction);
          cell.appendChild(playerDiv);
        }


        row.appendChild(cell);
      }
      app.drawBoardDiv.appendChild(row);
    }
    // UNe fois ma grille générée avec la bonne position de l'user et de la case d'arrivée
    // je peux lancer la vérification pour savoir s'il y a gameOver ou pas.
    app.isGameOver();
  },
  clearBoard: function(){
    app.drawBoardDiv.innerHTML = "";
  },
  redrawBoard: function(){
    app.clearBoard();
    app.drawBoard();
  },
  turnLeft: function(){
    if(app.gameOver) {
      return;
    }

    switch(app.player.direction) {
      case "right":
        app.player.direction = "up";
        break; // permet d'arrêter les instructions sans examiner les autres cases
      case "up":
        app.player.direction = "left";
        break;
      case "left":
        app.player.direction = "down";
        break;
      case "down":
        app.player.direction = "right";
        break;
    }
    app.redrawBoard();
  },
  turnRight: function(){
    if(app.gameOver) {
      return;
    }
    // Selon la position actuelle
    // déterminer la nouvelle
    switch(app.player.direction) {
      case "right":
        app.player.direction = "down";
        break; // permet d'arrêter les instructions sans examiner les autres cases
      case "up":
        app.player.direction = "right";
        break;
      case "left":
        app.player.direction = "up";
        break;
      case "down":
        app.player.direction = "left";
        break;
    }
    app.redrawBoard();
  },
  moveForward: function() {
    if(app.gameOver) {
      return;
    }
    switch (app.player.direction) {
      case 'right':

        if (app.player.x === 5) {
          console.log("Impossible d'avancer. Limite de la grille atteinte.");
        } else {

          app.player.x += 1;
        }
        break;
      case 'down':
        if (app.player.y === 3) {
          console.log("Impossible d'avancer. Limite de la grille atteinte.");
        } else {
          app.player.y += 1;
        }
        break;
      case 'left':
        if (app.player.x === 0) {
          console.log("Impossible d'avancer. Limite de la grille atteinte.");
        } else {
          app.player.x -= 1;
        }
        break;
      case 'up':
        if (app.player.y <= 0) {
          console.log("Impossible d'avancer. Limite de la grille atteinte.");
        } else {
          app.player.y -= 1;
        }
        break;
    }

    app.redrawBoard();
  },
  listenKeyboardEvents: function() {
    document.addEventListener('keyup', function(evt){
      console.log(evt.target);

      switch(evt.code){
        case "ArrowUp":
          app.moveForward();
        break;
        case "ArrowLeft":
          app.turnLeft();
        break;
        case "ArrowRight":
          app.turnRight();
        break;
      }
      
    });
  },
  isGameOver: function(){

    if(app.player.x === app.targetCell.x && app.player.y === app.targetCell.y){
      app.gameOver = true;
      alert('gagné');
    }
  },
};

document.addEventListener('DOMContentLoaded', app.init);