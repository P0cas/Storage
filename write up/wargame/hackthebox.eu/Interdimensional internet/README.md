# Source Code

```python
from flask import Flask, Response, session, render_template
import functools, random, string, os, re

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'tlci0GhK8n5A18K1GTx6KPwfYjuuftWw')

def calc(recipe):
    global garage
    builtins, garage = {'__builtins__': None}, {}
    try: exec(recipe, builtins, garage)
    except: pass

def GFW(func): # Great Firewall of the observable universe and it's infinite timelines
    @functools.wraps(func)
    def federation(*args, **kwargs):
        ingredient = session.get('ingredient', None)
        measurements = session.get('measurements', None)

        recipe = '%s = %s' % (ingredient, measurements)
        if ingredient and measurements and len(recipe) >= 20:
            regex = re.compile('|'.join(map(re.escape, ['[', '(', '_', '.'])))
            matches = regex.findall(recipe)
            
            if matches: 
                return render_template('index.html', blacklisted='Morty you dumbass: ' + ', '.join(set(matches)))
            
            if len(recipe) > 300: 
                return func(*args, **kwargs) # ionic defibulizer can't handle more bytes than that
            
            calc(recipe)
            # return render_template('index.html', calculations=garage[ingredient])
            return func(*args, **kwargs) # rick deterrent

        ingredient = session['ingredient'] = ''.join(random.choice(string.lowercase) for _ in xrange(10))
        measurements = session['measurements'] = ''.join(map(str, [random.randint(1, 69), random.choice(['+', '-', '*']), random.randint(1,69)]))

        calc('%s = %s' % (ingredient, measurements))
        return render_template('index.html', calculations=garage[ingredient])
    return federation

@app.route('/')
@GFW
def index():
    return render_template('index.html')
 
@app.route('/debug')
def debug():
    return Response(open(__file__).read(), mimetype='text/plain')

if __name__ == '__main__':
    app.run('0.0.0.0', port=1337)
```
After modified a jwt , attack rce using the exec()

---
# First Trying

> Poc Code


Reference : https://stackoverflow.com/questions/59482234/is-an-execstring-builtins-none-a-secure-way-to-execute-user-inpu<br>
Original Payload : s = `"[c for c in ().__class__.__base__.__subclasses__() if c.__name__ == 'catch_warnings'][0]()._module.__builtins__['__import__']"`

I change original payload to hex, occur error. So I'll resolve the next line and run exec().<br>
So, the next line is displayed and the exec is newly executed, and the imported one using the `__builtins__` object is put into a variable called add, and the exec is executed in the same way as add('os').system(ls), and an error occurs. Did.<br>
And I tried to make a jwt using the flask-unsign -c, But I saw using the flask_unsign module and use the  module<br>
I'm succeed as above. But, I tried `Blind Command Injection` because the res does not include a return value about exec() function. Ha... This also failed..

---
# Second Trying

![](https://github.com/wjddnjs33/exploit-code/blob/main/wargame/hackthebox.eu/Interdimensional%20internet/images/oh.png?raw=true)

I think should brute forcing using the as above`Time Based Injection`.

Fuck, first I used if statement but It doesn't work usint compare a value for os.listdir()

---
# Third Trying

![](https://github.com/wjddnjs33/exploit-code/blob/main/wargame/hackthebox.eu/Interdimensional%20internet/images/ha.....png?raw=true)

Everyone~ let's look at the photo above :)

When I wake up and try again, the my poc code works well zzz. Maybe, yesterday was not execute because of a code miss fucking :( zz


 Solved after 3 hours :) gg

---
