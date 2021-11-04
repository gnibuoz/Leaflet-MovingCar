import { getTranslation } from '../helpers';

const PMButton = L.Control.extend({
  options: {
    position: 'topleft',
  },
  // TODO: clean up variable names like _button should be _options and that domNodeVariable stuff
  initialize(options) {
    // replaced setOptions with this because classNames returned undefined 🤔
    this._button = Object.assign({}, this.options, options);
  },
  onAdd(map) {
    this._map = map;
    if (!this._map.pm.Toolbar.options.oneBlock) {
      if (this._button.tool === 'edit') {
        this._container = this._map.pm.Toolbar.editContainer;
      } else if (this._button.tool === 'options') {
        this._container = this._map.pm.Toolbar.optionsContainer;
      } else if (this._button.tool === 'custom') {
        this._container = this._map.pm.Toolbar.customContainer;
      } else {
        this._container = this._map.pm.Toolbar.drawContainer;
      }
    } else {
      this._container = this._map.pm.Toolbar._createContainer(this.options.position);
    }
    this.buttonsDomNode = this._makeButton(this._button);
    this._container.appendChild(this.buttonsDomNode);

    return this._container;
  },
  onRemove() {
    this.buttonsDomNode.remove();

    return this._container;
  },
  getText() {
    return this._button.text;
  },
  getIconUrl() {
    return this._button.iconUrl;
  },
  destroy() {
    this._button = {};
    this._update();
  },
  toggle(e) {
    if (typeof e === 'boolean') {
      this._button.toggleStatus = e;
    } else {
      this._button.toggleStatus = !this._button.toggleStatus;
    }
    this._applyStyleClasses();

    return this._button.toggleStatus;
  },
  toggled() {
    return this._button.toggleStatus;
  },
  onCreate() {
    this.toggle(false);
  },
  _triggerClick(e) {
    // TODO is this a big change when we change from e to a object with the event and the button? Now it's the second argument
    this._button.onClick(e, { button: this, event: e });
    this._clicked(e);
    this._button.afterClick(e, { button: this, event: e });
  },
  _makeButton(button) {
    const pos = this.options.position.indexOf("right") > -1 ? "pos-right" : "";

    // button container
    const buttonContainer = L.DomUtil.create(
      'div',
      'button-container',
      this._container
    );

    // the button itself
    const newButton = L.DomUtil.create(
      'a',
      'leaflet-buttons-control-button',
      buttonContainer
    );

    // the buttons actions
    const actionContainer = L.DomUtil.create(
      'div',
      `leaflet-pm-actions-container ${pos}`,
      buttonContainer
    );

    const activeActions = button.actions;

    const actions = {
      cancel: {
        text: getTranslation('actions.cancel'),
        onClick() {
          this._triggerClick();
        },
      },
      finishMode: {
        text: getTranslation('actions.finish'),
        onClick() {
          this._triggerClick();
        },
      },
      removeLastVertex: {
        text: getTranslation('actions.removeLastVertex'),
        onClick() {
          this._map.pm.Draw[button.jsClass]._removeLastVertex();
        },
      },
      finish: {
        text: getTranslation('actions.finish'),
        onClick(e) {
          this._map.pm.Draw[button.jsClass]._finishShape(e);
        },
      },
    };

    activeActions.forEach(name => {
      let action;
      if (actions[name]) {
        action = actions[name];
      } else if (name.text) {
        action = name;
      } else {
        return;
      }
      const actionNode = L.DomUtil.create(
        'a',
        `leaflet-pm-action ${pos} action-${name}`,
        actionContainer
      );

      actionNode.innerHTML = action.text;

      if (action.onClick) {
        L.DomEvent.addListener(actionNode, 'click', action.onClick, this);
      }
      L.DomEvent.disableClickPropagation(actionNode);
    });

    if (button.toggleStatus) {
      L.DomUtil.addClass(buttonContainer, 'active');
    }

    const image = L.DomUtil.create('div', 'control-icon', newButton);

    if (button.title) {
      image.setAttribute('title', button.title);
    }

    if (button.iconUrl) {
      image.setAttribute('src', button.iconUrl);
    }
    if (button.className) {
      L.DomUtil.addClass(image, button.className);
    }
    // before the actual click, trigger a click on currently toggled buttons to
    // untoggle them and their functionality
    L.DomEvent.addListener(newButton, 'click', () => {
      if (this._button.disableOtherButtons) {
        this._map.pm.Toolbar.triggerClickOnToggledButtons(this);
      }
    });
    L.DomEvent.addListener(newButton, 'click', this._triggerClick, this);

    L.DomEvent.disableClickPropagation(newButton);
    return buttonContainer;
  },

  _applyStyleClasses() {
    if (!this._container) {
      return;
    }

    if (!this._button.toggleStatus || this._button.cssToggle === false) {
      L.DomUtil.removeClass(this.buttonsDomNode, 'active');
      L.DomUtil.removeClass(this._container, 'activeChild');
    } else {
      L.DomUtil.addClass(this.buttonsDomNode, 'active');
      L.DomUtil.addClass(this._container, 'activeChild');
    }
  },

  _clicked() {
    if (this._button.doToggle) {
      this.toggle();
    }
  },
});

export default PMButton;
