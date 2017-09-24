let StuID = "";

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

function clazzAver(arr) {
    let sum = 0;
    for (let item of arr) {
        sum += parseFloat(item.total);
    }
    let res = sum / arr.length;
    return res.toFixed(2);
}

function clazzMedian(arr) {
    let total = [];
    let res = 0;
    for (let item of arr) {
        total.push(parseFloat(item.total));
    }
    total.sort((a, b) => a - b);
    if (total.length % 2 === 0) {
        res = (total[total.length / 2] + total[total.length / 2 - 1]) / 2;
    } else {
        res = total[Math.floor(total.length / 2)];
    }
    return res.toFixed(2);
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

function dataDisplay(aver, median) {
    if (localStorage.getItem("students") === null) {
        // language=HTML
        $('#stuDataBody').append("<tr><td colspan='10' class='text-center' id ='zanwu'>暂无数据</td></tr>");
        $('#Aver').after("<td colspan='2' class='text-center'>暂无数据</td>");
        $('#Median').after("<td colspan='2' class='text-center'>暂无数据</td>");
    } else {
        $('#stuDataBody tr').remove();
        let students = JSON.parse(localStorage.getItem('students'));
        students.map(function (obj, index) {
            $('#stuDataBody').append("<tr></tr>").addClass('text-center');
            let tr = $('#stuDataBody > tr')[index];
            for (let i in obj) {
                if (i !== 'national') {
                    let val = document.createElement('td');
                    val.innerText = obj[i];
                    tr.append(val);
                }
            }
            let modify = document.createElement("td");
            modify.innerHTML = "<button class='btn btn-warning tableButton' data-target='#modifyData' data-toggle='modal'>" + "修改" + "</button>" + "<button class='btn btn-danger'>" + "删除" + "</button>";
            tr.append(modify);
        });
        $('#Aver').after("<td colspan='2' class='text-center'>" + aver + "</td>");
        $('#Median').after("<td colspan='2' class='text-center'>" + median + "</td>");
    }
}

function modifyDataDisplay(tar) {
    let students = JSON.parse(localStorage.getItem('students'));
    let tarID = tar.parentElement.parentElement.children[1].innerText;
    StuID = tarID;
    let modifyNo = 0;
    students.forEach(function (obj, index) {
        if (obj.id === tarID) {
            modifyNo = index;
            $('#modifyName').val(obj.name);
            $('#modifyId').val(obj.id);
            $('#modifyNational').val(obj.national);
            $('#modifyKlass').val(obj.klass);
            $('#modifyMath').val(obj.math);
            $('#modifyChinese').val(obj.chinese);
            $('#modifyEnglish').val(obj.english);
            $('#modifyCode').val(obj.code);
        }
    });
}

function modify() {
    let students = JSON.parse(localStorage.getItem('students'));
    let tarID = StuID;
    let modifyNo = 0;
    students.forEach(function (obj, index) {
        if (obj.id === tarID) {
            modifyNo = index;
        }
    });
    localStorage.removeItem('students');
    let newStudent = new Student($('#modifyName').val(), $('#modifyId').val(), $('#modifyNational').val(),
        $('#modifyKlass').val(), parseFloat($('#modifyMath').val()), parseFloat($('#modifyChinese').val()), parseFloat($('#modifyEnglish').val()),
        parseFloat($('#modifyCode').val()));
    if (verifyInputs(newStudent) !== true) {
        alert('输入有误，请重新输入！');
    }
    students[modifyNo] = newStudent;
    localStorage.setItem("students", JSON.stringify(students));
    window.location.reload();
}

function delData(tar) {
    let students = JSON.parse(localStorage.getItem('students'));
    let tarID = tar.parentElement.parentElement.children[1].innerText;
    let message = confirm('警告：确定要删除学号为' + tarID + '的同学的数据吗？');
    if (message) {
        localStorage.removeItem('students');
        let delNo = 0;
        students.forEach(function (obj, index) {
            if (obj.id === tarID) {
                delNo = index;
            }
        });
        students.splice(delNo, 1);
        if (students.length === 0) {
            localStorage.clear();
        } else {
            localStorage.setItem("students", JSON.stringify(students));
        }
        window.location.reload();
    }
}

function main() {
    let median = 0;
    let aver = 0;
    if (JSON.parse(localStorage.getItem('students'))) {
        median = clazzMedian(JSON.parse(localStorage.getItem('students')));
        aver = clazzAver(JSON.parse(localStorage.getItem('students')));
    }
    dataDisplay(aver, median);
    $('#storeStu').click(add);
    $('#stuDataBody').on("click", function (event) {
        if (event.target && event.target.nodeName === "BUTTON" && event.target.className === "btn btn-danger") {
            delData(event.target);
        }
    });
    $('#stuDataBody').on("click", function (event) {
        if (event.target && event.target.nodeName === "BUTTON" && event.target.className === "btn btn-warning tableButton") {
            modifyDataDisplay(event.target);
        }
    });
    $('#modifyStu').click(modify);
}

main();