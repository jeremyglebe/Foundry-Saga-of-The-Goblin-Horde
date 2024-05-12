import { id as moduleId } from '../../../module.json' assert { type: 'json' };

function proudPreAttributeRoll(actor, attribute, roll, modifiers, options) {
  console.log(`${moduleId}:proud.js | Hook: swadePreRollAttribute`);

  const isRollingSmarts = attribute.name === 'Smarts';
  const proudAbility = actor.itemTypes.ability.find((ability) => ability.name === 'Proud');
  const hasProudAbility = proudAbility !== undefined;

  if (isRollingSmarts && hasProudAbility) {
    modifiers.push({ label: 'Proud: Resist Taunt', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollAttribute', proudPreAttributeRoll);