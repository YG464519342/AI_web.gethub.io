/**
 * 趣味答题平台 - 答题交互逻辑
 * 实现题目加载、选项选择、计时、计分等功能
 */

// ========== 题库数据 ==========
const questionBank = {
  math: [
    {
      question: "计算: 15 + 27 = ?",
      options: ["42", "52", "32", "62"],
      correct: 0,
      explanation: "15 + 27 = 42"
    },
    {
      question: "计算: 8 × 9 = ?",
      options: ["63", "72", "81", "54"],
      correct: 1,
      explanation: "8 × 9 = 72"
    },
    {
      question: "计算: 100 - 37 = ?",
      options: ["73", "63", "53", "83"],
      correct: 1,
      explanation: "100 - 37 = 63"
    },
    {
      question: "计算: 56 ÷ 7 = ?",
      options: ["6", "7", "8", "9"],
      correct: 2,
      explanation: "56 ÷ 7 = 8"
    },
    {
      question: "一个正方形的边长是5厘米,它的周长是多少厘米?",
      options: ["15", "20", "25", "30"],
      correct: 1,
      explanation: "正方形周长 = 边长 × 4 = 5 × 4 = 20厘米"
    },
    {
      question: "小明有12个苹果,吃掉了3个,又买了5个,现在有多少个?",
      options: ["14", "16", "10", "20"],
      correct: 0,
      explanation: "12 - 3 + 5 = 14个"
    },
    {
      question: "计算: 6 + 7 × 2 = ?",
      options: ["26", "20", "18", "16"],
      correct: 1,
      explanation: "先乘后加: 6 + 14 = 20"
    },
    {
      question: "一个长方形长8厘米,宽5厘米,面积是多少平方厘米?",
      options: ["13", "26", "40", "45"],
      correct: 2,
      explanation: "长方形面积 = 长 × 宽 = 8 × 5 = 40平方厘米"
    },
    {
      question: "计算: 45 + 55 = ?",
      options: ["90", "100", "110", "95"],
      correct: 1,
      explanation: "45 + 55 = 100"
    },
    {
      question: "小红有24颗糖,平均分给6个小朋友,每人分到几颗?",
      options: ["3", "4", "5", "6"],
      correct: 1,
      explanation: "24 ÷ 6 = 4颗"
    }
  ]
};

// ========== 游戏状态 ==========
let gameState = {
  currentQuestion: 0,
  score: 0,
  correctCount: 0,
  wrongCount: 0,
  selectedOption: null,
  timeLeft: 30,
  timerInterval: null,
  startTime: Date.now(),
  questions: []
};

// ========== DOM元素 ==========
const elements = {
  questionNumber: document.getElementById('question-number'),
  questionText: document.getElementById('question-text'),
  optionsContainer: document.getElementById('options-container'),
  submitBtn: document.getElementById('submit-btn'),
  nextBtn: document.getElementById('next-btn'),
  finishBtn: document.getElementById('finish-btn'),
  feedback: document.getElementById('feedback'),
  feedbackIcon: document.getElementById('feedback-icon'),
  feedbackTitle: document.getElementById('feedback-title'),
  feedbackMessage: document.getElementById('feedback-message'),
  progressBar: document.getElementById('progress-bar'),
  progressText: document.getElementById('progress-text'),
  scoreDisplay: document.getElementById('score'),
  timer: document.getElementById('timer'),
  resultModal: document.getElementById('result-modal'),
  finalScore: document.getElementById('final-score'),
  accuracy: document.getElementById('accuracy'),
  correctCount: document.getElementById('correct-count'),
  wrongCount: document.getElementById('wrong-count'),
  timeSpent: document.getElementById('time-spent')
};

// ========== 初始化游戏 ==========
function initGame() {
  // 获取科目(从URL参数或默认数学)
  const urlParams = new URLSearchParams(window.location.search);
  const subject = urlParams.get('subject') || 'math';

  // 加载题目
  gameState.questions = [...questionBank[subject]];

  // 打乱题目顺序
  shuffleArray(gameState.questions);

  // 显示第一题
  loadQuestion();

  // 启动计时器
  startTimer();

  // 绑定事件
  elements.submitBtn.addEventListener('click', submitAnswer);
  elements.nextBtn.addEventListener('click', nextQuestion);
  elements.finishBtn.addEventListener('click', showResults);
}

