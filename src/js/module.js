import * as jsonData from '../module.json' assert { type: 'json' };
const moduleId = jsonData.id;

Hooks.once('init', () => {
  console.log(`${moduleId} | Hook: init`);
});

// Import scripts that should be executed but have no exports
// UI Mods
import './ui-mods/toggle-modifiers-label.js';
// Effects
import './effects/barghest.js';
