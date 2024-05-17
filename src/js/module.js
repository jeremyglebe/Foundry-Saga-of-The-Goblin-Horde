import { id as moduleId } from '../module.json' assert { type: 'json' };

Hooks.once('init', () => {
  console.log(`${moduleId} | Hook: init`);
  console.log("Hooks", Hooks);
});

// Import scripts that should be executed but have no exports
import './modifiers/toggle-by-label.js';
// Hindrances
import './items/hindrances/funny-voice.js';
import './items/hindrances/gullible.js';
import './items/hindrances/light-sensitive.js';
import './items/hindrances/poor-taste.js';