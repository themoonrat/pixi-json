import isArray from 'lodash-es/isArray';
import isFunction from 'lodash-es/isFunction';
import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';

const typeMap = {};

export default {
    addType(typeName, toJson, fromJson) {
        if (!isString(typeName) || typeMap[typeName] || !isFunction(toJson) || !isFunction(fromJson)) {
            return;
        }

        typeMap[typeName] = {
            toJson,
            fromJson,
        };
    },

    toJson(instance) {
        if (!isObject(instance) || !typeMap[instance.contructor.name]) {
            return;
        }

        return typeMap[instance.contructor.name].toJson(instance);
    },

    fromJson(json, instance) {
        if (!isObject(json) || !isString(json.type)) {
            return;
        }

        if (isObject(instance)) {
            if (json.type !== instance.contructor.type) {
                return;
            }
        }

        return typeMap[json.type].fromJson(json, instance);
    },
};
