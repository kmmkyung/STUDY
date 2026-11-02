/**
 * Cafe24 Front API - 시그니처 섹션(.sec__signature) 호버 이미지 보강
 *
 * 상품 카드(이름, 가격, 링크, 장바구니 등)는 카페24 메인진열 모듈이 이미 그려 놓았다.
 * 이 스크립트는 카드의 product_no만 모아 Front API를 한 번 호출하고,
 * 상품 등록 화면에서 올린 '추가이미지'를 호버용 이미지로 끼워 넣는다.
 * 추가이미지가 없는 상품은 호버 이미지를 만들지 않아 평소 이미지가 그대로 유지된다.
 *
 * 참고: GET /api/v2/products?product_no=..&embed=additionalimages (scope: read_product)
 *
 * @format
 */

(function () {
  "use strict";

  const CONFIG = {
    mallId: "kmmkyung", // 쇼핑몰 ID
    clientId: "d1KO9mrzEdeWxp3cdmwzRF", // 개발자센터 앱의 Client ID
    frontApiKey: "txyG1OsHqI8e6LvUGAHW4V", // Front API Key (프론트 공개용)
    apiVersion: "2026-09-01", // 개발자센터 앱 설정의 API 버전
    shopNo: 1,
  };

  const CARD_SELECTOR = '.sec__signature .prdList > li[id^="anchorBoxId_"]';

  /**
   * 추가이미지 응답에서 호버용 이미지 주소 1개를 꺼낸다.
   * 응답 형태: additionalimages = [{ big, medium, small }, ...] (추가이미지가 없으면 null)
   * 첫 번째 추가이미지의 big을 쓰고, 없으면 medium, small 순으로 대신한다.
   */
  const pickAdditionalImage = (additionalImages) => {
    const first = Array.isArray(additionalImages) ? additionalImages[0] : null;
    return first ? first.big || first.medium || first.small || "" : "";
  };

  const fetchProducts = async (productNos) => {
    const params = new URLSearchParams({
      shop_no: String(CONFIG.shopNo),
      product_no: productNos.join(","),
      embed: "additionalimages",
      limit: String(productNos.length),
    });

    const response = await fetch(
      `https://${CONFIG.mallId}.cafe24api.com/api/v2/products?${params}`,
      {
        headers: {
          Authorization: `Basic ${btoa(`${CONFIG.clientId}:${CONFIG.frontApiKey}`)}`,
          "Content-Type": "application/json",
          "X-Cafe24-Client-Id": CONFIG.clientId,
          "X-Cafe24-Api-Version": CONFIG.apiVersion,
        },
      },
    );
    if (!response.ok) {
      throw new Error(`Front API 응답 오류: ${response.status}`);
    }

    const data = await response.json();
    return data.products || [];
  };

  /** 카드의 썸네일 링크 안에 호버 이미지를 추가한다. */
  const appendHoverImage = (card, src) => {
    const link = card.querySelector(".thumbnail > a");
    if (!link || link.querySelector(".thumb__hover")) {
      return;
    }

    const img = document.createElement("img");
    img.className = "thumb__hover";
    img.src = src;
    img.alt = "";
    img.loading = "lazy";
    link.appendChild(img);
  };

  const start = async () => {
    const cards = [...document.querySelectorAll(CARD_SELECTOR)];
    if (cards.length === 0) {
      return;
    }

    const cardByProductNo = new Map(
      cards.map((card) => [card.id.replace("anchorBoxId_", ""), card]),
    );

    try {
      const products = await fetchProducts([...cardByProductNo.keys()]);
      products.forEach((product) => {
        const card = cardByProductNo.get(String(product.product_no));
        const src = pickAdditionalImage(product.additionalimages);
        if (card && src) {
          appendHoverImage(card, src);
        }
      });
    } catch (error) {
      console.error("[front-api-products]", error);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
