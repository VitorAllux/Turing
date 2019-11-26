function refreshRibbon(value) {

    var rb = document.getElementById('tbl2'),
        rows = rb.getElementsByTagName('tr'),
        colls = rows[0].getElementsByTagName('td'),
        list = value;
    focusOnCell(getRelativePos() - 1, colls.length)
    if (colls.length < list.length) {
        addColls('tbl2', list.length - colls.length)
    }
    colls = rows[0].getElementsByTagName('td');
    console.log(colls.length)

    for (i = 0; i < list.length; i++) {
        colls[i].innerText = list[i];
        colls[i].style.backgroundColor = null
    }

    highlightCell()
}

function highlightCell() {
    var rows = document.getElementById('tbl2').getElementsByTagName('tr'),
        colls = rows[0].getElementsByTagName('td');
    colls[getRelativePos() - 1].style.backgroundColor = "#ffa"
}

function showState(state) {
    var result = document.getElementById("states")
    result.innerHTML += "<p>" + "Estado " + "<img src='img/arrow.jpg' width=\'20px\' height=\'15px\'>" + state + "<p>" + "\n"
}

function focusOnCell(position, collsCount) {

    if (collsCount > 25) {
        var scrl = document.getElementById('fitaScrl')
        scrl.scrollLeft = (((collsCount / 2) - 15) * 36) + 10
        var step = 0
        if (position > collsCount / 2) {
            step = (position - (collsCount / 2)) * 36
            scrl.scrollLeft += step
        } else if (position < collsCount / 2) {
            step = ((collsCount / 2) - position) * 36
            scrl.scrollLeft -= step
        }
    }
}


function addLine(idTable) {
    var table = document.getElementById(idTable),
        rowNumber = table.rows.length,
        collNumber = table.rows[0].cells.length,
        row = table.insertRow(rowNumber),
        cell;
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
    var input = document.getElementById(inputId),
        tbl = document.getElementById(idTable),
        i,
        cell,
        txt
    cell = undefined,
        verify = true;

    if (input.value == '') {
        alert('Informe o valor da coluna!')
    } else {
        txt = input.value
        var rows = document.getElementById('tbl').getElementsByTagName('tr'),
            colls = rows[0].getElementsByTagName('td');
        for (i = 0; i < colls.length; i++) {
            if (txt == colls[i].innerText) {
                alert("Simbolo ja existente ou invalido!")
                input.value = ''
                return
            }
        }
        if (verify) {
            for (i = 0; i < tbl.rows.length; i++) {
                txt = input.value
                input.value = ''
                if (i == 0) {}
                cell = tbl.rows[i].insertCell(tbl.rows[i].cells.length)
                cell.setAttribute('contenteditable', 'true')
                addCells(cell, txt, 'col');
            }
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

function dropRow() {
    var table = document.getElementById('tbl'),
        row = table.rows.length - 1;

    if (row != 0) {
        tbl.deleteRow(row)
    }
}

function dropColl(idTable) {
    var table = document.getElementById(idTable),
        coll = table.rows[0].cells.length - 1,
        i;
    if (coll > 2 && idTable == 'tbl') {
        for (i = 0; i < table.rows.length; i++) {
            table.rows[i].deleteCell(coll);
        }
    } else if (coll > 0 && idTable == 'tbl2') {
        for (i = coll; i >= 0; i--) {
            table.rows[0].deleteCell(i);
        }
        addColls('tbl2', 1)
    }
}

function getText(inputId) {
    var input = document.getElementById(inputId),
        value = input.value;
    input.value = null;
    return value;
}

function addColls(idTable, cells) {
    number = cells;
    var tbl = document.getElementById(idTable),
        i,
        cell = undefined,
        txt = '';
    for (i = 0; i < number; i++) {
        cell = tbl.rows[0].insertCell(tbl.rows[0].cells.length)
        cell.setAttribute('contenteditable', 'false')
        addCells(cell, txt, 'col');
    }
}