export class DOMElements {
    

    linkDOM(){
      let domElements = {};
     Array.from(document.querySelectorAll('[data-link]')).forEach(element =>
        
        domElements[element.dataset.link] = document.querySelector(`[data-link=${element.dataset.link}]`))
        return domElements;

 }
}