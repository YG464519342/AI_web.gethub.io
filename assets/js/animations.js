/**
 * 趣味答题平台 - 交互动画脚本
 * 实现3D黏土卡片效果、进度条动画和平滑滚动
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========== 卡片悬停3D效果 ==========
  const cards = document.querySelectorAll('.clay-card');

  cards.forEach(card => {
    // 鼠标移动时的3D倾斜效果
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 计算旋转角度(减小除数以增加效果)
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    // 鼠标离开时重置
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });

    // 键盘支持(Enter和Space键)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // ========== 进度条动画 ==========
  const progressBar = document.querySelector('.progress-fill');
  if (progressBar) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progress = progressBar.dataset.progress;
          // 延迟200ms后开始动画
          setTimeout(() => {
            progressBar.style.width = progress + '%';
          }, 200);
          // 只触发一次
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5 // 当元素50%可见时触发
    });

    observer.observe(progressBar);
  }

  // ========== 平滑滚动 ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========== 按钮点击反馈 ==========
  const buttons = document.querySelectorAll('.clay-button');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      // 创建涟漪效果
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');

      button.appendChild(ripple);

      // 300ms后移除涟漪
      setTimeout(() => {
        ripple.remove();
      }, 300);
    });
  });

  // ========== 题目卡片点击事件 ==========
  const subjectCards = document.querySelectorAll('#subjects .clay-card');
  subjectCards.forEach(card => {
    card.addEventListener('click', () => {
      const subject = card.querySelector('h3').textContent;
      console.log(`用户选择了: ${subject}`);
      // 这里可以添加跳转到答题页面的逻辑
      // window.location.href = `/quiz/${subject}`;
    });
  });

  // ========== 滚动时添加动画类 ==========
  const observeElements = document.querySelectorAll('section');
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });

  observeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    fadeInObserver.observe(element);
  });

  // ========== 性能优化: 减少动画(用户偏好) ==========
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    // 禁用所有动画
    document.querySelectorAll('*').forEach(element => {
      element.style.animation = 'none';
      element.style.transition = 'none';
    });
  }

  // ========== 控制台欢迎信息 ==========
  console.log('%c🎯 欢迎来到趣味答题平台!', 'color: #4F46E5; font-size: 20px; font-weight: bold;');
  console.log('%c让学习变得像玩游戏一样有趣!', 'color: #818CF8; font-size: 14px;');
});

// ========== 涟漪效果样式(动态注入) ==========
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.3s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
