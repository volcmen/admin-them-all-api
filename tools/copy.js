import {writeFile, makeDir, copyDir} from './lib/fs';
import pkg from '../package.json';

/**
 * Copies static files such as robots.txt, favicon.ico to the
 * output (build) folder.
 */
async function copy() {
  await makeDir('dist');
  await Promise.all([
    writeFile('dist/package.json', JSON.stringify({
      private: true,
      engines: pkg.engines,
      dependencies: pkg.dependencies,
      scripts: {
        start: 'node ruleThemAll-api.js',
      },
    }, null, 2)),
    copyDir('config', 'dist/config'),
  ]);
}

export default copy;
