//! МОДАЛЬНОЕ ОКНО
const modalLinks = document.querySelectorAll('.modal-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timout = 500;

if (modalLinks.length > 0) {
   for (let index = 0; index < modalLinks.length; index++) {
      const modalLink = modalLinks[index];
      modalLink.addEventListener("click", function (e) {
         const modalName = modalLink.getAttribute('href').replace("#", '');
         const curentModal = document.getElementById(modalName);
         modalOpen(curentModal);
         e.preventDefault();
      });
   }
}

const modalCloseIcon = document.querySelectorAll('.close-modal');
if (modalCloseIcon.length > 0); {
   for (let index = 0; index < modalCloseIcon.length; index++) {
      const el = modalCloseIcon[index];
      el.addEventListener('click', function (e) {
         modalClose(el.closest('.modal'));
         e.preventDefault();
      });
   }
}

function modalOpen(curentModal) {
   if (curentModal && unlock) {
      const modalActive = document.querySelector('.modal.open');
      if (modalActive) {
         modalClose(modalActive, false);
      } else {
         bodyUnlock();
      }
      curentModal.classList.add('open');
      curentModal.addEventListener("click", function (e) {
         if (!e.target.closest('.modal__content')) {
            modalClose(e.target.closest('.modal'));
         }
      });
   }
}

function modalClose(modalActive, doUnlock = true) {
   if (unlock) {
      modalActive.classList.remove('open');
      if (doUnlock) {
         bodyUnlock();
      }
   }
}

function bodyLock() {
   const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

   if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
         const el = lockPadding[index];
         el.getElementsByClassName.paddingRight = lockPaddingValue;
      }
   }
   body.style.paddingRight = lockPaddingValue;
   body.classList.add('lock');

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timout);
}

function bodyUnlock() {
   setTimeout(function () {
      if (lockPadding.length > 0) {
         for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
         }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
   }, timout);

   unlock = false;
   setTimeout(function () {
      unlock = true;
   }, timout);
}

document.addEventListener('keydown', function (e) {
   if (e.key === 27) {
      const modalActive = document.querySelector('.modal.open');
      modalClose(modalActive);
   }
});

(function () {
   // проверяется поддержка
   if (!Element.prototype.closest) {
      // реализуется
      Element.prototype.closest = function (css) {
         var node = this;
         while (node) {
            if (node.matches(css)) return node;
            else node = node.parentElement;
         }
         return null;
      }
   }
})();
(function () {
   // проверяем поддержку
   if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
         Element.prototype.webkitMatchesSelector ||
         Element.prototype.mozMatchesSelector ||
         Element.prototype.msMatchesSelector;
   }
})();
// --------------------------------------

//! ПОИСК 
document.querySelector(".form-search-open").addEventListener("click", function () {
   document.querySelector(".header-search-open").classList.add("header-search-open--active");
   this.classList.add("form-search-open--active");
})
document.addEventListener("click", function (e) {
   let target = e.target;
   let search = document.querySelector(".header-search-open");
   if (!target.closest(".header-search")) {
      search.classList.remove("header-search-open--active");
      search.querySelector("input").value = "";
      document.querySelector(".form-search-open").classList.remove("form-search-open--active")
   }
});

//! PLAY - PAUSE
// HEADER
let etherBtn = document.querySelectorAll('.ether-content__btn');

etherBtn.forEach(function (el) {
   let Play = el.querySelector('.ether-content__play');
   let Pause = el.querySelector('.ether-content__pause');

   el.addEventListener('click', function () {
      Play.classList.toggle('ether-content__play--hidden');
      Pause.classList.toggle('ether-content__pause--active');
   });
});

// PODCAST
let podcastBtn = document.querySelectorAll('.podcast-play');

podcastBtn.forEach(function (el) {
   let Play = el.querySelector('.podcast-play__icon');
   let Pause = el.querySelector('.podcast-play__pause');

   el.addEventListener('click', function () {
      Play.classList.toggle('podcast-play__icon--hidden');
      Pause.classList.toggle('podcast-play__pause--active');
   });
});

//! БУРГЕР
// let burger = document.querySelector('.burger');
// let menu = document.querySelector('.header-nav');
// let menuLinks = menu.querySelectorAll('.nav__link');

