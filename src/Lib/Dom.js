import gsap from "gsap"


export default class DomManip{
    constructor(){
        this.twitterLogo = document.querySelector(".social-links-hover .twitter-logo")
        this.linkedinLogo = document.querySelector(".social-links-hover .linkedin-logo")

        this.faqSection()
        this.teamHover()
        this.toggleMobileMenu()
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

    toggleMobileMenu(){
        let menuIsOpen = false
        this.menuButton = document.querySelector('.menu-button')
        this.mobileMenu = document.querySelector('.mobile-links-container')

        this.menuButton.addEventListener('click', () => {
            console.log(menuIsOpen)
            if(!menuIsOpen){
                const tl = gsap.timeline()
                tl.fromTo(".mobile-links-container",{ opacity : 0},
                {
                    opacity : 1,
                    duration : 0.5
                })
                .fromTo(".link", { x : -200, opacity : 0},
                {
                    x : 0,
                    opacity :1,
                    stagger: 0.1,
                    duration : 0.3
                }, ">-0.8")
                this.mobileMenu.style.pointerEvents = "all"
            }
            else{
                const tl = gsap.timeline()
                tl.fromTo(".link", { x : 0 , opacity : 1},{
                    x : -200,
                    opacity :0,
                    stagger: 0.1,
                    duration : 0.3
                }, ">-0.5")
                .fromTo(".mobile-links-container",{ opacity : 1},{
                    opacity : 0,
                    duration : 0.5
                })
                this.mobileMenu.style.pointerEvents = "none"
            }
            this.menuButton.classList.toggle("isOpen")
            menuIsOpen = !menuIsOpen
            console.log(menuIsOpen)
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