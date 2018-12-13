const testCtx = require.context('./src', true, /\.spec\.js$/);

testCtx.keys().forEach(testCtx);
