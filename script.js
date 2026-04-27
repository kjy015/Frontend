const toggleBtn = document.getElementById('toggleBtn');
const addFormSection = document.getElementById('addFormSection');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const cardContainer = document.getElementById('cardContainer');
const deleteBtn = document.getElementById('deleteBtn');

// 1. 개수를 갱신하는 함수 만들기
function updateCount() {
    // 1. 카드가 담기는 전체 상자를 가져옵니다.
    const container = document.getElementById('cardContainer');
    
    // 2. 그 상자 안에 들어있는 'card'라는 이름의 박스들을 모두 세어봅니다.
    // 만약 HTML에서 <div class="lion-card">라고 만드셨다면 여기도 'lion-card'로 바꿔야 해요!
    const totalCards = container.getElementsByClassName('card').length;
    
    // 3. 숫자를 화면에 찍어줍니다.
    const countElement = document.getElementById('memberCount');
    if (countElement) {
        countElement.innerText = totalCards;
    }
}

// 2. 추가 버튼 클릭 이벤트 마지막에 추가
addBtn.addEventListener('click', function() {
    // ... 기존 카드 추가 로직 ...
    
    cardContainer.appendChild(newCard); // 카드 추가 후
    updateCount();                      // 숫자 갱신!
});

// 3. 삭제 버튼 클릭 이벤트 마지막에 추가
deleteBtn.addEventListener('click', function() {
    const lastCard = cardContainer.lastElementChild;
    if (lastCard) {
        cardContainer.removeChild(lastCard); // 카드 삭제 후
        updateCount();                       // 숫자 갱신!
    }
});

// 4. 페이지 처음 로드될 때도 실행 (기존에 적힌 카드들 세기)
window.onload = function() {
    updateCount();
};

toggleBtn.addEventListener('click', function() {
    addFormSection.style.display = 'block'; // 폼 열기
});

// 추가하기 버튼 클릭 이벤트
addBtn.addEventListener('click', function() {
    // 1. 바뀐 ID로 각각의 값을 정확히 가져옵니다.
    const name = document.getElementById('nameInput').value;
    const part = document.getElementById('partInput').value;
    const intro = document.getElementById('shortInput').value; // '망했당' 같은 내용
    const emailValue = document.getElementById('emailInput').value;
    const urlValue = document.getElementById('webInput').value;

    // 빈 값 검사 (이름이 비어있으면 경고창 띄우기)
    if (name.trim() === '') {
        alert('이름을 입력해주세요!');
        return;
    }

    // 2. 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue !== "" && !emailRegex.test(emailValue)) {
        alert("올바른 이메일 형식이 아닙니다!");
        return; // 여기서 멈춰야 함
    }

    // 3. 웹사이트 유효성 검사 (http:// 또는 https:// 가 없어도 통과하게 하려면 아래 식 사용)
    const urlRegex = /^(https?:\/\/)?([\w\d\-_]+\.)+[\w\d\-_]+(\/.*)?$/;
    if (urlValue !== "" && !urlRegex.test(urlValue)) {
        alert("올바른 웹사이트 주소가 아닙니다!");
        return; // 여기서 멈춰야 함
    }

    // 2. 카드를 만듭니다. (백틱 `` 사용 주의!)
    const newCard = document.createElement('div');
    newCard.className = 'card';

    newCard.innerHTML = `
        <div class="card-image-placeholder"></div> <h1>${name}</h1>
        <p class="part"><b>${part}</b></p>
        <p>${intro}</p>
    `;

    // 임시 이미지 주소 (이미지 업로드 기능이 없다면 랜덤 이미지나 기본 이미지 사용)
    const defaultImg = "https://picsum.photos/300/150";

    // 3. 드디어 추가!
    cardContainer.appendChild(newCard);

    // 4. 완성된 카드를 컨테이너에 추가
    cardContainer.appendChild(newCard);

    // 5. 추가 후 입력창 초기화
    document.getElementById('nameInput').value = '';
    document.getElementById('shortInput').value = '';
});

// 삭제 버튼 클릭 이벤트
deleteBtn.addEventListener('click', function() {
  const cards = cardContainer.querySelectorAll('.card');
  if (cards.length > 0) {
    // 마지막 카드 요소를 제거
    cardContainer.removeChild(cards[cards.length - 1]);
  } else {
    alert('삭제할 카드가 없습니다.');
  }
});

cancelBtn.addEventListener('click', function() {
    // 1. 모든 입력창(input)과 선택창(select) 초기화
    // 폼 안에 있는 모든 input 요소를 찾아서 값을 비웁니다.
    const inputs = addFormSection.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = ''; 
    });

    // select 박스도 첫 번째 옵션으로 초기화
    const select = addFormSection.querySelector('select');
    if (select) {
        select.selectedIndex = 0;
    }

    // 2. 폼 섹션 숨기기
    // CSS에서 #addFormSection { display: none; } 처리가 되어 있다면 아래 코드로 닫힙니다.
    addFormSection.style.display = 'none';
    
    console.log("폼이 초기화되고 닫혔습니다.");
});