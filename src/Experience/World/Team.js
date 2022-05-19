import * as THREE from 'three'
import Experience from '../Experience'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default class Team {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time
    
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Team')
        }

        this.setTeam()
        this.setScrollTrigger()
    }

    setTeam(){
        this.teamModel = this.resources.items.teamModel
        // this.teamModel.scene.rotation.y = Math.PI * 0.5
        this.teamModel.scene.position.set(-5, -2, 0)
        this.teamModel.scene.scale.set(1.3 ,1.3 ,1.5 )
        
        console.log(this.teamModel)
        this.teamModel.scene.traverse((child) => {
            console.log(child.name.includes("team-photo"), child instanceof THREE.Mesh)
            if(child instanceof THREE.Mesh && child.name.includes("team-photo") ){
                this.index = child.name.split("team-photo")
                // this.resources.items[`teamTexture${this.index[1]}`].outputEncoding = THREE.sRGBEncoding
                this.photoMaterial = new THREE.MeshBasicMaterial({
                    map : this.resources.items[`teamTexture${this.index[1]}`],
                    color : 0x555555
                })
                child.material = this.photoMaterial
            }
        })

        
        if(this.debug.active){
            this.debugFolder.add(this.teamModel.scene.position, "x").min(-5).max(5).step(0.01).name("Team position x")
            this.debugFolder.add(this.teamModel.scene.position, "y").min(-5).max(5).step(0.01).name("Team position y")
            this.debugFolder.add(this.teamModel.scene.position, "z").min(-5).max(5).step(0.01).name("Team position z")
            this.debugFolder.add(this.teamModel.scene.rotation, "x").min(-5).max(5).step(0.01).name("Team rotation x")
            this.debugFolder.add(this.teamModel.scene.rotation, "y").min(-5).max(5).step(0.01).name("Team rotation y")
            this.debugFolder.add(this.teamModel.scene.rotation, "z").min(-5).max(5).step(0.01).name("Team rotation z")
        }
        this.scene.add(this.teamModel.scene)
    }

    setScrollTrigger(){
        gsap.registerPlugin(ScrollTrigger)
        
        this.scrollTriggerObject1 = { 
            trigger : '#team',
            start : "top center",
            end : "bottom top",
            toggleActions : "reverse none reverse none",
            // markers : true,
            scrub : 1,
        }
        gsap.to(this.teamModel.scene.position,
        {
            scrollTrigger : this.scrollTriggerObject1, 
            x :  5,
        })
        this.scrollTriggerObject1 = { 
            trigger : '#team',
            start : "top center",
            // end : "top bottom",
    toggleActions : "restart none none reverse",
            markers : true,
            // scrub : 2,
            duration : 1,
        }
        gsap.to(this.teamModel.scene.position,
            {
                scrollTrigger : this.scrollTriggerObject1, 
                y :  0.6,
            })
    }
    update(){

    }
}

