/**
 * Interior Adda — Main Vanilla JavaScript for Hostinger
 * Zero build-step / Zero framework dependency
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Sticky Header Scroll Effect
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Drawer Toggle
  var mobileToggle = document.getElementById('mobile-menu-toggle');
  var mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', function () {
      mobileDrawer.classList.toggle('active');
    });
    var mobileLinks = mobileDrawer.querySelectorAll('a');
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  // 3. Service Category Filtering
  var serviceFilterBtns = document.querySelectorAll('[data-service-filter]');
  var serviceCards = document.querySelectorAll('[data-service-cat]');
  serviceFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      serviceFilterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-service-filter');
      serviceCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-service-cat') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Portfolio Category Filtering
  var portfolioFilterBtns = document.querySelectorAll('[data-portfolio-filter]');
  var projectCards = document.querySelectorAll('[data-project-cat]');
  portfolioFilterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      portfolioFilterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-portfolio-filter');
      projectCards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-project-cat') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Interactive Cost Estimator
  var estimatorBhkBtns = document.querySelectorAll('[data-bhk-type]');
  var estimatorPkgCards = document.querySelectorAll('[data-pkg-type]');
  var customSliderWrap = document.getElementById('custom-area-slider-wrap');
  var customSlider = document.getElementById('custom-sqft-slider');
  var customSliderDisplay = document.getElementById('custom-sqft-display');

  var currentBhk = '2bhk';
  var currentArea = 900;
  var currentRate = 1250;
  var currentPkgName = 'Comprehensive Interior';

  var BHK_AREAS = {
    '1bhk': 550,
    '2bhk': 900,
    '3bhk': 1350,
    '4bhk': 2100,
    'custom': 1000,
  };

  var PKG_RATES = {
    'essential': { rate: 950, name: 'Essential Modular' },
    'premium': { rate: 1250, name: 'Comprehensive Interior' },
    'luxury': { rate: 1650, name: 'Ultra Luxury Turnkey' },
  };

  function updateEstimate() {
    var baseline = currentArea * currentRate;
    var upper = Math.round(baseline * 1.15);

    var baseLakhs = (baseline / 100000).toFixed(2);
    var upperLakhs = (upper / 100000).toFixed(2);

    var outputDisplay = document.getElementById('estimate-output-display');
    if (outputDisplay) {
      outputDisplay.innerHTML = '₹' + baseLakhs + ' Lakhs <span style="font-size:1rem;color:#888;">to</span> ₹' + upperLakhs + ' Lakhs';
    }

    var descDisplay = document.getElementById('estimate-output-desc');
    if (descDisplay) {
      descDisplay.textContent = 'Based on ₹' + currentRate + '/sq.ft baseline for ~' + currentArea + ' sq.ft (' + currentPkgName + '). Final quote confirmed after free on-site measurement in Guwahati.';
    }
  }

  estimatorBhkBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      estimatorBhkBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      currentBhk = btn.getAttribute('data-bhk-type');

      if (currentBhk === 'custom') {
        if (customSliderWrap) customSliderWrap.style.display = 'flex';
        currentArea = customSlider ? parseInt(customSlider.value, 10) : 1000;
      } else {
        if (customSliderWrap) customSliderWrap.style.display = 'none';
        currentArea = BHK_AREAS[currentBhk];
      }
      updateEstimate();
    });
  });

  if (customSlider) {
    customSlider.addEventListener('input', function () {
      currentArea = parseInt(customSlider.value, 10);
      if (customSliderDisplay) customSliderDisplay.textContent = currentArea + ' sq. ft.';
      updateEstimate();
    });
  }

  estimatorPkgCards.forEach(function (card) {
    card.addEventListener('click', function () {
      estimatorPkgCards.forEach(function (c) { c.classList.remove('active'); });
      card.classList.add('active');
      var key = card.getAttribute('data-pkg-type');
      if (PKG_RATES[key]) {
        currentRate = PKG_RATES[key].rate;
        currentPkgName = PKG_RATES[key].name;
      }
      updateEstimate();
    });
  });

  // Transfer Estimate to Form
  var btnApplyEstimate = document.getElementById('btn-apply-estimate');
  if (btnApplyEstimate) {
    btnApplyEstimate.addEventListener('click', function () {
      var baseline = (currentArea * currentRate / 100000).toFixed(2);
      var upper = (Math.round(currentArea * currentRate * 1.15) / 100000).toFixed(2);
      var text = 'Estimated Scope: ' + currentBhk.toUpperCase() + ' (~' + currentArea + ' sq.ft) with ' + currentPkgName + ' package. Est: ₹' + baseline + ' – ₹' + upper + ' Lakhs.\nI would like to schedule a free Guwahati site consultation.';

      var messageInput = document.getElementById('contact-message');
      if (messageInput) messageInput.value = text;

      var contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Send Estimate to WhatsApp
  var btnWhatsappEstimate = document.getElementById('btn-whatsapp-estimate');
  if (btnWhatsappEstimate) {
    btnWhatsappEstimate.addEventListener('click', function () {
      var baseline = (currentArea * currentRate / 100000).toFixed(2);
      var upper = (Math.round(currentArea * currentRate * 1.15) / 100000).toFixed(2);
      var msg = 'Hello Interior Adda, I calculated an interior estimate on your website for ' + currentBhk.toUpperCase() + ' (~' + currentArea + ' sq.ft) with ' + currentPkgName + '. Estimated range: ₹' + baseline + ' to ₹' + upper + ' Lakhs. Could we schedule a consultation in Guwahati?';
      window.open('https://wa.me/919101668680?text=' + encodeURIComponent(msg), '_blank');
    });
  }

  // 6. Consultation Booking Modal
  var consultationModal = document.getElementById('consultation-modal');
  var openModalBtns = document.querySelectorAll('[data-open-consultation]');
  var closeModalBtns = document.querySelectorAll('[data-close-modal]');

  openModalBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var svc = btn.getAttribute('data-service-preselect');
      var svcSelect = document.getElementById('modal-service-select');
      if (svc && svcSelect) {
        svcSelect.value = svc;
      }
      if (consultationModal) consultationModal.classList.add('active');
    });
  });

  closeModalBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var overlays = document.querySelectorAll('.modal-overlay');
      overlays.forEach(function (m) { m.classList.remove('active'); });
    });
  });

  // Modal Backdrop Click
  window.addEventListener('click', function (e) {
    if (e.target && e.target.classList.contains('modal-overlay')) {
      e.target.classList.remove('active');
    }
  });

  // Modal Form Submission
  var modalForm = document.getElementById('modal-booking-form');
  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('modal-name').value;
      var phone = document.getElementById('modal-phone').value;
      var loc = document.getElementById('modal-location').value;
      var svc = document.getElementById('modal-service-select').value;

      var body = document.getElementById('modal-body-container');
      if (body) {
        body.innerHTML = '<div style="text-align:center;padding:1.5rem 0;">' +
          '<div style="width:50px;height:50px;border-radius:50%;background:rgba(37,211,102,0.15);border:1px solid #25d366;color:#25d366;font-size:1.5rem;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem auto;">✓</div>' +
          '<h4 style="font-size:1.25rem;color:#fff;font-family:var(--font-serif);margin-bottom:0.5rem;">Booking Requested!</h4>' +
          '<p style="font-size:0.8rem;color:#b0bac8;margin-bottom:1.5rem;">Thank you ' + name + '. Our Guwahati lead designer will call you at <b style="color:#ffd700;">' + phone + '</b> within 24 hours.</p>' +
          '<a href="https://wa.me/919101668680?text=' + encodeURIComponent('Hi Interior Adda, I booked a consultation on your website for ' + svc + ' in ' + loc + '. My phone: ' + phone) + '" target="_blank" class="btn-primary" style="background:#25d366;color:#fff;width:100%;">Confirm Directly On WhatsApp</a>' +
          '</div>';
      }
    });
  }

  // 7. Contact Form AJAX Submission with PHP Endpoint
  var contactForm = document.getElementById('main-contact-form');
  var formAlertSuccess = document.getElementById('contact-alert-success');
  var formAlertError = document.getElementById('contact-alert-error');
  var btnSubmit = document.getElementById('btn-submit-contact');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var fullName = document.getElementById('contact-name').value.trim();
      var phone = document.getElementById('contact-phone').value.trim();
      var email = document.getElementById('contact-email').value.trim();
      var service = document.getElementById('contact-service').value;
      var locationOrArea = document.getElementById('contact-location').value.trim();
      var message = document.getElementById('contact-message').value.trim();

      if (!fullName) {
        showError('Please enter your full name.');
        return;
      }
      var cleanPhone = phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        showError('Please enter a valid 10-digit phone number.');
        return;
      }

      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.textContent = 'Sending Request...';
      }
      hideAlerts();

      var payload = {
        fullName: fullName,
        phone: phone,
        email: email,
        service: service,
        locationOrArea: locationOrArea,
        message: message,
      };

      fetch('api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Schedule Free Site Consultation';
          }
          if (data.success) {
            if (formAlertSuccess) {
              formAlertSuccess.textContent = data.message || 'Thank you! Your enquiry has been received.';
              formAlertSuccess.style.display = 'block';
            }
            contactForm.reset();
          } else {
            showError(data.message || 'Submission could not be completed.');
          }
        })
        .catch(function () {
          // If running locally without PHP web server, provide graceful fallback
          if (btnSubmit) {
            btnSubmit.disabled = false;
            btnSubmit.textContent = 'Schedule Free Site Consultation';
          }
          if (formAlertSuccess) {
            formAlertSuccess.innerHTML = 'Thank you ' + fullName + '! Your consultation request has been prepared.<br><a href="https://wa.me/919101668680?text=' + encodeURIComponent('Hi Interior Adda, I requested a consultation for ' + service + ' in Guwahati. My phone: ' + phone) + '" target="_blank" style="color:#25d366;font-weight:bold;text-decoration:underline;margin-top:4px;display:inline-block;">Click here to connect directly via WhatsApp →</a>';
            formAlertSuccess.style.display = 'block';
          }
        });
    });
  }

  function showError(msg) {
    if (formAlertError) {
      formAlertError.textContent = msg;
      formAlertError.style.display = 'block';
    }
  }

  function hideAlerts() {
    if (formAlertSuccess) formAlertSuccess.style.display = 'none';
    if (formAlertError) formAlertError.style.display = 'none';
  }
});
