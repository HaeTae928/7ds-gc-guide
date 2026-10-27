document.addEventListener('DOMContentLoaded', function() {
  
  // 1. 상단 메뉴 관련 요소
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  const logoBtn = document.getElementById('logo-btn');

  function showSection(targetId) {
    sections.forEach(section => section.classList.add('hidden'));

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.remove('hidden');
    }

    navButtons.forEach(btn => {
      if (btn.getAttribute('data-target') === targetId) {
        btn.classList.add('text-amber-400', 'border-b-2', 'border-amber-400');
        btn.classList.remove('text-slate-300');
      } else {
        btn.classList.remove('text-amber-400', 'border-b-2', 'border-amber-400');
        btn.classList.add('text-slate-300');
      }
    });
  }

  navButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      showSection(this.getAttribute('data-target'));
    });
  });

  if (logoBtn) {
    logoBtn.addEventListener('click', function() {
      showSection('pickup-section');
    });
  }

  // 2. 주간 픽업 데이터 관리 (매주 새로운 픽업이 나오면 배열의 맨 위에 추가하시면 됩니다)
  const weeklyPickupData = [
    {
      id: "latest",
      title: "🔥 이번 주 픽업 (최신)",
      imgSrc: "pickup.png",
      note: "현재 진행 중인 이번 주 추천 영웅 픽업표입니다."
    },
    /*
    // 예시: 지나간 주차 데이터를 보관하고 싶을 때 아래처럼 추가하면 됩니다.
    {
      id: "oct_w4",
      title: "10월 4주차 픽업",
      imgSrc: "pickup_oct_w4.png",
      note: "10월 4주차 추천 영웅 픽업 기록입니다."
    }
    */
  ];

  const weeklyTabContainer = document.getElementById('weekly-tab-container');
  const weeklyPickupContent = document.getElementById('weekly-pickup-content');

  function renderWeeklyPickup(pickupId) {
    const data = weeklyPickupData.find(item => item.id === pickupId) || weeklyPickupData[0];
    if (!data) return;

    weeklyPickupContent.innerHTML = `
      <p class="text-sm text-slate-300 mb-3 font-semibold"><i class="fa-solid fa-bell text-amber-400"></i> ${data.note}</p>
      <div class="flex justify-center w-full">
        <img src="${data.imgSrc}" alt="${data.title}" class="max-w-full h-auto rounded-lg border border-slate-700 shadow-lg" onerror="this.alt='이미지를 찾을 수 없습니다: ${data.imgSrc}'">
      </div>
    `;

    // 탭 버튼 스타일 업데이트
    const buttons = weeklyTabContainer.querySelectorAll('button');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-id') === data.id) {
        btn.className = "bg-amber-500 text-slate-950 px-3 py-1 rounded-md text-xs font-bold";
      } else {
        btn.className = "bg-slate-700 text-slate-300 px-3 py-1 rounded-md text-xs font-semibold hover:bg-slate-600";
      }
    });
  }

  function initWeeklyTabs() {
    if (!weeklyTabContainer) return;
    weeklyTabContainer.innerHTML = '';
    
    weeklyPickupData.forEach((item, index) => {
      const btn = document.createElement('button');
      btn.setAttribute('data-id', item.id);
      btn.textContent = item.title;
      btn.addEventListener('click', () => renderWeeklyPickup(item.id));
      weeklyTabContainer.appendChild(btn);
    });

    if (weeklyPickupData.length > 0) {
      renderWeeklyPickup(weeklyPickupData[0].id);
    }
  }

  initWeeklyTabs();


  // 3. 마수전 6종 데이터
  const beastData = {
    hresvelgr: {
      name: "🦅 흐레스벨그 마수전",
      imgSrc: "흐레스벨그.png",
      stages: ["1층: 마수", "2층: 대마수", "3층: 초마수", "4층: 초월마수"],
      recommendDeck: "토르 / 메겔다 / UR 멜리오다스 / 얼티밋 이스탈린 / 다이앤",
      summary: `[기본 설정 및 특성]
• 악연 효과: 파티에 토르 편성 시 토르 치명 피해 30% 증가, 아군 영웅 기본 능력치 10% 증가
• 마수 특징: 디버프 면역 / 아군의 생명력을 제외한 생명 관련 능력 40% 감소

[1층 (마수)]
• 3페이즈: 마수 50% 브레이크
• 4페이즈: 마수 50% 브레이크, 방어력 및 인내율 크게 증가

[2층 (대마수)]
• 1페이즈: 마수 50% 브레이크
• 2페이즈: 매 턴 강력한 전체기 사용(도발 중인 아군 존재 시 회피), 사망 시 방어력 100% 체력으로 부활

[3층 (초마수)]
• 1~2페이즈: 마수 50% 브레이크
• 3페이즈: 마수 35% 브레이크, 매 적군 턴마다 아군 스킬 타입 봉쇄 (자세 > 디버프 > 버프 > 공격 > 필살기)
• 4페이즈: 마수 35% 브레이크, 2턴마다 아군 공격력 40% 감소 & 공격스킬만 사용 가능 디버프 부여

[4층 (초월마수)]
• 1페이즈: 마수 20% 브레이크, 아군 디버프 1개당 마수 방어력 50% 증가
• 2페이즈: 마수 20% 브레이크, 랭크 2 이상 동일 랭크 스킬 3장 사용 시 [흐레스벨그의 가호] 부여 (가호 보유 시 주피 300% 증가 및 회복 불가 패턴 빗나감)
• 3페이즈: 마수 25% 브레이크, 불사가 8개 부여 (뇌격/낙뢰/증폭/강격 피격 시 1개 해제, 쇄도 피격 시 1개 증가), 치명타 미발생 시 마수 주피증 / 발생 시 2개 해제, 스킬 타입 순차 봉쇄
• 4페이즈: 마수 25% 브레이크, 치명타 여부에 따라 마수 주피증/해제, 마수 남은 체력 구간별 능력치 증가 & [흐레스벨그의 분노] 디버프 부여 (7개 중첩 시 500,000 피해)`
    },
    eikthyrnir: {
      name: "🦌 에이크쉬르니르 마수전",
      imgSrc: "에이크쉬르니르.png",
      stages: ["1층: 마수", "2층: 대마수", "3층: 초마수", "4층: 초월마수"],
      recommendDeck: "요르문간드 / 프레이 / 빛엘리 / 다이앤",
      summary: `[기본 설정 및 특성]
• 악연 효과: 파티에 요르문간드 편성 시 요르문간드 모든 능력치 10% 증가, 아군 영웅 기본 능력치 10% 증가
• 마수 특징: 디버프 및 반사 피해 면역 / 회피 무시 / 1~3층 아군 생명 제외 생명 관련 능력 40% 감소
• 속성 사이클: {근➔체➔속} or {체➔속➔근} or {속➔근➔체} 순 스킬 사용 (마수 자세 시 사이클 성공하면 자세 해제)
• 피해 고정: 피해 고정 적용 시 모든 피해를 1로 받음

[1층 (마수)]
• 2페이즈: 속성 사이클 실패 시 아군 공격력 50% 감소
• 3페이즈: 마수 25% 브레이크
• 4페이즈: 마수 35% 브레이크, 사이클 실패 시 공격력 50% 감소, 짝수 턴 반격 자세 (보호막 보유 아군 피격 시 빗나감)

[2층 (대마수)] - 전체 마수 30% 브레이크
• 2페이즈: 받피감 50% (사이클 성공 시 해제 / 실패 시 해당 아군 빙결), 매 턴 버프/자세 해제 단일기, 2턴마다 공 10,000% 전체기 (빙결 아군 존재 시 빗나감)
• 3페이즈: 3턴마다 스킬 삭제 공격 및 마수 기본 능력치 40% 증가
• 4페이즈: 받피감 50% (사이클 성공 시 해제 / 실패 시 빙결), 3턴마다 반격 자세 (보호막 아군 피격 시 빗나감)

[3층 (초마수)] - 전체 마수 30% 브레이크
• 1페이즈: 감전 걸린 아군 대상 마수 주피 35% 증가
• 2페이즈: 사이클 실패 시 15% 부식, 2턴마다 특정 속성 공격 받피증 500%
• 3페이즈: 짝수 턴 전체 증폭기, 3턴마다 마수 기능증 50%
• 4페이즈: 피해 고정 (사이클 성공 시 해제 / 실패 시 15% 부식), 2턴마다 기능증 30% & 회피 부여, 3턴마다 반격 자세 (보호막 아군 피격 시 빗나감), 체력 20% 이하 시 1회 풀피 회복 & 전능 10% 증가

[4층 (초월마수)]
• 4층 특수: 빛/어둠속성 아군 공격 받피감 1,000%, 라그나로크 미보유 아군 대상 주피증 1,000% & 받피감 1,000%
• 1&4페이즈: [생명의 씨앗] 사용 (타격 시 씨앗 1개 해제 & 체력 30만 회복 / 버프 해제 시 회복 불가)
• 1페이즈: 마수 25% 브레이크, 홀수 턴 [급류] 2개 부여 ➔ 2턴마다 [급류] 해제 및 빙결 부여
• 2페이즈: 마수 20% 브레이크, 근/체/속 받피감 부여, 동일 속성 스킬 2장 이상 사용 시 열세 속성 받피감 & 감염 해제 (단, 타 속성 연계 시 2턴 공스불)
• 3페이즈: 마수 25% 브레이크, 동일 속성 3장 사용 시 [에이크쉬르니르의 가호] 부여, 홀수 턴 공 20,000% 단일기 (가호 아군 피격 시 빗나감), 2턴마다 산화 부여, 타격 시 해당 속성 받피감 50% 부여
• 4페이즈: 마수 20% 브레이크, 불사 3개 & 속성별 피해 고정, 사이클 성공 시 불사 1개 해제 & 최생 10% 부식, 특정 체력 구간마다 피해 고정 해제 (80% 근력, 50% 체력, 20% 속력), 3턴마다 반격 자세`
    },
    skollhati: {
      name: "🐺 스콜과 하티 마수전",
      imgSrc: "스콜과 하티.png",
      stages: ["1층: 마수", "2층: 대마수", "3층: 초마수", "4층: 초월마수"],
      recommendDeck: "도나르 / 탐나는 로키 트라브 / 프레이 / 마엘",
      summary: `[기본 설정 및 특성]
• 악연 효과: 파티에 도나르 편성 시 도나르 모든 능력치 20% 증가 및 각 페이즈 시작 시 아군 스킬 랭크 업
• 마수 구분: 하양(4층 노랑) = [스콜] / 검정 = [하티]
• 마수 특징: 디버프 면역 / 1~3층은 특이 기믹 없이 두 마리 체력 균등 관리 및 디버프 해제 위주 공략

[4층 (초월마수)]
• 1페이즈: 스콜 30% 브레이크 (하티 불사)
  - 하티 시작 시 2턴 도발 / 도발 하티 공격 시 [달의 파동] 부여 (5중첩 시 2턴 기절)
  - 하티 자세 해제 시 아군에게 2턴간 [달빛] 부여 & 파동 2개 해제 ([달빛] 보유 시 [실명] 면역)
  - 스콜은 [달빛] 없는 아군 피격 받피감 100% / 스콜 필살기 사용 시 [달빛] 해제

• 2페이즈: 하티 30% 브레이크 (스콜 불사)
  - 스콜 시작 시 2턴 도발 / 도발 스콜 공격 시 [태양의 파동] 부여 (5중첩 시 1,000,000 고정 피해)
  - 스콜 자세 해제 시 아군에게 2턴간 [햇빛] 부여 & 파동 2개 해제 ([햇빛] 보유 시 [빙결] 면역)
  - 스콜은 [햇빛] 없는 아군 피격 받피감 100% / 스콜 필살기 사용 시 [햇빛] 해제

• 3페이즈: 마수 30% 브레이크 & 피해 고정 (둘 중 하나만 남으면 모든 능력치 대폭 상승)
  - 홀수 턴 스콜 도발 / 스콜 피격 시 [태양의 파동](5중첩 100만뎀) / 하티 피격 시 [달의 파동](5중첩 기절)
  - 스콜 필살기 게이지 3칸 감소 시 2턴간 [햇빛] 부여 / 하티 필살기 게이지 3칸 감소 시 2턴간 [달빛] 부여
  - 아군이 [햇빛]과 [달빛] 동시 보유 시 [여명의 빛]으로 변환되며 마수의 피해 고정 해제`
    },
    nidhoggr: {
      name: "🐍 니드호그 마수전",
      imgSrc: "니드호그.png",
      stages: ["1층: 마수", "2층: 대마수", "3층: 초마수"],
      recommendDeck: "마엘 / 빛엘리 / 프레이야 / 마르가렛",
      summary: `[기본 설정 및 특성]
• 패시브 특성: 아군의 생명력을 제외한 생명 관련 능력 40% 감소
• 핵심 요점: 자세 해제 스킬 필수 배치 / 각 층·페이즈별 불사게이지증감 스킬 및 약점 종류 숙지

[1층 (마수)]
• 1페이즈: 기본 패턴 진행
• 2페이즈: 마수 35% 브레이크 / 최피감 20% 3개 보유 (자세 해제 스킬 사용 시 1개씩 해제)
• 3페이즈: 마수 35% 브레이크 & 받피감 10% & 불사게이지 100% 보유
  - 스킬 타격 시 불사게이지 감소 (1성 20% / 2성 45% / 3성 100%)
  - 마수 체력 30% 이하 도달 시 공관증 50% 2개 부여

[2층 (대마수)] - 전체 마수 35% 브레이크
• 1페이즈: 마수 불사 보유 (버프 해제 시 마수에게 10% 최피감 8개 & 공증 350% 부여되므로 버프해제 주의)
• 2페이즈: 최피감 20% 3개 보유 (자세 해제 스킬 사용 시 최피감 1개씩 해제 및 아군 감염 디버프)
• 3페이즈: 불사게이지 100% 시작
  - 마수 체력 50% 미만 시 불사게이지 33.3% 감소 / 50% 이상 시 불사게이지 증가

[3층 (초마수)]
• 1페이즈: 마수 35% 브레이크 & 불사게이지 0% 시작
  - 마수 턴 시작 시 불사게이지 54% 증가 / 스킬 사용 시 7~9% 감소, 필살기 사용 시 33.3% 감소
  - 마수 버프 스킬 직후 아군 턴에 첫 사용한 스킬 종류 2턴간 봉인
• 2페이즈: 마수 35% 브레이크 & 최피감 20% 4개 & 불사게이지 0% 시작 (게이지 0% 시 주피증 50%)
  - 자세 해제 스킬 시 게이지 15% 증가 & 최피감 1개 해제 & 약점 노출 (버프/자세/회복/필살기 중 랜덤)
  - 약점 스킬 사용 시 게이지 5~6% 감소 (비약점 스킬 사용 시 1~2% 감소)
• 3페이즈: 재생률 1,000% & [마수 정화] 5개 & 불사게이지 100% 시작
  - [마수 정화] 마수 턴마다 1개씩 해제 (모두 해제 시 마수 모능증 30%)
  - 체력 30% 미만 깎을 시 게이지 25% 감소 / 체력 안 깎일 시 게이지 10% 증가`
    },
    ratatoskr: {
      name: "🐿️ 라타토스크 마수전",
      imgSrc: "라타토스크.png",
      stages: ["1층: 마수", "2층: 대마수", "3층: 초마수"],
      recommendDeck: "발렌티 / 신각 킹 / 다이앤 / 엘리자베스",
      summary: `[기본 설정 및 특성]
• 패시브 특성: 아군의 생명 제외 생명 관련 능력 40% 감소 / 통나무 효과는 마수 위치 시 마수에도 적용
• 핵심 메커니즘: 디버프 종류 및 개수에 따른 마수의 통나무 위치 이동 / 디버프 면역 아군 존재 시 턴 시작/다음 페이즈 이동 때 아군 버프 해제
• 마수 자세 스킬 사용 시 통나무 이동 불가

[1층 (마수)] - 전체 통나무 40% 브레이크 (이동: 좌=감전 / 중=중독 / 우=출혈)
• 1페이즈: 동일 통나무 2턴 유지 시 스킬 봉쇄 (디버프 스킬 제외 / 이동 시 해제)
• 2페이즈: 2턴 유지 시 아군 모능깎 / 전체기·비마수 단일기 타격 시 마수강화 중첩 (5개 이상 시 공관증)
• 3페이즈: 최피감 보유 (좌-중-우 1회씩 모두 이동 시 최피감 해제) / 좌=원거리 회피, 우=근거리 회피

[2층 (대마수)] - (이동: 좌=감전 / 중=중독 / 우=출혈)
• 전장 이탈: 통나무 불사 ➔ 단일기 타격 시 표적 부여 ➔ 복귀 시 표적 위치 복귀 시 아군 모능증 (실패 시 마수 버프)
• 1페이즈: 마수 33% 브레이크 / 좌·우 통나무 생존 시 불사 / 2턴마다 빨간 식중독 미보유 시 회색 식중독 5개
• 2페이즈: 전체 통나무 33% 브레이크 / 좌·우 통나무 생존 시 불사 / 특정 턴 전장 이탈
• 3페이즈: 전체 통나무 33% 브레이크 / 좌 생존 시 불사, 우 생존 시 마수 체력 5배 / 체력 30% 미만 생존 시 풀피 회복 & 모능증 5%

[3층 (초마수)] - (이동: 디버프 1개=가운데 / 2~3개=페이즈별 상이 / 아군 필살기 시 랜덤 이동)
• 1페이즈: 마수 33% 브레이크 / 2개=왼쪽 (2턴 유지 시 아군 모능깎) / 3개=오른쪽 (2턴 유지 시 마수 모능깎)
• 2페이즈: 마수 10% 브레이크 / 2개=오른쪽 (2턴 유지 시 아군 디버프) / 3개=왼쪽 (2턴 유지 시 마수 회색 식중독)
• 3페이즈: 전체 통나무 33% 브레이크 / 2개=왼쪽 / 3개=오른쪽
  - 가운데 2턴 유지 시 마수 생깎 / 왼쪽 2턴 유지 시 아군 디버프 / 오른쪽 2턴 유지 시 아군 회색 식중독 개수만큼 불사 해제`
    },
    surtr: {
      name: "🔥 수르트 & 태초의 불꽃",
      imgSrc: "수르트&태초의 불꽃.png",
      stages: ["1층: 마수", "2층: 대마수", "3층: 초마수"],
      recommendDeck: "불구대천 멜리오다스 / 신각킹 / 여멜 / 여반",
      summary: "• 스펠 오브 케나즈 및 레바테인 기믹 파훼. 자세 해제 및 과열 해제 스킬 관리."
    }
  };

  // 4. 기사단 보스전 5종 데이터
  const guildData = {
    akumu: {
      name: "👹 아쿠무 (기사단 보스)",
      imgSrc: "아쿠무.png",
      recommendDeck: "고서 / 젤드리스 / 지왕 멜리오다스 / 에스타로사",
      summary: "• 시즌 미션 조건(디버프 부여 및 점수작)을 우선 파악하여 스킬 순서를 배치하는 것이 핵심입니다."
    },
    kelak: {
      name: "⚔️ 켈라크 (기사단 보스)",
      imgSrc: "켈라크.png",
      recommendDeck: "더 윈 메이저 / 빛엘리 / 고서 / 프레이",
      summary: "• 단일 누적 딜 점수 산출이 중요하므로 딜 버프 스킬 중첩 타이밍을 노려 필살기를 사용합니다."
    },
    eineck: {
      name: "🛡️ 에이네크 (기사단 보스)",
      imgSrc: "에이네크.png",
      recommendDeck: "체력 속성 중심 극딜 조합",
      summary: "• 방어력 감소 및 디버프 중첩을 통한 파쇄 극딜 딜타이밍 확보가 핵심입니다."
    },
    belgius: {
      name: "⚡ 베르기우스 (기사단 보스)",
      imgSrc: "베르기우스.png",
      recommendDeck: "자세 해제 및 버프 해제 스킬 보유 조합",
      summary: "• 베르기우스의 버프와 반격 자세를 적절히 해제하면서 미션 점수를 챙깁니다."
    },
    canopus: {
      name: "🌟 카노푸스 (기사단 보스)",
      imgSrc: "카노푸스.png",
      recommendDeck: "신각 킹 / 빛엘리 / 마엘 / 고서",
      summary: "• 광역 스킬 기반 딜링 및 신성 버프 관리가 고득점의 포인트입니다."
    }
  };

  // 5. PVE 기타 콘텐츠 데이터
  const pveOtherData = {
    demonking: {
      title: "👑 마신왕전 공략",
      imgSrc: "마신왕.png",
      deck: "지왕 멜리오다스 / 빛엘리 / 고서 / 젤드리스",
      summary: "마신왕의 와일드 카운트 기믹을 계산하여 카드 이동 및 연쇄 스킬 사용 타이밍을 맞추는 것이 핵심입니다."
    },
    supreme: {
      title: "✨ 최고신전 공략",
      imgSrc: "boss.png",
      deck: "최고신 전용 특수 패시브 대응 조합",
      summary: "은총 및 신성 버프 해제 타이밍과 궁극기 차단 패턴 관리가 공략의 핵심입니다."
    }
  };

  const pveMainTabs = document.querySelectorAll('.pve-main-tab');
  const beastSubMenu = document.getElementById('beast-sub-menu');
  const guildSubMenu = document.getElementById('guild-sub-menu');
  
  const beastTabs = document.querySelectorAll('.beast-tab');
  const guildTabs = document.querySelectorAll('.guild-tab');
  const pveContent = document.getElementById('pve-content');

  // 마수전 공략 출력
  function renderBeastInfo(beastKey) {
    const data = beastData[beastKey];
    if (!data) return;

    const stageBadges = data.stages.map(stage => {
      const isTranscendent = stage.includes("초월마수");
      const badgeStyle = isTranscendent 
        ? "bg-amber-500/20 text-amber-400 border-amber-500/50" 
        : "bg-slate-800 text-slate-300 border-slate-700";
      return `<span class="border text-xs font-semibold px-2.5 py-1 rounded-md ${badgeStyle}">${stage}</span>`;
    }).join(' ');

    pveContent.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-5 border-b border-slate-700 pb-4">
        <img src="${data.imgSrc}" alt="${data.name}" class="w-16 h-16 object-contain rounded-xl bg-slate-800 p-1 border border-slate-700" onerror="this.style.display='none'">
        <div>
          <h3 class="text-xl font-bold text-amber-400 mb-2">${data.name}</h3>
          <div class="flex flex-wrap gap-1.5">${stageBadges}</div>
        </div>
      </div>
      
      <div class="bg-slate-800 p-4 rounded-lg mb-4 border border-slate-700">
        <span class="text-xs text-amber-400 font-bold block mb-1"><i class="fa-solid fa-users"></i> 추천 덱 조합</span>
        <p class="text-sm font-semibold text-slate-200">${data.recommendDeck}</p>
      </div>

      <div class="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-lg border border-slate-800">
        <span class="text-xs text-slate-400 font-bold block mb-2"><i class="fa-solid fa-circle-info"></i> 핵심 공략 요점</span>
        <p class="whitespace-pre-line">${data.summary}</p>
      </div>
    `;
  }

  // 기사단 보스전 공략 출력
  function renderGuildInfo(guildKey) {
    const data = guildData[guildKey];
    if (!data) return;

    pveContent.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-5 border-b border-slate-700 pb-4">
        <img src="${data.imgSrc}" alt="${data.name}" class="w-16 h-16 object-contain rounded-xl bg-slate-800 p-1 border border-slate-700" onerror="this.style.display='none'">
        <div>
          <h3 class="text-xl font-bold text-amber-400">${data.name}</h3>
        </div>
      </div>
      
      <div class="bg-slate-800 p-4 rounded-lg mb-4 border border-slate-700">
        <span class="text-xs text-amber-400 font-bold block mb-1"><i class="fa-solid fa-users"></i> 추천 덱 조합</span>
        <p class="text-sm font-semibold text-slate-200">${data.recommendDeck}</p>
      </div>

      <div class="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-lg border border-slate-800">
        <span class="text-xs text-slate-400 font-bold block mb-2"><i class="fa-solid fa-circle-info"></i> 핵심 공략 요점</span>
        <p class="whitespace-pre-line">${data.summary}</p>
      </div>
    `;
  }

  // 기타 PVE 공략 출력 (마신왕전 / 최고신전)
  function renderOtherPveInfo(pveKey) {
    const data = pveOtherData[pveKey];
    if (!data) return;

    pveContent.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center gap-4 mb-5 border-b border-slate-700 pb-4">
        <img src="${data.imgSrc}" alt="${data.title}" class="w-16 h-16 object-contain rounded-xl bg-slate-800 p-1 border border-slate-700" onerror="this.style.display='none'">
        <div>
          <h3 class="text-xl font-bold text-amber-400">${data.title}</h3>
        </div>
      </div>

      <div class="bg-slate-800 p-4 rounded-lg mb-4 border border-slate-700">
        <span class="text-xs text-amber-400 font-bold block mb-1"><i class="fa-solid fa-users"></i> 추천 덱 조합</span>
        <p class="text-sm font-semibold text-slate-200">${data.deck}</p>
      </div>

      <div class="text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-4 rounded-lg border border-slate-800">
        <span class="text-xs text-slate-400 font-bold block mb-2"><i class="fa-solid fa-circle-info"></i> 핵심 공략 요점</span>
        <p>${data.summary}</p>
      </div>
    `;
  }

  // PVE 메인 탭 클릭 이벤트
  pveMainTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      pveMainTabs.forEach(t => {
        t.classList.remove('bg-amber-500', 'text-slate-950');
        t.classList.add('bg-slate-700', 'text-slate-200');
      });
      this.classList.remove('bg-slate-700', 'text-slate-200');
      this.classList.add('bg-amber-500', 'text-slate-950');

      const pveKey = this.getAttribute('data-pve');

      if (pveKey === 'beast') {
        beastSubMenu.classList.remove('hidden');
        guildSubMenu.classList.add('hidden');
        renderBeastInfo('hresvelgr');
        beastTabs.forEach(t => {
          t.classList.remove('bg-amber-500', 'text-slate-950');
          t.classList.add('bg-slate-700', 'text-slate-200');
        });
        beastTabs[0].classList.remove('bg-slate-700', 'text-slate-200');
        beastTabs[0].classList.add('bg-amber-500', 'text-slate-950');
      } else if (pveKey === 'guild') {
        beastSubMenu.classList.add('hidden');
        guildSubMenu.classList.remove('hidden');
        renderGuildInfo('akumu');
        guildTabs.forEach(t => {
          t.classList.remove('bg-amber-500', 'text-slate-950');
          t.classList.add('bg-slate-700', 'text-slate-200');
        });
        guildTabs[0].classList.remove('bg-slate-700', 'text-slate-200');
        guildTabs[0].classList.add('bg-amber-500', 'text-slate-950');
      } else {
        beastSubMenu.classList.add('hidden');
        guildSubMenu.classList.add('hidden');
        renderOtherPveInfo(pveKey);
      }
    });
  });

  // 마수전 세부 탭 클릭 이벤트
  beastTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      beastTabs.forEach(t => {
        t.classList.remove('bg-amber-500', 'text-slate-950');
        t.classList.add('bg-slate-700', 'text-slate-200');
      });
      this.classList.remove('bg-slate-700', 'text-slate-200');
      this.classList.add('bg-amber-500', 'text-slate-950');

      renderBeastInfo(this.getAttribute('data-beast'));
    });
  });

  // 기사단 보스전 세부 탭 클릭 이벤트
  guildTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      guildTabs.forEach(t => {
        t.classList.remove('bg-amber-500', 'text-slate-950');
        t.classList.add('bg-slate-700', 'text-slate-200');
      });
      this.classList.remove('bg-slate-700', 'text-slate-200');
      this.classList.add('bg-amber-500', 'text-slate-950');

      renderGuildInfo(this.getAttribute('data-guild'));
    });
  });

  // 초기 상태: 흐레스벨그 기본 출력
  renderBeastInfo('hresvelgr');

});
