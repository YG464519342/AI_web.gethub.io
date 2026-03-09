/**
 * 趣味答题平台 - 用户认证逻辑
 * 实现登录、注册、验证码发送等功能
 */

// ========== 工具函数 ==========

// 验证手机号格式
function validatePhone(phone) {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
}

// 验证用户名格式
function validateUsername(username) {
  const usernameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9]{3,20}$/;
  return usernameRegex.test(username);
}

// 验证密码强度
function validatePassword(password) {
  return password.length >= 6;
}

// 显示提示消息
function showMessage(message, type = 'info') {
  const colors = {
    success: 'from-green-500 to-emerald-500',
    error: 'from-red-500 to-pink-500',
    info: 'from-indigo-500 to-purple-500',
    warning: 'from-yellow-500 to-orange-500'
  };

  const messageDiv = document.createElement('div');
  messageDiv.className = `fixed top-4 right-4 z-50 clay-card bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg animate-bounce-in`;
  messageDiv.textContent = message;

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}

// 模拟发送验证码
function sendVerificationCode(phone) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟验证码（实际应用中应该由后端发送）
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      console.log(`验证码已发送到 ${phone}: ${code}`);
      // 存储到 sessionStorage 供验证使用（仅用于演示）
      sessionStorage.setItem(`code_${phone}`, code);
      resolve(code);
    }, 1000);
  });
}

// 验证验证码
function verifyCode(phone, code) {
  const storedCode = sessionStorage.getItem(`code_${phone}`);
  return storedCode === code;
}

// ========== 登录页面逻辑 ==========
if (document.getElementById('phone-login-form')) {
  const tabPhone = document.getElementById('tab-phone');
  const tabPassword = document.getElementById('tab-password');
  const phoneForm = document.getElementById('phone-login-form');
  const passwordForm = document.getElementById('password-login-form');
  const sendCodeBtn = document.getElementById('send-code-btn');
  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');
  const eyeIcon = document.getElementById('eye-icon');

  // 切换登录方式
  tabPhone.addEventListener('click', () => {
    tabPhone.className = 'flex-1 py-3 px-4 rounded-lg font-semibold transition-all bg-gradient-to-r from-indigo-500 to-purple-500 text-white';
    tabPassword.className = 'flex-1 py-3 px-4 rounded-lg font-semibold transition-all bg-indigo-100 text-indigo-700 hover:bg-indigo-200';
    phoneForm.classList.remove('hidden');
    passwordForm.classList.add('hidden');
  });

  tabPassword.addEventListener('click', () => {
    tabPassword.className = 'flex-1 py-3 px-4 rounded-lg font-semibold transition-all bg-gradient-to-r from-indigo-500 to-purple-500 text-white';
    tabPhone.className = 'flex-1 py-3 px-4 rounded-lg font-semibold transition-all bg-indigo-100 text-indigo-700 hover:bg-indigo-200';
    passwordForm.classList.remove('hidden');
    phoneForm.classList.add('hidden');
  });

  // 发送验证码
  let countdown = 0;
  sendCodeBtn.addEventListener('click', async () => {
    const phone = document.getElementById('phone').value;

    if (!phone) {
      showMessage('请输入手机号码', 'warning');
      return;
    }

    if (!validatePhone(phone)) {
      showMessage('请输入正确的手机号码', 'error');
      return;
    }

    if (countdown > 0) {
      return;
    }

    try {
      sendCodeBtn.disabled = true;
      sendCodeBtn.textContent = '发送中...';

      await sendVerificationCode(phone);
      showMessage('验证码已发送', 'success');

      // 开始倒计时
      countdown = 60;
      const timer = setInterval(() => {
        countdown--;
        sendCodeBtn.textContent = `${countdown}秒后重试`;

        if (countdown <= 0) {
          clearInterval(timer);
          sendCodeBtn.disabled = false;
          sendCodeBtn.textContent = window.langManager ? window.langManager.t('sendCode') : '发送验证码';
        }
      }, 1000);
    } catch (error) {
      showMessage('发送失败,请稍后重试', 'error');
      sendCodeBtn.disabled = false;
      sendCodeBtn.textContent = window.langManager ? window.langManager.t('sendCode') : '发送验证码';
    }
  });

  // 手机验证码登录
  phoneForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = document.getElementById('phone').value;
    const code = document.getElementById('code').value;

    if (!validatePhone(phone)) {
      showMessage('请输入正确的手机号码', 'error');
      return;
    }

    if (!code || code.length !== 6) {
      showMessage('请输入6位验证码', 'error');
      return;
    }

    // 验证验证码
    if (!verifyCode(phone, code)) {
      showMessage('验证码错误', 'error');
      return;
    }

    // 模拟登录成功
    const user = {
      phone: phone,
      username: `用户${phone.slice(-4)}`,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(user));
    showMessage('登录成功!', 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });

  // 密码登录
  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    if (!username) {
      showMessage('请输入用户名或手机号', 'error');
      return;
    }

    if (!password) {
      showMessage('请输入密码', 'error');
      return;
    }

    // 从 localStorage 获取注册用户信息
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u =>
      u.username === username || u.phone === username
    );

    if (!user || user.password !== password) {
      showMessage('用户名或密码错误', 'error');
      return;
    }

    // 登录成功
    const currentUser = {
      phone: user.phone,
      username: user.username,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    if (remember) {
      localStorage.setItem('rememberedUser', username);
    }

    showMessage('登录成功!', 'success');

    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  });

  // 切换密码可见性
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.textContent = '🙈';
      } else {
        passwordInput.type = 'password';
        eyeIcon.textContent = '👁️';
      }
    });
  }

  // 自动填充记住的用户名
  const rememberedUser = localStorage.getItem('rememberedUser');
  if (rememberedUser) {
    document.getElementById('username').value = rememberedUser;
    document.getElementById('remember').checked = true;
  }
}

