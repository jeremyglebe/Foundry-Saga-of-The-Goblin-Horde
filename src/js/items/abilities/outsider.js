import { id as moduleId } from '../../../module.json' assert { type: 'json' };

function outsiderPreRollSkill(actor, skill, roll, modifiers, options) {
  console.log(`${moduleId}:outsider.js | Hook: swadePreRollSkill`);

  const isRollingPersuasion = skill.name === 'Persuasion';
  const outsiderAbility = actor.itemTypes.ability.find((ability) => ability.name === 'Outsider');
  const hasOutsiderAbility = outsiderAbility !== undefined;

  if (isRollingPersuasion && hasOutsiderAbility) {
    modifiers.push({ label: 'Outsider: Persuade humans/goblins', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollSkill', outsiderPreRollSkill);