// ========== 打乱数组 ==========
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ========== 加载题目 ==========
function loadQuestion() {
  const question = gameState.questions[gameState.currentQuestion];

  // 更新题目编号
  elements.questionNumber.textContent = gameState.currentQuestion + 1;
  elements.questionText.textContent = question.question;

  // 更新进度（支持国际化）
  const progress = ((gameState.currentQuestion + 1) / gameState.questions.length) * 100;
  elements.progressBar.style.width = progress + '%';

  // 使用国际化文本更新进度
  const lang = window.langManager;
  if (lang) {
    elements.progressText.innerHTML = `<span data-i18n="questionOf">${lang.t('questionOf')}</span> ${gameState.currentQuestion + 1} <span data-i18n="totalQuestions">${lang.t('totalQuestions')}</span> ${gameState.questions.length} <span data-i18n="questions">${lang.t('questions')}</span>`;
  } else {
    elements.progressText.textContent = `第 ${gameState.currentQuestion + 1} 题 / 共 ${gameState.questions.length} 题`;
  }

  // 生成选项
  elements.optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'clay-card p-4 cursor-pointer transition-all hover:scale-102 option-card';
    optionDiv.setAttribute('data-index', index);
    optionDiv.setAttribute('tabindex', '0');
    optionDiv.setAttribute('role', 'button');
    optionDiv.innerHTML = `
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 clay-card bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full flex items-center justify-center flex-shrink-0">
          <span class="font-bold text-indigo-900">${String.fromCharCode(65 + index)}</span>
        </div>
        <span class="text-lg text-indigo-900 font-semibold">${option}</span>
      </div>
    `;

    // 点击选项
    optionDiv.addEventListener('click', () => selectOption(index));

    // 键盘支持
    optionDiv.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectOption(index);
      }
    });

    elements.optionsContainer.appendChild(optionDiv);
  });

  // 重置状态
  gameState.selectedOption = null;
  elements.submitBtn.disabled = true;
  elements.feedback.classList.add('hidden');
  elements.nextBtn.classList.add('hidden');
  elements.finishBtn.classList.add('hidden');

  // 重置计时器
  gameState.timeLeft = 30;
  elements.timer.textContent = gameState.timeLeft;
}

// ========== 选择选项 ==========
function selectOption(index) {
  // 如果已经提交,不允许再选择
  if (gameState.selectedOption !== null && elements.feedback.classList.contains('hidden') === false) {
    return;
  }

  gameState.selectedOption = index;

  // 移除所有选项的选中状态
  document.querySelectorAll('.option-card').forEach(card => {
    card.classList.remove('bg-gradient-to-r', 'from-indigo-200', 'to-purple-200', 'border-indigo-500');
    card.style.borderWidth = '3px';
    card.style.borderColor = '#C7D2FE';
  });

  // 高亮选中的选项
  const selectedCard = document.querySelector(`[data-index="${index}"]`);
  selectedCard.classList.add('bg-gradient-to-r', 'from-indigo-200', 'to-purple-200');
  selectedCard.style.borderColor = '#4F46E5';

  // 启用提交按钮
  elements.submitBtn.disabled = false;

  // 添加选中动画
  selectedCard.style.transform = 'scale(1.02)';
  setTimeout(() => {
    selectedCard.style.transform = '';
  }, 200);
}

// ========== 提交答案 ==========
function submitAnswer() {
  if (gameState.selectedOption === null) return;

  // 停止计时器
  clearInterval(gameState.timerInterval);

  const question = gameState.questions[gameState.currentQuestion];
  const isCorrect = gameState.selectedOption === question.correct;

  // 更新统计
  if (isCorrect) {
    gameState.correctCount++;
    gameState.score += 10;
  } else {
    gameState.wrongCount++;
  }

  // 更新得分显示
  elements.scoreDisplay.textContent = gameState.score;

  // 显示反馈
  showFeedback(isCorrect, question);

  // 禁用选项点击
  document.querySelectorAll('.option-card').forEach(card => {
    card.style.pointerEvents = 'none';
  });

  // 高亮正确答案
  const correctCard = document.querySelector(`[data-index="${question.correct}"]`);
  correctCard.classList.add('bg-gradient-to-r', 'from-green-200', 'to-emerald-200');
  correctCard.style.borderColor = '#10B981';

  // 如果答错,标记错误答案
  if (!isCorrect) {
    const wrongCard = document.querySelector(`[data-index="${gameState.selectedOption}"]`);
    wrongCard.classList.add('bg-gradient-to-r', 'from-red-200', 'to-pink-200');
    wrongCard.style.borderColor = '#EF4444';
  }

  // 隐藏提交按钮,显示下一题按钮
  elements.submitBtn.classList.add('hidden');

  if (gameState.currentQuestion < gameState.questions.length - 1) {
    elements.nextBtn.classList.remove('hidden');
  } else {
    elements.finishBtn.classList.remove('hidden');
  }
}

