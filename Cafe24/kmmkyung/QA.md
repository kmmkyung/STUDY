# 카페24 Front API / 스킨 작업 Q&A 정리 (2026-10-29 ~ 11-02)

이 작업을 하면서 던진 질문과 답을 주제별로 정리했다. 확인하지 못한 내용은 "추정"으로 표시했다.
작업 파일 구조와 남은 일은 `HANDOFF.md`, CSS 파일별 역할은 `CSS_MAP.md` 참고.

## 1. Front API 기본

**Q. 카페24 Front API를 얻으려면?**
- 개발자센터(developers.cafe24.com)에서 앱을 만들고 Client ID, Front API Key를 확인한다.
- 앱 권한(scope)에서 `mall.read_product` 등 읽기 권한을 켜고, 앱을 쇼핑몰에 설치해야 한다.

**Q. Front API 인증이 따로 있던데, OAuth 인증은 안 해도 되나?**
- Access Token 발급(OAuth 토큰 교환)은 필요 없다. 헤더에 `Authorization: Basic base64(client_id:front_api_key)`를 넣는다.
- 다만 앱 설치를 위한 **관리자 동의(OAuth 동의 화면)는 1회 필요**하다. 설치 전에는 403 `Uninstalled app`이 난다.
- 테스트 실행으로 열리는 주소(앱 URL)는 설치가 아니다. 동의 화면에서 승인해야 설치가 끝난다.

**Q. 그냥 자바스크립트 호출과 SDK 호출의 차이는?**
- 직접 호출(`fetch`): Front API 엔드포인트 전체(상품, 분류 등)를 호출, 헤더를 직접 구성.
- SDK(`CAFE24API`): 로그인 회원 정보(장바구니, 적립금, 쿠폰 등)용 메서드 중심, Scripttags API로 스크립트 설치 필요.
- 공개 데이터(상품 목록)는 직접 호출이 간단하다. (hince는 SDK로 `get('/api/v2/...')`를 호출하고 있어, SDK에서 REST 경로를 직접 get하는 것도 가능해 보인다. 상품 메서드가 SDK 문서에 없다고 단정한 초기 답변은 정정함.)

**Q. 차이를 설명한 링크는?**
- 비교 문서는 따로 없고, SDK 문서와 Front API 인증 문서를 읽고 정리한 것이었다.
- developers.cafe24.com/app/front/common/frontsdk, developers.cafe24.com/app/front/app/develop/frontapi, apidocs.cafe24.com/docs/front/get-products

**Q. 카페24 모듈이나 사용법을 적은 문서는?**
- 스마트디자인 모듈: sdsupport.cafe24.com/product/list.html?cate_no=61
- 디자인 가이드: developers.cafe24.com/design/front/design/getting-started, 테마 컴포넌트(PC/Mobile): developers.cafe24.com/design/front/component

## 2. 개발 환경 (FTP, git, 세션)

**Q. FTP 신청해서 카페24 코드 편집기에 안 들어가도 되나?**
- 된다. 스킨 파일을 FTP/SFTP로 받아 수정하고 올리면 반영된다. 수정 전 서버 최신본을 먼저 받아야 덮어쓰기를 피한다.

**Q. 로컬 파일은 다른 컴퓨터에서 안 보이지? 대화 세션은?**
- 파일은 서버에 올려야 쇼핑몰에 반영되고 다른 PC에서도 받을 수 있다.
- 대화 기록은 이 PC 사용자 폴더(`.claude/projects/...`)에 저장되어, git으로 가지 않는다.
- 대화 전체 내보내기는 비밀값(Client Secret, Service Key)이 섞여 있어 프로젝트에 올리지 않는다. 요약 문서(`HANDOFF.md`)를 쓴다.

**Q. git에 올리고 SFTP로 바로 수정하면 되나? 실시간 확인이 안 되지 않나?**
- git은 이력 기록용, SFTP(`uploadOnSave`)는 서버 반영용이라 역할이 다르다. 저장하면 바로 서버에 올라가 실시간 확인이 된다.
- 서버에서 직접 고치면 스마트디자인 편집기, 스마트배너 앱이 만든 변경과 어긋난다. 작업 전에 서버에서 받는다.
- `.vscode/sftp.json`(SFTP 비밀번호)은 git에서 제외한다.

**Q. git에 연결하면 어느 컴퓨터에서든 대화가 되지 않나?**
- 앱의 "클라우드에서 계속하기"로 GitHub 저장소 기준의 클라우드 세션을 만들 수 있다(대화는 요약이 넘어간다).
- 클라우드 세션은 저장소 파일만 다루고, SFTP 업로드와 라이브 화면 확인은 로컬 PC에서 한다.

## 3. 상품 목록 구현

