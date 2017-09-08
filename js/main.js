class Student {
    constructor(name, id, national, klass, math = 0, chinese = 0, english = 0, code = 0) {
        this.name = name;
        this.id = id;
        this.national = national;
        this.klass = klass;
        this.math = math;
        this.chinese = chinese;
        this.english = english;
        this.code = code;
        this.total = (this.chinese + this.math + this.english + this.code).toFixed(2);
        this.ave = (this.total / 4).toFixed(2);
    }
}

function verifyInputs(input) {
    if (input.id < 0) {
        return 'error1';
    }
    if (input.klass < 0) {
        return 'error2';
    }
    if (input.math < 0 || input.math > 100) {
        return 'error3';
    }
    if (input.chinese < 0 || input.chinese > 100) {
        return 'error4';
    }
    if (input.english < 0 || input.english > 100) {
        return 'error5';
    }
    if (input.code < 0 || input.code > 100) {
        return 'error6';
    }
    return true;
}

function parseStuStorage(str) {
    
}

function add() {
    let temp = localStorage.getItem("students");
    let dataForm = document.getElementById('inputData');
    let stuData = new Student(dataForm.elements[0].value, dataForm.elements[1].value, dataForm.elements[2].value,
        dataForm.elements[3].value, parseFloat(dataForm.elements[4].value), parseFloat(dataForm.elements[5].value), parseFloat(dataForm.elements[6].value),
        parseFloat(dataForm.elements[7].value));
    if (!verifyInputs(stuData)) {
        alert('输入有误，请重新输入！');
    }
    if (!temp) {
        let students = [];
        students.push(stuData);
        localStorage.setItem("students", students.toString());
    } else {
        
    }
}

// function main() {
//     document.getElementById('storeStu').addEventListener('click',add);
// }

// main();