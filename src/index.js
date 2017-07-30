import './propertyTypes/Boolean';
import './propertyTypes/Number';
import './propertyTypes/PIXI.Point';

import './types/DisplayObject';
// import './types/Container';
// import './types/Sprite';

import propertyFactory from './propertyFactory';
import typeFactory from './typeFactory';

export default {
    addProperty: propertyFactory.addPropertyType,
    addType: typeFactory.addType,
    toJson: typeFactory.toJson,
    fromJson: typeFactory.fromJson,
};
