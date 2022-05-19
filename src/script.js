import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Experience from './Experience/Experience.js'

const experience = new Experience(document.querySelector('canvas.webgl'))


const scrollTrigger = {
    trigger : '#about',
    start : "bottom 150%",
    toggleActions : "restart none none reverse",
    // markers : true
}

gsap.registerPlugin(ScrollTrigger)
gsap.to(".big-title:first-child",{
    scrollTrigger,
    x : "150%",
    duration : 0.8,
    ease : "power1.out"
})

gsap.to(".big-title:nth-child(2)",{
    scrollTrigger,
    x : "-150%",
    duration : 0.8,
    ease : "power1.out"
})
gsap.to(".backgroundContainer",{
    scrollTrigger,
    opacity : "0",
    duration : 0.8,
    ease : "power1.out"
})

gsap.to(".petals-loop",{
    scrollTrigger,
    opacity : "0",
    duration : 0.5,
    ease : "power1.out"
})

gsap.to(".avatar",{
    scrollTrigger,
    opacity : "0",
    duration : 0.5,
    ease : "power1.out"
})

gsap.to(".scroll-button-container",{
    scrollTrigger,
    opacity : 0,
    duration : 0.5,
    ease : "power1.out"
})

gsap.to("#home",{
    scrollTrigger,
    pointerEvents : "none",
    duration : 0.5,
    ease : "power1.out"
})

let parent = document.querySelector('.team-title').parentElement;

while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;
    if (hasOverflow !== 'visible') {
        console.log(hasOverflow, parent);
    }
    parent = parent.parentElement;
}