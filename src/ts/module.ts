import { id as moduleId } from '../module.json' assert { type: 'json' };
import '../styles/main.scss';

Hooks.once('init', () => {
  console.log(`Initializing ${moduleId}`);
});
