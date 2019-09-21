const frog = ()=>{
    // black console
    const backConsole = (()=>{
        let obj = {};
        for(let key in console){
            obj[key] = console[key];
        };
        return obj;
    })(),
    getStyle = (name,text) => {
        let colors = {
            green: [32,39],
            magenta: [35,39],
            gray: [90,39]
        },
        color = colors[name];
        return `\u001B[${color[0]}m${text}\u001B[${color[1]}m`;
    },
    getText = ()=>{
        try {
            throw new Error('');
        } catch (err) {
            let strErr = err.stack,
                strLineErr = strErr.split(/\r|\n/)[3],
                arrErrResult = strLineErr.match(/[^/|:|\\]{1,}/ig),
                temp = {};
            // backConsole.log(strLineErr)
            temp.colNum = +arrErrResult.pop();
            temp.lineNum = +arrErrResult.pop();
            temp.fileName = arrErrResult.pop();
            return /\\|\//ig.test(strLineErr) ? `🐸 ${getStyle('magenta',temp.fileName)}${getStyle('gray',':')}${getStyle('green',temp.lineNum)}` : undefined;
        };
    };
    
    // cover console
    for(let key in console){
        console[key] = function(){
            let content = getText(),
                isEcho = key !== 'time' && content;
            if(isEcho){
                backConsole['log'](content);
            };
            backConsole[key](...arguments);
            if(isEcho){
                backConsole['log']('\r\n');
            };
        };
    };
    
};

module.exports = frog;