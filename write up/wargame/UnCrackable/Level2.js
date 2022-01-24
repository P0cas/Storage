setImmediate(function(){
    Java.perform(function(){
        const cls = Java.use("sg.vantagepoint.uncrackable2.MainActivity$1");
        cls.onClick.implementation = function(){
            console.log("\n[*] Root Detected Bypass");
        }

        // native method hooking
        // strncmp addr leak
        const strncmp_addr = 0;
        const so = Module.enumerateImportsSync("libfoo.so")
        for(var i = 0; i < so.length; i++){
            if(so[i].name == 'strncmp'){strncmp_addr = so[i].address;console.log("[*] strncmp addr : " + strncmp_addr)}
        }
        // strncmp hooking
        Interceptor.attach(strncmp_addr, {
            // strncmp(args[0], args[1], args[2]);
            onEnter: function(args){              
                if(args[2] == 23){
                    console.log("[*] Secret Key : " + Memory.readCString(args[1]));
                }
            }
        });
    });
});