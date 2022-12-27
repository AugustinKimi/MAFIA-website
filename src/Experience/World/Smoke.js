import * as THREE from 'three'
import Experience from '../Experience'
import fragmentShader from '../Shaders/Smokes/fragment.glsl'
import vertexShader from '../Shaders/Smokes/vertex.glsl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


export default class Smoke {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes

        this.setSmokePlane()
        this.setScrollTrigger()
    }


    setSmokePlane(){
        this.smokeGeometry = new THREE.PlaneBufferGeometry(this.sizes.width/150, this.sizes.height/150)
        this.smokeMaterial = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader,
            uniforms : {
                uTime : {value : 0},
                uProgress : {value : 0.5}  
            },
            transparent :true,
            blending : THREE.AdditiveBlending
        })


        this.smokes = new THREE.Mesh(
            this.smokeGeometry,
            this.smokeMaterial
        )
        this.smokes.position.y = 0
        this.smokes.position.z = -1.9

        this.scene.add(this.smokes)
    }


    setScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(this.smokes.material.uniforms.uProgress,
            {
                scrollTrigger : {
                    trigger : "#about",
                    start : "top top",
                    endTrigger : "#team",
                    end : "bottom top",
                    markers : true,
                    // end : "bottom bottom",
                    scrub : 1
                },
                value : 1
            })
    }

    update(){
        this.smokes.material.uniforms.uTime.value = this.time.elapsed
    }
}