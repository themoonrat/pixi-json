import isArray from 'lodash-es/isArray';
import isFunction from 'lodash-es/isFunction';
import isObject from 'lodash-es/isObject';
import isString from 'lodash-es/isString';

const propertyTypeMap = {};

export default {
    addPropertyType(propertyType, toJson, fromJson) {
        if (!isString(propertyType) || propertyTypeMap[propertyType] || !isFunction(toJson) || !isFunction(fromJson)) {
            return;
        }

        propertyTypeMap[propertyType] = {
            toJson,
            fromJson,
        };
    },

    toJson(instance, properties) {
        if (!isObject(instance) || !isArray(properties)) {
            return;
        }

        const json = {};

        for (let i = 0; i < properties.length; ++i) {
            const propertyName = properties[i];

            if (propertyTypeMap[propertyName]) {
                const propertyToJson = propertyTypeMap[propertyName].toJson;

                json[propertyName] = propertyToJson(instance, propertyName);
            }
        }
    },

    fromJson(instance, json) {
        if (!isObject(instance) || !isObject(json)) {
            return;
        }

        for (const [key, value] of Object.entries(json)) {
            if (propertyTypeMap[key]) {
                const propertyFromJson = propertyTypeMap[key].fromJson;

                instance[key] = propertyFromJson(instance, value);
            }
        }
    },
};
