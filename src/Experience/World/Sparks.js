import * as THREE from 'three'
import Experience from '../Experience'
import fragmentShader from '../Shaders/Sparks/fragment.glsl'
import vertexShader from '../Shaders/Sparks/vertex.glsl'

export default class Sparks{
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.sparksCount = 300
        this.sparksSize = 600
        this.sparksRange = 2
        this.sparksSpeed = 5

        if(this.debug.active){
            this.debugFolder = this.debug.ui.addFolder('Sparks')
        }

        this.setSparks()
    }


    setSparks(){
        this.sparksGeometry = new THREE.BufferGeometry()
        this.position = new Float32Array(this.sparksCount * 3)
        this.scale = new Float32Array(this.sparksCount)
        this.randomSpeed = new Float32Array(this.sparksCount)
        this.offset = new Float32Array(this.sparksCount)
        this.rotation = new Float32Array(this.sparksCount)
        this.rotationSpeed = new Float32Array(this.sparksCount)
        

        for (let i = 0; i < this.sparksCount; i++) {
            this.i3 = i*3

            this.position[this.i3 + 0] =  Math.random() * this.sparksRange * 4 - this.sparksRange * 2
            this.position[this.i3 + 1] =  Math.random() * this.sparksRange * 2 - this.sparksRange
            this.position[this.i3 + 2] =  Math.random() * 2 - 1
            this.scale[i] = Math.random() * this.sparksSize + this.sparksSize / 3
            this.randomSpeed[i] = Math.random() * this.sparksSpeed * 0.5 + 1.0
            this.offset[i] = Math.random() * 20
            this.rotation[i] = Math.random() * Math.PI * 2
            this.rotationSpeed[i] = (Math.random() - 0.5) * 0.1
        }

        this.sparksGeometry.setAttribute("position", new THREE.BufferAttribute(this.position, 3))
        this.sparksGeometry.setAttribute("aScale", new THREE.BufferAttribute(this.scale, 1))
        this.sparksGeometry.setAttribute("aRandomSpeed", new THREE.BufferAttribute(this.randomSpeed, 1))
        this.sparksGeometry.setAttribute("aOffset", new THREE.BufferAttribute(this.offset, 1))
        this.sparksGeometry.setAttribute("aRotation", new THREE.BufferAttribute(this.rotation, 1))
        this.sparksGeometry.setAttribute("aRotationSpeed", new THREE.BufferAttribute(this.rotationSpeed, 1))

        this.sparksMaterial = new THREE.ShaderMaterial({
            uniforms : {
                uTime : {value : 0},
                uInsideColor : { value : new THREE.Color("#FFFFFF")},
                uColor : { value : new THREE.Color("#ff0000")},
                uAccentColor : {value : new THREE.Color("#FF2600")}
            },
            fragmentShader,
            vertexShader,
            blending :  THREE.AdditiveBlending,
            transparent : true,
            depthTest : false,
            depthWrite : false
        })

        this.sparksParticules =  new THREE.Points(
            this.sparksGeometry,
            this.sparksMaterial
        )

        this.sparksParticules.position.y = -2

        this.scene.add(this.sparksParticules)

        if(this.debug.active){

            this.debugFolder.addColor(this.sparksParticules.material.uniforms.uColor, "value")
            this.debugFolder.addColor(this.sparksParticules.material.uniforms.uInsideColor, "value")
            this.debugFolder.addColor(this.sparksParticules.material.uniforms.uAccentColor, "value")
        }

    }

    update(){
        this.sparksParticules.material.uniforms.uTime.value = this.time.elapsed
    }
}