// javaScript 练习代码

'use strict'

//类用{}key-value形式
var xiaoming = {
   name: 'xiaoming' ,
   birth: 1990 ,
   age: function(){
     var y = new Date().getFullYear();
     return y - this.birth;
   }
}

var fn = xiaoming.age;
fn();


function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}

function SubStudent(props){
  Student.call(this,props);
  this.grade = props.grade || 1;
}

function Fcn(){

}

Fcn.prototype = Student.prototype;
SubStudent.prototype = new Fcn();
SubStudent.prototype.constructor = SubStudent;

SubStudent.prototype.getGrade = function(){
  return this.grade;
}


class SomeClass {
  constructor(name) {
    this.name = name;
  }
}
class SubSomeClass extends SomeClass {
  constructor(name,number) {
    super(name);
    this.number = number;
  }
  getNumber(){
    return this.number;
  }
}

function requestSuccess(text){
  var textArea = document.getElementById('test-text');
  textArea.value = text;
}

function failWithCode(code){
  var textArea = document.getElementById('test-text');
  textArea.value = 'Error Code:' + code;
}

//AJAX 异步请求
var request = new XMLHttpRequest();
request.onreadstatechange = function() {
  if (request.readyState === 4) {
    if (request.status === 200) {
      return alert(request.responseText);
    }else {
      return alert(request.status);
    }
  }else {

  }
}
request.open('GET','http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice');
request.send();

//js操作表单
var fileInput = document.getElementById('test-iamge');
var infor = document.getElementById('test-infor');
var perview = document.getElementById('test-imageView');

fileInput.addEventListener('change'.function(){
  perview.style.backgroundImage = '';
  if (!fileInput.value) {
    infor.innerHTML = 'no file';
  }
  var file = fileInput.files[0];
  infor.innerHTML = 'file'+ file.name + '<br>' +
                    'size'+ file.size + '<br>' +
                    'modified' + file.lastModifiedDate;
  if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
    alert('error type');
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = e.target.result;
    perview.style.backgroundImage = 'url('+ data + ')';
  }
  reader.readAsDataURL(file);
})


function randomNumber(resolve,reject){
  var timeout = Math.random() * 2;
  console.log('set timeout to:'+timeout + 'seconds');
  setTimeout(function () {
    if (timeout < 1) {
      console.log('call resolve....');
      resolve('200 ok')
    }else {
      console.log('call reject...');
      reject('timeout in '+ timeout + 'seconds');
    }
  }, 1000 * timeout);
}

//Promise对象

var p1 = new Promise(randomNumber);
var p2 = p1.then(function (result){
  console.log('success: '+ result);
})
var p3 = p2.catch(function(reson){
  console.log('fail: '+ reson);
})

new Promise(randomNumber).then(function (result){
  console.log('success');
}).catch(function(reson){
  console.log('fail');
})

//ajax函数返回promise对象
function ajaxFn(method , url , data){
  var request = new XMLHttpRequest();
  return new Promise(function(resolve, reject){
    request.onreadstatechange = function(){
      if (request.readyState === 4){
         if (request.status === 200) {
           resolve(request.responseText);
         }else {
           reject(request.status);
         }
      }
    }
    request.open(method,url);
    request.send(data);
  });
}

//promise接受2个并行异步任务, all接受到所有返回后往下执行，race接到第一个返回就会往下执行，后面的结果抛弃
var task1 = new Promise(function(resolve,reject){
  setTimeout(resolve, 100, 'task1');
});

var task2 = new Promise(function(resolve,reject){
  setTimeout(resolve, 200, 'task2');
});

Promise.all([task1,task2]).then(function(results){
  console.log(results);
})

Promise.race([task1,task2]).then(function(result){
  console.log(result);
})


module.exports = javaScript;
