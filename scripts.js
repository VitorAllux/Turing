function refreshRibbon(value) {
    var rb = document.getElementById('tbl2');
    var rows = rb.getElementsByTagName('tr');
    var colls = rows[0].getElementsByTagName('td');
    var list = value;
    if (colls.length < list.length) {
        addColls('tbl2', list.length - colls.length)
    }
    for (i = 0; i < list.length; i++) {
        colls[i].innerText = list[i];
        colls[i].style.backgroundColor = "#FFFFFF";
    }
    focusOnCell(getRelativePos(), colls.length)
}

function focusOnCell(position, collsCount){

    if (collsCount > 25){
        var scrl = document.getElementById('fitaScrl')
        scrl.scrollLeft = (((collsCount/2) -15) * 36) + 10
        var step = 0
        if (position > collsCount/2){
            step = (position - (collsCount/2)) * 36
            scrl.scrollLeft += step
        } else if (position < collsCount / 2) {
            step = ((collsCount/2) - position) * 36
            scrl.scrollLeft -= step
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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
        } else {
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

function addColls(idTable, cells) {
    number = cells;
    var tbl = document.getElementById(idTable),
        i;
    var cell;
    var txt
    cell = undefined
    txt = ''
    for (i = 0; i < number; i++) {
        cell = tbl.rows[0].insertCell(tbl.rows[0].cells.length)
        cell.setAttribute('contenteditable', 'false')
        addCells(cell, txt, 'col');
    }
}