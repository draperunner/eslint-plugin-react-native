/**
 * @fileoverview enforceExistences accessibilityRole prop
 * @author Mats Byrkjeland
 */

'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/accessibility-role');
const RuleTester = require('eslint').RuleTester;

require('babel-eslint');

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();

const tests = {
  valid: [
    {
      code: '<TouchableOpacity accessibilityRole="button" />',
    },
    {
      code: '<TouchableOpacity />',
      options: [{ enforceExistence: false }],
    },
  ],
  invalid: [
    {
      code: '<TouchableOpacity />',
      errors: [{
        message: 'accessibilityRole prop is missing on TouchableOpacity',
      }],
    },
    {
      code: '<TouchableOpacity accessibilityRole="something" />',
      errors: [{
        message: '"something" is not a valid accessibilityRole, expected one of "none", "button", "link", "search", "image", "keyboardKey", "text", "adjustable", "imagebutton", "header", "summary"',
      }],
    },
    {
      code: '<TouchableOpacity accessibilityRole="something" />',
      options: [{ enforceExistence: false }],
      errors: [{
        message: '"something" is not a valid accessibilityRole, expected one of "none", "button", "link", "search", "image", "keyboardKey", "text", "adjustable", "imagebutton", "header", "summary"',
      }],
    },
    {
      code: '<SomeComponent />',
      options: [{ components: ['SomeComponent'] }],
      errors: [{
        message: 'accessibilityRole prop is missing on SomeComponent',
      }],
    },
  ],
};

const config = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      classes: true,
      jsx: true,
    },
  },
};

tests.valid.forEach(t => Object.assign(t, config));
tests.invalid.forEach(t => Object.assign(t, config));

ruleTester.run('accessibility-role', rule, tests);
