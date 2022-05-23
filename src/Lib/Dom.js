
export default class DomManip{
    constructor(){
        this.twitterLogo = document.querySelector(".social-links-hover .twitter-logo")
        this.linkedinLogo = document.querySelector(".social-links-hover .linkedin-logo")

        this.faqSection()
        this.teamHover()
        window.requestAnimationFrame(() => this.update())

    }
    faqSection(){
        console.log('init')
        this.questions = Array.from(document.querySelectorAll(".question"))
        this.questionButtons = Array.from(document.querySelectorAll(".faq-title-container"))
        this.questionButtons.forEach((element, key) => {
            element.addEventListener('click', () => {
                console.log("click")
                this.questions[key].classList.toggle("isOpen")
            })
        });

    }

    teamHover(){
        this.cursorX = window.innerWidth /2
        this.cursorY = window.innerHeight /2
        window.addEventListener("mousemove", (e) => {
            this.cursorX = e.clientX
            this.cursorY = e.clientY
        })
    }

    update(){
        this.twitterLogo.style.left = `${this.cursorX}px`
        this.twitterLogo.style.top = `${this.cursorY}px`

        this.linkedinLogo.style.left = `${this.cursorX}px`
        this.linkedinLogo.style.top = `${this.cursorY}px`
        window.requestAnimationFrame(() => this.update())
    }

}