// API & Environment Configuration (Connected to .env)
const APP_CONFIG = {
  API_BASE_URL: 'http://localhost:5000/api',
  GROQ_MODEL: 'llama-3.3-70b-versatile',
  RAZORPAY_KEY_ID: 'rzp_test_your_key_id',
  CLOUDINARY_UPLOAD_PRESET: 'webconnect_preset',
  ENABLE_LIVE_AI_API: false // Set to true when backend node.js server with .env is running
};

// Global State
let currentRequirement = {
  type: 'Restaurant',
  businessName: 'Spice Garden Restaurant',
  location: 'Bangalore, Karnataka',
  description: 'I need a modern website for my restaurant with online digital menu, table reservation system, WhatsApp ordering integration, customer reviews section, and location map.',
  budget: '₹5,000 – ₹10,000',
  timeline: 'ASAP'
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  updateMobileClock();
  setInterval(updateMobileClock, 30000);
});

// Update Mobile Status Bar Clock
function updateMobileClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const timeString = `${hours}:${minutes}`;
  const clockElement = document.getElementById('currentTime');
  if (clockElement) clockElement.textContent = timeString;
}

// Switch Active View / Screen
function switchScreen(screenId) {
  // Hide all screens
  const screens = document.querySelectorAll('.app-view');
  screens.forEach(screen => screen.classList.remove('active'));

  // Show target screen
  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Update top toolbar active button highlight
  const toolbarBtns = document.querySelectorAll('.screen-btn');
  toolbarBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(screenId)) {
      btn.classList.add('active');
    }
  });

  // Auto scroll to top of device container
  const deviceContainer = document.getElementById('deviceContainer');
  if (deviceContainer) {
    deviceContainer.scrollTop = 0;
  }
}

// Toggle Viewport Mode (Smartphone Mockup vs Laptop/Desktop Responsive)
function toggleViewMode() {
  document.body.classList.toggle('mobile-mockup-mode');
  const btn = document.getElementById('viewModeToggleBtn');
  if (document.body.classList.contains('mobile-mockup-mode')) {
    btn.innerHTML = '💻 Laptop / Desktop Mode';
  } else {
    btn.innerHTML = '📱 Mobile Mockup Mode';
  }
}

// Hamburger Drawer Overlay Controls
function openHamburgerMenu() {
  const drawer = document.getElementById('hamburgerDrawer');
  if (drawer) drawer.classList.add('open');
}

function closeHamburgerMenu(e) {
  if (!e || e.target.classList.contains('hamburger-drawer') || e.target.classList.contains('close-btn')) {
    const drawer = document.getElementById('hamburgerDrawer');
    if (drawer) drawer.classList.remove('open');
  }
}

// Scroll to section inside Home View
function scrollToSection(sectionId) {
  switchScreen('view-home');
  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
}

// Form Step 1: Select Type Card
function selectFormTypeCard(element, typeName) {
  const cards = document.querySelectorAll('#typeOptionGrid .option-card');
  cards.forEach(card => card.classList.remove('selected'));
  element.classList.add('selected');
  currentRequirement.type = typeName;
}

// Quick Select Type from Home Screen and Jump to Step 2
function selectTypeAndStart(typeName) {
  currentRequirement.type = typeName;
  // Update step 1 selected state
  const cards = document.querySelectorAll('#typeOptionGrid .option-card');
  cards.forEach(card => {
    card.classList.remove('selected');
    if (card.textContent.includes(typeName)) {
      card.classList.add('selected');
    }
  });
  switchScreen('view-form-step-2');
}

// Form Step 3: Append prompt suggestion chips to textarea
function appendRequirement(text) {
  const textarea = document.getElementById('reqDescription');
  if (textarea) {
    if (textarea.value.length > 0) {
      textarea.value += ' ' + text;
    } else {
      textarea.value = text;
    }
    currentRequirement.description = textarea.value;
  }
}

// Form Step 4: Budget Pill Selector
function selectBudgetPill(element, budgetText) {
  const pills = document.querySelectorAll('#budgetPillContainer .budget-pill');
  pills.forEach(pill => pill.classList.remove('selected'));
  element.classList.add('selected');
  currentRequirement.budget = budgetText;
}

// Form Step 4: Timeline Selector
function selectTimeline(element, timelineText) {
  const btns = element.parentElement.querySelectorAll('.type-chip');
  btns.forEach(btn => btn.classList.remove('active'));
  element.classList.add('active');
  currentRequirement.timeline = timelineText;
}