// burger.addEventListener('click',

//   function () {
//     burger.classList.toggle('burger--active');
//     menu.classList.toggle('header-nav--active');
//     document.body.classList.toggle('stop-scroll');
//     search_open.classList.remove('header-search-open--active');
//   });

// menuLinks.forEach(function (el) {
//   el.addEventListener('click', function () {
//     burger.classList.remove('burger--active');
//     menu.classList.remove('header-nav--active');
//     document.body.classList.remove('stop-scroll');
//   });
// });



//! АККОРДИОН
let tabsBtn = document.querySelectorAll('.guest-item__btn');
let tabsContent = document.querySelectorAll('.guest-content');
let tabsPlug = document.querySelector('.guest-plug');

tabsBtn.forEach(function (guest) {
   guest.addEventListener('click', function (e) {
      const path = e.currentTarget.dataset.path;

      tabsBtn.forEach(function (btn) {
         btn.classList.remove('guest-item__btn--active')
      });
      e.currentTarget.classList.add('guest-item__btn--active');

      tabsContent.forEach(function (guest) { guest.classList.remove('guest-content--active') });
      document.querySelector(`[data-target="${path}"]`).classList.add('guest-content--active');
   });
});
// скрываем заглушку
tabsBtn.forEach(function (plug) {
   plug.addEventListener('click', function () {
      tabsPlug.classList.add('guest-plug--hidden');
   });
});

$(function () {
   $("#accordion").accordion({
      heightStyle: "content"
   });
});
//  ---------------------------------------

//! СЕЛЕКТ
const element = document.querySelector('.broadcast-select');
const choices = new Choices(element, {
   searchEnabled: false,
   itemSelectText: '',
   shouldSort: false,
   position: 'bottom'
});
// ----------------------------------------

//! Показ блоков по клику
document.querySelector('.podcast-btn__still').addEventListener('click', function () {
   document.querySelectorAll('.podcast').forEach(function (element) {
      element.classList.add('podcast--visible')
   })
});
// ----------------------------------------

//! СЛАЙДЕР
const swiper = new Swiper('.we-swiper', {
   // loop: true,
   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },
   keyboard: {
      enabled: true,
      onlyInViewport: false,
   },
   mousewheel: {
      invert: true,
   },
   slidesPerView: 4,
   spaceBetween: 30,
   breakpoints: {
      320: {
         slidesPerView: 2.31,
         spaceBetween: 20,
      },

      481: {
         slidesPerView: 2,
         spaceBetween: 20,
      },

      768: {
         slidesPerView: 2,
         spaceBetween: 30,
      },

      1025: {
         slidesPerView: 3,
         spaceBetween: 30
      },

      1280: {
         slidesPerView: 4,
         spaceBetween: 30
      }
   }
});

//! Валидация формы
const validation = new JustValidate('.we-form__cont', {
   errorLabelCssClass: 'is-label-invalid',
   color: '#D52B1E',
});
validation
   .addField('.text', [
      {
         rule: 'minLength',
         value: 5,
         errorMessage: "Введите текст"
      }
   ])
   .addField('.name', [
      {
         rule: 'minLength',
         value: 2,
         errorMessage: "Не введено имя"
      },
      {
         rule: 'maxLength',
         value: 15,
         errorMessage: "Длинное имя"
      }
   ])
   // .addField('.name', [
   //    {
   //       rule: 'pattern',
   //       value: '^[A-Za-zА-Яа-яЁё\s]{6,}',
   //       errorMessage: "Ошибка"
   //    }
   // ])
   .addField('.mail', [
      {
         rule: 'required',
         errorMessage: 'Не введен E-mail'
      },
      {
         rule: 'email',
         errorMessage: 'Не корректно введен E-mail'
      }
   ])
   .addField('.check', [
      {
         rule: 'required',
         errorMessage: "Не отмечено согласие"
      }
   ]);

function allLetter(uname) {
   var letters = /^[A-Za-z]+$/;
   if (uname.value.match(letters)) {
      return true;
   }
   else {
      alert('Username must have alphabetcharactersonly');
      uname.focus();
      return false;
   }
}
