import * as jsonData from '../../../module.json' assert { type: 'json' };
const moduleId = jsonData.id;

function funnyVoicePreRollSkill(actor, skill, roll, modifiers, options) {
  console.log(`${moduleId}:funny-voice.js | Hook: swadePreRollSkill`);

  const isRollingPersuasion = skill.name === 'Persuasion';
  const isRollingIntimidation = skill.name === 'Intimidation';
  const funnyVoiceHindrance = actor.itemTypes.hindrance.find((hindrance) => hindrance.name === 'Funny Voice');
  const hasFunnyVoiceHindrance = funnyVoiceHindrance !== undefined;

  if ((isRollingIntimidation || isRollingPersuasion) && hasFunnyVoiceHindrance) {
    const penalty = funnyVoiceHindrance.system.major ? -4 : -2;
    modifiers.push({ label: 'Funny Voice', value: penalty, ignore: true });
  }
}
Hooks.on('swadePreRollSkill', funnyVoicePreRollSkill);
