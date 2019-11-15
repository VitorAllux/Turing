
function addLine(idTable) {
    var table = document.getElementById(idTable);
    var rowNumber = table.rows.length;
    var collNumber = table.rows[0].cells.length;
    var row = table.insertRow(rowNumber);
    var cell;
    for (var i = 0; i < collNumber; i++) {
        cell = row.insertCell(0);
        if (i == collNumber - 1) {
            cell.innerHTML = rowNumber + ' ' + ' ';
        }else{
            cell.setAttribute('contenteditable', 'true')
        }
    }
}

function addColl(idTable, inputId) {
    var input = document.getElementById(inputId)
    var tbl = document.getElementById(idTable),
        i;
    var cell; 
    var txt
    cell = undefined
    if (input.value == '') {
        alert('Informe o valor da coluna!')
    } else {
        for (i = 0; i < tbl.rows.length; i++) {           
            txt = ''
            if (i == 0) {
                txt = input.value;
                input.value = '';
            }
            cell = tbl.rows[i].insertCell(tbl.rows[i].cells.length)
            cell.setAttribute('contenteditable', 'true')
            addCells(cell, txt, 'col');
        }
    }
}

function addCells(cell, txt, style) {
    var div = document.createElement('div'),
        txt = document.createTextNode(txt);
    div.appendChild(txt);
    div.setAttribute('class', style);
    div.setAttribute('className', style);
    cell.appendChild(div);
}

function getText(inputId) {
    var input = document.getElementById(inputId);
    var value = input.value;
    input.value = null;
    return value;
}