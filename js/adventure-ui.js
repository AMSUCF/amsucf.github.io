/* adventure-ui.js — shared page behavior for the Sierra-style site.
   One copy of the motion toggle, the '>' click prompt, and the p5
   motion-pause observer, replacing six drifted inline versions. */
(function () {
    'use strict';

    if (window.AdventureUI) { return; } // idempotent under double-include

    // ---- Motion toggle (localStorage key: 'motion-preference') ----
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var stored = null;
    try { stored = localStorage.getItem('motion-preference'); } catch (e) { /* private mode */ }
    var motionDisabled = stored !== null ? stored === 'disabled' : prefersReducedMotion;

    function applyMotion() {
        if (motionDisabled) {
            document.body.classList.add('motion-disabled');
        } else {
            document.body.classList.remove('motion-disabled');
        }
        var toggle = document.getElementById('motionToggle');
        if (toggle) {
            var icon = toggle.querySelector('.chaos-motion-toggle-icon');
            var text = toggle.querySelector('.chaos-motion-toggle-text');
            if (motionDisabled) {
                if (icon) { icon.textContent = '▶'; }
                if (text) { text.textContent = 'PLAY'; }
            } else {
                if (icon) { icon.textContent = '⏸'; }
                if (text) { text.textContent = 'PAUSE'; }
            }
        }
    }

    if (document.body) { applyMotion(); }

    document.addEventListener('DOMContentLoaded', function () {
        applyMotion(); // re-apply now that the toggle element exists
        var toggle = document.getElementById('motionToggle');
        if (toggle) {
            toggle.addEventListener('click', function () {
                motionDisabled = !motionDisabled;
                try {
                    localStorage.setItem('motion-preference', motionDisabled ? 'disabled' : 'enabled');
                } catch (e) { /* private mode */ }
                applyMotion();
            });
        }
    });

    // ---- Adventure click feedback ('>' prompt) ----
    document.addEventListener('click', function (e) {
        if (document.body.classList.contains('motion-disabled')) { return; }
        var prompt = document.createElement('div');
        prompt.className = 'click-prompt';
        prompt.textContent = '>';
        prompt.style.left = e.clientX + 'px';
        prompt.style.top = e.clientY + 'px';
        document.body.appendChild(prompt);
        setTimeout(function () { prompt.remove(); }, 600);
    });

    // ---- p5 pause/resume when the motion toggle flips ----
    function watchMotion(p5Instance) {
        if (document.body.classList.contains('motion-disabled')) {
            p5Instance.noLoop();
        }
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'class') {
                    if (document.body.classList.contains('motion-disabled')) {
                        p5Instance.noLoop();
                    } else {
                        p5Instance.loop();
                    }
                }
            });
        });
        observer.observe(document.body, { attributes: true });
        return observer;
    }

    window.AdventureUI = { watchMotion: watchMotion };
})();
