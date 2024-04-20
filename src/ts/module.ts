import { id as moduleId } from '../module.json' assert { type: 'json' };

Hooks.once('init', () => {
  console.log(`Initializing ${moduleId}`);
});
