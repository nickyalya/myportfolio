const featureTabs = document.querySelectorAll('.feature-tab');
const featureNumber = document.querySelector('.feature-number');
const featureTitle = document.querySelector('.feature-copy h3');
const featureDescription = document.querySelector('.feature-copy p');
const featureList = document.querySelector('.feature-copy ul');

const featureContent = [
  {
    number: '1',
    title: 'GHG Measurement',
    description: 'Measure all GHG emission sources, support Scope 1, 2 and 3, and surface data-driven insights to prioritize action.',
    items: ['Measure all GHG emission sources', 'Support for Scope 1, 2 & 3', 'Data-driven insights and analytics']
  },
  {
    number: '2',
    title: 'ESG Disclosure',
    description: 'Generate ESG disclosures aligned with recognised standards and improve transparency across reporting cycles.',
    items: ['Track sustainability KPIs', 'Align with recognized frameworks', 'Simplify disclosure preparation']
  },
  {
    number: '3',
    title: 'Instant Standard Compliant Report',
    description: 'Generate detailed reports instantly in formats aligned with the GHG Protocol and investor requirements.',
    items: ['Automated reporting workflow', 'Compliant presentation formats', 'Fast executive-ready outputs']
  },
  {
    number: '4',
    title: 'Offset & REC Inventory Management',
    description: 'Easily track and manage your carbon credits and RECs in one place with clear operational visibility.',
    items: ['Inventory tracking and reconciliation', 'Portfolio-level oversight', 'Proven reduction planning']
  },
  {
    number: '5',
    title: 'Target Setting',
    description: 'Quantify your organisation’s carbon footprint and establish realistic targets grounded in measured baseline data.',
    items: ['Scope-based baselines', 'Target forecasting and comparison', 'Action-oriented planning']
  },
  {
    number: '6',
    title: 'Mitigation Action Tracking & Management',
    description: 'Monitor and measure the impact of your projects to reduce emissions and improve delivery accountability.',
    items: ['Project-level tracking', 'Implementation progress visibility', 'Impact measurement and reporting']
  }
];

if (featureTabs.length && featureNumber && featureTitle && featureDescription && featureList) {
  function renderFeature(index) {
    const content = featureContent[index];
    featureNumber.textContent = content.number;
    featureTitle.textContent = content.title;
    featureDescription.textContent = content.description;
    featureList.innerHTML = content.items.map((item) => `<li>${item}</li>`).join('');
  }

  featureTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      featureTabs.forEach((item) => item.classList.toggle('active', item === tab));
      renderFeature(Number(tab.dataset.feature));
    });
  });
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  const icon = item.querySelector('.plus');
  if (button) {
    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((entry) => {
        entry.classList.remove('open');
        const entryIcon = entry.querySelector('.plus');
        if (entryIcon) entryIcon.textContent = '+';
      });

      if (!isOpen) {
        item.classList.add('open');
        if (icon) icon.textContent = '−';
      }
    });
  }
});

const revealItems = document.querySelectorAll('.hero, .partners-strip, .platform-section, .simplify, .feature-panel-shell, .pricing-section, .journey, .cta-banner, .site-footer, .page-hero, .contact-page, .faq-shell');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.style.transition = 'all 0.6s ease';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => {
  item.style.opacity = '0';
  item.style.transform = 'translateY(18px)';
  item.style.transition = 'all 0.6s ease';
  revealObserver.observe(item);
});
