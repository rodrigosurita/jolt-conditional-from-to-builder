function addRule() {

    var tbodyRef = document.getElementById('rules_table').getElementsByTagName('tbody')[0];

    var newRow = tbodyRef.insertRow();

    var newCell = newRow.insertCell();
    let div = document.createElement('div');
    div.classList.value = 'input-field m-0';
    let input = document.createElement('input');
    input.classList.value = 'rule_from';
    div.appendChild(input);
    newCell.appendChild(div);

    var newCell2 = newRow.insertCell();
    div = document.createElement('div');
    div.classList.value = 'input-field m-0';
    input = document.createElement('input');
    input.classList.value = 'rule_to';
    div.appendChild(input);
    newCell2.appendChild(div);

    newRow.classList.value = 'td-delete';
    var newCell3 = newRow.insertCell();
    let a = document.createElement('a');
    a.classList.value = 'waves-effect waves-light btn red darken-2';
    a.innerHTML = "Delete";
    a.setAttribute('onclick', 'removeRule(this)');
    newCell3.appendChild(a);

}

function removeRule(element) {
    table = element.parentElement.parentElement.parentElement;
    let row = element.parentElement.parentElement;
    table.removeChild(row);
}

function createJolt() {

    let table = document.getElementById('rules_table')
    let from_values = [].slice.call(table.getElementsByClassName('rule_from'));
    let to_values = [].slice.call(table.getElementsByClassName('rule_to'));
    let from_field = document.getElementById('checked_field').value;
    let to_field = document.getElementById('result_field').value;

    if (!from_field || !to_field) {
        alert('You need to specify the field to be checked and the result field.')
        return;
    }

    from_values.forEach(function (_part, index) {
        this[index] = this[index].value;
    }, from_values);

    to_values.forEach(function (_part, index) {
        this[index] = this[index].value;
    }, to_values);

    var joltSpec = `[{
        "operation": "shift",
        "spec": {
            "${from_field}": {`;

    from_values.forEach((from_value, i) => {
        
        if(i == from_values.length - 1){
            joltSpec += `"${from_value}": {"#${to_values[i]}": "${to_field}"}`
        } else {
            joltSpec += `"${from_value}": {"#${to_values[i]}": "${to_field}"},`
        }

    });

    joltSpec += `}}}]`;

    let modal = document.getElementById('result_modal');
    modal.innerHTML = JSON.stringify(JSON.parse(joltSpec));
    M.Modal.getInstance(document.getElementById('modal1')).open();

}

$(document).ready(function () {
    $('#add_rule_btn').on('click', addRule);
    $('#transform_btn').on('click', createJolt);
    $('.modal').modal();
});