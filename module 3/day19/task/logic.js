// Switch
function switchToTab(tabNumber) {
   const targetTab = document.querySelector(`.tab[data-tab="${tabNumber}"]`);
   const targetContent = document.querySelector(`.content[data-tab="${tabNumber}"]`);

   // Safe Check
   if(!targetTab || !targetContent) return;

   // Deactivate previous tab & content
   const previousTab = document.querySelector(".tab.active");
   const previousContent = document.querySelector(".content.active");
   
   if(previousTab) previousTab.classList.remove("active");
   if(previousContent) previousContent.classList.remove("active");

   // Activate the target tab & content
   targetTab.classList.add('active');
   targetContent.classList.add('active');

   // Dispatch custom event
   const tabName = targetTab.textContent.trim();
   const tabChangeEvent = new CustomEvent("tabchange", {
      detail: { tabName, tabNumber }
   });
   document.dispatchEvent(tabChangeEvent);
}

// Custom Event Listner
document.addEventListener("tabchange", (e) => {
   console.log(`Switched to tab ${e.detail.tabNumber} ${e.detail.tabName}`);
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
   
   // return if key is invalid or is for current tab
   const validKeys = ['1', '2', '3'];
   const currentTabNumber = document.querySelector(".tab.active").getAttribute("data-tab");
   if(!validKeys.includes(e.key) || e.key === currentTabNumber) return;
   
   // switch the tab & content
   switchToTab(e.key);
});

// Click Event Delegation
document.querySelector(".tab-headers").addEventListener("click" , (e) => {
   // stop propagation on header itself
   e.stopPropagation();

   const target = e.target;
   const currentTab = document.querySelector(".tab.active");

   // return if not clicked on tab or clicked on current tab
   if(
      !target.classList.contains("tab")   ||
      target === currentTab
   ) return;

   // switch the tab & content
   const tabNumber = target.getAttribute("data-tab");
   switchToTab(tabNumber);
});