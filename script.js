'use strict';

const pwEl = document.getElementById('pw');
const copyEl = document.getElementById('copy');
const lenEl = document.getElementById('len');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');
const generateEl = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+=';

function getLowercase(){
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase(){
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber(){
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol(){
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function generatePassword(){
  const len = lenEl.value;

  let password = '';

  if (upperEl.checked) {
    password += getUppercase();
  }

  if (lowerEl.checked) {
    password += getLowercase();
  }

  if (numberEl.checked) {
    password += getNumber();
  }

  if (symbolEl.checked) {
    password += getSymbol();
  }
  // 이 블록에도 if 구문들을 넣어 준 이유는,
  // generateX()에서 완전 랜덤으로 돌리면 체크한 항목의 element가 아예 포함이 안되는 경우도 생김.
  // 이를 방지하고자 체크된 항목에 한해서는 적어도 1개씩의 element는 각각 포함될 수 있도록 하고,
  // for문에서 그렇게 포함된 element의 개수는 제외한 상태에서 반복문을 돌려야 하니
  // let i = password.length; 을 반복문 변수의 시작점으로 설정한거임. 

  for(let i = password.length; i < len; i++){
    const x = generateX();
    password += x;
  }

  pwEl.innerText = password;
}

function generateX(){
  const xs = [];

  if (upperEl.checked) {
    xs.push(getUppercase());
  }

  if (lowerEl.checked) {
    xs.push(getLowercase());
  }

  if (numberEl.checked) {
    xs.push(getNumber());
  }

  if (symbolEl.checked) {
    xs.push(getSymbol());
  }

  if (xs.length === 0) {
    return '';
  }

  return xs[Math.floor(Math.random() * xs.length)];
}

generateEl.addEventListener('click', generatePassword);
// addEventListener에서 미리 정의한 함수를 콜백으로 호출하려면 그냥 이름만 쓸 것.  
// parameter를 전달해야할 필요가 없는 함수라면 ()처럼 paramter가 들어갈 자리를 넣어서 호출하지 말 것.
// 그렇게 하면 콜백함수가 오작동될 가능성이 있다.

copyEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = pwEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);

  // The HTMLInputElement.select() method selects all the text in a <textarea> element 
  // or in an <input> element that includes a text field. -> Web API
  // 복사하기 전 마우스를 드래그해서 선택하는 것처럼 그 행위를 대신 해주는 명령어라고 보면 됨.
  textarea.select();

  /**
   * Document.execCommand()
   * HTML 문서가 designMode로 전환되면 문서에서 execCommand 메서드를 사용할 수 있게 되는데 
   * 이것을 이용해서 문서의 편집 가능한 영역을 변경할 수 있습니다.
   * 
   * 문법
   * bool = document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)
   * aCommandName: 실행해야할 명령어 이름 DOMString을 나타냅니다.
   * aShowDefaultUI: 기본 사용자 UI가 나타나야하는지를 보여주는 Boolean 값입니다. 
   * aValueArgument: 입력 변수가 필요한 명령어(insertImage와 같이 삽입할 이미지의 URL이 필요한)의 경우 이 DOMString으로 정보를 전달합니다.
   * 
   * 명령어 copy
   * 클립보드에 현재 선택 영역의 내용을 복사합니다.
   * 
   * 그니까 앞에서 select()로 선택한 textarea의 text(이게 위에서 말하고 있는 '현재 선택 영역'임.)를 클립보드에 복사한다는 거임.
   */
  document.execCommand('copy');

  textarea.remove(); // ChildNode.remove() 메소드는 이를 포함하는 트리로부터 객체를 제거합니다.
  alert("Password copied to clipboard");
});