**Q. 상품 목록을 가져오고 싶다. 커피 카테고리 최신 4개를 2x2로 보여주고 싶다.**
- `GET /api/v2/products`로 가능하다(커피 분류 번호 24, 하위 분류 포함은 `include_sub_category=T`).
- 처음에는 API로 전부 그리는 방식으로 만들었다.

**Q. 카드 효과(호버 이미지)는 CSS인가 JS인가? 이미지는 등록이미지인가 추가이미지인가?**
- 보이고 사라지는 효과(투명도 전환)는 **CSS**, 호버에 쓸 이미지 주소를 넣는 일은 **JS**(hince는 `product_hover_image.js`).
- hince는 목록 페이지에서는 등록이미지(big/small, 사실상 같은 사진), 메인 베스트 영역에서는 추가이미지(`/web/product/extra/...`)를 호버로 썼다.
- API 응답: `additionalimages: [{ big, medium, small }]`, 없으면 `null`.

**Q. 카페24 내부 함수(모듈)로 받고 필요한 데이터만 API로 받으면 되지 않나?**
- 맞다. 이것이 hince 방식이고 **A안**(모듈 + API 보강)으로 전환했다. 카드는 메인진열 모듈이 그리고, API는 호버 이미지만 채운다.
- 모듈은 관리자에서 진열한 상품이 나온다. "카테고리 최신 N개 자동"은 되지 않고, 상품 가격/할인/장바구니 기능을 모듈이 제공한다.

**Q. `$count`, `$basket_result`, `$basket_option`, `$moreview`, `$cache`는 무슨 뜻?**
- `$count` 출력 개수, `$basket_result` 장바구니 담기 결과 레이어, `$basket_option` 옵션 선택 레이어, `$moreview` 상품 더보기 사용(추정), `$cache` 출력 캐시(켜면 반영이 늦을 수 있음, 추정).

**Q. `list_product.html`에서 가져오는데 리스트 타입이 여러 개면?**
- 타입별로 카드 조각 파일을 따로 둔다(`list_product.html`, `list_product_slide.html`). `@import`에는 매개변수가 없다.
- 공통 파일을 고치면 여러 곳(약 15곳)에 영향이 가므로, 시그니처 전용 `list_product_signature.html`을 새로 만들었다.

**Q. 리스트 `<li>`가 왜 2개 있나? for문으로 돌리는데.**
- 카페24 견본 관례다. 서버는 반복 단위를 상품 수만큼 찍고, 라이브에는 상품당 `<li>` 1개만 나온다. 두 `<li>`는 같은 내용으로 유지한다(편집기 미리보기용으로 추정).

**Q. 왜 진열이 안 보이지?**
- 원인은 `product/list_product_signature.html`이 서버에 없어서(404) 모듈이 빈 `<ul>`만 반복 출력한 것이었다. 파일 업로드가 해결책.
- 메인진열 그룹이 비어 있어도 모듈 블록이 출력되지 않는다. 모듈 번호(`product_listmain_3`)와 진열 그룹 번호(4)는 달랐다.

## 4. 디자인, 이미지

**Q. (시안 이미지) 이런 걸 보여주고 싶다.**
- 왼쪽 큰 이미지 + "SIGNATURES" 타이틀, 오른쪽 구분선 있는 2x2 카드, 호버 시 사진 교체로 구현했다. SALE/NEW 뱃지와 카드 위 라벨은 아직 미구현.

**Q. CSS 파일이 너무 나눠져 있다. 어떤 게 어디 내용인지 정리한 문서는?**
- 공식 문서는 못 찾았고 파일을 읽어 `CSS_MAP.md`로 정리했다(`ec-base-*`는 카페24 공통 UI 부품, `layout.css`는 헤더/푸터, `main.css`는 메인, `sub_style.css`는 서브페이지 전체).
- `add_theme01~03`은 번호가 어긋나 있다(01→.theme02, 02→.theme03, 03→.theme04).

**Q. hince도 카페24로 만든 거야? 모듈을 사용한 거야?**
- 맞다. 목록/정렬/페이지네이션은 카페24 모듈(`xans-product-listnormal` 등)이고, 옵션 색상 점은 자체 JS + `CAFE24API`로 만들었다.

**Q. 이미지(`file.cafe24cos.com/...`)는 어디에 저장되어 있나? 보통 스킨으로 넣나 따로 업로드하나?**
- 스마트배너 앱이 관리하는 카페24 파일 저장소이고, 스킨 폴더 밖이다(`smart-banner/shop1/*.html`이 자동 생성되어 참조).
- 디자인에 고정된 이미지는 스킨(`SkinImg`), 운영자가 자주 바꾸는 이미지는 스마트배너 같은 관리자 업로드로 나눠 쓴다.
- 시그니처 왼쪽 이미지를 관리자에서 바꾸게 하려면 스마트배너로 배너를 만들고 해당 `smart-banner-admin-<ID>.html`을 import한다.
