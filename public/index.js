window.onerror = (...err) => {
    alert(err);
};

class Terminal {
    constructor(prefix){
        this.prefix = prefix;
        this.commands = this.commands ? this.commands : new Map();
    }
    start(){
        document.getElementById('prefix').innerHTML = this.prefix;
        this.clear();
        document.getElementById('log').addEventListener('focus', (e) => {
            e.preventDefault();
            document.getElementById('terminalInput').focus();
        });
        document.getElementById('prefix').addEventListener('focus', (e) => {
            e.preventDefault();
            document.getElementById('terminalInput').focus();
        });
        return this;
    }
    log(content){
        document.getElementById("log").innerHTML += content + '\n';
        return this;
    }
    clear(){
        document.getElementById("log").innerHTML = '';
        return this;
    }
    enabled(bool = true){
        window.terminalEnabled = bool;
        return this;
    }
    onCommandUsed(callback){
        window.onCommandUsedCallback = callback;
        document.getElementById("terminalInput").addEventListener('keydown', (key) => {
            if(key.keyCode === 13){
                window.onCommandUsedCallback(document.getElementById("terminalInput").value);
                document.getElementById("terminalInput").value = '';
            }
        });
        return this;
    }
    addCommand(command = {cmd: '', callback: function(){}}){
        this.commands.set(command.cmd, command.callback);
        return this;
    }
    getCommand(command){
        return command.split(' ')[0];
    }
    getArgs(command){
        var args = command.split(' ');
        args.shift();
        return args;
    }
    getInput(){
        return document.getElementById('terminalInput');
    }
    runCommand(commandName, args){
        if(!this.commands.has(commandName)) return false;
        this.commands.get(commandName)(commandName, args);
    }
}