// AI Requirement Analysis Engine Simulation
function triggerAIAnalysis() {
  // Capture latest values
  const nameInput = document.getElementById('reqBusinessName');
  const locInput = document.getElementById('reqBusinessLocation');
  const descInput = document.getElementById('reqDescription');

  if (nameInput && nameInput.value) currentRequirement.businessName = nameInput.value;
  if (locInput && locInput.value) currentRequirement.location = locInput.value;
  if (descInput && descInput.value) currentRequirement.description = descInput.value;

  switchScreen('view-ai-result');

  // Reset state to loading
  const loadingBox = document.getElementById('aiAnalyzingState');
  const resultContent = document.getElementById('aiResultContentState');
  const statusText = document.getElementById('aiStatusText');
  const progressFill = document.getElementById('aiProgressFill');

  loadingBox.style.display = 'flex';
  resultContent.style.display = 'none';
  progressFill.style.width = '20%';

  // Sequence of realistic AI processing steps
  setTimeout(() => {
    statusText.textContent = 'Analyzing business niche: ' + currentRequirement.type + '...';
    progressFill.style.width = '55%';
  }, 700);

  setTimeout(() => {
    statusText.textContent = 'Computing feature list & API integrations...';
    progressFill.style.width = '85%';
  }, 1400);

  setTimeout(() => {
    statusText.textContent = 'Recommending optimal package and timeline...';
    progressFill.style.width = '100%';
  }, 2000);

  // Reveal calculated result
  setTimeout(() => {
    loadingBox.style.display = 'none';
    resultContent.style.display = 'flex';

    // Populate dynamic AI recommendations
    document.getElementById('resBusinessType').textContent = currentRequirement.type.toUpperCase() + ' WEBSITE';
    
    let pkgTitle = 'Growth Business Suite';
    let pkgPrice = '₹7,999';
    
    if (currentRequirement.budget.includes('3,000')) {
      pkgTitle = 'Starter Business Web';
      pkgPrice = '₹4,499';
    } else if (currentRequirement.budget.includes('10,000')) {
      pkgTitle = 'Pro E-Commerce & Booking';
      pkgPrice = '₹14,999';
    } else if (currentRequirement.budget.includes('25,000')) {
      pkgTitle = 'Enterprise Custom Solution';
      pkgPrice = '₹29,999';
    }

    document.getElementById('resPackageTitle').textContent = pkgTitle;
    document.getElementById('resPriceTag').innerHTML = `${pkgPrice} <span>/ one-time cost</span>`;
    document.getElementById('resTimeline').textContent = currentRequirement.timeline === 'ASAP' ? '2 - 3 Business Days' : '5 - 7 Business Days';

    // Sync package name to Razorpay pay section
    const payPkgName = document.getElementById('payPackageName');
    if (payPkgName) payPkgName.textContent = pkgTitle;

  }, 2500);
}

// Final Submit Website Request
function submitWebsiteRequest() {
  switchScreen('view-success');
  document.getElementById('succBusinessName').textContent = currentRequirement.businessName;
  document.getElementById('succDetails').textContent = `Type: ${currentRequirement.type} | Budget: ${currentRequirement.budget} | Timeline: ${currentRequirement.timeline}`;
}

// Login & Signup Handler Mockups
function handleLogin() {
  alert('🎉 Login successful! Welcome back to WebConnect AI.');
  switchScreen('view-home');
}

function handleSignUp() {
  alert('🎉 Account created successfully! Welcome to WebConnect AI.');
  switchScreen('view-form-step-1');
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}

// Interactive AI Assistant Chatbot
function toggleChatDrawer(isOpen) {
  const drawer = document.getElementById('chatDrawer');
  if (drawer) {
    if (isOpen) {
      drawer.classList.add('open');
    } else {
      drawer.classList.remove('open');
    }
  }
}

function sendChatPrompt(promptText) {
  const input = document.getElementById('chatInputField');
  if (input) {
    input.value = promptText;
    handleSendChatMessage();
  }
}

function handleSendChatMessage() {
  const input = document.getElementById('chatInputField');
  const chatMessages = document.getElementById('chatMessages');

  if (!input || !input.value.trim()) return;

  const userText = input.value.trim();

  // Append user message
  const userMsgDiv = document.createElement('div');
  userMsgDiv.className = 'chat-msg user';
  userMsgDiv.textContent = userText;
  chatMessages.appendChild(userMsgDiv);

  input.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Simulate thinking delay
  setTimeout(() => {
    let botReply = "That sounds great! For a " + userText + ", WebConnect AI recommends our Growth Business Suite with WhatsApp integration and fast 3-day delivery. Would you like me to start your requirement request now?";

    const lower = userText.toLowerCase();
    if (lower.includes('salon') || lower.includes('hair') || lower.includes('beauty')) {
      botReply = "✂️ For Salons, we recommend an Online Appointment Booking website with service pricing menu, Instagram gallery feed, and WhatsApp booking reminders. Starting at ₹4,999!";
    } else if (lower.includes('restaurant') || lower.includes('food') || lower.includes('cafe')) {
      botReply = "🍽️ For Restaurants, our AI recommends a Digital QR Menu, online table reservation, and direct WhatsApp ordering system. Ready in 2-3 days!";
    } else if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing')) {
      botReply = "💰 Our packages range from ₹3,000 to ₹25,000+ depending on your features. All packages include FREE 1-year hosting, domain, and mobile design!";
    } else if (lower.includes('fast') || lower.includes('time') || lower.includes('delivery')) {
      botReply = "⚡ With our AI-assisted workflow, most business websites are delivered within 48 to 72 hours!";
    }

    const botMsgDiv = document.createElement('div');
    botMsgDiv.className = 'chat-msg bot';
    botMsgDiv.innerHTML = botReply + `<br><br><button class="btn-primary" style="height:36px; font-size:12px; margin-top:6px;" onclick="toggleChatDrawer(false); switchScreen('view-form-step-1');">Start My Request →</button>`;
    chatMessages.appendChild(botMsgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 700);
}
