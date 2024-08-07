import * as jsonData from '../../module.json' assert { type: 'json' };
const moduleId = jsonData.id;

// Function to run when updateActiveEffect is called
async function barghestUpdateActiveEffect(effect, toggleData, _, activatingUserId) {
  console.log(`${moduleId}:barghest.js | Hook: updateActiveEffect`);
  const thisUserId = game.userId;
  const { disabled } = toggleData;

  // Checks if effect is being toggled (disabled will be true or false, if undefined then this update isn't a toggle)
  // Also checks that this user is the one toggling the effect (to avoid duplicate toggles from GM and owner of actor)
  if (disabled !== undefined && thisUserId === activatingUserId) {
    // Determines if the effect is a barghest toggle effect, then runs the appropriate function
    if (effect.changes.find((change) => change.key === 'barghest-toggle-hybrid')) {
      await barghestToggleHybridForm(effect, disabled);
    }
    if (effect.changes.find((change) => change.key === 'barghest-toggle-wolf')) {
      await barghestToggleWolfForm(effect, disabled);
    }
  }
}
// Add the hook to update the active effect
Hooks.on('updateActiveEffect', barghestUpdateActiveEffect);

// Function to run when the Hybrid Form toggle is updated
async function barghestToggleHybridForm(effect, disabled) {
  const { actor } = effect;
  const { favorite } = effect.flags.swade;

  const itemId = 'Q5xS4QCulqraVtcv';
  const itemSwid = 'barghest-hybrid-form';
  const pack = game.packs.get('swade-saga-of-the-goblin-horde.sotgh-abilities');
  const item = await pack.getDocument(itemId);

  if (!disabled) {
    await actor.createEmbeddedDocuments('Item', [item]);
    await actor.updateEmbeddedDocuments('Item', [
      {
        '_id': actor.items.find((i) => i.system.swid === 'barghest-hybrid-form-claws-fangs').id,
        'system.favorite': favorite,
      },
    ]);
  } else {
    const itemToDelete = actor.items.find((i) => i.system.swid === itemSwid);
    if (itemToDelete) {
      await actor.deleteEmbeddedDocuments('Item', [itemToDelete.id]);
    }
  }

  await barghestToggleThickFur(actor, disabled);
}

// Function to run when the Wolf Form toggle is updated
async function barghestToggleWolfForm(effect, disabled) {
  const { actor } = effect;
  const { favorite } = effect.flags.swade;

  const itemId = 'Oq37dJHD13zzefor';
  const itemSwid = 'barghest-wolf-form';
  const pack = game.packs.get('swade-saga-of-the-goblin-horde.sotgh-abilities');
  const item = await pack.getDocument(itemId);

  if (!disabled) {
    await actor.createEmbeddedDocuments('Item', [item]);
    await actor.updateEmbeddedDocuments('Item', [
      {
        '_id': actor.items.find((i) => i.system.swid === 'go-for-the-throat').id,
        'system.favorite': favorite,
      },
    ]);
    await actor.updateEmbeddedDocuments('Item', [
      {
        '_id': actor.items.find((i) => i.system.swid === 'barghest-wolf-form-bite').id,
        'system.favorite': favorite,
      },
    ]);
  } else {
    const itemToDelete = actor.items.find((i) => i.system.swid === itemSwid);
    if (itemToDelete) {
      await actor.deleteEmbeddedDocuments('Item', [itemToDelete.id]);
    }
  }

  await barghestToggleThickFur(actor, disabled);
}

// Function that, when toggling either form, will check if the actor has the "Thick Fur" edge and toggle its active effect as well
async function barghestToggleThickFur(actor, disabled) {
  const thickFur = actor.items.find((i) => i.system.swid === 'thick-fur');
  if (thickFur) {
    const thickFurEffect = thickFur.effects.find((e) => e.name === 'Effect: Thick Fur');
    if (thickFurEffect) {
      const { id } = thickFurEffect;
      await thickFur.updateEmbeddedDocuments('ActiveEffect', [{ _id: id, disabled }]);
    }
  }
}
