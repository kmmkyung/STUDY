# kmmkyung 스킨 CSS 맵 (PC: base)

`base/layout/basic/css/` 기준. 파일 머리 주석과 선택자를 읽고 정리한 것이라, 수정 전에는 해당 파일에서 한 번 더 확인할 것.

## 1. 어디를 고칠지 빠르게 찾기

| 바꾸려는 것 | 파일 |
|---|---|
| 헤더, 푸터, 상단 배너, 상단 메뉴, 검색 레이어, 상품 더보기 | `layout.css` (섹션 주석: 최상단 배너 / 상단 / 상단 메뉴 / 상단검색 레이어 / 하단 ...) |
| 메인 페이지 섹션 (갤러리, 영상, 상품 슬라이드, 지도 등) | `main.css` (`.main_*` 클래스) |
| 서브페이지 전체 (상품 목록, 로그인, 회원가입, 주문, 게시판 ...) | `sub_style.css` (1000줄 이상, 가장 큼) |
| 서브페이지 색상, 타이틀, 탭 (테마01 = 블랙) | `sub_theme.css` |
| 테마별 폰트, 버튼 색 | `add_theme01~03.css` (아래 주의 참고) |
| 레이아웃 변형(layout2, layout3) 헤더 | `add_layout.css` |
| 왼쪽 슬라이드 메뉴(`#aside`) | `slideMenu.css` |
| 메인 시그니처 섹션 (Front API 호버 이미지 보강) | `base/css/front-api-products.css` |

## 2. 카페24 공통 UI 컴포넌트 (`ec-base-*.css`)

카페24 스마트디자인이 기본으로 제공하는 UI 부품 CSS. 클래스 이름(`.ec-base-xxx`)이 파일 이름과 같아서 찾기 쉽다. 스킨 고유 디자인은 보통 여기 대신 `sub_style.css`에서 덮어쓴다.

| 파일 | 내용 |
|---|---|
| `ec-base-button.css` | 버튼 (`btnNormal`, `btnSubmit`, `btnMore` ...) |
| `ec-base-table.css` | 표 |
| `ec-base-tab.css` | 탭 |
| `ec-base-ui.css` | 수량 입력(`ec-base-qty`), 폼 필드, 단계 표시, 텍스트 안내 등 잡다한 UI |
| `ec-base-product.css` | 상품 진열 (`.ec-base-product`, `.prdList`) |
| `ec-base-prdInfo.css` | 상품 정보, 주문 영역 (상품 상세 쪽) |
| `ec-base-paginate.css` | 페이지 번호 |
| `ec-base-layer.css` | 레이어 팝업 |
| `ec-base-tooltip.css` | 툴팁 |
| `ec-base-fold.css` | 접고 펴는 영역 |
| `ec-base-box.css` | 박스 |
| `ec-base-desc.css` | 제목-설명(dl) 목록 |
| `ec-base-help.css` | 도움말 문구 |

## 3. 기타

| 파일 | 내용 |
|---|---|
| `common.css` | 리셋(reset), `.displaynone`, `.dimmed` 등. 파일 안에 "필수 CSS 수정 및 삭제 불가"라고 적혀 있음 |
| `swiper.min.css` | Swiper 슬라이더 라이브러리 (수정 금지) |
| `form_onetouch.css` | 원터치 주문서 일부 스타일 (작음) |
| `/css/module/layout/*.css` | 헤더, 푸터, 로고, 검색, 로그인 상태 등 레이아웃 모듈별 CSS. 해당 모듈을 쓰는 `.html`에서 각각 불러옴 |

## 4. 알아둘 점

- **`add_theme` 번호가 어긋나 있다.** `add_theme01.css`는 `.theme02`용, `add_theme02.css`는 `.theme03`용, `add_theme03.css`는 `.theme04`용이다. 테마01(블랙)은 `sub_theme.css`가 담당한다. 지금 `<body class="theme01">`이라 `add_theme*.css`는 현재 적용되지 않을 가능성이 크다(파일 내용으로 추정, 화면 미확인).
- **로드 순서(`layout.html`, `main.html` 확인함):** `common` → `layout` → `ec-base-*` → `swiper`, 맨 아래에서 `sub_style` → `sub_theme` → `add_theme01~03` → `add_layout`. 나중에 불러오는 파일이 앞의 규칙을 덮어쓴다. 스타일을 바꿔도 안 먹히면 `sub_style.css`, `add_layout.css`를 먼저 의심.
- **`main.css`는 `index.html` 전용이다.** 메인 페이지에서만 불러오고, 안에서 `#contents`, `#header` 일부를 `!important`로 바꾼다.
- 모바일 스킨(`mobile/css`)은 이 문서에 포함하지 않았다.
