import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.debug = this.experience.debug

        if(this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder("Camear")
        }

        this.setInstance()
        this.moveCamera()
        // this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(35, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(0, 0, 4)
        this.instance.lookAt(0, 0, 0)
        this.scene.add(this.instance)

        if(this.debug.active){
            this.debugFolder.add(this.instance.position, "x") .min(-10).max(10).step(0.01)
            this.debugFolder.add(this.instance.position, "y") .min(-10).max(10).step(0.01)
            this.debugFolder.add(this.instance.position, "z") .min(-10).max(10).step(0.01)
        }
    }

    

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    moveCamera(){
        this.mouse = new THREE.Vector2()

        window.addEventListener('mousemove', (event) =>
        {
            this.mouse.x = event.clientX / this.sizes.width * 2 - 1
            this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1
        })
    }

    update(){
        this.instance.position.x = THREE.MathUtils.lerp(this.instance.position.x, (this.mouse.x * Math.PI) / 10, 0.005)
        this.instance.position.y = THREE.MathUtils.lerp(this.instance.position.y, (this.mouse.y * Math.PI) / 10, 0.005)
    }
}