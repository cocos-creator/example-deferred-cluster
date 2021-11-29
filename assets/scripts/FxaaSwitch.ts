
import { _decorator, Component, Node, Toggle, director, DeferredPipeline } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = FxaaSwitch
 * DateTime = Fri Nov 26 2021 17:14:09 GMT+0800 (中国标准时间)
 * Author = undefined
 * FileBasename = FxaaSwitch.ts
 * FileBasenameNoExtension = FxaaSwitch
 * URL = db://assets/scripts/FxaaSwitch.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('FxaaSwitch')
export class FxaaSwitch extends Component {
    fxaaEnabled: boolean = false;

    setupPipeline() {
        (director.root?.pipeline as DeferredPipeline).pipelineSceneData.antiAliasing = this.fxaaEnabled ? 1 : 0;
    }

    switchEnable (toggle: Toggle) {
        if (toggle.isChecked !== this.fxaaEnabled) {
            this.fxaaEnabled = toggle.isChecked;
            this.setupPipeline();
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
