import isObject from 'lodash-es/isObject';
import isBoolean from 'lodash-es/isBoolean';
import isNumber from 'lodash-es/isNumber';

import typeFactory from '../typeFactory';
import propertyFactory from '../propertyFactory';

const properties = [
    { name: 'alpha', type: 'number' },
    { name: 'buttonMode', type: 'boolean' },
    { name: 'height', type: 'number' },
    { name: 'interactive', type: 'boolean' },
    { name: 'interactiveChildren', type: 'boolean' },
    { name: 'pivot', type: 'point' },
    { name: 'rotation', type: 'number' },
    { name: 'scale', type: 'point' },
    { name: 'visible', type: 'boolean' },
    { name: 'width', type: 'number' },
    { name: 'x', type: 'number' },
    { name: 'y', type: 'number' },
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

typeFactory.addType('DisplayObject', toJson, fromJson);
