import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mindMapData from '../data/mindmap.json'
import SmoothScrollService from './SmoothScrollService';


export default class Scroll{
    constructor(){
        gsap.registerPlugin(ScrollTrigger)

        SmoothScrollService.stop()
        this.landingIsDiplay = true
        this.setHomePageWheelEvent()
        this.setHomePageToucheMoveEvent()
        this.aboutPage()
        this.playToEarnTitle()
        if(window.innerWidth > 800){
            this.setMindMapPinDesktop()
        }
        this.mindmapSection()
        this.resize()
        this.teamPage()
        this.faqPage()
        this.setNavbarLinkClickEvent()
    }

    resize(){
        window.addEventListener("resize", () => {
            if(window.innerWidth <= 800){
                if(this.tl) this.tl.kill()
            }else{
                this.setMindMapPinDesktop()
            }
        })
    }

    setHomePageWheelEvent(){
        window.addEventListener("wheel", (e) => {
            if(window.scrollY === 0 && e.deltaY < 0 ){
                if(!SmoothScrollService.lenis.stopped) SmoothScrollService.stop()
                this.homePageAnimation("in")
            }
            if(window.scrollY === 0 && e.deltaY > 0 && this.landingIsDiplay){
                this.homePageAnimation("out")
            }
        })
    }

    setNavbarLinkClickEvent(){
        const navbarLinks = Array.from(document.querySelectorAll(".link"))
        navbarLinks.forEach((link) => {
            link.addEventListener("click", () => {
                SmoothScrollService.resume()
                this.homePageAnimation("out")
            })
        })
    }
    

    setHomePageToucheMoveEvent(){
        let lastY;
        window.addEventListener("touchmove", (e) => {

            var currentY = e.touches[0].clientY;
            console.log(SmoothScrollService.lenis)
            if(window.scrollY === 0 && currentY > lastY ){
                if(!SmoothScrollService.lenis.stopped) SmoothScrollService.stop()
                this.homePageAnimation("in")
            }
            if(window.scrollY === 0 && currentY < lastY && this.landingIsDiplay){
                this.homePageAnimation("out")
            }
            lastY = currentY;
        })
    }

    homePageAnimation(playDirection){
        console.log("animate")
        this.landingIsDiplay = playDirection == "out" ? false : true
        this.homePageSection = document.querySelector("#home-section")
        this.homePageSection.style.pointerEvents = playDirection == "out" ? "none" : "all"
        
        gsap.to(".big-title:first-child",{
            x : playDirection == "out" ? "150%" : "0",
            duration : 0.8,
            onComplete :  () => {
                if(playDirection == "out") SmoothScrollService.resume()
            },
            ease : "power1.out"
        })

        gsap.to(".big-title:nth-child(2)",{
            x : playDirection == "out" ? "-150%" : "0",
            duration : 0.8,
            ease : "power1.out"
        })
        const opacity = playDirection == "out" ? 0 : 1
        gsap.to(".backgroundContainer",{
            opacity : opacity,
            duration : 0.8,
            ease : "power1.out"
        })

        gsap.to(".petals-loop",{
            opacity : opacity,
            duration : 0.5,
            ease : "power1.out"
        })

        gsap.to(".avatar",{
            opacity : opacity,
            duration : 0.5,
            ease : "power1.out"
        })

        gsap.to(".scroll-button-container",{
            opacity : opacity,
            duration : 0.5,
            ease : "power1.out"
        })

    }

    playToEarnTitle()
    {
        const tl = gsap.timeline({
            scrollTrigger : {
                trigger : '#play-to-earn',
                start : "top-100px center ",
                toggleActions : "restart none none reverse",
            }
        })
        tl
        .from(".play-to-earn-title", {
            x : -200,
            opacity : 0,
            duration : 0.6
        })
        .from("#play-to-earn .content",{
            x :200,
            opacity : 0,
            duration : 0.6,
        }, ">-0.4")
    }

    aboutPage()
    {
        const tl = gsap.timeline({
            scrollTrigger : {
                trigger : '#about-section',
                start : "top-100px center ",
                toggleActions : "restart none none reverse",
            }
        })
        tl
        .from(".about-title", {
            x : -200,
            opacity : 0,
            duration : 0.6
        })
        .from("#about-section .content",{
            x :200,
            opacity : 0,
            duration : 0.6,
        }, ">-0.4")
    }

