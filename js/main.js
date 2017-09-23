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


function add() {
    let stuData = new Student($('#inputName').val(), $('#inputId').val(), $('#inputNational').val(),
        $('#inputKlass').val(), parseFloat($('#inputMath').val()), parseFloat($('#inputChinese').val()), parseFloat($('#inputEnglish').val()),
        parseFloat($('#inputCode').val()));
    if (verifyInputs(stuData) !== true) {
        alert('输入有误，请重新输入！');
    }
    if (localStorage.getItem("students") === null) {
        let students = [];
        students.push(stuData);
        localStorage.setItem("students", JSON.stringify(students));
        alert('添加成功');
    } else {
        let students = JSON.parse(localStorage.getItem('students'));
        localStorage.removeItem('students');
        students.push(stuData);
        localStorage.setItem("students", JSON.stringify(students));
        alert('添加成功');
    }
    console.log(localStorage.getItem("students"));
    window.location.reload();
}

function dataDisplay() {
    if (localStorage.getItem("students") === null) {
        // language=HTML
        $('#stuDataBody').append("<tr><td colspan='10' class='text-center' id ='zanwu'>暂无数据</td></tr>");
    } else {
        $('#stuDataBody tr').remove();
        let students = JSON.parse(localStorage.getItem('students'));
        students.map(function (obj) {
            let tr = $('#stuDataBody').append(document.createElement('tr'));
            tr.addClass('text-center');
            for(let i in obj){
                if(i !== 'national'){
                    let val = document.createElement('td');
                    val.innerText = obj[i];
                    tr.append(val);
                }
            }
            let del = document.createElement("td");
            del.innerHTML = "<button class='btn btn-warning'>"+"删除"+"</button>";
            tr.append(del);
        });


    }
}

function main() {
    dataDisplay();
    $('#storeStu').click(add);
}

main();