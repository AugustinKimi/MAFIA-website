import Lenis from '@studio-freight/lenis'

class SmoothScroll{
    constructor(){
        this.init()
    }

    init(){

        this.lenis = new Lenis({
            duration: 1.2,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://easings.net
            direction: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
          })
          //get scroll value
          requestAnimationFrame(this.raf)
    }

    raf = (time) => {
        this.lenis.raf(time)
        requestAnimationFrame(this.raf)
    }

    stop(){
        console.log("stop")
        this.lenis.stop()
    }

    resume(){
        console.log("resume")
        this.lenis.start()
    }
}

export default new SmoothScroll()