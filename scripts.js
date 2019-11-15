/*
function addColumn() {

    var i = 0

    document.getElementById('colunas').innerHTML = document.getElementById('colunas').innerHTML + '<th scope="col"  contenteditable="false">four</th>'
    var linhas = document.getElementById('linhas').childElementCount;
    for (i = 0; i < linhas; i++) {
        var eLinhas = document.getElementById('linhas')
        eLinhas.getElementById(i).innerHTML = eLinhas.getElementById(i).innerHTML + '<td></td>'
    }
}

function addRow() {
    var count = document.getElementById('linhas').childElementCount + 1

    document.getElementById('linhas').innerHTML = document.getElementById('linhas').innerHTML + '<tr id="' + count + '">' + ' <th scope="row" contenteditable="false" >' + count + '</th>' + document.getElementById('celulas').innerHTML + '</tr>'
}
*/
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
        }
    }
}

function addColl(idTable, inputId) {
    var input = document.getElementById(inputId)
    var tbl = document.getElementById(idTable),
        i;
    if (input.value == '') {
        alert('Informe o valor da coluna!')
    } else {
        for (i = 0; i < tbl.rows.length; i++) {
            var txt;

            if (i == 0) {
                txt = input.value;
                input.value = '';
            }
            addCells(tbl.rows[i].insertCell(tbl.rows[i].cells.length), txt, 'col');
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