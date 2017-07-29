import isObject from 'lodash-es/isObject';
import isBoolean from 'lodash-es/isBoolean';
import isNumber from 'lodash-es/isNumber';

PIXI.DisplayObject.prototype.toJSON = function toJSON() {
    return {
        alpha: this.alpha,
        buttonMode: this.buttonMode,
        height: this.height,
        interactive: this.interactive,
        interactiveChildren: this.interactiveChildren,
        pivot: {
            x: this.pivot.x,
            y: this.pivot.y,
        },
        rotation: this.rotation,
        scale: {
            x: this.scale.x,
            y: this.scale.y,
        },
        visible: this.visible,
        width: this.width,
        x: this.x,
        y: this.y,

    };
};

PIXI.DisplayObject.prototype.updateViaJSON = function updateViaJSON(json) {
    if (isNumber(json.alpha)) {
        this.alpha = json.alpha;
    }

    if (isBoolean(json.buttonMode)) {
        this.buttonMode = json.buttonMode;
    }

    if (isNumber(json.height)) {
        this.height = json.height;
    }

    if (isBoolean(json.interactive)) {
        this.interactive = json.interactive;
    }

    if (isBoolean(json.interactiveChildren)) {
        this.interactiveChildren = json.interactiveChildren;
    }

    if (isObject(json.pivot)) {
        if (isNumber(json.pivot.x)) {
            this.pivot.x = json.pivot.x;
        }

        if (isNumber(json.pivot.y)) {
            this.pivot.y = json.pivot.y;
        }
    }

    if (isNumber(json.rotation)) {
        this.rotation = json.rotation;
    }

    if (isObject(json.scale)) {
        if (isNumber(json.scale.x)) {
            this.scale.x = json.scale.x;
        }
        if (isNumber(json.scale.y)) {
            this.scale.y = json.scale.y;
        }
    }

    if (isBoolean(json.visible)) {
        this.visible = json.visible;
    }

    if (isNumber(json.width)) {
        this.width = json.width;
    }

    if (isNumber(json.x)) {
        this.x = json.x;
    }
    if (isNumber(json.y)) {
        this.y = json.y;
    }
};

PIXI.DisplayObject.fromJSON = function fromJSON(json, parent) {
    const displayObject = new PIXI.DisplayObject();

    displayObject.updateViaJSON(json);

    if (parent && parent.addChild) {
        parent.addChild(displayObject);
    }

    return displayObject;
};
