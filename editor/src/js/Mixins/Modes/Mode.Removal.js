const GlobalRemovalMode = {
  disableGlobalRemovalMode() {
    this._globalRemovalMode = false;
    this.map.eachLayer(layer => {
      layer.off('click', this.removeLayer, this);
    });

    // remove map handler
    this.map.off('layeradd', this.throttledReInitRemoval, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);

    this._fireRemovalModeEvent(false);
  },
  enableGlobalRemovalMode() {
    const isRelevant = layer =>
      layer.pm &&
      !(layer instanceof L.LayerGroup);

    this._globalRemovalMode = true;
    // handle existing layers
    this.map.eachLayer(layer => {
      if (isRelevant(layer)) {
        layer.pm.disable();
        layer.on('click', this.removeLayer, this);
      }
    });

    if (!this.throttledReInitRemoval) {
      this.throttledReInitRemoval = L.Util.throttle(this.reinitGlobalRemovalMode, 100, this)
    }

    // handle layers that are added while in removal  xmode
    this.map.on('layeradd', this.throttledReInitRemoval, this);

    // toogle the button in the toolbar if this is called programatically
    this.Toolbar.toggleButton('deleteLayer', this._globalRemovalMode);

    this._fireRemovalModeEvent(true);
  },
  _fireRemovalModeEvent(enabled) {
    this.map.fire('pm:globalremovalmodetoggled', {
      enabled,
      map: this.map,
    });
  },
  toggleGlobalRemovalMode() {
    // toggle global edit mode
    if (this.globalRemovalModeEnabled()) {
      this.disableGlobalRemovalMode();
    } else {
      this.enableGlobalRemovalMode();
    }
  },
  // TODO: Remove in the next major release
  globalRemovalEnabled() {
    return this.globalRemovalModeEnabled();
  },
  globalRemovalModeEnabled() {
    return !!this._globalRemovalMode;
  },
  removeLayer(e) {

    const layer = e.target;
    // only remove layer, if it's handled by leaflet-geoman,
    // not a tempLayer and not currently being dragged
    const removeable =
      !layer._pmTempLayer && (!layer.pm || !layer.pm.dragging());

    if (removeable) {
      layer.remove();
      if(layer instanceof L.LayerGroup){
        layer.fire('pm:remove', { layer, shape: undefined });
        this.map.fire('pm:remove', { layer, shape: undefined });
      }else{
        layer.fire('pm:remove', { layer, shape: layer.pm.getShape() });
        this.map.fire('pm:remove', { layer, shape: layer.pm.getShape() });
      }

    }
  },
  reinitGlobalRemovalMode({ layer }) {
    // do nothing if layer is not handled by leaflet so it doesn't fire unnecessarily
    const isRelevant = !!layer.pm && !layer._pmTempLayer;
    if (!isRelevant) {
      return;
    }

    // re-enable global removal mode if it's enabled already
    if (this.globalRemovalModeEnabled()) {
      this.disableGlobalRemovalMode();
      this.enableGlobalRemovalMode();
    }
  },
}

export default GlobalRemovalMode
