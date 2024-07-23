// // EXPERIMENT BELOW: Generic methods for toggling items from active effects

// async function activeEffectToggleItem(effect, toggleData, _, activatingUserId) {
//   const thisUserId = game.userId;
//   const { disabled } = toggleData;
//   const { actor } = effect;
//   if (disabled !== undefined && thisUserId === activatingUserId) {
//     effect.changes.forEach(async (change) => {
//       if (change.key === 'toggle-item') {
//         const itemName = change.value;
//         if (disabled) {
//           const item = await findItemInActor(actor, itemName);
//           if (item) {
//             console.log('FOUND ITEM', item);
//             await actor.deleteEmbeddedDocuments('Item', [item.id]);
//           }
//         } else {
//           const item = await findItemAnywhere(itemName);
//           if (item) {
//             console.log('FOUND ITEM', item);
//             await actor.createEmbeddedDocuments('Item', [item]);
//           }
//         }
//       }
//     });
//   }
// }
// Hooks.on('updateActiveEffect', activeEffectToggleItem);

// async function findItemAnywhere(itemName) {
//   const packs = game.packs.filter((p) => p.metadata.type === 'Item');
//   for (const pack of packs) {
//     const documents = await pack.getDocuments();
//     const item = documents.find((d) => d.name === itemName);
//     if (item) return item;
//   }
//   const items = game.items;
//   return items.find((i) => i.name === itemName);
// }

// async function findItemInActor(actor, itemName) {
//   return actor.items.find((i) => i.name === itemName);
// }

async function findItemAnywhere(key, value) {
  const packs = game.packs.filter((p) => p.metadata.type === 'Item');
  for (const pack of packs) {
    const documents = await pack.getDocuments();
    // const item = documents.find((d) => d[key] === value);
    const item = documents.find((d) => nestedProperty(d, key) === value);
    if (item) return item;
  }
  const items = game.items;
  // return items.find((i) => i[key] === value);
  return items.find((i) => nestedProperty(i, key) === value);
}

async function findItemInActor(actor, key, value) {
  // return actor.items.find((i) => i[key] === value);
  return actor.items.find((i) => nestedProperty(i, key) === value);
}

function nestedProperty(obj, path) {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

function parsePathFromEffectKey(key) {
  // Key will be in the format toggle-item:<path>
  return key.split(':')[1];
}

async function activeEffectToggleItem(effect, toggleData, _, activatingUserId) {
  const thisUserId = game.userId;
  const { disabled } = toggleData;
  const { actor } = effect;
  if (disabled !== undefined && thisUserId === activatingUserId) {
    effect.changes.forEach(async (change) => {
      if (change.key.startsWith('toggle-item:')) {
        const path = parsePathFromEffectKey(change.key);
        const itemSearchTerm = change.value;
        if (disabled) {
          const item = await findItemInActor(actor, path, itemSearchTerm);
          if (item) {
            console.log('FOUND ITEM', item);
            await actor.deleteEmbeddedDocuments('Item', [item.id]);
          }
        } else {
          const item = await findItemAnywhere(path, itemSearchTerm);
          if (item) {
            console.log('FOUND ITEM', item);
            await actor.createEmbeddedDocuments('Item', [item]);
          }
        }
      }
    });
  }
}
Hooks.on('updateActiveEffect', activeEffectToggleItem);
