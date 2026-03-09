// 国际化翻译数据
const translations = {
  zh: {
    // 首页翻译
    heroTitle: '🎯 趣味答题平台',
    heroSubtitle: '让学习变得像玩游戏一样有趣!',
    startButton: '立即开始答题 →',
    chooseChallenge: '选择你的挑战',

    // 科目
    math: '数学',
    mathDesc: '挑战你的计算能力',
    chinese: '语文',
    chineseDesc: '提升阅读理解能力',
    english: '英语',
    englishDesc: '掌握英语词汇',
    science: '科学',
    scienceDesc: '探索科学奥秘',
    history: '历史',
    historyDesc: '了解历史故事',
    geography: '地理',
    geographyDesc: '认识世界地理',

    participants: '人参与',
    alreadyHave: '已有',

    // 学习旅程
    learningJourney: '你的学习旅程',
    progressComplete: '完成',
    beginner: '初级',
    intermediate: '中级',
    advanced: '高级',
    expert: '专家',
    completed: '已完成',
    inProgress: '进行中',
    notStarted: '未开始',

    // 排行榜
    leaderboard: '🏆 排行榜',
    consecutiveCorrect: '连续答对',
    questions: '题',
    points: '分',

    // CTA区域
    ctaTitle: '准备好开始你的学习冒险了吗?',
    ctaSubtitle: '加入 10,000+ 学生,让学习变得更有趣!',
    freeRegister: '免费注册 →',
    noCreditCard: '无需信用卡 · 立即开始',

    // 页脚
    footerText: '© 2026 趣味答题平台. 让学习变得更有趣!',

    // 答题页面
    backToHome: '返回首页',
    subject: '科目',
    score: '得分',
    progress: '答题进度',
    questionOf: '第',
    totalQuestions: '题 / 共',
    multipleChoice: '选择题',
    seconds: '秒',
    selectCorrectAnswer: '请选择正确答案',
    submitAnswer: '提交答案',
    nextQuestion: '下一题 →',
    viewResults: '查看结果 🎉',

    // 答题提示
    tipTitle: '答题小贴士',
    tipContent: '仔细阅读题目,选择你认为正确的答案。答对得10分,答错不扣分!',

    // 结果页面
    congratulations: '恭喜完成!',
    yourScore: '你的得分',
    accuracy: '正确率',
    correct: '答对',
    wrong: '答错',
    timeSpent: '用时(秒)',
    tryAgain: '再来一次',

    // 反馈
    correct_feedback: '回答正确!',
    wrong_feedback: '回答错误',
    correct_message: '太棒了!继续保持!',
    wrong_message: '没关系,继续加油!',

    // 登录页面
    loginTitle: '🎯 欢迎回来',
    loginSubtitle: '登录开始你的学习之旅',
    phoneLogin: '手机登录',
    passwordLogin: '密码登录',
    phoneNumber: '手机号码',
    phonePlaceholder: '请输入手机号码',
    verificationCode: '验证码',
    codePlaceholder: '请输入验证码',
    sendCode: '发送验证码',
    loginButton: '登录',
    username: '用户名/手机号',
    usernamePlaceholder: '请输入用户名或手机号',
    password: '密码',
    passwordPlaceholder: '请输入密码',
    rememberMe: '记住我',
    forgotPassword: '忘记密码?',
    orLoginWith: '或使用以下方式登录',
    noAccount: '还没有账号?',
    registerNow: '立即注册 →',

    // 注册页面
    registerTitle: '🎯 加入我们',
    registerSubtitle: '创建账号开始学习之旅',
    phoneHint: '用于接收验证码和账号找回',
    usernameLabel: '用户名',
    usernameRegPlaceholder: '请输入用户名',
    usernameHint: '3-20个字符,支持中英文、数字',
    passwordHint: '至少6个字符',
    confirmPassword: '确认密码',
    confirmPasswordPlaceholder: '请再次输入密码',
    agreeToTerms: '我已阅读并同意',
    userAgreement: '《用户协议》',
    and: '和',
    privacyPolicy: '《隐私政策》',
    registerButton: '注册',
    orRegisterWith: '或使用以下方式注册',
    alreadyHaveAccount: '已有账号?',
    loginNow: '立即登录 →'
  },

  en: {
    // Homepage translations
    heroTitle: '🎯 Fun Quiz Platform',
    heroSubtitle: 'Make learning as fun as playing games!',
    startButton: 'Start Quiz Now →',
    chooseChallenge: 'Choose Your Challenge',

    // Subjects
    math: 'Math',
    mathDesc: 'Challenge your calculation skills',
    chinese: 'Chinese',
    chineseDesc: 'Improve reading comprehension',
    english: 'English',
    englishDesc: 'Master English vocabulary',
    science: 'Science',
    scienceDesc: 'Explore scientific mysteries',
    history: 'History',
    historyDesc: 'Learn historical stories',
    geography: 'Geography',
    geographyDesc: 'Discover world geography',

    participants: 'participants',
    alreadyHave: 'Already',

    // Learning Journey
    learningJourney: 'Your Learning Journey',
    progressComplete: 'Complete',
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert',
    completed: 'Completed',
    inProgress: 'In Progress',
    notStarted: 'Not Started',

    // Leaderboard
    leaderboard: '🏆 Leaderboard',
    consecutiveCorrect: 'Consecutive correct',
    questions: 'questions',
    points: 'pts',

    // CTA Section
    ctaTitle: 'Ready to Start Your Learning Adventure?',
    ctaSubtitle: 'Join 10,000+ students and make learning more fun!',
    freeRegister: 'Free Registration →',
    noCreditCard: 'No credit card required · Start now',

    // Footer
    footerText: '© 2026 Fun Quiz Platform. Make learning more fun!',

    // Quiz Page
    backToHome: 'Back to Home',
    subject: 'Subject',
    score: 'Score',
    progress: 'Progress',
    questionOf: 'Question',
    totalQuestions: 'of',
    multipleChoice: 'Multiple Choice',
    seconds: 's',
    selectCorrectAnswer: 'Please select the correct answer',
    submitAnswer: 'Submit Answer',
    nextQuestion: 'Next Question →',
    viewResults: 'View Results 🎉',

    // Quiz Tips
    tipTitle: 'Quiz Tips',
    tipContent: 'Read the question carefully and select the answer you think is correct. Get 10 points for correct answers, no points deducted for wrong answers!',

    // Results Page
    congratulations: 'Congratulations!',
    yourScore: 'Your Score',
    accuracy: 'Accuracy',
    correct: 'Correct',
    wrong: 'Wrong',
    timeSpent: 'Time (s)',
    tryAgain: 'Try Again',

    // Feedback
    correct_feedback: 'Correct!',
    wrong_feedback: 'Incorrect',
    correct_message: 'Great job! Keep it up!',
    wrong_message: 'No worries, keep trying!',

    // Login Page
    loginTitle: '🎯 Welcome Back',
    loginSubtitle: 'Login to start your learning journey',
    phoneLogin: 'Phone Login',
    passwordLogin: 'Password Login',
    phoneNumber: 'Phone Number',
    phonePlaceholder: 'Enter phone number',
    verificationCode: 'Verification Code',
    codePlaceholder: 'Enter verification code',
    sendCode: 'Send Code',
    loginButton: 'Login',
    username: 'Username/Phone',
    usernamePlaceholder: 'Enter username or phone',
    password: 'Password',
    passwordPlaceholder: 'Enter password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    orLoginWith: 'Or login with',
    noAccount: "Don't have an account?",
    registerNow: 'Register Now →',

    // Register Page
    registerTitle: '🎯 Join Us',
    registerSubtitle: 'Create an account to start learning',
    phoneHint: 'For verification and account recovery',
    usernameLabel: 'Username',
    usernameRegPlaceholder: 'Enter username',
    usernameHint: '3-20 characters, letters and numbers',
    passwordHint: 'At least 6 characters',
    confirmPassword: 'Confirm Password',
    confirmPasswordPlaceholder: 'Enter password again',
    agreeToTerms: 'I have read and agree to',
    userAgreement: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    registerButton: 'Register',
    orRegisterWith: 'Or register with',
    alreadyHaveAccount: 'Already have an account?',
    loginNow: 'Login Now →'
  }
};

