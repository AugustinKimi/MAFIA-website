import * as THREE from 'three'
import Experience from '../Experience'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Skull{
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Skull')
        }
        this.setSkull ()
        this.setScrollTrigger()
    }
    
    setSkull(){
        this.skullModel = this.resources.items.skullModel
        console.log(this.skullModel.scene)
        this.skullModel.scene.traverse((child) => {
            if(child instanceof THREE.Mesh){
                // child.material.color = "red"
            }
        })
        this.skullModel.scene.scale.set(0.7, 0.7, 0.7)

        
        if(this.debug.active ){
            this.debugFolder.add(this.skullModel.scene.position, "x").min(-5).max(5).step(0.01).name("Bag position x")
            this.debugFolder.add(this.skullModel.scene.position, "y").min(-5).max(5).step(0.01).name("Bag position y")
            this.debugFolder.add(this.skullModel.scene.position, "z").min(-5).max(5).step(0.01).name("Bag position z")
            this.debugFolder.add(this.skullModel.scene.rotation, "x").min(-5).max(5).step(0.01).name("Bag rotation x")
            this.debugFolder.add(this.skullModel.scene.rotation, "y").min(-5).max(5).step(0.01).name("Bag rotation y")
            this.debugFolder.add(this.skullModel.scene.rotation, "z").min(-5).max(5).step(0.01).name("Bag rotation z")
        }
        this.scene.add(this.skullModel.scene)
    }

    setScrollTrigger(){
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(this.skullModel.scene.position,{
            scrollTrigger : { 
                trigger : '#about-section',
                start : "bottom center",
                endTrigger : "#roadmap",
                end : "130% top",
                toggleActions : "reverse none reverse none",
                scrub : 1,
            },
            y : 4.08,
        } )
    }
    update(){
        this.skullModel.scene.rotation.y = (Math.sin(this.time.elapsed * 0.0005) - 0.5) * 0.5
    }
}