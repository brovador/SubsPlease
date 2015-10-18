'use strict';

var fs = require('fs'),
    remote = require('remote'),
    app = remote.require('app'),
    preferencesPath = app.getPath('userData') + '/preferences.json',
    preferences = null;

var defaultPreferences = {
  'selectedLanguage': 'en'
};

function loadPreferences() {
  preferences = defaultPreferences;
  if (fs.existsSync(preferencesPath)) {
    preferences = JSON.parse(fs.readFileSync(preferencesPath, 'utf8'));
  }
}

function savePreferences() {
  fs.writeFileSync(preferencesPath, JSON.stringify(preferences), 'utf8');
}

loadPreferences();

module.exports = {
  preferences: preferences,
  load: loadPreferences,
  save: savePreferences
};