// 语言管理类
class LanguageManager {
  constructor() {
    this.currentLang = this.getStoredLanguage() || 'zh';
    this.init();
  }

  // 获取存储的语言偏好
  getStoredLanguage() {
    return localStorage.getItem('preferredLanguage');
  }

  // 保存语言偏好
  saveLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
  }

  // 初始化
  init() {
    this.updatePageLanguage();
    this.createLanguageToggle();
  }

  // 切换语言
  toggleLanguage() {
    this.currentLang = this.currentLang === 'zh' ? 'en' : 'zh';
    this.saveLanguage(this.currentLang);
    this.updatePageLanguage();
    this.updateToggleButton();
  }

  // 获取翻译文本
  t(key) {
    return translations[this.currentLang][key] || key;
  }

  // 更新页面语言
  updatePageLanguage() {
    // 更新 HTML lang 属性
    document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';

    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);

      // 根据元素类型更新内容
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = translation;
      } else if (element.hasAttribute('aria-label')) {
        element.setAttribute('aria-label', translation);
      } else {
        element.textContent = translation;
      }
    });

    // 更新带 data-i18n-html 属性的元素（支持 HTML 内容）
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      element.innerHTML = this.t(key);
    });

    // 更新带 data-i18n-placeholder 属性的元素
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });
  }

  // 创建语言切换按钮
  createLanguageToggle() {
    const toggle = document.createElement('button');
    toggle.id = 'language-toggle';
    toggle.className = 'fixed top-4 right-4 z-50 clay-button bg-white text-indigo-900 px-4 py-2 font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2';
    toggle.setAttribute('aria-label', 'Switch Language');

    this.updateToggleButtonContent(toggle);

    toggle.addEventListener('click', () => this.toggleLanguage());

    document.body.appendChild(toggle);
  }

  // 更新切换按钮
  updateToggleButton() {
    const toggle = document.getElementById('language-toggle');
    if (toggle) {
      this.updateToggleButtonContent(toggle);
    }
  }

  // 更新切换按钮内容
  updateToggleButtonContent(toggle) {
    if (this.currentLang === 'zh') {
      toggle.innerHTML = '<span>🌐</span><span>EN</span>';
      toggle.title = 'Switch to English';
    } else {
      toggle.innerHTML = '<span>🌐</span><span>中文</span>';
      toggle.title = '切换到中文';
    }
  }
}

// 初始化语言管理器
const langManager = new LanguageManager();

// 导出供其他脚本使用
window.langManager = langManager;
