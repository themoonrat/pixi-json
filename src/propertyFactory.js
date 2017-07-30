import isArray from 'lodash-es/isArray';
import isFunction from 'lodash-es/isFunction';
import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';

const propertyMap = {};

export default {
    addProperty(propertyName, toJson, fromJson) {
        if (!isString(propertyName) || propertyMap[propertyName] || !isFunction(toJson) || !isFunction(fromJson)) {
            return;
        }

        propertyMap[propertyName] = {
            toJson,
            fromJson,
        };
    },

    toJson(instance, propertyNames) {
        if (!isObject(instance) || !isArray(propertyNames)) {
            return;
        }

        const json = {};

        for (let i = 0; i < propertyNames.length; ++i) {
            const propertyName = propertyNames[i];

            if (propertyMap[propertyName]) {
                const propertyToJson = propertyMap[propertyName].toJson;

                json[propertyName] = propertyToJson(instance, propertyName);
            }
        }
    },

    fromJson(instance, json) {
        if (!isObject(instance) || !isObject(json)) {
            return;
        }

        for (const [key, value] of Object.entries(json)) {
            if (propertyMap[key]) {
                const propertyFromJson = propertyMap[key].fromJson;

                instance[key] = propertyFromJson(instance, value);
            }
        }
    },
};
