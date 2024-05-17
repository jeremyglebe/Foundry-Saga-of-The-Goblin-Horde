import * as jsonData from '../../../module.json' assert { type: 'json' };
const moduleId = jsonData.id;

function poorTastePreRollSkill(actor, skill, roll, modifiers, options) {
  console.log(`${moduleId}:poor-taste.js | Hook: swadePreRollSkill`);

  const poorTasteHindrance = actor.itemTypes.hindrance.find((hindrance) => hindrance.name === 'Poor Taste');
  const hasPoorTasteHindrance = poorTasteHindrance !== undefined;

  if (hasPoorTasteHindrance) {
    modifiers.push({ label: 'Looting or Bartering', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollSkill', poorTastePreRollSkill);

function poorTastePreAttributeRoll(actor, attribute, roll, modifiers, options) {
  console.log(`${moduleId}:poor-taste.js | Hook: swadePreRollAttribute`);

  const poorTasteHindrance = actor.itemTypes.hindrance.find((hindrance) => hindrance.name === 'Poor Taste');
  const hasPoorTasteHindrance = poorTasteHindrance !== undefined;

  if (hasPoorTasteHindrance) {
    modifiers.push({ label: 'Poor Taste: Looting/Bartering', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollAttribute', poorTastePreAttributeRoll);
