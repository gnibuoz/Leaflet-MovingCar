import SnapMixin from '../Mixins/Snapping';

const Draw = L.Class.extend({
  includes: [SnapMixin],
  options: {
    snappable: true,
    snapDistance: 20,
    tooltips: true,
    cursorMarker: true,
    finishOnDoubleClick: false,
    finishOn: null,
    allowSelfIntersection: true,
    templineStyle: {},
    hintlineStyle: {
      color: '#3388ff',
      dashArray: '5,5',
    },
    markerStyle: {
      draggable: true,
    },
  },
  setOptions(options) {
    L.Util.setOptions(this, options);
  },
  initialize(map) {
    // save the map
    this._map = map;

    // define all possible shapes that can be drawn
    this.shapes = ['Marker', 'CircleMarker', 'Line', 'Polygon', 'Rectangle', 'Circle', 'Cut'];

    // initiate drawing class for our shapes
    this.shapes.forEach(shape => {
      this[shape] = new L.PM.Draw[shape](this._map);
    });
  },
  setPathOptions(options) {
    this.options.pathOptions = options;
  },
  getShapes() {
    // if somebody wants to know what shapes are available
    return this.shapes;
  },
  enable(shape, options) {
    if (!shape) {
      throw new Error(
        `Error: Please pass a shape as a parameter. Possible shapes are: ${this.getShapes().join(
          ','
        )}`
      );
    }

    // disable drawing for all shapes
    this.disable();

    // enable draw for a shape
    this[shape].enable(options);
  },
  disable() {
    // there can only be one drawing mode active at a time on a map
    // so it doesn't matter which one should be disabled.
    // just disable all of them
    this.shapes.forEach(shape => {
      this[shape].disable();
    });
  },
  addControls() {
    // add control buttons for our shapes
    this.shapes.forEach(shape => {
      this[shape].addButton();
    });
  },
  getActiveShape() {
    // returns the active shape
    let enabledShape;
    this.shapes.forEach(shape => {
      if (this[shape]._enabled) {
        enabledShape = shape;
      }
    });
    return enabledShape;
  },
  _setGlobalDrawMode() {
    // extended to all PM.Draw shapes
    if (this._shape === "Cut") {
      this._map.fire('pm:globalcutmodetoggled', {
        enabled: !!this._enabled,
        map: this._map,
      });
    } else {
      this._map.fire('pm:globaldrawmodetoggled', {
        enabled: this._enabled,
        shape: this._shape,
        map: this._map,
      });
    }
  },

  createNewDrawInstance(name, jsClass) {
    const instance = this._getShapeFromBtnName(jsClass);
    if (this[name]) {
      throw new TypeError(
        "Draw Type already exists"
      );
    }
    if (!L.PM.Draw[instance]) {
      throw new TypeError(
        `There is no class L.PM.Draw.${instance}`
      );
    }

    this[name] = new L.PM.Draw[instance](this._map);
    this[name].toolbarButtonName = name;
    this[name]._shape = name;
    this.shapes.push(name);

    // needed when extended / copied from a custom instance
    if (this[jsClass]) {
      this[name].setOptions(this[jsClass].options);
    }
    // Re-init the options, so it is not referenced with the default Draw class
    this[name].setOptions(this[name].options);

    return this[name];
  },
  _getShapeFromBtnName(name) {
    const shapeMapping = {
      "drawMarker": "Marker",
      "drawCircle": "Circle",
      "drawPolygon": "Polygon",
      "drawPolyline": "Line",
      "drawRectangle": "Rectangle",
      "drawCircleMarker": "CircleMarker",
      "editMode": "Edit",
      "dragMode": "Drag",
      "cutPolygon": "Cut",
      "removalMode": "Removal"
    };

    if (shapeMapping[name]) {
      return shapeMapping[name];
    }
    return this[name] ? this[name]._shape : name;
  },
  _addDrawnLayerProp(layer){
    layer._drawnByGeoman = true;
  },
  _setShapeForFinishLayer(layer){
    layer.pm._shape = this._shape;
  }
});

export default Draw;
