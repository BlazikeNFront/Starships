import {Missile} from '/src/missile.js';


export class Ship {
    #modifier = 3;
    #leftArrow = false;
    #rightArrow = false;
    missiles = [];
    #rightBorder = window.innerWidth
    constructor(element,container){
        this.element = element;
        this.container = container;
    }

    init(){
      this.setPosition();
      this.#eventListeners();
      this.#gameLoop();
    }

    setPosition(){
        this.element.style.bottom = '0rem';
        this.element.style.left = `${window.innerWidth/2 - this.element.offsetLeft - this.element.offsetWidth/2}px`
    }
    #eventListeners(){
        window.addEventListener('resize',()=>{this.#rightBorder = window.innerWidth});

        window.addEventListener('keydown',({keyCode})=> {
            switch(keyCode){
                case 32 :
                    this.#shot;
                    break;

                case 37:
                    this.#leftArrow = true
                    break;
                case 39:
                    this.#rightArrow = true;           
                        break;
            }
        })
        window.addEventListener('keyup',({keyCode})=> {
            switch(keyCode){
                case 32:
                    this.#shot();
                    break; 
                case 37:
                    this.#leftArrow = false
                    break;
                case 39:
                    this.#rightArrow = false;           
                        break;
            }
        })
    }

    #gameLoop =()=>{
        this.#whatKey();
        requestAnimationFrame(this.#gameLoop)
    }
    #whatKey(){
       
        if(this.#leftArrow &&  parseInt(this.element.style.left, 10) - this.#modifier> 0){this.element.style.left = `${parseInt(this.element.style.left, 10) - this.#modifier}px`}
        if(this.#rightArrow &&  parseInt(this.element.style.left, 10) + this.#modifier+60<this.#rightBorder){this.element.style.left = `${parseInt(this.element.style.left, 10) + this.#modifier}px`}
    }

    #shot(){
        const missile = new Missile(this.element.offsetLeft + this.element.offsetWidth/2,this.element.offsetTop,this.container);
        missile.init();
        this.missiles.push(missile)
    }
}