import { id as moduleId } from '../../../module.json' assert { type: 'json' };

function lightSensitivePreRollSkill(actor, skill, roll, modifiers, options) {
  console.log(`${moduleId}:light-sensitive.js | Hook: swadePreRollSkill`);

  const lightSensitiveHindrance = actor.itemTypes.hindrance.find((hindrance) => hindrance.name === 'Light Sensitive');
  const hasLightSensitiveHindrance = lightSensitiveHindrance !== undefined;

  if (hasLightSensitiveHindrance) {
    modifiers.push({ label: 'Normal Lighting', value: -1, ignore: true });
    modifiers.push({ label: 'Bright Lighting', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollSkill', lightSensitivePreRollSkill);

function lightSensitivePreAttributeRoll(actor, attribute, roll, modifiers, options) {
  console.log(`${moduleId}:light-sensitive.js | Hook: swadePreRollAttribute`);

  const lightSensitiveHindrance = actor.itemTypes.hindrance.find((hindrance) => hindrance.name === 'Light Sensitive');
  const hasLightSensitiveHindrance = lightSensitiveHindrance !== undefined;

  if (hasLightSensitiveHindrance) {
    modifiers.push({ label: 'Light Sensitive: Normal', value: -1, ignore: true });
    modifiers.push({ label: 'Light Sensitive: Bright', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollAttribute', lightSensitivePreAttributeRoll);