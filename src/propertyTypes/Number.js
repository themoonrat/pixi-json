import toNumber from 'lodash-es/toNumber';

import propertyFactory from '../propertyFactory';

function toJson(value) {
    return toNumber(value);
}

function fromJson(instance, key, value) {
    instance[key] = toNumber(value);
}

propertyFactory.addPropertyType(Number, toJson, fromJson);
