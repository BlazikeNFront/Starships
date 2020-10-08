import {Ship} from '/src/spaceShip.js';
import {DOMElements} from '/src/linkDOMToJs.js';
import {Enemy} from '/src/enemy.js';
  class Spaceship {
    
    #domElements = new DOMElements().linkDOM();
    

    #ship = new Ship(this.#domElements['spaceship'],this.#domElements['container'])
      init(){
        
        this.#ship.init();
        this.#newGame();
        this.#domElements['modalButton'].addEventListener('click',() => {
          
          this.#newGame()} )
      }
      #enemies = [];
      #enemiesInterval = null;
      #lives = 0;
      #score = 0;
      #checkPositionInterval = null;
      #createEnemyInterval = null;

      #newGame(){
        this.#domElements['modal'].classList.add('hide');
        this.#enemiesInterval = 30;
        this.#createEnemyInterval = setInterval(()=> {this.#randomNewEnemy()},2000)
        this.#lives = 3;
        this.#score = 0;
        this.#updateLivesText();
        this.#updateScoreText();
        this.#ship.element.style.left = '0px';
        this.#ship.setPosition();
        this.#checkPositionInterval = setInterval(()=> this.#checkPosition(),1);
        
      }

      #endGame(){
        this.#domElements['modal'].classList.remove('hide');
        this.#domElements['modalText'].textContent = `You Loose! Your score is ${this.#score}`;
        this.#enemies.forEach((enemy) => enemy.explode());
        this.#enemies.length = 0;
        clearInterval(this.#createEnemyInterval);
        clearInterval(this.#checkPositionInterval);
      }

      #createNewEnemy(...params){
        const enemy = new Enemy(...params);
        enemy.init();
        this.#enemies.push(enemy);
      }
      #randomNewEnemy(){
        const randomNumber = Math.floor(Math.random() * 5) +1;
        randomNumber % 5 ? this.#createNewEnemy(this.#domElements['container'],this.#enemiesInterval,'enemy','explosion',1):this.#createNewEnemy(this.#domElements['container'],this.#enemiesInterval,'enemy--big','explosion--big',3)
      }
      #checkPosition(){
        ;

        this.#enemies.forEach((enemy, enindex,enearray) => {
          const enemyPosition = {
            top:enemy.element.offsetTop,
            right:enemy.element.offsetLeft + enemy.element.offsetWidth,
            bottom:enemy.element.offsetTop + enemy.element.offsetHeight,
            left:enemy.element.offsetLeft,
          }
          if(enemyPosition.top > window.innerHeight){
            enemy.explode();
            enearray.splice(enindex,1);
            this.#updateLives();
          }
          this.#ship.missiles.forEach((missile, index,array) => {
            const missilePosition = {
              top:missile.element.offsetTop,
              right:missile.element.offsetLeft + missile.element.offsetWidth,
              bottom:missile.element.offsetTop + missile.element.offsetHeight,
              left:missile.element.offsetLeft,
            };
            

            if(missilePosition.bottom<0){
              
              missile.remove();
              array.splice(index,1);
            }

            if(missilePosition.bottom >= enemyPosition.top && missilePosition.top <= enemyPosition.bottom && missilePosition.right >= enemyPosition.left && missilePosition.left <= enemyPosition.right){
              enemy.hit()
              missile.remove();
              
              array.splice(index,1);
              this.#updateScore();
              
              
              
                 
                 
              
              
            }
          })
        });


      }

      #updateScore(){
        this.#score+=100;
        if(!(this.#score % 500)){this.#enemiesInterval--}
        this.#updateScoreText();
      }
      #updateLives(){
        this.#lives--;
        this.#updateLivesText();
        this.#domElements['container'].classList.add('hit');
        setTimeout(() => this.#domElements['container'].classList.remove('hit'), 100);
        if(!this.#lives){
          this.#endGame();
        }
      }

      #updateScoreText(){
        this.#domElements['score'].textContent = `Score ${this.#score}`
      }
      #updateLivesText(){

        this.#domElements['lives'].textContent = `Lives: ${this.#lives}`
      }
  }

    document.addEventListener('DOMContentLoaded',()=> {
        const game = new Spaceship();
        game.init();
    })