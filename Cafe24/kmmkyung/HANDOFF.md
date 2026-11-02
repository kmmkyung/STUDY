# kmmkyung 카페24 스킨 작업 인수인계 (2026-11-02 기준)

다른 PC나 새 대화에서 이어서 작업할 때 읽는 문서. **키/비밀번호 값은 일부러 적지 않았다.**
CSS 파일별 역할은 `CSS_MAP.md` 참고.

## 1. 기본 정보
- 쇼핑몰 ID: `kmmkyung` (테스트 스킨, SFTP 설정 이름 "kmmkyung cafe24 test")
- 로컬 작업 폴더: `E:\cursor\SFTP\kmmkyung` (`base` = PC 스킨, `mobile`, `web`)
- 업로드: `.vscode/sftp.json` (SFTP, `uploadOnSave: true` → 에디터에서 저장하면 바로 서버에 올라감)
- 이 폴더는 git 저장소가 아님. 문서는 스킨 폴더 밖(루트)에 있으니 FTP로 올리지 말 것.

## 2. Front API 인증 (확인한 사실)
- Front API는 Access Token(OAuth 토큰 발급)이 필요 없다. 호출 헤더만 있으면 된다.
  `Authorization: Basic base64(client_id:front_api_key)`, `X-Cafe24-Client-Id`, `X-Cafe24-Api-Version`
- 다만 **앱이 쇼핑몰에 설치(관리자 동의, 1회)** 되어 있어야 한다. 미설치 시 403 `Uninstalled app`. 이 앱은 설치 완료됨.
- 호출 주소: `https://kmmkyung.cafe24api.com/api/v2/...`, CORS 허용(`access-control-allow-origin: *`) 확인.
- 키 위치: Client ID, Front API Key는 `base/js/front-api-products.js`의 `CONFIG`에 있다(프론트 공개용).
  **Client Secret Key와 Service Key는 서버 전용이라 코드에 넣지 않는다.** 대화에 노출된 적이 있어 개발자센터에서 재발급 권장.
- 값 확인 위치: 개발자센터 > 앱 > 개발 정보. 앱 권한(scope) 변경 시 동의를 다시 해야 할 수 있다.
- SDK(`CAFE24API`)와 직접 호출(`fetch`)의 차이: SDK는 로그인 회원 정보(장바구니, 적립금 등)용, 공개 데이터(상품, 분류)는 직접 호출이 간단하다.

## 3. 메인 시그니처 섹션 (`base/index.html` 약 169줄)
시안: 왼쪽 큰 이미지 + "SIGNATURES" 타이틀, 오른쪽 상품 2x2(구분선), 호버 시 이미지 교체.

**구조(A안: 카페24 모듈 + 필요한 것만 API)**
- 카드(이름, 가격, 장바구니 등)는 카페24 메인진열 모듈 `product_listmain_N`이 서버에서 렌더링한다.
- 카드 조각: `base/product/list_product_signature.html` (`list_product.html` 복사본, 시그니처 전용).
  `<li>`가 두 번 적혀 있는 것은 카페24 견본 관례이고 렌더링은 상품 수만큼 한 번씩이다. 두 `<li>`는 같은 내용으로 유지할 것.
- 호버 이미지만 API로 채운다: `base/js/front-api-products.js`가 카드의 product_no를 모아
  `GET /api/v2/products?product_no=..&embed=additionalimages`를 한 번 호출 → 추가이미지를 `.thumb__hover`로 붙인다.
- 스타일: `base/css/front-api-products.css` (2x2 그리드, contain/cover, 호버 투명도 전환은 CSS).

**관련 파일**
| 파일 | 역할 |
|---|---|
| `base/index.html` | 섹션 마크업, 상단에 css/js `@css`/`@js` 포함 |
| `base/product/list_product_signature.html` | 시그니처 전용 카드 |
| `base/js/front-api-products.js` | 호버 이미지 보강 |
| `base/css/front-api-products.css` | 시그니처 섹션 스타일 |

## 4. 알게 된 사실
- 모듈 번호(`product_listmain_3`)와 진열 그룹 번호는 **다를 수 있다.** 라이브 링크가 `product_listmain_3`인데 `display/4`였고, 상품이 든 그룹은 4번이었다. 슬롯 번호와 그룹의 연결은 스마트디자인 설정 쪽에서 정해지는 것으로 보임(직접 확인은 못 함).
- 모듈은 진열 그룹에 상품이 없으면 블록 전체를 출력하지 않는다. 카드 조각 파일이 서버에 없을 때는 빈 `<ul>`이 반복 출력됐다.
- "최신 N개"를 자동으로 뽑는 기능은 메인진열 모듈에 없다. 관리자에서 진열한 순서대로 나온다(최신을 보이려면 그룹 안에서 순서를 맞춰야 함).
- `$cache = yes`면 관리자에서 진열을 바꿔도 화면 반영이 늦을 수 있다. `$moreview`는 라이브에서 `no`로 바뀌어 있음.
- 추가이미지 API 응답 형태: `additionalimages: [{ big, medium, small }]`, 없으면 `null`. 등록이미지의 목록용/작은목록용은 지금 같은 파일이라 추가이미지를 올려야 호버로 사진이 바뀐다.
- 이미지 위치 구분: 디자인 고정 이미지는 `SkinImg`(스킨, FTP), 운영자가 자주 바꾸는 이미지는 스마트배너 앱(`file.cafe24cos.com`, 스킨 밖).
  스마트배너가 만든 `smart-banner/shop1/*.html`은 앱이 자동 생성하므로 직접 수정하지 않는다.
- 스마트디자인 편집기가 `index.html`을 자동 정리(줄바꿈 등)하거나 직접 만든 블록을 `data-ez-module="user-defined/1"`로 감쌀 수 있다. 에디터에 열린 이전 내용을 저장하면 로컬 수정이 덮어써지니 주의.

## 5. 쇼핑몰 데이터 (2026-11-02 확인)
- 커피 분류 번호: `24` (하위: 29 아메리카노, 30 라떼, 31 기타, 46 디카페인 등)
- 메인진열 그룹: 2, 3, 5번은 비어 있음, 4번에 상품 9개(13, 14, 17~23번), 1번과 6번은 없음.
- 추가이미지가 등록된 상품: 13, 14번(확인 시점 기준).

## 6. 남은 일 / 마지막으로 확인한 상태
- [ ] `base/product/list_product_signature.html` 서버 업로드 (마지막 확인 시 라이브에서 404 → 그래서 진열이 빈 목록으로 나옴)
- [ ] `index.html`, `css/front-api-products.css`, `js/front-api-products.js` 최신본 업로드 확인
- [ ] 메인에 보일 상품을 모듈이 연결된 그룹에서 원하는 순서로 정리
- [ ] 호버용 추가이미지를 진열 상품에 등록
- [ ] 왼쪽 배경 이미지: `SkinImg/img/main_signature_pc.jpg` 업로드(현재 index.html의 `--signature-image` 경로는 임시 값),
      또는 운영자가 관리자에서 바꾸게 하려면 스마트배너로 배너를 만든 뒤 해당 `smart-banner-admin-<ID>.html`을 import하도록 변경
- [ ] 시안의 카드 위 라벨, SALE/NEW 뱃지는 아직 미구현 (`list_product_signature.html`에서 작업)
- [ ] 맨 아래 `#fapiProducts` 섹션(예전 테스트 블록)은 더 이상 쓰이지 않으니 편집기에서 삭제
- [ ] 모바일 스킨(`mobile/`)에는 아직 적용하지 않음
- [ ] Client Secret Key, Service Key 재발급
