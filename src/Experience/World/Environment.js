import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }
        this.setAmbientLight()
        this.setSunLight()
        this.setRedLight()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 0.514)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, 2)
        this.scene.add(this.sunLight)

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('sunLightX')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('sunLightY')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('sunLightZ')
                .min(- 5)
                .max(5)
                .step(0.001)
        }
    }
    
    setRedLight(){
        this.redPointLight = new THREE.PointLight()
        this.redPointLight.color = new THREE.Color("#ff0900")
        this.redPointLight.intensity = 5
        this.redPointLight.distance = 50
        this.redPointLight.decay = 2
        this.redPointLight.position.set(0, -2, 1)
        this.scene.add(this.redPointLight)
        if(this.debug.active){
            this.debugFolder.addColor(this.redPointLight, "color")
            this.debugFolder.add(this.redPointLight, "intensity").min(0).max(100).step(0.01)
            this.debugFolder.add(this.redPointLight, "distance").min(0).max(100).step(0.01)
            this.debugFolder.add(this.redPointLight, "decay").min(0).max(2).step(0.001)
            this.debugFolder.add(this.redPointLight.position, "x").min(0).max(20).step(0.01)
            this.debugFolder.add(this.redPointLight.position, "y").min(0).max(20).step(0.01)
            this.debugFolder.add(this.redPointLight.position, "z").min(0).max(20).step(0.01)
        }


    }

    setAmbientLight() {
        this.ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.2)
        this.scene.add(this.ambientLight)
    }

}