// ========== 显示反馈 ==========
function showFeedback(isCorrect, question) {
  elements.feedback.classList.remove('hidden');

  const lang = window.langManager;

  if (isCorrect) {
    elements.feedbackIcon.textContent = '🎉';
    elements.feedbackTitle.textContent = lang ? lang.t('correct_feedback') : '回答正确!';
    elements.feedbackTitle.className = 'text-2xl font-bold mb-2 text-green-700';
    elements.feedbackMessage.textContent = question.explanation;
    elements.feedbackMessage.className = 'text-lg text-green-600';
    elements.feedback.className = 'clay-card p-6 mb-6 text-center bg-gradient-to-r from-green-100 to-emerald-100';
  } else {
    elements.feedbackIcon.textContent = '😅';
    elements.feedbackTitle.textContent = lang ? lang.t('wrong_feedback') : '答错了,继续加油!';
    elements.feedbackTitle.className = 'text-2xl font-bold mb-2 text-orange-700';
    const correctAnswerPrefix = lang && lang.currentLang === 'en' ? 'Correct answer: ' : '正确答案: ';
    elements.feedbackMessage.textContent = correctAnswerPrefix + question.explanation;
    elements.feedbackMessage.className = 'text-lg text-orange-600';
    elements.feedback.className = 'clay-card p-6 mb-6 text-center bg-gradient-to-r from-orange-100 to-yellow-100';
  }

  // 添加动画
  elements.feedback.style.animation = 'bounceIn 0.5s ease-out';
}

// ========== 下一题 ==========
function nextQuestion() {
  gameState.currentQuestion++;

  // 重新启用选项点击
  document.querySelectorAll('.option-card').forEach(card => {
    card.style.pointerEvents = '';
  });

  // 显示提交按钮
  elements.submitBtn.classList.remove('hidden');

  // 加载下一题
  loadQuestion();

  // 重新启动计时器
  startTimer();
}

// ========== 计时器 ==========
function startTimer() {
  clearInterval(gameState.timerInterval);

  gameState.timerInterval = setInterval(() => {
    gameState.timeLeft--;
    elements.timer.textContent = gameState.timeLeft;

    // 时间不足10秒时变红
    if (gameState.timeLeft <= 10) {
      elements.timer.parentElement.classList.add('animate-pulse');
      elements.timer.classList.add('text-red-600');
    }

    // 时间到
    if (gameState.timeLeft <= 0) {
      clearInterval(gameState.timerInterval);

      // 如果还没选择答案,自动提交
      if (gameState.selectedOption === null) {
        // 随机选择一个答案
        gameState.selectedOption = Math.floor(Math.random() * 4);
        selectOption(gameState.selectedOption);
      }

      submitAnswer();
    }
  }, 1000);
}

// ========== 显示结果 ==========
function showResults() {
  clearInterval(gameState.timerInterval);

  const totalTime = Math.floor((Date.now() - gameState.startTime) / 1000);
  const accuracy = Math.round((gameState.correctCount / gameState.questions.length) * 100);

  const lang = window.langManager;

  // 更新结果数据
  elements.finalScore.textContent = gameState.score;
  elements.accuracy.innerHTML = `<span data-i18n="accuracy">${lang ? lang.t('accuracy') : '正确率'}</span>: ${accuracy}%`;
  elements.correctCount.textContent = gameState.correctCount;
  elements.wrongCount.textContent = gameState.wrongCount;
  elements.timeSpent.textContent = totalTime;

  // 根据得分显示不同的emoji和标题
  let emoji = '🎉';
  let title = lang ? lang.t('congratulations') : '恭喜完成!';

  if (accuracy === 100) {
    emoji = '🏆';
    title = lang && lang.currentLang === 'en' ? 'Perfect! All Correct!' : '完美!全部答对!';
  } else if (accuracy >= 80) {
    emoji = '🎉';
    title = lang && lang.currentLang === 'en' ? 'Excellent!' : '太棒了!';
  } else if (accuracy >= 60) {
    emoji = '👍';
    title = lang && lang.currentLang === 'en' ? 'Good Job!' : '不错哦!';
  } else {
    emoji = '💪';
    title = lang && lang.currentLang === 'en' ? 'Keep Trying!' : '继续努力!';
  }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;

  // 显示模态框
  elements.resultModal.classList.remove('hidden');

  // 添加动画
  elements.resultModal.querySelector('.clay-card').style.animation = 'bounceIn 0.8s ease-out';
}

// ========== 键盘快捷键 ==========
document.addEventListener('keydown', (e) => {
  // 数字键1-4选择选项
  if (e.key >= '1' && e.key <= '4') {
    const index = parseInt(e.key) - 1;
    if (index < gameState.questions[gameState.currentQuestion].options.length) {
      selectOption(index);
    }
  }

  // Enter键提交答案
  if (e.key === 'Enter' && !elements.submitBtn.disabled && !elements.submitBtn.classList.contains('hidden')) {
    submitAnswer();
  }

  // 空格键下一题
  if (e.key === ' ' && !elements.nextBtn.classList.contains('hidden')) {
    e.preventDefault();
    nextQuestion();
  }
});

// ========== 页面加载完成后初始化 ==========
document.addEventListener('DOMContentLoaded', initGame);

// ========== 控制台欢迎信息 ==========
console.log('%c🎯 开始答题挑战!', 'color: #4F46E5; font-size: 20px; font-weight: bold;');
console.log('%c快捷键提示: 1-4选择选项, Enter提交, Space下一题', 'color: #818CF8; font-size: 12px;');
