//ideia inicial - ter dois arrays, um para o espectro positivo mais a posicao zero, e outro o espctro negativo
// array:               |listRight ...
// pos  : -5 -4 -3 -2 -1|0 +1 +2 +3 +4 +5
// array:       listLeft|

var state
var pos

var originalList
var listRight = [], listLeft = [];


function start(){    
    initiateArrays(getListSimbols)
    var action; action = undefined
    setPos(0)
    setState(1)
    while(action != 'STOP'){
        if (action != undefined){
            doAction(action)
        }

        action = findAction(getActualState(), readSimbol(getActualPos))
    }
}

function getListSimbols(){
    var value
    //TODO: pegar string contendo os dados iniciais da fita do inicio ao fim
    originalList = value
    return value
}


function initiateArrays(value){
    var values = []
    listRight = undefined
    listLeft = undefined
    values = Array.from(value)    
    //o programa sempre inicia com o simbolo inicial (>) na posicao zero
    if(values[0] != '>'){
        alert('Voce precisa iniciar com o simbolo inicial imbecil!')
    }else{
        listRight = values
    }
}

function setState(value){    
    state = typeof(value)=='string' ? value : Number.toString(value)
}

function getActualState(){
    return state
}

function setPos(value){
    pos = typeof(value)== 'number' ? value : Number.parseInt(value)
}

function getActualPos(){
    return pos
}

function readSimbol(position){
    var value
    value = position < 0 ? listLeft[convertPos(position)] : listRight[position]
    return value
}

function convertPos(position){
    return (position * -1) - 1
}

function doAction(value){
    var action = []
    action = value
    setState(action[0])
    writeNewSimbol(getActualPos, action[1])
    setPos(action[2] == 'D' ? getActualPos + 1 : getActualPos - 1)

}

function findAction(state, simbol){
    var value = ''
    var action = []
    //TODO: setar value com a string encontrada na tabela usando os parametros
    if(value.toUpperCase != 'STOP'){
        action = value.split(';', 3)
        if(validateAction(action)){
            return action
        }else{
            alert('Erro na validação de uma ação. Estado: $state Simbolo: $simbol Ação encontrada: $value ')
            return 'STOP'
        }
    }else{
        return 'STOP'
    }
    
}

function validateAction(value){
    action = []

    if(action.lenght == 3){
        if(Number.isInteger(action[0])){
            if ((action[1].lenght = 1) && (action[2].lenght = 1)){
                if(["D", "E"].includes(action[2].toUpperCase)){
                    return true
                }
            }
        }
    }
    return false

}

function writeNewSimbol(position, newSimbol){
    if (position >= 0){
        if(position > listRight.lenght){
            listRight.push(NewSimbol)
        }else{
            listRight[position] = newSimbol
        }
    }else{
        var convertedPos = convertPos(position)
        if(convertedPos > listLeft.lenght){
            listLeft.push(newSimbol)
        }else{
            listLeft[convertedPos] = newSimbol
        }
    }
        
}

/**  tabela de acoes:
 * 
 *   # |   >   |   A   |   B   |   C   |
 *   1 | 1 a D | 1 a D | 1 a D | 1 a D |
 *   2 | 1 a D | 1 a D | 1 a D | 1 a D |
 *   3 | 1 a D | 1 a D | 1 a D | 1 a D |
 *   4 | 1 a D | 1 a D | 1 a D | 1 a D |
 * 
 *  fita:
 *                               V
 *                   _  _  _  _  >  A  A  _  B  C  _  A  _
 * pos:         ... -4 -3 -2 -1  0 +1 +2 +3 +4 +5 +6 +7 +8 ...
 * index arrays ...  3  2  1  0 |0  1  2  3  4  5  6  7  8 ...
 *                   listLeft      listRight
 */


