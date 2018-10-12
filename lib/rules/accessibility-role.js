/**
 * @fileoverview Checks if Touchables have accessibilityRole
 * @author Mats Byrkjeland
 */

'use strict';

const getProp = require('jsx-ast-utils/getProp');
const getPropValue = require('jsx-ast-utils/getPropValue');

const TOUCHABLES = [
  'TouchableHighlight',
  'TouchableNativeFeedback',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
];

const ACCESSIBILITY_ROLES = [
  'none',
  'button',
  'link',
  'search',
  'image',
  'keyboardKey',
  'text',
  'adjustable',
  'imagebutton',
  'header',
  'summary',
];

function reportMissing(context, node, name) {
  context.report({
    node,
    message: `accessibilityRole prop is missing on ${name}`,
  });
}

function reportErroneousValue(context, node, value) {
  context.report({
    node,
    message: `"${value}" is not a valid accessibilityRole, expected one of ${ACCESSIBILITY_ROLES.map(role => `"${role}"`).join(', ')}`,
  });
}

module.exports = (context) => {
  const config = context.options[0] || {};
  const enforce = config.enforceExistence === undefined ? true : config.enforceExistence;
  const components = config.components || TOUCHABLES;

  return {
    JSXElement: function (node) {
      const name = node.openingElement.name.name;
      if (!components.includes(name)) {
        return;
      }

      const accessibilityRoleProp = getProp(node.openingElement.attributes, 'accessibilityRole');

      if (!accessibilityRoleProp) {
        if (enforce) {
          reportMissing(context, node, name);
        }
        return;
      }

      const propValue = getPropValue(accessibilityRoleProp);
      if (!ACCESSIBILITY_ROLES.includes(propValue)) {
        reportErroneousValue(context, node, propValue);
      }
    },
  };
};

module.exports.schema = [{
  type: 'object',
  properties: {
    enforceExistence: {
      type: 'boolean',
    },
    components: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
}];
