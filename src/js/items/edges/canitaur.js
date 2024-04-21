import { id as moduleId } from '../../../module.json' assert { type: 'json' };

function canitaurPreRollSkill(actor, skill, roll, modifiers, options) {
  console.log(`${moduleId}:canitaur.js | Hook: swadePreRollSkill`);

  const isRollingAthletics = skill.name === 'Athletics';
  const canitaurEdge = actor.itemTypes.edge.find((edge) => edge.name === 'Canitaur');
  const hasCanitaurEdge = canitaurEdge !== undefined;

  if (isRollingAthletics && hasCanitaurEdge) {
    modifiers.push({ label: 'Jumping?', value: 2, ignore: true });
    modifiers.push({ label: 'Climbing?', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollSkill', canitaurPreRollSkill);
