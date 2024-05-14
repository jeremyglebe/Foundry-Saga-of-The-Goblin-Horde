import { id as moduleId } from '../../module.json' assert { type: 'json' };

function labelsPreRollAttribute(actor, attribute, roll, modifiers, options) {
    console.log(`${moduleId}:toggle-by-label.js | Hook: swadePreRollAttribute`);
    for (const modifier of modifiers) {
        const checked = modifier.label.slice(-1) === '☑';
        if(checked) {
            modifier.ignore = true;
            modifier.label = modifier.label.slice(0, -1);
        }
    }
}
Hooks.on('swadePreRollAttribute', labelsPreRollAttribute);

function labelsPreRollSkill(actor, skill, roll, modifiers, options) {
    console.log(`${moduleId}:toggle-by-label.js | Hook: swadePreRollSkill`);
    for (const modifier of modifiers) {
        const checked = modifier.label.slice(-1) === '☑';
        if(checked) {
            modifier.ignore = true;
            modifier.label = modifier.label.slice(0, -1);
        }
    }
}
Hooks.on('swadePreRollSkill', labelsPreRollSkill);

function labelsRollDamage(actor, item, roll, modifiers, options) {
    console.log(`${moduleId}:toggle-by-label.js | Hook: swadeRollDamage`);
    for (const modifier of modifiers) {
        const checked = modifier.label.slice(-1) === '☑';
        if(checked) {
            modifier.ignore = true;
            modifier.label = modifier.label.slice(0, -1);
        }
    }
}
Hooks.on('swadeRollDamage', labelsRollDamage);