/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Button", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {
  
    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          htmlType: "button",
          disabled: false
        };
      },
      
      handleClick: function(event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = { button: true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <button
            data-button-name={this.props.name}
            type={this.props.htmlType}
            disabled={this.props.disabled}
            className={classNames(classes)}
            onClick={this.handleClick}>
            {this.props.label}
          </button>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.ButtonGroup", [
  "React", "Immutable", "classNames", "uim.Button",
  function(React, Immutable, classNames, Button) {

    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      handleClick: function(button, event) {
        if (this.props.onClick) {
          event.button = button;
          this.props.onClick(event);
        }
      },
      
      renderButton: function(button, index) {
        var props = Button.pickProps(this.props.path, button);
        return (
          <Button key={index} {...props} onClick={this.handleClick.bind(this, button)} />
        );
      },
      
      render: function() {
        
        var classes = {};
        classes["button-group"] = true;
        classes[this.props.className] = !!this.props.className;
      
        return (
          <div data-field-name={this.props.name} className={classNames(classes)}>
            {this.props.buttons.map(this.renderButton)}
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.CheckGroup", [
  "React", "Immutable", "classNames", "uim.Button", "uim.Field",
  function(React, Immutable, classNames, Button, Field) {

    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      renderCheckbox: function(option, index) {
        
        var name = option.get("name") || index;
        var label = option.get("label") || name;
        var path = this.props.path.push(name);
        
        return (
          <Checkbox ref={name}
            key={index}
            path={path}
            name={name}
            label={label}
            checked={!!this.props.values.getIn(path)}
            disabled={option.get("disabled")}
            onChange={this.props.onChange} />
        );
      },
      
      render: function() {
        
        var classes = {};
        classes["check-group"] = true;
        classes[this.props.className] = !!this.props.className;
      
        return (
          <Field ref="field"
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            {this.props.checkboxes.map(this.renderCheckbox)}
          </Field>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Checkbox", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {

    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      handleClick: function(event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.checked,
            event: event
          });
        }
      },
      
      handleChange: function(event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.checked,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = { checkbox: true, disabled: this.props.disabled };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <label className={classNames(classes)}>
            <input ref="input"
              type="checkbox"
              name={this.props.name}
              checked={this.props.checked}
              disabled={this.props.disabled}
              value={this.props.value}
              onClick={this.handleClick}
              onChange={this.handleChange} />
            <span>{this.props.label}</span>
          </label>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.DateField", [
  "React", "Immutable", "classNames", "uim.Value", "uim.Field",
  function(React, Immutable, classNames, Value, Field) {

    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      handleChange: function(event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.value,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = {};
        classes["date-field"] = true;
        classes[this.props.className] = !!this.props.className;
      
        var content;
        
        if (this.props.input) {
          content = (
            <input
              ref="input"
              type="date"
              value={this.props.value}
              onChange={this.handleChange} />
          );
          
        } else {
          content = (
            <Value
              className="date-value"
              path={this.props.path}
              name={this.props.name}
              value={this.props.value}
              format="date" />
          );
        }
      
        return (
          <Field ref="field"
            className={classNames(classes)}
            name={this.props.name}
            label={this.props.label}>
            
            {content}
          </Field>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Failure", [
  "React", "Immutable", "classNames", "uim.Icon",
  function(React, Immutable, classNames, Icon) {

    return {
      
      propTypes: {
        label: React.PropTypes.string.isRequired,
        message: React.PropTypes.string,
        buttonLabel: React.PropTypes.string.isRequired,
        onClose: React.PropTypes.func.isRequired
      },
      
      getDefaultProps: function() {
        return {
          buttonLabel: "OK"
        };
      },
      
      render: function() {
        return (
          <div className="dialog failure">
            <header>
              <Icon name="exclamation-circle" />
              <h2>{this.props.label}</h2>
            </header>
            { this.props.message ? <p>{this.props.message}</p> : undefined }
            <footer>
              <button type="button" onClick={this.props.onClose}>
                {this.props.buttonLabel}
              </button>
            </footer>
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Field", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {
  
    return {
  
      propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
      },
      
      render: function() {
        
        var classes = { field: true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <div data-field-name={this.props.name} className={classNames(classes)}>
            <label>{this.props.label}</label>
            {this.props.children}
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.FieldGroup", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {
  
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          input: true,
          collapsed: false
        };
      },
      
      renderField: function(field, index) {
        
        var Component = rey.inject("uim." + field.get("type"));
        
        if (!Component) {
          console.error(new Error("unknown component type (" + field.get("type") + ")"));
        }
        
        if (!Component.pickProps) {
          console.error(new Error("invalid component type (" + field.get("type") + ")"));
        }
        
        var props = Component.pickProps(this.props.path, field, this.props.values);
        
        return (
          <Component
            key={index}
            {...props}
            input={this.props.input}
            onClick={this.props.onClick}
            onChange={this.props.onChange} />
        );
      },
      
      render: function() {
        
        var classes = { "field-group": true };
        classes[this.props.className] = !!this.props.className;
        
        var style = {};
        if (this.props.collapsed) {
          style.display = "none";
        }
        
        return (
          <div className={classNames(classes)} style={style}>
            {this.props.fields.map(this.renderField)}
          </div>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Fieldset", [
  "React", "Immutable", "classNames", "uim.FieldGroup",
  function(React, Immutable, classNames, FieldGroup) {
  
    return {
  
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          input: true,
          collapsible: false
        };
      },
      
      getInitialState: function() {
        return {
          collapsed: false
        };
      },
      
      handleClickLegend: function() {
        if (this.props.collapsible) {
          this.setState({
            collapsed: !this.state.collapsed
          });
        }
      },
      
      render: function() {
        
        var classes = { fieldset: true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <div data-field-name={this.props.name} className={classNames(classes)}>
            <fieldset>
              <legend onClick={this.handleClickLegend}>
                {this.props.label}
              </legend>
              <FieldGroup
                path={this.props.path}
                fields={this.props.fields}
                values={this.props.values} 
                input={this.props.input}
                collapsed={this.state.collapsed}
                onClick={this.props.onClick}
                onChange={this.props.onChange} />
            </fieldset>
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Formset", [
  "React", "Immutable", "classNames", "uim.FieldGroup",
  function(React, Immutable, classNames, FieldGroup) {
  
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          input: true,
          collapsible: false
        };
      },
      
      getInitialState: function() {
        return {
          collapsed: false
        };
      },
      
      handleClickTitle: function() {
        if (this.props.collapsible) {
          this.setState({
            collapsed: !this.state.collapsed
          });
        }
      },
      
      render: function() {
        
        var classes = { formset: true };
        classes[this.props.className] = !!this.props.className;
        
        var title;
        if (this.props.label) {
          title = (
            <h1 className="title" onClick={this.handleClickTitle}>
              <span>{this.props.label}</span>
            </h1>
          );
        }
        
        return (
          <div data-form-name={this.props.name} className={classNames(classes)}>
            {title}
            <FieldGroup
              path={this.props.path}
              input={this.props.input}
              fields={this.props.fields}
              values={this.props.values}
              collapsed={this.state.collapsed}
              onClick={this.props.onClick}
              onChange={this.props.onChange} />
          </div>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Icon", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {
  
    var globals = {
      className: "fa",
      classNamePrefix: "fa-"
    };
  
    return {
      
      statics: {
        
        globals: globals,
        
        pickProps: function(path, field, values) {
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List()
        };
      },
      
      handleClick: function(event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = { icon: true };
        classes[globals.className] = true;
        classes[this.props.className] = !!this.props.className;
        
        if (this.props.icon) {
          classes[globals.classNamePrefix + this.props.icon] = true;
          
        } else if (this.props.name) {
          classes[globals.classNamePrefix + this.props.name] = true;
        }
        
        return (
          <span className={classNames(classes)} onClick={this.handleClick} />
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.IconButton", [
  "React", "Immutable", "classNames", "uim.Icon",
  function(React, Immutable, classNames, Icon) {
  
    return {
  
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          disabled: false
        };
      },
      
      handleClick: function(event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = { "icon-button": true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <Icon
            name={this.props.name}
            icon={this.props.icon}
            className={classNames(classes)}
            data-button-name={this.props.name}
            disabled={this.props.disabled}
            onClick={this.handleClick} />
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Link", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {
  
    var globals = {};
  
    return {
      
      statics: {
        
        globals: globals,
        
        pickProps: function(path, field, values) {
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List()
        };
      },
      
      handleClick: function(event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            event: event
          });
        }
        if (globals.clickHandler) {
          globals.clickHandler(event, this.props.href);
        }
      },
      
      render: function() {
        var classes = {};
        classes[this.props.className] = !!this.props.className;
        return (
          <a name={this.props.name} href={this.props.href} className={classNames(classes)} onClick={this.handleClick}>
            {this.props.label ? this.props.label : undefined}
            {this.props.children ? this.props.children : undefined}
          </a>
        );
      }
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.LinkButton", [
  "React", "Immutable", "classNames", "uim.Link",
  function(React, Immutable, classNames, Link) {
  
    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      getDefaultProps: function() {
        return {
          disabled: false
        };
      },
      
      handleClick: function(event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = { button: true, "link-button": true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <Link
            name={this.props.name}
            href={this.props.href}
            label={this.props.label}
            className={classNames(classes)}
            data-button-name={this.props.name}
            disabled={this.props.disabled}
            onClick={this.handleClick} />
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.LinkGroup", [
  "React", "Immutable", "classNames", "uim.Link", "uim.Icon",
  function(React, Immutable, classNames, Link, Icon) {
  
    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          links: Immutable.List()
        };
      },
      
      renderIcon: function(link) {
        var icon;
        if (link.has("icon")) {
          icon = (
            <Icon key="icon" name={link.get("icon")} />
          );
        }
        return icon;
      },
      
      renderLink: function(link, index) {
        
        return (
          <li key={index}>
            <Link name={link.get("name")} href={link.get("href")}>
              {this.renderIcon(link)}
              {link.get("label")}
            </Link>
          </li>
        );
      },
      
      render: function() {
        var classes = { "link-group": true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <ul className={classNames(classes)}>
            {this.props.links.map(this.renderLink)}
          </ul>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.List", [
  "React", "Immutable", "classNames", "uim.Toolbar", "uim.Paginator",
  function(React, Immutable, classNames, Toolbar, Paginator) {

    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
          path = field.has("path") ? field.get("path") : path.push(field.get("name"));
          return {
            path: path,
            name: field.get("name"),
            label: field.get("label"),
            data: field.get("data"),
            columns: field.get("columns"),
            header: field.get("header"),
            footer: field.get("footer"),
            empty: field.get("empty"),
            className: field.get("className")
          };
        }
      },
      
      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        data: React.PropTypes.Map.isRequired,
        columns: React.PropTypes.List.isRequired,
        header: React.PropTypes.bool.isRequired,
        footer: React.PropTypes.any,
        pageUrl: React.PropTypes.string,
        empty: React.PropTypes.any,
        onClick: React.PropTypes.func,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string,
        transformColumnsWith: React.PropTypes.func
      },
      
      getDefaultProps: function() {
        return {
          data: Immutable.Map(),
          path: Immutable.List(),
          columns: Immutable.List(),
          header: true
        };
      },
      
      handleClick: function(row, column, event) {
        if (this.props.onClick) {
          event.row = row;
          event.column = column;
          this.props.onClick(event);
        }
      },
      
      handleClickBody: function(event) {
        
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
      
      handleChange: function(row, column, event) {
        if (this.props.onChange) {
          event.row = row;
          event.column = column;
          this.props.onChange(event);
        }
      },
      
      renderHeadCol: function(column, index) {
        return (
          <div key={index}
            className="list-column"
            data-column-index={index}
            data-column-name={column.get("name")}>
            {column.get("label")}
          </div>
        );
      },
      
      renderCol: function(row, rowIndex, column, colIndex) {
        
        var Component = rey.inject("uim." + column.get("type"));
        
        if (!Component) {
          throw new Error("unknown component type (" + column.get("type") + ")");
        }
        
        if (!Component.pickProps) {
          throw new Error("invalid component type (" + column.get("type") + ")");
        }
        
        var props = Component.pickProps(this.props.path, column, row);
        
        return (
          <div key={colIndex}
            className="list-column"
            data-row-index={rowIndex}
            data-column-index={colIndex}
            data-column-name={column.get("name")}>
            <Component
              {...props}
              onClick={this.handleClick.bind(this, row, column)}
              onChange={this.handleChange.bind(this, row, column)} />
          </div>
        );
      },
      
      renderRow: function(row, rowIndex) {
        
        var columns = this.props.columns;
        if (this.props.transformColumnsWith) {
          columns = this.props.transformColumnsWith(columns, row);
        }
        
        return (
          <div key={rowIndex} className="list-row" data-row-index={rowIndex}>
            {columns.map(function(column, colIndex) {
              return this.renderCol(row, rowIndex, column, colIndex);
            }, this)}
          </div>
        );
      },
      
      getRows: function() {
        var rows = this.props.data.get("rows");
        if (Immutable.List.isList(rows)) {
          return rows;
        } else {
          return Immutable.List();
        }
      },
      
      countRows: function() {
        if (this.props.data.has("count")) {
          return this.props.data.get("count");
        } else {
          var rows = this.props.data.get("rows");
          if (Immutable.List.isList(rows)) {
            return rows.size;
          }
        }
        return 0;
      },
      
      renderBody: function() {
        var classes = {"list-body": true, "no-foot": !this.props.footer };
        return (
          <div key="body" className={classNames(classes)} onClick={this.handleClickBody}>
            {this.getRows().map(this.renderRow)}
          </div>
        );
      },
      
      renderHeader: function() {
        
        var content;
        
        if (this.props.header === true) {
          
          content = (
            <div key="head" className="list-head list-row">
              {this.props.columns.map(this.renderHeadCol)}
            </div>
          );
          
        } else if (Immutable.List.isList(this.props.header)) {
          
          content = (
            <div key="head" className="list-head list-row">
              <Toolbar
                name="header"
                path={this.props.path.push("header")}
                tools={this.props.header}
                values={this.props.data}
                onClick={this.props.onClick}
                onChange={this.props.onChange} />
            </div>
          );
        
        } else if (this.props.header) {
          
          content = (
            <div key="head" className="list-head list-row">
              {this.props.header}
            </div>
          );
          
        }
        
        return content;
      },
      
      renderFooter: function() {
        
        var content;
        
        if (Immutable.List.isList(this.props.footer)) {
          
          content = (
            <div key="foot" className="list-foot list-row">
              <Toolbar
                name="footer"
                path={this.props.path.push("footer")}
                tools={this.props.footer}
                values={this.props.data}
                onClick={this.props.onClick}
                onChange={this.props.onChange} />
            </div>
          );
        
        } else if (this.props.footer) {
          
          content = (
            <div key="foot" className="list-foot list-row">
              <div className="list-column">
                {this.props.footer}
              </div>
            </div>
          );
        }
        
        return content;
      },
      
      renderPages: function() {
        
        var content;
        
        if (this.props.data.has("pages") && this.props.data.has("page")) {
          
          var count = this.countRows();
          var page = count > 0 ? Number(this.props.data.get("page")) || 1 : 0;
          var pages = count > 0 ? Number(this.props.data.get("pages")) || 1 : 0;
          
          if (pages > 1) {
            content = (
              <Paginator
                key="pages"
                page={page}
                pages={pages}
                pageUrl={this.props.pageUrl} />
            );
          }
        }

        return content;
      },
      
      render: function() {
        
        var classes = { list: true };
        classes[this.props.className] = !!this.props.className;
        
        var content;
        
        if (this.countRows() > 0 || !this.props.empty) {
          
          content = [
            this.renderHeader(),
            this.renderBody(),
            this.renderFooter(),
            this.renderPages()
          ];
          
        } else {
          content = (
            <div className="list-empty">{this.props.empty}</div>
          )
        }
        
        return (
          <div data-list-name={this.props.name} className={classNames(classes)}>
            {content}
          </div>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Loading", [
  "React",
  function(React) {
  
    return {
  
      render: function() {
        return (
          <div className="loading">
            <span className="fa fa-spinner fa-spin" />
          </div>
        );
      }
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.MemoField", [
  "React", "Immutable", "classNames", "uim.Value", "uim.Field",
  function(React, Immutable, classNames, Value, Field) {

    return {

      statics: {
        
        pickProps: function(path, field, values) {
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
      
      handleChange: function(event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.value,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = {};
        classes["memo-field"] = true;
        classes[this.props.className] = !!this.props.className;
      
        var content;
        
        if (this.props.input) {
          content = (
            <textarea
              ref="input"
              rows={this.props.rows}
              cols={this.props.cols}
              value={this.props.value}
              onChange={this.handleChange} />
          );
          
        } else {
          content = (
            <Value
              className="memo-value"
              path={this.props.path}
              name={this.props.name}
              value={this.props.value} />
          );
        }
      
        return (
          <Field ref="field"
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            
            {content}
          </Field>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Menu", [
  "React", "Immutable", "classNames", "uim.Icon", "uim.LinkGroup", "uim.IconButton",
  function(React, Immutable, classNames, Icon, LinkGroup, IconButton) {
    
    return {
  
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          icon: "bars",
          button: false
        };
      },
      
      getInitialState: function() {
        return {
          showMenu: false
        };
      },
      
      handleClick: function() {
        this.setState({ showMenu: !this.state.showMenu });
      },
      
      renderIcon: function() {
        if (this.props.button) {
          return (
            <IconButton
              name={this.props.icon}
              icon={this.props.icon}
              onClick={this.handleClick} />
          );
        } else {
          return (
            <Icon name={this.props.icon} onClick={this.handleClick} />
          );
        }
      },
      
      renderCounter: function() {
        if (this.props.counter) {
          return (
            <div className="menu-counter" onClick={this.handleClick}>
              {this.props.counter}
            </div>
          );
        }
      },
      
      render: function() {
        var classes = { menu: true, show: this.state.showMenu };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <div className={classNames(classes)}>
            {this.renderCounter()}
            {this.renderIcon()}
            <LinkGroup
              name={this.props.name + "-links"}
              path={this.props.path.push("links")}
              links={this.props.links}
              className="menu-links" />
          </div>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Overlay", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {
    
    return {

      render: function() {
        return (
          <div className="overlay">
            <div className="overlay-container">
              {this.props.children}
            </div>
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Paginator", [
  "React", "Immutable", "classNames", "uim.Icon", "uim.Link",
  function(React, Immutable, classNames, Icon, Link) {
    
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
      
      getDefaultProps: function() {
        return {
          firstPage: -5,
          lastPage: 5,
          page: 1,
          pages: 1
        };
      },
      
      makeUrl: function(page) {
        return this.props.pageUrl.replace(/\{page\}/,page);
      },
      
      renderParts: function() {
        
        var parts = [];
        
        var pages = this.props.pages;
        var current = this.props.page;
        
        var previous = current > 1;
        var next = current < pages;
        var first = Math.max(1, current + this.props.firstPage);
        var last = Math.min(pages, current + this.props.lastPage);
        
        if (previous) {
          parts.push(
            <li key="previous">
              <Link href={this.makeUrl(current - 1)}>
                <Icon name="previous" icon="chevron-left" />
              </Link>
            </li>
          );
        }
        
        for (var i = first; i <= last; i++) {
          parts.push(
            <li key={i} className={classNames({ current: current === i })}>
              <Link href={this.makeUrl(i)} label={i.toString()} />
            </li>
          )
        }
        
        if (next) {
          parts.push(
            <li key="next">
              <Link href={this.makeUrl(current + 1)}>
                <Icon name="next" icon="chevron-right" />
              </Link>
            </li>
          );
        }
        
        return parts;
      },
      
      render: function() {
        
        var classes = { paginator: true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <div className={classNames(classes)}>
            <ul>
              {this.renderParts()}
            </ul>
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.PasswordField", [
  "React", "Immutable", "classNames", "uim.Field",
  function(React, Immutable, classNames, Field) {

    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      componentDidUpdate: function() {
        if (this.props.empty) {
          this.refs.input.value = "";
        }
      },
      
      handleChange: function(event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.value,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = {};
        classes["password-field"] = true;
        classes[this.props.className] = !!this.props.className;
        
        var content = (
          <input
            ref="input"
            type="password"
            onChange={this.handleChange} />
        );
        
        return (
          <Field ref="field"
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            
            {content}
          </Field>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Radio", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {
  
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
      
      handleChange: function(event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.value,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = { radio: true, disabled: this.props.disabled };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <label className={classNames(classes)}>
            <input ref="input"
              type="radio"
              name={this.props.name}
              value={this.props.value}
              checked={this.props.checked}
              disabled={this.props.disabled}
              onChange={this.handleChange} />
            <span>{this.props.label}</span>
          </label>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.RadioGroup", [
  "React", "Immutable", "classNames", "uim.Field", "uim.Value", "uim.Radio",
  function(React, Immutable, classNames, Field, Value, Radio) {
  
    return {
  
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      renderRadio: function(option, index) {
        
        return (
          <Radio ref={index}
            key={index}
            path={this.props.path}
            name={this.props.name}
            label={option.get("label")}
            value={option.get("value")}
            checked={this.props.value === option.get("value")}
            disabled={option.get("disabled")}
            onChange={this.props.onChange} />
        );
      },
      
      getSelectedLabel: function() {
        var value = this.props.value;
        var selected = this.props.options.find(function(option) {
          return option.get("value") === value;
        });
        if (selected) {
          return selected.get("label");
        }
      },
      
      render: function() {
        
        var classes = {};
        classes["radio-group"] = true;
        classes[this.props.className] = !!this.props.className;
        
        var content;
        
        if (this.props.input) {
          content = this.props.options.map(this.renderRadio);
          
        } else {
          content = (
            <Value
              className="radio-value"
              path={this.props.path}
              name={this.props.name}
              value={this.getSelectedLabel()} />
          );
        }
      
        return (
          <Field ref="field"
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            {content}
          </Field>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.SelectButton", [
  "React", "Immutable", "classNames", "uim.Icon", "uim.Value",
  function(React, Immutable, classNames, Icon, Value) {
  
    return {
  
      statics: {
        
        pickProps: function(path, field, values) {
          path = field.has("path") ? field.get("path") : path.push(field.get("name"));
          return {
            path: path,
            label: field.get("label"),
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
      
      getInitialState: function() {
        return {
          showOptions: false
        };
      },
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          disabled: false
        };
      },
      
      handleClickCaret: function(event) {
        event.event.stopPropagation();
        this.setState({ showOptions: !this.state.showOptions });
      },
      
      handleClickOption: function(option, event) {
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
      
      handleClickValue: function(event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            value: this.props.value,
            event: event.event
          });
        }
      },
      
      renderIcon: function(option) {
        var icon;
        if (option.has("icon")) {
          icon = (
            <Icon key="icon" name={option.get("icon")} />
          );
        }
        return icon;
      },
      
      renderOption: function(option, index) {
        
        var classes = {};
        classes["select-button-option"] = true;
        classes["disabled"] = !!option.get("disabled");
        classes[option.get("className")] = !!option.get("className");
        
        return (
          <li key={index} className={classNames(classes)} onClick={this.handleClickOption.bind(this, option)}>
            {this.renderIcon(option)}
            {option.get("label")}
          </li>
        );
      },
      
      isDisabled: function() {
        return this.props.disabled || (this.props.disabledValues ? 
          this.props.disabledValues.indexOf(this.props.value) !== -1 : 
          false);
      },
      
      getSelectedOption: function() {
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
      
      renderSelectedOption: function() {
        
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
        
        return (
          <Value
            onClick={this.handleClickValue}
            className={classNames(classes)}
            path={this.props.path}
            name={this.props.name}
            value={[icon, value]} />
        );
      },
      
      renderOptions: function() {
        if (!this.isDisabled()) {
          return ([
            <Icon key="icon" name="caret-down" onClick={this.handleClickCaret} />
            ,
            <ul key="list">
              {this.props.options.map(this.renderOption)}
            </ul>
          ]);
        }
      },
      
      render: function() {
        
        var classes = {};
        classes["select-button"] = true;
        classes["show-options"] = this.state.showOptions;
        classes["disabled"] = this.isDisabled();
        classes[this.props.className] = !!this.props.className;
        
        return (
          <button data-button-name={this.props.name} className={classNames(classes)} type="button">
            {this.renderSelectedOption()}
            {this.renderOptions()}
          </button>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.SelectButtonField", [
  "React", "Immutable", "classNames", "uim.SelectButton", "uim.Field",
  function(React, Immutable, classNames, SelectButton, Field) {
  
    return {
  
      statics: {
        pickProps: SelectButton.pickProps
      },
      
      propTypes: {
        path: React.PropTypes.List.isRequired,
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        options: React.PropTypes.List.isRequired,
        disabled: React.PropTypes.bool.isRequired,
        disabledValues: React.PropTypes.List,
        blankValue: React.PropTypes.string,
        value: React.PropTypes.any,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string
      },
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          disabled: false
        };
      },
      
      render: function() {
        
        var classes = {};
        classes["select-button-field"] = true;
        classes[this.props.className] = !!this.props.className;
        
        return (
          <Field ref="field"
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            
            <SelectButton {...this.props} />
          </Field>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.SelectField", [
  "React", "Immutable", "classNames", "uim.Value", "uim.Field",
  function(React, Immutable, classNames, Value, Field) {

    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      handleChange: function(event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.value,
            event: event
          });
        }
      },
      
      renderOption: function(option, index) {
        
        return (
          <option key={index} value={option.get("value")}>
            {option.get("label")}
          </option>
        );
      },
      
      getSelectedLabel: function() {
        var value = this.props.value;
        var selected = this.props.options.find(function(option) {
          return option.get("value") === value;
        });
        if (selected) {
          return selected.get("label");
        }
      },
      
      render: function() {
        
        var classes = {};
        classes["select-field"] = true;
        classes[this.props.className] = !!this.props.className;
        
        var content;
        
        if (this.props.input) {
          content = (
            <select ref="input" value={this.props.value} onChange={this.handleChange}>
              {this.props.options.map(this.renderOption)}
            </select>
          );
          
        } else {
          content = (
            <Value
              className="select-value"
              path={this.props.path}
              name={this.props.name}
              value={this.getSelectedLabel()} />
          );
        }
        
        return (
          <Field ref="field"
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            
            {content}
          </Field>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Success", [
  "React", "Immutable", "classNames", "uim.Icon",
  function(React, Immutable, classNames, Icon) {

    return {
  
      propTypes: {
        label: React.PropTypes.string.isRequired,
        message: React.PropTypes.string,
        buttonLabel: React.PropTypes.string.isRequired,
        onClose: React.PropTypes.func.isRequired
      },
      
      getDefaultProps: function() {
        return {
          buttonLabel: "OK"
        };
      },
      
      render: function() {
        return (
          <div className="dialog success">
            <header>
              <Icon name="check-circle-o" />
              <h2>{this.props.label}</h2>
            </header>
            { this.props.message ? <p>{this.props.message}</p> : undefined }
            <footer>
              <button type="button" onClick={this.props.onClose}>
                {this.props.buttonLabel}
              </button>
            </footer>
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.TextField", [
  "React", "Immutable", "classNames", "uim.Value", "uim.Field",
  function(React, Immutable, classNames, Value, Field) {

    return {
  
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      handleChange: function(event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.value,
            event: event
          });
        }
      },
      
      getId: function() {
        return this.props.path.toJS().join("-");
      },
      
      renderOptions: function() {
        if (this.props.input && this.props.options) {
          return (
            <datalist id={this.getId() + "-options"}>
              {this.props.options.map(function(option, index) {
                return (
                  <option key={index} value={option}>{option}</option>
                );
              })}
            </datalist>
          )
        }
      },
      
      render: function() {
        
        var classes = {};
        classes["text-field"] = true;
        classes[this.props.className] = !!this.props.className;
      
        var content;
        
        if (this.props.input) {
          content = (
            <input
              ref="input"
              type="text"
              value={this.props.value}
              list={this.getId() + "-options"}
              onChange={this.handleChange} />
          );
          
        } else {
          content = (
            <Value
              className="text-value"
              path={this.props.path}
              name={this.props.name}
              value={this.props.value} />
          );
        }
        
        return (
          <Field ref="field"
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            
            {content}
            {this.renderOptions()}
          </Field>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.TimeField", [
  "React", "Immutable", "classNames", "uim.Value", "uim.Field",
  function(React, Immutable, classNames, Value, Field) {

    return {
  
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      handleChange: function(event) {
        if (this.props.onChange) {
          this.props.onChange({
            name: this.props.name,
            path: this.props.path,
            value: this.refs.input.value,
            event: event
          });
        }
      },
      
      render: function() {
        
        var classes = {};
        classes["time-field"] = true;
        classes[this.props.className] = !!this.props.className;
        
        var content;
        
        if (this.props.input) {
          content = (
            <input
              ref="input"
              type="time"
              value={this.props.value}
              onChange={this.handleChange} />
          );
          
        } else {
          content = (
            <Value
              className="time-value"
              path={this.props.path}
              name={this.props.name}
              value={this.props.value} />
          );
        }
      
        return (
          <Field ref="field"
            name={this.props.name}
            label={this.props.label}
            className={classNames(classes)}>
            
            {content}
          </Field>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Toolbar", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {

    return {

      statics: {
        
        pickProps: function(path, field, values) {
          path = field.has("path") ? field.get("path") : path.push(field.get("name"));
          return {
            path: path,
            name: field.get("name"),
            tools: field.get("tools"),
            className: field.get("className"),
            values: values,
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
      
      getDefaultProps: function() {
        return {
          path: Immutable.List(),
          tools: Immutable.List(),
          values: Immutable.Map()
        };
      },
      
      renderTool: function(tool, index) {
        
        var Component = rey.inject("uim." + tool.get("type"));
        
        if (!Component) {
          console.error(new Error("unknown component type (" + tool.get("type") + ")"));
        }
        
        if (!Component.pickProps) {
          console.error(new Error("invalid component type (" + tool.get("type") + ")"));
        }
        
        var props = Component.pickProps(this.props.path, tool, this.props.values);
        
        return (
          <div key={index} data-tool-name={tool.get("name")} className="tool">
            <Component {...props}
              onClick={this.props.onClick}
              onChange={this.props.onChange} />
          </div>
        );
      },
      
      render: function() {
        
        var classes = { toolbar: true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <div data-toolbar-name={this.props.name} className={classNames(classes)}>
            {this.props.tools.map(this.renderTool)}
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/
// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.Value", [
  "React", "Immutable", "classNames",
  function(React, Immutable, classNames) {
    
    var Formatters = {};
    
    return {
      
      statics: {
        
        pickProps: function(path, field, values) {
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
      
      handleClick: function(event) {
        if (this.props.onClick) {
          this.props.onClick({
            name: this.props.name,
            path: this.props.path,
            value: this.props.value,
            event: event
          });
        }
      },
      
      render: function() {
        
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
        
        return (
          <div className={classNames(classes)} onClick={this.handleClick}>
            {value}
          </div>
        );
      }
      
    };
  }
]);

// - -------------------------------------------------------------------- - //

// - -------------------------------------------------------------------- - //

"use strict";

rey.component("uim.View", [
  "React", "Immutable", "classNames", "CSSTransitionGroup", "uim.Loading", "uim.Toolbar", "uim.Overlay",
  function(React, Immutable, classNames, CSSTransitionGroup, Loading, Toolbar, Overlay) {
    
    return {

      propTypes: {
        header: React.PropTypes.any,
        footer: React.PropTypes.any,
        overlay: React.PropTypes.any,
        isLoading: React.PropTypes.bool,
        className: React.PropTypes.string
      },
      
      renderOverlay: function() {
        if (this.props.overlay) {
          return (
            <Overlay>
              {this.props.overlay}
            </Overlay>
          );
        }
      },
      
      renderHeader: function() {
        
        var header;
        
        if (Immutable.List.isList(this.props.header)) {
          header = (
            <Toolbar
              name="header"
              tools={this.props.header}
              onClick={this.props.onClick} />
          );
          
        } else if (this.props.header) {
          header = this.props.header;
        }
        
        if (header) {
          return (
            <header className="header">
              <div className="header-center">
                {header}
              </div>
            </header>
          );
        }
      },
      
      renderFooter: function() {
        
        var footer;
        
        if (Immutable.List.isList(this.props.footer)) {
          footer = (
            <Toolbar
              name="footer"
              tools={this.props.footer}
              onClick={this.props.onClick} />
          );
          
        } else if (this.props.footer) {
          footer = this.props.footer;
        }
        
        if (footer) {
          return (
            <footer className="footer">
              <div className="footer-center">
                {footer}
              </div>
            </footer>
          );
        }
      },
      
      render: function() {
        
        var classes = { view: true };
        classes[this.props.className] = !!this.props.className;
        
        return (
          <div className={classNames(classes)}>
            {this.renderHeader()}
            <main>
              {this.props.children}
              {this.props.isLoading ? <Loading /> : undefined }
            </main>
            {this.renderFooter()}
            <CSSTransitionGroup
              transitionName="overlay"
              transitionEnterTimeout={400}
              transitionLeaveTimeout={120}>
              {this.renderOverlay()}
            </CSSTransitionGroup>
          </div>
        );
      },
      
    };
  }
]);

// - -------------------------------------------------------------------- - //
