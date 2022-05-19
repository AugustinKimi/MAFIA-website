import * as THREE from 'three'
import Experience from '../Experience'
import fragmentShader from '../Shaders/Background/fragment.glsl'
import vertexShader from '../Shaders/Background/vertex.glsl'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default class RedBackground{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.ressources = this.experience.ressources
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        this.debugObject = {}
        this.debugObject.darkColor =  "#050000"
        this.debugObject.accentColor =  "#ff0000"

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Background')
            this.setDebug()
        }

        this.setBackground()
        this.setScrollTrigger()
    }

    setBackground(){
        this.backgroundGeometry = new THREE.PlaneBufferGeometry(this.sizes.width/150, this.sizes.height/150)
        this.testMaterial = new THREE.MeshBasicMaterial({
            color : "#000000",
            // side : THREE.BackSide   
        })
        this.backgroundMaterial = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader,
            uniforms : {
                uTime : {value : this.time},
                uDarkColor : {value : new THREE.Color("#110000")},
                uAccentColor : {value : new THREE.Color("#FF0000")},
                // uProgre : {value : new THREE.Color("#FF0000")},
                uProgress : {value : 1}
            },
            // side : THREE.BackSide
        })


        this.backgroundMesh = new THREE.Mesh(
            this.backgroundGeometry,
            this.backgroundMaterial
        )
        this.backgroundMesh.position.y = 0
        this.backgroundMesh.position.z = -2

        this.scene.add(this.backgroundMesh)
    }

    resize() {
        // this.backgroundMesh.geometry
    }

    setScrollTrigger() {
        gsap.registerPlugin(ScrollTrigger)
        gsap.to(this.backgroundMesh.material.uniforms.uProgress,
            {
                scrollTrigger : {
                    trigger : "body",
                    start : "top top",
                    end : "bottom bottom",
                    scrub : 1
                },
                value : 1
            })
    }

    setDebug(){
        this.debugFolder.addColor(this.debugObject, "darkColor").onChange(() => {
            this.backgroundMesh.material.uniforms.uDarkColor.value = new THREE.Color(this.debugObject.darkColor)
        })
        this.debugFolder.addColor(this.debugObject, "accentColor").onChange(() => {
            this.backgroundMesh.material.uniforms.uAccentColor.value = new THREE.Color(this.debugObject.accentColor)
        })
    }

    update() {
        this.backgroundMaterial.uniforms.uTime.value = this.time.elapsed * 0.0000085 ;
      }
}