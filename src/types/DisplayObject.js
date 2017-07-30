import typeFactory from '../typeFactory';
import propertyFactory from '../propertyFactory';

const properties = [
    'alpha',
    'buttonMode',
    'height',
    'interactive',
    'interactiveChildren',
    'pivot',
    'rotation',
    'scale',
    'skew',
    'visible',
    'width',
    'x',
    'y',
];

function toJson(instance) {
    return {
        type: 'DisplayObject',
        properties: propertyFactory.toJson(instance, properties),
    };
}

function fromJson(json, instance) {
    if (!instance) {
        instance = new PIXI.DisplayObject();
    }

    propertyFactory.fromJson(json.properties);

    return instance;
}

typeFactory.addType('DisplayObject', PIXI.DisplayObject, toJson, fromJson);
