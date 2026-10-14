/**
 * ==============================================================================
 * شركة كلين المثالية - المحرك البرمجي التفاعلي للموقع
 * Clean Almithalia - Official Vanilla JavaScript
 * ==============================================================================
 */

// معالجة فورية وتلقائية لأي خطأ في تحميل الصور
window.addEventListener('error', (e) => {
  if (e.target && e.target.tagName === 'IMG') {
    const img = e.target;
    const currentSrc = img.getAttribute('src');
    const step = parseInt(img.dataset.fallbackStep || '0', 10);
    if (currentSrc && step < 3) {
      img.dataset.fallbackStep = (step + 1).toString();
      if (currentSrc.endsWith('.jpg')) {
        img.src = currentSrc.replace(/\.jpg$/, '.jpeg');
      } else if (currentSrc.endsWith('.jpeg')) {
        img.src = currentSrc.replace(/\.jpeg$/, '.jpg');
      } else if (currentSrc.endsWith('.webp')) {
        img.src = currentSrc.replace(/\.webp$/, '.jpeg');
      } else if (currentSrc.endsWith('.png')) {
        img.src = currentSrc.replace(/\.png$/, '.PNG');
      } else if (currentSrc.endsWith('.PNG')) {
        img.src = currentSrc.replace(/\.PNG$/, '.png');
      }
    }
  }
}, true);

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
   * 1. قسم الإعدادات والمتغيرات القابلة للتعديل بسهولة (CONFIG)
   * ========================================================================== */

  // رقم الواتساب الرسمي (بدون أصفار زائدة أو علامة +)
  // لتغيير رقم التواصل عدل القيمة هنا:
  const COMPANY_PHONE = '0564477200';
  const WHATSAPP_NUMBER = '966564477200';

  // معادلات وتكاليف حاسبة الأسعار (ريال سعودي)
  const PRICING_CONFIG = {
    // 1. مكافحة حشرات شقق 150 ريال
    pest_apt: {
      name: 'مكافحة حشرات شقق',
      basePrice: 150,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 2. مكافحة جميع أنواع الحشرات فيلا 200 ريال
    pest_villa: {
      name: 'مكافحة جميع أنواع الحشرات (فيلا)',
      basePrice: 200,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // مكافحة الفئران والنمل الأبيض والصراصير
    pest_termites: {
      name: 'مكافحة الفئران والنمل الأبيض والصراصير',
      basePrice: 200,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 3. تنظيف الشقة 400 ريال
    cleaning_apt: {
      name: 'تنظيف الشقة بالكامل',
      basePrice: 400,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 4. تنظيف الفيلا 1000 ريال
    cleaning_villa: {
      name: 'تنظيف الفيلا بالكامل',
      basePrice: 1000,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 5. تنظيف المطبخ 250 ريال
    cleaning_kitchen: {
      name: 'تنظيف المطبخ والتعقيم الشامل',
      basePrice: 250,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 6. تنظيف الكنب 7 أشخاص 149 ريال
    sofa_7: {
      name: 'تنظيف الكنب (7 أشخاص)',
      basePrice: 149,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 7. تنظيف المجالس 149 ريال
    majlis: {
      name: 'تنظيف المجالس العربية',
      basePrice: 149,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 8. تنظيف مجلس + ستارة وسجادة 200 ريال
    majlis_combo: {
      name: 'تنظيف مجلس + ستارة وسجادة',
      basePrice: 200,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 9. تنظيف المراتب 149 ريال
    mattress: {
      name: 'تنظيف وتعقيم المراتب',
      basePrice: 149,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 10. تنظيف وتعقيم خزان المياه 150 ريال
    tank_1: {
      name: 'تنظيف وتعقيم خزان مياه واحد',
      basePrice: 150,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 11. تنظيف وتعقيم خزانين 250 ريال
    tank_2: {
      name: 'تنظيف وتعقيم خزانين',
      basePrice: 250,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 12. تنظيف وتعقيم ثلاث خزانات 350 ريال
    tank_3: {
      name: 'تنظيف وتعقيم ثلاث خزانات',
      basePrice: 350,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 13. عزل الخزان 999 ريال
    tank_insulation: {
      name: 'عزل الخزان إيبوكسي معتمد',
      basePrice: 999,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 14. عزل الأسطح المتر 20 ريال
    roof_insulation: {
      name: 'عزل الأسطح (مائي وحراري)',
      basePrice: 20,
      thresholdArea: 1,
      ratePerExtraMeter: 20,
      hasArea: true
    },
    // 15. عازل مواسير المتر 30 ريال
    pipe_insulation: {
      name: 'عازل مواسير المياه',
      basePrice: 30,
      thresholdArea: 1,
      ratePerExtraMeter: 30,
      hasArea: true
    },
    // 16. تسليك المجاري وإزالة الروائح الكريهة 200 ريال
    drains_unblock: {
      name: 'تسليك المجاري وإزالة الروائح الكريهة',
      basePrice: 200,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 17. شفط بيارات 200 ريال
    septic_tank: {
      name: 'شفط بيارات (وايت مجهز)',
      basePrice: 200,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 18. كشف تسريب المياه 100 ريال
    leak_detection: {
      name: 'كشف تسريب المياه إلكترونياً',
      basePrice: 100,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 19. صيانة أفران الغاز 100 ريال
    oven_maint: {
      name: 'صيانة أفران الغاز المنزلية',
      basePrice: 100,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // 20. تنظيف إفران الغاز مع الصيانة 149 ريال
    oven_clean_maint: {
      name: 'تنظيف أفران الغاز مع الصيانة',
      basePrice: 149,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    // مفاتيح التوافق القديمة
    pest: {
      name: 'مكافحة الحشرات والقوارض',
      basePrice: 150,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    cleaning: {
      name: 'النظافة العامة والفلل',
      basePrice: 400,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    sofa: {
      name: 'غسيل المجالس والكنب',
      basePrice: 149,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    tanks: {
      name: 'غسيل وعزل الخزانات',
      basePrice: 150,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    },
    drains: {
      name: 'تسليك المجاري والبيارات',
      basePrice: 200,
      thresholdArea: 0,
      ratePerExtraMeter: 0,
      hasArea: false
    }
  };

  // بيانات آراء العملاء (يمكنك إضافة أو تعديل التقييمات بحرية)
  const CUSTOMER_REVIEWS = [
    {
      name: 'أبو فهد الخالدي',
      location: 'حي الشاطئ، الدمام',
      rating: 5,
      comment: 'تجربة ممتازة جداً معهم في رش النمل الأبيض ومكافحة الحشرات قبل السكن، التزام دقيق بالمواعيد ومبيدات بدون أي رائحة، والفني شرح لي كافة تفاصيل الضمان بكل أمانة.'
    },
    {
      name: 'أم عبد العزيز',
      location: 'حي الحزام الذهبي، الخبر',
      rating: 5,
      comment: 'طلبنا خدمة جلي الرخام وغسيل طقمين كنب ومجلس كامل، النتيجة كانت مبهرة وكأن الأثاث جديد تماماً! عمالة محترمة ومنضبطة وسرعة فائقة في الإنجاز.'
    },
    {
      name: 'م. خالد الدوسري',
      location: 'حي الدوحة، الظهران',
      rating: 5,
      comment: 'تم غسيل وتعقيم خزان المياه الأرضي والعلوي مع عمل عزل إيبوكسي معتمد، ما شاء الله نظافة لا غبار عليها ومتابعة دورية راقية من خدمة العملاء. أنصح بالتعامل معهم بشدة.'
    }
  ];

  /* ==========================================================================
   * 2. شريط التقدم العلوي والهيدر التفاعلي
   * ========================================================================== */
  const header = document.getElementById('main-header');
  const scrollProgress = document.getElementById('scroll-progress');
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

    // تحديث شريط التقدم الذهبي
    if (scrollProgress) {
      scrollProgress.style.transform = `scaleX(${scrollPercent})`;
    }

    // تصغير الهيدر وإضافة الظل عند السكرول
    if (header) {
      if (scrollTop > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // فتح وإغلاق قائمة الموبايل
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // إغلاق القائمة عند الضغط على أي رابط
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
   * 3. عدّاد الأرقام المتحرك (Animated Stats Counters)
   * ========================================================================== */
  const statNumbers = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function runCounters() {
    if (countersAnimated) return;
    countersAnimated = true;

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10) || 0;
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 1800; // مدة العد بالميلي ثانية
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // دالة التباطؤ لنعومة الحركة (easeOutQuad)
        const ease = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(ease * target);

        stat.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          stat.textContent = `${prefix}${target}${suffix}`;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsSection);
  } else {
    // في حال عدم دعم المراقب يتم التشغيل مباشرة
    runCounters();
  }

  /* ==========================================================================
   * 4. سلايدر صور كروت الخدمات (Service Cards Mini Slider)
   * ========================================================================== */
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    const gallery = card.querySelector('.service-gallery');
    const nextBtn = card.querySelector('.gallery-next-btn');
    if (!gallery || !nextBtn) return;

    const images = gallery.querySelectorAll('.service-img');
    if (images.length <= 1) {
      nextBtn.style.display = 'none';
      return;
    }

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      let currentIndex = parseInt(gallery.getAttribute('data-current-index') || '0', 10);
      images[currentIndex].classList.remove('active');

      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
      gallery.setAttribute('data-current-index', currentIndex.toString());
    });
  });

  /* ==========================================================================
   * 5. التحكم التلقائي بفيديو آلية العمل (Process Video Observer)
   * ========================================================================== */
  const processVideo = document.getElementById('process-video');
  const processSection = document.getElementById('how-it-works');

  if (processVideo && processSection) {
    const isMobile = window.innerWidth < 768;
    if (!isMobile && 'IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            processVideo.play().catch(() => {
              // التعامل مع متصفحات تمنع التشغيل التلقائي
            });
          } else {
            processVideo.pause();
          }
        });
      }, { threshold: 0.3 });

      videoObserver.observe(processSection);
    } else {
      // الحفاظ على خفة وسرعة الموقع على الجوال بدون استهلاك بيانات الفيديو
      processVideo.pause();
    }
  }

  /* ==========================================================================
   * 6. شريط مقارنة قبل وبعد التفاعلي (Before / After Slider)
   * ========================================================================== */
  // تبديل المقارنات الثلاث عبر التبويبات
  const baTabButtons = document.querySelectorAll('.ba-tab-btn');
  const baSliders = document.querySelectorAll('.ba-slider-container');

  baTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      baTabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      baSliders.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetId = btn.getAttribute('data-target-comparison');
      const targetSlider = document.getElementById(targetId);
      if (targetSlider) {
        targetSlider.classList.add('active');
        // إعادة ضبط موضع المقبض في المنتصف
        const range = targetSlider.querySelector('.ba-range-input');
        if (range) {
          range.value = 50;
          updateSliderPosition(targetSlider, 50);
        }
      }
    });
  });

  // تحديث أشرطة السحب لجميع المقارنات
  function updateSliderPosition(sliderContainer, percentage) {
    const beforeLayer = sliderContainer.querySelector('.ba-before-layer');
    const handle = sliderContainer.querySelector('.ba-handle');
    if (beforeLayer && handle) {
      // نظراً للاتجاه RTL: طبقة "قبل" تبدأ من اليمين
      beforeLayer.style.width = `${percentage}%`;
      handle.style.right = `${percentage}%`;
    }
  }

  baSliders.forEach(slider => {
    const rangeInput = slider.querySelector('.ba-range-input');
    if (!rangeInput) return;

    rangeInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      updateSliderPosition(slider, val);
    });

    // تهيئة الموضع المبدئي
    updateSliderPosition(slider, parseFloat(rangeInput.value));
  });

  /* ==========================================================================
   * 6.5. تبويبات تصفية قائمة الأسعار (Pricing Filter Tabs)
   * ========================================================================== */
  const priceTabButtons = document.querySelectorAll('.price-tab-btn');
  const priceItemCards = document.querySelectorAll('.price-item-card');

  if (priceTabButtons.length > 0 && priceItemCards.length > 0) {
    priceTabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        priceTabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetCategory = btn.getAttribute('data-category');
        priceItemCards.forEach(card => {
          const cardCat = card.getAttribute('data-cat');
          if (targetCategory === 'all' || cardCat === targetCategory) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ==========================================================================
   * 7. حاسبة السعر التقريبي (Price Calculator)
   * ========================================================================== */
  const calcServiceSelect = document.getElementById('calc-service');
  const calcAreaInput = document.getElementById('calc-area');
  const calcAreaGroup = document.getElementById('calc-area-group');
  const areaValLabel = document.getElementById('area-val-label');
  const btnCalculate = document.getElementById('btn-calculate');
  const calculatedPriceElem = document.getElementById('calculated-price');
  const btnCalcWhatsapp = document.getElementById('btn-calc-whatsapp');

  function calculateAndDisplayPrice() {
    if (!calcServiceSelect || !calculatedPriceElem) return;

    const selectedKey = calcServiceSelect.value;
    const config = PRICING_CONFIG[selectedKey];
    if (!config) return;

    // إذا كانت الخدمة لا تحتاج مساحة
    if (!config.hasArea) {
      if (calcAreaGroup) calcAreaGroup.style.display = 'none';
      calculatedPriceElem.textContent = config.basePrice.toString();
      updateCalcWhatsappLink(config.name, null, config.basePrice);
      return;
    }

    if (calcAreaGroup) calcAreaGroup.style.display = 'flex';

    const area = parseInt(calcAreaInput ? calcAreaInput.value : '10', 10);
    if (areaValLabel) {
      areaValLabel.textContent = `${area} م`;
    }

    // حساب السعر بالمعادلة المحددة
    let finalPrice = config.basePrice;
    if (area > config.thresholdArea) {
      const extraArea = area - config.thresholdArea;
      finalPrice += extraArea * config.ratePerExtraMeter;
    }

    // تقريب السعر لأقرب عدد صحيح
    finalPrice = Math.round(finalPrice);
    calculatedPriceElem.textContent = finalPrice.toString();

    updateCalcWhatsappLink(config.name, area, finalPrice);
  }

  function updateCalcWhatsappLink(serviceName, area, price) {
    if (!btnCalcWhatsapp) return;

    let messageText = `السلام عليكم ورحمة الله، أرغب بالاستفسار والحجز للخدمة التالية:\n` +
      `الخدمة: ${serviceName}\n`;
    if (area !== null) {
      messageText += `الكمية / المساحة: ${area}\n`;
    }
    messageText += `السعر التقديري: ${price} ريال\n` +
      `كود الخصم والمشرف: _xx__a.7.m.e.d__xx_\n` +
      `أرجو إفادتي بالتأكيد وتحديد أقرب موعد للمعاينة والتنفيذ.`;

    const encoded = encodeURIComponent(messageText);
    btnCalcWhatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  }

  if (calcServiceSelect) {
    calcServiceSelect.addEventListener('change', calculateAndDisplayPrice);
  }

  if (calcAreaInput) {
    calcAreaInput.addEventListener('input', calculateAndDisplayPrice);
  }

  if (btnCalculate) {
    btnCalculate.addEventListener('click', calculateAndDisplayPrice);
  }

  // الحساب المبدئي عند تحميل الصفحة
  calculateAndDisplayPrice();

  /* ==========================================================================
   * 8. عرض آراء العملاء (Render Testimonials)
   * ========================================================================== */
  const testimonialsGrid = document.getElementById('testimonials-grid');

  if (testimonialsGrid && CUSTOMER_REVIEWS.length > 0) {
    testimonialsGrid.innerHTML = CUSTOMER_REVIEWS.map(item => {
      const firstLetter = item.name.trim().charAt(0) || 'ع';
      const stars = '★'.repeat(item.rating) + '☆'.repeat(5 - item.rating);
      return `
        <article class="testimonial-card">
          <div class="testimonial-rating" aria-label="تقييم ${item.rating} من 5">
            <span class="testimonial-star">${stars}</span>
          </div>
          <p class="testimonial-quote">"${item.comment}"</p>
          <div class="testimonial-author">
            <div class="author-avatar" aria-hidden="true">${firstLetter}</div>
            <div>
              <h4 class="author-name">${item.name}</h4>
              <span class="author-loc">${item.location}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* ==========================================================================
   * 9. الأكورديون للأسئلة الشائعة (FAQ Accordion)
   * ========================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const headerBtn = item.querySelector('.faq-header');
    if (!headerBtn) return;

    headerBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // إغلاق بقية الأسئلة لسلاسة التصفح
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.faq-header');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      // فتح أو إغلاق السؤال الحالي
      if (!isActive) {
        item.classList.add('active');
        headerBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ==========================================================================
   * 10. التحقق من نموذج الحجز السريع وإرسال واتساب (Fast Booking Form)
   * ========================================================================== */
  const bookingForm = document.getElementById('fast-booking-form');
  const bookName = document.getElementById('book-name');
  const bookPhone = document.getElementById('book-phone');
  const bookCity = document.getElementById('book-city');
  const bookService = document.getElementById('book-service');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;

      // 1. التحقق من الاسم
      const nameVal = bookName ? bookName.value.trim() : '';
      const nameGroup = bookName ? bookName.closest('.form-group') : null;
      if (!nameVal || nameVal.length < 2) {
        if (nameGroup) nameGroup.classList.add('has-error');
        hasError = true;
      } else {
        if (nameGroup) nameGroup.classList.remove('has-error');
      }

      // 2. التحقق من الجوال السعودي: يبدأ بـ 05 ويتكون من 10 أرقام
      const phoneVal = bookPhone ? bookPhone.value.trim() : '';
      const phoneGroup = bookPhone ? bookPhone.closest('.form-group') : null;
      const saudiPhoneRegex = /^05\d{8}$/;

      if (!phoneVal || !saudiPhoneRegex.test(phoneVal)) {
        if (phoneGroup) phoneGroup.classList.add('has-error');
        hasError = true;
      } else {
        if (phoneGroup) phoneGroup.classList.remove('has-error');
      }

      // 3. التحقق من المدينة
      const cityVal = bookCity ? bookCity.value : '';
      const cityGroup = bookCity ? bookCity.closest('.form-group') : null;
      if (!cityVal) {
        if (cityGroup) cityGroup.classList.add('has-error');
        hasError = true;
      } else {
        if (cityGroup) cityGroup.classList.remove('has-error');
      }

      // 4. التحقق من نوع الخدمة
      const serviceVal = bookService ? bookService.value : '';
      const serviceGroup = bookService ? bookService.closest('.form-group') : null;
      if (!serviceVal) {
        if (serviceGroup) serviceGroup.classList.add('has-error');
        hasError = true;
      } else {
        if (serviceGroup) serviceGroup.classList.remove('has-error');
      }

      if (hasError) {
        // التمرير لأول حقل يحتوي على خطأ
        const firstError = bookingForm.querySelector('.has-error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // تجهيز الرسالة بتنسيق الواتساب المطلوب بالضبط
      const whatsappMessage =
        `السلام عليكم، أرغب بحجز خدمة.\n` +
        `الاسم: ${nameVal}\n` +
        `رقم الجوال: ${phoneVal}\n` +
        `المدينة / الحي: ${cityVal}\n` +
        `الخدمة المطلوبة: ${serviceVal}`;

      const targetUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

      // فتح رابط الواتساب بطريقة آمنة ومتوافقة مع بيئة iFrame
      const waLink = document.createElement('a');
      waLink.href = targetUrl;
      waLink.target = '_blank';
      waLink.rel = 'noopener noreferrer';
      document.body.appendChild(waLink);
      waLink.click();
      document.body.removeChild(waLink);
    });

    // إزالة رسائل الخطأ عند الكتابة
    [bookName, bookPhone, bookCity, bookService].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
      input.addEventListener('change', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });
  }

});
