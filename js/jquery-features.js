// js/jquery-features.js
// Все функции запускаются при готовности документа
$(document).ready(function(){

  console.log("jQuery is ready!"); 
  
    $("#searchInput").on("keyup input", function(){
    const val = $(this).val().toLowerCase().trim();
    // Фильтруем элементы списка:
    $("#itemsList li").each(function(){
      const text = $(this).text().toLowerCase();
      const match = text.indexOf(val) > -1;
      $(this).toggle(match);
    });
    // Подсветка совпадений — если введено слово
    if(val.length) {
      highlightText("#itemsList li", val);
    } else {
      // удалить подсветку: заменить HTML на чистый текст
      $("#itemsList li").each(function(){ $(this).text($(this).text()); });
    }
  });

  // 2) Simple autocomplete suggestions
  const suggestions = [];
  // Собираем значения из списка itemsList (если есть)
  $("#itemsList li").each(function(){ suggestions.push($(this).text().trim()); });

  $("#searchInput").on("input", function(){
    const q = $(this).val().toLowerCase().trim();
    if(!q) { $("#suggestions").hide().empty(); return; }
    const matches = suggestions.filter(s => s.toLowerCase().includes(q)).slice(0,6);
    if(matches.length){
      const html = matches.map(m => `<div class="suggestion-item">${m}</div>`).join("");
      $("#suggestions").html(html).show();
    } else {
      $("#suggestions").hide().empty();
    }
  });

  // Клик на подсказку — устанавливаем в input и триггерим keyup
  $(document).on("click", ".suggestion-item", function(){
    const val = $(this).text();
    $("#searchInput").val(val).trigger("keyup");
    $("#suggestions").hide().empty();
  });

  // Закрыть подсказки при клике вне
  $(document).on("click", function(e){
    if(!$(e.target).closest("#searchInput, #suggestions").length){
      $("#suggestions").hide();
    }
  });

  // Highlight helper
  function highlightText(selector, term){
    const esc = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp("("+esc+")", "ig");
    $(selector).each(function(){
      const txt = $(this).text();
      const newHtml = txt.replace(re, '<span class="search-highlight">$1</span>');
      $(this).html(newHtml);
    });
  }

  /* Part 2*/

  // Task 4: Scroll progress bar
  $(window).on("scroll resize", function(){
    const docHeight = $(document).height() - $(window).height();
    const scrolled = $(window).scrollTop();
    const pct = docHeight > 0 ? (scrolled / docHeight) * 100 : 0;
    $("#scrollBar").css("width", pct + "%");
  });

  // Task 5: Animated counter (starts when element gets into view)
  function animateCount($el){
    const target = parseInt($el.data("target")) || 0;
    const duration = 1400; // ms
    const fps = 60;
    const steps = Math.round(duration / (1000 / fps));
    let current = 0;
    const increment = Math.ceil(target / steps);
    const iv = setInterval(() => {
      current += increment;
      if(current >= target){
        $el.text(target);
        clearInterval(iv);
      } else {
        $el.text(current);
      }
    }, Math.round(1000 / fps));
  }

  function checkCounters(){
    $(".count").each(function(){
      const $this = $(this);
      if($this.data("animated")) return;
      const top = $this.offset().top;
      const scrollBottom = $(window).scrollTop() + $(window).height();
      if(scrollBottom > top + 20){
        $this.data("animated", true);
        animateCount($this);
      }
    });
  }
  $(window).on("scroll resize load", checkCounters);
  checkCounters();

  // Task 6: Loading spinner on submit
  $(document).on("submit", "form", function(e){
    const $form = $(this);
    // Найдём кнопку submit внутри формы
    const $btn = $form.find("button[type='submit'], input[type='submit']").first();
    if(!$btn.length) return; // если нет кнопки, ничего не делаем
    e.preventDefault(); // предотвращаем реальную отправку для демонстрации
    $btn.prop("disabled", true);
    const origHtml = $btn.html();
    // использую Bootstrap spinner если есть, иначе текст
    $btn.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Please wait...');
    // симуляция запроса
    setTimeout(() => {
      $btn.prop("disabled", false).html(origHtml);
      showToast("Form submitted successfully");
      // при реальной форме удалите e.preventDefault() и не возвращайте исходный код, а отправляйте форму
    }, 1200);
  });

  /*  Part 3  */

  // Task 7: Toast notifications
  function showToast(text, timeout=2000){
    const $container = $("#toastContainer");
    if(!$container.length){
      $("body").append('<div id="toastContainer" style="position:fixed; top:20px; right:20px; z-index:10500;"></div>');
    }
    const $toast = $(`<div class="toast-msg">${text}</div>`);
    $("#toastContainer").append($toast);
    $toast.hide().fadeIn(200).delay(timeout).fadeOut(400, function(){ $(this).remove(); });
  }
  window.showToast = showToast; // чтобы вызвать извне

  // Task 8: Copy to clipboard button
  $(document).on("click", ".copy-btn", function(){
    const $btn = $(this);
    const target = $btn.data("target");
    const text = $(target).text() || $(target).val() || "";
    if(!text) { showToast("Nothing to copy"); return; }
    if(navigator.clipboard){
      navigator.clipboard.writeText(text).then(() => {
        const old = $btn.html();
        $btn.html("✓ Copied");
        showToast("Copied to clipboard!");
        setTimeout(()=> $btn.html(old), 1400);
      }).catch(() => showToast("Copy failed"));
    } else {
      // fallback
      const $tmp = $("<textarea>").val(text).appendTo("body").select();
      try {
        document.execCommand("copy");
        showToast("Copied to clipboard!");
      } catch (e) {
        showToast("Copy failed");
      } finally { $tmp.remove(); }
    }
  });

  // Task 9: Lazy loading images (simple)
  function lazyLoad(){
    $(".lazy").each(function(){
      const $img = $(this);
      if($img.attr("src")) return;
      const top = $img.offset().top;
      const screenBottom = $(window).scrollTop() + $(window).height();
      if(screenBottom + 100 > top){
        $img.attr("src", $img.data("src"));
        $img.removeClass("lazy");
      }
    });
  }
  $(window).on("scroll resize load", lazyLoad);
  lazyLoad();

});
