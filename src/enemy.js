
export class Enemy {
    constructor(container,enemiesInterval, enemyClass,explosionClass, lives){
        this.container = container;
        this.element = document.createElement('div');
        this.enemyClass = enemyClass;
        this.explosionClass = explosionClass;
        this.interval = null;
        this.enemiesInterval = enemiesInterval
        this.lives = lives
        
        
    }
    init(){
        this.#setEnemy();
        this.#updatePosition();
    }

    #setEnemy(){
        this.element.classList.add(this.enemyClass);
        this.container.appendChild(this.element);
        this.element.style.top = '0px';
        this.element.style.left =`${this.#randomPositio()}px`
    }

    #randomPositio(){
        return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth));
    }

    #updatePosition(){
        this.interval = setInterval(()=> {this.#setNewPosition()}, this.enemiesInterval)
    }

    #setNewPosition(){
        this.element.style.top = `${this.element.offsetTop + 1}px`;
    }
    hit(){
        
        this.lives--;
        if(!this.lives){
            this.explode();
           
        }
    }

    explode(){
        
        this.element.classList.remove(this.enemyClass);
        
        this.element.classList.add(this.explosionClass);
        
        clearInterval(this.interval);
        const animationTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--animation-time'),10);
        
        setTimeout(()=>this.element.remove(), animationTime );
    }
    remove(){
        clearInterval(this.interval);
        this.element.remove();
    }
}