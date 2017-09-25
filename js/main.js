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

function uniqueId(input){
    let students = JSON.parse(localStorage.getItem('students'));
    for(let item of students){
        if(item.id===input.id){
            return false;
        }
    }
    return true;
}

function verifyInputs(input) {
    let errId = [];
    if (input.name.length === 0) {
        errId.push($('#inputName'));
        errId.push($('#modifyName'));
    }
    if (input.id < 0 || input.id.length === 0 || uniqueId(input)===false) {
        errId.push($('#inputId'));
        errId.push($('#modifyId'));
    }
    if (input.klass < 0 || input.klass.length === 0) {
        errId.push($('#inputKlass'));
        errId.push($('#modifyKlass'));
    }
    if (input.math < 0 || input.math > 100 || isNaN(input.math)) {
        errId.push($('#inputMath'));
        errId.push($('#modifyMath'));
    }
    if (input.chinese < 0 || input.chinese > 100 || isNaN(input.chinese)) {
        errId.push($('#inputChinese'));
        errId.push($('#modifyChinese'));
    }
    if (input.english < 0 || input.english > 100 || isNaN(input.english)) {
        errId.push($('#inputEnglish'));
        errId.push($('#modifyEnglish'));
    }
    if (input.code < 0 || input.code > 100 || isNaN(input.code)) {
        errId.push($('#inputCode'));
        errId.push($('#modifyCode'));
    }
    if (errId.length === 0) {
        return true;
    }
    return errId;
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

function dealErr(arr) {
    alert('输入有误，请重新输入！');
    arr.forEach(function (item) {
        item.css('background-color', 'rgba(217,83,79,0.8)');
        item.blur(function () {
            item.css('background-color', 'white');
        });
    });
}

function add() {
    let stuData = new Student($('#inputName').val(), $('#inputId').val(), $('#inputNational').val(),
        $('#inputKlass').val(), parseFloat($('#inputMath').val()), parseFloat($('#inputChinese').val()), parseFloat($('#inputEnglish').val()),
        parseFloat($('#inputCode').val()));
    let verifyId = verifyInputs(stuData);
    if (verifyId !== true) {
        dealErr(verifyId);
        return;
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
        $('#stuDataBody').append("<tr><td colspan='10' class='text-center'>暂无数据</td></tr>");
        $('#Aver').after("<td colspan='2' class='text-center'>暂无数据</td>");
        $('#Median').after("<td colspan='2' class='text-center'>暂无数据</td>");
    } else {
        $('#stuDataBody tr').remove();
        tableDisplay(JSON.parse(localStorage.getItem('students')));
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
        dealErr(verifyInputs(newStudent));
        return;
    }
    students[modifyNo] = newStudent;
    localStorage.setItem("students", JSON.stringify(students));
    window.location.reload();
}

function delData(tar) {
    let students = JSON.parse(localStorage.getItem('students'));
    let tarID = tar.parentElement.parentElement.children[1].innerText;
    let message = confirm('警告：确定要删除 ' + tar.parentElement.parentElement.children[0].innerText + tarID +' 同学的数据吗？');
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

function verifyId(str) {
    const reg1 = /([0-9]\d*,)*[0-9]\d*$/;
    const reg2 = /[0-9]\d*/;
    if (reg1.test(str) || reg2.test(str)) {
        return true
    } else {
        alert('您的输入不正确，请重新输入！');
        $('#inputStuId').val('');
    }
}

function tableDisplay(dataArr) {
    dataArr.map(function (obj, index) {
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
}

function queryData() {
    let stuStr = $('#inputStuId').val();
    if (verifyId(stuStr)) {
        let arr = stuStr.split(',');
        let students = JSON.parse(localStorage.getItem('students'));
        let queryStudents = [];
        for (let obj of students) {
            for (let value of arr) {
                if (obj.id === value) {
                    queryStudents.push(obj);
                }
            }
        }
        $('#stuDataBody tr').remove();
        if ($('#queryRes')) {
            $('#queryRes').remove();
            $('#queryBack').remove();
        }
        if (queryStudents.length === 0) {
            $('#stuDataBody').before("<tbody><td colspan='10' class='text-center' id='queryRes'>没有找到任何学生！</td></tbody>");
        } else {
            $('#stuDataBody').before("<tbody><td colspan='10' class='text-center' id='queryRes'>以下为查询结果</td></tbody>");
        }
        tableDisplay(queryStudents);
        $('#stuDataBody').after("<tbody><td colspan='10' class='text-center' id='queryBack'><button class='btn btn-info' id ='backBtn' onclick='window.location.reload()'>返回显示所有数据</button></td></tbody>");
        $('#queryData').modal('hide');
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
    $('#queryId').click(queryData);
    $('#inputStuId').keydown(function (event) {
        if(event && event.keyCode === 13){
            queryData();
        }
    });
    return ;
}

main();