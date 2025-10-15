(function(){
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(text){
    toast.textContent = text || 'Copied!';
    toast.classList.add('show');
    if(toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(()=>toast.classList.remove('show'),1500);
  }

  function copyText(text){
    if(navigator.clipboard && navigator.clipboard.writeText){
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); document.body.removeChild(ta); return Promise.resolve(); }
    catch(e){ document.body.removeChild(ta); return Promise.reject(e); }
  }

  // Toggle category submenus
  const pills = document.querySelectorAll('.pill[data-target]');
  pills.forEach(pill=>{
    const targetId = pill.dataset.target;
    const submenu = document.getElementById(targetId);
    const wrapper = pill.closest('.category');

    pill.addEventListener('click', ()=>{
      const isMobile = window.matchMedia('(max-width:720px)').matches;
      const open = wrapper.classList.toggle('open');
      pill.setAttribute('aria-expanded', open ? 'true' : 'false');
      // On desktop, close other categories when opening one. On mobile, allow multiple open (accordion-like by default)
      if(!isMobile && open){
        document.querySelectorAll('.category').forEach(cat=>{
          if(cat !== wrapper) { cat.classList.remove('open'); cat.querySelector('.pill').setAttribute('aria-expanded','false'); }
        });
      }
    });

    // keyboard: open/close with Enter/Space
    pill.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pill.click(); }
      if(e.key === 'Escape') { wrapper.classList.remove('open'); pill.setAttribute('aria-expanded','false'); }
    });
  });

  // click outside to close
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.category')){
      document.querySelectorAll('.category').forEach(cat=>{ cat.classList.remove('open'); cat.querySelector('.pill').setAttribute('aria-expanded','false'); });
    }
  });

  // wire up submenu item copy behavior
  const submenuItems = document.querySelectorAll('.submenu-item, .prompt-item');
  submenuItems.forEach(item=>{
    item.addEventListener('click', ()=>{
      const text = item.dataset.text || item.textContent.trim();
      copyText(text).then(()=>showToast('Copied!')).catch(()=>showToast('Copy failed'));
    });
    item.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); item.click(); }
    });
    item.addEventListener('mouseenter', ()=>{ item.title = 'Click to copy'; });
  });

  // close menus with Escape globally
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') { document.querySelectorAll('.category').forEach(cat=>cat.classList.remove('open')); } });

})();
