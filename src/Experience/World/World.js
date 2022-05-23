import Experience from '../Experience.js'
import Environment from './Environment.js'
import BagAndGun from './BagAndGun.js'
import Sparks from './Sparks.js'
import RedBackground from './RedBackground.js'
import Smoke from './Smoke.js'
import Team from './Team.js'
import Fireflies from './Fireflies.js'
import MovingLight from './MovingLight.js'
export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.gunAndBag = new BagAndGun()
            this.movingLight = new MovingLight
            this.sparks = new Sparks()
            this.smoke = new Smoke()
            this.fireflies = new Fireflies()
            this.team = new Team()
            this.sphereBackground = new RedBackground()
            this.environment = new Environment()
        })
    }

    update(){
        if(this.movingLight) this.movingLight.update()
        if(this.fireflies) this.fireflies.update()
        if(this.gunAndBag) this.gunAndBag.update()
        if(this.team) this.team.update()
        if(this.smoke) this.smoke.update()
        if(this.sparks) this.sparks.update()
        if(this.sphereBackground) this.sphereBackground.update()
    }
}