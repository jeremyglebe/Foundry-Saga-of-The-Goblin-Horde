import { id as moduleId } from '../../../module.json' assert { type: 'json' };

function goblinoidPreRollSkill(actor, skill, roll, modifiers, options) {
  console.log(`${moduleId}:goblinoid.js | Hook: swadePreRollSkill`);

  const isRollingPersuasion = skill.name === 'Persuasion';
  const goblinoidAbility = actor.itemTypes.ability.find((ability) => ability.name === 'Goblinoid');
  const hasGoblinoidAbility = goblinoidAbility !== undefined;

  if (isRollingPersuasion && hasGoblinoidAbility) {
    // Goblinoids take a penalty to Persuasion when dealing with humans.
    // It is toggled off by default since only the GM and players will know if the target is a human.
    modifiers.push({ label: 'Goblinoid: Persuade humans', value: -4, ignore: true });
  }
}
Hooks.on('swadePreRollSkill', goblinoidPreRollSkill);
