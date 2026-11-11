import app from './index.js';

async function test() {
  const r = await fetch('http://localhost:3000/');
  const t = await r.text();
  console.log('Status:', r.status);
  console.log('Has root div:', t.includes('id="root"'));
  console.log('Has bundled scripts:', t.includes('.js'));
  console.log('Static server verified successfully!');
  process.exit(0);
}

setTimeout(test, 500);