// ========== 注册页面逻辑 ==========
if (document.getElementById('register-form')) {
  const registerForm = document.getElementById('register-form');
  const sendRegCodeBtn = document.getElementById('send-reg-code-btn');
  const toggleRegPasswordBtn = document.getElementById('toggle-reg-password');
  const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');
  const regPasswordInput = document.getElementById('reg-password');
  const confirmPasswordInput = document.getElementById('reg-confirm-password');
  const regEyeIcon = document.getElementById('reg-eye-icon');
  const confirmEyeIcon = document.getElementById('confirm-eye-icon');

  // 发送注册验证码
  let regCountdown = 0;
  sendRegCodeBtn.addEventListener('click', async () => {
    const phone = document.getElementById('reg-phone').value;

    if (!phone) {
      showMessage('请输入手机号码', 'warning');
      return;
    }

    if (!validatePhone(phone)) {
      showMessage('请输入正确的手机号码', 'error');
      return;
    }

    if (regCountdown > 0) {
      return;
    }

    // 检查手机号是否已注册
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.phone === phone)) {
      showMessage('该手机号已注册', 'error');
      return;
    }

    try {
      sendRegCodeBtn.disabled = true;
      sendRegCodeBtn.textContent = '发送中...';

      await sendVerificationCode(phone);
      showMessage('验证码已发送', 'success');

      // 开始倒计时
      regCountdown = 60;
      const timer = setInterval(() => {
        regCountdown--;
        sendRegCodeBtn.textContent = `${regCountdown}秒后重试`;

        if (regCountdown <= 0) {
          clearInterval(timer);
          sendRegCodeBtn.disabled = false;
          sendRegCodeBtn.textContent = window.langManager ? window.langManager.t('sendCode') : '发送验证码';
        }
      }, 1000);
    } catch (error) {
      showMessage('发送失败,请稍后重试', 'error');
      sendRegCodeBtn.disabled = false;
      sendRegCodeBtn.textContent = window.langManager ? window.langManager.t('sendCode') : '发送验证码';
    }
  });

  // 注册表单提交
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phone = document.getElementById('reg-phone').value;
    const code = document.getElementById('reg-code').value;
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const agreeTerms = document.getElementById('agree-terms').checked;

    // 验证手机号
    if (!validatePhone(phone)) {
      showMessage('请输入正确的手机号码', 'error');
      return;
    }

    // 验证验证码
    if (!code || code.length !== 6) {
      showMessage('请输入6位验证码', 'error');
      return;
    }

    if (!verifyCode(phone, code)) {
      showMessage('验证码错误', 'error');
      return;
    }

    // 验证用户名
    if (!validateUsername(username)) {
      showMessage('用户名格式不正确', 'error');
      return;
    }

    // 验证密码
    if (!validatePassword(password)) {
      showMessage('密码至少需要6个字符', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showMessage('两次输入的密码不一致', 'error');
      return;
    }

    if (!agreeTerms) {
      showMessage('请阅读并同意用户协议和隐私政策', 'warning');
      return;
    }

    // 检查用户名和手机号是否已存在
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(u => u.phone === phone)) {
      showMessage('该手机号已注册', 'error');
      return;
    }

    if (users.some(u => u.username === username)) {
      showMessage('该用户名已被使用', 'error');
      return;
    }

    // 注册成功
    const newUser = {
      phone: phone,
      username: username,
      password: password,
      registerTime: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // 清除验证码
    sessionStorage.removeItem(`code_${phone}`);

    showMessage('注册成功!即将跳转到登录页面...', 'success');

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });

  // 切换密码可见性
  if (toggleRegPasswordBtn) {
    toggleRegPasswordBtn.addEventListener('click', () => {
      if (regPasswordInput.type === 'password') {
        regPasswordInput.type = 'text';
        regEyeIcon.textContent = '🙈';
      } else {
        regPasswordInput.type = 'password';
        regEyeIcon.textContent = '👁️';
      }
    });
  }

  if (toggleConfirmPasswordBtn) {
    toggleConfirmPasswordBtn.addEventListener('click', () => {
      if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        confirmEyeIcon.textContent = '🙈';
      } else {
        confirmPasswordInput.type = 'password';
        confirmEyeIcon.textContent = '👁️';
      }
    });
  }

  // 实时验证密码匹配
  confirmPasswordInput.addEventListener('input', () => {
    const password = regPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword && password !== confirmPassword) {
      confirmPasswordInput.style.borderColor = '#EF4444';
    } else {
      confirmPasswordInput.style.borderColor = '#C7D2FE';
    }
  });
}

// ========== 添加淡出动画 ==========
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }
`;
document.head.appendChild(style);
