(() => {
  const D = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;

  /* ---------- Render content from data.js ---------- */
  const [first, ...rest] = D.name.split(" ");
  // Each letter gets its own slice of the gradient so the word reads as one sweep.
  const letters = (word, cls, offset) =>
    `<span class="${cls}">${[...word]
      .map((c, i) => `<span class="ch" style="animation-delay:${(offset + i) * 45}ms;background-position:${(i / Math.max(word.length - 1, 1)) * 100}% 0">${esc(c)}</span>`)
      .join("")}</span>`;
  $("[data-name]").innerHTML = `${letters(first, "first", 0)} ${letters(rest.join(" ") + ".", "last", first.length + 1)}`;
  $("[data-tagline]").textContent = D.tagline;

  $$("[data-email-link]").forEach((a) => (a.href = `mailto:${D.email}`));
  $$("[data-email-text]").forEach((a) => (a.textContent = D.email));
  $$("[data-linkedin]").forEach((a) => (a.href = D.socials.linkedin));
  $$("[data-github]").forEach((a) => (a.href = D.socials.github));
  if (D.resume) $$("[data-resume]").forEach((a) => { a.href = D.resume; a.hidden = false; });

  $("#stats").innerHTML = D.stats
    .map((s) => `<li><strong data-count="${s.value}" data-suffix="${esc(s.suffix)}">0${esc(s.suffix)}</strong><span>${esc(s.label)}</span></li>`)
    .join("");

  const tech = D.skills.flatMap((g) => g.items);
  $("#marquee").innerHTML = [...tech, ...tech].map((t) => `<span>${esc(t)}</span>`).join("");

  $("[data-about-heading]").textContent = D.about.heading;
  $("#aboutCopy").innerHTML = D.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join("");
  $("#pillars").innerHTML = D.about.pillars
    .map((p, i) => `<div class="pillar reveal" style="transition-delay:${i * 100}ms"><span class="num">0${i + 1}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></div>`)
    .join("");

  $("#skillsGrid").innerHTML = D.skills
    .map(
      (g, i) => `<article class="skill-card reveal" style="transition-delay:${(i % 3) * 90}ms">
        <header><h3>${esc(g.group)}</h3><span class="ico">${g.icon}</span></header>
        <ul class="tags">${g.items.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </article>`
    )
    .join("");

  $("#timeline").innerHTML = D.experience
    .map(
      (e) => `<li class="tl-item reveal">
        <div class="tl-top"><div><h3>${esc(e.role)}</h3><p class="tl-company">${esc(e.company)}</p></div><span class="tl-period mono">${esc(e.period)}</span></div>
        <ul>${e.points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
        <ul class="tags">${e.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </li>`
    )
    .join("");

  $("[data-award-title]").textContent = D.award.title;
  $("[data-award-meta]").textContent = `${D.award.issuer} · ${D.award.date}`;
  $("[data-award-quote]").textContent = D.award.quote;
  $("[data-award-issuer]").textContent = D.award.issuer;

  if (D.projects.length) {
    $("#work").hidden = false;
    $("#projects").innerHTML = D.projects
      .map(
        (p) => `<article class="project reveal"><h3>${esc(p.title)}</h3><p>${esc(p.description)}</p>
          <ul class="tags">${(p.tags || []).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          <div class="project-links">${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">Live ↗</a>` : ""}${p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">Code ↗</a>` : ""}</div></article>`
      )
      .join("");
  } else {
    $$('[data-requires="projects"]').forEach((el) => el.remove());
  }

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Typing role rotator ---------- */
  const typed = $("#typed");
  if (reduceMotion) typed.textContent = D.roles[0];
  else {
    let r = 0, i = 0, deleting = false;
    const tick = () => {
      const word = D.roles[r];
      i += deleting ? -1 : 1;
      typed.textContent = word.slice(0, i);
      let delay = deleting ? 35 : 75;
      if (!deleting && i === word.length) { deleting = true; delay = 1800; }
      else if (deleting && i === 0) { deleting = false; r = (r + 1) % D.roles.length; delay = 300; }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 900);
  }

  /* ---------- Reveal on scroll + counters ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.12 }
  );
  $$(".reveal").forEach((el) => io.observe(el));

  $$("[data-count]").forEach((el) => {
    const end = +el.dataset.count, suffix = el.dataset.suffix;
    if (reduceMotion) { el.textContent = end + suffix; return; }
    const start = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / 1600, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - t, 3))) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    setTimeout(() => requestAnimationFrame(step), 700);
  });

  /* ---------- Nav: scroll state, progress, active link, mobile menu ---------- */
  const nav = $("#nav"), progress = $(".progress"), links = $$("#navLinks a[href^='#']");
  const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  const onScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("scrolled", y > 30);
    progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    let current = null;
    sections.forEach((s) => { if (s.getBoundingClientRect().top < innerHeight * 0.4) current = s.id; });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const burger = $("#burger"), navLinks = $("#navLinks");
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
  });
  links.forEach((a) => a.addEventListener("click", () => { navLinks.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }));

  /* ---------- Contact form → mailto ---------- */
  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = `Hello from ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    location.href = `mailto:${D.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  /* ---------- Pointer effects (desktop only) ---------- */
  if (finePointer && !reduceMotion) {
    const glow = $(".cursor-glow");
    addEventListener("pointermove", (e) => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; });

    $$(".tilt").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
      });
      card.addEventListener("pointerleave", () => (card.style.transform = ""));
    });

    $$(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      b.addEventListener("pointerleave", () => (b.style.transform = ""));
    });

    $$(".skill-card").forEach((c) =>
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
      })
    );
  }

  /* ---------- Hero particle field: hover scatters, click sends a shockwave ---------- */
  const canvas = $("#field"), ctx = canvas.getContext("2d"), hero = $(".hero");
  const COLORS = ["255,181,71", "139,123,255", "79,227,193", "236,235,243"];
  let W, H, dpr, pts = [], waves = [], visible = true;
  const mouse = { x: -9999, y: -9999 };

  const build = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = hero.clientWidth; H = hero.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.min(140, Math.floor((W * H) / 11000));
    pts = Array.from({ length: n }, () => {
      const x = Math.random() * W, y = Math.random() * H;
      return { x, y, hx: x, hy: y, vx: 0, vy: 0, r: Math.random() * 1.8 + 0.6, c: COLORS[(Math.random() * COLORS.length) | 0], t: Math.random() * 6.28 };
    });
  };

  hero.addEventListener("pointermove", (e) => { const r = hero.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  hero.addEventListener("pointerleave", () => { mouse.x = mouse.y = -9999; });
  hero.addEventListener("click", (e) => {
    if (e.target.closest("a, button, .tilt")) return;
    const r = hero.getBoundingClientRect();
    waves.push({ x: e.clientX - r.left, y: e.clientY - r.top, rad: 0, life: 1 });
  });

  const frame = () => {
    if (visible) {
      ctx.clearRect(0, 0, W, H);
      waves.forEach((w) => { w.rad += 9; w.life -= 0.016; });
      waves = waves.filter((w) => w.life > 0);

      for (const p of pts) {
        p.t += 0.01;
        // drift around home position
        const tx = p.hx + Math.cos(p.t) * 12, ty = p.hy + Math.sin(p.t * 1.3) * 12;
        p.vx += (tx - p.x) * 0.004; p.vy += (ty - p.y) * 0.004;
        // mouse repel
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 22000) { const d = Math.sqrt(d2) || 1, f = (1 - d / 148) * 2.2; p.vx += (dx / d) * f; p.vy += (dy / d) * f; }
        // shockwaves
        for (const w of waves) {
          const wx = p.x - w.x, wy = p.y - w.y, wd = Math.sqrt(wx * wx + wy * wy) || 1;
          if (Math.abs(wd - w.rad) < 30) { p.vx += (wx / wd) * 5 * w.life; p.vy += (wy / wd) * 5 * w.life; }
        }
        p.vx *= 0.9; p.vy *= 0.9;
        p.x += p.vx; p.y += p.vy;
      }

      // links
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
          if (d2 < 12000) {
            ctx.strokeStyle = `rgba(160,150,255,${(1 - d2 / 12000) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(${p.c},0.85)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      for (const w of waves) {
        ctx.strokeStyle = `rgba(255,181,71,${w.life * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(w.x, w.y, w.rad, 0, 6.283); ctx.stroke();
      }
    }
    requestAnimationFrame(frame);
  };

  build();
  addEventListener("resize", () => { clearTimeout(build.t); build.t = setTimeout(build, 150); });
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(hero);
  if (!reduceMotion) requestAnimationFrame(frame);
})();
