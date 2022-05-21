
export default class DomManip{
    constructor(){

        this.mouseCursor()
        this.faqSection()
        
        window.requestAnimationFrame(() => this.render())

    }

    mouseCursor(){
        this.cursor =  document.querySelector('.cursor')
        this.cursorPosition = {}
        this.cursorPosition.x = window.innerWidth / 2
        this.cursorPosition.y = window.innerHeight / 2
        window.addEventListener('mousemove', (e) => {
            this.cursorPosition.x = e.clientX
            this.cursorPosition.y = e.clientY
        })
    }

    render(){
        this.cursor.style.top = `${this.cursorPosition.y}px`
        this.cursor.style.left = `${this.cursorPosition.x}px`
        window.requestAnimationFrame(() => this.render())
    }

    faqSection(){
        this.questions = Array.from(document.querySelectorAll(".question"))
        this.questionButtons = Array.from(document.querySelectorAll(".faq-title-container"))
        this.questionButtons.forEach((element, key) => {
            element.addEventListener('click', () => {
                this.questions[key].classList.toggle("isOpen")
            })
        });

    }


}