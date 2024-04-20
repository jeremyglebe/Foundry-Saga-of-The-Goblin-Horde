import { id as moduleId } from '../module.json' assert { type: 'json' };

Hooks.once('init', () => {
  console.log(`${moduleId} | Hook: init`);
});

// Hooks.on('swadePreRollAttribute', (actor, attribute, roll, modifiers, options) => {
//   console.log(`${moduleId} | Hook: swadePreRollAttribute`);
//   console.log(`Actor: ${actor.name}`);
//   console.log(`Attribute: ${attribute}`);
//   console.log(`Roll: ${roll}`);
//   console.log(`Modifiers: ${modifiers}`);
//   console.log(`Options: ${options}`);
//   // modifiers.push({ label: 'My Modifier', value: 2, ignore: true });
// });

function logPreRollSkill(actor, skill, roll, modifiers, options) {
  console.log(`${moduleId} | Hook: swadePreRollSkill`);
  console.log(`Actor: ${actor.name}`);
  console.log(`Skill: ${skill}`);
  console.log(`Roll: ${roll}`);
  console.log(`Modifiers: ${modifiers}`);
  console.log(`Options: ${options}`);
  // modifiers.push({ label: 'My Modifier', value: 2, ignore: true });
}
// Hooks.on('swadePreRollSkill', logPreRollSkill);

// Import scripts that should be executed but have no exports
import './items/abilities/goblinoid.js';