//ideia inicial - ter dois arrays, um para o espectro positivo mais a posicao zero, e outro o espctro negativo
// array:               |listRight ...
// pos  : -5 -4 -3 -2 -1|0 +1 +2 +3 +4 +5
// array:       listLeft|

var state
var pos

var listRight = [],
    listLeft = [];
var tableMatrix
var action;
action = undefined


async function start() {
    dropColl('tbl2')
    if (initiateArrays(getListSimbols())) {
        tableMatrix = getTableData()
        document.getElementById('states').innerHTML = "<h4>" + "Estados!" + "</h4>" + "\n"
        setPos(0)
        setState('1')
        if (document.getElementById('customCheck1').checked) {
            step(true)
            return
        }
        step(false)
    }

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function step(auto) {

    action = findAction(getActualState(), readSimbol(getActualPos()))
    if (auto) {
        while (action != 'STOP') {
            doAction(action)
            refreshRibbon(listLeft != undefined ? listLeft.concat(listRight) : listRight)
            action = findAction(getActualState(), readSimbol(getActualPos()))
            await sleep(200);
        }
        alert('Acabou!')
        return
    } else if (action != 'STOP') {
        doAction(action)
        refreshRibbon(listLeft != undefined ? listLeft.concat(listRight) : listRight)
        action = findAction(getActualState(), readSimbol(getActualPos()))
        return
    }
    alert('Acabou!')
}

function getListSimbols() {
    var value
    value = document.getElementById('input2').value
    //value = '>***_**'
    return value
}

function initiateArrays(value) {
    var index = value.indexOf('>');
    listRight = []
    listLeft = []
    if (index > -1) {
        if (index > 0) {
            listLeft = Array.from(value.substring(0, index))
        }
        listRight = Array.from(value.substring(index, value.length))
    } else {
        alert('Você precisa informar o simbolo inicial ">" ')
        return false
    }
    return true
}

function setState(value) {
    state = typeof (value) == 'string' ? value : Number.toString(value)
    var rows = document.getElementById('tbl').getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.backgroundColor = null
    }

    rows[state].style.backgroundColor = "#ffa"
    showState(state)
}

function getActualState() {
    return state
}

function setPos(value) {
    pos = typeof (value) == 'number' ? value : Number.parseInt(value)
}

function getActualPos() {
    return pos
}

function readSimbol(position) {
    var value = ''
    if (position < 0) {
        if (convertPos(position) > listLeft.length - 1) {
            return '_'
        }
    } else if (position > listRight.length - 1) {
        return '_'
    } else {
        return position < 0 ? listLeft[convertPos(position)] : listRight[position]
    }
}

function convertPos(position) {
    return (position * -1) - 1
}

//converte a posicao da fita, em uma posicao relativa a celula da tabela
function getRelativePos() {
    var position = 0

    if (pos < 0) {
        position = listLeft.length - convertPos(pos);
    } else {
        if (listLeft != undefined) {
            position += listLeft.length
        }
        if (listRight != undefined) {
            position += pos
        }
    }
    return position + 1
}

function doAction(value) {

    var action = []
    action = value
    setState(action[0])
    writeNewSimbol(getActualPos(), action[1])
    setPos(action[2] == 'D' ? getActualPos() + 1 : getActualPos() - 1)

}

function findAction(state, simbol) {

    var value = ''
    var action = []

    for (var i = 1; i <= tableMatrix[0].length; i++) {
        if (tableMatrix[0][i] == simbol) {
            value = tableMatrix[state][i]
            break
        }
    }

    if (value != 'STOP') {
        action = value.split(';', 3)
        if (validateAction(action)) {
            return action
        } else {
            alert('Erro na validação de uma ação. Estado: ' + state + ',' + 'Simbolo: ' + simbol + 'Ação encontrada: ' + value)
            return 'STOP'
        }
    } else {
        return 'STOP'
    }

}

function validateAction(value) {
    action = []
    action = value

    if (action.length == 3) {
        if (!isNaN(action[0])) {
            if ((action[1].length = 1) && (action[2].length = 1)) {
                if ((action[2] == 'D') || (action[2] == 'E')) {
                    return true
                }
            }
        }
    }
    return false

}

function writeNewSimbol(position, newSimbol) {
    if (position >= 0) {
        if (position > listRight.length - 1) {
            listRight.push(newSimbol)
        } else {
            listRight[position] = newSimbol
        }
    } else {
        var convertedPos = convertPos(position)
        if (convertedPos > listLeft.length - 1) {
            listLeft.push(newSimbol)
        } else {
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
 * cabeçote                      V
 * fita              _  _  _  _  >  A  A  _  B  C  _  A  _
 * pos:         ... -4 -3 -2 -1  0 +1 +2 +3 +4 +5 +6 +7 +8 ...
 * index arrays ...  3  2  1  0 |0  1  2  3  4  5  6  7  8 ...
 * Lists              listLeft      listRight
 */

function getTableData() {
    var table = document.getElementById('tbl');
    var rows = table.getElementsByTagName("tr");
    var colls = rows[0].getElementsByTagName("td");

    //percorre table
    var line
    var cells
    var matrix = []
    for (i = 0; i < rows.length; i++) {
        cells = rows[i].getElementsByTagName("td");
        line = []
        for (j = 0; j < cells.length; j++) {
            line.push(cells[j].innerText);
        }
        matrix.push(line)
    }
    return matrix
}