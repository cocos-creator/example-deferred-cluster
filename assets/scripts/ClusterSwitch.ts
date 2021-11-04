
import { _decorator, Component, Node, director, Toggle } from 'cc';
import { JSB } from 'cc/env';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Cluster
 * DateTime = Thu Nov 04 2021 17:09:12 GMT+0800 (中国标准时间)
 * Author = lpfysp
 * FileBasename = Cluster.ts
 * FileBasenameNoExtension = Cluster
 * URL = db://assets/scripts/Cluster.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('ClusterSwitch')
export class ClusterSwitch extends Component {
    @property
    public clusterEnabled: boolean = false;

    start () {
        this.setupPipeline();
    }

    setupPipeline () {
        if (JSB) {
            director.root?.pipeline.setClusterEnabled(this.switchEnable);
        }
    }

    switchEnable (toggle: Toggle) {
        if (toggle.isChecked !== this.clusterEnabled) {
            this.clusterEnabled = toggle.isChecked;
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
