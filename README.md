## Bug Report for webpack-karma

The problem is that an old build is run in watch mode.

### Scenario

1. Run karma in watch mode: `npm run test`
2. Wait for the bundle to be built and tests to run. The tests should succeed.
3. Now modify the spec file such that the tests would fail: `sed -i 's/toBe([0-9])/toBe(9)/' src/one.spec.js`.

### Expected Behavior

After step 3, the new bundle should be run and fail:

```
HeadlessChrome 71.0.3578 (Mac OS X 10.13.6) one should equal 1 FAILED
	Error: Expected 1 to be 9.
	    at <Jasmine>
	    at UserContext.it (webpack:///./src/one.spec.js?:7:58)
	    at <Jasmine>
HeadlessChrome 71.0.3578 (Mac OS X 10.13.6): Executed 1 of 1 (1 FAILED) ERROR (0.003 secs / 0.003 secs)
```

If re-run `npm run test` command, I see the expected result: the tests fail.

### Actual Behavior

Although I can see that webpack recompiled the bundle and the reported hash changed, the build succeeds as if it would run the original (unmodified) tests.

### Full Log

```
$ npm run test

> webpack-context-require@1.0.0 test /Users/korya/dev/webpack-context-require
> karma start ./karma.conf.js

13 12 2018 14:08:29.056:WARN [karma]: No captured browser, open http://localhost:9877/
ℹ ｢wdm｣: Hash: da049fc7bf26ee608e7b
Version: webpack 4.27.1
Time: 15ms
Built at: 2018-12-13 2:08:29 p.m.
   Asset      Size  Chunks             Chunk Names
index.js  5.81 KiB   index  [emitted]  index
 main.js  5.81 KiB    main  [emitted]  main
Entrypoint main = main.js
Entrypoint index = index.js
[./index.js] 97 bytes {main} {index} [built]
[./src sync recursive \.spec\.js$] ./src sync \.spec\.js$ 178 bytes {main} {index} [built]
[./src/one.js] 18 bytes {main} {index} [built]
[./src/one.spec.js] 116 bytes {main} {index} [optional] [built]
ℹ ｢wdm｣: Compiled successfully.
13 12 2018 14:08:29.072:INFO [karma-server]: Karma v3.1.3 server started at http://0.0.0.0:9877/
13 12 2018 14:08:29.072:INFO [launcher]: Launching browsers ChromeHeadless with concurrency unlimited
13 12 2018 14:08:29.076:INFO [launcher]: Starting browser ChromeHeadless
13 12 2018 14:08:29.448:INFO [HeadlessChrome 71.0.3578 (Mac OS X 10.13.6)]: Connected on socket PCQ1DpJMsd9hi8fGAAAA with id 22158802
HeadlessChrome 71.0.3578 (Mac OS X 10.13.6): Executed 1 of 1 SUCCESS (0.001 secs / 0.001 secs)
TOTAL: 1 SUCCESS


##### Run 'sed -i 's/toBe([0-9])/toBe(9)/' src/one.spec.js



ℹ ｢wdm｣: Compiling...
ℹ ｢wdm｣: Hash: 740e0db875c82d372f14
Version: webpack 4.27.1
Time: 13ms
Built at: 2018-12-13 2:09:13 p.m.
   Asset      Size  Chunks             Chunk Names
index.js  5.88 KiB   index  [emitted]  index
 main.js  5.88 KiB    main  [emitted]  main
Entrypoint main = main.js
Entrypoint index = index.js
[./index.js] 97 bytes {main} {index}
[./src sync recursive \.spec\.js$] ./src sync \.spec\.js$ 178 bytes {main} {index} [built]
[./src/one.js] 18 bytes {main} {index}
[./src/one.spec.js] 141 bytes {main} {index} [optional] [built]
ℹ ｢wdm｣: Compiled successfully.
HeadlessChrome 71.0.3578 (Mac OS X 10.13.6): Executed 1 of 1 SUCCESS (0.001 secs / 0 secs)
TOTAL: 1 SUCCESS

^C
$ npm run test

> webpack-context-require@1.0.0 test /Users/korya/dev/webpack-context-require
> karma start ./karma.conf.js

13 12 2018 14:09:26.554:WARN [karma]: No captured browser, open http://localhost:9877/
ℹ ｢wdm｣: Hash: 740e0db875c82d372f14
Version: webpack 4.27.1
Time: 14ms
Built at: 2018-12-13 2:09:26 p.m.
   Asset      Size  Chunks             Chunk Names
index.js  5.88 KiB   index  [emitted]  index
 main.js  5.88 KiB    main  [emitted]  main
Entrypoint main = main.js
Entrypoint index = index.js
[./index.js] 97 bytes {main} {index} [built]
[./src sync recursive \.spec\.js$] ./src sync \.spec\.js$ 178 bytes {main} {index} [built]
[./src/one.js] 18 bytes {main} {index} [built]
[./src/one.spec.js] 141 bytes {main} {index} [optional] [built]
ℹ ｢wdm｣: Compiled successfully.
13 12 2018 14:09:26.570:INFO [karma-server]: Karma v3.1.3 server started at http://0.0.0.0:9877/
13 12 2018 14:09:26.570:INFO [launcher]: Launching browsers ChromeHeadless with concurrency unlimited
13 12 2018 14:09:26.579:INFO [launcher]: Starting browser ChromeHeadless
13 12 2018 14:09:26.948:INFO [HeadlessChrome 71.0.3578 (Mac OS X 10.13.6)]: Connected on socket -OKokGONWWP4Z2SPAAAA with id 24758883
HeadlessChrome 71.0.3578 (Mac OS X 10.13.6) one should equal 1 FAILED
	Error: Expected 1 to be 9.
	    at <Jasmine>
	    at UserContext.it (webpack:///./src/one.spec.js?:7:58)
	    at <Jasmine>
	Error: Expected 1 to be 9.
	    at <Jasmine>
	    at UserContext.it (webpack:///./src/one.spec.js?:8:58)
	    at <Jasmine>
HeadlessChrome 71.0.3578 (Mac OS X 10.13.6): Executed 1 of 1 (1 FAILED) ERROR (0.002 secs / 0.002 secs)
^C
```
