import Edit from './L.PM.Edit';

// LayerGroup doesn't inherit from L.PM.Edit because it's just calling L.PM.Edit.Polygon
// (which inherits from L.PM.Edit) for each layer,
// so it's not really a parent class
Edit.LayerGroup = L.Class.extend({
  initialize(layerGroup) {
    this._layerGroup = layerGroup;
    this._layers = this.findLayers();

    // init all layers of the group
    this._layers.forEach(layer => this._initLayer(layer));

    // if a new layer is added to the group, reinitialize
    // This only works for FeatureGroups, not LayerGroups
    // https://github.com/Leaflet/Leaflet/issues/4861
    this._layerGroup.on('layeradd', e => {
      if (e.target._pmTempLayer) {
        return;
      }

      this._layers = this.findLayers();
      // init the newly added layer
      if (e.layer.pm) {
        this._initLayer(e.layer);
      }
      // if editing was already enabled for this group, enable it again
      // so the new layers are enabled
      if (e.target.pm.enabled()) {
        this.enable(this.getOptions());
      }
    });

    // if a layer is removed from the group, calc the layers list again
    this._layerGroup.on('layerremove', e => {
      if (e.target._pmTempLayer) {
        return;
      }

      this._layers = this.findLayers();
    })
  },
  findLayers() {
    // get all layers of the layer group
    let layers = this._layerGroup.getLayers();

    // filter out layers that are no layerGroup
    layers = layers.filter(layer => !(layer instanceof L.LayerGroup));

    // filter out layers that don't have leaflet-geoman
    layers = layers.filter(layer => !!layer.pm);

    // filter out everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter(layer => !layer._pmTempLayer);

    // return them
    return layers;
  },
  _initLayer(layer) {
    // available events
    const availableEvents = [
      'pm:edit',
      'pm:update',
      'pm:enable',
      'pm:disable',
      'pm:remove',
      'pm:dragstart',
      'pm:drag',
      'pm:dragend',
      'pm:snap',
      'pm:unsnap',
      'pm:cut',
      'pm:intersect',
      'pm:markerdragend',
      'pm:markerdragstart',
      'pm:vertexadded',
      'pm:vertexremoved',
      'pm:centerplaced',
    ];

    // listen to the events of the layers in this group
    availableEvents.forEach(event => {
      layer.on(event, this._fireEvent, this);
    });

    // add reference for the group to each layer inside said group
    layer.pm._layerGroup = this._layerGroup;
  },
  _fireEvent(e) {
    this._layerGroup.fireEvent(e.type, e);
  },
  toggleEdit(options) {
    this._options = options;
    this._layers.forEach(layer => {
      layer.pm.toggleEdit(options);
    });
  },
  enable(options) {
    this._options = options;
    this._layers.forEach(layer => {
      layer.pm.enable(options);
    });
  },
  disable() {
    this._layers.forEach(layer => {
      layer.pm.disable();
    });
  },
  enabled() {
    const enabled = this._layers.find(layer => layer.pm.enabled());
    return !!enabled;
  },
  dragging() {
    const dragging = this._layers.find(layer => layer.pm.dragging());
    return !!dragging;
  },
  getOptions() {
    return this._options;
  },
});
