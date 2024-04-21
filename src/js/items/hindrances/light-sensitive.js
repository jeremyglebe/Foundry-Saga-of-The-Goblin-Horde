import { id as moduleId } from '../../../module.json' assert { type: 'json' };

function gulliblePreRollSkill(actor, skill, roll, modifiers, options) {
  console.log(`${moduleId}:gullible.js | Hook: swadePreRollSkill`);

  const isRollingCommonKnowledge = skill.name === 'Common Knowledge';
  const isRollingIntimidation = skill.name === 'Intimidation';
  const isRollingPersuasion = skill.name === 'Persuasion';
  const isRollingResearch = skill.name === 'Research';
  const isRollingThievery = skill.name === 'Thievery';
  const isRollingApplicableSkill = isRollingCommonKnowledge || isRollingIntimidation || isRollingPersuasion || isRollingResearch || isRollingThievery;

  const gullibleHindrance = actor.itemTypes.hindrance.find((hindrance) => hindrance.name === 'Gullible');
  const hasGullibleHindrance = gullibleHindrance !== undefined;

  if (isRollingApplicableSkill && hasGullibleHindrance) {
    modifiers.push({ label: 'Bartering', value: -2, ignore: true });
  }
}
Hooks.on('swadePreRollSkill', gulliblePreRollSkill);