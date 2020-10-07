import {Ship} from '/src/spaceShip.js';
import {DOMElements} from '/src/linkDOMToJs.js';
import {Enemy} from '/src/enemy.js';
  class Spaceship {
    
    #domElements = new DOMElements().linkDOM();

    #ship = new Ship(this.#domElements['spaceship'],this.#domElements['container'])
      init(){
        
        this.#ship.init();
        this.#newGame();
      }
      #enemies = [];
      #enemiesInterval = null;
      #checkPositionInterval = null;
      #createEnemyInterval = null;

      #newGame(){
        this.#enemiesInterval = 30;
        this.#createEnemyInterval = setInterval(()=> {this.#randomNewEnemy()},2000)

        this.#checkPositionInterval = setInterval(()=> this.#checkPosition(),1);
      }

      #createNewEnemy(...params){
        const enemy = new Enemy(...params);
        enemy.init();
        this.#enemies.push(enemy);
      }
      #randomNewEnemy(){
        const randomNumber = Math.floor(Math.random() * 5) +1;
        randomNumber % 5 ? this.#createNewEnemy(this.#domElements['container'],this.#enemiesInterval,'enemy'):this.#createNewEnemy(this.#domElements['container'],this.#enemiesInterval,'enemy--big')
      }
      #checkPosition(){
        this.#ship.missiles.forEach((missile, index,array) => {
          const missilePosition = {
            top:missile.element.offsetTop,
            right:missile.element.offsetLeft + missile.element.offsetWidth,
            bottom:missile.element.offsetTop + missile.element.offsetHeight,
            left:missile.element.offsetLeft,
          }
          if(missilePosition.bottom<0){
            console.log('work')
            missile.remove();
            array.splice(index,1);
          }
        });

        this.#enemies.forEach((enemy, enindex,enearray) => {
          const enemyPosition = {
            top:enemy.element.offsetTop,
            right:enemy.element.offsetLeft + enemy.element.offsetWidth,
            bottom:enemy.element.offsetTop + enemy.element.offsetHeight,
            left:enemy.element.offsetLeft,
          }
          if(enemyPosition.top > window.innerHeight){
            enemy.remove();
            enearray.splice(enindex,1);
          }
        });
      }
  }

    document.addEventListener('DOMContentLoaded',()=> {
        const game = new Spaceship();
        game.init();
    })