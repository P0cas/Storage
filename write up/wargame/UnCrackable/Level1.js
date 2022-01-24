setImmediate(function(){
	Java.perform(function(){
		var system = Java.use("java.lang.System");
		system.exit.implementation = function(arg){
			console.log("\n[+] Not Exit!");
		}

		var cls = Java.use("sg.vantagepoint.a.a");
		cls.a.implementation = function(arg1, arg2){
			var string = this.a(arg1, arg2);  // byte[] type
			var str = "";
			for(var i = 0; i < string.length; i++){
				str += String.fromCharCode(string[i]);
			}
			console.log("\nFind Correct Value : " + str);
			return string;
		}
	})
})