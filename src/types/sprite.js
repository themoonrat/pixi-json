import isNumber from 'lodash-es/isNumber';
import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';

export default function () {
    PIXI.Sprite.prototype.toJSON = function toJSON() {
        const json = PIXI.Container.prototype.toJSON.call( this );

        json.anchor = {
            x: this.anchor.x,
            y: this.anchor.y,
        };
        json.blendMode = this.blendMode;
        json.pluginName = this.pluginName;
        json.textureCacheId = this.texture.textureCacheIds[0];
        json.tint = this.tint;

        return json;
    };

    PIXI.Sprite.prototype.updateViaJSON = function updateViaJSON(json) {
		PIXI.Container.protoype.updateViaJSON.call(this, json);

        if (isObject(json.anchor)) {
            if (isNumber(json.anchor.x)) {
                this.anchor.x = json.anchor.x;
            }
            if (isNumber(json.anchor.y)) {
                this.anchor.y = json.anchor.y;
            }
        }

        if (isNumber(json.blendMode)) {
            this.blendMode = json.blendMode;
        }

        if (isString(json.pluginName)) {
            this.pluginName = json.pluginName;
        }

        if (isString(json.textureCacheId) && PIXI.utils.TextureCache[json.textureCacheId]) {
            this.texture = PIXI.utils.TextureCache[json.textureCacheId];
        }

        if (isNumber(json.tint)) {
            this.tint = json.tint;
        }
    };

    PIXI.Sprite.fromJSON = function fromJSON(json, parent) {
        const sprite = new PIXI.Sprite();

        sprite.updateViaJSON(json);

        if (parent && parent.addChild) {
            parent.addChild(sprite);
        }

        return sprite;
    };
}
