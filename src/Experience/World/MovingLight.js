import * as THREE from 'three'
import { Int8BufferAttribute, PointLightHelper } from 'three'
import Experience from '../Experience.js'

export default class MovingLight {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.time = this.experience.time
        this.sizes = this.experience.sizes
        
        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder("MovingLight")
        }

        this.setLight()
        this.moveLight()
    }


    setLight(){
        this.light = new THREE.PointLight("#ff7300", 1)
        this.light.position.set(0, 0, 2)
        if(this.debug.active){
            this.debugFolder.addColor(this.light, "color")
        }

        this.scene.add(this.light)
    }

    moveLight(){
        this.mouse = new THREE.Vector2()

        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1

        })
    }

    update(){
        this.light.position.x = this.mouse.x
        this.light.position.y = this.mouse.y
    }

}