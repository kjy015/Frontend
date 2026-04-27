const toggleBtn = document.getElementById('toggleBtn');
const addFormSection = document.getElementById('addFormSection');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const cardContainer = document.getElementById('cardContainer');
const deleteBtn = document.getElementById('deleteBtn');

// 개수 갱신 함수
function updateCount() {
    // 카드가 담기는 전체 상자 불러오기
    const container = document.getElementById('cardContainer');
    
    // 상자 안에 들어있는 'card'라는 이름의 박스들 모두 세기
    const totalCards = container.getElementsByClassName('card').length;
    
    // 숫자 화면에 찍기
    const countElement = document.getElementById('memberCount');
    if (countElement) {
        countElement.innerText = totalCards;
    }
}

// 페이지 처음 로드될 때 기존에 적힌 카드들 세기
window.onload = function() {
    updateCount();
};

// 폼 열기
toggleBtn.addEventListener('click', function() {
    addFormSection.style.display = 'block';
});

// 추가 버튼
addBtn.addEventListener('click', function() {
    const name = document.getElementById('nameInput').value;
    const part = document.getElementById('partInput').value;
    const skill = document.getElementById('skillInput').value;
    const intro = document.getElementById('shortInput').value;
    const explane = document.getElementById('longInput').value;
    const emailValue = document.getElementById('emailInput').value;
    const urlValue = document.getElementById('webInput').value;
    const phoneValue = document.getElementById('phoneInput').value;
    const last = document.getElementById('lastInput').value;

    // 빈 값 검사 (이름이 비어있으면 경고창 띄우기)
    if (name.trim() === '') {
        alert('이름을 입력해주세요!');
        return;
    }

    // 이메일 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue !== "" && !emailRegex.test(emailValue)) {
        alert("올바른 이메일 형식이 아닙니다!");
        return;
    }

    // 웹사이트 유효성 검사
    const urlRegex = /^(https?:\/\/)?([\w\d\-_]+\.)+[\w\d\-_]+(\/.*)?$/;
    if (urlValue !== "" && !urlRegex.test(urlValue)) {
        alert("올바른 웹사이트 주소가 아닙니다!");
        return;
    }

    // 요약 카드 제작
    const newCard = document.createElement('div');
    newCard.className = 'card';

    newCard.innerHTML = `
        <img src="https://picsum.photos/300/150" alt="프로필" width="100px" height="100px">
        <h1>${name}</h1>
        <p class="part"><b>${part}</b></p>
        <p>${intro}</p>
    `;

    // 상세 정보 제작
    const newInform = document.createElement('div');
    newInform.className = 'container';

    // 관심 기술을 쉼표로 분리해서 리스트로 만들기
    const skillList = skill.split(',').map(s => `<li>${s.trim()}</li>`).join('');

    newInform.innerHTML = `
        <h1>${name}</h1>
        <p class="part"><b>${part}</b></p>
        <p>멋쟁이사자처럼</p>
        <h3>자기소개</h3>
        <p>${explane}</p>
        <h3>관심 기술</h3>
        <ul>${skillList}</ul>
        <h3>연락처</h3>
        <ul>
            <li>이메일: <a href="mailto:${emailValue}">${emailValue}</a></li>
            <li>웹사이트(GitHub): <a href="${urlValue}" target="_blank">${urlValue}</a></li>
            <li>휴대전화: <a href="tel:${phoneValue}">${phoneValue}</a></li>
        </ul>
        <h2>각오 한 마디</h2>
        <p>${last}</p>
    `;

    // 완성된 카드를 컨테이너에 추가
    cardContainer.appendChild(newCard);

    // 완성된 상세 정보를 페이지 맨 마지막에 추가
    document.body.appendChild(newInform);

    // 추가 후 입력창 초기화
    document.getElementById('nameInput').value = '';
    document.getElementById('shortInput').value = '';
    
    updateCount();                      // 숫자 갱신!
});

// 취소 버튼
cancelBtn.addEventListener('click', function() {
    // 모든 입력창(input)과 선택창(select) 초기화
    // 폼 안에 있는 모든 input 요소를 찾아서 값을 비움
    const inputs = addFormSection.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = ''; 
    });

    // select 박스도 첫 번째 옵션으로 초기화
    const select = addFormSection.querySelector('select');
    if (select) {
        select.selectedIndex = 0;
    }

    // 폼 섹션 숨기기
    addFormSection.style.display = 'none';
    
    console.log("폼이 초기화되고 닫혔습니다.");
});

// 마지막 아기 사자 삭제
deleteBtn.addEventListener('click', function() {
    const lastCard = cardContainer.lastElementChild;
    if (lastCard) {
        cardContainer.removeChild(lastCard); // 카드 삭제 후
        updateCount();                       // 숫자 갱신!
    }
});