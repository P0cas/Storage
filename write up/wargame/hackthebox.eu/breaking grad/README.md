# TR;DL

> Prototype Pollution to RCE

---
# First analysis

```js
router.get('/debug/:action', (req, res) => {
    return DebugHelper.execute(res, req.params.action);
});
```
Oh, u can see the using the execute() method in `/debug/:action`

```js
const { execSync, fork } = require('child_process');

module.exports = {
    execute(res, command) {

        res.type('txt');

        if (command == 'version') {
            let proc = fork('VersionCheck.js', [], {
                stdio: ['ignore', 'pipe', 'pipe', 'ipc']
            });

            proc.stderr.pipe(res);
            proc.stdout.pipe(res);

            return;
        } 
        
        if (command == 'ram') {
            return res.send(execSync('free -m').toString());
        }
        
        return res.send('invalid command');
    }
}
```
If u see at the execute() method, u can know using the fork() method.

```js
function fork(modulePath /* , args, options */) {
  validateString(modulePath, 'modulePath');

  // Get options and args arguments.
  let execArgv;
  let options = {};
  let args = [];
  let pos = 1;
  if (pos < arguments.length && ArrayIsArray(arguments[pos])) {
    args = arguments[pos++];
  }

  if (pos < arguments.length &&
      (arguments[pos] === undefined || arguments[pos] === null)) {
    pos++;
  }

  if (pos < arguments.length && arguments[pos] != null) {
    if (typeof arguments[pos] !== 'object') {
      throw new ERR_INVALID_ARG_VALUE(`arguments[${pos}]`, arguments[pos]);
    }

    options = { ...arguments[pos++] };
  }

  // Prepare arguments for fork:
  execArgv = options.execArgv || process.execArgv;

  if (execArgv === process.execArgv && process._eval != null) {
    const index = execArgv.lastIndexOf(process._eval);
    if (index > 0) {
      // Remove the -e switch to avoid fork bombing ourselves.
      execArgv = execArgv.slice();
      execArgv.splice(index - 1, 2);
    }
  }

  args = execArgv.concat([modulePath], args);

  if (typeof options.stdio === 'string') {
    options.stdio = stdioStringToArray(options.stdio, 'ipc');
  } else if (!ArrayIsArray(options.stdio)) {
    // Use a separate fd=3 for the IPC channel. Inherit stdin, stdout,
    // and stderr from the parent if silent isn't set.
    options.stdio = stdioStringToArray(
      options.silent ? 'pipe' : 'inherit',
      'ipc');
  } else if (!options.stdio.includes('ipc')) {
    throw new ERR_CHILD_PROCESS_IPC_REQUIRED('options.stdio');
  }

  options.execPath = options.execPath || process.execPath;
  options.shell = false;

  return spawn(options.execPath, args, options);
}

Reference : https://blog.mmf.moe/post/node-fork-proto-env-rce/
```
```js
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

Reference : https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options
```
If u see at the fork method, u can see that the spwan function is called using `execPath` and `execArgv` :)

---
# Second analysis

```js
router.post('/api/calculate', (req, res) => {
    let student = ObjectHelper.clone(req.body);

    if (StudentHelper.isDumb(student.name) || !StudentHelper.hasBase(student.paper)) {
        return res.send({
            'pass': 'n' + randomize('?', 10, {chars: 'o0'}) + 'pe'
        });
    }

    return res.send({
        'pass': 'Passed'
    });
});
```
If u see a source code above, u can know that the clone() method is using

```js
module.exports = {
    isObject(obj) {
        return typeof obj === 'function' || typeof obj === 'object';
    },

    isValidKey(key) {
        return key !== '__proto__';
    },

    merge(target, source) {
        for (let key in source) {
            if (this.isValidKey(key)){
                if (this.isObject(target[key]) && this.isObject(source[key])) {
                    this.merge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    },

    clone(target) {
        return this.merge({}, target);
    }
}
```
If u see at the clone(), u cat know that the merge() method is use in internal zz. So, I can know i should using the prototype pollution here :)

So, I thought should modify a `execPath` and `execArgv` using the prototype pollution.

```js
    isValidKey(key) {
        return key !== '__proto__';
    },

    merge(target, source) {
        for (let key in source) {
            if (this.isValidKey(key)){
                if (this.isObject(target[key]) && this.isObject(source[key])) {
                    this.merge(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
        return target;
    }
```
I see at the code again, it is filtering `__proto__`,,,

![](https://github.com/wjddnjs33/Write-Up/blob/main/wargame/hackthebox.eu/breaking%20grad/images/__proto__.png?raw=true)

But, `__proto__` and `constructor.prototype` are same. So, I using this

---
