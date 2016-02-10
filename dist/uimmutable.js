/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

rey.component("uim.Button", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          htmlType: field.get("htmlType"),
          disabled: field.get("disabled"),
          className: field.get("className")
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool.isRequired,
      htmlType: React.PropTypes.string.isRequired,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List(),
        htmlType: "button",
        disabled: false
      };
    },

    handleClick: function (event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
    },

    render: function () {

      var classes = { button: true };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "button",
        {
          "data-button-name": this.props.name,
          type: this.props.htmlType,
          disabled: this.props.disabled,
          className: classNames(classes),
          onClick: this.handleClick },
        this.props.label
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.ButtonGroup", ["React", "Immutable", "classNames", "uim.Button", function (React, Immutable, classNames, Button) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          buttons: field.get("buttons"),
          className: field.get("className"),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      buttons: React.PropTypes.List.isRequired,
      onClick: React.PropTypes.func.isRequired,
      className: React.PropTypes.string
    },

    handleClick: function (button, event) {
      if (this.props.onClick) {
        event.button = button;
        this.props.onClick(event);
      }
    },

    renderButton: function (button, index) {
      var props = Button.pickProps(this.props.path, button);
      return React.createElement(Button, _extends({ key: index }, props, { onClick: this.handleClick.bind(this, button) }));
    },

    render: function () {

      var classes = {};
      classes["button-group"] = true;
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "div",
        { "data-field-name": this.props.name, className: classNames(classes) },
        this.props.buttons.map(this.renderButton)
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.CheckGroup", ["React", "Immutable", "classNames", "uim.Button", "uim.Field", function (React, Immutable, classNames, Button, Field) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          checkboxes: field.get("checkboxes"),
          className: field.get("className"),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      label: React.PropTypes.string,
      input: React.PropTypes.bool.isRequired,
      checkboxes: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      onChange: React.PropTypes.func.isRequired,
      className: React.PropTypes.string
    },

    renderCheckbox: function (option, index) {

      var name = option.get("name") || index;
      var label = option.get("label") || name;
      var path = this.props.path.push(name);

      return React.createElement(Checkbox, { ref: name,
        key: index,
        path: path,
        name: name,
        label: label,
        checked: !!this.props.values.getIn(path),
        disabled: option.get("disabled"),
        onChange: this.props.onChange });
    },

    render: function () {

      var classes = {};
      classes["check-group"] = true;
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        Field,
        { ref: "field",
          name: this.props.name,
          label: this.props.label,
          className: classNames(classes) },
        this.props.checkboxes.map(this.renderCheckbox)
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Checkbox", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          className: field.get("className"),
          disabled: field.get("disabled"),
          value: field.get("value"),
          checked: !!values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      checked: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func.isRequired,
      onChange: React.PropTypes.func.isRequired,
      value: React.PropTypes.any,
      disabled: React.PropTypes.bool,
      className: React.PropTypes.string
    },

    handleClick: function (event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.checked,
          event: event
        });
      }
    },

    handleChange: function (event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.checked,
          event: event
        });
      }
    },

    render: function () {

      var classes = { checkbox: true, disabled: this.props.disabled };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "label",
        { className: classNames(classes) },
        React.createElement("input", { ref: "input",
          type: "checkbox",
          name: this.props.name,
          checked: this.props.checked,
          disabled: this.props.disabled,
          value: this.props.value,
          onClick: this.handleClick,
          onChange: this.handleChange }),
        React.createElement(
          "span",
          null,
          this.props.label
        )
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.DateField", ["React", "Immutable", "classNames", "uim.Value", "uim.Field", function (React, Immutable, classNames, Value, Field) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          className: field.get("className"),
          value: values.getIn(path)
        };
      }
    },
    propTypes: {
      path: React.PropTypes.List.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    handleChange: function (event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    render: function () {

      var classes = {};
      classes["date-field"] = true;
      classes[this.props.className] = !!this.props.className;

      var content;

      if (this.props.input) {
        content = React.createElement("input", {
          ref: "input",
          type: "date",
          value: this.props.value,
          onChange: this.handleChange });
      } else {
        content = React.createElement(Value, {
          className: "date-value",
          path: this.props.path,
          name: this.props.name,
          value: this.props.value,
          format: "date" });
      }

      return React.createElement(
        Field,
        { ref: "field",
          className: classNames(classes),
          name: this.props.name,
          label: this.props.label },
        content
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

"use strict";

rey.component("uim.Failure", ["React", "Immutable", "classNames", "uim.Icon", function (React, Immutable, classNames, Icon) {

  return {

    propTypes: {
      label: React.PropTypes.string.isRequired,
      message: React.PropTypes.string,
      buttonLabel: React.PropTypes.string.isRequired,
      onClose: React.PropTypes.func.isRequired
    },

    getDefaultProps: function () {
      return {
        buttonLabel: "OK"
      };
    },

    render: function () {
      return React.createElement(
        "div",
        { className: "dialog failure" },
        React.createElement(
          "header",
          null,
          React.createElement(Icon, { name: "exclamation-circle" }),
          React.createElement(
            "h2",
            null,
            this.props.label
          )
        ),
        this.props.message ? React.createElement(
          "p",
          null,
          this.props.message
        ) : undefined,
        React.createElement(
          "footer",
          null,
          React.createElement(
            "button",
            { type: "button", onClick: this.props.onClose },
            this.props.buttonLabel
          )
        )
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Field", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    propTypes: {
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      className: React.PropTypes.string
    },

    render: function () {

      var classes = { field: true };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "div",
        { "data-field-name": this.props.name, className: classNames(classes) },
        React.createElement(
          "label",
          null,
          this.props.label
        ),
        this.props.children
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.FieldGroup", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    propTypes: {
      path: React.PropTypes.List.isRequired,
      input: React.PropTypes.bool.isRequired,
      fields: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      collapsed: React.PropTypes.bool.isRequired,
      className: React.PropTypes.string,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List(),
        input: true,
        collapsed: false
      };
    },

    renderField: function (field, index) {

      var Component = rey.inject(field.get("type"));

      if (!Component) {
        console.error(new Error("unknown component type (" + tool.get("type") + ")"));
      }

      if (!Component.pickProps) {
        console.error(new Error("invalid component type (" + tool.get("type") + ")"));
      }

      var props = Component.pickProps(this.props.path, field, this.props.values);

      return React.createElement(Component, _extends({
        key: index
      }, props, {
        input: this.props.input,
        onClick: this.props.onClick,
        onChange: this.props.onChange }));
    },

    render: function () {

      var classes = { "field-group": true };
      classes[this.props.className] = !!this.props.className;

      var style = {};
      if (this.props.collapsed) {
        style.display = "none";
      }

      return React.createElement(
        "div",
        { className: classNames(classes), style: style },
        this.props.fields.map(this.renderField)
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Fieldset", ["React", "Immutable", "classNames", "uim.FieldGroup", function (React, Immutable, classNames, FieldGroup) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          fields: field.get("fields"),
          className: field.get("className"),
          values: values
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      fields: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      collapsible: React.PropTypes.bool.isRequired,
      input: React.PropTypes.bool.isRequired,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List(),
        input: true,
        collapsible: false
      };
    },

    getInitialState: function () {
      return {
        collapsed: false
      };
    },

    handleClickLegend: function () {
      if (this.props.collapsible) {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    },

    render: function () {

      var classes = { fieldset: true };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "div",
        { "data-field-name": this.props.name, className: classNames(classes) },
        React.createElement(
          "fieldset",
          null,
          React.createElement(
            "legend",
            { onClick: this.handleClickLegend },
            this.props.label
          ),
          React.createElement(FieldGroup, {
            path: this.props.path,
            fields: this.props.fields,
            values: this.props.values,
            input: this.props.input,
            collapsed: this.state.collapsed,
            onClick: this.props.onClick,
            onChange: this.props.onChange })
        )
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Formset", ["React", "Immutable", "classNames", "uim.FieldGroup", function (React, Immutable, classNames, FieldGroup) {

  return {

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      fields: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      input: React.PropTypes.bool.isRequired,
      collapsible: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List(),
        input: true,
        collapsible: false
      };
    },

    getInitialState: function () {
      return {
        collapsed: false
      };
    },

    handleClickTitle: function () {
      if (this.props.collapsible) {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }
    },

    render: function () {

      var classes = { formset: true };
      classes[this.props.className] = !!this.props.className;

      var title;
      if (this.props.label) {
        title = React.createElement(
          "h1",
          { className: "title", onClick: this.handleClickTitle },
          React.createElement(
            "span",
            null,
            this.props.label
          )
        );
      }

      return React.createElement(
        "div",
        { "data-form-name": this.props.name, className: classNames(classes) },
        title,
        React.createElement(FieldGroup, {
          path: this.props.path,
          input: this.props.input,
          fields: this.props.fields,
          values: this.props.values,
          collapsed: this.state.collapsed,
          onClick: this.props.onClick,
          onChange: this.props.onChange })
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component("uim.Icon", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    statics: {

      className: "fa",
      classNamePrefix: "fa-",

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          icon: field.get("icon"),
          className: field.get("className")
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string,
      className: React.PropTypes.string,
      onClick: React.PropTypes.func
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List()
      };
    },

    handleClick: function (event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
    },

    render: function () {

      var classes = { icon: true };
      classes[Icon.className] = true;
      classes[this.props.className] = !!this.props.className;

      if (this.props.icon) {
        classes[Icon.classNamePrefix + this.props.icon] = true;
      } else if (this.props.name) {
        classes[Icon.classNamePrefix + this.props.name] = true;
      }

      return React.createElement("span", { className: classNames(classes), onClick: this.handleClick });
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

rey.component("uim.IconButton", ["React", "Immutable", "classNames", "uim.Icon", function (React, Immutable, classNames, Icon) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          icon: field.get("icon"),
          disabled: field.get("disabled"),
          className: field.get("className")
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List(),
        disabled: false
      };
    },

    handleClick: function (event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
    },

    render: function () {

      var classes = { "icon-button": true };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(Icon, {
        name: this.props.name,
        icon: this.props.icon,
        className: classNames(classes),
        "data-button-name": this.props.name,
        disabled: this.props.disabled,
        onClick: this.handleClick });
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Link", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          href: field.get("href"),
          label: field.get("label"),
          className: field.get("className")
        };
      }
    },

    propTypes: {
      name: React.PropTypes.string,
      path: React.PropTypes.List.isRequired,
      href: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List()
      };
    },

    handleClick: function (event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
      if (Link.globalClickHandler) {
        Link.globalClickHandler(event, this.props.href);
      }
    },

    render: function () {
      var classes = {};
      classes[this.props.className] = !!this.props.className;
      return React.createElement(
        "a",
        { name: this.props.name, href: this.props.href, className: classNames(classes), onClick: this.handleClick },
        this.props.label ? this.props.label : undefined,
        this.props.children ? this.props.children : undefined
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.LinkButton", ["React", "Immutable", "classNames", "uim.Link", function (React, Immutable, classNames, Link) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          href: field.get("href"),
          label: field.get("label"),
          disabled: field.get("disabled"),
          className: field.get("className")
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      disabled: React.PropTypes.bool.isRequired,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps: function () {
      return {
        disabled: false
      };
    },

    handleClick: function (event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          event: event
        });
      }
    },

    render: function () {

      var classes = { button: true, "link-button": true };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(Link, {
        name: this.props.name,
        href: this.props.href,
        label: this.props.label,
        className: classNames(classes),
        "data-button-name": this.props.name,
        disabled: this.props.disabled,
        onClick: this.handleClick });
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.LinkButton", ["React", "Immutable", "classNames", "uim.Link", "uim.Icon", function (React, Immutable, classNames, Link, Icon) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          links: field.get("links"),
          className: field.get("className")
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      links: React.PropTypes.List.isRequired,
      className: React.PropTypes.string
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List(),
        links: Immutable.List()
      };
    },

    renderIcon: function (link) {
      var icon;
      if (link.has("icon")) {
        icon = React.createElement(Icon, { key: "icon", name: link.get("icon") });
      }
      return icon;
    },

    renderLink: function (link, index) {

      return React.createElement(
        "li",
        { key: index },
        React.createElement(
          Link,
          { name: link.get("name"), href: link.get("href") },
          this.renderIcon(link),
          link.get("label")
        )
      );
    },

    render: function () {
      var classes = { "link-group": true };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "ul",
        { className: classNames(classes) },
        this.props.links.map(this.renderLink)
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.List", ["React", "Immutable", "classNames", "uim.Toolbar", "uim.Paginator", function (React, Immutable, classNames, Toolbar, Paginator) {

  return {

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      data: React.PropTypes.Map.isRequired,
      columns: React.PropTypes.List.isRequired,
      header: React.PropTypes.bool.isRequired,
      footer: React.PropTypes.any,
      pageUrl: React.PropTypes.string,
      emptyText: React.PropTypes.any,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string,
      transformColumnsWith: React.PropTypes.func
    },

    getDefaultProps: function () {
      return {
        data: Immutable.Map(),
        path: Immutable.List(),
        columns: Immutable.List(),
        header: true
      };
    },

    handleClick: function (row, column, event) {
      if (this.props.onClick) {
        event.row = row;
        event.column = column;
        this.props.onClick(event);
      }
    },

    handleClickBody: function (event) {

      var target = event.target;

      while (!target.hasAttribute("data-row-index") || !target.hasAttribute("data-column-index")) {
        target = target.parentNode;
        if (target === document.body) {
          break;
        }
      }

      if (target.hasAttribute("data-row-index") && target.hasAttribute("data-column-index")) {

        var rowIndex = Number(target.getAttribute("data-row-index"));
        var colIndex = Number(target.getAttribute("data-column-index"));

        var row = this.props.data.getIn(["rows", rowIndex]);
        var column = row.getIn(["columns", colIndex]);

        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            row: row,
            column: column,
            event: event
          });
        }
      }
    },

    handleChange: function (row, column, event) {
      if (this.props.onChange) {
        event.row = row;
        event.column = column;
        this.props.onChange(event);
      }
    },

    renderHeadCol: function (column, index) {
      return React.createElement(
        "div",
        { key: index,
          className: "list-column",
          "data-column-index": index,
          "data-column-name": column.get("name") },
        column.get("label")
      );
    },

    renderCol: function (row, rowIndex, column, colIndex) {

      var Component = rey.inject(column.get("type"));

      if (!Component) {
        throw new Error("unknown component type (" + column.get("type") + ")");
      }

      if (!Component.pickProps) {
        throw new Error("invalid component type (" + column.get("type") + ")");
      }

      var props = Component.pickProps(this.props.path, column, row);

      return React.createElement(
        "div",
        { key: colIndex,
          className: "list-column",
          "data-row-index": rowIndex,
          "data-column-index": colIndex,
          "data-column-name": column.get("name") },
        React.createElement(Component, _extends({}, props, {
          onClick: this.handleClick.bind(this, row, column),
          onChange: this.handleChange.bind(this, row, column) }))
      );
    },

    renderRow: function (row, rowIndex) {

      var columns = this.props.columns;

      if (this.props.transformColumnsWith) {
        columns = this.props.transformColumnsWith(columns, row);
      }

      return React.createElement(
        "div",
        { key: rowIndex, className: "list-row", "data-row-index": rowIndex },
        columns.map(function (column, colIndex) {
          return this.renderCol(row, rowIndex, column, colIndex);
        }, this)
      );
    },

    renderBody: function () {
      var classes = { "list-body": true, "no-foot": !this.props.footer };
      return React.createElement(
        "div",
        { key: "body", className: classNames(classes), onClick: this.handleClickBody },
        this.props.data.get("rows").map(this.renderRow)
      );
    },

    render: function () {

      var classes = { list: true };
      classes[this.props.className] = !!this.props.className;

      var content;

      var rows = this.props.data.get("rows");
      var count = Number(this.props.data.get("count")) || rows.size;
      var page = count > 0 ? Number(this.props.data.get("page")) || 1 : 0;
      var pages = count > 0 ? Number(this.props.data.get("pages")) || 1 : 0;

      if (count > 0) {

        content = [];

        if (this.props.header === true) {
          content.push(React.createElement(
            "div",
            { key: "head", className: "list-head list-row" },
            this.props.columns.map(this.renderHeadCol)
          ));
        } else if (Immutable.List.isList(this.props.header)) {
          content.push(React.createElement(
            "div",
            { key: "head", className: "list-head list-row" },
            React.createElement(Toolbar, {
              name: "header",
              path: this.props.path.push("header"),
              tools: this.props.header,
              values: this.props.data,
              onClick: this.props.onClick,
              onChange: this.props.onChange })
          ));
        } else if (this.props.header) {
          content.push(React.createElement(
            "div",
            { key: "head", className: "list-head list-row" },
            this.props.header
          ));
        }

        content.push(this.renderBody());

        if (Immutable.List.isList(this.props.footer)) {
          content.push(React.createElement(
            "div",
            { key: "foot", className: "list-foot list-row" },
            React.createElement(Toolbar, {
              name: "footer",
              path: this.props.path.push("footer"),
              tools: this.props.footer,
              values: this.props.data,
              onClick: this.props.onClick,
              onChange: this.props.onChange })
          ));
        } else if (this.props.footer) {
          content.push(React.createElement(
            "div",
            { key: "foot", className: "list-foot list-row" },
            React.createElement(
              "div",
              { className: "list-column" },
              this.props.footer
            )
          ));
        }

        if (pages > 1) {
          content.push(React.createElement(Paginator, {
            key: "pages",
            page: page,
            pages: pages,
            pageUrl: this.props.pageUrl }));
        }
      } else {
        content = React.createElement(
          "div",
          { className: "list-empty" },
          this.props.emptyText
        );
      }

      return React.createElement(
        "div",
        { "data-list-name": this.props.name, className: classNames(classes) },
        content
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Button", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    render: function () {
      return React.createElement(
        "div",
        { className: "loading" },
        React.createElement("span", { className: "fa fa-spinner fa-spin" })
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.MemoField", ["React", "Immutable", "classNames", "uim.Value", "uim.Field", function (React, Immutable, classNames, Value, Field) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          rows: field.get("rows"),
          cols: field.get("cols"),
          className: field.get("className"),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      rows: React.PropTypes.number,
      cols: React.PropTypes.number,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    handleChange: function (event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    render: function () {

      var classes = {};
      classes["memo-field"] = true;
      classes[this.props.className] = !!this.props.className;

      var content;

      if (this.props.input) {
        content = React.createElement("textarea", {
          ref: "input",
          rows: this.props.rows,
          cols: this.props.cols,
          value: this.props.value,
          onChange: this.handleChange });
      } else {
        content = React.createElement(Value, {
          className: "memo-value",
          path: this.props.path,
          name: this.props.name,
          value: this.props.value });
      }

      return React.createElement(
        Field,
        { ref: "field",
          name: this.props.name,
          label: this.props.label,
          className: classNames(classes) },
        content
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Menu", ["React", "Immutable", "classNames", "uim.Icon", "uim.LinkGroup", "uim.IconButton", function (React, Immutable, classNames, Icon, LinkGroup, IconButton) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          icon: field.get("icon"),
          links: field.get("links"),
          button: field.get("button"),
          counter: field.get("counter"),
          className: field.get("className")
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
      links: React.PropTypes.List.isRequired,
      button: React.PropTypes.bool.isRequired,
      counter: React.PropTypes.number,
      className: React.PropTypes.string
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List(),
        icon: "bars",
        button: false
      };
    },

    getInitialState: function () {
      return {
        showMenu: false
      };
    },

    handleClick: function () {
      this.setState({ showMenu: !this.state.showMenu });
    },

    renderIcon: function () {
      if (this.props.button) {
        return React.createElement(IconButton, {
          name: this.props.icon,
          icon: this.props.icon,
          onClick: this.handleClick });
      } else {
        return React.createElement(Icon, { name: this.props.icon, onClick: this.handleClick });
      }
    },

    renderCounter: function () {
      if (this.props.counter) {
        return React.createElement(
          "div",
          { className: "menu-counter", onClick: this.handleClick },
          this.props.counter
        );
      }
    },

    render: function () {
      var classes = { menu: true, show: this.state.showMenu };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "div",
        { className: classNames(classes) },
        this.renderCounter(),
        this.renderIcon(),
        React.createElement(LinkGroup, {
          name: this.props.name + "-links",
          path: this.props.path.push("links"),
          links: this.props.links,
          className: "menu-links" })
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Overlay", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    render: function () {
      return React.createElement(
        "div",
        { className: "overlay" },
        React.createElement(
          "div",
          { className: "overlay-container" },
          this.props.children
        )
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Paginator", ["React", "Immutable", "classNames", "uim.Icon", "uim.Link", function (React, Immutable, classNames, Icon, Link) {

  return {

    propTypes: {
      page: React.PropTypes.number.isRequired,
      pages: React.PropTypes.number.isRequired,
      pageUrl: React.PropTypes.string.isRequired,
      firstPage: React.PropTypes.number.isRequired,
      lastPage: React.PropTypes.number.isRequired,
      onClick: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getDefaultProps: function () {
      return {
        firstPage: -5,
        lastPage: 5,
        page: 1,
        pages: 1
      };
    },

    makeUrl: function (page) {
      return this.props.pageUrl.replace(/\{page\}/, page);
    },

    renderParts: function () {

      var parts = [];

      var pages = this.props.pages;
      var current = this.props.page;

      var previous = current > 1;
      var next = current < pages;
      var first = Math.max(1, current + this.props.firstPage);
      var last = Math.min(pages, current + this.props.lastPage);

      if (previous) {
        parts.push(React.createElement(
          "li",
          { key: "previous" },
          React.createElement(
            Link,
            { href: this.makeUrl(current - 1) },
            React.createElement(Icon, { name: "previous", icon: "chevron-left" })
          )
        ));
      }

      for (var i = first; i <= last; i++) {
        parts.push(React.createElement(
          "li",
          { key: i, className: classNames({ current: current === i }) },
          React.createElement(Link, { href: this.makeUrl(i), label: i.toString() })
        ));
      }

      if (next) {
        parts.push(React.createElement(
          "li",
          { key: "next" },
          React.createElement(
            Link,
            { href: this.makeUrl(current + 1) },
            React.createElement(Icon, { name: "next", icon: "chevron-right" })
          )
        ));
      }

      return parts;
    },

    render: function () {

      var classes = { paginator: true };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "div",
        { className: classNames(classes) },
        React.createElement(
          "ul",
          null,
          this.renderParts()
        )
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.PasswordField", ["React", "Immutable", "classNames", "uim.Field", function (React, Immutable, classNames, Field) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          className: field.get("className"),
          empty: !values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      empty: React.PropTypes.bool,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    componentDidUpdate: function () {
      if (this.props.empty) {
        this.refs.input.value = "";
      }
    },

    handleChange: function (event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    render: function () {

      var classes = {};
      classes["password-field"] = true;
      classes[this.props.className] = !!this.props.className;

      var content = React.createElement("input", {
        ref: "input",
        type: "password",
        onChange: this.handleChange });

      return React.createElement(
        Field,
        { ref: "field",
          name: this.props.name,
          label: this.props.label,
          className: classNames(classes) },
        content
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

module.exports = PasswordField;

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Radio", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      value: React.PropTypes.any.isRequired,
      checked: React.PropTypes.bool.isRequired,
      onChange: React.PropTypes.func.isRequired,
      disabled: React.PropTypes.bool,
      className: React.PropTypes.string
    },

    handleChange: function (event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    render: function () {

      var classes = { radio: true, disabled: this.props.disabled };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "label",
        { className: classNames(classes) },
        React.createElement("input", { ref: "input",
          type: "radio",
          name: this.props.name,
          value: this.props.value,
          checked: this.props.checked,
          disabled: this.props.disabled,
          onChange: this.handleChange }),
        React.createElement(
          "span",
          null,
          this.props.label
        )
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.RadioGroup", ["React", "Immutable", "classNames", "uim.Field", "uim.Value", "uim.Radio", function (React, Immutable, classNames, Field, Value, Radio) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          options: field.get("options"),
          className: field.get("className"),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string,
      input: React.PropTypes.bool.isRequired,
      options: React.PropTypes.List.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func.isRequired,
      className: React.PropTypes.string
    },

    renderRadio: function (option, index) {

      return React.createElement(Radio, { ref: index,
        key: index,
        path: this.props.path,
        name: this.props.name,
        label: option.get("label"),
        value: option.get("value"),
        checked: this.props.value === option.get("value"),
        disabled: option.get("disabled"),
        onChange: this.props.onChange });
    },

    getSelectedLabel: function () {
      var value = this.props.value;
      var selected = this.props.options.find(function (option) {
        return option.get("value") === value;
      });
      if (selected) {
        return selected.get("label");
      }
    },

    render: function () {

      var classes = {};
      classes["radio-group"] = true;
      classes[this.props.className] = !!this.props.className;

      var content;

      if (this.props.input) {
        content = this.props.options.map(this.renderRadio);
      } else {
        content = React.createElement(Value, {
          className: "radio-value",
          path: this.props.path,
          name: this.props.name,
          value: this.getSelectedLabel() });
      }

      return React.createElement(
        Field,
        { ref: "field",
          name: this.props.name,
          label: this.props.label,
          className: classNames(classes) },
        content
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.SelectButton", ["React", "Immutable", "classNames", "uim.Icon", "uim.Value", function (React, Immutable, classNames, Icon, Value) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          options: field.get("options"),
          disabled: field.get("disabled"),
          disabledValues: field.get("disabledValues"),
          className: field.get("className"),
          blankValue: field.get("blankValue"),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      options: React.PropTypes.List.isRequired,
      disabled: React.PropTypes.bool.isRequired,
      disabledValues: React.PropTypes.List,
      blankValue: React.PropTypes.string,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    getInitialState: function () {
      return {
        showOptions: false
      };
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List(),
        disabled: false
      };
    },

    handleClickCaret: function (event) {
      event.event.stopPropagation();
      this.setState({ showOptions: !this.state.showOptions });
    },

    handleClickOption: function (option, event) {
      event.stopPropagation();
      if (!option.get("disabled")) {
        this.setState({ showOptions: !this.state.showOptions });
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: option.get("value"),
            option: option,
            event: event
          });
        }
      }
    },

    handleClickValue: function (event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.props.value,
          event: event.event
        });
      }
    },

    renderIcon: function (option) {
      var icon;
      if (option.has("icon")) {
        icon = React.createElement(Icon, { key: "icon", name: option.get("icon") });
      }
      return icon;
    },

    renderOption: function (option, index) {

      var classes = {};
      classes["select-button-option"] = true;
      classes["disabled"] = !!option.get("disabled");
      classes[option.get("className")] = !!option.get("className");

      return React.createElement(
        "li",
        { key: index, className: classNames(classes), onClick: this.handleClickOption.bind(this, option) },
        this.renderIcon(option),
        option.get("label")
      );
    },

    isDisabled: function () {
      return this.props.disabled || (this.props.disabledValues ? this.props.disabledValues.indexOf(this.props.value) !== -1 : false);
    },

    getSelectedOption: function () {
      if (this.props.value || this.props.value === 0) {
        var size = this.props.options.size;
        var selected;
        var option;
        var i;
        for (i = 0; i < size; i++) {
          option = this.props.options.get(i);
          if (option.get("value") === this.props.value) {
            selected = option;
            break;
          }
        }
        return selected;
      }
    },

    renderSelectedOption: function () {

      var classes = {};
      classes["select-button-value"] = true;

      var selectedOption = this.getSelectedOption();
      var value;
      var icon;

      if (selectedOption) {
        classes[selectedOption.get("className")] = !!selectedOption.get("className");
        value = selectedOption.get("selectedLabel") || selectedOption.get("label");
        icon = this.renderIcon(selectedOption);
      } else if (this.props.blankValue) {
        classes["select-button-blank"] = true;
        value = this.props.blankValue;
      }

      return React.createElement(Value, {
        onClick: this.handleClickValue,
        className: classNames(classes),
        path: this.props.path,
        name: this.props.name,
        value: [icon, value] });
    },

    renderOptions: function () {
      if (!this.isDisabled()) {
        return [React.createElement(Icon, { key: "icon", name: "caret-down", onClick: this.handleClickCaret }), React.createElement(
          "ul",
          { key: "list" },
          this.props.options.map(this.renderOption)
        )];
      }
    },

    render: function () {

      var classes = {};
      classes["select-button"] = true;
      classes["show-options"] = this.state.showOptions;
      classes["disabled"] = this.isDisabled();
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "button",
        { "data-button-name": this.props.name, className: classNames(classes), type: "button" },
        this.renderSelectedOption(),
        this.renderOptions()
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.SelectField", ["React", "Immutable", "classNames", "uim.Value", "uim.Field", function (React, Immutable, classNames, Value, Field) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));

        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          options: field.get("options"),
          className: field.get("className"),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      options: React.PropTypes.List.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    handleChange: function (event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    renderOption: function (option, index) {

      return React.createElement(
        "option",
        { key: index, value: option.get("value") },
        option.get("label")
      );
    },

    getSelectedLabel: function () {
      var value = this.props.value;
      var selected = this.props.options.find(function (option) {
        return option.get("value") === value;
      });
      if (selected) {
        return selected.get("label");
      }
    },

    render: function () {

      var classes = {};
      classes["select-field"] = true;
      classes[this.props.className] = !!this.props.className;

      var content;

      if (this.props.input) {
        content = React.createElement(
          "select",
          { ref: "input", value: this.props.value, onChange: this.handleChange },
          this.props.options.map(this.renderOption)
        );
      } else {
        content = React.createElement(Value, {
          className: "select-value",
          path: this.props.path,
          name: this.props.name,
          value: this.getSelectedLabel() });
      }

      return React.createElement(
        Field,
        { ref: "field",
          name: this.props.name,
          label: this.props.label,
          className: classNames(classes) },
        content
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Success", ["React", "Immutable", "classNames", "uim.Icon", function (React, Immutable, classNames, Icon) {

  return {

    propTypes: {
      label: React.PropTypes.string.isRequired,
      message: React.PropTypes.string,
      buttonLabel: React.PropTypes.string.isRequired,
      onClose: React.PropTypes.func.isRequired
    },

    getDefaultProps: function () {
      return {
        buttonLabel: "OK"
      };
    },

    render: function () {
      return React.createElement(
        "div",
        { className: "dialog success" },
        React.createElement(
          "header",
          null,
          React.createElement(Icon, { name: "check-circle-o" }),
          React.createElement(
            "h2",
            null,
            this.props.label
          )
        ),
        this.props.message ? React.createElement(
          "p",
          null,
          this.props.message
        ) : undefined,
        React.createElement(
          "footer",
          null,
          React.createElement(
            "button",
            { type: "button", onClick: this.props.onClose },
            this.props.buttonLabel
          )
        )
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.TextField", ["React", "Immutable", "classNames", "uim.Value", "uim.Field", function (React, Immutable, classNames, Value, Field) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          className: field.get("className"),
          options: field.get("options"),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.any,
      options: React.PropTypes.List,
      onChange: React.PropTypes.func,
      className: React.PropTypes.string
    },

    handleChange: function (event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    getId: function () {
      return this.props.path.toJS().join("-");
    },

    renderOptions: function () {
      if (this.props.input && this.props.options) {
        return React.createElement(
          "datalist",
          { id: this.getId() + "-options" },
          this.props.options.map(function (option, index) {
            return React.createElement(
              "option",
              { key: index, value: option },
              option
            );
          })
        );
      }
    },

    render: function () {

      var classes = {};
      classes["text-field"] = true;
      classes[this.props.className] = !!this.props.className;

      var content;

      if (this.props.input) {
        content = React.createElement("input", {
          ref: "input",
          type: "text",
          value: this.props.value,
          list: this.getId() + "-options",
          onChange: this.handleChange });
      } else {
        content = React.createElement(Value, {
          className: "text-value",
          path: this.props.path,
          name: this.props.name,
          value: this.props.value });
      }

      return React.createElement(
        Field,
        { ref: "field",
          name: this.props.name,
          label: this.props.label,
          className: classNames(classes) },
        content,
        this.renderOptions()
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.TimeField", ["React", "Immutable", "classNames", "uim.Value", "uim.Field", function (React, Immutable, classNames, Value, Field) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          label: field.get("label"),
          className: field.get("className"),
          value: values.getIn(path)
        };
      }
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      name: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired,
      input: React.PropTypes.bool.isRequired,
      value: React.PropTypes.any,
      onChange: React.PropTypes.func.isRequired,
      className: React.PropTypes.string
    },

    handleChange: function (event) {
      if (this.props.onChange) {
        this.props.onChange({
          name: this.props.name,
          path: this.props.path,
          value: this.refs.input.value,
          event: event
        });
      }
    },

    render: function () {

      var classes = {};
      classes["time-field"] = true;
      classes[this.props.className] = !!this.props.className;

      var content;

      if (this.props.input) {
        content = React.createElement("input", {
          ref: "input",
          type: "time",
          value: this.props.value,
          onChange: this.handleChange });
      } else {
        content = React.createElement(Value, {
          className: "time-value",
          path: this.props.path,
          name: this.props.name,
          value: this.props.value });
      }

      return React.createElement(
        Field,
        { ref: "field",
          name: this.props.name,
          label: this.props.label,
          className: classNames(classes) },
        content
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Toolbar", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          tools: field.get("tools"),
          className: field.get("className"),
          values: values
        };
      },

      formatters: {}
    },

    propTypes: {
      path: React.PropTypes.List.isRequired,
      values: React.PropTypes.Map.isRequired,
      tools: React.PropTypes.List,
      className: React.PropTypes.string,
      onClick: React.PropTypes.func,
      onChange: React.PropTypes.func
    },

    getDefaultProps: function () {
      return {
        path: Immutable.List(),
        tools: Immutable.List(),
        values: Immutable.Map()
      };
    },

    renderTool: function (tool, index) {

      var Component = getComponents()[tool.get("type")];

      if (!Component) {
        console.error(new Error("unknown component type (" + tool.get("type") + ")"));
      }

      if (!Component.pickProps) {
        console.error(new Error("invalid component type (" + tool.get("type") + ")"));
      }

      var props = Component.pickProps(this.props.path, tool, this.props.values);

      return React.createElement(
        "div",
        { key: index, "data-tool-name": tool.get("name"), className: "tool" },
        React.createElement(Component, _extends({}, props, {
          onClick: this.props.onClick,
          onChange: this.props.onChange }))
      );
    },

    render: function () {

      var classes = { toolbar: true };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "div",
        { "data-toolbar-name": this.props.name, className: classNames(classes) },
        this.props.tools.map(this.renderTool)
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Value", ["React", "Immutable", "classNames", function (React, Immutable, classNames) {

  var Formatters = {};

  return {

    statics: {

      pickProps: function (path, field, values) {
        path = field.has("path") ? field.get("path") : path.push(field.get("name"));
        return {
          path: path,
          name: field.get("name"),
          format: field.get("format"),
          className: field.get("className"),
          value: values.getIn(path)
        };
      },

      formatters: Formatters
    },

    propTypes: {
      path: React.PropTypes.List,
      name: React.PropTypes.string,
      value: React.PropTypes.any,
      format: React.PropTypes.string,
      className: React.PropTypes.string,
      onClick: React.PropTypes.func
    },

    handleClick: function (event) {
      if (this.props.onClick) {
        this.props.onClick({
          name: this.props.name,
          path: this.props.path,
          value: this.props.value,
          event: event
        });
      }
    },

    render: function () {

      var classes = { value: true };
      classes[this.props.className] = !!this.props.className;

      var value;

      if (this.props.value || this.props.value === 0) {
        if (this.props.format) {
          if (Formatters[this.props.format]) {
            value = Formatters[this.props.format](this.props.value);
          } else {
            throw new Error("unknown format (" + this.props.format + ")");
          }
        } else {
          value = this.props.value;
        }
      } else {
        value = "-";
      }

      return React.createElement(
        "div",
        { className: classNames(classes), onClick: this.handleClick },
        value
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //

// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.View", ["React", "Immutable", "classNames", "CSSTransitionGroup", "uim.Loading", "uim.Toolbar", "uim.Overlay", function (React, Immutable, classNames, CSSTransitionGroup, Loading, Toolbar, Overlay) {

  return {

    propTypes: {
      header: React.PropTypes.any,
      footer: React.PropTypes.any,
      overlay: React.PropTypes.any,
      isLoading: React.PropTypes.bool,
      className: React.PropTypes.string
    },

    renderOverlay: function () {
      if (this.props.overlay) {
        return React.createElement(
          Overlay,
          null,
          this.props.overlay
        );
      }
    },

    renderHeader: function () {

      var header;

      if (Immutable.List.isList(this.props.header)) {
        header = React.createElement(Toolbar, {
          name: "header",
          tools: this.props.header,
          onClick: this.props.onClick });
      } else if (this.props.header) {
        header = this.props.header;
      }

      if (header) {
        return React.createElement(
          "header",
          { className: "header" },
          React.createElement(
            "div",
            { className: "header-center" },
            header
          )
        );
      }
    },

    renderFooter: function () {

      var footer;

      if (Immutable.List.isList(this.props.footer)) {
        footer = React.createElement(Toolbar, {
          name: "footer",
          tools: this.props.footer,
          onClick: this.props.onClick });
      } else if (this.props.footer) {
        footer = this.props.footer;
      }

      if (footer) {
        return React.createElement(
          "footer",
          { className: "footer" },
          React.createElement(
            "div",
            { className: "footer-center" },
            footer
          )
        );
      }
    },

    render: function () {

      var classes = { view: true };
      classes[this.props.className] = !!this.props.className;

      return React.createElement(
        "div",
        { className: classNames(classes) },
        this.renderHeader(),
        React.createElement(
          "main",
          null,
          this.props.children,
          this.props.isLoading ? React.createElement(Loading, null) : undefined
        ),
        this.renderFooter(),
        React.createElement(
          CSSTransitionGroup,
          {
            transitionName: "overlay",
            transitionEnterTimeout: 400,
            transitionLeaveTimeout: 120 },
          this.renderOverlay()
        )
      );
    }

  };
}]);

// - -------------------------------------------------------------------- - //
