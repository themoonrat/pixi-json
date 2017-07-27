import isArray from 'lodash-es/isArray';
import isFunction from 'lodash-es/isFunction';

export default function () {
    PIXI.Container.prototype.toJSON = function toJSON() {
        const json = PIXI.DisplayObject.prototype.toJSON.call( this );

        json.children = [];
        for (let i = 0; i < this.children.length; ++i) {
            if (isFunction(this.children.toJSON)) {
                json.children.push(this.children.toJSON());
            }
        }

        return json;
    };

    PIXI.Container.prototype.updateViaJSON = function updateViaJSON(json) {
		PIXI.DisplayObject.protoype.updateViaJSON.call(this, json);
		
        if (isArray(json.children)) {
            for (let i = 0; i < json.children.length; ++i) {
                if (this.children[i]) {
                    this.children[i].updateViaJSON(json[i]);
                }
            }
        }
    };

    PIXI.Container.fromJSON = function fromJSON(json, parent) {
        const container = new PIXI.Container();

        container.updateViaJSON(json);

        if (parent && parent.addChild) {
            parent.addChild(container);
        }

        return container;
    };
}
