import { id as moduleId } from '../../../module.json' assert { type: 'json' };

function gulliblePreRollSkill(actor, skill, roll, modifiers, options) {
  console.log(`${moduleId}:gullible.js | Hook: swadePreRollSkill`);

  const gullibleHindrance = actor.itemTypes.hindrance.find((hindrance) => hindrance.name === 'Gullible');
  const hasGullibleHindrance = gullibleHindrance !== undefined;

  if (hasGullibleHindrance) {
    modifiers.push({ label: 'Bartering', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollSkill', gulliblePreRollSkill);

function gulliblePreAttributeRoll(actor, attribute, roll, modifiers, options) {
  console.log(`${moduleId}:gullible.js | Hook: swadePreRollAttribute`);

  const gullibleHindrance = actor.itemTypes.hindrance.find((hindrance) => hindrance.name === 'Gullible');
  const hasGullibleHindrance = gullibleHindrance !== undefined;

  if (hasGullibleHindrance) {
    modifiers.push({ label: 'Bartering', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollAttribute', gulliblePreAttributeRoll);
