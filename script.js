/* STAR BURST */
(function () {
  const palette = [
    "#2563eb",
    "#ec4899",
    "#8b5cf6",
    "#c026d3",
    "#3b82f6",
    "#d946ef"
  ];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function pickColor() {
    return palette[Math.floor(Math.random() * palette.length)];
  }

  function createStar(container, x, y) {
    const star = document.createElement("span");
    star.className = "star-burst";

    const angle = random(0, Math.PI * 2);
    const distance = random(45, 120);
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;
    const size = random(12, 22);
    const rotate = random(-40, 40);
    const duration = random(700, 1100);

    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.setProperty("--dx", `${dx}px`);
    star.style.setProperty("--dy", `${dy}px`);
    star.style.setProperty("--star-size", `${size}px`);
    star.style.setProperty("--star-rotate", `${rotate}deg`);
    star.style.setProperty("--star-duration", `${duration}ms`);
    star.style.setProperty("--star-color", pickColor());

    container.appendChild(star);

    setTimeout(() => {
      star.remove();
    }, duration + 100);
  }

  function burstAt(container, x, y, count = 18) {
    for (let i = 0; i < count; i += 1) {
      setTimeout(() => createStar(container, x, y), i * 12);
    }
  }

  function burstFromCenter(container, count = 18) {
    const rect = container.getBoundingClientRect();
    burstAt(container, rect.width / 2, rect.height / 2, count);
  }

  function burstFromPointer(container, event, count = 18) {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    burstAt(container, x, y, count);
  }

  function openLink(node) {
    const href = node.getAttribute("href");
    const target = node.getAttribute("target");

    if (!href) return;

    if (target === "_blank") {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = href;
    }
  }

  function bindBurstTitle(selector, countPointer = 20, countCenter = 20) {
    const nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;

    nodes.forEach((node) => {
      node.addEventListener("click", (event) => {
        burstFromPointer(node, event, countPointer);
      });

      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          burstFromCenter(node, countCenter);
        }
      });
    });
  }

  function bindBurstLinks(selector, countPointer = 18, countCenter = 18, delay = 320) {
    const nodes = document.querySelectorAll(selector);
    if (!nodes.length) return;

    nodes.forEach((node) => {
      let isOpening = false;

      node.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (isOpening) return;
        isOpening = true;

        burstFromPointer(node, event, countPointer);

        setTimeout(() => {
          openLink(node);
          isOpening = false;
        }, delay);
      });

      node.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();

          if (isOpening) return;
          isOpening = true;

          burstFromCenter(node, countCenter);

          setTimeout(() => {
            openLink(node);
            isOpening = false;
          }, delay);
        }
      });
    });
  }

  bindBurstTitle(".js-star-burst", 20, 20);
  bindBurstLinks(".js-star-burst-link", 20, 20, 320);
})();

/* WORKS */
(function () {
  const navHighlights=document.getElementById("navHighlights");
  const navWork=document.getElementById("navWork");
  const classic=document.getElementById("contentsClassic");
  const compact=document.getElementById("contentsCompact");
  const workSection=document.getElementById("work");
  const skillsSection=document.getElementById("highlights");

  if(!navHighlights||!navWork||!classic||!compact||!workSection||!skillsSection)return;

  let currentView=compact.hidden ? "classic" : "compact";

  function scrollToWorkTop(){
    const y=workSection.getBoundingClientRect().top+window.scrollY-90;
    window.scrollTo({top:y,behavior:"smooth"});
  }

  function scrollToSkillsTop(){
    const y=skillsSection.getBoundingClientRect().top+window.scrollY-90;
    window.scrollTo({top:y,behavior:"smooth"});
  }

  function animateCards(container,selector,wrapperClass){
    const cards=container.querySelectorAll(selector);
    if(!cards.length)return;

    if(wrapperClass){container.classList.add(wrapperClass);}

    cards.forEach((card)=>{
      card.classList.remove("is-visible");
      void card.offsetWidth;
    });

    cards.forEach((card,index)=>{
      setTimeout(()=>{
        card.classList.add("is-visible");
      },index*120);
    });
  }

  function showClassic(){
    compact.hidden=true;
    classic.hidden=false;
    currentView="classic";
    scrollToSkillsTop();
    animateCards(classic,".case-shape","is-revealing");
  }

  function showCompact(){
    classic.hidden=true;
    compact.hidden=false;
    currentView="compact";
    scrollToWorkTop();
    animateCards(compact,".work-card--reveal","");
  }

  navWork.addEventListener("click",function(event){
    event.preventDefault();
    if(currentView==="compact"){
      scrollToWorkTop();
      return;
    }
    showCompact();
  });

  navHighlights.addEventListener("click",function(event){
    event.preventDefault();
    if(currentView==="classic"){
      scrollToSkillsTop();
      return;
    }
    showClassic();
  });
})();

/* MENU */
(function(){
  const groups=document.querySelectorAll(".work-menu__group");
  if(!groups.length)return;

  groups.forEach((group)=>{
    const title=group.querySelector(".work-menu__title");
    if(!title)return;

    title.addEventListener("click",function(){
      group.classList.toggle("is-collapsed");
    });
  });
})();