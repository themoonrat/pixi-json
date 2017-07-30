import propertyFactory from '../propertyFactory';

function toJson(value) {
    return !!value;
}

function fromJson(instance, key, value) {
    instance[key] = !!value;
}

propertyFactory.addPropertyType(Boolean, toJson, fromJson);
