import isNull from 'lodash-es/isNull';
import isObject from 'lodash-es/isObject';
import isUndefined from 'lodash-es/isUndefined';
import toNumber from 'lodash-es/toNumber';

import propertyFactory from '../propertyFactory';

function toJson(value) {
    return {
        x: toNumber(value.x),
        y: toNumber(value.y),
    };
}

function fromJson(instance, key, value) {
    if (isObject(value)) {
        if (!isNull(value.x) && !isUndefined(value.x)) {
            instance[key].x = toNumber(value.x);
        }

        if (!isNull(value.y) && !isUndefined(value.y)) {
            instance[key].y = toNumber(value.y);
        }
    }
}

propertyFactory.addPropertyType(PIXI.Point, toJson, fromJson);
