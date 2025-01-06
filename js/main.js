
const globalObj = {
  oldScroll: 0,
  counter: false
}

const navbar = document.querySelector('nav.navbar');

// Init
function init() {
  allSections();
}

// Load All Sections
function allSections() {
  headerSection();
  setCounterVal();
  faqSection();
}

// Header Section
function headerSection() {
  const section = document.querySelector('header.header-section');
  if (section) {
    section.style.minHeight = window.innerHeight + 'px';
  }
}

// FAQ Section
function faqSection() {
  const section = document.querySelector('.faq-section');
  if (section) {
    section.querySelector('.text-content').addEventListener('click', function(e) {
      if (e.target.closest('.btn-faq')) {
        let faq = e.target.closest('.faq-item'),
            newBs = new bootstrap.Collapse(faq.querySelector('.faq-content'));
        if (!faq.classList.contains('active') && section.querySelector('.faq-item.active')) {
          let oldFaq = section.querySelector('.faq-item.active');
          oldFaq.classList.remove('active');
          let oldBs = new bootstrap.Collapse(oldFaq.querySelector('.faq-content'));
          oldBs.hide();
          faq.classList.add('active');
          newBs.show();
        } else if (!faq.classList.contains('active')) {
          faq.classList.add('active');
          newBs.show();
        } else {
          faq.classList.remove('active');
          newBs.hide();
        }
      }
    });
  }
}

// *** Events ***
window.addEventListener('resize', resizeEvents); // Resize
window.addEventListener('scroll', scrollEvent); // Scroll

// Resize Event
function resizeEvents() {
  headerSection();
}

// Scroll Event
function scrollEvent() {
  // Reverse Scroll
  if (this.scrollY < globalObj.oldScroll && this.scrollY > 300) {
    navbar.classList.add('fixed-top');
    navbar.classList.remove('position-absolute');
  } else if (this.scrollY > globalObj.oldScroll || this.scrollY < 300) {
    navbar.classList.add('scroll-rev');
    setTimeout(function() {
      navbar.classList.add('position-absolute');
      navbar.classList.remove('fixed-top');
      navbar.classList.remove('scroll-rev');
    }, 160);
  }
  globalObj.oldScroll = this.scrollY;

  // Close mob menu on scroll
  if (this.innerWidth <= 767 && !navbar.querySelector('.navbar-toggler').classList.contains('collapsed')) {
    navbar.querySelector('.navbar-toggler').click();
  }

  // Check for counters
  if (globalObj.counter) {
    counterEvents(window.scrollY + window.innerHeight);
  }

}

// Set counter values
function setCounterVal() {
  if (document.querySelector('.counter-container')) {
    if (!document.querySelector('.counter-container').classList.contains('countVal')) {
      document.querySelector('.counter-container').classList.add('countVal');
      document.querySelectorAll('.counter-container').forEach(item => {
        // Get CSS padding for counter element and section
        const containerPos = Number(window.getComputedStyle(item).getPropertyValue('padding-top').replace('px', '')) + Number(window.getComputedStyle(item.closest('section')).getPropertyValue('padding-top').replace('px', ''));
        const counter = item.querySelectorAll('.counter');
        // Save it in attr
        counter.forEach(innerItem => {
          innerItem.setAttribute('data-pos', containerPos + innerItem.offsetTop);
        })
      });
      globalObj.counter = true;
    }
    counterEvents(window.scrollY + window.innerHeight);
  }
}

// Counter events
function counterEvents(num) {
  document.querySelectorAll('.counter-container').forEach(item => { 
    const counter = item.querySelectorAll('.counter');
    const sectionPos = item.closest('section').offsetTop;
    counter.forEach(innerItem => {
      let itemPos = Number(innerItem.getAttribute('data-pos')) + 20; 
      if ((num - sectionPos) > itemPos) {
        // Prevent the repeat
        if (!innerItem.classList.contains('done-count')) {
          innerItem.classList.add('done-count');
          // Fire counter animtion
          counterAnim(innerItem, Number(innerItem.getAttribute('data-count')));
        }
      }
    });
  });
}

// Counter animation
function counterAnim(item, num) {
  const numEle = item.querySelector('.num');
  let speed = 8;

  if (num > 500) {
    speed = 4;
  }

  const anim = setInterval(frame, speed);

  function frame() {
    if (Number(numEle.textContent) >= num) {
      // Stop animtion
      clearInterval(anim);
    } else {
      numEle.textContent = Number(numEle.textContent) + 1;
    }
  }
}

(function() {
  'use strict';

  init();

  // On page loading
  window.onload = function() {
    document.querySelector('.overlay-loader').classList.add('done');
    setTimeout(function() {
      document.querySelector('.overlay-loader').remove();
      // Call AOS Animation
      AOS.init({once: true});
    }, 150);
  }

}());