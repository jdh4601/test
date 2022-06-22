const main = document.querySelector('.main');
const qna = document.querySelector('.qna');
const result = document.querySelector('.result');
const startBtn = document.querySelector('.startBtn');
const progressBar = document.querySelector('.progress-bar');
const countProgress = document.querySelector('.count_progress');

const endPoint = 10;
const select = [0,0,0,0];

function addAnswer(answerText, qIdx) {
  let a = document.querySelector('.aBox');
  let answer = document.createElement('button');
  // 속성값 지정
  answer.style.setProperty('border-radius', '3px');
  answer.style.setProperty('margin', '20px'); 
  a.classList.add('fadeIn');
  // 자식 노드로 상속
  a.appendChild(answer);
  answer.innerHTML = answerText;
  // 다음 페이지로 이동
  answer.addEventListener('click', () => {
    answer.setAttribute('id', 'fade-in-animation');
    const children = document.querySelectorAll('.answerList');
    // 모두 적용되게 함 -> 반복문
    for (let i = 0; i < children.length; i++) {
      // 버튼 비활성화
      children[i].disabled = true;
      // 사라짐 효과
      children[i].setAttribute('id', 'fade-out-animation');
    }
    setTimeout(() => {
      var target = qnaDataList[qIdx].a[qIdx].type;

      for (let j = 0; j < target.length; j++) {
        select[target[j]] += 1;
      }

      for (let i = 0; i < children.length; i++) {
        children[i].classList.add('hidden');
      }
      moveNext(++qIdx); // 다음 페이지로 이동
    }, 400);
  }
)}

function calResult() {
  var result = select.indexOf(Math.max(...select));
  // select: ???
  // select.indexOf() : select 안에서 특정 값의 인덱스를 리턴한다.
  return result;
}

function setResult() {
  let point = calResult();

  const resultIntro = document.querySelector('.result-intro');
  resultIntro.innerHTML = infoList[point].intro;

  const resultName = document.querySelector('.result-name');
  resultName.innerHTML = infoList[point].name;

  const resultDesc = document.querySelector('.result-desc');
  resultDesc.innerHTML = infoList[point].desc;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('.result-img');
  var imgURL = `img/image${point}.jpeg`;
  
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);
}

// 결과 페이지 출력
function moveResult() {
  qna.setAttribute('id', 'fade-out-animation');
  result.setAttribute('id', 'fade-in-animation');
  setTimeout(() => {
    qna.classList.add('hidden');
    result.classList.remove('hidden');
  }, 500);
  setResult(); // 결과 세팅
}


// 다음 페이지로 이동
function moveNext(qIdx) {
  // 결과 페이지로 이동
  if (qIdx == endPoint) {
    moveResult();
    return
  }
  const q = document.querySelector('.qBox');
  q.innerHTML = qnaDataList[qIdx].q;
  // 왜 반복문? -> 모든 data를 가져와야 함
  for (let i in qnaDataList) {
    addAnswer(qnaDataList[qIdx].a[i].answer, qIdx);
  }
  // 진행 상태
  countProgress.innerHTML = (qIdx+1) + "/" + endPoint;
  progressBar.style.width = (100 / endPoint) * (qIdx + 1) + '%';
}

// 시작 버튼 시 작업 처리
function start() {
  // main.style.WebkitAnimation = 'fadeOut 1s';
  // main.style.animation = 'fadeOut 1s';
  main.setAttribute('id', 'fade-out-animation');
  // qna.style.WebkitAnimation = 'fadeIn 1s';
  // qna.style.animation = 'fadeIn 1s';
  qna.setAttribute('id', 'fade-in-animation');
  setTimeout(() => {
    // main.style.display = 'none';
    // qna.style.display = 'block';
    main.classList.add('hidden'); // hidden클래스 추가 
    qna.classList.remove('hidden'); // hidden클래스 제거
  }, 400);
  let qIdx = 0;
  moveNext(qIdx);
}

startBtn.addEventListener('click', start);