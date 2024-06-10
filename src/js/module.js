import * as jsonData from '../module.json' assert { type: 'json' };
const moduleId = jsonData.id;

Hooks.once('init', () => {
  console.log(`${moduleId} | Hook: init`);
});

// Import scripts that should be executed but have no exports
// Hindrances
import './items/hindrances/gullible.js';
// UI Mods
import './ui-mods/toggle-modifiers-label.js';