    setMindMapPinDesktop(){
        this.mindCards = Array.from(document.querySelectorAll('.mind-card'))
        this.mindCards[0].classList.add("active")
        this.setMindmapContent(0)
        this.activeMindIndex = 0
        this.tl = gsap.timeline({
            scrollTrigger : {
                trigger : '#mindmap',
                start : "center center ",
                end : "+=550% top",
                pin : true,
                toggleActions : "reverse none reverse none",
                onUpdate : (e) => {
                    this.setCurrentMindMap(e.progress)
                }
            }
        })
        
    }

    setCurrentMindMap(progress){
        if( 0 > progress < 0.33 && this.activeMindIndex != 0){
            this.activeMindIndex = 0
        }
        if(0.33 > progress < 0.66 && this.activeMindIndex != 1){
            this.activeMindIndex = 1
        }
        if( 0.66 > progress < 1 && this.activeMindIndex != 2){
            this.activeMindIndex = 2
        }

        this.mindCards.forEach((card, index) => {
            if(this.activeMindIndex === index ){
                if(!card.classList.contains("active")) {
                    card.classList.add("active")
                    this.setMindmapContent(this.activeMindIndex)
                }
            }
            else if(card.classList.contains("active")){
                card.classList.remove("active")
            }
        });
    }

    setMindmapContent(mindIndex){
        this.mindMapTitle = document.querySelector(".current-mind-title")
        this.mindMapText = document.querySelector(".current-mind-text")
        this.mindMapIndex = document.querySelector(".current-mind-index")
        this.mindMapIllustration = document.querySelector(".current-mind-illustration")
        const tl = gsap.timeline()
        tl
        .to([this.mindMapIllustration, this.mindMapText, this.mindMapTitle], {
            filter : "blur(30px)",
            duration : 0.25,
            onComplete : () => {
                this.mindMapIllustration.setAttribute("src", mindMapData[mindIndex].illustrationPath)
                this.mindMapTitle.innerHTML = `${mindMapData[mindIndex].title}`
                this.mindMapText.innerHTML = `${mindMapData[mindIndex].content}`
                this.mindMapIndex.innerHTML = `${mindMapData[mindIndex].index}`
            },
            ease : "expo.in"
        })
        .to([this.mindMapIllustration, this.mindMapText, this.mindMapTitle, this.mindMapIndex],{
            filter : "blur(0px)",
            duration : 0.4,
            ease : "expo.out"
        })

    }

    mindmapSection(){
        const tl = gsap.timeline({
            scrollTrigger : {
                trigger : '#mindmap',
                start : "top 80% ",
                toggleActions : "restart none none reverse",
            }
        })

        tl
        .from(".mindmap-title", {
            x : -200,
            opacity : 0,
            duration : 0.6,
        })
        .from(".mind-card",{
            x :400,
            stagger : 0.2,
            opacity : 0,
            duration : 0.4,
        }, ">-0.6")

        gsap.from(".current-mind-container", {
            scrollTrigger : {
                trigger : ".current-mind-container",
                end : "center bottom",
                toggleActions : "restart none none reverse",
            },
            y : 200 ,
            opacity : 0,
            duration : 0.6,
        })
    }

    teamPage(){
        gsap.from(".team-title", {
            scrollTrigger : {
                trigger : '#team',
                start : "top center ",
                toggleActions : "restart none none reverse",
            },
            x : -200,
            opacity : 0,
            duration : 0.6
        })
    }

    faqPage(){
        const tl = gsap.timeline({
            scrollTrigger : {
                trigger : '#faq',
                start : "top 80% ",
                toggleActions : "restart none none reverse",
            }
        })

        tl
        .from(".faq-title", {
            x : -200,
            opacity : 0,
            duration : 0.6,
        })
        .from(".faq-img", {
            clipPath : 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
            opacity : 0,
            duration : 0.6
        }, ">-0.6")
        .from(".question",{
            x :200,
            stagger : 0.2,
            opacity : 0,
            duration : 0.4,
        }, ">-0.6")
    }
}