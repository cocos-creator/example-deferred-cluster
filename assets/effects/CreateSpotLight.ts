import { _decorator, Component, Node, Prefab, instantiate, Vec3, utils, randomRange, SpotLightComponent, Color, Quat, Mat4, Mat3, EditBox, MeshRenderer } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CreateSpotLight')
export class CreateLight extends Component {
    @property(Prefab)
    light: Prefab = null!;
    
    private _initP = new Vec3(0.0, 0.0, 0.0);
    private _nowP = new Vec3(0.0, 0.0, 0.0);
    
    private _low = 2.0;
    private _height = 3.51;
    private number2 = 0;
    private number3 = 1.0;
    private number4 = 1.0;
    private _num = 0;

    private _lightLst: Node[] = [];
    private _lightCnt: number = 5;
    private _timeLst: number[] = [];
    private _spdLst: Vec3[] = [];
    private _vList: Vec3[] = [];
    private _rotSpdLst: Vec3[] = [];
    
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
        this._rotSpdLst = [];
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

            const lightData = lightInst.getComponent(SpotLightComponent)!;
            lightData.luminousFlux = randomRange(10, 1000);
            lightData.range = 255 * lightData.luminousFlux;
            lightData.luminousFlux *= lightData.luminousFlux;
            lightData.spotAngle = randomRange(30, 100.0);
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
            this._rotSpdLst.push(new Vec3(randomRange(-5.0,5.0), randomRange(-5.0,5.0), randomRange(-5.0,5.0)));

        }
    }

    update (deltaTime: number) {
        this._num ++;

        for(let i = 0; i < this._lightCnt; i++){
            this.number2 = randomRange(0.1,0.9) / 50.0;
            this.number3 = this.number2 > 0.8 ? 1.0 : -1.0;
            this.number4 = this.number2 < 0.2 ? 1.0 : -1.0;

            this._timeLst[i] += this.number2 * this.number4;
            let spd: Vec3 = this._spdLst[i];
            
            let lightNode:Node = this._lightLst[i];
            
            let deletaRot:Vec3 =  this._rotSpdLst[i];
            let deletaQuat:Quat = new Quat();
            Quat.fromEuler(deletaQuat, deletaRot.x, deletaRot.y, deletaRot.z);
            Quat.normalize(deletaQuat, deletaQuat);
            let deletaMat:Mat3 = new Mat3();
            Mat3.fromQuat(deletaMat, deletaQuat);

            let nodeRot:Quat = new Quat();
            lightNode.getRotation(nodeRot);
            Quat.normalize(nodeRot, nodeRot);
            let nodeMat:Mat3 = new Mat3();
            Mat3.fromQuat(nodeMat, nodeRot);

            nodeMat = nodeMat.multiply(deletaMat);
            Quat.fromMat3(nodeRot, nodeMat);
            Quat.normalize(nodeRot, nodeRot);

            lightNode.setRotation(nodeRot);

            let nowPos = lightNode.getPosition();
            lightNode.setPosition(
            nowPos.x + Math.sin(this._timeLst[i] * spd.x) * this.number4 * this._vList[i].x, 
            nowPos.y + Math.sin(this._timeLst[i] * spd.y) * this.number3 * this._vList[i].y,
            nowPos.z + Math.cos(this._timeLst[i] * spd.z) * this.number3 * this._vList[i].z
            );
        }
    }
}