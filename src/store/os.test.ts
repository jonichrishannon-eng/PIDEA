import { test, beforeEach } from 'node:test';
import assert from 'node:assert';
import { useOSStore } from './os.ts';

beforeEach(() => {
  useOSStore.setState({
    windows: [],
    activeBackground: 'vanta-net'
  });
});

test('OS Store - initial state', () => {
  const state = useOSStore.getState();
  assert.deepStrictEqual(state.windows, []);
  assert.strictEqual(state.activeBackground, 'vanta-net');
});

test('OS Store - openApp new app', () => {
  const state = useOSStore.getState();
  state.openApp('app1', 'App 1', 'type1');

  const newState = useOSStore.getState();
  assert.strictEqual(newState.windows.length, 1);
  const app = newState.windows[0];
  assert.strictEqual(app.id, 'app1');
  assert.strictEqual(app.title, 'App 1');
  assert.strictEqual(app.isOpen, true);
  assert.strictEqual(app.isFocused, true);
  assert.strictEqual(app.isMinimized, false);
});

test('OS Store - openApp multiple apps', () => {
  const state = useOSStore.getState();
  state.openApp('app1', 'App 1', 'type1');
  state.openApp('app2', 'App 2', 'type2');

  const newState = useOSStore.getState();
  assert.strictEqual(newState.windows.length, 2);

  const app1 = newState.windows.find(w => w.id === 'app1');
  const app2 = newState.windows.find(w => w.id === 'app2');

  assert.strictEqual(app1?.isFocused, false);
  assert.strictEqual(app2?.isFocused, true);
  assert.ok((app2?.zIndex ?? 0) > (app1?.zIndex ?? 0));
});

test('OS Store - openApp existing app (re-focus)', () => {
  const state = useOSStore.getState();
  state.openApp('app1', 'App 1', 'type1');
  state.openApp('app2', 'App 2', 'type2');

  // Minimize app1
  state.minimizeApp('app1');
  assert.strictEqual(useOSStore.getState().windows.find(w => w.id === 'app1')?.isMinimized, true);

  // Open app1 again
  state.openApp('app1', 'App 1', 'type1');

  const finalState = useOSStore.getState();
  const app1 = finalState.windows.find(w => w.id === 'app1');
  const app2 = finalState.windows.find(w => w.id === 'app2');

  assert.strictEqual(app1?.isFocused, true);
  assert.strictEqual(app1?.isMinimized, false);
  assert.strictEqual(app2?.isFocused, false);
  assert.ok((app1?.zIndex ?? 0) > (app2?.zIndex ?? 0));
});

test('OS Store - closeApp', () => {
  const state = useOSStore.getState();
  state.openApp('app1', 'App 1', 'type1');
  assert.strictEqual(useOSStore.getState().windows.length, 1);

  state.closeApp('app1');
  assert.strictEqual(useOSStore.getState().windows.length, 0);
});

test('OS Store - minimizeApp', () => {
  const state = useOSStore.getState();
  state.openApp('app1', 'App 1', 'type1');
  state.minimizeApp('app1');

  const app = useOSStore.getState().windows[0];
  assert.strictEqual(app.isMinimized, true);
  assert.strictEqual(app.isFocused, false);
});

test('OS Store - focusApp', () => {
  const state = useOSStore.getState();
  state.openApp('app1', 'App 1', 'type1');
  state.openApp('app2', 'App 2', 'type2');

  state.focusApp('app1');

  const app1 = useOSStore.getState().windows.find(w => w.id === 'app1');
  const app2 = useOSStore.getState().windows.find(w => w.id === 'app2');

  assert.strictEqual(app1?.isFocused, true);
  assert.strictEqual(app2?.isFocused, false);
  assert.ok((app1?.zIndex ?? 0) > (app2?.zIndex ?? 0));
});

test('OS Store - setBackground', () => {
  const state = useOSStore.getState();
  state.setBackground('new-bg');
  assert.strictEqual(useOSStore.getState().activeBackground, 'new-bg');
});
