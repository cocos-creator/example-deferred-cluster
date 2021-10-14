import { _decorator, Component, Node, Prefab, instantiate, Vec3, randomRange, SphereLightComponent, Color, EditBox, MeshRenderer, Vec4 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CreateSphereLight')
export class CreateLight extends Component {
    @property(Prefab)
    light: Prefab = null;
    
    private _initP = new Vec3(0.0, 0.0, 0.0);
    private _nowP = new Vec3(0.0, 0.0, 0.0);
    
    private _low = 2.0;
    private _height = 3.51;
    private number2 = 0;
    private number3 = 1.0;
    private number4 = 1.0;
    private _num = 0;

    private _lightLst: Node[] = [];
    private _lightCnt: number = 50;
    private _timeLst: number[] = [];
    private _spdLst: Vec3[] = [];
    private _vList: Vec3[] = [];

    changeLight(box:EditBox) {
        this.clear();
        this._lightCnt = parseInt(box.string);
        this.start();
    }

    clear() {
        for (let i = 0; i < this._lightCnt; ++i) {
            this._lightLst[i].destroy();
        }
        this._lightLst = [];
        this._timeLst = [];
        this._spdLst = [];
        this._vList = [];
    }
    
    
    start () {
        for(let i = 0; i < this._lightCnt; i++){
            const lightInst = instantiate(this.light!) as Node;
            lightInst.parent = this.node;
            const rangex = randomRange(-20,20);
            const rangey = randomRange(-20,20);
            const rangez = randomRange(-20,20);
            console.log(rangex);
            lightInst.position = new Vec3(rangex, rangey, rangez);
            lightInst.getWorldPosition(this._initP);

            const lightData = lightInst.getComponent(SphereLightComponent)!;
            lightData.luminousFlux = randomRange(10, 1000);
            lightData.range = 255 * lightData.luminousFlux;
            lightData.luminousFlux *= lightData.luminousFlux;
            console.log(lightData.luminousFlux);
            lightData.color = new Color(randomRange(0, 255), randomRange(0, 255), randomRange(0, 255));

            let model = lightInst.getComponentInChildren(MeshRenderer);
            if (model)
            {
                model.getMaterialInstance(0)!.setProperty("emissive", lightData.color);
                model.getMaterialInstance(0)!.setProperty("mainColor", new Color(0, 0, 0, 255));
            } 

            this._lightLst.push(lightInst);
            this._timeLst.push(0);
            this._spdLst.push(new Vec3(randomRange(-1,1), randomRange(-1,1), randomRange(-1,1)));
            this._vList.push(new Vec3(randomRange(0.1,0.3), randomRange(0.1,0.3), randomRange(0.1,0.3)));
        }
    }

    update (deltaTime: number) {

     
        this._num ++;
 
        if (this._num % 50 === 0) {

        }

        for(let i = 0; i < this._lightCnt; i++){
            this.number2 = randomRange(0.1,0.9) / 50.0;
            this.number3 = this.number2 > 0.8 ? 1.0 : -1.0;
            this.number4 = this.number2 < 0.2 ? 1.0 : -1.0;

            this._timeLst[i] += this.number2 * this.number4;
            let spd: Vec3 = this._spdLst[i];
            
            let lightNode:Node = this._lightLst[i];
            let nowPos = lightNode.getPosition();
            lightNode.setPosition(
            nowPos.x + Math.sin(this._timeLst[i] * spd.x) * this.number4 * this._vList[i].x, 
            nowPos.y + Math.sin(this._timeLst[i] * spd.y) * this.number3 * this._vList[i].y,
            nowPos.z + Math.cos(this._timeLst[i] * spd.z) * this.number3 * this._vList[i].z
            );
        }
    }
}