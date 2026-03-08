/**
 * wa-logic.js
 * Antigravity Directives: 静かな波紋のような演出と操作感の向上
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. スクロール時の「ふんわりフェードイン（静かな波紋）」演出
    const fadeElements = document.querySelectorAll('.section-fade');

    const observerOptions = {
        root: null,
        // 画面の下10%の位置を通過した時点で発火させる（少し早めにアニメーション開始）
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 要素が画面に入ったらクラスを付与して浮かび上がらせる
                entry.target.classList.add('is-visible');
                // 一度表示したら監視を解除する（何度もアニメーションしない）
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // 2. モバイル（スマホ）での画像タップエフェクト補助機能
    // CSSの「:hover, :active」だけではiOSなどで反応が鈍い場合があるので、
    // touchstartイベントをバインドして即座にタップ演出（少し拡大）を発火させます
    const imageWrappers = document.querySelectorAll('.image-wrapper');
    imageWrappers.forEach(wrapper => {
        wrapper.addEventListener('touchstart', function () {
            // パッシブイベントとして登録し、ブラウザのスクロール性能に影響を与えない
        }, { passive: true });
    });
});
