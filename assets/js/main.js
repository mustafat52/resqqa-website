(function(){
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Mobile menu ----
  var menuBtn = document.querySelector('.menu-btn');
  var mobileNav = document.querySelector('.mobile-nav');
  if(menuBtn && mobileNav){
    menuBtn.addEventListener('click', function(){
      var isOpen = mobileNav.classList.toggle('open');
      menuBtn.classList.toggle('open', isOpen);
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mobileNav.classList.remove('open');
        menuBtn.classList.remove('open');
      });
    });
  }

  // ---- Powerline draw (homepage hero) ----
  window.addEventListener('load', function(){
    var r = document.getElementById('pl');
    if(r) requestAnimationFrame(function(){ r.style.transform = 'scaleX(1)'; });
  });

  // ---- Scroll reveal ----
  var revealEls = document.querySelectorAll('.reveal');
  if(revealEls.length){
    if(reduced || !('IntersectionObserver' in window)){
      revealEls.forEach(function(el){ el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
      }, {threshold:.15, rootMargin:'0px 0px -40px 0px'});
      revealEls.forEach(function(el){ io.observe(el); });
    }
  }

  // ---- Ledger count-up ----
  function countUp(el){
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    var start = null, dur = 1400;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if(p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('.ledger-num[data-count]');
  if(counters.length){
    if(reduced || !('IntersectionObserver' in window)){
      counters.forEach(function(el){ el.textContent = parseInt(el.dataset.count,10).toLocaleString() + (el.dataset.suffix||''); });
    } else {
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ countUp(e.target); cio.unobserve(e.target); } });
      }, {threshold:.6});
      counters.forEach(function(el){ cio.observe(el); });
    }
  }

  // ---- Hero photo parallax (homepage) ----
  if(!reduced){
    var heroBg = document.querySelector('.hero');
    if(heroBg){
      window.addEventListener('scroll', function(){
        var y = Math.min(window.scrollY, 500) * 0.12;
        heroBg.style.backgroundPositionY = (30 + y*0.05) + '%, 0px';
      }, {passive:true});
    }
  }
  // ---- Category scroll-spy (Products page) ----
  var catnav = document.querySelector('.catnav');
  var catBlocks = document.querySelectorAll('.category-block[id]');
  if(catnav && catBlocks.length && 'IntersectionObserver' in window){
    var catLinks = catnav.querySelectorAll('a');
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          catLinks.forEach(function(a){ a.classList.remove('active'); });
          var link = catnav.querySelector('a[href="#' + e.target.id + '"]');
          if(link) link.classList.add('active');
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    catBlocks.forEach(function(b){ spy.observe(b); });
  }
})();