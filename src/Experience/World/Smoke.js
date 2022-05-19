import * as THREE from 'three'
import Experience from '../Experience'
import fragmentShader from '../Shaders/Smokes/fragment.glsl'
import vertexShader from '../Shaders/Smokes/vertex.glsl'


export default class Smoke {
    constructor(){
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes

        // this.setSmokes()
        this.setSmokePlane()
    }

    setSmokes(){
        this.count = 20
        this.smokeGeometry = new THREE.BufferGeometry()
        this.position = new Float32Array(this.count  * 3)
        this.scale = new Float32Array(this.count)
        this.speed = new Float32Array(this.count)

        for (let i = 0; i < this.count; i++) {
            this.i3 = i * 3

            this.position[this.i3 + 0] = (Math.random() - 0.5)  * 4
            this.position[this.i3 + 1] = (Math.random() - 0.5) * 4
            this.position[this.i3 + 2] = (Math.random() - 0.5) * 4
            this.scale[i] = Math.random() * 1000
            this.speed[i] = Math.random() * 4
        }

        this.smokeGeometry.setAttribute("position", new THREE.BufferAttribute(this.position, 3))
        this.smokeGeometry.setAttribute("aScale", new THREE.BufferAttribute(this.scale, 1))
        this.smokeGeometry.setAttribute("aSpeed", new THREE.BufferAttribute(this.speed, 1))

        this.smokeMaterial = new THREE.ShaderMaterial({
            uniforms : {
                uTime : {value : 0},
                uSmokeTexture : {value : this.resources.items.smokeTetxure}
            },
            vertexShader,
            fragmentShader,
            blending : THREE.AdditiveBlending,
            transparent : true,
            depthTest : false,
            depthWrite : false
        })

        this.basicMaterial = new THREE.PointsMaterial({
            color : "green",
            size : 5,
            blending : THREE.AdditiveBlending,
            transparent : true,
            depthTest : false,
            depthWrite : false
        })

        this.smokes = new THREE.Points(
            this.smokeGeometry,
            this.basicMaterial
        )

        this.scene.add(this.smokes)

    }

    setSmokePlane(){
        this.smokeGeometry = new THREE.PlaneBufferGeometry(this.sizes.width/150, this.sizes.height/150)
        this.testMaterial = new THREE.MeshBasicMaterial({
            color : "#000000",
            // side : THREE.BackSide   
        })
        this.smokeMaterial = new THREE.ShaderMaterial({
            fragmentShader,
            vertexShader,
            uniforms : {
                uTime : {value : 0}
            },
            transparent :true,
            blending : THREE.AdditiveBlending
        })


        this.smokes = new THREE.Mesh(
            this.smokeGeometry,
            this.smokeMaterial
        )
        // this.smokes.scale.set(0.5, 0.5, 0.5)
        this.smokes.position.y = 0
        this.smokes.position.z = -1.9

        this.scene.add(this.smokes)
    }

    update(){
        this.smokes.material.uniforms.uTime.value = this.time.elapsed
    }
}