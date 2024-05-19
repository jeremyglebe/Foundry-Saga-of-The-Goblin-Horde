import * as jsonData from '../module.json' assert { type: 'json' };
const moduleId = jsonData.id;

Hooks.once('init', () => {
  console.log(`${moduleId} | Hook: init`);
  console.log('Hooks', Hooks.events);
});

// Import scripts that should be executed but have no exports
// Debug
import './debug/hook-event-listener.js';
// Hindrances
import './items/hindrances/funny-voice.js';
import './items/hindrances/gullible.js';
import './items/hindrances/light-sensitive.js';
import './items/hindrances/poor-taste.js';
// UI Mods
import './ui-mods/toggle-modifiers-label.js';
