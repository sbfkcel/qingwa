const frog = ()=>{
    // black console
    const _console = (()=>{
        let obj = {};
        for(let key in console){
            obj[key] = console[key];
        };
        return obj;
    })(),
    getStyle = (name,text) => {
        let objColors = {
            green: [32,39],
            magenta: [35,39],
            gray: [90,39]
        },
        color = objColors[name];
        return `\u001B[${color[0]}m${text}\u001B[${color[1]}m`;
    },
    getText = ()=>{
        let err = new Error(),
            strErr = err.stack,
            strLineErr = strErr.split(/\r|\n/)[3],
            arrErrResult = strLineErr.match(/[^/|:|\\]{1,}/ig),
            temp = {};
        // _console.log(strLineErr)
        temp.colNum = +arrErrResult.pop();
        temp.lineNum = +arrErrResult.pop();
        temp.fileName = arrErrResult.slice(1).join('/');
        return /\\|\//ig.test(strLineErr) ? `🐸 ${getStyle('magenta',temp.fileName)}${getStyle('gray',':')}${getStyle('green',temp.lineNum)}` : undefined;
    };
    
    // cover console
    for(let key in console){
        console[key] = function(){
            let content = getText(),
                isEcho = key !== 'time' && content;
            if(isEcho){
                _console['log'](content);
            };
            _console[key](...arguments);
            if(isEcho){
                _console['log']('');
            };
        };
    };
    
};

module.exports = frog;