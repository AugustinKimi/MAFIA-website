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
        this.camera = this.experience.camera.instance
        this.canvas = this.experience.canvas

        this.currentIntersect = null
        this.twitterLogo = document.querySelector(".social-links-hover .twitter-logo")
        this.linkedinLogo = document.querySelector(".social-links-hover .linkedin-logo")
    
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Team')
        }

        this.setTeam()
        this.setScrollTrigger()
        this.setCardInteration()
    }

    setTeam(){
        this.teamModel = this.resources.items.teamModel
        // this.teamModel.scene.rotation.y = Math.PI * 0.5
        this.teamModel.scene.position.set(-5, -2, 0)
        this.teamModel.scene.scale.set(1.3 ,1.3 ,1.5 )
        
        this.cardArray = []

        this.teamModel.scene.traverse((child) => {
            if(child instanceof THREE.Mesh && child.name.includes("team-photo") ){
                this.index = child.name.split("team-photo")
                this.resources.items[`teamTexture${this.index[1]}`].flipY = false
                this.photoMaterial = new THREE.MeshPhysicalMaterial({
                    map : this.resources.items[`teamTexture${this.index[1]}`],
                    reflectivity : 1,
                    transmission : 0.0,
                    roughness : 0.2,
                    metalness : 0,
                    clearcoat : 1,
                    clearcoatRoughness : 0,
                    color : new THREE.Color(0xffffff),
                    ior : 2,
                    thickness : 10.0,

                })
                if(this.debug.active){
                    this.debugFolder.add(this.photoMaterial, "reflectivity").min(0).max(1).step(0.01)
                    this.debugFolder.add(this.photoMaterial, "transmission").min(0).max(1).step(0.01)
                    this.debugFolder.add(this.photoMaterial, "roughness").min(0).max(1).step(0.01)
                    this.debugFolder.add(this.photoMaterial, "metalness").min(0).max(1).step(0.01)
                    this.debugFolder.add(this.photoMaterial, "clearcoat").min(0).max(1).step(0.01)
                    this.debugFolder.add(this.photoMaterial, "clearcoatRoughness").min(0).max(1).step(0.01)
                    this.debugFolder.addColor(this.photoMaterial, "color")
                    this.debugFolder.add(this.photoMaterial, "ior").min(0).max(5).step(0.01)
                    this.debugFolder.add(this.photoMaterial, "thickness").min(0).max(50).step(0.01)
                }

                child.material = this.photoMaterial
                this.cardArray.push(child)
            }
        })

        this.scene.add(this.teamModel.scene)
    }

    setScrollTrigger(){
        gsap.registerPlugin(ScrollTrigger)
        
        this.scrollTriggerObject1 = { 
            trigger : '#team',
            start : "top 30%",
            end : "bottom top",
            toggleActions : "reverse none reverse none",
            // markers : true,
            scrub : 1,
        }
        gsap.to(this.teamModel.scene.position,
        {
            scrollTrigger : this.scrollTriggerObject1, 
            x :  8,
        })
        this.scrollTriggerObject2 = { 
            trigger : '#team',
            start : "top center",
            // end : "top bottom",
            toggleActions : "restart none none reverse",
            // markers : true,
            // scrub : 2,
            duration : 1,
        }
        gsap.to(this.teamModel.scene.position,
            {
                scrollTrigger : this.scrollTriggerObject2, 
                y :  0.6,
            })
    }


    setCardInteration(){
        this.raycaster = new THREE.Raycaster();
        this.pointer = new THREE.Vector2();

        this.onPointerMove = ( event ) => {
            this.pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        }

        this.canvas.addEventListener( 'pointermove', this.onPointerMove );


        this.canvas.addEventListener("click", () => {
            if(this.currentIntersect){
                this.teamIndex = this.currentIntersect.object.name.split("team-photo")[1]
                console.log(this.teamIndex)
                if(this.teamIndex == 3) window.open("https://twitter.com/05Yugi", '_blank');
                if(this.teamIndex == 4) window.open("https://twitter.com/Voster_", '_blank');
                if(this.teamIndex == 6) window.open("https://twitter.com/strawhat595", '_blank');
                if(this.teamIndex == 7) window.open("https://www.linkedin.com/in/pierre-lucas-6752a8176/", '_blank');
            }
        })
    }



    update(){
        this.raycaster.setFromCamera( this.pointer, this.camera );
        this.intersects = this.raycaster.intersectObjects( this.cardArray );

        if(this.intersects.length){
            if(!this.currentIntersect){
                const rotationX = this.intersects[0].object.parent.rotation.x
                const tl = gsap.timeline()

                tl
                .to(this.intersects[0].object.parent.rotation,{
                    x : rotationX + 0.1,
                    duration :0.2
                })
                .to(this.intersects[0].object.parent.rotation,{
                    x : 0,
                    duration :0.3
                })
                this.currentIndex = this.intersects[0].object.name.split("team-photo")[1]


                document.documentElement.style.cursor = "initial"
                if(this.currentIndex == 7){
                    document.documentElement.style.cursor = "pointer"
                    this.linkedinLogo.style.opacity = 1
                }
                if(this.currentIndex == 3 || this.currentIndex == 4 || this.currentIndex == 6){
                    document.documentElement.style.cursor = "pointer"
                    this.twitterLogo.style.opacity = 1
                }
            }
            this.currentIntersect = this.intersects[0]
        }
        else{
            document.documentElement.style.cursor = "initial"
            this.twitterLogo.style.opacity = 0
            this.linkedinLogo.style.opacity = 0
            this.currentIntersect = null
        }

        

    }
}

