// ╔══════════════════════════════════════════════════════════════════
// Equal Opportunities · main.js  –  All features + fixes
// ╚══════════════════════════════════════════════════════════════════

// ── Global timer/state vars (declared at top to avoid ReferenceErrors) ──
var jobVidTimer = null;
var jobVidPlaying = false;
var jobVidIdx = 0;
var cvVidTimer = null;
var cvVidPlaying = false;
var cvVidIdx = 0;
var isSpeaking = false;
var isReading = false;
var fontStep = 0;
var toastTimer = null;
var currentLang = 'en';
var isAR = false;
var vcRec = null;
var vcActive = false;
var gameActive = null;
var quizJob = null;
var quizIdx = 0;
var quizScores = {};
var ivIdx = 0;
var ivRec = null;
var ivRecAct = false;
var tIdx = 0;
var jobFilter = 'All';
var jobInterests = [];
var cvData = {};
var cvRecMap = {};
var dStats = {};
var actLog = [];
var topicProgress = {};
var sortDragEl = null;
var focusScore = 0;
var focusLit = -1;
var focusFocusTimer = null;
var focusDelay = 700;
var focusMissed = 0;
var memFlipped = [];
var memMatched = 0;
var memLocked = false;
var memMoves = 0;
var memT = null;
var memSec = 0;
var patScore = 0;
var patLevel = 1;
var mathScore = 0;
var mathLevel = 1;
var sortScore = 0;

var SR = window.SpeechRecognition || window.webkitSpeechRecognition;

try { jobInterests = JSON.parse(localStorage.getItem('bp_interests') || '[]'); } catch (e) { }
try { dStats = JSON.parse(localStorage.getItem('bp_stats') || '{}'); } catch (e) { }

// ── LANGUAGE STRINGS ────────────────────────────────────────────────
var STRINGS = {
    en: {
        nav_home: '🏠 Home', nav_assess: '📋 Assessment', nav_cvlearn: '📖 CV Guide',
        nav_cvbuild: '📄 Build CV', nav_games: '🧩 Games', nav_learn: '📚 Learn',
        nav_jobs: '💼 Jobs', nav_interview: '🎤 Interview', nav_dashboard: '📊 Progress',
        nav_about: '👥 About', nav_training: '🏋️ Training',
        lang_btn: '🌐 AR', stop_btn: '⏹ Stop',
        reading_bar_txt: 'Reading page aloud…',
        rb_stop: '✕ Stop',
        vo_title: 'Listening…',
        vo_result: 'Waiting for your voice…',
        vo_guide_btn: '📖 Commands Guide',
        vo_cancel_btn: '✕ Cancel',
        vcg_title: 'Voice Commands Guide',
        vcg_subtitle: 'دليل الأوامر الصوتية',
        vcg_desc: 'Click the microphone button 🎙️ and say any of these commands. Speak clearly in English or Arabic!',
        vcg_h_nav: '🧭 Navigation',
        vcg_h_a11y: '♿ Accessibility',
        vcg_start_btn: '🎙️ Start Voice Commands',
        hero_badge: '✨ AI-Powered Career Platform',
        hero_title: '<span class="gtext">Your Journey to</span><br>Work Starts Here! 🚀',
        hero_desc: 'Equal Opportunities guides you step by step — from discovering your best job, to building your CV, to acing your interview. With friendly AI voice support every step of the way!',
        h_btn_assess: '📋 Start Assessment',
        h_btn_voice: '🎙️ Use Voice',
        h_btn_guide: '📖 Voice Guide',
        s_users: 'Users Helped',
        s_cvs: 'CVs Built',
        s_jobs: 'Jobs Found',
        journey_title: '🗺️ Your 5-Step Career Journey',
        tk_stag: 'Everything You Need',
        tk_title: 'Your Complete Career Toolkit 🎯',
        tk_desc: 'Seven powerful tools designed just for you. Each step is guided and encouraging.',
        hw_stag: 'Simple Steps',
        hw_title: 'How It Works ✨',
        hw_desc: 'Just three easy steps to start your amazing career journey!',
        a11y_stag: 'Accessibility First',
        a11y_title: 'Designed for Everyone 💙',
        a11y_desc: 'Every part of Equal Opportunities is built with cognitive accessibility in mind. Simple, safe, and supportive.',
        testi_stag: 'Success Stories',
        testi_title: 'What People Are Saying 💬',
        cta_stag: 'Start Today',
        cta_title: 'Ready to Begin Your Journey? 🌟',
        cta_desc: 'Join thousands of people building their careers with Equal Opportunities. It\'s free, friendly, and designed just for you!',
        cta_btn_assess: '📋 Start Assessment',
        cta_btn_training: '🏋️ Job Training',
        cta_btn_cv: '📄 Build My CV',
        footer_copy: '© 2025 Equal Opportunities. Made with ❤️ for inclusive employment.',
        f_about: 'About Team',
        f_dashboard: 'Dashboard',
        coach_hi: '👋 Hi! I\'m Max!',
        coach_txt: 'I\'m your guide! Click 🔊 to hear this page, 🎙️ for voice commands, or 📖 for the voice guide.',
        coach_btn_ok: 'Got it! 👍',
        // Journey Steps
        j_step_1_t: '1. Job Assessment', j_step_1_p: 'Find your perfect job match',
        j_step_2_t: '2. Job Training', j_step_2_p: 'True/False job training quiz',
        j_step_3_t: '3. Learn CV Building', j_step_3_p: 'Watch the ATS CV video guide',
        j_step_4_t: '4. Build Your CV', j_step_4_p: 'Create your professional resume',
        j_step_5_t: '5. Practice Interview', j_step_5_p: 'AI coach with voice support',
        // Toolkit Features
        tk_feat_1_t: 'Job Assessment', tk_feat_1_p: 'Answer simple questions and our AI finds your perfect job match.', tk_feat_1_b: 'Start Test →',
        tk_feat_2_t: 'Job Training', tk_feat_2_p: 'Learn about 7 jobs through fun True/False questions in Arabic & English.', tk_feat_2_b: 'Start Training →',
        tk_feat_3_t: 'ATS CV Builder', tk_feat_3_p: 'Fill in your details with voice support and download a professional ATS-ready CV.', tk_feat_3_b: 'Build Now →',
        tk_feat_4_t: 'Skill Games', tk_feat_4_p: '5 fun interactive games — memory, patterns, maths, sorting, and focus!', tk_feat_4_b: 'Play →',
        tk_feat_5_t: 'Learning Topics', tk_feat_5_p: 'Short lessons on workplace skills, communication, time management and more!', tk_feat_5_b: 'Learn →',
        tk_feat_6_t: 'AI Interview', tk_feat_6_p: 'Practice real interview questions with our AI coach. Speak or type your answers!', tk_feat_6_b: 'Practice →',
        // How it works steps
        hw_step_1_t: 'Create Your Profile', hw_step_1_p: 'Answer friendly questions and build your personal profile. Tell us your amazing skills!',
        hw_step_2_t: 'Play & Practice', hw_step_2_p: 'Play skill games and practice interview questions. Our AI learns what you\'re great at!',
        hw_step_3_t: 'Get Your Dream Job', hw_step_3_p: 'Our AI recommends perfect jobs and helps you connect with inclusive employers!',
        // Accessibility features
        a11y_feat_1_t: 'Voice Navigation', a11y_feat_1_p: 'Navigate the whole site with your voice in English or Arabic',
        a11y_feat_2_t: 'Page Reading', a11y_feat_2_p: 'Every question and instruction read aloud automatically',
        a11y_feat_3_t: 'Adjustable Text', a11y_feat_3_p: 'Increase or decrease font size with one click or voice command',
        a11y_feat_4_t: 'Dark & High Contrast', a11y_feat_4_p: 'Multiple colour modes for every visual need',
        a11y_feat_5_t: 'Arabic & English', a11y_feat_5_p: 'Full bilingual support with proper RTL layout for Arabic',
        a11y_feat_6_t: 'Keyboard Friendly', a11y_feat_6_p: 'Every button and link works perfectly with keyboard navigation',
        a11y_feat_7_t: 'Big Buttons', a11y_feat_7_p: 'All buttons are large, labelled, and easy to tap or click',
        a11y_feat_8_t: 'Step-by-Step', a11y_feat_8_p: 'Each task broken into tiny manageable steps — never overwhelming!',
        // Testimonials
        testi_1_t: 'Equal Opportunities helped me create my first CV! The AI suggestions were amazing. Now I work at the local supermarket and I love every day!', testi_1_n: 'Ahmed, 24', testi_1_r: 'Store Assistant',
        testi_2_t: 'My daughter used Equal Opportunities for 3 months. The interview practice gave her so much confidence. She got her first job last month!', testi_2_n: 'Sara\'s Mum', testi_2_r: 'Parent',
        testi_3_t: 'The skill games are so fun! I play them every day. My memory improved and I learned to count money for my café job!', testi_3_n: 'Omar, 21', testi_3_r: 'Café Helper',
        testi_4_t: 'The voice assistant makes everything easy. I talk to it and it helps me find jobs and practice my answers.', testi_4_n: 'Layla, 19', testi_4_r: 'Office Helper',
        testi_5_t: 'As a teacher, I recommend Equal Opportunities to all my students. The step-by-step approach makes a huge difference in building confidence.', testi_5_n: 'Mr. Hassan', testi_5_r: 'Special Education Teacher',
        // Commands
        cmd_home: '"Go home"', cmd_home_d: 'Go to home page',
        cmd_test: '"Start test"', cmd_test_d: 'Open job assessment',
        cmd_train: '"Training"', cmd_train_d: 'Job training quiz',
        cmd_cv: '"Open CV"', cmd_cv_d: 'Open CV builder',
        cmd_jobs: '"Show jobs"', cmd_jobs_d: 'Open job listings',
        cmd_inter: '"Start interview"', cmd_inter_d: 'Interview practice',
        cmd_games: '"Open games"', cmd_games_d: 'Open skill games',
        cmd_learn: '"Learn"', cmd_learn_d: 'Learning topics',
        cmd_read: '"Read page"', cmd_read_d: 'Read this page aloud',
        cmd_stop: '"Stop voice"', cmd_stop_d: 'Stop all reading',
        cmd_dark: '"Dark mode"', cmd_dark_d: 'Switch dark/light',
        cmd_hc: '"High contrast"', cmd_hc_d: 'High contrast mode',
        cmd_big: '"Bigger text"', cmd_big_d: 'Increase font size',
        cmd_small: '"Smaller text"', cmd_small_d: 'Decrease font size',
        // Dashboard
        dash_title: 'Progress Dashboard', dash_journey: 'Journey Progress', dash_activity: 'Recent Activity', dash_skills: 'Skill Progress',
        dash_member: 'Equal Opportunities Member', dash_points: 'Points', dash_tests: 'Tests', dash_cvs: 'CVs', dash_ivs: 'Interviews',
        dash_no_act: 'No activities yet. Start your journey!',
        sk_comm: 'Communication', sk_org: 'Organisation', sk_team: 'Teamwork', sk_prob: 'Problem Solving', sk_punc: 'Punctuality',
        // Jobs
        jobs_search: 'Job Search', jobs_inclusive: 'Inclusive Job Listings', jobs_employers: 'All jobs are from inclusive employers who celebrate every talent!',
        jobs_match: 'Match', jobs_interest: 'Express Interest', jobs_interested: 'Interested!', jobs_interest_saved: 'Interest saved for ',
        jobs_filter_all: 'All', jobs_filter_retail: 'Retail', jobs_filter_food: 'Food & Beverage', jobs_filter_edu: 'Education',
        jobs_filter_outdoor: 'Outdoors', jobs_filter_office: 'Office', jobs_filter_creative: 'Creative',
        // Games
        game_score: 'Score', game_level: 'Level', game_moves: 'Moves', game_pairs: 'Pairs Found', game_time: 'Time',
        game_speed: 'Speed', game_over: 'Game Over!', game_new: 'New Game', game_all_sorted: 'All sorted! Great job!',
        game_correct: 'Correct!', game_wrong: 'Wrong category, try again!', game_what_next: 'What shape comes next?',
        game_what_is: 'What is ', game_points_val: ' pts',
        // CV
        cv_step_preview: 'Step 2 of 5', cv_step_build: 'Step 3 of 5',
        cv_preview_title: 'Live Preview', cv_preview_placeholder: 'Your name here...',
        cv_sec_summary: 'Professional Summary', cv_sec_exp: 'Work Experience', cv_sec_edu: 'Education',
        cv_sec_certs: 'Certifications', cv_sec_skills: 'Skills', cv_sec_hobbies: 'Hobbies & Interests',
        cv_save_toast: 'CV saved!', cv_next_games: 'Next: Games →',
        // About
        about_title: 'About Equal Opportunities', about_mission: 'An AI-powered career platform designed with love for people with Down Syndrome. Empowering every person to find their perfect career path.',
        about_team_title: 'Meet Our Amazing Team', about_team_desc: 'The passionate people who built Equal Opportunities to make employment more inclusive.',
        // Interview
        iv_step_badge: 'Step 5 of 5', iv_step_desc: 'Step 5 — Practice makes perfect! Click Next Question to begin.',
        iv_speaking: 'AI is speaking...', iv_greeting: 'Hi! I\'m your interview coach. Click "Next Question" to begin! 😊',
        iv_ans_label: 'Your Answer:', iv_ans_ph: 'Click Start Answer and speak, or type here...',
        iv_start_ans: 'Start Answer', iv_stop_ans: 'Stop Listening', iv_submit: 'Submit Answer', iv_next: 'Next Question',
        iv_hint: 'Click Start Answer and speak — your voice is automatically converted to text!',
        iv_effort: 'Great effort!', iv_prog_title: 'Interview Progress', iv_complete: 'Interview complete! You did amazing!',
        iv_submit_toast: 'Answer submitted!', iv_please_ans: 'Please answer first!'
    },
    ar: {
        nav_home: '🏠 الرئيسية', nav_assess: '📋 الاختبار', nav_cvlearn: '📖 دليل السيرة',
        nav_cvbuild: '📄 ابنِ السيرة', nav_games: '🧩 الألعاب', nav_learn: '📚 تعلم',
        nav_jobs: '💼 وظائف', nav_interview: '🎤 مقابلة', nav_dashboard: '📊 لوحة',
        nav_about: '👥 عن المنصة', nav_training: '🏋️ تدريب',
        lang_btn: '🌐 EN', stop_btn: '⏹ توقف',
        reading_bar_txt: 'جاري قراءة الصفحة…',
        rb_stop: '✕ توقف',
        vo_title: 'جاري الاستماع…',
        vo_result: 'في انتظار صوتك…',
        vo_guide_btn: '📖 دليل الأوامر',
        vo_cancel_btn: '✕ إلغاء',
        vcg_title: 'دليل الأوامر الصوتية',
        vcg_subtitle: 'Voice Commands Guide',
        vcg_desc: 'انقر على زر الميكروفون 🎙️ وقل أيًا من هذه الأوامر. تحدث بوضوح باللغة العربية أو الإنجليزية!',
        vcg_h_nav: '🧭 التنقل',
        vcg_h_a11y: '♿ سهولة الاستخدام',
        vcg_start_btn: '🎙️ ابدأ الأوامر الصوتية',
        hero_badge: '✨ منصة مهنية بالذكاء الاصطناعي',
        hero_title: '<span class="gtext">رحلتك نحو</span><br>العمل تبدأ هنا! 🚀',
        hero_desc: 'فرص متساوية يرشدك خطوة بخطوة — من اكتشاف وظيفتك المثالية إلى بناء سيرتك الذاتية حتى إجراء المقابلة. مع دعم صوتي ودود في كل خطوة!',
        h_btn_assess: '📋 ابدأ الاختبار',
        h_btn_voice: '🎙️ استخدم صوتك',
        h_btn_guide: '📖 دليل الأوامر',
        s_users: 'مستخدم تمت مساعدتهم',
        s_cvs: 'سيرة ذاتية تم إنشاؤها',
        s_jobs: 'وظيفة تم العثور عليها',
        journey_title: '🗺️ رحلتك المهنية في 5 خطوات',
        tk_stag: 'كل ما تحتاجه',
        tk_title: 'أدواتك المهنية المتكاملة 🎯',
        tk_desc: 'سبع أدوات قوية مصممة خصيصًا لك. كل خطوة موجهة ومشجعة.',
        hw_stag: 'خطوات بسيطة',
        hw_title: 'كيف يعمل النظام ✨',
        hw_desc: 'ثلاث خطوات سهلة فقط لتبدأ رحلتك المهنية المذهلة!',
        a11y_stag: 'سهولة الوصول أولاً',
        a11y_title: 'مصمم للجميع 💙',
        a11y_desc: 'كل جزء في فرص متساوية تم بناؤه مع مراعاة سهولة الاستخدام المعرفي. بسيط، آمن، وداعم.',
        testi_stag: 'قصص نجاح',
        testi_title: 'ماذا يقول الناس 💬',
        cta_stag: 'ابدأ اليوم',
        cta_title: 'هل أنت مستعد لبدء رحلتك؟ 🌟',
        cta_desc: 'انضم إلى آلاف الأشخاص الذين يبنون حياتهم المهنية مع فرص متساوية. إنه مجاني، ودود، ومصمم خصيصًا لك!',
        cta_btn_assess: '📋 ابدأ الاختبار',
        cta_btn_training: '🏋️ تدريب الوظائف',
        cta_btn_cv: '📄 ابنِ سيرتي الذاتية',
        footer_copy: '© 2025 فرص متساوية. صنع بكل ❤️ من أجل توظيف شامل.',
        f_about: 'عن الفريق',
        f_dashboard: 'لوحة التحكم',
        coach_hi: '👋 مرحبًا! أنا ماكس!',
        coach_txt: 'أنا مرشدك! انقر على 🔊 لسماع هذه الصفحة، 🎙️ للأوامر الصوتية، أو 📖 لدليل الصوت.',
        coach_btn_ok: 'فهمت! 👍',
        // Journey Steps
        j_step_1_t: '1. اختبار الوظائف', j_step_1_p: 'ابحث عن وظيفتك المثالية',
        j_step_2_t: '2. تدريب الوظائف', j_step_2_p: 'اختبار تدريبي صح/خطأ',
        j_step_3_t: '3. تعلم بناء السيرة', j_step_3_p: 'شاهد فيديو دليل السيرة الذاتية',
        j_step_4_t: '4. ابنِ سيرتك الذاتية', j_step_4_p: 'أنشئ سيرتك الذاتية الاحترافية',
        j_step_5_t: '5. ممارسة المقابلة', j_step_5_p: 'مدرب ذكاء اصطناعي مع دعم صوتي',
        // Toolkit Features
        tk_feat_1_t: 'اختبار الوظيفة', tk_feat_1_p: 'أجب على أسئلة بسيطة وسيجد ذكاءنا الاصطناعي وظيفتك المثالية.', tk_feat_1_b: 'ابدأ الاختبار ←',
        tk_feat_2_t: 'تدريب الوظيفة', tk_feat_2_p: 'تعرف على 7 وظائف من خلال أسئلة صح/خطأ ممتعة بالعربية والإنجليزية.', tk_feat_2_b: 'ابدأ التدريب ←',
        tk_feat_3_t: 'بناء سيرتك الذاتية', tk_feat_3_p: 'املأ بياناتك مع دعم صوتي وقم بتحميل سيرة ذاتية احترافية جاهزة.', tk_feat_3_b: 'ابنِ الآن ←',
        tk_feat_4_t: 'ألعاب المهارات', tk_feat_4_p: '5 ألعاب تفاعلية ممتعة — الذاكرة، الأنماط، الرياضيات، التصنيف، والتركيز!', tk_feat_4_b: 'العيد الآن ←',
        tk_feat_5_t: 'مواضيع التعلم', tk_feat_5_p: 'دروس قصيرة عن مهارات العمل، التواصل، إدارة الوقت والمزيد!', tk_feat_5_b: 'تعلم ←',
        tk_feat_6_t: 'مقابلة الذكاء الاصطناعي', tk_feat_6_p: 'تدرب على أسئلة المقابلة الحقيقية مع مدربنا. تحدث أو اكتب إجاباتك!', tk_feat_6_b: 'تدرب الآن ←',
        // How it works steps
        hw_step_1_t: 'أنشئ ملفك الشخصي', hw_step_1_p: 'أجب على أسئلة ودودة وابنِ ملفك الشخصي. أخبرنا بمهاراتك المذهلة!',
        hw_step_2_t: 'العب وتدرب', hw_step_2_p: 'العب ألعاب المهارات وتدرب على أسئلة المقابلة. يتعلم ذكاءنا ما أنت بارع فيه!',
        hw_step_3_t: 'احصل على وظيفة أحلامك', hw_step_3_p: 'يوصي ذكاؤنا الاصطناعي بوظائف مثالية ويساعدك على التواصل مع أصحاب العمل!',
        // Accessibility features
        a11y_feat_1_t: 'التنقل الصوتي', a11y_feat_1_p: 'تنقل في الموقع بالكامل بصوتك باللغتين العربية أو الإنجليزية',
        a11y_feat_2_t: 'قراءة الصفحة', a11y_feat_2_p: 'كل سؤال وتعليمات تُقرأ بصوت عالٍ تلقائيًا',
        a11y_feat_3_t: 'نص قابل للتعديل', a11y_feat_3_p: 'زيادة أو تقليل حجم الخط بنقرة واحدة أو بأمر صوتي',
        a11y_feat_4_t: 'وضع مظلم وتباين عالٍ', a11y_feat_4_p: 'أوضاع ألوان متعددة لكل احتياجات بصرية',
        a11y_feat_5_t: 'العربية والإنجليزية', a11y_feat_5_p: 'دعم كامل للغتين مع تخطيط صحيح للعربية من اليمين لليسار',
        a11y_feat_6_t: 'صديق للوحة المفاتيح', a11y_feat_6_p: 'كل زر ورابط يعمل بشكل مثالي مع التنقل بلوحة المفاتيح',
        a11y_feat_7_t: 'أزرار كبيرة', a11y_feat_7_p: 'جميع الأزرار كبيرة، واضحة، وسهلة النقر',
        a11y_feat_8_t: 'خطوة بخطوة', a11y_feat_8_p: 'كل مهمة مقسمة إلى خطوات صغيرة يمكن التحكم فيها — لا إرهاق أبدًا!',
        // Testimonials
        testi_1_t: 'ساعدني فرص متساوية في إنشاء أول سيرة ذاتية لي! كانت اقتراحات الذكاء الاصطناعي مذهلة. الآن أعمل في السوبر ماركت المحلي وأحب كل يوم!', testi_1_n: 'أحمد، 24', testi_1_r: 'مساعد متجر',
        testi_2_t: 'استخدمت ابنتي فرص متساوية لمدة 3 أشهر. ممارسة المقابلة أعطتها الكثير من الثقة. حصلت على أول وظيفة لها الشهر الماضي!', testi_2_n: 'والدة سارة', testi_2_r: 'ولي أمر',
        testi_3_t: 'ألعاب المهارات ممتعة للغاية! ألعبها كل يوم. تحسنت ذاكرتي وتعلمت عد النقود لوظيفتي في المقهى!', testi_3_n: 'عمر، 21', testi_3_r: 'مساعد مقهى',
        testi_4_t: 'المساعد الصوتي يجعل كل شيء سهلاً. أتحدث معه ويساعدني في العثور على وظائف والتدرب على إجابات في المقابلة.', testi_4_n: 'ليلى، 19', testi_4_r: 'مساعدة مكتبية',
        testi_5_t: 'كمعلم، أوصي بـ فرص متساوية لجميع طلابي. النهج المتدرج خطوة بخطوة يصنع فرقًا كبيرًا في بناء الثقة.', testi_5_n: 'أستاذ حسن', testi_5_r: 'معلم تربية خاصة',
        // Commands
        cmd_home: '"الرئيسية"', cmd_home_d: 'العودة للصفحة الرئيسية',
        cmd_test: '"ابدأ الاختبار"', cmd_test_d: 'فتح اختبار الوظائف',
        cmd_train: '"تدريب"', cmd_train_d: 'اختبار تدريب الوظائف',
        cmd_cv: '"افتح السيرة"', cmd_cv_d: 'فتح منشئ السيرة الذاتية',
        cmd_jobs: '"اعرض الوظائف"', cmd_jobs_d: 'فتح قوائم الوظائف',
        cmd_inter: '"ابدأ المقابلة"', cmd_inter_d: 'تدريب على المقابلات',
        cmd_games: '"افتح الألعاب"', cmd_games_d: 'فتح ألعاب المهارات',
        cmd_learn: '"تعلم"', cmd_learn_d: 'مواضيع التعلم',
        cmd_read: '"اقرأ الصفحة"', cmd_read_d: 'قراءة هذه الصفحة بصوت عالٍ',
        cmd_stop: '"توقف"', cmd_stop_d: 'إيقاف كل القراءة',
        cmd_dark: '"وضع مظلم"', cmd_dark_d: 'تبديل الوضع المظلم/المضيء',
        cmd_hc: '"تباين عالٍ"', cmd_hc_d: 'وضع التباين العالي',
        cmd_big: '"نص أكبر"', cmd_big_d: 'زيادة حجم الخط',
        cmd_small: '"تصغير الخط"', cmd_small_d: 'تقليل حجم الخط',
        // Dashboard
        dash_title: 'لوحة التقدم', dash_journey: 'تقدم الرحلة', dash_activity: 'النشاط الأخير', dash_skills: 'تقدم المهارات',
        dash_member: 'عضو فرص متساوية', dash_points: 'نقاط', dash_tests: 'اختبارات', dash_cvs: 'سير ذاتية', dash_ivs: 'مقابلات',
        dash_no_act: 'لا توجد أنشطة بعد. ابدأ رحلتك الآن!',
        sk_comm: 'التواصل', sk_org: 'التنظيم', sk_team: 'العمل الجماعي', sk_prob: 'حل المشكلات', sk_punc: 'الالتزام بالمواعيد',
        // Jobs
        jobs_search: 'البحث عن وظيفة', jobs_inclusive: 'وظائف شاملة للجميع', jobs_employers: 'كل الوظائف من أصحاب عمل شاملين يحتفلون بكل موهبة!',
        jobs_match: 'تطابق', jobs_interest: 'أبدِ اهتمامك', jobs_interested: 'مهتم!', jobs_interest_saved: 'تم حفظ اهتمامك بـ ',
        jobs_filter_all: 'الكل', jobs_filter_retail: 'التجزئة', jobs_filter_food: 'المطاعم والكافيهات', jobs_filter_edu: 'التعليم',
        jobs_filter_outdoor: 'خارج المنزل', jobs_filter_office: 'عمل مكتبي', jobs_filter_creative: 'إبداعي',
        // Games
        game_score: 'النتيجة', game_level: 'المستوى', game_moves: 'حركات', game_pairs: 'أزواج', game_time: 'الوقت',
        game_speed: 'السرعة', game_over: 'انتهت اللعبة!', game_new: 'لعبة جديدة', game_all_sorted: 'أحسنتم! تم ترتيب الكل!',
        game_correct: 'صحيح!', game_wrong: 'فئة خاطئة، حاول ثانية!', game_what_next: 'ما الشكل التالي؟',
        game_what_is: 'ما هو نتيجة ', game_points_val: ' نقطة',
        // CV
        cv_step_preview: 'الخطوة 2 من 5', cv_step_build: 'الخطوة 3 من 5',
        cv_preview_title: 'معاينة مباشرة', cv_preview_placeholder: 'اسمك هنا...',
        cv_sec_summary: 'الملخص المهني', cv_sec_exp: 'الخبرة العملية', cv_sec_edu: 'التعليم',
        cv_sec_certs: 'الشهادات', cv_sec_skills: 'المهارات', cv_sec_hobbies: 'الهوايات والاهتمامات',
        cv_save_toast: 'تم حفظ السيرة!', cv_next_games: 'التالي: الألعاب ←',
        // About
        about_title: 'عن فرص متساوية', about_mission: 'منصة مهنية مدعومة بالذكاء الاصطناعي مصممة بحب للأشخاص من ذوي متلازمة داون. تمكين الجميع من إيجاد مسارهم المهني المثالي.',
        about_team_title: 'تعرف على فريقنا الرائع', about_team_desc: 'الأشخاص الشغوفون الذين بنوا فرص متساوية لجعل التوظيف أكثر شمولاً.',
        // Interview
        iv_step_badge: 'الخطوة 5 من 5', iv_step_desc: 'الخطوة 5 — التدريب يؤدي للكمال! انقر على السؤال التالي للبدء.',
        iv_speaking: 'المساعد يتحدث...', iv_greeting: 'مرحبًا! أنا مدرب المقابلات الخاص بك. انقر على "السؤال التالي" للبدء! 😊',
        iv_ans_label: 'إجابتك:', iv_ans_ph: 'انقر على ابدأ وتحدث، أو اكتب هنا...',
        iv_start_ans: 'ابدأ الإجابة', iv_stop_ans: 'إيقاف الاستماع', iv_submit: 'إرسال الإجابة', iv_next: 'السؤال التالي',
        iv_hint: 'انقر على ابدأ وتحدث — سيتم تحويل صوتك إلى نص تلقائيًا!',
        iv_effort: 'مجهود رائع!', iv_prog_title: 'تقدم المقابلة', iv_complete: 'اكتملت المقابلة! لقد أبليت بلاءً حسنًا!',
        iv_submit_toast: 'تم إرسال الإجابة!', iv_please_ans: 'برجاء الإجابة أولاً!'
    },
    fr: {
        nav_home: '🏠 Accueil', nav_assess: '📋 Évaluation', nav_cvlearn: '📖 Guide CV',
        nav_cvbuild: '📄 Créer CV', nav_games: '🧩 Jeux', nav_learn: '📚 Apprendre',
        nav_jobs: '💼 Emplois', nav_interview: '🎤 Entretien', nav_dashboard: '📊 Progrès',
        nav_about: '👥 À propos', nav_training: '🏋️ Formation',
        lang_btn: '🌐 ES', stop_btn: '⏹ Arrêter',
        reading_bar_txt: 'Lecture de la page à voix haute…',
        rb_stop: '✕ Arrêter',
        vo_title: 'Écoute…',
        vo_result: 'En attente de votre voix…',
        vo_guide_btn: '📖 Guide Commandes',
        vo_cancel_btn: '✕ Annuler',
        vcg_title: 'Guide des Commandes Vocales',
        vcg_subtitle: 'Découvrez les commandes',
        vcg_desc: 'Cliquez sur le micro 🎙️ et dites une commande. Parlez clairement en français !',
        vcg_h_nav: '🧭 Navigation',
        vcg_h_a11y: '♿ Accessibilité',
        vcg_start_btn: '🎙️ Démarrer les commandes',
        hero_badge: '✨ Plateforme de carrière IA',
        hero_title: '<span class="gtext">Votre voyage vers</span><br>le travail commence ici ! 🚀',
        hero_desc: 'Equal Opportunities vous guide étape par étape — de la découverte de votre métier idéal à la réussite de votre entretien. Avec un coach vocal bienveillant !',
        h_btn_assess: '📋 Débuter l\'évaluation',
        h_btn_voice: '🎙️ Utiliser la voix',
        h_btn_guide: '📖 Guide vocal',
        s_users: 'Utilisateurs aidés',
        s_cvs: 'CV créés',
        s_jobs: 'Emplois trouvés',
        journey_title: '🗺️ Votre parcours en 5 étapes',
        tk_stag: 'Tout ce dont vous avez besoin',
        tk_title: 'Votre boîte à outils complète 🎯',
        tk_desc: 'Sept outils puissants conçus pour vous. Chaque étape est guidée et encourageante.',
        hw_stag: 'Étapes simples',
        hw_title: 'Comment ça marche ✨',
        hw_desc: 'Trois étapes faciles pour commencer votre incroyable parcours professionnel !',
        a11y_stag: 'Accessibilité d\'abord',
        a11y_title: 'Conçu pour tous 💙',
        a11y_desc: 'Chaque partie d\'Equal Opportunities est construite pour l\'accessibilité cognitive. Simple, sûr et bienveillant.',
        testi_stag: 'Histoires de succès',
        testi_title: 'Ce que disent les gens 💬',
        cta_stag: 'Commencez aujourd\'hui',
        cta_title: 'Prêt à commencer votre aventure ? 🌟',
        cta_desc: 'Rejoignez des milliers de personnes qui construisent leur carrière avec Equal Opportunities. C\'est gratuit, convivial et conçu pour vous !',
        cta_btn_assess: '📋 Évaluation',
        cta_btn_training: '🏋️ Formation',
        cta_btn_cv: '📄 Créer mon CV',
        footer_copy: '© 2025 Equal Opportunities. Créé avec ❤️ pour l\'emploi inclusif.',
        f_about: 'À propos',
        f_dashboard: 'Tableau de bord',
        coach_hi: '👋 Salut ! Je suis Max !',
        coach_txt: 'Je suis votre guide ! Cliquez sur 🔊 pour entendre la page, 🎙️ pour les commandes vocales, ou 📖 pour le guide vocal.',
        coach_btn_ok: 'Compris ! 👍',
        // Journey Steps
        j_step_1_t: '1. Évaluation métier', j_step_1_p: 'Trouvez votre métier idéal',
        j_step_2_t: '2. Formation métier', j_step_2_p: 'Quiz Vrai/Faux d\'entraînement',
        j_step_3_t: '3. Guide CV', j_step_3_p: 'Regardez le guide vidéo CV ATS',
        j_step_4_t: '4. Créer votre CV', j_step_4_p: 'Créez votre CV professionnel',
        j_step_5_t: '5. Entretien d\'entraînement', j_step_5_p: 'Coach IA avec support vocal',
        // Toolkit Features
        tk_feat_1_t: 'Évaluation métier', tk_feat_1_p: 'Répondez à des questions simples et notre IA trouve votre métier idéal.', tk_feat_1_b: 'Démarrer le test →',
        tk_feat_2_t: 'Formation métier', tk_feat_2_p: 'Découvrez 7 métiers avec des questions Vrai/Faux amusantes.', tk_feat_2_b: 'S\'entraîner →',
        tk_feat_3_t: 'Créateur de CV ATS', tk_feat_3_p: 'Remplissez vos informations avec support vocal et téléchargez un CV professionnel.', tk_feat_3_b: 'Créer maintenant →',
        tk_feat_4_t: 'Jeux de compétences', tk_feat_4_p: '5 jeux interactifs — mémoire, motifs, maths, tri et concentration !', tk_feat_4_b: 'Jouer →',
        tk_feat_5_t: 'Sujets d\'apprentissage', tk_feat_5_p: 'Courtes leçons sur le travail, la communication, la gestion du temps et plus !', tk_feat_5_b: 'Apprendre →',
        tk_feat_6_t: 'Entretien IA', tk_feat_6_p: 'Entraînez-vous avec notre coach IA. Parlez ou tapez vos réponses !', tk_feat_6_b: 'Pratiquer →',
        // How it works
        hw_step_1_t: 'Créez votre profil', hw_step_1_p: 'Répondez à des questions amicales et construisez votre profil. Dites-nous vos talents !',
        hw_step_2_t: 'Jouez et pratiquez', hw_step_2_p: 'Jouez à des jeux de compétences et pratiquez les questions d\'entretien. Notre IA apprend vos forces !',
        hw_step_3_t: 'Obtenez votre emploi idéal', hw_step_3_p: 'Notre IA recommande les emplois parfaits et vous aide à contacter des employeurs inclusifs !',
        // Accessibility features
        a11y_feat_1_t: 'Navigation vocale', a11y_feat_1_p: 'Naviguez sur tout le site avec votre voix en français ou en arabe',
        a11y_feat_2_t: 'Lecture de page', a11y_feat_2_p: 'Chaque question et instruction est lue automatiquement à voix haute',
        a11y_feat_3_t: 'Texte ajustable', a11y_feat_3_p: 'Augmentez ou diminuez la taille de la police en un clic ou par commande vocale',
        a11y_feat_4_t: 'Mode sombre et contraste élevé', a11y_feat_4_p: 'Plusieurs modes de couleurs pour chaque besoin visuel',
        a11y_feat_5_t: 'Multilingue', a11y_feat_5_p: 'Support complet en plusieurs langues avec mise en page RTL pour l\'arabe',
        a11y_feat_6_t: 'Compatible clavier', a11y_feat_6_p: 'Chaque bouton et lien fonctionne parfaitement avec la navigation au clavier',
        a11y_feat_7_t: 'Gros boutons', a11y_feat_7_p: 'Tous les boutons sont grands, bien étiquetés et faciles à cliquer',
        a11y_feat_8_t: 'Pas à pas', a11y_feat_8_p: 'Chaque tâche est découpée en petites étapes gérables — jamais de surcharge !',
        // Testimonials
        testi_1_t: 'Equal Opportunities m\'a aidé à créer mon premier CV ! Les suggestions IA étaient formidables. Maintenant je travaille au supermarché et j\'adore chaque jour !', testi_1_n: 'Léa, 24 ans', testi_1_r: 'Assistante de magasin',
        testi_2_t: 'Ma fille a utilisé Equal Opportunities pendant 3 mois. La préparation à l\'entretien lui a donné tellement confiance. Elle a obtenu son premier emploi le mois dernier !', testi_2_n: 'La maman de Sara', testi_2_r: 'Parent',
        testi_3_t: 'Les jeux de compétences sont trop fun ! J\'y joue tous les jours. Ma mémoire s\'est améliorée et j\'ai appris à compter la monnaie pour mon travail au café !', testi_3_n: 'Omar, 21 ans', testi_3_r: 'Aide de café',
        testi_4_t: 'L\'assistant vocal rend tout facile. Je lui parle et il m\'aide à trouver des emplois et à pratiquer mes réponses.', testi_4_n: 'Layla, 19 ans', testi_4_r: 'Aide de bureau',
        testi_5_t: 'En tant qu\'enseignant, je recommande Equal Opportunities à tous mes élèves. L\'approche étape par étape fait une énorme différence dans la construction de la confiance.', testi_5_n: 'M. Hassan', testi_5_r: 'Enseignant spécialisé',
        // Commands
        cmd_home: '"Aller à l\'accueil"', cmd_home_d: 'Retour à la page d\'accueil',
        cmd_test: '"Démarrer le test"', cmd_test_d: 'Ouvrir l\'évaluation',
        cmd_train: '"Formation"', cmd_train_d: 'Quiz de formation',
        cmd_cv: '"Ouvrir CV"', cmd_cv_d: 'Ouvrir le créateur de CV',
        cmd_jobs: '"Voir les emplois"', cmd_jobs_d: 'Ouvrir les offres d\'emploi',
        cmd_inter: '"Démarrer l\'entretien"', cmd_inter_d: 'Pratique d\'entretien',
        cmd_games: '"Ouvrir les jeux"', cmd_games_d: 'Ouvrir les jeux de compétences',
        cmd_learn: '"Apprendre"', cmd_learn_d: 'Sujets d\'apprentissage',
        cmd_read: '"Lire la page"', cmd_read_d: 'Lire cette page à voix haute',
        cmd_stop: '"Arrêter la voix"', cmd_stop_d: 'Arrêter toute lecture',
        cmd_dark: '"Mode sombre"', cmd_dark_d: 'Basculer sombre/clair',
        cmd_hc: '"Contraste élevé"', cmd_hc_d: 'Mode contraste élevé',
        cmd_big: '"Texte plus grand"', cmd_big_d: 'Augmenter la taille de police',
        cmd_small: '"Texte plus petit"', cmd_small_d: 'Diminuer la taille de police',
        // Dashboard
        dash_title: 'Tableau de bord', dash_journey: 'Progression du parcours', dash_activity: 'Activité récente', dash_skills: 'Progression des compétences',
        dash_member: 'Membre Equal Opportunities', dash_points: 'Points', dash_tests: 'Tests', dash_cvs: 'CV', dash_ivs: 'Entretiens',
        dash_no_act: 'Pas encore d\'activités. Commencez votre parcours !',
        sk_comm: 'Communication', sk_org: 'Organisation', sk_team: 'Travail d\'équipe', sk_prob: 'Résolution de problèmes', sk_punc: 'Ponctualité',
        // Jobs
        jobs_search: 'Recherche d\'emploi', jobs_inclusive: 'Offres d\'emploi inclusives', jobs_employers: 'Tous les emplois proviennent d\'employeurs inclusifs qui célèbrent chaque talent !',
        jobs_match: 'Correspondance', jobs_interest: 'Exprimer son intérêt', jobs_interested: 'Intéressé !', jobs_interest_saved: 'Intérêt enregistré pour ',
        jobs_filter_all: 'Tous', jobs_filter_retail: 'Commerce', jobs_filter_food: 'Restauration', jobs_filter_edu: 'Éducation',
        jobs_filter_outdoor: 'Extérieur', jobs_filter_office: 'Bureau', jobs_filter_creative: 'Créatif',
        // Games
        game_score: 'Score', game_level: 'Niveau', game_moves: 'Coups', game_pairs: 'Paires trouvées', game_time: 'Temps',
        game_speed: 'Vitesse', game_over: 'Partie terminée !', game_new: 'Nouvelle partie', game_all_sorted: 'Tout est trié ! Bravo !',
        game_correct: 'Correct !', game_wrong: 'Mauvaise catégorie, réessayez !', game_what_next: 'Quelle forme vient ensuite ?',
        game_what_is: 'Combien font ', game_points_val: ' pts',
        // CV
        cv_step_preview: 'Étape 2 sur 5', cv_step_build: 'Étape 3 sur 5',
        cv_preview_title: 'Aperçu en direct', cv_preview_placeholder: 'Votre nom ici...',
        cv_sec_summary: 'Résumé professionnel', cv_sec_exp: 'Expérience professionnelle', cv_sec_edu: 'Formation',
        cv_sec_certs: 'Certifications', cv_sec_skills: 'Compétences', cv_sec_hobbies: 'Loisirs et intérêts',
        cv_save_toast: 'CV enregistré !', cv_next_games: 'Suivant : Jeux →',
        // About
        about_title: 'À propos d\'Equal Opportunities', about_mission: 'Une plateforme de carrière alimentée par l\'IA, conçue avec amour pour les personnes atteintes du syndrome de Down. Permettre à chacun de trouver son chemin professionnel idéal.',
        about_team_title: 'Découvrez notre équipe formidable', about_team_desc: 'Les passionnés qui ont construit Equal Opportunities pour rendre l\'emploi plus inclusif.',
        // Interview
        iv_step_badge: 'Étape 5 sur 5', iv_step_desc: 'Étape 5 — La pratique mène à la perfection ! Cliquez sur Question suivante pour commencer.',
        iv_speaking: 'L\'IA parle...', iv_greeting: 'Bonjour ! Je suis votre coach d\'entretien. Cliquez sur "Question suivante" pour commencer ! 😊',
        iv_ans_label: 'Votre réponse :', iv_ans_ph: 'Cliquez sur Commencer et parlez, ou tapez ici...',
        iv_start_ans: 'Commencer la réponse', iv_stop_ans: 'Arrêter l\'écoute', iv_submit: 'Envoyer la réponse', iv_next: 'Question suivante',
        iv_hint: 'Cliquez sur Commencer et parlez — votre voix est automatiquement convertie en texte !',
        iv_effort: 'Bel effort !', iv_prog_title: 'Progression de l\'entretien', iv_complete: 'Entretien terminé ! Vous avez été formidable !',
        iv_submit_toast: 'Réponse envoyée !', iv_please_ans: 'Veuillez répondre d\'abord !'
    },
    es: {
        nav_home: '🏠 Inicio', nav_assess: '📋 Evaluación', nav_cvlearn: '📖 Guía CV',
        nav_cvbuild: '📄 Crear CV', nav_games: '🧩 Juegos', nav_learn: '📚 Aprender',
        nav_jobs: '💼 Empleos', nav_interview: '🎤 Entrevista', nav_dashboard: '📊 Progreso',
        nav_about: '👥 Sobre nosotros', nav_training: '🏋️ Entrenamiento',
        lang_btn: '🌐 EN', stop_btn: '⏹ Parar',
        reading_bar_txt: 'Leyendo página en voz alta…',
        rb_stop: '✕ Parar',
        vo_title: 'Escuchando…',
        vo_result: 'Esperando su voz…',
        vo_guide_btn: '📖 Guía de comandos',
        vo_cancel_btn: '✕ Cancelar',
        vcg_title: 'Guía de Comandos de Voz',
        vcg_subtitle: 'Descubre los comandos',
        vcg_desc: 'Haz clic en el micro 🎙️ y di un comando. ¡Habla claro en español!',
        vcg_h_nav: '🧭 Navegación',
        vcg_h_a11y: '♿ Accesibilidad',
        vcg_start_btn: '🎙️ Iniciar comandos',
        hero_badge: '✨ Plataforma de carrera con IA',
        hero_title: '<span class="gtext">Tu viaje hacia</span><br>el trabajo empieza aquí! 🚀',
        hero_desc: 'Equal Opportunities te guía paso a paso — desde descubrir tu trabajo ideal, crear tu CV, hasta triunfar en tu entrevista. ¡Con asistente de voz amigable en cada paso!',
        h_btn_assess: '📋 Iniciar evaluación',
        h_btn_voice: '🎙️ Usar voz',
        h_btn_guide: '📖 Guía de voz',
        s_users: 'Usuarios ayudados',
        s_cvs: 'CVs creados',
        s_jobs: 'Empleos encontrados',
        journey_title: '🗺️ Tu viaje profesional en 5 pasos',
        tk_stag: 'Todo lo que necesitas',
        tk_title: 'Tu kit completo de herramientas profesionales 🎯',
        tk_desc: 'Siete herramientas potentes diseñadas especialmente para ti. Cada paso es guiado y motivador.',
        hw_stag: 'Pasos simples',
        hw_title: 'Cómo funciona ✨',
        hw_desc: '¡Solo tres pasos fáciles para comenzar tu increíble carrera profesional!',
        a11y_stag: 'Accesibilidad primero',
        a11y_title: 'Diseñado para todos 💙',
        a11y_desc: 'Cada parte de Equal Opportunities está construida pensando en la accesibilidad cognitiva. Simple, seguro y de apoyo.',
        testi_stag: 'Historias de éxito',
        testi_title: 'Lo que dice la gente 💬',
        cta_stag: 'Empieza hoy',
        cta_title: '¿Listo para comenzar tu aventura? 🌟',
        cta_desc: 'Únete a miles de personas que construyen su carrera con Equal Opportunities. ¡Es gratis, amigable y diseñado especialmente para ti!',
        cta_btn_assess: '📋 Evaluación',
        cta_btn_training: '🏋️ Entrenamiento',
        cta_btn_cv: '📄 Crear mi CV',
        footer_copy: '© 2025 Equal Opportunities. Hecho con ❤️ para el empleo inclusivo.',
        f_about: 'Sobre el equipo',
        f_dashboard: 'Panel de control',
        coach_hi: '👋 ¡Hola! ¡Soy Max!',
        coach_txt: '¡Soy tu guía! Haz clic en 🔊 para escuchar la página, 🎙️ para comandos de voz, o 📖 para la guía de voz.',
        coach_btn_ok: '¡Entendido! 👍',
        // Journey Steps
        j_step_1_t: '1. Evaluación laboral', j_step_1_p: 'Encuentra tu trabajo ideal',
        j_step_2_t: '2. Entrenamiento laboral', j_step_2_p: 'Quiz de entrenamiento Verdadero/Falso',
        j_step_3_t: '3. Guía para crear CV', j_step_3_p: 'Mira la guía en video del CV ATS',
        j_step_4_t: '4. Crear tu CV', j_step_4_p: 'Crea tu currículum profesional',
        j_step_5_t: '5. Practicar entrevista', j_step_5_p: 'Coach IA con soporte de voz',
        // Toolkit Features
        tk_feat_1_t: 'Evaluación laboral', tk_feat_1_p: 'Responde preguntas simples y nuestra IA encuentra tu trabajo perfecto.', tk_feat_1_b: 'Iniciar test →',
        tk_feat_2_t: 'Entrenamiento laboral', tk_feat_2_p: 'Aprende sobre 7 trabajos con preguntas divertidas de Verdadero/Falso.', tk_feat_2_b: 'Entrenar →',
        tk_feat_3_t: 'Creador de CV ATS', tk_feat_3_p: 'Llena tus datos con soporte de voz y descarga un CV profesional listo.', tk_feat_3_b: 'Crear ahora →',
        tk_feat_4_t: 'Juegos de habilidades', tk_feat_4_p: '5 juegos interactivos divertidos: ¡memoria, patrones, matemáticas, clasificación y concentración!', tk_feat_4_b: 'Jugar →',
        tk_feat_5_t: 'Temas de aprendizaje', tk_feat_5_p: 'Lecciones cortas sobre habilidades laborales, comunicación, gestión del tiempo ¡y más!', tk_feat_5_b: 'Aprender →',
        tk_feat_6_t: 'Entrevista con IA', tk_feat_6_p: 'Practica preguntas reales de entrevista con nuestro coach IA. ¡Habla o escribe tus respuestas!', tk_feat_6_b: 'Practicar →',
        // How it works
        hw_step_1_t: 'Crea tu perfil', hw_step_1_p: '¡Responde preguntas amigables y construye tu perfil personal. Cuéntanos tus increíbles habilidades!',
        hw_step_2_t: 'Juega y practica', hw_step_2_p: '¡Juega juegos de habilidades y practica preguntas de entrevista. Nuestra IA aprende en qué eres bueno!',
        hw_step_3_t: 'Consigue tu trabajo soñado', hw_step_3_p: '¡Nuestra IA recomienda trabajos perfectos y te ayuda a conectar con empleadores inclusivos!',
        // Accessibility features
        a11y_feat_1_t: 'Navegación por voz', a11y_feat_1_p: 'Navega todo el sitio con tu voz en español o árabe',
        a11y_feat_2_t: 'Lectura de página', a11y_feat_2_p: 'Cada pregunta e instrucción se lee automáticamente en voz alta',
        a11y_feat_3_t: 'Texto ajustable', a11y_feat_3_p: 'Aumenta o disminuye el tamaño de fuente con un clic o comando de voz',
        a11y_feat_4_t: 'Modo oscuro y alto contraste', a11y_feat_4_p: 'Múltiples modos de color para cada necesidad visual',
        a11y_feat_5_t: 'Multilingüe', a11y_feat_5_p: 'Soporte completo en varios idiomas con diseño RTL para árabe',
        a11y_feat_6_t: 'Compatible con teclado', a11y_feat_6_p: 'Cada botón y enlace funciona perfectamente con navegación por teclado',
        a11y_feat_7_t: 'Botones grandes', a11y_feat_7_p: 'Todos los botones son grandes, etiquetados y fáciles de tocar o hacer clic',
        a11y_feat_8_t: 'Paso a paso', a11y_feat_8_p: 'Cada tarea dividida en pequeños pasos manejables — ¡nunca abrumador!',
        // Testimonials
        testi_1_t: '¡Equal Opportunities me ayudó a crear mi primer CV! Las sugerencias de IA fueron increíbles. ¡Ahora trabajo en el supermercado local y amo cada día!', testi_1_n: 'Carlos, 24 años', testi_1_r: 'Asistente de tienda',
        testi_2_t: 'Mi hija usó Equal Opportunities durante 3 meses. La práctica de entrevista le dio mucha confianza. ¡Consiguió su primer trabajo el mes pasado!', testi_2_n: 'La mamá de Sara', testi_2_r: 'Madre',
        testi_3_t: '¡Los juegos de habilidades son muy divertidos! Juego todos los días. Mi memoria mejoró y ¡aprendí a contar dinero para mi trabajo en la cafetería!', testi_3_n: 'Omar, 21 años', testi_3_r: 'Ayudante de cafetería',
        testi_4_t: 'El asistente de voz hace todo fácil. Le hablo y me ayuda a encontrar trabajos y practicar mis respuestas.', testi_4_n: 'Layla, 19 años', testi_4_r: 'Ayudante de oficina',
        testi_5_t: 'Como profesor, recomiendo Equal Opportunities a todos mis estudiantes. El enfoque paso a paso hace una gran diferencia en la construcción de confianza.', testi_5_n: 'Sr. Hassan', testi_5_r: 'Profesor de educación especial',
        // Commands
        cmd_home: '"Ir al inicio"', cmd_home_d: 'Ir a la página de inicio',
        cmd_test: '"Iniciar test"', cmd_test_d: 'Abrir evaluación laboral',
        cmd_train: '"Entrenamiento"', cmd_train_d: 'Quiz de entrenamiento',
        cmd_cv: '"Abrir CV"', cmd_cv_d: 'Abrir creador de CV',
        cmd_jobs: '"Ver empleos"', cmd_jobs_d: 'Abrir ofertas de empleo',
        cmd_inter: '"Iniciar entrevista"', cmd_inter_d: 'Práctica de entrevista',
        cmd_games: '"Abrir juegos"', cmd_games_d: 'Abrir juegos de habilidades',
        cmd_learn: '"Aprender"', cmd_learn_d: 'Temas de aprendizaje',
        cmd_read: '"Leer página"', cmd_read_d: 'Leer esta página en voz alta',
        cmd_stop: '"Detener voz"', cmd_stop_d: 'Detener toda lectura',
        cmd_dark: '"Modo oscuro"', cmd_dark_d: 'Cambiar oscuro/claro',
        cmd_hc: '"Alto contraste"', cmd_hc_d: 'Modo alto contraste',
        cmd_big: '"Texto más grande"', cmd_big_d: 'Aumentar tamaño de fuente',
        cmd_small: '"Texto más pequeño"', cmd_small_d: 'Disminuir tamaño de fuente',
        // Dashboard
        dash_title: 'Panel de progreso', dash_journey: 'Progreso del viaje', dash_activity: 'Actividad reciente', dash_skills: 'Progreso de habilidades',
        dash_member: 'Miembro de Equal Opportunities', dash_points: 'Puntos', dash_tests: 'Tests', dash_cvs: 'CVs', dash_ivs: 'Entrevistas',
        dash_no_act: '¡Aún no hay actividades. Comienza tu viaje!',
        sk_comm: 'Comunicación', sk_org: 'Organización', sk_team: 'Trabajo en equipo', sk_prob: 'Resolución de problemas', sk_punc: 'Puntualidad',
        // Jobs
        jobs_search: 'Búsqueda de empleo', jobs_inclusive: 'Ofertas de empleo inclusivas', jobs_employers: '¡Todos los empleos son de empleadores inclusivos que celebran cada talento!',
        jobs_match: 'Coincidencia', jobs_interest: 'Expresar interés', jobs_interested: '¡Interesado!', jobs_interest_saved: 'Interés guardado para ',
        jobs_filter_all: 'Todos', jobs_filter_retail: 'Tienda', jobs_filter_food: 'Alimentos y Bebidas', jobs_filter_edu: 'Educación',
        jobs_filter_outdoor: 'Aire libre', jobs_filter_office: 'Oficina', jobs_filter_creative: 'Creativo',
        // Games
        game_score: 'Puntuación', game_level: 'Nivel', game_moves: 'Movimientos', game_pairs: 'Pares encontrados', game_time: 'Tiempo',
        game_speed: 'Velocidad', game_over: '¡Juego terminado!', game_new: 'Nuevo juego', game_all_sorted: '¡Todo ordenado! ¡Buen trabajo!',
        game_correct: '¡Correcto!', game_wrong: 'Categoría incorrecta, ¡inténtalo de nuevo!', game_what_next: '¿Qué forma sigue?',
        game_what_is: '¿Cuánto es ', game_points_val: ' pts',
        // CV
        cv_step_preview: 'Paso 2 de 5', cv_step_build: 'Paso 3 de 5',
        cv_preview_title: 'Vista previa en vivo', cv_preview_placeholder: 'Tu nombre aquí...',
        cv_sec_summary: 'Resumen profesional', cv_sec_exp: 'Experiencia laboral', cv_sec_edu: 'Educación',
        cv_sec_certs: 'Certificaciones', cv_sec_skills: 'Habilidades', cv_sec_hobbies: 'Aficiones e intereses',
        cv_save_toast: '¡CV guardado!', cv_next_games: 'Siguiente: Juegos →',
        // About
        about_title: 'Sobre Equal Opportunities', about_mission: 'Una plataforma de carrera impulsada por IA diseñada con amor para personas con síndrome de Down. Empoderando a cada persona para encontrar su camino profesional perfecto.',
        about_team_title: 'Conoce a nuestro increíble equipo', about_team_desc: 'Las personas apasionadas que construyeron Equal Opportunities para hacer el empleo más inclusivo.',
        // Interview
        iv_step_badge: 'Paso 5 de 5', iv_step_desc: 'Paso 5 — ¡La práctica hace al maestro! Haz clic en Siguiente Pregunta para comenzar.',
        iv_speaking: 'La IA está hablando...', iv_greeting: '¡Hola! Soy tu coach de entrevistas. ¡Haz clic en "Siguiente Pregunta" para comenzar! 😊',
        iv_ans_label: 'Tu respuesta:', iv_ans_ph: 'Haz clic en Comenzar y habla, o escribe aquí...',
        iv_start_ans: 'Comenzar respuesta', iv_stop_ans: 'Dejar de escuchar', iv_submit: 'Enviar respuesta', iv_next: 'Siguiente pregunta',
        iv_hint: '¡Haz clic en Comenzar y habla — tu voz se convierte automáticamente en texto!',
        iv_effort: '¡Gran esfuerzo!', iv_prog_title: 'Progreso de la entrevista', iv_complete: '¡Entrevista completa! ¡Lo hiciste increíble!',
        iv_submit_toast: '¡Respuesta enviada!', iv_please_ans: '¡Por favor responde primero!'
    }
};

function t(key) {
    return (STRINGS[currentLang] && STRINGS[currentLang][key]) || (STRINGS['en'][key]) || key;
}

// ── JOBS TRAINING DATA ──────────────────────────────────────────────
var TRAINING_JOBS = [
    {
        id: 'packaging-worker',
        icon: './images/مساعد فى حديقة.jpeg',
        color: '#FF6B35',
        titleAr: 'عامل تبئة وتغليف',
        titleEn: 'Packaging Worker',
        titleFr: 'Ouvrier d\'emballage',
        titleEs: 'Trabajador de empaque',
        descriptionAr: 'يقوم الموظف فى هذة المهنة بتجهيز المنتجات ووضعها داخل العبوات المخصصة لها بشكل منظم. يتطلب العمل الدقة فى وضع الملصقات واغلاق الصناديق باحكام باستخدام الشريط اللاصق والتاكد من نظافة المنتج قبل تقديمه للعملاء هى مهنة ممتعة تساعد على تنمية مهارات التركيز والنظام.',
        descriptionEn: 'In this job, the worker prepares products and places them neatly inside their designated packages. The work requires accuracy in placing labels and closing boxes tightly with tape, and ensuring the product is clean before giving it to customers. It is a fun job that helps develop focus and organization skills.',
        descriptionFr: 'Dans ce travail, l\'ouvrier prépare les produits et les place proprement dans leurs emballages désignés. Le travail exige de la précision dans le placement des étiquettes et la fermeture hermétique des boîtes avec du ruban adhésif, et de s\'assurer que le produit est propre avant de le donner aux clients. C\'est un travail amusant qui aide à développer la concentration et le sens de l\'organisation.',
        descriptionEs: 'En este trabajo, el trabajador prepara los productos y los coloca ordenadamente dentro de sus envases designados. El trabajo requiere precisión al colocar las etiquetas y cerrar las cajas herméticamente con cinta adhesiva, y asegurarse de que el producto esté limpio antes de entregarlo a los clientes. Es un trabajo divertido que ayuda a desarrollar la concentración y las habilidades de organización.',
        questions: [
            { questionAr: 'يجب غسل اليدين جيدا قبل البدء فى لمس المنتجات.', questionEn: 'You must wash your hands well before touching the products.', questionFr: 'Il faut bien se laver les mains avant de toucher les produits.', questionEs: 'Debes lavarte bien las manos antes de tocar los productos.', answer: true },
            { questionAr: 'اذا وجدنا صندوقا ممزقا نضع فيه المنتج ونغلقه.', questionEn: 'If we find a torn box, we put the product in it and close it.', questionFr: 'Si nous trouvons une boîte déchirée, nous y mettons le produit et la fermons.', questionEs: 'Si encontramos una caja rota, metemos el producto en ella y la cerramos.', answer: false },
            { questionAr: 'نضع المنتجات داخل الصناديق بنظام وترتيب.', questionEn: 'We put products inside boxes in an organized and orderly way.', questionFr: 'Nous mettons les produits dans les boîtes de manière organisée et ordonnée.', questionEs: 'Ponemos los productos dentro de las cajas de forma organizada y ordenada.', answer: true },
            { questionAr: 'اذا سقط منتج على الارض يجب تنظيفه اولا قبل وضعه ف الكيس.', questionEn: 'If a product falls on the floor, we must clean it first before putting it in the bag.', questionFr: 'Si un produit tombe par terre, il faut le nettoyer avant de le mettre dans le sac.', questionEs: 'Si un producto se cae al suelo, debemos limpiarlo primero antes de meterlo en la bolsa.', answer: true },
            { questionAr: 'نستخدم الشريط اللاصق لاغلاق الصناديق باحكام.', questionEn: 'We use tape to close boxes tightly.', questionFr: 'Nous utilisons du ruban adhésif pour bien fermer les boîtes.', questionEs: 'Usamos cinta adhesiva para cerrar las cajas con fuerza.', answer: true },
            { questionAr: 'اذا شعرت بالتعب اخبر المشرف المسؤول اننى احتاج للراحة.', questionEn: 'If I feel tired, I tell the supervisor that I need to rest.', questionFr: 'Si je me sens fatigué, je dis au superviseur que j\'ai besoin de me reposer.', questionEs: 'Si me siento cansado, le digo al supervisor que necesito descansar.', answer: true },
            { questionAr: 'اذا طلب منى المدير وضع قطعتين فقط اضع عشر قطع.', questionEn: 'If the manager asks me to put only two pieces, I put ten pieces.', questionFr: 'Si le manager me demande de mettre seulement deux pièces, j\'en mets dix.', questionEs: 'Si el gerente me pide que ponga solo dos piezas, pongo diez.', answer: false },
            { questionAr: 'اساعد زميلى فى العمل اذا كان يحتاج للعمل.', questionEn: 'I help my coworker if they need help with work.', questionFr: 'J\'aide mon collègue s\'il a besoin d\'aide pour son travail.', questionEs: 'Ayudo a mi compañero de trabajo si necesita ayuda con el trabajo.', answer: true },
            { questionAr: 'اترك الصناديق فى وسط الممر ليتعثر بها الناس.', questionEn: 'I leave boxes in the middle of the aisle so people trip over them.', questionFr: 'Je laisse des boîtes au milieu de l\'allée pour que les gens trébuchent dessus.', questionEs: 'Dejo las cajas en medio del pasillo para que la gente se tropiece con ellas.', answer: false },
            { questionAr: 'التزم بمواعيد العمل واسمع تعليمات المشرف.', questionEn: 'I stick to work hours and listen to the supervisor\'s instructions.', questionFr: 'Je respecte les horaires de travail et j\'écoute les instructions du superviseur.', questionEs: 'Cumplo con el horario de trabajo y escucho las instrucciones del supervisor.', answer: true }
        ],
        trainVideo: './images/مساعد تغليف.mp4'
    },
    {
        id: 'gardening-worker',
        icon: './images/فلاح.jpeg',
        color: '#10B981',
        titleAr: 'عامل زراعة وحدائق',
        titleEn: 'Gardening Worker',
        titleFr: 'Ouvrier de jardinage',
        titleEs: 'Trabajador de jardinería',
        descriptionAr: 'تعتبر مهنة الزراعة والحدائق من اجمل المهن لانها تجعلنا نهتم بالطبيعة والنباتات. يقوم العامل فى هذه الوظيفة بسقى الزرع بالماء وتنظيف الحديقة من الاوراق اليابسة وزراعة الزهور الملونة لتصبح الحديقة مكانا جميلا.',
        descriptionEn: 'Farming and gardening is one of the most beautiful professions because it makes us care about nature and plants. The worker waters the plants, cleans the garden of dry leaves, and plants colorful flowers to make the garden a beautiful place.',
        descriptionFr: 'Le jardinage est l\'un des plus beaux métiers car il nous fait aimer la nature et les plantes. L\'ouvrier arrose les plantes, nettoie le jardin des feuilles mortes et plante des fleurs colorées pour faire du jardin un endroit magnifique.',
        descriptionEs: 'La jardinería es una de las profesiones más bellas porque nos hace cuidar la naturaleza y las plantas. El trabajador riega las plantas, limpia el jardín de hojas secas y planta flores de colores para hacer del jardín un lugar hermoso.',
        questions: [
            { questionAr: 'يجب سقى النباتات بالماء بانتظام لكى تعيش.', questionEn: 'Plants must be watered regularly so they can live.', questionFr: 'Les plantes doivent être arrosées régulièrement pour vivre.', questionEs: 'Las plantas deben regarse regularmente para que puedan vivir.', answer: true },
            { questionAr: 'يمكننا شد الزهور بقوة وقطعها من مكانها.', questionEn: 'We can pull flowers hard and cut them from their place.', questionFr: 'Nous pouvons tirer les fleurs fort et les couper de leur place.', questionEs: 'Podemos tirar de las flores con fuerza y cortarlas de su lugar.', answer: false },
            { questionAr: 'نجمع الاوراق اليابسة من الارض ونضعها فى سلة المهملات.', questionEn: 'We collect dry leaves from the ground and put them in the trash bin.', questionFr: 'Nous ramassons les feuilles mortes par terre et les mettons à la poubelle.', questionEs: 'Recogemos las hojas secas del suelo y las metemos en el cubo de la basura.', answer: true },
            { questionAr: 'نستخدم المرش المخصص لسقى النباتات الصغيرة برفق.', questionEn: 'We use the sprayer to water small plants gently.', questionFr: 'Nous utilisons le pulvérisateur pour arroser les petites plantes doucement.', questionEs: 'Usamos el rociador para regar las plantas pequeñas con suavidad.', answer: true },
            { questionAr: 'يجب المشى فوق الزهور الصغيرة لكى تنمو بسرعة.', questionEn: 'We must walk on small flowers so they grow fast.', questionFr: 'Il faut marcher sur les petites fleurs pour qu\'elles poussent vite.', questionEs: 'Debemos caminar sobre las flores pequeñas para que crezcan rápido.', answer: false },
            { questionAr: 'اذا رايت حشرة ضارة على النبات اخبر المشرف المسؤول.', questionEn: 'If I see a harmful insect on a plant, I tell the supervisor.', questionFr: 'Si je vois un insecte nuisible sur une plante, je préviens le superviseur.', questionEs: 'Si veo un insecto dañino en una planta, se lo digo al supervisor.', answer: true },
            { questionAr: 'نرتدى القفازات فى ايدينا لحمايتها اثناء العمل فى الطين.', questionEn: 'We wear gloves on our hands to protect them while working in the mud.', questionFr: 'Nous portons des gants aux mains pour les protéger du travail dans la boue.', questionEs: 'Usamos guantes en las manos para protegerlas mientras trabajamos en el barro.', answer: true },
            { questionAr: 'نترك ادوات الزراعة فى وسط الطريق بعد الانتهاء.', questionEn: 'We leave gardening tools in the middle of the path after finishing.', questionFr: 'Nous laissons les outils au milieu du chemin après avoir fini.', questionEs: 'Dejamos las herramientas de jardinería en medio del camino después de terminar.', answer: false },
            { questionAr: 'نزرع البذور فى التربة ونغطيها بالرمل برفق.', questionEn: 'We plant seeds in the soil and cover them gently with sand.', questionFr: 'Nous plantons les graines dans la terre et les couvrons doucement de sable.', questionEs: 'Plantamos semillas en la tierra y las cubrimos suavemente con arena.', answer: true },
            { questionAr: 'التزم بمواعيد العمل واحافظ على نظافة الحديقة.', questionEn: 'I stick to work hours and keep the garden clean.', questionFr: 'Je respecte les horaires et je garde le jardin propre.', questionEs: 'Cumplo con el horario de trabajo y mantengo el jardín limpio.', answer: true }
        ],
        trainVideo: './images/مساعد حديقة.mp4'
    },
    {
        id: 'supermarket-assistant',
        icon: './images/بائع فى سوبر ماركت.jpeg',
        color: '#3B82F6',
        titleAr: 'مساعد فى سوبر ماركت',
        titleEn: 'Supermarket Assistant',
        titleFr: 'Assistant de supermarché',
        titleEs: 'Asistente de supermercado',
        descriptionAr: 'مساعد السوبر ماركت يساعد فى ترتيب المنتجات على الرفوف داخل المتجر. كما يساعد الزبائن فى ايجاد الاشياء التى يريدونها ويحافظ على نظافة المكان وترتيبه.',
        descriptionEn: 'The supermarket assistant helps arrange products on the shelves inside the store. They also help customers find the things they want and keep the place clean and tidy.',
        descriptionFr: 'L\'assistant de supermarché aide à disposer les produits sur les étagères à l\'intérieur du magasin. Il aide également les clients à trouver ce qu\'ils cherchent et maintient l\'endroit propre et bien rangé.',
        descriptionEs: 'El asistente de supermercado ayuda a colocar los productos en los estantes dentro de la tienda. También ayuda a los clientes a encontrar lo que buscan y mantiene el lugar limpio y ordenado.',
        questions: [
            { questionAr: 'مساعد السوبر ماركت يعمل داخل متجر.', questionEn: 'The supermarket assistant works inside a store.', questionFr: 'L\'assistant de supermarché travaille dans un magasin.', questionEs: 'El asistente de supermercado trabaja dentro de una tienda.', answer: true },
            { questionAr: 'وظيفة مساعد السوبر ماركت هى ترتيب المنتجات.', questionEn: 'The job of the supermarket assistant is to arrange products.', questionFr: 'Le travail de l\'assistant de supermarché est de ranger les produits.', questionEs: 'El trabajo del asistente de supermercado es ordenar los productos.', answer: true },
            { questionAr: 'مساعد السوبر ماركت لا يساعد الزبائن.', questionEn: 'The supermarket assistant does not help customers.', questionFr: 'L\'assistant de supermarché n\'aide pas les clients.', questionEs: 'El asistente de supermercado no ayuda a los clientes.', answer: false },
            { questionAr: 'من عمل مساعد السوبر ماركت تنظيف المكان.', questionEn: 'Cleaning the place is part of the supermarket assistant\'s work.', questionFr: 'Nettoyer l\'endroit fait partie du travail de l\'assistant.', questionEs: 'Limpiar el lugar es parte del trabajo del asistente.', answer: true },
            { questionAr: 'المنتجات توضع على الرفوف.', questionEn: 'Products are placed on shelves.', questionFr: 'Les produits sont placés sur les étagères.', questionEs: 'Los productos se colocan en los estantes.', answer: true },
            { questionAr: 'مساعد السوبر ماركت يعمل فى المطار.', questionEn: 'The supermarket assistant works at the airport.', questionFr: 'L\'assistant de supermarché travaille à l\'aéroport.', questionEs: 'El asistente de supermercado trabaja en el aeropuerto.', answer: false },
            { questionAr: 'من عمله تعبئة المشتريات فى الاكياس.', questionEn: 'Packing purchases into bags is part of their work.', questionFr: 'Emballer les achats dans des sacs fait partie de son travail.', questionEs: 'Empacar las compras en bolsas es parte de su trabajo.', answer: true },
            { questionAr: 'يجب ان يكون المكان مرتبا ونظيفا.', questionEn: 'The place must be tidy and clean.', questionFr: 'L\'endroit doit être bien rangé et propre.', questionEs: 'El lugar debe estar ordenado y limpio.', answer: true },
            { questionAr: 'الزبائن ياتون لشراء المنتجات.', questionEn: 'Customers come to buy products.', questionFr: 'Les clients viennent pour acheter des produits.', questionEs: 'Los clientes vienen a comprar productos.', answer: true },
            { questionAr: 'مساعد السوبر ماركت لا يهتم بالمنتجات.', questionEn: 'The supermarket assistant does not care about the products.', questionFr: 'L\'assistant de supermarché ne se soucie pas des produits.', questionEs: 'El asistente de supermercado no se preocupa por los productos.', answer: false }
        ],
        trainVideo: './images/مساعد فى سوبر ماركت.mp4'
    },
    {
        id: 'cafe-assistant',
        icon: './images/مساعد فى مطعم.jpeg',
        color: '#1DB9A8',
        titleAr: 'مساعد فى كافيه',
        titleEn: 'Cafe Assistant',
        titleFr: 'Assistant de café',
        titleEs: 'Asistente de cafetería',
        descriptionAr: 'مساعد الكافيه يعمل فى تقديم الطلبات للزبائن ويساعد فى ترتيب الطاولات والكراسى كما يمكنه تحضير مشروبات بسيطة مثل القهوة او الشاى.',
        descriptionEn: 'The cafe assistant works on serving orders to customers, helps arrange tables and chairs, and can prepare simple drinks like coffee or tea.',
        descriptionFr: 'L\'assistant de café travaille à servir les commandes aux clients, aide à disposer les tables et les chaises, et peut préparer des boissons simples comme le café ou le thé.',
        descriptionEs: 'El asistente de cafetería trabaja sirviendo pedidos a los clientes, ayuda a colocar las mesas y sillas, y puede preparar bebidas sencillas como café o té.',
        questions: [
            { questionAr: 'مساعد الكافيه يعمل فى كافيه.', questionEn: 'The cafe assistant works in a cafe.', questionFr: 'L\'assistant de café travaille dans un café.', questionEs: 'El asistente de cafetería trabaja en una cafetería.', answer: true },
            { questionAr: 'من عمله تقديم الطلبات للزبائن.', questionEn: 'Serving orders to customers is part of their job.', questionFr: 'Servir les commandes aux clients fait partie de son travail.', questionEs: 'Servir pedidos a los clientes es parte de su trabajo.', answer: true },
            { questionAr: 'مساعد الكافيه لا يرتب الطاولات.', questionEn: 'The cafe assistant does not arrange tables.', questionFr: 'L\'assistant de café ne range pas les tables.', questionEs: 'El asistente de cafetería no ordena las mesas.', answer: false },
            { questionAr: 'يمكنه تحضير مشروبات بسيطة.', questionEn: 'They can prepare simple drinks.', questionFr: 'Il peut préparer des boissons simples.', questionEs: 'Puede preparar bebidas sencillas.', answer: true },
            { questionAr: 'الزبائن ياتون الى الكافيه لتناول الطعام او الشراب.', questionEn: 'Customers come to the cafe to eat or drink.', questionFr: 'Les clients viennent au café pour manger ou boire.', questionEs: 'Los clientes vienen a la cafetería a comer o beber.', answer: true },
            { questionAr: 'الكافيه مكان لبيع الملابس.', questionEn: 'The cafe is a place to sell clothes.', questionFr: 'Le café est un endroit pour vendre des vêtements.', questionEs: 'La cafetería es un lugar para vender ropa.', answer: false },
            { questionAr: 'من عمله احضار الاكواب والاطباق.', questionEn: 'Bringing cups and plates is part of their job.', questionFr: 'Apporter les tasses et les assiettes fait partie de son travail.', questionEs: 'Traer tazas y platos es parte de su trabajo.', answer: true },
            { questionAr: 'يجب ان تكون الطاولات مرتبة.', questionEn: 'The tables must be tidy.', questionFr: 'Les tables doivent être bien rangées.', questionEs: 'Las mesas deben estar ordenadas.', answer: true },
            { questionAr: 'مساعد الكافيه يعمل فى المستشفى.', questionEn: 'The cafe assistant works in a hospital.', questionFr: 'L\'assistant de café travaille dans un hôpital.', questionEs: 'El asistente de cafetería trabaja en un hospital.', answer: false },
            { questionAr: 'الابتسامة مهمة عند التعامل مع الزبائن.', questionEn: 'Smiling is important when dealing with customers.', questionFr: 'Sourire est important lors des contacts avec les clients.', questionEs: 'Sonreír es importante al tratar con los clientes.', answer: true }
        ],
        trainVideo: './images/مساعد فى مطعم.mp4'
    },
    {
        id: 'office-assistant',
        icon: './images/ريسيبشانيست.jpeg',
        color: '#7C3AED',
        titleAr: 'مساعد مكتبى',
        titleEn: 'Office Assistant',
        titleFr: 'Assistant de bureau',
        titleEs: 'Asistente de oficina',
        descriptionAr: 'يعمل داخل المكتب ويساعد فى ترتيب الملفات والاوراق كما يساعد فى تنظيم المكتب وتوزيع الاوراق.',
        descriptionEn: 'He works inside the office and helps arrange files and papers, and also helps organize the office and distribute papers.',
        descriptionFr: 'Il travaille à l\'intérieur du bureau et aide à classer les dossiers et les papiers, et aide également à organiser le bureau et à distribuer les documents.',
        descriptionEs: 'Trabaja dentro de la oficina y ayuda a organizar archivos y papeles, y también ayuda a organizar la oficina y distribuir documentos.',
        questions: [
            { questionAr: 'المساعد المكتبى يعمل فى مكتب.', questionEn: 'The office assistant works in an office.', questionFr: 'L\'assistant de bureau travaille dans un bureau.', questionEs: 'El asistente de oficina trabaja en una oficina.', answer: true },
            { questionAr: 'من عمله ترتيب الملفات.', questionEn: 'Arranging files is part of his job.', questionFr: 'Classer les dossiers fait partie de son travail.', questionEs: 'Organizar archivos es parte de su trabajo.', answer: true },
            { questionAr: 'المساعد المكتبى يعمل فى البحر.', questionEn: 'The office assistant works at sea.', questionFr: 'L\'assistant de bureau travaille en mer.', questionEs: 'El asistente de oficina trabaja en el mar.', answer: false },
            { questionAr: 'من عمله توزيع الاوراق.', questionEn: 'Distributing papers is part of his job.', questionFr: 'Distribuer les papiers fait partie de son travail.', questionEs: 'Distribuir documentos es parte de su trabajo.', answer: true },
            { questionAr: 'المكتب يجب ان يكون مرتبا.', questionEn: 'The office must be tidy.', questionFr: 'Le bureau doit être bien rangé.', questionEs: 'La oficina debe estar ordenada.', answer: true },
            { questionAr: 'المساعد المكتبى لا يهتم بالاوراق.', questionEn: 'The office assistant does not care about papers.', questionFr: 'L\'assistant de bureau ne se soucie pas des papiers.', questionEs: 'El asistente de oficina no se preocupa por los papeles.', answer: false },
            { questionAr: 'من عمله تنظيم المكتب.', questionEn: 'Organizing the office is part of his job.', questionFr: 'Organiser le bureau fait partie de son travail.', questionEs: 'Organizar la oficina es parte de su trabajo.', answer: true },
            { questionAr: 'الملفات تحتفظ داخل المكتب.', questionEn: 'Files are kept inside the office.', questionFr: 'Les dossiers sont conservés à l\'intérieur du bureau.', questionEs: 'Los archivos se guardan dentro de la oficina.', answer: true },
            { questionAr: 'المساعد المكتبى يعمل فى مزرعة.', questionEn: 'The office assistant works on a farm.', questionFr: 'L\'assistant de bureau travaille dans une ferme.', questionEs: 'El asistente de oficina trabaja en una granja.', answer: false },
            { questionAr: 'ترتيب الملفات يساعد على سهولة العمل.', questionEn: 'Arranging files helps make work easier.', questionFr: 'Le classement des dossiers facilite le travail.', questionEs: 'Organizar los archivos ayuda a facilitar el trabajo.', answer: true }
        ],
        trainVideo: './images/عامل فى مكتبة.mp4'
    },
    {
        id: 'hotel-assistant',
        icon: './images/ريسيبشانيست.jpeg',
        color: '#FFB830',
        titleAr: 'مساعد فى فندق',
        titleEn: 'Hotel Assistant',
        titleFr: 'Assistant d\'hôtel',
        titleEs: 'Asistente de hotel',
        descriptionAr: 'مساعد الفندق يعمل على مساعدة الضيوف ويساعد فى الترحيب بالناس وتنظيم المكان كما يساعد الموظفين فى بعض الاعمال البسيطة.',
        descriptionEn: 'The hotel assistant helps guests, helps welcome people and organize the place, and also assists staff with some simple tasks.',
        descriptionFr: 'L\'assistant d\'hôtel aide les clients, aide à accueillir les gens et à organiser les lieux, et assiste également le personnel dans certaines tâches simples.',
        descriptionEs: 'El asistente de hotel ayuda a los huéspedes, ayuda a dar la bienvenida a las personas y a organizar el lugar, y también asiste al personal en algunas tareas sencillas.',
        questions: [
            { questionAr: 'مساعد الفندق يعمل فى فندق.', questionEn: 'The hotel assistant works in a hotel.', questionFr: 'L\'assistant d\'hôtel travaille dans un hôtel.', questionEs: 'El asistente de hotel trabaja en un hotel.', answer: true },
            { questionAr: 'من عمله الترحيب بالضيوف.', questionEn: 'Welcoming guests is part of his job.', questionFr: 'Accueillir les clients fait partie de son travail.', questionEs: 'Dar la bienvenida a los huéspedes es parte de su trabajo.', answer: true },
            { questionAr: 'الضيوف ياتون الى الفندق للاقامة.', questionEn: 'Guests come to the hotel to stay.', questionFr: 'Les clients viennent à l\'hôtel pour séjourner.', questionEs: 'Los huéspedes vienen al hotel para quedarse.', answer: true },
            { questionAr: 'مساعد الفندق لا يساعد الموظفين.', questionEn: 'The hotel assistant does not help staff.', questionFr: 'L\'assistant d\'hôtel n\'aide pas le personnel.', questionEs: 'El asistente de hotel no ayuda al personal.', answer: false },
            { questionAr: 'الفندق مكان لاستقبال الزوار.', questionEn: 'The hotel is a place to receive visitors.', questionFr: 'L\'hôtel est un lieu pour recevoir des visiteurs.', questionEs: 'El hotel es un lugar para recibir visitantes.', answer: true },
            { questionAr: 'من عمله المساعدة فى ترتيب المكان.', questionEn: 'Helping to arrange the place is part of his job.', questionFr: 'Aider à ranger l\'endroit fait partie de son travail.', questionEs: 'Ayudar a organizar el lugar es parte de su trabajo.', answer: true },
            { questionAr: 'الفندق مكان لبيع الطعام فقط.', questionEn: 'The hotel is a place to sell food only.', questionFr: 'L\'hôtel est un endroit pour vendre uniquement de la nourriture.', questionEs: 'El hotel es un lugar para vender comida únicamente.', answer: false },
            { questionAr: 'يجب ان يكون المكان نظيفا.', questionEn: 'The place must be clean.', questionFr: 'L\'endroit doit être propre.', questionEs: 'El lugar debe estar limpio.', answer: true },
            { questionAr: 'الضيوف يحبون المعاملة الجيدة.', questionEn: 'Guests like good treatment.', questionFr: 'Les clients aiment être bien traités.', questionEs: 'A los huéspedes les gusta el buen trato.', answer: true },
            { questionAr: 'مساعد الفندق يعمل فى مصنع.', questionEn: 'The hotel assistant works in a factory.', questionFr: 'L\'assistant d\'hôtel travaille dans une usine.', questionEs: 'El asistente de hotel trabaja en una fábrica.', answer: false }
        ],
        trainVideo: './images/ريسيبشانيست.mp4'
    },
    {
        id: 'nursery-assistant',
        icon: './images/مساعد فى حضانة.jpeg',
        color: '#F43F5E',
        titleAr: 'مساعد فى حضانة اطفال',
        titleEn: 'Nursery Assistant',
        titleFr: 'Assistant de crèche',
        titleEs: 'Asistente de guardería',
        descriptionAr: 'يقوم المساعد فى هذه الوظيفة بتقديم الرعاية واللطف للاطفال الصغار داخل الحضانة. يتضمن العمل المساعدة فى ترتيب الالعاب ومساعدة الاطفال اثناء وقت الطعام واللعب معهم برفق والتاكد من ان المكان نظيف وامن من اجلهم هى وظيفة مليئة بالحب والبهجة.',
        descriptionEn: 'The assistant in this job provides care and kindness to young children in the nursery. The work includes helping to arrange toys, assisting children during meal times, playing gently with them, and making sure the place is clean and safe for them. It is a job full of love and joy.',
        descriptionFr: 'L\'assistant dans ce travail apporte soin et gentillesse aux jeunes enfants de la crèche. Le travail comprend l\'aide au rangement des jouets, l\'assistance aux enfants pendant les repas, le jeu doux avec eux et la garantie que l\'endroit est propre et sûr pour eux. C\'est un travail plein d\'amour et de joie.',
        descriptionEs: 'El asistente en este trabajo brinda cuidado y amabilidad a los niños pequeños en la guardería. El trabajo incluye ayudar a organizar los juguetes, asistir a los niños durante las comidas, jugar suavemente con ellos y asegurarse de que el lugar esté limpio y sea seguro para ellos. Es un trabajo lleno de amor y alegría.',
        questions: [
            { questionAr: 'يجب ان ابتسم فى وجه الاطفال واتعامل معهم بلطف.', questionEn: 'I must smile at the children and treat them kindly.', questionFr: 'Je dois sourire aux enfants et les traiter avec gentillesse.', questionEs: 'Debo sonreír a los niños y tratarlos con amabilidad.', answer: true },
            { questionAr: 'يمكننى ترك الالعاب مبعثرة على الارض بعد انتهاء وقت اللعب.', questionEn: 'I can leave the toys scattered on the floor after playtime.', questionFr: 'Je peux laisser les jouets éparpillés sur le sol après le temps de jeu.', questionEs: 'Puedo dejar los juguetes esparcidos por el suelo después del tiempo de juego.', answer: false },
            { questionAr: 'اساعد الاطفال فى غسل ايديهم قبل تناول الطعام.', questionEn: 'I help the children wash their hands before eating.', questionFr: 'J\'aide les enfants à se laver les mains avant de manger.', questionEs: 'Ayudo a los niños a lavarse las manos antes de comer.', answer: true },
            { questionAr: 'اذا بكى طفل صغير احاول تهدئته او انادى المعلمة المسؤولة.', questionEn: 'If a young child cries, I try to calm them or call the teacher in charge.', questionFr: 'Si un jeune enfant pleure, j\'essaie de le calmer ou j\'appelle l\'enseignante responsable.', questionEs: 'Si un niño pequeño llora, trato de calmarlo o llamo a la maestra a cargo.', answer: true },
            { questionAr: 'يمكننى الصراخ بصوت عالى جدا بجانب الاطفال.', questionEn: 'I can shout very loudly near the children.', questionFr: 'Je peux crier très fort près des enfants.', questionEs: 'Puedo gritar muy fuerte cerca de los niños.', answer: false },
            { questionAr: 'اتاكد من اعادة كل لعبة الى مكانها الصحيح بعد الاستخدام.', questionEn: 'I make sure to put each toy back in its correct place after use.', questionFr: 'Je m\'assure de remettre chaque jouet à sa place après utilisation.', questionEs: 'Me aseguro de volver a poner cada juguete en su lugar correcto después de su uso.', answer: true },
            { questionAr: 'يجب ان اكون صبورا وهادئا اثناء التعامل مع الاطفال.', questionEn: 'I must be patient and calm when dealing with children.', questionFr: 'Je dois être patient et calme avec les enfants.', questionEs: 'Debo ser paciente y estar tranquilo al tratar con los niños.', answer: true },
            { questionAr: 'اذا رايت طفلا يركض نحو الباب بمفرده يجب ان انتبه له فورا.', questionEn: 'If I see a child running towards the door alone, I must pay attention immediately.', questionFr: 'Si je vois un enfant courir seul vers la porte, je dois faire attention immédiatement.', questionEs: 'Si veo a un niño corriendo solo hacia la puerta, debo prestar atención de inmediato.', answer: true },
            { questionAr: 'يمكننى اكل طعام الاطفال المخصص لهم.', questionEn: 'I can eat the children\'s food that is meant for them.', questionFr: 'Je peux manger la nourriture des enfants qui leur est destinée.', questionEs: 'Puedo comer la comida de los niños que es para ellos.', answer: false },
            { questionAr: 'احافظ على نظافة المكان واسمع تعليمات مديرة الحضانة.', questionEn: 'I keep the place clean and listen to the nursery director\'s instructions.', questionFr: 'Je garde l\'endroit propre et j\'écoute les instructions de la directrice de la crèche.', questionEs: 'Mantengo el lugar limpio y escucho las instrucciones de la directora de la guardería.', answer: true }
        ],
        trainVideo: './images/مساعد فى حضانة.mp4'
    }
];

// ── EXISTING DATA ────────────────────────────────────────────────────
var JOBS_DATA = [
    {
        id: 'store', icon: '🛒', name: 'Store Helper', nameAr: 'مساعد متجر', nameFr: 'Assistant de magasin', nameEs: 'Ayudante de tienda', color: '#FF6B35',
        desc: 'Helps customers find products, organises shelves, and keeps the store tidy.',
        descAr: 'يساعد العملاء في إيجاد المنتجات وينظم الرفوف.',
        descFr: 'Aide les clients à trouver des produits, organise les étagères et maintient le magasin propre.',
        descEs: 'Ayuda a los clientes a encontrar productos, organiza los estantes y mantiene la tienda ordenada.',
        questions: [
            { q: 'Do you enjoy helping people?', qAr: 'هل تستمتع بمساعدة الناس؟', qFr: 'Aimez-vous aider les gens ?', qEs: '¿Te gusta ayudar a la gente?', opts: ['Yes, I love it! 😊', 'Sometimes', 'Not really'], optsAr: ['نعم، أحب ذلك! 😊', 'أحياناً', 'ليس حقاً'], optsFr: ['Oui, j\'adore ! 😊', 'Parfois', 'Pas vraiment'], optsEs: ['¡Sí, me encanta! 😊', 'A veces', 'No mucho'], scores: [3, 2, 1] },
            { q: 'Can you count items and stay organised?', qAr: 'هل يمكنك عد الأشياء والبقاء منظماً؟', qFr: 'Pouvez-vous compter les articles et rester organisé ?', qEs: '¿Puedes contar artículos y ser organizado?', opts: ['Yes, very organised!', 'I can try', 'I find it hard'], optsAr: ['نعم، منظم جداً!', 'يمكنني المحاولة', 'أجد ذلك صعباً'], optsFr: ['Oui, très organisé !', 'Je peux essayer', 'C\'est difficile'], optsEs: ['¡Sí, muy organizado!', 'Puedo intentarlo', 'Me resulta difícil'], scores: [3, 2, 1] },
            { q: 'Do you like working with people?', qAr: 'هل تحب العمل مع الآخرين؟', qFr: 'Aimez-vous travailler avec les autres ?', qEs: '¿Te gusta trabajar con gente?', opts: ['I love teamwork! 🤝', 'Sometimes', 'I prefer alone'], optsAr: ['أحب العمل الجماعي! 🤝', 'أحياناً', 'أفضل وحدي'], optsFr: ['J\'adore le travail d\'équipe ! 🤝', 'Parfois', 'Je préfère seul'], optsEs: ['¡Amo el trabajo en equipo! 🤝', 'A veces', 'Prefiero solo'], scores: [3, 2, 1] },
            { q: 'Can you stand for most of the day?', qAr: 'هل يمكنك الوقوف معظم اليوم؟', qFr: 'Pouvez-vous rester debout la majeure partie de la journée ?', qEs: '¿Puedes estar de pie casi todo el día?', opts: ['Yes, no problem!', 'With breaks', 'That is hard'], optsAr: ['نعم، لا مشكلة!', 'مع فترات راحة', 'هذا صعب'], optsFr: ['Oui, pas de problème !', 'Avec des pauses', 'C\'est dur'], optsEs: ['¡Sí, sin problema!', 'Con descansos', 'Es difícil'], scores: [3, 2, 1] },
            { q: 'Do you like keeping places tidy?', qAr: 'هل تحب إبقاء الأماكن نظيفة؟', qFr: 'Aimez-vous garder les endroits propres ?', qEs: '¿Te gusta mantener los lugares ordenados?', opts: ['Yes! I love tidying! 🧹', 'Sometimes', 'Not really'], optsAr: ['نعم! أحب الترتيب! 🧹', 'أحياناً', 'ليس حقاً'], optsFr: ['Oui ! J\'adore ranger ! 🧹', 'Parfois', 'Pas vraiment'], optsEs: ['¡Sí! ¡Amo ordenar! 🧹', 'A veces', 'No mucho'], scores: [3, 2, 1] }
        ]
    },
    {
        id: 'cafe', icon: '☕', name: 'Café Assistant', nameAr: 'مساعد مقهى', nameFr: 'Assistant de café', nameEs: 'Asistente de cafetería', color: '#1DB9A8',
        desc: 'Serves drinks and food, keeps the café clean, and makes every customer feel welcome.',
        descAr: 'يخدم المشروبات والطعام ويحافظ على نظافة المقهى.',
        descFr: 'Sert des boissons et de la nourriture, maintient le café propre et accueille les clients.',
        descEs: 'Sirve bebidas y comida, mantiene la cafetería limpia y hace que los clientes se sientan bienvenidos.',
        questions: [
            { q: 'Do you enjoy talking to people?', qAr: 'هل تستمتع بالتحدث مع الناس؟', qFr: 'Aimez-vous parler aux gens ?', qEs: '¿Te gusta hablar con la gente?', opts: ['I love it! 😄', 'Sometimes', 'I prefer quiet tasks'], optsAr: ['أحب ذلك! 😄', 'أحياناً', 'أفضل المهام الهادئة'], optsFr: ['J\'adore ! 😄', 'Parfois', 'Je préfère le calme'], optsEs: ['¡Me encanta! 😄', 'A veces', 'Prefiero tareas tranquilas'], scores: [3, 2, 1] },
            { q: 'Can you carry trays and move quickly?', qAr: 'هل يمكنك حمل الصواني والتحرك بسرعة؟', qFr: 'Pouvez-vous porter des plateaux et bouger vite ?', qEs: '¿Puedes llevar bandejas y moverte rápido?', opts: ['Yes, easily!', 'With practice', 'Sounds difficult'], optsAr: ['نعم، بسهولة!', 'مع التدريب', 'يبدو صعباً'], optsFr: ['Oui, facilement !', 'Avec de l\'entraînement', 'Ça semble dur'], optsEs: ['¡Sí, fácilmente!', 'Con práctica', 'Parece difícil'], scores: [3, 2, 1] },
            { q: 'Do you like busy, lively places?', qAr: 'هل تحب الأماكن المزدحمة والحيوية؟', qFr: 'Aimez-vous les endroits animés ?', qEs: '¿Te gustan los lugares concurridos y animados?', opts: ['Love the energy! ⚡', 'I can manage', 'I prefer quiet'], optsAr: ['أحب هذه الطاقة! ⚡', 'يمكنني التدبر', 'أفضل الهدوء'], optsFr: ['J\'adore l\'énergie ! ⚡', 'Je peux gérer', 'Je préfère le calme'], optsEs: ['¡Amo la energía! ⚡', 'Puedo manejarlo', 'Prefiero la calma'], scores: [3, 2, 1] },
            { q: 'Can you remember simple orders?', qAr: 'هل يمكنك تذكر الطلبات البسيطة؟', qFr: 'Pouvez-vous retenir des commandes simples ?', qEs: '¿Puedes recordar pedidos sencillos?', opts: ['Good memory!', 'I write them', 'That is hard'], optsAr: ['ذاكرة جيدة!', 'أكتبها', 'هذا صعب'], optsFr: ['Bonne mémoire !', 'Je les note', 'C\'est dur'], optsEs: ['¡Buena memoria!', 'Los anoto', 'Es difícil'], scores: [3, 2, 1] },
            { q: 'Do you care about making people welcome?', qAr: 'هل تهتم بجعل الناس يشعرون بالترحيب؟', qFr: 'Est-ce important pour vous d\'accueillir les gens ?', qEs: '¿Te importa que la gente se sienta bienvenida?', opts: ['Always! 💝', 'Most times', 'Not really'], optsAr: ['دائماً! 💝', 'معظم الوقت', 'ليس حقاً'], optsFr: ['Toujours ! 💝', 'La plupart du temps', 'Pas vraiment'], optsEs: ['¡Siempre! 💝', 'Casi siempre', 'No mucho'], scores: [3, 2, 1] }
        ]
    },
    {
        id: 'library', icon: '📚', name: 'Library Assistant', nameAr: 'مساعد مكتبة', nameFr: 'Assistant de bibliothèque', nameEs: 'Asistente de biblioteca', color: '#7C3AED',
        desc: 'Organises and sorts books, helps visitors find materials, and keeps the library peaceful.',
        descAr: 'ينظم الكتب ويساعد الزوار في إيجاد ما يبحثون عنه.',
        descFr: 'Organise et trie les livres, aide les visiteurs à trouver des documents et maintient le calme.',
        descEs: 'Organiza y clasifica libros, ayuda a los visitantes a encontrar materiales y mantiene la calma.',
        questions: [
            { q: 'Do you enjoy organising and sorting?', qAr: 'هل تستمتع بالتنظيم والترتيب؟', qFr: 'Aimez-vous organiser et trier ?', qEs: '¿Te gusta organizar y clasificar?', opts: ['Love sorting! 📂', 'Sometimes', 'Not really'], optsAr: ['أحب الترتيب! 📂', 'أحياناً', 'ليس حقاً'], optsFr: ['J\'adore trier ! 📂', 'Parfois', 'Pas vraiment'], optsEs: ['¡Amo clasificar! 📂', 'A veces', 'No mucho'], scores: [3, 2, 1] },
            { q: 'Can you work in a quiet environment?', qAr: 'هل يمكنك العمل في بيئة هادئة؟', qFr: 'Pouvez-vous travailler dans le calme ?', qEs: '¿Puedes trabajar en un ambiente tranquilo?', opts: ['Love quiet! 🤫', 'Can manage', 'Prefer busy'], optsAr: ['أحب الهدوء! 🤫', 'يمكنني التدبر', 'أفضل الأماكن المزدحمة'], optsFr: ['J\'adore le calme ! 🤫', 'Je peux gérer', 'Je préfère l\'agitation'], optsEs: ['¡Amo el silencio! 🤫', 'Puedo manejarlo', 'Prefiero el movimiento'], scores: [3, 2, 1] },
            { q: 'Do you like helping people find information?', qAr: 'هل تحب مساعدة الناس في العثور على معلومات؟', qFr: 'Aimez-vous aider les gens à trouver des infos ?', qEs: '¿Te gusta ayudar a la gente a encontrar información?', opts: ['Yes, always!', 'Sometimes', 'Not really'], optsAr: ['نعم، دائماً!', 'أحياناً', 'ليس حقاً'], optsFr: ['Oui, toujours !', 'Parfois', 'Pas vraiment'], optsEs: ['¡Sí, siempre!', 'A veces', 'No mucho'], scores: [3, 2, 1] },
            { q: 'Are you careful and detail-oriented?', qAr: 'هل أنت دقيق ومنتبه للتفاصيل؟', qFr: 'Êtes-vous minutieux ?', qEs: '¿Eres cuidadoso y detallista?', opts: ['Very careful! 🎯', 'Mostly yes', 'I miss things'], optsAr: ['دقيق جداً! 🎯', 'غالباً نعم', 'أفوت بعض الأشياء'], optsFr: ['Très minutieux ! 🎯', 'Plutôt oui', 'J\'oublie des choses'], optsEs: ['¡Muy cuidadoso! 🎯', 'Casi siempre sí', 'Se me pasan cosas'], scores: [3, 2, 1] },
            { q: 'Do you enjoy being around books?', qAr: 'هل تستمتع بالتواجد مع الكتب؟', qFr: 'Aimez-vous être entouré de livres ?', qEs: '¿Te gusta estar rodeado de libros?', opts: ['Love books! 📖', 'They are okay', 'Not really'], optsAr: ['أحب الكتب! 📖', 'إنها جيدة', 'ليس حقاً'], optsFr: ['J\'adore les livres ! 📖', 'Ils sont corrects', 'Pas vraiment'], optsEs: ['¡Amo los libros! 📖', 'Están bien', 'No mucho'], scores: [3, 2, 1] }
        ]
    },
    {
        id: 'garden', icon: '🌿', name: 'Garden Helper', nameAr: 'مساعد حديقة', nameFr: 'Assistant de jardin', nameEs: 'Ayudante de jardín', color: '#10B981',
        desc: 'Plants flowers, waters plants, keeps gardens beautiful. A peaceful outdoor job!',
        descAr: 'يزرع الزهور ويسقي النباتات ويحافظ على جمال الحدائق.',
        descFr: 'Plante des fleurs, arrose les plantes, maintient les jardins beaux.',
        descEs: 'Planta flores, riega plantas, mantiene los jardines hermosos.',
        questions: [
            { q: 'Do you enjoy working outdoors?', qAr: 'هل تستمتع بالعمل في الهواء الطلق؟', qFr: 'Aimez-vous travailler dehors ?', qEs: '¿Te gusta trabajar al aire libre?', opts: ['Love being outside! 🌞', 'Sometimes', 'Prefer indoors'], optsAr: ['أحب الوجود في الخارج! 🌞', 'أحياناً', 'أفضل الداخل'], optsFr: ['J\'adore être dehors ! 🌞', 'Parfois', 'Je préfère l\'intérieur'], optsEs: ['¡Amo estar afuera! 🌞', 'A veces', 'Prefiero el interior'], scores: [3, 2, 1] },
            { q: 'Do you like plants and nature?', qAr: 'هل تحب النباتات والطبيعة؟', qFr: 'Aimez-vous les plantes et la nature ?', qEs: '¿Te gustan las plantas y la naturaleza?', opts: ['Nature is beautiful! 🌸', 'A little', 'Not really'], optsAr: ['الطبيعة جميلة! 🌸', 'قليلاً', 'ليس حقاً'], optsFr: ['La nature est belle ! 🌸', 'Un peu', 'Pas vraiment'], optsEs: ['¡La naturaleza es bella! 🌸', 'Un poco', 'No mucho'], scores: [3, 2, 1] },
            { q: 'Can you do physical tasks like digging?', qAr: 'هل يمكنك القيام بمهام جسدية كالحفر؟', qFr: 'Pouvez-vous creuser ou jardiner ?', qEs: '¿Puedes hacer tareas físicas como cavar?', opts: ['Yes, I am strong! 💪', 'With breaks', 'Too hard'], optsAr: ['نعم، أنا قوي! 💪', 'مع فترات راحة', 'صعب جداً'], optsFr: ['Oui, je suis fort ! 💪', 'Avec des pauses', 'Trop dur'], optsEs: ['¡Sí, soy fuerte! 💪', 'Con descansos', 'Muy difícil'], scores: [3, 2, 1] },
            { q: 'Do you enjoy quiet, peaceful work?', qAr: 'هل تستمتع بالعمل الهادئ والسلمي؟', qFr: 'Aimez-vous le travail calme ?', qEs: '¿Disfrutas del trabajo tranquilo y pacífico?', opts: ['Love calm work!', 'Sometimes', 'Prefer busy'], optsAr: ['أحب العمل الهادئ!', 'أحياناً', 'أفضل الأماكن المزدحمة'], optsFr: ['J\'adore le travail calme !', 'Parfois', 'Je préfère l\'agitation'], optsEs: ['¡Amo el trabajo tranquilo!', 'A veces', 'Prefiero el movimiento'], scores: [3, 2, 1] },
            { q: 'Can you follow a daily routine?', qAr: 'هل يمكنك اتباع روتين يومي؟', qFr: 'Pouvez-vous suivre une routine ?', qEs: '¿Puedes seguir una rutina diaria?', opts: ['Routines help me! ⏰', 'Usually yes', 'Find routines hard'], optsAr: ['الروتين يساعدني! ⏰', 'عادة نعم', 'أجد الروتين صعباً'], optsFr: ['La routine m\'aide ! ⏰', 'Généralement oui', 'C\'est dur pour moi'], optsEs: ['¡La rutina me ayuda! ⏰', 'Casi siempre sí', 'Me cuesta'], scores: [3, 2, 1] }
        ]
    },
    {
        id: 'office', icon: '🏢', name: 'Office Helper', nameAr: 'مساعد مكتب', nameFr: 'Assistant de bureau', nameEs: 'Ayudante de oficina', color: '#3B82F6',
        desc: 'Organises documents, delivers messages, helps with filing. An indoor professional role.',
        descAr: 'ينظم المستندات ويوصل الرسائل ويساعد في الأرشفة.',
        descFr: 'Organise les documents, livre les messages, aide au classement.',
        descEs: 'Organiza documentos, entrega mensajes, ayuda con el archivo.',
        questions: [
            { q: 'Do you enjoy indoor desk-based work?', qAr: 'هل تستمتع بالعمل المكتبي الداخلي؟', qFr: 'Aimez-vous le travail de bureau ?', qEs: '¿Te gusta el trabajo de oficina?', opts: ['Offices are great! 💼', 'Sometimes', 'Prefer outdoor'], optsAr: ['المكاتب رائعة! 💼', 'أحياناً', 'أفضل الخارج'], optsFr: ['Les bureaux sont super ! 💼', 'Parfois', 'Je préfère l\'extérieur'], optsEs: ['¡Las oficinas son geniales! 💼', 'A veces', 'Prefiero afuera'], scores: [3, 2, 1] },
            { q: 'Can you organise papers carefully?', qAr: 'هل يمكنك تنظيم الأوراق بعناية؟', qFr: 'Pouvez-vous classer des papiers ?', qEs: '¿Puedes organizar papeles con cuidado?', opts: ['Very carefully!', 'With some help', 'Sounds hard'], optsAr: ['بعناية فائقة!', 'ببعض المساعدة', 'يبدو صعباً'], optsFr: ['Très soigneusement !', 'Avec de l\'aide', 'Ça semble dur'], optsEs: ['¡Muy cuidadosamente!', 'Con algo de ayuda', 'Parece difícil'], scores: [3, 2, 1] },
            { q: 'Do you like following clear rules?', qAr: 'هل تحب اتباع القواعد الواضحة؟', qFr: 'Aimez-vous suivre des règles claires ?', qEs: '¿Te gusta seguir reglas claras?', opts: ['Love clear rules!', 'Usually yes', 'Prefer freedom'], optsAr: ['أحب القواعد الواضحة!', 'عادة نعم', 'أفضل الحرية'], optsFr: ['J\'adore les règles !', 'Généralement oui', 'Je préfère la liberté'], optsEs: ['¡Amo las reglas claras!', 'Casi siempre sí', 'Prefiero libertad'], scores: [3, 2, 1] },
            { q: 'Can you use a computer for basic tasks?', qAr: 'هل يمكنك استخدام الكمبيوتر للمهام الأساسية؟', qFr: 'Savez-vous utiliser un ordinateur ?', qEs: '¿Puedes usar una computadora para tareas básicas?', opts: ['Yes I can! 💻', 'With training', 'Not yet'], optsAr: ['نعم يمكنني! 💻', 'مع التدريب', 'ليس بعد'], optsFr: ['Oui je peux ! 💻', 'Avec formation', 'Pas encore'], optsEs: ['¡Sí, puedo! 💻', 'Con capacitación', 'Aún no'], scores: [3, 2, 1] },
            { q: 'Are you polite and professional?', qAr: 'هل أنت مؤدب واحترافي؟', qFr: 'Êtes-vous poli et professionnel ?', qEs: '¿Eres educado y profesional?', opts: ['Always! 😊', 'Usually', 'Not always'], optsAr: ['دائماً! 😊', 'عادة', 'ليس دائماً'], optsFr: ['Toujours ! 😊', 'Généralement', 'Pas toujours'], optsEs: ['¡Siempre! 😊', 'Normalmente', 'No siempre'], scores: [3, 2, 1] }
        ]
    }
];

var JOBS_LISTINGS = [
    { id: 1, title: 'Store Helper', titleAr: 'مساعد متجر', titleFr: 'Assistant de magasin', titleEs: 'Ayudante de tienda', company: 'Al-Amal Supermarket', companyAr: 'سوبر ماركت الأمل', companyFr: 'Supermarché Al-Amal', companyEs: 'Supermercado Al-Amal', icon: '🛒', type: 'Retail', typeAr: 'التجزئة', typeFr: 'Commerce', typeEs: 'Venta al por menor', location: 'Cairo', locationAr: 'القاهرة', locationFr: 'Le Caire', locationEs: 'El Cairo', match: 95, desc: 'Help customers and organise shelves in a welcoming inclusive team.', descAr: 'ساعد العملاء ونظم الرفوف في فريق شامل وودود.', descFr: 'Aidez les clients et organisez les étagères dans une équipe inclusive.', descEs: 'Ayuda a los clientes y organiza estantes en un equipo inclusivo.', tags: ['Retail', 'No Experience', 'Full Time'], tagsAr: ['التجزئة', 'بدون خبرة', 'دوام كامل'], tagsFr: ['Commerce', 'Sans expérience', 'Temps plein'], tagsEs: ['Venta', 'Sin experiencia', 'Tiempo completo'] },
    { id: 2, title: 'Café Assistant', titleAr: 'مساعد مقهى', titleFr: 'Assistant de café', titleEs: 'Asistente de cafetería', company: 'Sunrise Café', companyAr: 'كافيه الشروق', companyFr: 'Café Sunrise', companyEs: 'Café Sunrise', icon: '☕', type: 'Food', typeAr: 'المطاعم والكافيهات', typeFr: 'Restauration', typeEs: 'Alimentos y Bebidas', location: 'Cairo', locationAr: 'القاهرة', locationFr: 'Le Caire', locationEs: 'El Cairo', match: 90, desc: 'Serve drinks and snacks, greet customers, and keep the café tidy.', descAr: 'تلقى الطلبات ورحب بالعملاء وحافظ على نظافة المقهى.', descFr: 'Servez des boissons, accueillez les clients et gardez le café propre.', descEs: 'Sirve bebidas y aperitivos, saluda a los clientes y mantén el café ordenado.', tags: ['Food', 'Part Time', 'Friendly Team'], tagsAr: ['طعام', 'دوام جزئي', 'فريق ودود'], tagsFr: ['Alimentation', 'Temps partiel', 'Équipe sympa'], tagsEs: ['Comida', 'Medio tiempo', 'Equipo amigable'] },
    { id: 3, title: 'Library Assistant', titleAr: 'مساعد مكتبة', titleFr: 'Assistant de bibliothèque', titleEs: 'Asistente de biblioteca', company: 'City Public Library', companyAr: 'مكتبة المدينة العامة', companyFr: 'Bibliothèque Publique', companyEs: 'Biblioteca Pública', icon: '📚', type: 'Education', typeAr: 'التعليم', typeFr: 'Éducation', typeEs: 'Educación', location: 'Alexandria', locationAr: 'الإسكندرية', locationFr: 'Alexandrie', locationEs: 'Alejandría', match: 85, desc: 'Sort books, help visitors find materials, and maintain the library.', descAr: 'رتب الكتب وساعد الزوار في العثور على المواد وحافظ على المكتبة.', descFr: 'Triez les livres, aidez les visiteurs et entretenez la bibliothèque.', descEs: 'Clasifica libros, ayuda a los visitantes y mantén la biblioteca.', tags: ['Education', 'Quiet', 'Structured'], tagsAr: ['تعليم', 'هادئ', 'منظم'], tagsFr: ['Éducation', 'Calme', 'Structuré'], tagsEs: ['Educación', 'Tranquilo', 'Estructurado'] },
    { id: 4, title: 'Garden Helper', titleAr: 'مساعد حديقة', titleFr: 'Assistant de jardin', titleEs: 'Ayudante de jardín', company: 'Green Park', companyAr: 'الحديقة الخضراء', companyFr: 'Parc Vert', companyEs: 'Parque Verde', icon: '🌿', type: 'Outdoors', typeAr: 'خارج المنزل', typeFr: 'Plein air', typeEs: 'Aire libre', location: 'Giza', locationAr: 'الجيزة', locationFr: 'Gizeh', locationEs: 'Guiza', match: 88, desc: 'Water plants, plant flowers, and keep the garden beautiful.', descAr: 'اسقِ النباتات وازرع الزهور وحافظ على جمال الحديقة.', descFr: 'Arrosez les plantes, plantez des fleurs et entretenez le jardin.', descEs: 'Riega las plantas, planta flores y mantén el jardín hermoso.', tags: ['Outdoor', 'Active', 'Creative'], tagsAr: ['خارج المنزل', 'نشيط', 'إبداعي'], tagsFr: ['Extérieur', 'Actif', 'Créatif'], tagsEs: ['Exterior', 'Activo', 'Creativo'] },
    { id: 5, title: 'Office Helper', titleAr: 'مساعد مكتب', titleFr: 'Assistant de bureau', titleEs: 'Ayudante de oficina', company: 'Bright Offices', companyAr: 'مكاتب برايت', companyFr: 'Bureaux Bright', companyEs: 'Oficinas Bright', icon: '🏢', type: 'Office', typeAr: 'عمل مكتبي', typeFr: 'Bureau', typeEs: 'Oficina', location: 'Cairo', locationAr: 'القاهرة', locationFr: 'Le Caire', locationEs: 'El Cairo', match: 80, desc: 'Organise documents, assist with copying, and support the team.', descAr: 'نظم المستندات وساعد في التصوير وادعم الفريق.', descFr: 'Organisez les documents, aidez à la copie et soutenez l\'équipe.', descEs: 'Organiza documentos, ayuda con las fotocopias y apoya al equipo.', tags: ['Office', 'Indoor', 'Professional'], tagsAr: ['مكتب', 'داخل المنزل', 'احترافي'], tagsFr: ['Bureau', 'Intérieur', 'Professionnel'], tagsEs: ['Oficina', 'Interior', 'Profesional'] },
    { id: 6, title: 'Bakery Helper', titleAr: 'مساعد مخبز', titleFr: 'Assistant de boulangerie', titleEs: 'Ayudante de panadería', company: 'Golden Bakery', companyAr: 'المخبز الذهبي', companyFr: 'Boulangerie Dorée', companyEs: 'Panadería Dorada', icon: '🍞', type: 'Food', typeAr: 'المطاعم والكافيهات', typeFr: 'Restauration', typeEs: 'Alimentos y Bebidas', location: 'Cairo', locationAr: 'القاهرة', locationFr: 'Le Caire', locationEs: 'El Cairo', match: 82, desc: 'Help bake and package bread, organise shelves, and serve customers.', descAr: 'ساعد في الخبز وتغليف الخبز ونظم الرفوف وخدمة العملاء.', descFr: 'Aidez à cuire le pain, rangez les étagères et servez les clients.', descEs: 'Ayuda a hornear y empaquetar pan, organiza estantes y sirve clientes.', tags: ['Food', 'Active', 'Morning Shift'], tagsAr: ['طعام', 'نشيط', 'وردية صباحية'], tagsFr: ['Alimentation', 'Actif', 'Matin'], tagsEs: ['Comida', 'Activo', 'Turno mañana'] },
    { id: 7, title: 'Recycling Sorter', titleAr: 'مصنف إعادة تدوير', titleFr: 'Trieur de recyclage', titleEs: 'Clasificador de reciclaje', company: 'EcoGreen Centre', companyAr: 'مركز إيكو جرين', companyFr: 'Centre Éco-Vert', companyEs: 'Centro EcoVerde', icon: '♻️', type: 'Environment', typeAr: 'البيئة', typeFr: 'Environnement', typeEs: 'Medio Ambiente', location: 'Giza', locationAr: 'الجيزة', locationFr: 'Gizeh', locationEs: 'Guiza', match: 78, desc: 'Sort recyclable materials by type and help run the recycling station.', descAr: 'صنف المواد القابلة لإعادة التدوير حسب النوع وساعد في محطة التدوير.', descFr: 'Triez les matériaux recyclables et aidez à gérer la station.', descEs: 'Clasifica materiales reciclables y ayuda en la estación de reciclaje.', tags: ['Environmental', 'Active', 'Routine'], tagsAr: ['بيئي', 'نشيط', 'روتيني'], tagsFr: ['Écologie', 'Actif', 'Routine'], tagsEs: ['Ambiental', 'Activo', 'Rutina'] },
    { id: 8, title: 'Art Studio Helper', titleAr: 'مساعد استوديو فنون', titleFr: 'Assistant d\'atelier d\'art', titleEs: 'Ayudante de estudio de arte', company: 'Creative Hands Studio', companyAr: 'استوديو كيريتيف هاندز', companyFr: 'Atelier Mains Créatives', companyEs: 'Estudio Manos Creativas', icon: '🎨', type: 'Creative', typeAr: 'إبداعي', typeFr: 'Création', typeEs: 'Creativo', location: 'Alexandria', locationAr: 'الإسكندرية', locationFr: 'Alexandrie', locationEs: 'Alejandría', match: 86, desc: 'Help set up art materials, clean brushes, and assist art teachers.', descAr: 'ساعد في تجهيز المواد الفنية وتنظيف الفرش ومساعدة المعلمين.', descFr: 'Préparez le matériel d\'art, nettoyez les pinceaux et aidez les profs.', descEs: 'Prepara materiales de arte, limpia pinceles y ayuda a profesores.', tags: ['Creative', 'Art', 'Part Time'], tagsAr: ['إبداعي', 'فن', 'دوام جزئي'], tagsFr: ['Créatif', 'Art', 'Temps partiel'], tagsEs: ['Creativo', 'Arte', 'Medio tiempo'] },
    { id: 9, title: 'Animal Care Helper', titleAr: 'مساعد رعاية حيوانات', titleFr: 'Assistant de soins animaliers', titleEs: 'Ayudante de cuidado animal', company: 'Happy Paws Centre', companyAr: 'مركز هابي بوز', companyFr: 'Centre Happy Paws', companyEs: 'Centro Happy Paws', icon: '🐾', type: 'Animals', typeAr: 'رعاية حيوانات', typeFr: 'Animaux', typeEs: 'Cuidado Animal', location: 'Cairo', locationAr: 'القاهرة', locationFr: 'Le Caire', locationEs: 'El Cairo', match: 84, desc: 'Feed and care for animals, clean enclosures, and welcome visitors.', descAr: 'أطعم الحيوانات واعتنِ بها ونظف الحظائر ورحب بالزوار.', descFr: 'Nourrissez les animaux, nettoyez les enclos et accueillez les visiteurs.', descEs: 'Alimenta a los animales, limpia jaulas y recibe a los visitantes.', tags: ['Animals', 'Active', 'Rewarding'], tagsAr: ['حيوانات', 'نشيط', 'مجزي'], tagsFr: ['Animaux', 'Actif', 'Gratifiant'], tagsEs: ['Animales', 'Activo', 'Gratificante'] }
];

var TOPICS = [
    {
        id: 'intro', icon: '👋', title: 'How to Introduce Yourself', titleAr: 'كيف تقدم نفسك', titleFr: 'Comment se présenter', titleEs: 'Cómo presentarse', time: '10 min', color: '#FF6B35',
        content: [
            { type: 'text', en: 'Introducing yourself is the first step in any new workplace. A good introduction helps people remember you!', ar: 'تقديم نفسك هو الخطوة الأولى في أي مكان عمل جديد.', fr: 'Se présenter est la première étape dans tout nouveau lieu de travail. Une bonne présentation aide les gens à se souvenir de vous !', es: 'Presentarse es el primer paso en cualquier lugar de trabajo nuevo. ¡Una buena presentación ayuda a que la gente te recuerde!' },
            { type: 'tip', en: '💡 Keep it short: Your name, what you enjoy, and one fun fact!', ar: '💡 اجعلها قصيرة: اسمك وما تستمتع به وحقيقة ممتعة!', fr: '💡 Restez bref : votre nom, ce que vous aimez et un fait amusant !', es: '💡 Sé breve: ¡tu nombre, lo que te gusta y un dato divertido!' },
            { type: 'example', en: 'Example: "Hi! My name is Ahmed. I love gardening and I\'m excited to join your team!"', ar: 'مثال: "مرحباً! اسمي أحمد. أحب البستنة وأنا متحمس للانضمام!"', fr: 'Exemple : "Salut ! Je m\'appelle Ahmed. J\'adore le jardinage et je suis ravi de rejoindre votre équipe !"', es: 'Ejemplo: "¡Hola! Mi nombre es Ahmed. ¡Me encanta la jardinería y estoy emocionado de unirme a su equipo!"' },
            { type: 'quiz', q: 'What should you say first?', qAr: 'ماذا تقول أولاً؟', qFr: 'Que devriez-vous dire en premier ?', qEs: '¿Qué deberías decir primero?', opts: ['Your name', 'Your favourite food', 'Your age'], optsAr: ['اسمك', 'طعامك المفضل', 'عمرك'], optsFr: ['Votre nom', 'Votre plat préféré', 'Votre âge'], optsEs: ['Tu nombre', 'Tu comida favorita', 'Tu edad'], answer: 0 }
        ]
    },
    {
        id: 'interview', icon: '🎤', title: 'Preparing for a Job Interview', titleAr: 'التحضير للمقابلة', titleFr: 'Se préparer pour un entretien', titleEs: 'Prepararse para una entrevista', time: '15 min', color: '#1DB9A8',
        content: [
            { type: 'text', en: 'A job interview is when an employer asks you questions to see if you are right for the job. Being prepared makes you confident!', ar: 'مقابلة العمل هي عندما يطرح صاحب العمل عليك أسئلة.', fr: 'Un entretien d\'embauche, c\'est quand un employeur vous pose des questions pour voir si vous convenez au poste. Être préparé vous donne confiance !', es: 'Una entrevista de trabajo es cuando un empleador te hace preguntas para ver si eres apto para el puesto. ¡Estar preparado te da confianza!' },
            { type: 'tip', en: '💡 Before the interview: know the company name, arrive 10 minutes early, and smile!', ar: '💡 قبل المقابلة: اعرف اسم الشركة، احضر قبل 10 دقائق، وابتسم!', fr: '💡 Avant l\'entretien : connaissez le nom de l\'entreprise, arrivez 10 minutes à l\'avance et souriez !', es: '💡 Antes de la entrevista: ¡conoce el nombre de la empresa, llega 10 minutos antes y sonríe!' },
            { type: 'example', en: '"I am very excited about this job. I am hardworking and I love helping people!"', ar: '"أنا متحمس جداً لهذه الوظيفة. أنا مجتهد وأحب مساعدة الناس!"', fr: '"Je suis très enthousiaste à l\'idée d\'occuper ce poste. Je suis travailleur et j\'aime aider les gens !"', es: '"Estoy muy emocionado por este trabajo. ¡Soy trabajador y me encanta ayudar a la gente!"' },
            { type: 'quiz', q: 'How early should you arrive?', qAr: 'كم مبكراً يجب أن تصل؟', qFr: 'Combien de temps à l\'avance devez-vous arriver ?', qEs: '¿Con cuánta antelación debes llegar?', opts: ['5 minutes late', 'Exactly on time', '10 minutes early'], optsAr: ['متأخر 5 دقائق', 'في الوقت تماماً', 'عشر دقائق مبكراً'], optsFr: ['5 minutes de retard', 'Pile à l\'heure', '10 minutes d\'avance'], optsEs: ['5 minutos tarde', 'Exactamente a tiempo', '10 minutos antes'], answer: 2 }
        ]
    },
    {
        id: 'comms', icon: '🗣️', title: 'Communicating with Coworkers', titleAr: 'التواصل مع الزملاء', titleFr: 'Communiquer avec les collègues', titleEs: 'Comunicarse con compañeros', time: '12 min', color: '#7C3AED',
        content: [
            { type: 'text', en: 'Good communication means being clear, kind, and respectful. It helps everyone work together happily!', ar: 'التواصل الجيد يعني الوضوح واللطف والاحترام.', fr: 'Une bonne communication signifie être clair, gentil et respectueux. Cela aide tout le monde à travailler ensemble dans la bonne humeur !', es: 'Una buena comunicación significa ser claro, amable y respetuoso. ¡Ayuda a que todos trabajen juntos felizmente!' },
            { type: 'tip', en: '💡 Always say please and thank you! And listen carefully when others speak.', ar: '💡 قل دائماً من فضلك وشكراً!', fr: '💡 Dites toujours s\'il vous plaît et merci ! Et écoutez attentivement quand les autres parlent.', es: '💡 ¡Di siempre por favor y gracias! Y escucha con atención cuando otros hablan.' },
            { type: 'example', en: '"Excuse me, could you help me with this task please?"', ar: '"عذراً، هل يمكنك مساعدتي في هذه المهمة من فضلك؟"', fr: '"Excusez-moi, pourriez-vous m\'aider pour cette tâche s\'il vous plaît ?"', es: '"Disculpe, ¿podría ayudarme con esta tarea por favor?"' },
            { type: 'quiz', q: 'What should you do when a coworker is talking?', qAr: 'ماذا تفعل عندما يتحدث زميل؟', qFr: 'Que devez-vous faire quand un collègue parle ?', qEs: '¿Qué debes hacer cuando un compañero habla?', opts: ['Look at your phone', 'Listen carefully', 'Walk away'], optsAr: ['تنظر في هاتفك', 'تستمع باهتمام', 'تمشي بعيداً'], optsFr: ['Regarder son téléphone', 'Écouter attentivement', 'S\'en aller'], optsEs: ['Mirar tu teléfono', 'Escuchar con atención', 'Irte'], answer: 1 }
        ]
    },
    {
        id: 'behavior', icon: '🤝', title: 'Workplace Behaviour', titleAr: 'السلوك في العمل', titleFr: 'Comportement au travail', titleEs: 'Comportamiento en el trabajo', time: '10 min', color: '#10B981',
        content: [
            { type: 'text', en: 'Good workplace behaviour means being respectful, reliable, and friendly. Your actions affect the whole team!', ar: 'السلوك الجيد في مكان العمل يعني الاحترام والموثوقية.', fr: 'Un bon comportement au travail signifie être respectueux, fiable et amical. Vos actions affectent toute l\'équipe !', es: 'Un buen comportamiento laboral significa ser respetuoso, confiable y amable. ¡Tus acciones afectan a todo el equipo!' },
            { type: 'tip', en: '💡 Always tell your manager if you will be late. Keep your work area tidy.', ar: '💡 أخبر مديرك دائماً إذا كنت ستتأخر.', fr: '💡 Prévenez toujours votre manager si vous allez être en retard. Gardez votre zone de travail propre.', es: '💡 Avisa siempre a tu jefe si vas a llegar tarde. Mantén limpia tu zona de trabajo.' },
            { type: 'example', en: 'Good behaviour: arriving on time, completing tasks, saying good morning to your team!', ar: 'السلوك الجيد: الحضور في الوقت وإتمام المهام وقول صباح الخير!', fr: 'Bon comportement : arriver à l\'heure, terminer ses tâches, dire bonjour à son équipe !', es: 'Buen comportamiento: llegar a tiempo, completar tareas, ¡decir buenos días a tu equipo!' },
            { type: 'quiz', q: 'What should you do if you will be late?', qAr: 'ماذا تفعل إذا كنت ستتأخر؟', qFr: 'Que faire si vous allez être en retard ?', qEs: '¿Qué debes hacer si vas a llegar tarde?', opts: ['Say nothing', 'Tell your manager', 'Ask a friend'], optsAr: ['لا تقل شيئاً', 'أخبر مديرك', 'أسأل صديقاً'], optsFr: ['Ne rien dire', 'Prévenir son manager', 'Demander à un ami'], optsEs: ['No decir nada', 'Avisar a tu jefe', 'Preguntar a un amigo'], answer: 1 }
        ]
    },
    {
        id: 'time', icon: '⏰', title: 'Time Management', titleAr: 'إدارة الوقت', titleFr: 'Gestion du temps', titleEs: 'Gestión del tiempo', time: '12 min', color: '#FFB830',
        content: [
            { type: 'text', en: 'Managing your time means doing the right tasks at the right moment. It helps you feel calm and in control!', ar: 'إدارة وقتك تعني القيام بالمهام الصحيحة في الوقت المناسب.', fr: 'Gérer son temps signifie faire les bonnes tâches au bon moment. Cela vous aide à vous sentir calme et à garder le contrôle !', es: 'Gestionar tu tiempo significa hacer las tareas correctas en el momento adecuado. ¡Te ayuda a sentirte tranquilo y en control!' },
            { type: 'tip', en: '💡 Use an alarm clock! Write a daily to-do list the night before work.', ar: '💡 استخدم المنبه! اكتب قائمة مهام يومية في الليلة السابقة.', fr: '💡 Utilisez un réveil ! Écrivez une liste de choses à faire la veille au soir.', es: '💡 ¡Usa un despertador! Escribe una lista de tareas la noche anterior.' },
            { type: 'example', en: 'Morning routine: wake up, get dressed, eat breakfast, and leave on time!', ar: 'روتين صباحي: استيقظ، والبس، وتناول الإفطار، واغادر في الوقت.', fr: 'Routine matinale : se réveiller, s\'habiller, prendre son petit-déjeuner et partir à l\'heure !', es: 'Rutina matutina: ¡despierta, vístete, desayuna y sal a tiempo!' },
            { type: 'quiz', q: 'When to plan tomorrow\'s tasks?', qAr: 'متى تخطط لمهام الغد؟', qFr: 'Quand planifier les tâches de demain ?', qEs: '¿Cuándo planificar las tareas de mañana?', opts: ['During work', 'The night before', 'On the way'], optsAr: ['أثناء العمل', 'الليلة السابقة', 'في الطريق'], optsFr: ['Pendant le travail', 'La veille au soir', 'En chemin'], optsEs: ['Durante el trabajo', 'La noche anterior', 'En el camino'], answer: 1 }
        ]
    },
    {
        id: 'computer', icon: '💻', title: 'Basic Computer Skills', titleAr: 'مهارات الكمبيوتر الأساسية', titleFr: 'Compétences informatiques de base', titleEs: 'Habilidades básicas de computación', time: '15 min', color: '#3B82F6',
        content: [
            { type: 'text', en: 'Basic computer skills are very helpful in many jobs. Learning to type, use email, and open files is a great start!', ar: 'مهارات الكمبيوتر الأساسية مفيدة جداً في كثير من الوظائف.', fr: 'Les compétences informatiques de base sont très utiles dans de nombreux emplois. Apprendre à taper, utiliser les e-mails et ouvrir des fichiers est un excellent début !', es: 'Las habilidades básicas de computación son muy útiles en muchos trabajos. ¡Aprender a escribir, usar el correo electrónico y abrir archivos es un gran comienzo!' },
            { type: 'tip', en: '💡 Practice typing your name every day. Start with ASDF for your left hand!', ar: '💡 تدرب على كتابة اسمك كل يوم.', fr: '💡 Entraînez-vous à taper votre nom chaque jour. Commencez par ASDF pour la main gauche !', es: '💡 Practica escribir tu nombre todos los días. ¡Empieza con ASDF para tu mano izquierda!' },
            { type: 'example', en: 'Key skills: turning on/off computer, typing, opening browser, sending emails.', ar: 'المهارات الرئيسية: تشغيل الكمبيوتر والكتابة وفتح المتصفح وإرسال البريد.', fr: 'Compétences clés : allumer/éteindre l\'ordinateur, taper, ouvrir le navigateur, envoyer des e-mails.', es: 'Habilidades clave: encender/apagar la computadora, escribir, abrir el navegador, enviar correos.' },
            { type: 'quiz', q: 'What is a keyboard used for?', qAr: 'ما استخدام لوحة المفافيح؟', qFr: 'À quoi sert un clavier ?', qEs: '¿Para qué se usa un teclado?', opts: ['To type letters', 'To take photos', 'To print'], optsAr: ['كتابة الحروف', 'التقاط الصور', 'الطباعة'], optsFr: ['Taper des lettres', 'Prendre des photos', 'Imprimer'], optsEs: ['Para escribir letras', 'Para tomar fotos', 'Para imprimir'], answer: 0 }
        ]
    },
    {
        id: 'customer', icon: '🛍️', title: 'Customer Service Basics', titleAr: 'أساسيات خدمة العملاء', titleFr: 'Bases du service client', titleEs: 'Fundamentos de atención al cliente', time: '10 min', color: '#F43F5E',
        content: [
            { type: 'text', en: 'Customer service is about making customers feel happy and valued. Your smile makes a huge difference!', ar: 'خدمة العملاء تتعلق بجعل العملاء يشعرون بالسعادة.', fr: 'Le service client consiste à rendre les clients heureux et valorisés. Votre sourire fait toute la différence !', es: 'El servicio al cliente consiste en hacer que los clientes se sientan felices y valorados. ¡Tu sonrisa hace una gran diferencia!' },
            { type: 'tip', en: '💡 Always greet customers with a smile. If unsure, say "Let me find out for you!"', ar: '💡 دائماً رحب بالعملاء بابتسامة.', fr: '💡 Accueillez toujours les clients avec le sourire. En cas de doute, dites \"Laissez-moi me renseigner pour vous !\"', es: '💡 Siempre saluda a los clientes con una sonrisa. Si no estás seguro, di \"¡Déjame averiguarlo por ti!\"' },
            { type: 'example', en: '"Welcome! How can I help you today?" is a perfect greeting.', ar: '"مرحباً! كيف يمكنني مساعدتك اليوم؟"', fr: '\"Bienvenue ! Comment puis-je vous aider aujourd\'hui ?\" est un accueil parfait.', es: '\"¡Bienvenido! ¿Cómo puedo ayudarle hoy?\" es un saludo perfecto.' },
            { type: 'quiz', q: 'Most important in customer service?', qAr: 'أهم شيء في خدمة العملاء؟', qFr: 'Le plus important dans le service client ?', qEs: '¿Lo más importante en el servicio al cliente?', opts: ['Selling quickly', 'Making customer happy', 'Working fast'], optsAr: ['البيع بسرعة', 'إسعاد العميل', 'العمل بسرعة'], optsFr: ['Vendre vite', 'Rendre le client heureux', 'Travailler vite'], optsEs: ['Vender rápido', 'Hacer feliz al cliente', 'Trabajar rápido'], answer: 1 }
        ]
    }
];

var CV_FIELDS = [
    { key: 'name', en: 'What is your full name?', ar: 'ما اسمك الكامل؟', fr: 'Quel est votre nom complet ?', es: '¿Cuál es su nombre completo?', hint: 'e.g. Ahmed Mohammed Ali', hintAr: 'مثال: أحمد محمد علي', hintFr: 'ex. Ahmed Mohammed Ali', hintEs: 'ej. Ahmed Mohammed Ali', type: 'text' },
    { key: 'role', en: 'What job do you want?', ar: 'ما الوظيفة التي تريدها؟', fr: 'Quel travail voulez-vous ?', es: '¿Qué trabajo quieres?', hint: 'e.g. Store Helper, Café Assistant', hintAr: 'مثال: مساعد متجر، مساعد مقهى', hintFr: 'ex. Assistant de magasin', hintEs: 'ej. Ayudante de tienda', type: 'text' },
    { key: 'email', en: 'Your email address:', ar: 'عنوان بريدك الإلكتروني:', fr: 'Votre adresse e-mail :', es: 'Su correo electrónico:', hint: 'e.g. ahmed@gmail.com', hintAr: 'مثال: ahmed@gmail.com', hintFr: 'ex. ahmed@gmail.com', hintEs: 'ej. ahmed@gmail.com', type: 'email' },
    { key: 'phone', en: 'Your phone number:', ar: 'رقم هاتفك:', fr: 'Votre numéro de téléphone :', es: 'Su número de teléfono:', hint: 'e.g. +20 100 000 0000', hintAr: 'مثال: +20 100 000 0000', hintFr: 'ex. +20 100 000 0000', hintEs: 'ej. +20 100 000 0000', type: 'text' },
    { key: 'loc', en: 'Where do you live?', ar: 'أين تسكن؟', fr: 'Où habitez-vous ?', es: '¿Dónde vives?', hint: 'e.g. Cairo, Egypt', hintAr: 'مثال: القاهرة، مصر', hintFr: 'ex. Le Caire, Égypte', hintEs: 'ej. El Cairo, Egipto', type: 'text' },
    { key: 'summary', en: 'Write a short professional summary:', ar: 'اكتب ملخصاً احترافياً قصيراً:', fr: 'Écrivez un court résumé professionnel :', es: 'Escribe un breve resumen profesional:', hint: '2-3 sentences about your strengths and goals', hintAr: '2-3 جمل عن قوتك وأهدافك', hintFr: '2-3 phrases sur vos points forts', hintEs: '2-3 frases sobre tus fortalezas', type: 'textarea' },
    { key: 'exp', en: 'Work experience:', ar: 'خبرتك العملية:', fr: 'Expérience professionnelle :', es: 'Experiencia laboral:', hint: 'Any jobs, volunteering, or school activities.', hintAr: 'أي وظائف أو تطوع أو أنشطة مدرسية.', hintFr: 'Tous les emplois ou activités scolaires.', hintEs: 'Cualquier trabajo o actividad escolar.', type: 'textarea' },
    { key: 'edu', en: 'Your education:', ar: 'تعليمك:', fr: 'Votre éducation :', es: 'Tu educación:', hint: 'School name, year graduated, and achievements', hintAr: 'اسم المدرسة وسنة التخرج والإنجازات', hintFr: 'Nom de l\'école et année de diplôme', hintEs: 'Nombre de la escuela y año de graduación', type: 'textarea' },
    { key: 'cert', en: 'Any certifications or courses?', ar: 'أي شهادات أو دورات؟', fr: 'Des certifications ou cours ?', es: '¿Alguna certificación o curso?', hint: 'e.g. First Aid, computer course', hintAr: 'مثال: إسعافات أولية، دورة كمبيوتر', hintFr: 'ex. Premiers secours', hintEs: 'ej. Primeros auxilios', type: 'text' },
    { key: 'skills', en: 'Your skills:', ar: 'مهاراتك:', fr: 'Vos compétences :', es: 'Tus habilidades:', hint: 'Click all that apply!', hintAr: 'انقر على كل ما ينطبق!', hintFr: 'Cliquez sur tout ce qui s\'applique !', hintEs: '¡Haz clic en todo lo que aplique!', type: 'skills' },
    { key: 'hobbies', en: 'Hobbies and interests:', ar: 'هواياتك واهتماماتك:', fr: 'Loisirs et intérêts :', es: 'Aficiones e intereses:', hint: 'e.g. football, art, reading', hintAr: 'مثال: كرة القدم، الفن، القراءة', hintFr: 'ex. football, art, lecture', hintEs: 'ej. fútbol, arte, lectura', type: 'textarea' }
];

var SKILLS_LIST = ['Friendly & polite', 'Good listener', 'Team player', 'Organised', 'Punctual', 'Creative', 'Good memory', 'Computer basics', 'Counting & maths', 'Customer service', 'Physical work', 'Drawing & art', 'Music', 'Cooking', 'Tidying & cleaning', 'Problem solving', 'Fast learner'];

var CV_SLIDES = [
    { c: '📄', en: "Welcome! Let's learn how to build an ATS-ready CV step by step!", ar: 'مرحباً! لنتعلم كيف نبني سيرة ذاتية!', fr: 'Bienvenue ! Apprenons à créer un CV prêt pour l\'ATS étape par étape !', es: '¡Bienvenido! ¡Aprendamos a crear un CV listo para ATS paso a paso!' },
    { c: '🤖', en: 'ATS = Applicant Tracking System. It reads your CV before a real person!', ar: 'ATS = نظام تتبع المتقدمين. يقرأ سيرتك الذاتية قبل الإنسان!', fr: 'ATS = Système de suivi des candidatures. Il lit votre CV avant une vraie personne !', es: 'ATS = Sistema de seguimiento de candidatos. ¡Lee tu CV antes que una persona!' },
    { c: '👤', en: 'Section 1: Your Name, Email, Phone, and Location — all at the TOP.', ar: 'القسم 1: اسمك والبريد ورقم الهاتف والموقع — كلها في الأعلى.', fr: 'Section 1 : Votre nom, e-mail, téléphone et lieu — tout en HAUT.', es: 'Sección 1: Tu nombre, e-mail, teléfono y ubicación, todo en la PARTE SUPERIOR.' },
    { c: '✍️', en: 'Section 2: Professional Summary — 2-3 sentences about your strengths.', ar: 'القسم 2: الملخص الاحترافي — 2-3 جمل عن نقاط قوتك.', fr: 'Section 2 : Résumé professionnel — 2-3 phrases sur vos points forts.', es: 'Sección 2: Resumen profesional — 2-3 frases sobre tus fortalezas.' },
    { c: '💼', en: 'Section 3: Work Experience — even small jobs and volunteering count!', ar: 'القسم 3: الخبرة العملية — حتى الأعمال الصغيرة والتطوع تهم!', fr: 'Section 3 : Expérience pro — même les petits jobs et le bénévolat comptent !', es: 'Sección 3: Experiencia laboral — ¡incluso los trabajos pequeños cuentan!' },
    { c: '🎓', en: 'Section 4: Education — school name and graduation year.', ar: 'القسم 4: التعليم — اسم المدرسة وسنة التخرج.', fr: 'Section 4 : Éducation — nom de l\'école et année d\'obtention du diplôme.', es: 'Sección 4: Educación — nombre de la escuela y año de graduación.' },
    { c: '🏆', en: 'Section 5: Certifications — any courses, awards, or training.', ar: 'القسم 5: الشهادات — أي دورات أو جوائز.', fr: 'Section 5 : Certifications — tous les cours, prix ou formations.', es: 'Sección 5: Certificaciones — cualquier curso, premio o capacitación.' },
    { c: '🧩', en: 'Section 6: Skills — teamwork, customer service, computer basics. Use keywords!', ar: 'القسم 6: المهارات — العمل الجماعي وخدمة العملاء.', fr: 'Section 6 : Compétences — travail d\'équipe, service client, informatique.', es: 'Sección 6: Habilidades: trabajo en equipo, servicio al cliente, informática.' },
    { c: '✅', en: 'Use simple fonts and clear headings. No photos — ATS cannot read them!', ar: 'استخدم خطوطاً بسيطة وعناوين واضحة.', fr: 'Utilisez des polices simples et des titres clairs. Pas de photos !', es: 'Usa fuentes simples y encabezados claros. ¡Sin fotos!' },
    { c: '🎉', en: "Amazing! Now you know how to build an ATS CV. Let's build yours!", ar: 'رائع! الآن تعرف كيف تبني سيرة ذاتية. لنبنِ سيرتك!', fr: 'Incroyable ! Maintenant vous savez créer un CV ATS. Créons le vôtre !', es: '¡Increíble! Ahora sabes cómo crear un CV ATS. ¡Creemos el tuyo!' }
];

var IV_QS = [
    { q: 'Tell me about yourself. What do you like and what are you good at?', qAr: 'أخبرني عن نفسك. ماذا تحب وما الذي تجيده؟', qFr: 'Parlez-moi de vous. Qu\'aimez-vous et en quoi êtes-vous doué ?', qEs: 'Cuéntame sobre ti. ¿Qué te gusta y en qué eres bueno?' },
    { q: 'Why do you want this job? What excites you about it?', qAr: 'لماذا تريد هذه الوظيفة؟', qFr: 'Pourquoi voulez-vous ce travail ? Qu\'est-ce qui vous enthousiasme ?', qEs: '¿Por qué quieres este trabajo? ¿Qué te emociona de él?' },
    { q: 'What is your biggest strength? Can you give me an example?', qAr: 'ما هي أكبر نقطة قوة لديك؟', qFr: 'Quelle est votre plus grande qualité ? Pouvez-vous donner un exemple ?', qEs: '¿Cuál es tu mayor fortaleza? ¿Puedes darme un ejemplo?' },
    { q: 'Have you ever worked with a team? How did that go?', qAr: 'هل عملت يوماً مع فريق؟', qFr: 'Avez-vous déjà travaillé en équipe ? Comment ça s\'est passé ?', qEs: '¿Has trabajado alguna vez en equipo? ¿Cómo fue?' },
    { q: 'What do you do when something is difficult at work?', qAr: 'ماذا تفعل عندما تواجه صعوبة في العمل؟', qFr: 'Que faites-vous quand quelque chose est difficile au travail ?', qEs: '¿Qué haces cuando algo es difícil en el trabajo?' },
    { q: 'Can you tell me about a time you helped someone?', qAr: 'هل يمكنك إخباري عن وقت ساعدت فيه شخصاً؟', qFr: 'Pouvez-vous me parler d\'une fois où vous avez aidé quelqu\'un ?', qEs: '¿Puedes contarme sobre una vez que ayudaste a alguien?' },
    { q: 'How do you make sure you arrive on time every day?', qAr: 'كيف تضمن الوصول في الوقت المحدد كل يوم؟', qFr: 'Comment vous assurez-vous d\'arriver à l\'heure chaque jour ?', qEs: '¿Cómo te aseguras de llegar a tiempo todos los días?' },
    { q: 'Do you have any questions for me?', qAr: 'هل لديك أي أسئلة تود طرحها؟', qFr: 'Avez-vous des questions pour moi ?', qEs: '¿Tienes alguna pregunta para mí?' }
];

var IV_FB = [
    ['Amazing start! You showed real confidence!', 'Great! Employers love hearing your personality!', 'Excellent! You introduced yourself clearly!'],
    ['Brilliant! Genuine interest impresses employers!', 'Great! Your enthusiasm comes through!', 'Passion is the most important ingredient!'],
    ['Perfect! Knowing your strengths is a superpower!', 'Well done! A specific example is very professional!', 'Outstanding! Examples make your answer memorable!'],
    ['Wonderful! Teamwork is a top valued skill!', 'Good! You showed you cooperate well!', 'You sound like a great team player!'],
    ['Great! Staying calm under pressure is valuable!', 'Good! Problem-solving will serve you well!', 'Amazing! You showed resilience and positivity!'],
    ['How kind! Empathy is what employers love!', 'Great! You showed care for others!', 'A caring colleague makes work better!'],
    ['Reliability is SO important! Punctuality matters!', 'Great! Being on time is a powerful habit!', 'Preparation shows you are serious!'],
    ['Asking questions shows curiosity! Employers love that!', 'Questions show you care about doing well!', 'Curiosity makes you stand out!']
];

var TEAM = [
    {
        e: './images/about/ahmad_yasser.jpeg', n: 'Ahmad Yasser', nAr: 'أحمد ياسر', r: 'Frontend Developer – Angular', rAr: 'مطور واجهات - أنجولار',
        desc: 'Led the development of Equal Opportunities, building all Angular components and ensuring the platform is fast and accessible.',
        descAr: 'قاد تطوير فرص متساوية، حيث بنى جميع مكونات الواجهة وضمن سرعة وسهولة استخدام المنصة.',
        PLink: 'https://www.instagram.com/1_0ahmedd1_0?igsh=ZG1vdGg4OHk5a3A2'
    },
    {
        e: './images/about/amany_ibrahim.jpeg', n: 'Amany Ibrahim', nAr: 'أماني إبراهيم', r: 'Graphic Designer', rAr: 'مصممة جرافيك',
        desc: 'Created all icons, illustrations, and visual assets used throughout the platform.',
        descAr: 'صممت جميع الأيقونات والرسومات والأصول البصرية المستخدمة في المنصة.',
        PLink: 'https://www.instagram.com/_mony_105?utm_source=qr&igsh=MWtqZG5jMWt6emNuYw=='
    },
    {
        e: './images/about/baisan_mohamed.jpeg', n: 'baisan mohamed', nAr: 'بيسان محمد', r: 'Graphic Designer', rAr: 'مصممة جرافيك',
        desc: 'Created all icons, illustrations, and visual assets used throughout the platform.',
        descAr: 'صممت جميع الأيقونات والرسومات والأصول البصرية المستخدمة في المنصة.',
        PLink: 'https://www.facebook.com/share/1CuBmZjSE2/'
    },
    {
        e: './images/about/habiba_elsayed.jpeg', n: 'Habiba Elsayed', nAr: 'حبيبة السيد', r: 'Content Specialist', rAr: 'أخصائية محتوى',
        desc: 'Wrote all platform content in English and Arabic, ensuring clarity and inclusivity throughout.',
        descAr: 'كتبت جميع محتويات المنصة باللغتين العربية والإنجليزية، لضمان الوضوح والشمول.',
        PLink: 'https://www.facebook.com/share/1FXRhTAT2y'
    },
    {
        e: './images/about/nourhan_ahamed.jpeg', n: 'Nourhan Ahmad', nAr: 'نورهان أحمد', r: 'Content Researcher', rAr: 'باحثة محتوى',
        desc: 'Created all icons, illustrations, and visual assets used throughout the platform.',
        descAr: 'صممت جميع الأيقونات والرسومات والأصول البصرية المستخدمة في المنصة.',
        PLink: 'https://www.instagram.com/nourrhan.ahmeed?igsh=dG1kaDZxanZ0dnJi'
    },
    {
        e: './images/about/nourhan_ayman.jpeg', n: 'Nourhan Ayman', nAr: 'نورهان أيمن', r: 'Voice & Audio Lead', rAr: 'مسئولة الصوت والسمعيات',
        desc: 'Designed and implemented the voice navigation system and text-to-speech features.',
        descAr: 'صممت ونفذت نظام التنقل الصوتي وميزات تحويل النص إلى كلام.',
        pLink: 'https://www.instagram.com/nour.sawan.1238?igsh=MXAxNGJwdHhjbDZqdg=='
    },
    {
        e: './images/about/naira.jpeg', n: 'Naira Ayman', nAr: 'نيرة أيمن', r: 'Graphic Designer', rAr: 'مصممة جرافيك',
        desc: 'Created all icons, illustrations, and visual assets used throughout the platform.',
        descAr: 'صممت جميع الأيقونات والرسومات والأصول البصرية المستخدمة في المنصة.',
        PLink: 'https://www.instagram.com/no0rr_rr?igsh=Mjd6dHNraTUweDA='
    },
    {
        e: './images/about/maryem_ehab.jpeg', n: 'Mariam Ehab', nAr: 'مريم إيهاب', r: 'Education Specialist', rAr: 'أخصائية تعليم',
        desc: 'Designed the learning curriculum and quiz systems to build real workplace skills.',
        descAr: 'صممت المنهج التعليمي وأنظمة الاختبارات لبناء مهارات عملية حقيقية.'
    },
    {
        e: './images/about/nourhan_salah.jpeg', n: 'Nourhan Salah', nAr: 'نورهان صلاح', r: 'Quality Assurance', rAr: 'جودة البرمجيات',
        desc: 'Tested every feature thoroughly to ensure a smooth, bug-free experience for all users.',
        descAr: 'اختبرت كل ميزة بدقة لضمان تجربة سلسة وخالية من المشاكل لجميع المستخدمين.',
        PLink: 'https://www.instagram.com/norhan_salah27'
    },
    {
        e: './images/about/rawan_nader.jpeg', n: 'Rawan Nader', nAr: 'روان نادر', r: 'Accessibility Researcher', rAr: 'باحثة سهولة الوصول',
        desc: 'Researched and implemented cognitive accessibility best practices for users with Down Syndrome.',
        descAr: 'بحثت ونفذت أفضل ممارسات سهولة الوصول لمرضى متلازمة داون.'
    },
    {
        e: './images/about/sama_hamada.jpeg', n: 'Sama Hamada', nAr: 'سما حمادة', r: 'Accessibility Researcher', rAr: 'باحثة سهولة الوصول',
        desc: 'Researched and implemented cognitive accessibility best practices for users with Down Syndrome.',
        descAr: 'بحثت ونفذت أفضل ممارسات سهولة الوصول لمرضى متلازمة داون.',
        PLink: 'https://www.instagram.com/sama_hamada_782005?utm_source=qr&igsh=OGEzbTdxbHgxbXlo'
    }
];

var GAMES = [
    { id: 'memory', icon: '🧠', title: 'Memory Game', titleAr: 'لعبة الذاكرة', color: '#FF6B35', desc: 'Match all pairs of cards!', instEn: 'Flip cards to find matching pairs. Try to remember where each one is!', instAr: 'اقلب البطاقات للعثور على الأزواج المتطابقة!' },
    { id: 'pattern', icon: '🔷', title: 'Pattern Game', titleAr: 'لعبة الأنماط', color: '#1DB9A8', desc: 'Complete the pattern sequence!', instEn: 'Look at the pattern and click the shape that comes next!', instAr: 'انظر إلى النمط وانقر على الشكل التالي!' },
    { id: 'math', icon: '🔢', title: 'Maths Game', titleAr: 'لعبة الرياضيات', color: '#FFB830', desc: 'Solve simple maths problems!', instEn: 'Solve the maths question and tap the correct answer!', instAr: 'احل مسألة الرياضيات وانقر على الإجابة الصحيحة!' },
    { id: 'sort', icon: '📦', title: 'Sorting Game', titleAr: 'لعبة التصنيف', color: '#7C3AED', desc: 'Sort items into right categories!', instEn: 'Drag each word into the correct category box!', instAr: 'اسحب كل كلمة إلى صندوق الفئة الصحيحة!' },
    { id: 'focus', icon: '👁️', title: 'Focus Game', titleAr: 'لعبة التركيز', color: '#10B981', desc: 'Click glowing squares fast!', instEn: 'Click each glowing square quickly before it fades! Keep your focus!', instAr: 'انقر على كل مربع متوهج بسرعة قبل أن يتلاشى!' }
];

// ── VOICE ENGINE ─────────────────────────────────────────────────────
function speak(text, onEnd) {
    stopAll();
    if (!window.speechSynthesis || !text) return;
    var u = new SpeechSynthesisUtterance(text);
    u.lang = ({en:'en-US', ar:'ar-SA', fr:'fr-FR', es:'es-ES'})[currentLang] || 'en-US';
    u.rate = 0.87; u.pitch = 1.05;
    isSpeaking = true;
    var sb = document.getElementById('stop-btn');
    if (sb) sb.classList.add('on');
    u.onend = function () {
        isSpeaking = false;
        if (!isReading) { var sb2 = document.getElementById('stop-btn'); if (sb2) sb2.classList.remove('on'); }
        if (onEnd) onEnd();
    };
    u.onerror = function () { isSpeaking = false; };
    speechSynthesis.speak(u);
}

function stopAll() {
    if (window.speechSynthesis) speechSynthesis.cancel();
    isSpeaking = false; isReading = false;
    var sb = document.getElementById('stop-btn'); if (sb) sb.classList.remove('on');
    var rb = document.getElementById('reading-bar'); if (rb) rb.classList.remove('on');
    var bot = document.getElementById('iv-bot'); if (bot) bot.classList.remove('talk');
    var lbl = document.getElementById('iv-tlbl'); if (lbl) lbl.classList.remove('on');
    cvVidPlaying = false;
    if (cvVidTimer) { clearTimeout(cvVidTimer); cvVidTimer = null; }
    jobVidPlaying = false;
    if (jobVidTimer) { clearTimeout(jobVidTimer); jobVidTimer = null; }
    document.querySelectorAll('.vc-btn-play').forEach(function (b) { b.textContent = '▶ Play'; });
}

function readPage() {
    var page = document.querySelector('.page.act');
    if (!page) return;
    var texts = [];
    page.querySelectorAll('h1,h2,h3,h4,p').forEach(function (el) {
        var tx = el.textContent.trim();
        if (tx.length > 6 && tx.length < 260) texts.push(tx);
    });
    var combined = texts.slice(0, 7).join('. ');
    isReading = true;
    var bar = document.getElementById('reading-bar');
    if (bar) bar.classList.add('on');
    var sb = document.getElementById('stop-btn'); if (sb) sb.classList.add('on');
    speak(combined, function () {
        isReading = false;
        var bar2 = document.getElementById('reading-bar'); if (bar2) bar2.classList.remove('on');
        var sb2 = document.getElementById('stop-btn'); if (sb2) sb2.classList.remove('on');
    });
}

// ── VOICE COMMANDS ────────────────────────────────────────────────────
function startVoiceCmd() {
    if (vcActive) { stopVoiceCmd(); return; }
    if (!SR) { showNotif('❌ Voice not supported. Please use Chrome.'); return; }
    var vo = document.getElementById('v-over');
    if (vo) vo.classList.add('on');
    var vr = document.getElementById('v-result');
    if (vr) vr.textContent = '🎙️ Listening… / جاري الاستماع…';
    vcRec = new SR();
    vcRec.lang = 'en-US'; vcRec.continuous = true; vcRec.interimResults = false;
    vcActive = true;
    vcRec.onresult = function (e) {
        var txt = Array.from(e.results).map(function (r) { return r[0].transcript; }).join(' ').toLowerCase();
        var vr2 = document.getElementById('v-result');
        if (vr2) vr2.textContent = '🗣 "' + txt + '"';
        processVoiceCmd(txt);
    };
    vcRec.onerror = function (e) {
        var vr3 = document.getElementById('v-result');
        if (vr3) vr3.textContent = '⚠️ Error: ' + e.error + '. Try again.';
        setTimeout(function () { if (vcActive) { try { vcRec.start(); } catch (err) { } } }, 1000);
    };
    vcRec.onend = function () {
        if (vcActive) { setTimeout(function () { try { vcRec.start(); } catch (err) { } }, 300); }
    };
    try { vcRec.start(); } catch (e) { }
}

function stopVoiceCmd() {
    vcActive = false;
    if (vcRec) { try { vcRec.stop(); } catch (e) { } vcRec = null; }
    var vo = document.getElementById('v-over'); if (vo) vo.classList.remove('on');
}

function processVoiceCmd(txt) {
    var cmds = [
        [['home', 'الرئيسية', 'go home'], 'home', null],
        [['assess', 'test', 'اختبار', 'job test'], 'assess', null],
        [['training', 'تدريب', 'job training'], 'training', null],
        [['cv guide', 'learn cv', 'دليل السيرة'], 'cvlearn', null],
        [['build cv', 'cv build', 'ابنِ', 'open cv', 'افتح السيرة'], 'cvbuild', null],
        [['game', 'games', 'العب', 'الألعاب', 'open games', 'افتح الألعاب'], 'games', null],
        [['learn', 'topic', 'تعلم'], 'learn', null],
        [['jobs', 'وظائف', 'show jobs', 'اعرض الوظائف'], 'jobs', null],
        [['interview', 'مقابلة', 'start interview', 'ابدأ المقابلة'], 'interview', null],
        [['dashboard', 'progress', 'لوحة'], 'dashboard', null],
        [['about', 'team', 'فريق'], 'about', null],
        [['stop', 'quiet', 'توقف', 'وقف'], null, 'stop'],
        [['read', 'اقرأ', 'read page', 'اقرأ الصفحة'], null, 'read'],
        [['dark', 'night', 'مظلم'], null, 'dark'],
        [['bigger', 'larger', 'أكبر'], null, 'bigger'],
        [['smaller', 'أصغر'], null, 'smaller'],
        [['contrast', 'high contrast', 'تباين'], null, 'contrast'],
        [['guide', 'voice guide', 'دليل'], null, 'guide']
    ];
    for (var i = 0; i < cmds.length; i++) {
        var kws = cmds[i][0], page = cmds[i][1], action = cmds[i][2];
        if (kws.some(function (k) { return txt.includes(k); })) {
            stopVoiceCmd();
            if (action === 'stop') { stopAll(); showToast('⏹ Voice stopped!'); return; }
            if (action === 'read') { readPage(); return; }
            if (action === 'dark') { toggleTheme(); return; }
            if (action === 'bigger') { changeFontSize(1); return; }
            if (action === 'smaller') { changeFontSize(-1); return; }
            if (action === 'contrast') { toggleContrast(); return; }
            if (action === 'guide') { openVoiceGuide(); return; }
            if (page) { showPage(page); setTimeout(function () { speak(page); }, 300); }
            return;
        }
    }
    var vr = document.getElementById('v-result');
    if (vr) vr.textContent = '🤔 Not understood, try again…';
}

function openVoiceGuide() {
    var m = document.getElementById('vcg-modal'); if (m) m.classList.add('on');
}
function closeVoiceGuide() {
    var m = document.getElementById('vcg-modal'); if (m) m.classList.remove('on');
}

// ── ROUTING ──────────────────────────────────────────────────────────
function showPage(id) {
    stopAll();
    document.querySelectorAll('.page').forEach(function (p) { p.classList.remove('act'); });
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (a) { a.classList.remove('act'); });
    var pg = document.getElementById('page-' + id);
    if (pg) pg.classList.add('act');
    var nl = document.getElementById('nl-' + id);
    if (nl) nl.classList.add('act');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (id === 'assess') buildAssessPage();
    else if (id === 'training') buildTrainingPage();
    else if (id === 'cvlearn') buildCVLearnPage();
    else if (id === 'cvbuild') buildCVBuildPage();
    else if (id === 'games') buildGamesPage();
    else if (id === 'learn') buildLearnPage();
    else if (id === 'jobs') buildJobsPage();
    else if (id === 'interview') buildInterviewPage();
    else if (id === 'dashboard') buildDashPage();
    else if (id === 'about') buildAboutPage();
}

// ── ASSESSMENT PAGE ──────────────────────────────────────────────────
function buildAssessPage() {
    var pg = document.getElementById('page-assess');
    pg.innerHTML = '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')" aria-label="Back">←</button><h2>📋 Job Assessment · اختبار الوظيفة</h2><span class="step-badge" style="background:var(--sun)">Step 1 of 5</span></div>' +
        '<div style="background:var(--sky);color:#fff;padding:12px 32px;font-size:.84rem;font-weight:800">🌟 ' + (isAR ? 'اختر وظيفة وأجب على 5 أسئلة لتجد أفضل تطابق!' : 'Step 1 — Choose a job and answer 5 questions to find your best match!') + '</div>' +
        '<div style="padding:32px;max-width:920px;margin:0 auto">' +
        '<h3 style="font-family:var(--fd);font-size:1.25rem;font-weight:900;margin-bottom:6px">' + (isAR ? 'اختر وظيفة 👇' : 'Choose a Job to Explore 👇') + '</h3>' +
        '<p style="color:var(--txt2);font-size:.85rem;margin-bottom:22px">' + (isAR ? 'انقر على وظيفة لبدء الاختبار' : 'Click on a job to start the quiz · انقر على وظيفة لبدء الاختبار') + '</p>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:14px;margin-bottom:28px" id="job-sel"></div>' +
        '<div id="quiz-wrap"></div><div id="result-wrap"></div></div>';
    renderJobSel();
}

function renderJobSel() {
    var el = document.getElementById('job-sel'); if (!el) return;
    el.innerHTML = JOBS_DATA.map(function (j) {
        return '<div onclick="selectJob(\'' + j.id + '\')" role="button" tabindex="0" aria-label="' + j.name + '" style="background:var(--surf);border:2.5px solid ' + (quizJob === j.id ? j.color : 'var(--bdr)') + ';border-radius:var(--r);padding:22px 14px;text-align:center;cursor:pointer;transition:all .25s;' + (quizJob === j.id ? 'background:' + j.color + '11;' : '') + '">' +
            '<div style="font-size:2.4rem;margin-bottom:9px">' + j.icon + '</div>' +
            '<div style="font-size:.82rem;font-weight:800;margin-bottom:4px">' + (isAR ? j.nameAr : j.name) + '</div>' +
            '<div style="font-family:var(--fa);font-size:.72rem;color:var(--txt2)">' + (isAR ? j.name : j.nameAr) + '</div></div>';
    }).join('');
}

function selectJob(id) {
    quizJob = id; quizIdx = 0; quizScores = {};
    renderJobSel();
    document.getElementById('result-wrap').innerHTML = '';
    var job = JOBS_DATA.find(function (j) { return j.id === id; });
    document.getElementById('quiz-wrap').innerHTML =
        '<div style="background:var(--surf);border:2px solid var(--bdr);border-radius:var(--r);padding:30px;animation:slideUp .35s ease-out">' +
        '<div style="display:flex;align-items:center;gap:14px;padding:14px 18px;background:var(--bg2);border-radius:var(--rsm);margin-bottom:22px;border:1.5px solid var(--bdr)">' +
        '<span style="font-size:1.9rem">' + job.icon + '</span>' +
        '<div><div style="font-weight:900">' + (isAR ? job.nameAr : job.name) + '</div><div style="font-size:.76rem;color:var(--txt2)">' + (isAR ? 'أجب على 5 أسئلة' : 'Answer 5 questions · أجب على 5 أسئلة') + '</div></div>' +
        '<button class="voicebtn nb" onclick="speak(\'' + (isAR ? job.descAr : job.desc) + '\',null)" style="margin-left:auto" aria-label="Listen">🔊</button></div>' +
        '<div style="height:7px;background:var(--bg2);border-radius:50px;margin-bottom:20px;overflow:hidden"><div id="qprog" style="height:100%;background:linear-gradient(90deg,var(--sun),var(--gold));border-radius:50px;width:0%;transition:width .4s"></div></div>' +
        '<div id="qnum" style="font-size:.76rem;font-weight:800;color:var(--txt2);margin-bottom:8px"></div>' +
        '<div style="display:flex;align-items:flex-start;gap:9px;margin-bottom:6px"><div id="qtext" style="font-size:1.1rem;font-weight:800;line-height:1.4;flex:1"></div><button class="voicebtn nb" onclick="speakQ()" aria-label="Read question">🔊</button></div>' +
        '<div id="qar" style="font-family:var(--fa);font-size:.9rem;color:var(--txt2);direction:rtl;margin-bottom:22px"></div>' +
        '<div id="qopts"></div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:22px">' +
        '<span id="qhint" style="font-size:.8rem;color:var(--txt2);font-weight:700">' + (isAR ? 'انقر على إجابة للمتابعة' : 'Click an answer to continue · انقر للمتابعة') + '</span>' +
        '<button class="btn btn-t btn-sm" onclick="nextQ()" id="qnext" style="display:none">' + (isAR ? 'التالي →' : 'Next →') + '</button></div></div>';
    renderQ();
    speak((isAR ? 'اخترت ' + job.nameAr + '. أجب على 5 أسئلة!' : 'You selected ' + job.name + '. Let\'s answer 5 questions!'), null);
    var qw = document.getElementById('quiz-wrap');
    if (qw) qw.scrollIntoView({ behavior: 'smooth' });
}

function renderQ() {
    var job = JOBS_DATA.find(function (j) { return j.id === quizJob; }); if (!job) return;
    var q = job.questions[quizIdx];
    var pct = quizIdx / job.questions.length * 100;
    var qp = document.getElementById('qprog'); if (qp) qp.style.width = pct + '%';
    var qn = document.getElementById('qnum'); if (qn) qn.textContent = (isAR ? 'السؤال ' : 'Question ') + (quizIdx + 1) + ' ' + (isAR ? 'من' : 'of') + ' ' + job.questions.length;
    var qt = document.getElementById('qtext'); if (qt) qt.textContent = isAR ? q.qAr : q.q;
    var qa = document.getElementById('qar'); if (qa) qa.textContent = isAR ? q.q : q.qAr;
    var qnext = document.getElementById('qnext'); if (qnext) qnext.style.display = 'none';
    var icons = ['😊', '🤔', '😐', '💪', '🌟'];
    var qo = document.getElementById('qopts');
    if (qo) qo.innerHTML = q.opts.map(function (o, i) {
        return '<div class="lquiz-opt" role="button" tabindex="0" onclick="selectOpt(this,' + i + ')">' +
            '<div style="width:36px;height:36px;border-radius:9px;background:var(--surf);border:1.5px solid var(--bdr);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">' + (icons[i] || '•') + '</div>' +
            '<div>' + o + '</div></div>';
    }).join('');
}

function speakQ() {
    var job = JOBS_DATA.find(function (j) { return j.id === quizJob; }); if (!job) return;
    var q = job.questions[quizIdx];
    speak((isAR ? q.qAr : q.q) + '. ' + (isAR ? q.q : q.qAr), null);
}

function selectOpt(el, i) {
    document.querySelectorAll('.lquiz-opt').forEach(function (o) { o.classList.remove('ok', 'no'); });
    el.classList.add('ok');
    var job = JOBS_DATA.find(function (j) { return j.id === quizJob; });
    quizScores[quizIdx] = job.questions[quizIdx].scores[i];
    var qnext = document.getElementById('qnext'); if (qnext) qnext.style.display = 'flex';
    var qh = document.getElementById('qhint'); if (qh) qh.textContent = (isAR ? '✅ رائع! اضغط التالي.' : '✅ Great! Press Next.');
}

function nextQ() {
    var job = JOBS_DATA.find(function (j) { return j.id === quizJob; });
    quizIdx++;
    if (quizIdx >= job.questions.length) { showResult(); return; }
    renderQ();
}

function showResult() {
    var total = Object.values(quizScores).reduce(function (a, b) { return a + b; }, 0);
    var max = JOBS_DATA.find(function (j) { return j.id === quizJob; }).questions.length * 3;
    var pct = Math.round(total / max * 100);
    var bestJob = JOBS_DATA.find(function (j) { return j.id === quizJob; });
    if (pct < 50) { var others = JOBS_DATA.filter(function (j) { return j.id !== quizJob; }); bestJob = others[Math.floor(Math.random() * others.length)]; }
    var qw = document.getElementById('quiz-wrap'); if (qw) qw.innerHTML = '';
    var deg = pct / 100 * 360;
    document.getElementById('result-wrap').innerHTML =
        '<div style="background:var(--surf);border:2px solid var(--bdr);border-radius:var(--rlg);padding:44px;text-align:center;animation:slideUp .5s ease-out;margin-top:14px">' +
        '<div style="font-size:4.5rem;margin-bottom:12px">' + bestJob.icon + '</div>' +
        '<div style="width:100px;height:100px;border-radius:50%;border:6px solid var(--bg2);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:1.9rem;font-weight:900;color:var(--jade);margin:0 auto 20px;background:conic-gradient(var(--jade) ' + deg + 'deg,var(--bg2) ' + deg + 'deg)">' + pct + '%</div>' +
        '<h2 style="font-family:var(--fd);font-size:1.8rem;font-weight:900;margin-bottom:8px">' + t('q_best_job') + (isAR ? bestJob.nameAr : bestJob.name) + '! 🎉</h2>' +
        '<p style="color:var(--txt2);margin-bottom:24px;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.7">' + t('q_score_msg') + pct + '%. ' + (isAR ? bestJob.descAr : bestJob.desc) + '</p>' +
        '<div style="display:flex;gap:11px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn btn-o" onclick="speak(\'' + (isAR ? bestJob.descAr : bestJob.desc) + '\',null)">' + t('btn_hear_desc') + '</button>' +
        '<button class="btn btn-t" onclick="showPage(\'cvlearn\')">' + t('btn_build_cv') + '</button>' +
        '<button class="btn btn-g" onclick="showPage(\'jobs\')">' + t('btn_find_jobs') + '</button></div></div>';
    speak((isAR ? 'مبروك! أفضل وظيفة لك هي ' + bestJob.nameAr + '! حصلت على ' + pct + ' بالمئة.' : 'Congratulations! Your best job match is ' + bestJob.name + '! You scored ' + pct + ' percent.'), null);
    var rw = document.getElementById('result-wrap');
    if (rw) rw.scrollIntoView({ behavior: 'smooth' });
    updateStat('tests', 1); updateStat('pts', pct * 2);
    addAct('📋', 'Assessment Done', 'Score: ' + pct + '%', '+' + pct * 2 + ' pts');
}

// ── TRAINING PAGE (NEW – 7 jobs, True/False questions) ──────────────
var trainingState = {
    jobId: null,
    qIdx: 0,
    score: 0,
    answered: false
};

function buildTrainingPage() {
    var pg = document.getElementById('page-training');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')" aria-label="Back">←</button>' +
        '<h2>' + t('training_title') + '</h2></div>' +
        '<div style="padding:32px;max-width:1100px;margin:0 auto">' +
        '<div style="margin-bottom:28px;text-align:center">' +
        '<p style="font-size:1rem;font-weight:700;color:var(--txt2);margin-bottom:6px">' + t('training_subtitle') + '</p>' +
        '</div>' +
        '<div class="training-jobs-grid" id="training-jobs-grid">' +
        TRAINING_JOBS.map(function (job) {
            return '<div class="training-job-card card" onclick="selectTrainingJob(\'' + job.id + '\')" role="button" tabindex="0" aria-label="' + (isAR ? job.titleAr : job.titleEn) + '" style="--job-clr:' + job.color + '">' +
                `<img src="${job.icon}" class="training-job-img" style="--job-clr: ${job.color}">` +
                '<div style="font-size:.95rem;font-weight:900;margin-bottom:4px;color:var(--txt)">' + (isAR ? job.titleAr : job.titleEn) + '</div>' +
                '<div style="font-size:.8rem;color:var(--txt2);font-family:var(--fa)">' + (isAR ? job.titleEn : job.titleAr) + '</div>' +
                '<div style="margin-top:10px;padding:4px 12px;border-radius:50px;background:' + job.color + '22;color:' + job.color + ';font-size:.72rem;font-weight:800;display:inline-block">' +
                job.questions.length + ' ' + t('questions_label') + '</div></div>';
        }).join('') +
        '</div>' +
        '<div id="training-quiz-area"></div></div>';
}

function selectTrainingJob(jobId) {
    var job = TRAINING_JOBS.find(function (j) { return j.id === jobId; });
    if (!job) return;
    trainingState = { jobId: jobId, qIdx: 0, score: 0, answered: false };

    var area = document.getElementById('training-quiz-area');
    if (!area) return;

    // Scroll to quiz area
    area.innerHTML = '';
    area.scrollIntoView({ behavior: 'smooth' });

    // Render job info + first question
    renderTrainingJob(job);
}

function renderTrainingJob(job) {
    var area = document.getElementById('training-quiz-area');
    if (!area) return;

    var desc = isAR ? job.descriptionAr : job.descriptionEn;
    var title = isAR ? job.titleAr : job.titleEn;

    area.innerHTML =
        '<div style="margin-top:32px;background:var(--surf);border:2px solid var(--bdr);border-radius:var(--rlg);overflow:hidden;animation:slideUp .4s ease-out">' +
        // Job header
        '<div style="background:linear-gradient(135deg,' + job.color + ',' + job.color + 'cc);padding:28px 32px;color:#fff;display:flex;align-items:center;gap:18px">' +
        `
        <div class="job-icon">
            <img src="${job.icon}" 
                class="training-job-img" 
                style="--job-clr:${job.color}" 
                alt="job icon">
        </div>
        ` +
        '<div style="flex:1">' +
        '<div style="font-family:var(--fd);font-size:1.4rem;font-weight:900;margin-bottom:4px">' + title + '</div>' +
        '<div style="font-family:var(--fa);font-size:.85rem;opacity:.85">' + (isAR ? job.titleEn : job.titleAr) + '</div>' +
        '</div>' +
        '<button class="voicebtn nb" onclick="speak(\'' + desc.replace(/'/g, "\\'").replace(/\n/g, ' ') + '\',null)" style="background:rgba(255,255,255,.2);border-color:rgba(255,255,255,.3)" aria-label="Listen to description">🔊</button></div>' +
        // Description
        '<div style="padding:20px 32px;background:var(--bg2);border-bottom:2px solid var(--bdr)">' +
        '<p style="font-size:.92rem;line-height:1.75;color:var(--txt)">' + desc + '</p></div>' +
        // Progress bar
        '<div style="padding:20px 32px 0">' +
        '<div style="display:flex;justify-content:space-between;font-size:.78rem;font-weight:800;color:var(--txt2);margin-bottom:6px">' +
        '<span>' + t('iv_prog_q') + ' ' + (trainingState.qIdx + 1) + ' ' + t('q_of') + ' ' + job.questions.length + '</span>' +
        '<span>' + t('score_label') + ': <strong style="color:var(--jade)">' + trainingState.score + '/' + job.questions.length + '</strong></span>' +
        '</div>' +
        '<div style="height:8px;background:var(--bg2);border-radius:50px;margin-bottom:20px;overflow:hidden">' +
        '<div style="height:100%;background:' + job.color + ';border-radius:50px;width:' + (trainingState.qIdx / job.questions.length * 100) + '%;transition:width .4s"></div></div>' +
        '</div>' +
        // Question card
        '<div id="training-q-card" style="padding:0 32px 32px">' +
        renderTrainingQuestion(job) +
        '</div></div>';
}

function renderTrainingQuestion(job) {
    var q = job.questions[trainingState.qIdx];
    var question = isAR ? q.questionAr : q.questionEn;
    var questionSub = isAR ? q.questionEn : q.questionAr;

    return '<div style="background:var(--bg);border:2px solid var(--bdr);border-radius:var(--r);padding:26px;margin-bottom:18px">' +
        '<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:14px">' +
        '<div style="width:36px;height:36px;border-radius:50%;background:var(--sun);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:.9rem;flex-shrink:0">' + (trainingState.qIdx + 1) + '</div>' +
        '<div style="flex:1">' +
        '<div style="font-size:1.05rem;font-weight:800;line-height:1.5;margin-bottom:6px">' + question + '</div>' +
        '<div style="font-size:.82rem;color:var(--txt2);font-family:var(--fa);direction:rtl;line-height:1.5">' + questionSub + '</div>' +
        '</div>' +
        '<button class="voicebtn nb" onclick="speak(\'' + question.replace(/'/g, "\\'") + '\',null)" aria-label="Read question">🔊</button>' +
        '</div>' +
        '<div id="training-feedback"></div>' +
        '<div style="display:flex;gap:14px;justify-content:center;margin-top:20px" id="training-btn-row">' +
        '<button class="training-tf-btn training-true-btn" onclick="answerTraining(true,' + q.answer + ')" aria-label="True">' +
        '✅ ' + t('true_btn') + '</button>' +
        '<button class="training-tf-btn training-false-btn" onclick="answerTraining(false,' + q.answer + ')" aria-label="False">' +
        '❌ ' + t('false_btn') + '</button>' +
        '</div></div>';
}

function answerTraining(userAnswer, correctAnswer) {
    if (trainingState.answered) return;
    trainingState.answered = true;

    var job = TRAINING_JOBS.find(function (j) { return j.id === trainingState.jobId; });
    var isCorrect = (userAnswer === correctAnswer);
    if (isCorrect) trainingState.score++;

    // Disable buttons & show feedback
    var btnRow = document.getElementById('training-btn-row');
    if (btnRow) {
        btnRow.querySelectorAll('.training-tf-btn').forEach(function (b) {
            b.disabled = true; b.style.opacity = '.5';
        });
    }

    var fb = document.getElementById('training-feedback');
    if (fb) {
        var correctWord = correctAnswer ? (isAR ? 'صح ✅' : 'True ✅') : (isAR ? 'خطأ ❌' : 'False ❌');
        fb.innerHTML = '<div style="padding:14px 18px;border-radius:var(--rsm);margin-bottom:10px;font-weight:800;font-size:.92rem;' +
            (isCorrect ? 'background:rgba(16,185,129,.12);border:2px solid var(--jade);color:var(--jade)' :
                'background:rgba(244,63,94,.12);border:2px solid var(--rose);color:var(--rose)') + '">' +
            (isCorrect ? t('correct_msg') : t('wrong_msg') + ' <strong>' + correctWord + '</strong>') +
            '</div>';
        speak(isCorrect ? (isAR ? 'إجابة صحيحة!' : 'Correct! Well done!') : (isAR ? 'ليس تمامًا.' : 'Not quite.'), null);
    }

    // Show next button
    if (btnRow) {
        var isLast = (trainingState.qIdx >= job.questions.length - 1);
        var nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn-t btn-sm';
        nextBtn.style.marginTop = '12px';
        nextBtn.style.width = '100%';
        nextBtn.textContent = isLast ? t('finish_msg') : t('next_q');
        nextBtn.setAttribute('aria-label', isLast ? 'Finish' : 'Next question');
        nextBtn.onclick = function () {
            if (isLast) {
                showTrainingResult(job);
            } else {
                trainingState.qIdx++;
                trainingState.answered = false;
                renderTrainingJob(job);
            }
        };
        var qCard = fb.closest('div[style*="border-radius:var(--r)"]');
        if (qCard) qCard.appendChild(nextBtn);
    }
}

function showTrainingResult(job) {
    var area = document.getElementById('training-quiz-area');
    if (!area) return;
    var pct = Math.round(trainingState.score / job.questions.length * 100);
    var title = isAR ? job.titleAr : job.titleEn;
    var deg = pct / 100 * 360;

    area.innerHTML =
        '<div style="margin-top:32px;background:var(--surf);border:2px solid var(--bdr);border-radius:var(--rlg);padding:48px;text-align:center;animation:slideUp .5s ease-out">' +
        // `<div class="job-icon">
        //     <img src="${job.icon}" 
        //         class="training-job-img" 
        //         style="--job-clr:${job.color}" 
        //         alt="job icon" />
        // </div>` +
        `<div class="job-icon">
            <video autoplay controls autoplay src="${job.trainVideo}" 
                class="training-job-video" 
                style="--job-clr:${job.color}" 
                alt="job icon"></video>
        </div>` +
        '<div style="width:110px;height:110px;border-radius:50%;border:7px solid var(--bg2);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:2rem;font-weight:900;color:' + job.color + ';margin:0 auto 24px;background:conic-gradient(' + job.color + ' ' + deg + 'deg,var(--bg2) ' + deg + 'deg)">' + pct + '%</div>' +
        '<h2 style="font-family:var(--fd);font-size:1.9rem;font-weight:900;margin-bottom:10px">🎉 ' + title + '</h2>' +
        '<p style="color:var(--txt2);font-size:1rem;margin-bottom:8px">' +
        (isAR ? 'حصلت على ' + trainingState.score + ' من ' + job.questions.length + ' إجابة صحيحة!' :
            'You got ' + trainingState.score + ' out of ' + job.questions.length + ' correct!') + '</p>' +
        '<p style="color:var(--txt2);font-size:.88rem;margin-bottom:28px">' +
        (pct >= 80 ? '🌟 ' + (isAR ? 'أداء ممتاز! أنت مستعد لهذه الوظيفة!' : 'Excellent! You are ready for this job!') :
            pct >= 50 ? '👍 ' + (isAR ? 'أداء جيد! استمر في التدريب!' : 'Good effort! Keep practising!') :
                '💪 ' + (isAR ? 'تحتاج مزيداً من التدريب. حاول مرة أخرى!' : 'Keep going! Try again to improve!')) + '</p>' +
        '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn btn-o" onclick="selectTrainingJob(\'' + job.id + '\')">🔄 ' + t('restart') + '</button>' +
        '<button class="btn btn-t" onclick="showPage(\'training\')">← ' + (isAR ? 'كل الوظائف' : 'All Jobs') + '</button>' +
        '<button class="btn btn-g" onclick="showPage(\'cvbuild\')">📄 ' + t('cv_guide_btn') + '</button>' +
        '</div></div>';

    speak((isAR ? 'أحسنت! حصلت على ' + pct + ' بالمئة.' : 'Well done! You scored ' + pct + ' percent.'), null);
    updateStat('pts', trainingState.score * 10);
    addAct('🏋️', 'Training: ' + title, 'Score: ' + pct + '%', '+' + trainingState.score * 10 + ' pts');
    area.scrollIntoView({ behavior: 'smooth' });
}

// ── CV LEARN ──────────────────────────────────────────────────────────
function buildCVLearnPage() {
    var pg = document.getElementById('page-cvlearn');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')" aria-label="Back">←</button><h2>📖 ' + t('nav_cvlearn') + '</h2><span class="step-badge" style="background:var(--jade)">' + t('cv_step_preview') + '</span></div>' +
        '<div style="padding:32px;max-width:960px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#1A1A2E,#0F3460);border-radius:var(--rlg);overflow:hidden;margin-bottom:28px;aspect-ratio:16/9;position:relative;" id="cv-vid-wrap">' +
        '<video id="cv-video" src="./images/cv.mp4" autoplay loop controls style="width:100%;height:100%;object-fit:contain;display:block" preload="metadata"></video>' +
        '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:32px">' +
        [
            ['👤', t('cv_sec_summary'), isAR ? 'الاسم، البريد، الهاتف، والموقع في الأعلى' : 'Name, email, phone, location at the top'],
            ['✍️', t('cv_sec_summary'), isAR ? '2-3 جمل عن نقاط قوتك' : '2-3 sentences about your strengths'],
            ['💼', t('cv_sec_exp'), isAR ? 'أي وظيفة أو عمل تطوعي أو نشاط مدرسي' : 'Any job, volunteering or school activity'],
            ['🎓', t('cv_sec_edu'), isAR ? 'اسم المدرسة وسنة التخرج' : 'School name and graduation year'],
            ['🏆', t('cv_sec_certs'), isAR ? 'الدورات، الجوائز، والتدريبات' : 'Courses, awards, training'],
            ['🧩', t('cv_sec_skills'), isAR ? 'العمل الجماعي، أساسيات الكمبيوتر، والتواصل' : 'Teamwork, computer basics, communication']
        ].map(function (item) {
            return '<div style="background:var(--surf);border:2px solid var(--bdr);border-radius:var(--r);padding:24px 20px;transition:all .25s">' +
                '<div style="font-size:1.9rem;margin-bottom:10px">' + item[0] + '</div><h3 style="font-size:.9rem;font-weight:800;margin-bottom:5px">' + item[1] + '</h3>' +
                '<p style="font-size:.78rem;color:var(--txt2);line-height:1.5">' + item[2] + '</p></div>';
        }).join('') + '</div>' +
        '<div style="text-align:center"><button class="btn btn-o" onclick="showPage(\'cvbuild\')">' + t('cv_guide_btn') + '</button></div></div>';
    // cvVidIdx = 0; cvVidPlaying = false;
    // var video = document.getElementById('cv-video');
    // document.getElementById('cv-vid-wrap').onclick = toggleCVVideo;
}

function toggleCVVideo() {
    var video = document.getElementById('cv-video');
    var btn = document.getElementById('cv-play-btn');
    if (!video) return;
    if (video.paused) {
        video.play();
        btn.textContent = '⏸ Pause';
        cvVidPlaying = true;
    } else {
        video.pause();
        btn.textContent = '▶ Play';
        cvVidPlaying = false;
    }
}

function restartCVVid() {
    var video = document.getElementById('cv-video');
    var btn = document.getElementById('cv-play-btn');
    if (!video) return;
    video.currentTime = 0;
    video.play();
    btn.textContent = '⏸ Pause';
    cvVidPlaying = true;
}

function playCVSlide() {
    if (cvVidIdx >= CV_SLIDES.length) { cvVidPlaying = false; var b = document.getElementById('cv-play-btn'); if (b) b.textContent = '▶ Replay'; return; }
    var s = CV_SLIDES[cvVidIdx];
    var ch = document.getElementById('cv-char'); var cp = document.getElementById('cv-cap'); var ca = document.getElementById('cv-cap-ar'); var pg = document.getElementById('cv-prog');
    if (ch) ch.textContent = s.c;
    if (cp) cp.textContent = isAR ? s.ar : s.en;
    if (ca) ca.textContent = isAR ? s.en : s.ar;
    if (pg) pg.style.width = ((cvVidIdx + 1) / CV_SLIDES.length * 100) + '%';
    speak(isAR ? s.ar : s.en, function () {
        if (cvVidPlaying) { cvVidIdx++; cvVidTimer = setTimeout(playCVSlide, 500); }
    });
}

// ── CV BUILD ──────────────────────────────────────────────────────────
function buildCVBuildPage() {
    loadCV();
    var pg = document.getElementById('page-cvbuild');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'cvlearn\')" aria-label="Back">←</button><h2>📄 ' + (isAR ? 'ابنِ سيرتك الذاتية' : 'Build Your CV') + '</h2><span class="step-badge" style="background:var(--gold);color:#1a1a1a">Step 3 of 5</span></div>' +
        '<div style="background:var(--gold);color:#1a1a1a;padding:12px 32px;font-size:.84rem;font-weight:800">🌟 ' + (isAR ? 'املأ بياناتك — معاينة السيرة تظهر على اليمين!' : 'Fill in your details — your CV preview appears on the right!') + '</div>' +
        '<div class="cvwrap"><div class="cvform" id="cvform"></div>' +
        '<div class="cvprev"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">' +
        '<h3 style="font-weight:900;font-size:.9rem">👀 ' + (isAR ? 'معاينة مباشرة' : 'Live Preview') + '</h3>' +
        '<div style="display:flex;gap:7px">' +
        '<button class="btn btn-o btn-sm" onclick="exportCV(\'pdf\')">📥 PDF</button>' +
        '<button class="btn btn-g btn-sm" onclick="exportCV(\'docx\')">📝 DOCX</button>' +
        '<button class="btn btn-g btn-sm" onclick="saveCV()">💾 ' + (isAR ? 'حفظ' : 'Save') + '</button></div></div>' +
        '<div class="cvdoc" id="cvdoc">' +
        '<div class="cvdoc-hdr"><div class="cvdoc-name" id="cvp-name">Your Name</div><div class="cvdoc-role" id="cvp-role">Desired Job</div>' +
        '<div class="cvdoc-contact"><span id="cvp-email">📧 email</span><span id="cvp-phone">📞 phone</span><span id="cvp-loc">📍 location</span></div></div>' +
        '<div class="cvdsec"><h4>Professional Summary</h4><p id="cvp-summary">Your summary here…</p></div>' +
        '<div class="cvdsec"><h4>Work Experience</h4><ul id="cvp-exp-ul"><li>Your experience here…</li></ul></div>' +
        '<div class="cvdsec"><h4>Education</h4><p id="cvp-edu">Your education here…</p></div>' +
        '<div class="cvdsec"><h4>Certifications</h4><p id="cvp-cert">—</p></div>' +
        '<div class="cvdsec"><h4>Skills</h4><div class="cvstags" id="cvp-skills"></div></div>' +
        '<div class="cvdsec"><h4>Hobbies & Interests</h4><p id="cvp-hobbies">Your hobbies here…</p></div></div>' +
        '<div style="margin-top:14px;display:flex;gap:9px;flex-wrap:wrap">' +
        '<button class="btn btn-o btn-sm" onclick="exportCV(\'pdf\')">📥 ' + (isAR ? 'تنزيل PDF' : 'Download PDF') + '</button>' +
        '<button class="btn btn-g btn-sm" onclick="exportCV(\'docx\')">📝 ' + (isAR ? 'تنزيل DOCX' : 'Download DOCX') + '</button>' +
        '<button class="btn btn-t btn-sm" onclick="exportCV(\'txt\')">📄 ' + (isAR ? 'نص ATS' : 'ATS Text') + '</button>' +
        '</div></div></div>';
    renderCVForm();
}

function renderCVForm() {
    var el = document.getElementById('cvform'); if (!el) return;
    var html = CV_FIELDS.map(function (f) {
        var label = isAR ? f.ar : f.en;
        var labelSub = isAR ? f.en : f.ar;
        var inputHtml;
        if (f.type === 'textarea') {
            inputHtml = '<textarea class="cvinput cvtarea" id="cvf-' + f.key + '" placeholder="' + f.hint + '" oninput="cvLive(\'' + f.key + '\',this.value)">' + (cvData[f.key] || '') + '</textarea>';
        } else if (f.type === 'skills') {
            inputHtml = '<div class="schips" id="cvchips-' + f.key + '">' + SKILLS_LIST.map(function (s) {
                return '<div class="schip ' + ((cvData.skills || []).includes(s) ? 'on' : '') + '" role="checkbox" tabindex="0" aria-checked="' + ((cvData.skills || []).includes(s)) + '" onclick="toggleSkill(\'' + s.replace(/'/g, "\\'") + '\',this)">' + s + '</div>';
            }).join('') + '</div>';
        } else {
            inputHtml = '<input class="cvinput" type="' + f.type + '" id="cvf-' + f.key + '" placeholder="' + f.hint + '" value="' + (cvData[f.key] || '') + '" oninput="cvLive(\'' + f.key + '\',this.value)">';
        }
        var recHtml = f.type !== 'skills' ? '<div class="cvrecrow"><button class="cvrecbtn" id="cvrc-' + f.key + '" onclick="toggleCVRec(\'' + f.key + '\')" aria-label="Record voice">🎤 ' + (isAR ? 'تسجيل' : 'Record Voice') + '</button></div>' : '';
        return '<div class="cvfblock" id="cvb-' + f.key + '">' +
            '<div class="cflrow"><span class="cflen">' + label + '</span><button class="voicebtn nb" onclick="speak(\'' + f.en + '\',null)" aria-label="Listen">🔊</button></div>' +
            '<div class="cflar">' + labelSub + '</div><div class="cfhint">' + f.hint + '</div>' +
            inputHtml + recHtml + '</div>';
    }).join('');
    html += '<div style="display:flex;gap:9px;margin-top:6px;flex-wrap:wrap">' +
        '<button class="btn btn-o" onclick="saveCV();showToast(\'💾 ' + t('cv_save_toast') + '\')">💾 ' + (isAR ? 'حفظ' : 'Save') + '</button>' +
        '<button class="btn btn-t" onclick="exportCV(\'pdf\')">📥 PDF</button>' +
        '<button class="btn btn-g" onclick="exportCV(\'docx\')">📝 DOCX</button>' +
        '<button class="btn btn-g" onclick="showPage(\'games\')">🧩 ' + t('cv_next_games') + '</button></div>';
    el.innerHTML = html;
    updateCVPrev();
}

function cvLive(key, val) { cvData[key] = val; updateCVPrev(); }

function toggleSkill(skill, el) {
    if (!cvData.skills) cvData.skills = [];
    var i = cvData.skills.indexOf(skill);
    if (i > -1) cvData.skills.splice(i, 1); else cvData.skills.push(skill);
    el.classList.toggle('on');
    el.setAttribute('aria-checked', el.classList.contains('on'));
    updateCVPrev();
}

function toggleCVRec(key) {
    var btn = document.getElementById('cvrc-' + key);
    if (cvRecMap[key] && cvRecMap[key].active) {
        try { cvRecMap[key].r.stop(); } catch (e) { }
        cvRecMap[key].active = false;
        if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 ' + (isAR ? 'تسجيل' : 'Record Voice'); }
        return;
    }
    if (!SR) { showNotif('❌ Voice not supported. Use Chrome.'); return; }
    var r = new SR();
    r.lang = isAR ? 'ar-SA' : 'en-US'; r.continuous = true; r.interimResults = true; r.start();
    if (btn) { btn.classList.add('rec'); btn.textContent = '🛑 ' + (isAR ? 'إيقاف التسجيل' : 'Stop Recording'); }
    cvRecMap[key] = { r: r, active: true };
    r.onresult = function (e) {
        var fin = '';
        for (var i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) fin += e.results[i][0].transcript;
        if (fin) { var inp = document.getElementById('cvf-' + key); if (inp) { inp.value = (inp.value + ' ' + fin).trim(); cvLive(key, inp.value); } }
    };
    r.onerror = function () { if (cvRecMap[key]) cvRecMap[key].active = false; if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 Record Voice'; } };
    r.onend = function () { if (cvRecMap[key] && cvRecMap[key].active) { cvRecMap[key].active = false; if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 Record Voice'; } } };
}

function updateCVPrev() {
    var d = cvData;
    function g(id, v) { var el = document.getElementById(id); if (el) el.textContent = v || ''; }
    g('cvp-name', d.name); g('cvp-role', d.role);
    g('cvp-email', d.email ? '📧 ' + d.email : '');
    g('cvp-phone', d.phone ? '📞 ' + d.phone : '');
    g('cvp-loc', d.loc ? '📍 ' + d.loc : '');
    g('cvp-summary', d.summary || 'Your summary here…');
    var expUl = document.getElementById('cvp-exp-ul');
    if (expUl) { var lines = (d.exp || 'Your experience here…').split('\n').filter(function (l) { return l.trim(); }); expUl.innerHTML = lines.map(function (l) { return '<li>' + l + '</li>'; }).join(''); }
    g('cvp-edu', d.edu || 'Your education here…');
    g('cvp-cert', d.cert || '—');
    g('cvp-hobbies', d.hobbies || 'Your hobbies here…');
    var sk = document.getElementById('cvp-skills');
    if (sk) sk.innerHTML = (d.skills || []).map(function (s) { return '<span class="cvst">' + s + '</span>'; }).join('');
}

function saveCV() { try { localStorage.setItem('bp_cv', JSON.stringify(cvData)); } catch (e) { } updateStat('cvs', 1); addAct('📄', 'CV Saved', 'Updated', '+30 pts'); }
function loadCV() { try { cvData = JSON.parse(localStorage.getItem('bp_cv') || '{}'); } catch (e) { cvData = {}; } }

function exportCV(type) {
    var d = cvData;
    if (type === 'txt') {
        var lines = [
            d.name || 'Your Name', '='.repeat(40), d.role || 'Job Title',
            'Email: ' + (d.email || '') + '  |  Phone: ' + (d.phone || '') + '  |  Location: ' + (d.loc || ''),
            '', 'PROFESSIONAL SUMMARY', '-'.repeat(40), d.summary || '',
            '', 'WORK EXPERIENCE', '-'.repeat(40), d.exp || '',
            '', 'EDUCATION', '-'.repeat(40), d.edu || '',
            '', 'CERTIFICATIONS', '-'.repeat(40), d.cert || '',
            '', 'SKILLS', '-'.repeat(40), (d.skills || []).join(' | ') || '',
            '', 'HOBBIES & INTERESTS', '-'.repeat(40), d.hobbies || ''
        ];
        var blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        var a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = (d.name || 'MyCV').replace(/\s+/g, '_') + '_Equal Opportunities_ATS.txt'; a.click();
        showToast('📝 ATS text downloaded!');
    } else if (type === 'docx') {
        exportCVDocx(d);
    } else {
        loadJsPDF(function () {
            var jsPDF = window.jspdf && window.jspdf.jsPDF;
            if (!jsPDF) { showNotif('PDF library not loaded.'); return; }
            var doc = new jsPDF({ unit: 'mm', format: 'a4' });
            doc.setFillColor(255, 107, 53); doc.rect(0, 0, 210, 36, 'F');
            doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(20);
            doc.text(d.name || 'Your Name', 18, 14);
            doc.setFontSize(11); doc.setFont('helvetica', 'normal');
            doc.text(d.role || 'Job Title', 18, 22);
            doc.setFontSize(9);
            doc.text([(d.email || ''), (d.phone || ''), (d.loc || '')].filter(Boolean).join('  |  '), 18, 30);
            var y = 46;
            function sec(title, content) {
                if (!content) return;
                doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(255, 107, 53);
                doc.text(title.toUpperCase(), 18, y); y += 2;
                doc.setDrawColor(255, 107, 53); doc.setLineWidth(.3); doc.line(18, y, 192, y); y += 5;
                doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(60, 60, 60);
                var lines2 = doc.splitTextToSize(content, 170);
                doc.text(lines2, 18, y); y += lines2.length * 5.5 + 6;
            }
            sec('Professional Summary', d.summary);
            sec('Work Experience', d.exp);
            sec('Education', d.edu);
            if (d.cert) sec('Certifications', d.cert);
            if (d.skills && d.skills.length) sec('Skills', d.skills.join(' • '));
            sec('Hobbies & Interests', d.hobbies);
            doc.save((d.name || 'MyCV').replace(/\s+/g, '_') + '_Equal Opportunities.pdf');
            showToast('📥 PDF downloaded!');
        });
    }
}

// ATS-friendly DOCX export using docx library
function exportCVDocx(d) {
    // Load docx library
    var script = document.createElement('script');
    script.src = 'https://unpkg.com/docx@8.0.0/build/index.js';
    script.onload = function () {
        try {
            var docx = window.docx;
            var name = d.name || 'Your Name';
            var role = d.role || 'Desired Job';

            function makeHeading(text) {
                return new docx.Paragraph({
                    text: text,
                    heading: docx.HeadingLevel.HEADING_2,
                    spacing: { before: 240, after: 80 },
                    border: { bottom: { color: 'FF6B35', size: 8, style: docx.BorderStyle.SINGLE } }
                });
            }
            function makeText(text, opts) {
                opts = opts || {};
                return new docx.Paragraph({
                    children: [new docx.TextRun({ text: text || '', size: opts.size || 22, bold: opts.bold || false, color: opts.color || '333333' })],
                    spacing: { after: opts.spaceAfter || 80 }
                });
            }
            function makeBullet(text) {
                return new docx.Paragraph({
                    children: [new docx.TextRun({ text: text || '', size: 22 })],
                    bullet: { level: 0 },
                    spacing: { after: 60 }
                });
            }

            var sections_content = [
                // Header
                new docx.Paragraph({
                    children: [new docx.TextRun({ text: name, size: 52, bold: true, color: 'FF6B35' })],
                    spacing: { after: 60 }
                }),
                new docx.Paragraph({
                    children: [new docx.TextRun({ text: role, size: 28, color: '555555', italics: true })],
                    spacing: { after: 80 }
                }),
                // Contact line
                new docx.Paragraph({
                    children: [new docx.TextRun({
                        text: [d.email, d.phone, d.loc].filter(Boolean).join('   |   '),
                        size: 20, color: '777777'
                    })],
                    spacing: { after: 200 }
                })
            ];

            // Sections
            if (d.summary) {
                sections_content.push(makeHeading('PROFESSIONAL SUMMARY'));
                sections_content.push(makeText(d.summary, { spaceAfter: 160 }));
            }
            if (d.exp) {
                sections_content.push(makeHeading('WORK EXPERIENCE'));
                d.exp.split('\n').filter(Boolean).forEach(function (line) {
                    sections_content.push(makeBullet(line));
                });
                sections_content.push(makeText('', { spaceAfter: 80 }));
            }
            if (d.edu) {
                sections_content.push(makeHeading('EDUCATION'));
                sections_content.push(makeText(d.edu, { spaceAfter: 160 }));
            }
            if (d.cert) {
                sections_content.push(makeHeading('CERTIFICATIONS'));
                sections_content.push(makeText(d.cert, { spaceAfter: 160 }));
            }
            if (d.skills && d.skills.length) {
                sections_content.push(makeHeading('SKILLS'));
                sections_content.push(makeText(d.skills.join('  •  '), { spaceAfter: 160 }));
            }
            if (d.hobbies) {
                sections_content.push(makeHeading('HOBBIES & INTERESTS'));
                sections_content.push(makeText(d.hobbies, { spaceAfter: 80 }));
            }

            var doc2 = new docx.Document({
                creator: 'Equal Opportunities',
                title: name + ' - CV',
                description: 'ATS-friendly CV generated by Equal Opportunities',
                styles: {
                    default: {
                        document: { run: { font: 'Calibri', size: 22 } }
                    }
                },
                sections: [{ properties: {}, children: sections_content }]
            });

            docx.Packer.toBlob(doc2).then(function (blob) {
                var url = URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = (name).replace(/\s+/g, '_') + '_Equal Opportunities_CV.docx';
                a.click();
                URL.revokeObjectURL(url);
                showToast('📝 DOCX CV downloaded!');
            });
        } catch (err) {
            showNotif('DOCX export error. Try PDF instead.');
            console.error('DOCX error:', err);
        }
    };
    script.onerror = function () { showNotif('Could not load DOCX library. Check internet connection.'); };
    document.head.appendChild(script);
}

function loadJsPDF(cb) {
    if (window.jspdf) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = cb;
    s.onerror = function () { showNotif('Could not load PDF library. Check internet.'); };
    document.head.appendChild(s);
}

// ── GAMES ─────────────────────────────────────────────────────────────
function buildGamesPage() {
    var pg = document.getElementById('page-games');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')" aria-label="Back">←</button><h2>🧩 ' + t('nav_games') + '</h2></div>' +
        '<div style="padding:32px;max-width:1100px;margin:0 auto">' +
        '<div style="margin-bottom:24px"><h3 style="font-family:var(--fd);font-size:1.25rem;font-weight:900;margin-bottom:5px">' + (isAR ? 'العب لتبني مهارات حقيقية! 🎯' : 'Play Games to Build Real Skills! 🎯') + '</h3>' +
        '<p style="color:var(--txt2);font-size:.86rem">' + (isAR ? 'كل لعبة تساعدك على تطوير الذاكرة والتركيز وحل المشكلات.' : 'Every game helps you practice memory, focus, and problem-solving for the workplace.') + '</p></div>' +
        '<div class="games-grid">' +
        GAMES.map(function (g) {
            return '<div class="card game-card" onclick="startGame(\'' + g.id + '\')" role="button" tabindex="0" aria-label="' + (isAR ? g.titleAr : g.title) + '">' +
                '<div class="g-ico">' + g.icon + '</div>' +
                '<h3>' + (isAR ? g.titleAr : g.title) + '</h3>' +
                '<div style="font-family:var(--fa);font-size:.72rem;color:var(--txt2);margin-bottom:5px">' + (isAR ? g.title : g.titleAr) + '</div>' +
                '<p>' + (isAR ? g.descAr || g.desc : g.desc) + '</p>' +
                '<span class="g-playtag" style="background:' + g.color + '">' + (isAR ? '▶ العب' : '▶ Play') + '</span></div>';
        }).join('') + '</div>' +
        '<div class="game-arena" id="game-arena"></div></div>';
}

function startGame(id) {
    gameActive = id;
    var g = GAMES.find(function (x) { return x.id === id; });
    var a = document.getElementById('game-arena'); if (!a) return;
    a.classList.add('on');
    var inst = isAR ? g.instAr : g.instEn;
    a.innerHTML =
        '<div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">' +
        '<span style="font-size:2rem">' + g.icon + '</span>' +
        '<div><h3 style="font-weight:900;margin-bottom:3px">' + (isAR ? g.titleAr : g.title) + '</h3>' +
        '<p style="font-size:.8rem;color:var(--txt2)">' + inst + '</p></div>' +
        '<button class="voicebtn nb" onclick="speak(\'' + inst.replace(/'/g, "\\'") + '\',null)" style="margin-left:auto" aria-label="Listen">🔊</button>' +
        '<button class="btn btn-g btn-sm" onclick="closeGame()" aria-label="Close game">✕ ' + (isAR ? 'إغلاق' : 'Close') + '</button></div>' +
        '<div id="game-inner"></div>';
    a.scrollIntoView({ behavior: 'smooth' });
    speak(inst, null);
    if (id === 'memory') buildMemory();
    else if (id === 'pattern') buildPattern();
    else if (id === 'math') buildMath();
    else if (id === 'sort') buildSort();
    else if (id === 'focus') buildFocus();
}

function closeGame() { var a = document.getElementById('game-arena'); if (a) a.classList.remove('on'); }

// Memory game
var EMOJIS = ['🍎', '🐶', '🌺', '⭐', '🎈', '🦁', '🍕', '🎸'];
function buildMemory() {
    var cards = EMOJIS.concat(EMOJIS).sort(function () { return Math.random() - .5; });
    var inn = document.getElementById('game-inner');
    memFlipped = []; memMatched = 0; memLocked = false; memMoves = 0; memSec = 0;
    clearInterval(memT);
    inn.innerHTML =
        '<div class="scorebar">' +
        '<div class="sitem"><div class="snum" id="mem-moves">0</div><div class="slbl">' + t('game_moves') + '</div></div>' +
        '<div class="sitem"><div class="snum" id="mem-pairs">0/' + EMOJIS.length + '</div><div class="slbl">' + t('game_pairs') + '</div></div>' +
        '<div class="sitem"><div class="snum" id="mem-time">0s</div><div class="slbl">' + t('game_time') + '</div></div></div>' +
        '<div class="mem-board" id="mem-board"></div>' +
        '<div style="text-align:center;margin-top:16px"><button class="btn btn-o btn-sm" onclick="buildMemory()">🔄 ' + t('game_new') + '</button></div>';
    var board = document.getElementById('mem-board');
    cards.forEach(function (emoji, i) {
        var c = document.createElement('div'); c.className = 'mc';
        c.dataset.emoji = emoji; c.dataset.idx = i;
        c.setAttribute('role', 'button'); c.setAttribute('tabindex', '0'); c.setAttribute('aria-label', 'Card ' + (i + 1));
        c.innerHTML = '<div class="mc-back">?</div><div class="mc-front">' + emoji + '</div>';
        c.onclick = function () { flipCard(c); };
        board.appendChild(c);
    });
    memT = setInterval(function () { memSec++; var el = document.getElementById('mem-time'); if (el) el.textContent = memSec + 's'; }, 1000);
}

function flipCard(c) {
    if (memLocked || c.classList.contains('flip') || c.classList.contains('done')) return;
    c.classList.add('flip'); memFlipped.push(c);
    if (memFlipped.length === 2) {
        memMoves++;
        var el = document.getElementById('mem-moves'); if (el) el.textContent = memMoves;
        memLocked = true;
        if (memFlipped[0].dataset.emoji === memFlipped[1].dataset.emoji) {
            memFlipped.forEach(function (x) { x.classList.add('done'); });
            memFlipped = []; memLocked = false; memMatched++;
            var p = document.getElementById('mem-pairs'); if (p) p.textContent = memMatched + '/8';
            if (memMatched === 8) {
                clearInterval(memT);
                speak((isAR ? 'مبروك! وجدت كل الأزواج في ' : 'Congratulations! You matched all cards in ') + memMoves + (isAR ? ' حركة!' : ' moves!'), null);
                showToast('🎉 ' + (isAR ? 'أتممت اللعبة!' : 'All pairs matched! Amazing!'));
                updateStat('pts', 50); addAct('🧠', 'Memory Game', 'Completed', '+50 pts');
            }
        } else {
            setTimeout(function () { memFlipped.forEach(function (x) { x.classList.remove('flip'); }); memFlipped = []; memLocked = false; }, 1000);
        }
    }
}

var PAT_SHAPES = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'];
function buildPattern() {
    var inn = document.getElementById('game-inner');
    patScore = 0; patLevel = 1;
    inn.innerHTML =
        '<div class="scorebar"><div class="sitem"><div class="snum" id="pat-score">0</div><div class="slbl">' + t('game_score') + '</div></div>' +
        '<div class="sitem"><div class="snum" id="pat-level">1</div><div class="slbl">' + t('game_level') + '</div></div></div>' +
        '<div id="pat-inner"></div>';
    nextPattern();
}

function nextPattern() {
    var size = 3 + Math.floor(patLevel / 2);
    var pat = []; for (var k = 0; k < size; k++) pat.push(PAT_SHAPES[Math.floor(Math.random() * 4)]);
    var next = PAT_SHAPES[Math.floor(Math.random() * 4)];
    var choices = [next].concat(PAT_SHAPES.filter(function (s) { return s !== next; }).slice(0, 3)).sort(function () { return Math.random() - .5; });
    var inn = document.getElementById('pat-inner'); if (!inn) return;
    inn.innerHTML =
        '<p style="font-weight:800;margin-bottom:10px;font-size:.9rem">' + (isAR ? 'ما الشكل التالي؟' : 'What shape comes next? · ما الشكل التالي؟') + '</p>' +
        '<div class="pat-display">' + pat.map(function (s) { return '<div class="pat-shape" style="background:var(--bg2);border:2.5px solid var(--bdr)">' + s + '</div>'; }).join('') +
        '<div class="pat-shape" style="background:var(--sun);border:2.5px solid var(--sun);font-size:1.5rem;color:#fff;font-weight:900">?</div></div>' +
        '<div class="pat-choices">' + choices.map(function (s) {
            return '<div class="pat-opt" role="button" tabindex="0" onclick="checkPat(\'' + s + '\',\'' + next + '\',this)">' + s + '</div>';
        }).join('') + '</div>';
}

function checkPat(chosen, correct, el) {
    if (chosen === correct) {
        patScore += 10; patLevel++;
        speak(isAR ? 'إجابة صحيحة! أحسنت!' : 'Correct! Well done!', null); showToast('✅ ' + t('correct_msg'));
        el.style.background = 'rgba(16,185,129,.2)'; el.style.borderColor = 'var(--jade)';
        var sc = document.getElementById('pat-score'); if (sc) sc.textContent = patScore;
        var lv = document.getElementById('pat-level'); if (lv) lv.textContent = patLevel;
        updateStat('pts', 10); setTimeout(nextPattern, 800);
    } else {
        speak(isAR ? 'ليس صحيحاً! انظر إلى النمط مرة أخرى.' : 'Not quite! Look at the pattern again.', null);
        el.style.background = 'rgba(244,63,94,.15)'; el.style.borderColor = 'var(--rose)';
        showToast('🤔 ' + t('game_try_again'));
    }
}

function buildMath() {
    mathScore = 0; mathLevel = 1;
    var inn = document.getElementById('game-inner');
    inn.innerHTML =
        '<div class="scorebar"><div class="sitem"><div class="snum" id="math-score">0</div><div class="slbl">' + t('game_score') + '</div></div>' +
        '<div class="sitem"><div class="snum" id="math-level">1</div><div class="slbl">' + t('game_level') + '</div></div></div>' +
        '<div id="math-inner"></div>';
    nextMath();
}

function nextMath() {
    var max = 3 + mathLevel * 2;
    var a = Math.ceil(Math.random() * max), b = Math.ceil(Math.random() * (max / 2));
    var ops = ['+', '-', '×']; var op = ops[Math.floor(Math.random() * (mathLevel > 3 ? 3 : mathLevel > 1 ? 2 : 1))];
    var ans;
    if (op === '+') ans = a + b; else if (op === '-') ans = Math.abs(a - b); else ans = a * b;
    var wrongs = new Set();
    while (wrongs.size < 3) { var w = ans + (Math.floor(Math.random() * 5) - 2); if (w !== ans && w >= 0) wrongs.add(w); }
    var opts = [ans].concat(Array.from(wrongs)).sort(function () { return Math.random() - .5; });
    var inn = document.getElementById('math-inner'); if (!inn) return;
    var display = op === '-' ? Math.max(a, b) + ' − ' + Math.min(a, b) : a + ' ' + op + ' ' + b;
    inn.innerHTML = '<div class="math-q">' + display + ' = ?</div>' +
        '<div class="math-opts">' + opts.map(function (o) {
            return '<button class="math-opt" role="button" aria-label="Answer ' + o + '" onclick="checkMath(' + o + ',' + ans + ',this)">' + o + '</button>';
        }).join('') + '</div>';
    speak((isAR ? 'ما هو ' : 'What is ') + display + '?', null);
}

function checkMath(chosen, correct, el) {
    document.querySelectorAll('.math-opt').forEach(function (b) { b.onclick = null; });
    if (chosen === correct) {
        mathScore += 10; mathLevel++; el.classList.add('ok');
        speak(isAR ? 'إجابة صحيحة!' : 'Correct! Great work!', null); showToast('✅ ' + t('correct_msg'));
        var sc = document.getElementById('math-score'); if (sc) sc.textContent = mathScore;
        var lv = document.getElementById('math-level'); if (lv) lv.textContent = mathLevel;
        updateStat('pts', 10); setTimeout(nextMath, 900);
    } else {
        el.classList.add('no');
        speak(isAR ? 'ليس صحيحاً! حاول مرة أخرى.' : 'Not quite! Try again.', null); showToast('🤔 ' + t('game_try_again'));
        setTimeout(function () { el.classList.remove('no'); document.querySelectorAll('.math-opt').forEach(function (b) { b.onclick = function () { checkMath(parseInt(b.textContent), correct, b); }; }); }, 800);
    }
}

var SORT_DATA = {
    colors: { items: ['Red', 'Blue', 'Green', 'Yellow'], itemsAr: ['أحمر', 'أزرق', 'أخضر', 'أصفر'], category: 'Colours', categoryAr: 'ألوان' },
    shapes: { items: ['Circle', 'Square', 'Triangle', 'Star'], itemsAr: ['دائرة', 'مربع', 'مثلث', 'نجمة'], category: 'Shapes', categoryAr: 'أشكال' },
    food: { items: ['Apple', 'Pizza', 'Banana', 'Salad'], itemsAr: ['تفاح', 'بيتزا', 'موز', 'سلطة'], category: 'Food', categoryAr: 'طعام' },
    jobs: { items: ['Library', 'Garden', 'Café', 'Office'], itemsAr: ['مكتبة', 'حديقة', 'مقهى', 'مكتب'], category: 'Workplaces', categoryAr: 'أماكن عمل' }
};

function buildSort() {
    var inn = document.getElementById('game-inner');
    sortScore = 0;
    var cats = Object.values(SORT_DATA);
    var all = [];
    cats.forEach(function (c) {
        var items = isAR ? c.itemsAr : c.items;
        var cat = isAR ? c.categoryAr : c.category;
        items.forEach(function (item) { all.push({ item: item, cat: cat }); });
    });
    all.sort(function () { return Math.random() - .5; });
    var bins = cats.map(function (c) { return isAR ? c.categoryAr : c.category; });
    inn.innerHTML =
        '<div class="scorebar"><div class="sitem"><div class="snum" id="sort-score">0</div><div class="slbl">' + t('game_score') + '</div></div>' +
        '<div class="sitem"><div class="snum" id="sort-left">' + all.length + '</div><div class="slbl">' + t('game_left') + '</div></div></div>' +
        '<p style="font-weight:800;margin-bottom:8px">' + t('game_sort_prompt') + '</p>' +
        '<div class="sort-pool" id="sort-pool">' + all.map(function (x, i) {
            return '<div class="sort-item" draggable="true" data-cat="' + x.cat + '" id="si-' + i + '">' + x.item + '</div>';
        }).join('') + '</div>' +
        '<div class="sort-bins">' + bins.map(function (b) {
            return '<div class="sort-bin" ondragover="event.preventDefault();this.classList.add(\'drag-over\')" ondragleave="this.classList.remove(\'drag-over\')" ondrop="dropSort(event,\'' + b + '\',this)"><div class="sort-bin-lbl">' + b + '</div></div>';
        }).join('') + '</div>';
    all.forEach(function (x, i) { var el = document.getElementById('si-' + i); if (el) el.addEventListener('dragstart', function () { sortDragEl = el; }); });
}

function dropSort(ev, cat, bin) {
    ev.preventDefault(); bin.classList.remove('drag-over');
    if (!sortDragEl) return;
    var correct = sortDragEl.dataset.cat === cat;
    sortDragEl.style.background = correct ? 'rgba(16,185,129,.15)' : 'rgba(244,63,94,.12)';
    sortDragEl.style.borderColor = correct ? 'var(--jade)' : 'var(--rose)';
    if (correct) {
        bin.appendChild(sortDragEl);
        sortScore += 10;
        var sc = document.getElementById('sort-score'); if (sc) sc.textContent = sortScore;
        var rem = document.querySelectorAll('.sort-pool .sort-item').length;
        var lt = document.getElementById('sort-left'); if (lt) lt.textContent = rem;
        showToast('✅ ' + t('correct_msg')); updateStat('pts', 10);
        if (rem === 0) { speak(isAR ? 'رائع! رتبت كل شيء بشكل صحيح!' : 'Amazing! You sorted everything correctly!', null); showToast('🎉 ' + (isAR ? 'كل شيء مرتب!' : 'All sorted! Great job!')); }
    } else {
        showToast('🤔 ' + t('game_wrong_cat'));
        speak(isAR ? 'ليس صحيحاً! جرب صندوقاً آخر.' : 'Not quite! Try a different box.', null);
    }
    sortDragEl = null;
}

var FOCUS_EMOJIS = ['😊', '🌟', '❤️', '🎈', '🎉', '🌈', '⚡', '🎵', '🔔', '🍀', '🌺', '🦋', '🎯', '🏆', '💎', '🌙', '☀️', '🍕', '🎸', '🦁', '🐶', '🐱', '🌸', '🍎', '🦊'];

function buildFocus() {
    focusScore = 0; focusLit = -1; focusDelay = 700; focusMissed = 0;
    if (focusFocusTimer) clearTimeout(focusFocusTimer);
    var inn = document.getElementById('game-inner');
    inn.innerHTML =
        '<div class="scorebar"><div class="sitem"><div class="snum" id="foc-score">0</div><div class="slbl">' + t('game_score') + '</div></div>' +
        '<div class="sitem"><div class="snum" id="foc-speed">700ms</div><div class="slbl">' + t('game_speed') + '</div></div></div>' +
        '<div class="focus-board" id="foc-board">' + Array.from({ length: 25 }, function (_, i) {
            return '<div class="focus-cell" id="foc-' + i + '" role="button" tabindex="0" onclick="hitFocus(' + i + ')">' + FOCUS_EMOJIS[i] + '</div>';
        }).join('') + '</div>' +
        '<div style="text-align:center;margin-top:14px"><button class="btn btn-o btn-sm" onclick="buildFocus()">🔄 ' + t('game_new') + '</button></div>';
    nextFocusCell();
}

function nextFocusCell() {
    if (focusFocusTimer) clearTimeout(focusFocusTimer);
    if (focusLit >= 0) { var prev = document.getElementById('foc-' + focusLit); if (prev) prev.classList.remove('lit'); }
    focusMissed++;
    if (focusMissed > 3) {
        speak(isAR ? 'انتهت اللعبة! مجموعك: ' : 'Game over! Great try! Score: ' + focusScore, null);
        showToast('⏰ Game Over! Score: ' + focusScore);
        updateStat('pts', focusScore); addAct('👁️', 'Focus Game', 'Score: ' + focusScore, '+' + focusScore + ' pts');
        return;
    }
    var idx = Math.floor(Math.random() * 25); focusLit = idx;
    var cell = document.getElementById('foc-' + idx); if (cell) cell.classList.add('lit');
    focusFocusTimer = setTimeout(nextFocusCell, focusDelay);
}

function hitFocus(i) {
    if (i !== focusLit) return;
    focusMissed = 0; focusScore += 10; focusDelay = Math.max(300, focusDelay - 20);
    var sc = document.getElementById('foc-score'); if (sc) sc.textContent = focusScore;
    var sp = document.getElementById('foc-speed'); if (sp) sp.textContent = focusDelay + 'ms';
    var cell = document.getElementById('foc-' + i);
    if (cell) { cell.classList.remove('lit'); cell.classList.add('hit'); setTimeout(function () { cell.classList.remove('hit'); }, 300); }
    if (focusFocusTimer) clearTimeout(focusFocusTimer);
    setTimeout(nextFocusCell, 200);
    updateStat('pts', 10);
}

// ── LEARN PAGE ────────────────────────────────────────────────────────
function buildLearnPage() {
    var pg = document.getElementById('page-learn');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')" aria-label="Back">←</button><h2>📚 ' + t('nav_learn') + '</h2></div>' +
        '<div style="padding:32px;max-width:1100px;margin:0 auto">' +
        '<div style="margin-bottom:24px"><h3 style="font-family:var(--fd);font-size:1.25rem;font-weight:900;margin-bottom:5px">' + (isAR ? 'تعلم مهارات العمل! 📖' : 'Learn Workplace Skills! 📖') + '</h3>' +
        '<p style="color:var(--txt2);font-size:.86rem">' + (isAR ? '7 موضوعات لمساعدتك على النجاح في العمل. كل موضوع يحتوي على صوت وشرح واختبار!' : '7 topics to help you succeed at work. Each topic has audio, explanations, and a quiz!') + '</p></div>' +
        '<div class="topics-grid">' + TOPICS.map(function (tp) {
            return '<div class="card topic-card" onclick="openTopic(\'' + tp.id + '\')" role="button" tabindex="0" aria-label="' + (isAR ? tp.titleAr || tp.title : tp.title) + '">' +
                '<div class="topic-ico">' + tp.icon + '</div>' +
                '<h3>' + (isAR ? tp.titleAr || tp.title : tp.title) + '</h3>' +
                '<p>' + tp.content[0][isAR ? 'ar' : 'en'].slice(0, 80) + '…</p>' +
                '<div class="topic-meta"><span class="topic-time">⏱ ' + tp.time + '</span><span style="font-size:.72rem;font-weight:800;padding:4px 11px;border-radius:50px;background:' + tp.color + '22;color:' + tp.color + '">' + (isAR ? 'ابدأ →' : 'Start →') + '</span></div>' +
                '<div class="topic-prog-bar"><div class="topic-prog-fill" style="width:' + ((topicProgress[tp.id] || 0) * 100) + '%;background:' + tp.color + '"></div></div></div>';
        }).join('') + '</div></div>';
}

function openTopic(id) {
    var tp = TOPICS.find(function (x) { return x.id === id; }); if (!tp) return;
    var inner = document.getElementById('modal-inner');
    inner.innerHTML =
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">' +
        '<span style="font-size:2.5rem">' + tp.icon + '</span>' +
        '<div><h2 style="font-family:var(--fd);font-weight:900;font-size:1.3rem">' + (isAR ? tp.titleAr || tp.title : tp.title) + '</h2></div>' +
        '<button class="voicebtn nb" onclick="speak(\'' + (isAR ? tp.titleAr || tp.title : tp.title) + '.\',null)" style="margin-left:auto" aria-label="Listen">🔊</button></div>' +
        tp.content.map(function (block) {
            if (block.type === 'text') return '<p style="font-size:.9rem;line-height:1.7;margin-bottom:12px">' + (isAR ? block.ar : block.en) + '</p><p style="font-family:var(--fa);font-size:.83rem;color:var(--txt2);direction:rtl;margin-bottom:18px;line-height:1.65">' + (isAR ? block.en : block.ar) + '</p>';
            if (block.type === 'tip') return '<div style="background:rgba(255,184,48,.1);border:1.5px solid rgba(255,184,48,.3);border-radius:var(--rsm);padding:14px 18px;margin-bottom:14px;font-size:.88rem;font-weight:700;line-height:1.6">' + (isAR ? block.ar : block.en) + '</div>';
            if (block.type === 'example') return '<div style="background:rgba(29,185,168,.07);border:1.5px solid rgba(29,185,168,.25);border-radius:var(--rsm);padding:14px 18px;margin-bottom:14px;font-size:.87rem;font-style:italic;line-height:1.6"><strong>' + (isAR ? 'مثال:' : 'Example:') + '</strong> ' + (isAR ? block.ar : block.en) + '</div>';
            if (block.type === 'quiz') return '<div style="background:var(--bg2);border:2px solid var(--bdr);border-radius:var(--r);padding:22px;margin-top:16px"><div style="font-size:.9rem;font-weight:800;margin-bottom:6px">🧩 ' + (isAR ? 'اختبار سريع' : 'Quick Quiz') + '</div><div style="font-size:.95rem;font-weight:700;margin-bottom:6px">' + (isAR ? block.qAr : block.q) + '</div><div style="font-family:var(--fa);font-size:.85rem;color:var(--txt2);direction:rtl;margin-bottom:14px">' + (isAR ? block.q : block.qAr) + '</div>' + block.opts.map(function (o, i) { return '<div class="lquiz-opt" id="tq-' + i + '" role="button" tabindex="0" onclick="checkTopicQ(' + i + ',' + block.answer + ',' + block.opts.length + ',\'' + tp.id + '\')">' + o + '</div>'; }).join('') + '</div>';
            return '';
        }).join('') +
        '<div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">' +
        '<button class="btn btn-o btn-sm" onclick="readTopicAloud(\'' + tp.id + '\')">🔊 ' + t('cmd_read') + '</button>' +
        '<button class="btn btn-g btn-sm" onclick="closeModal()">✓ ' + (isAR ? 'تم' : 'Done') + '</button></div>';
    var mb = document.getElementById('modal-bg'); if (mb) mb.classList.add('on');
}

function readTopicAloud(id) {
    var tp = TOPICS.find(function (x) { return x.id === id; }); if (!tp) return;
    var txt = tp.content.filter(function (c) { return c.type === 'text'; }).map(function (c) { return isAR ? c.ar : c.en; }).join('. ');
    speak(txt, null);
}

function checkTopicQ(chosen, correct, n, tid) {
    for (var i = 0; i < n; i++) { var el = document.getElementById('tq-' + i); if (el) el.onclick = null; }
    var el = document.getElementById('tq-' + chosen); var elc = document.getElementById('tq-' + correct);
    if (el) el.classList.add(chosen === correct ? 'ok' : 'no');
    if (chosen !== correct && elc) elc.classList.add('ok');
    if (chosen === correct) { speak(isAR ? 'إجابة صحيحة! أحسنت!' : 'Correct! Well done!', null); showToast('✅ ' + (isAR ? 'إجابة صحيحة!' : 'Correct answer!')); topicProgress[tid] = 1; updateStat('pts', 20); addAct('📚', 'Topic Quiz', 'Answered correctly', '+20 pts'); }
    else { speak(isAR ? 'ليس تمامًا! الإجابة الصحيحة مميزة.' : 'Not quite! The correct answer is highlighted.', null); showToast('💡 ' + (isAR ? 'انظر إلى الإجابة الصحيحة!' : 'See the correct answer!')); }
}

function closeModal() { var mb = document.getElementById('modal-bg'); if (mb) mb.classList.remove('on'); stopAll(); }

// ── JOBS PAGE ─────────────────────────────────────────────────────────
function buildJobsPage() {
    var pg = document.getElementById('page-jobs');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')" aria-label="Back">←</button><h2>💼 ' + t('nav_jobs') + '</h2></div>' +
        '<div style="padding:32px;max-width:1100px;margin:0 auto">' +
        '<div style="margin-bottom:22px"><h3 style="font-family:var(--fd);font-size:1.25rem;font-weight:900;margin-bottom:5px">' + t('jobs_inclusive') + '</h3>' +
        '<p style="color:var(--txt2);font-size:.86rem">' + t('jobs_employers') + '</p></div>' +
        '<div class="job-filters" id="job-filters">' +
        ['All', 'Retail', 'Food & Beverage', 'Education', 'Outdoors', 'Office', 'Creative'].map(function (f) {
            var fKey = 'jobs_filter_' + f.toLowerCase().replace(' & beverage', '');
            return '<button class="jfbtn ' + (jobFilter === f ? 'on' : '') + '" onclick="filterJobs(\'' + f + '\')">' + t(fKey) + '</button>';
        }).join('') + '</div>' +
        '<div class="jobs-grid" id="jobs-grid"></div></div>';
    renderJobs();
}

function filterJobs(f) {
    jobFilter = f;
    document.querySelectorAll('.jfbtn').forEach(function (b) { b.classList.toggle('on', b.textContent === f); });
    renderJobs();
}

function renderJobs() {
    var grid = document.getElementById('jobs-grid'); if (!grid) return;
    var shown = JOBS_LISTINGS.filter(function (j) { return jobFilter === 'All' || j.type === jobFilter; });
    grid.innerHTML = shown.map(function (j) {
        return '<div class="card job-card">' +
            '<div class="job-icon">' + j.icon + '</div>' +
            '<h3>' + (isAR ? j.titleAr : j.title) + '</h3>' +
            '<div class="job-co">🏢 ' + (isAR ? j.companyAr : j.company) + ' · 📍 ' + (isAR ? j.locationAr : j.location) + '</div>' +
            '<div class="job-tags">' + (isAR ? j.tagsAr : j.tags).map(function (t) { return '<span class="job-tag">' + t + '</span>'; }).join('') + '</div>' +
            '<p style="font-size:.8rem;color:var(--txt2);margin-bottom:14px;line-height:1.5">' + (isAR ? j.descAr : j.desc) + '</p>' +
            '<div class="job-foot">' +
            '<div><div class="job-match">' + j.match + '%</div><div style="font-size:.66rem;color:var(--txt2);font-weight:700">' + t('jobs_match') + '</div></div>' +
            '<div style="display:flex;gap:7px"><button class="voicebtn nb" onclick="speak(\'' + (isAR ? j.titleAr : j.title) + '. ' + (isAR ? j.descAr : j.desc) + '\',null)" aria-label="Listen">🔊</button>' +
            '<button class="int-btn ' + (jobInterests.includes(j.id) ? 'sent' : '') + '" id="intbtn-' + j.id + '" onclick="expressInterest(' + j.id + ',\'' + (isAR ? j.titleAr : j.title) + '\')">' +
            (jobInterests.includes(j.id) ? '✅ ' + t('jobs_interested') : '👋 ' + t('jobs_interest')) + '</button></div></div></div>';
    }).join('');
}

function expressInterest(id, title) {
    if (!jobInterests.includes(id)) { jobInterests.push(id); try { localStorage.setItem('bp_interests', JSON.stringify(jobInterests)); } catch (e) { } updateStat('pts', 15); addAct('💼', 'Job Interest', title, '+15 pts'); }
    var btn = document.getElementById('intbtn-' + id);
    if (btn) { btn.textContent = '✅ ' + (isAR ? 'مهتم!' : 'Interested!'); btn.classList.add('sent'); btn.style.transform = 'scale(1.12)'; setTimeout(function () { btn.style.transform = ''; }, 400); }
    showToast('🌟 ' + (isAR ? 'تم حفظ اهتمامك بـ' : 'Interest saved for ') + title + '!');
    speak((isAR ? 'رائع! أبديت اهتمامك بـ' : 'Great! You have expressed interest in ') + title, null);
}

// ── INTERVIEW PAGE ────────────────────────────────────────────────────
function buildInterviewPage() {
    var pg = document.getElementById('page-interview');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')" aria-label="Back">←</button><h2>🎤 ' + t('nav_interview') + '</h2><span class="step-badge" style="background:var(--jade)">' + t('iv_step_badge') + '</span></div>' +
        '<div style="background:var(--jade);color:#fff;padding:12px 32px;font-size:.84rem;font-weight:800">🌟 ' + t('iv_step_desc') + '</div>' +
        '<div class="ivwrap">' +
        '<div style="display:flex;flex-direction:column;gap:16px">' +
        '<div class="iv-bot" id="iv-bot" role="img" aria-label="AI Coach">🤖</div>' +
        '<div class="iv-talk-lbl" id="iv-tlbl">🔊 ' + t('iv_speaking') + '</div>' +
        '<div class="sbox"><div id="iv-q">' + t('iv_greeting') + '</div></div>' +
        '<div><label style="font-size:.9rem;font-weight:800;display:block;margin-bottom:8px">✍️ ' + t('iv_ans_label') + '</label>' +
        '<textarea class="ivtarea" id="iv-ans" placeholder="' + t('iv_ans_ph') + '"></textarea>' +
        '<div class="ivcontrols">' +
        '<button class="ivrecbtn" id="iv-rec" onclick="toggleIVRec()" aria-label="Record voice">🎤 ' + t('iv_start_ans') + '</button>' +
        '<button class="btn btn-t btn-sm" onclick="submitIV()">✅ ' + t('iv_submit') + '</button>' +
        '<button class="btn btn-o btn-sm" onclick="nextIV()">➡️ ' + t('iv_next') + '</button></div>' +
        '<p style="font-size:.78rem;color:var(--txt2);margin-top:8px;line-height:1.5">💡 ' + t('iv_hint') + '</p></div>' +
        '<div class="ivfb" id="iv-fb"><div style="font-size:1.3rem;margin-bottom:7px">🌟 ' + t('iv_effort') + '</div><div class="ivfb-stars" id="iv-stars">⭐⭐⭐⭐⭐</div><p id="iv-fb-txt" style="font-size:.88rem;color:var(--txt2);line-height:1.65"></p></div>' +
        '<div class="ivprog"><div class="ivprog-lbl"><span>' + t('iv_prog_title') + '</span><span id="iv-plbl">Q 1 of 8</span></div><div class="ivprog-bar"><div class="ivprog-fill" id="iv-pfill" style="width:12%"></div></div></div>' +
        '</div></div>';
    ivIdx = 0;
}

function nextIV() {
    if (ivIdx >= IV_QS.length) { showToast('🎉 ' + (isAR ? 'المقابلة اكتملت! أحسنت!' : 'Interview complete! You did amazing!')); speak(isAR ? 'مبروك! أتممت المقابلة بالكامل!' : 'Congratulations! You completed the full interview!', null); return; }
    var q = IV_QS[ivIdx];
    var qEl = document.getElementById('iv-q');
    if (qEl) qEl.innerHTML = (isAR ? q.qAr : q.q) + '<div style="font-family:var(--fa);font-size:.86rem;color:var(--txt2);direction:rtl;margin-top:8px">' + (isAR ? q.q : q.qAr) + '</div>';
    var ans = document.getElementById('iv-ans'); if (ans) ans.value = '';
    var fb = document.getElementById('iv-fb'); if (fb) fb.classList.remove('on');
    var pct = ((ivIdx + 1) / IV_QS.length) * 100;
    var pf = document.getElementById('iv-pfill'); if (pf) pf.style.width = pct + '%';
    var pl = document.getElementById('iv-plbl'); if (pl) pl.textContent = 'Q ' + (ivIdx + 1) + ' of ' + IV_QS.length;
    var bot = document.getElementById('iv-bot'); var lbl = document.getElementById('iv-tlbl');
    if (bot) bot.classList.add('talk'); if (lbl) lbl.classList.add('on');
    speak(isAR ? q.qAr : q.q, function () { if (bot) bot.classList.remove('talk'); if (lbl) lbl.classList.remove('on'); });
}

function submitIV() {
    var ans = document.getElementById('iv-ans');
    if (!ans || !ans.value.trim()) { showToast('💬 ' + (isAR ? 'من فضلك أجب أولاً!' : 'Please answer first!')); return; }
    var fbArr = IV_FB[ivIdx] || IV_FB[0];
    var msg = fbArr[Math.floor(Math.random() * fbArr.length)];
    var stars = document.getElementById('iv-stars'); if (stars) stars.textContent = '⭐'.repeat(Math.floor(Math.random() * 2) + 4);
    var fbt = document.getElementById('iv-fb-txt'); if (fbt) fbt.textContent = msg;
    var fb = document.getElementById('iv-fb'); if (fb) fb.classList.add('on');
    speak(msg, null); ivIdx++;
    showToast('✅ ' + (isAR ? 'تم إرسال الإجابة!' : 'Answer submitted!')); updateStat('ivs', 1); updateStat('pts', 30);
    addAct('🎤', 'IV Answer', 'Q' + ivIdx, '+30 pts');
}

function toggleIVRec() {
    var btn = document.getElementById('iv-rec');
    if (ivRecAct) {
        try { ivRec.stop(); } catch (e) { }
        ivRecAct = false;
        if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 ' + (isAR ? 'ابدأ الإجابة' : 'Start Answer'); }
        return;
    }
    if (!SR) { showNotif('❌ Voice not supported. Use Chrome.'); return; }
    ivRec = new SR(); ivRec.lang = isAR ? 'ar-SA' : 'en-US'; ivRec.continuous = true; ivRec.interimResults = true;
    ivRec.start(); ivRecAct = true;
    if (btn) { btn.classList.add('rec'); btn.textContent = '🛑 ' + (isAR ? 'إيقاف الاستماع' : 'Stop Listening'); }
    showToast('🎤 ' + (isAR ? 'جاري الاستماع…' : 'Listening…'));
    ivRec.onresult = function (e) { var fin = ''; for (var i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) fin += e.results[i][0].transcript; var ta = document.getElementById('iv-ans'); if (fin && ta) ta.value = (ta.value + ' ' + fin).trim(); };
    ivRec.onerror = function (e) { ivRecAct = false; if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 Start Answer'; } showNotif('❌ Mic error: ' + e.error); };
    ivRec.onend = function () { if (ivRecAct) { ivRecAct = false; if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 Start Answer'; } } };
}

// ── DASHBOARD PAGE ────────────────────────────────────────────────────
var SP = [
    { n: 'sk_comm', v: 65, c: '#FF6B35' }, { n: 'sk_org', v: 72, c: '#1DB9A8' },
    { n: 'sk_team', v: 78, c: '#10B981' }, { n: 'sk_prob', v: 55, c: '#7C3AED' }, { n: 'sk_punc', v: 82, c: '#FFB830' }
];

function updateStat(k, n) { dStats[k] = (dStats[k] || 0) + n; try { localStorage.setItem('bp_stats', JSON.stringify(dStats)); } catch (e) { } }
function addAct(ico, name, detail, pts) { actLog.unshift({ ico: ico, name: name, detail: detail, pts: pts, time: new Date().toLocaleTimeString() }); if (actLog.length > 12) actLog.pop(); }

function buildDashPage() {
    try { dStats = JSON.parse(localStorage.getItem('bp_stats') || '{}'); } catch (e) { }
    var dpName = t('dash_member');
    try { var cv2 = JSON.parse(localStorage.getItem('bp_cv') || '{}'); if (cv2.name) dpName = cv2.name; } catch (e) { }
    var pg = document.getElementById('page-dashboard');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')" aria-label="Back">←</button><h2>📊 ' + t('dash_title') + '</h2></div>' +
        '<div class="dashwrap"><div class="dashgrid">' +
        '<div style="display:flex;flex-direction:column;gap:16px">' +
        '<div class="card dp-card"><div class="dp-ava">😊</div><div class="dp-name">' + dpName + '</div><div class="dp-tag">' + t('dash_member') + ' ⭐</div>' +
        '<div class="badges" style="margin-top:12px"><div class="bdg" style="background:rgba(255,107,53,.15)">🏆</div><div class="bdg" style="background:rgba(29,185,168,.15)">📄</div><div class="bdg" style="background:rgba(16,185,129,.15)">🎤</div><div class="bdg" style="background:rgba(124,58,237,.15)">🧩</div><div class="bdg" style="background:rgba(255,184,48,.15)">📚</div></div></div>' +
        '<div class="card" style="padding:18px"><div style="font-size:.82rem;font-weight:900;margin-bottom:10px">🗺️ ' + t('dash_journey') + '</div>' +
        [[t('j_step_1'), 'tests'], [t('j_step_4'), 'cvs'], [t('j_step_6'), 'ivs']].map(function (s) { return '<div style="display:flex;align-items:center;gap:9px;padding:7px 0;border-bottom:1px solid var(--bdr);font-size:.79rem;font-weight:700"><span>' + (dStats[s[1]] > 0 ? '✅' : '⭕') + '</span><span>' + s[0] + '</span></div>'; }).join('') + '</div></div>' +
        '<div style="display:flex;flex-direction:column;gap:18px">' +
        '<div class="stats-row">' +
        [['📋', 'tests', t('dash_tests')], ['📄', 'cvs', t('dash_cvs')], ['🎤', 'ivs', t('dash_ivs')], ['⭐', 'pts', t('dash_points')]].map(function (s) {
            return '<div class="card scard"><div class="sc-ico">' + s[0] + '</div><div class="sc-val">' + (dStats[s[1]] || 0) + '</div><div class="sc-lbl">' + s[2] + '</div></div>';
        }).join('') + '</div>' +
        '<div class="card dc"><h3>📋 ' + t('dash_activity') + '</h3>' + (actLog.length ? actLog.map(function (a) {
            return '<div class="act-item"><div class="ai-ico">' + a.ico + '</div><div class="ai-info"><strong>' + a.name + '</strong><span>' + a.detail + ' · ' + a.time + '</span></div><div class="ai-pts">' + a.pts + '</div></div>';
        }).join('') : '<p style="font-size:.82rem;color:var(--txt2)">' + t('dash_no_act') + '</p>') + '</div>' +
        '<div class="card dc"><h3>📈 ' + t('dash_skills') + '</h3>' + SP.map(function (s) {
            return '<div class="skp"><div class="skp-top"><span>' + t(s.n) + '</span><span>' + s.v + '%</span></div><div class="skp-bar"><div class="skp-fill" style="width:' + s.v + '%;background:' + s.c + '"></div></div></div>';
        }).join('') + '</div></div></div></div>';
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────
function buildAboutPage() {
    var pg = document.getElementById('page-about');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')" aria-label="Back">←</button><h2>👥 ' + (isAR ? 'عن فرص متساوية' : 'About Equal Opportunities · عن فرص متساوية') + '</h2></div>' +
        '<div style="padding:32px;max-width:1100px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,var(--sun),var(--gold));border-radius:var(--rlg);padding:44px;text-align:center;color:#fff;margin-bottom:40px">' +
        '<div style="font-size:3.5rem;margin-bottom:12px">🌟</div>' +
        '<div style="font-family:var(--fd);font-size:2.6rem;font-weight:900;margin-bottom:5px">Equal Opportunities</div>' +
        '<p style="opacity:.9;max-width:500px;margin:0 auto;line-height:1.7;font-size:.9rem">' + (isAR ? 'منصة مهنية بالذكاء الاصطناعي مصممة بحب لأشخاص متلازمة داون. تمكين كل شخص من إيجاد مساره المهني المثالي.' : 'An AI-powered career platform designed with love for people with Down Syndrome. Empowering every person to find their perfect career path.') + '</p></div>' +
        '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:18px;margin-bottom:44px">' +
        [['📋', 'Take the Test', 'Answer 5 questions to find your perfect job!'], ['📄', 'Build Your CV', 'Use voice or typing to create your professional CV.'], ['🧩', 'Play Games', 'Fun games that build memory, focus, and maths skills!'], ['🎤', 'Practice Interview', 'Talk to our AI coach and get feedback on your answers!']].map(function (item) {
            return '<div style="background:var(--surf);border:2px solid var(--bdr);border-radius:var(--r);padding:26px 18px;text-align:center"><div style="font-size:2rem;margin-bottom:10px">' + item[0] + '</div><h3 style="font-size:.88rem;font-weight:800;margin-bottom:7px">' + item[1] + '</h3><p style="font-size:.76rem;color:var(--txt2);line-height:1.5">' + item[2] + '</p></div>';
        }).join('') + '</div>' +
        '<div class="stag">' + (isAR ? 'فريقنا' : 'Our Team · فريقنا') + '</div>' +
        '<h2 class="stitle" style="margin-bottom:24px">' + (isAR ? 'الفريق خلف فرص متساوية 💛' : 'The People Behind Equal Opportunities 💛') + '</h2>' +
        '<div class="team-grid">' + TEAM.map(function (tm) {
            return '<div class="card tmc">' +
                '<div class="tm-ava">' + `<img src="${tm.e}" />` + '</div>' +
                '<div class="tm-name">' + tm.n + '</div>' +
                '<div class="tm-role">' + tm.r + '</div>' +
                '<div class="tm-desc">' + tm.desc + '</div>' +
                '<div class="tm-socials">' + '<a class="tm-soc" href="' + (tm.PLink ?? "") + '" target="_blank">🔗</a>' + ' <span class="tm-soc tm-img">📷</span><span class="tm-soc">✉️</span></div></div>';
        }).join('') + '</div></div>';

    tmImgClicked();
}

// ── LANGUAGE TOGGLE ───────────────────────────────────────────────────
var LANG_LABELS = { en: '🌐 English', ar: '🌐 العربية', fr: '🌐 Français', es: '🌐 Español' };

function setLang(langCode) {
    if (!langCode || !LANG_LABELS[langCode]) return;
    currentLang = langCode;
    isAR = (currentLang === 'ar');

    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('data-lang', currentLang);
    document.documentElement.setAttribute('dir', isAR ? 'rtl' : 'ltr');
    try { localStorage.setItem('bp_lang', currentLang); } catch (e) { }

    // Sync dropdowns
    var lb = document.getElementById('lang-btn'); if (lb) lb.value = currentLang;
    var mmLb = document.getElementById('mm-lang-btn'); if (mmLb) mmLb.value = currentLang;

    // Update all nav text (Desktop + Mobile)
    updateNavText();

    // Update static content in index.html
    updateStaticContent();

    showToast(LANG_LABELS[currentLang]);

    // Re-render current active page (if dynamic)
    var activePage = document.querySelector('.page.act');
    if (activePage) {
        var pageId = activePage.id.replace('page-', '');
        if (pageId !== 'home') {
            showPage(pageId);
        } else {
            // If home, we just updated static content, but might need to refresh lists
            renderHomeLists();
        }
    }
}

function updateStaticContent() {
    // Reading Bar
    var rbTxt = document.getElementById('rb-txt'); if (rbTxt) rbTxt.textContent = t('reading_bar_txt');
    var rbStop = document.getElementById('rb-stop'); if (rbStop) rbStop.textContent = '✕ ' + t('stop_btn').replace('⏹ ', '');

    // Voice Overlay
    var voTitle = document.getElementById('vo-title'); if (voTitle) voTitle.textContent = t('vo_title');
    var voRes = document.getElementById('v-result'); if (voRes) voRes.textContent = t('vo_result');
    var voGuide = document.getElementById('vo-guide-btn'); if (voGuide) voGuide.innerHTML = t('vo_guide_btn');
    var voCan = document.getElementById('vo-cancel-btn'); if (voCan) voCan.innerHTML = t('vo_cancel_btn');

    // Voice Guides Items
    var voCmds = document.getElementById('vo-cmds');
    if (voCmds) {
        voCmds.innerHTML = 
            '<div class="v-cmd-item">🏠 ' + t('cmd_home') + '</div>' +
            '<div class="v-cmd-item">💼 ' + t('cmd_jobs') + '</div>' +
            '<div class="v-cmd-item">📄 ' + t('cmd_cv') + '</div>' +
            '<div class="v-cmd-item">🎤 ' + t('cmd_inter') + '</div>' +
            '<div class="v-cmd-item">🔊 ' + t('cmd_read') + '</div>' +
            '<div class="v-cmd-item">🌙 ' + t('cmd_dark') + '</div>' +
            '<div class="v-cmd-item">🔠 ' + t('cmd_big') + '</div>' +
            '<button class="btn btn-t btn-sm" onclick="stopVoiceCmd()">' + t('cmd_stop') + '</button>';
    }

    // Voice Guide Modal
    var vcgT = document.getElementById('vcg-title'); if (vcgT) vcgT.textContent = t('vcg_title');
    var vcgS = document.getElementById('vcg-subtitle'); if (vcgS) vcgS.textContent = t('vcg_subtitle');
    var vcgD = document.getElementById('vcg-desc'); if (vcgD) vcgD.textContent = t('vcg_desc');
    var vcgH1 = document.getElementById('vcg-h-nav'); if (vcgH1) vcgH1.innerHTML = '🧭 ' + t('vcg_h_nav');
    var vcgH2 = document.getElementById('vcg-h-a11y'); if (vcgH2) vcgH2.innerHTML = '♿ ' + t('vcg_h_a11y');
    var vcgSt = document.getElementById('vcg-start-btn'); if (vcgSt) vcgSt.innerHTML = '🎙️ ' + t('vcg_start_btn');

    // Accessibility Bar
    var abMap = {
        'ab-fplus': 'cmd_big', 'ab-fminus': 'cmd_small', 'ab-theme': 'cmd_dark',
        'ab-contrast': 'cmd_hc', 'ab-read': 'cmd_read', 'ab-stop': 'cmd_stop', 'ab-guide': 'btn_voice_guide'
    };
    Object.keys(abMap).forEach(id => {
        var el = document.getElementById(id);
        if (el) {
            el.setAttribute('title', t(abMap[id]).replace(/"/g, ''));
            el.setAttribute('aria-label', t(abMap[id]).replace(/"/g, ''));
        }
    });

    // Hero Section
    var hb = document.getElementById('hero-badge'); if (hb) hb.textContent = t('hero_badge');
    var ht = document.getElementById('hero-title'); if (ht) ht.innerHTML = t('hero_title');
    var hd = document.getElementById('hero-desc'); if (hd) hd.textContent = t('hero_desc');
    var hbA = document.getElementById('h-btn-assess'); if (hbA) hbA.textContent = t('h_btn_assess');
    var hbV = document.getElementById('h-btn-voice'); if (hbV) hbV.textContent = t('h_btn_voice');
    var hbG = document.getElementById('h-btn-guide'); if (hbG) hbG.textContent = t('h_btn_guide');

    // Hero Stats
    var sU = document.getElementById('s-users'); if (sU) sU.textContent = t('s_users');
    var sC = document.getElementById('s-cvs'); if (sC) sC.textContent = t('s_cvs');
    var sJ = document.getElementById('s-jobs'); if (sJ) sJ.textContent = t('s_jobs');

    // Journey
    var jt = document.getElementById('journey-title'); if (jt) jt.innerHTML = '🗺️ ' + t('journey_title');

    // Toolkit / How it Works / A11y
    var tkSt = document.getElementById('tk-stag'); if (tkSt) tkSt.textContent = t('tk_stag');
    var tkTi = document.getElementById('tk-title'); if (tkTi) tkTi.textContent = t('tk_title');
    var tkDe = document.getElementById('tk-desc'); if (tkDe) tkDe.textContent = t('tk_desc');

    var hwSt = document.getElementById('hw-stag'); if (hwSt) hwSt.textContent = t('hw_stag');
    var hwTi = document.getElementById('hw-title'); if (hwTi) hwTi.textContent = t('hw_title');
    var hwDe = document.getElementById('hw-desc'); if (hwDe) hwDe.textContent = t('hw_desc');

    var aySt = document.getElementById('a11y-stag'); if (aySt) aySt.textContent = t('a11y_stag');
    var ayTi = document.getElementById('a11y-title'); if (ayTi) ayTi.textContent = t('a11y_title');
    var ayDe = document.getElementById('a11y-desc'); if (ayDe) ayDe.textContent = t('a11y_desc');

    // Testimonials
    var tsSt = document.getElementById('testi-stag'); if (tsSt) tsSt.textContent = t('testi_stag');
    var tsTi = document.getElementById('testi-title'); if (tsTi) tsTi.textContent = t('testi_title');

    // CTA
    var ctSt = document.getElementById('cta-stag'); if (ctSt) ctSt.textContent = t('cta_stag');
    var ctTi = document.getElementById('cta-title'); if (ctTi) ctTi.textContent = t('cta_title');
    var ctDe = document.getElementById('cta-desc'); if (ctDe) ctDe.textContent = t('cta_desc');
    var ctBa = document.getElementById('cta-btn-assess'); if (ctBa) ctBa.textContent = t('cta_btn_assess');
    var ctBt = document.getElementById('cta-btn-training'); if (ctBt) ctBt.textContent = t('cta_btn_training');
    var ctBc = document.getElementById('cta-btn-cv'); if (ctBc) ctBc.textContent = t('cta_btn_cv');

    // Footer
    var fc = document.getElementById('footer-copy'); if (fc) fc.textContent = t('footer_copy');
    var fa = document.getElementById('f-about'); if (fa) fa.textContent = t('f_about');
    var fd = document.getElementById('f-dashboard'); if (fd) fd.textContent = t('f_dashboard');

    // AI Coach
    var chi = document.getElementById('coach-hi'); if (chi) chi.textContent = t('coach_hi');
    var ctx = document.getElementById('coach-txt'); if (ctx) ctx.textContent = t('coach_txt');
    var cok = document.getElementById('coach-btn-ok'); if (cok) cok.textContent = t('coach_btn_ok');
    
    // Render the dynamic lists
    renderHomeLists();
}

function renderHomeLists() {
    // 1. Journey Cards
    var jGrid = document.getElementById('jcards-grid');
    if (jGrid) {
        var steps = [
            { id: 'assess', icon: '📋', color: 'rgba(255,107,53,.1)', key: 'j_step_1' },
            { id: 'training', icon: '🏋️', color: 'rgba(16,185,129,.1)', key: 'j_step_2' },
            { id: 'cvlearn', icon: '📖', color: 'rgba(29,185,168,.1)', key: 'j_step_3' },
            { id: 'cvbuild', icon: '📄', color: 'rgba(255,184,48,.1)', key: 'j_step_4' },
            { id: 'interview', icon: '🎤', color: 'rgba(124,58,237,.1)', key: 'j_step_5' }
        ];
        jGrid.innerHTML = steps.map(s => `
            <div class="jcard" onclick="showPage('${s.id}')" role="button" tabindex="0">
                <div class="jcard-ico" style="background:${s.color}">${s.icon}</div>
                <div>
                    <h4>${t(s.key + '_t')}</h4>
                    <p>${t(s.key + '_p')}</p>
                </div>
                <div class="jcard-arr">${isAR ? '←' : '→'}</div>
            </div>
        `).join('');
    }

    // 2. Toolkit
    var tkGrid = document.getElementById('tk-grid');
    if (tkGrid) {
        var feats = [
            { id: 'assess', icon: '📋', color: '#FF6B35', bg: 'rgba(255,107,53,.1)', key: 'tk_feat_1' },
            { id: 'training', icon: '🏋️', color: '#10B981', bg: 'rgba(16,185,129,.1)', key: 'tk_feat_2' },
            { id: 'cvbuild', icon: '📄', color: '#1DB9A8', bg: 'rgba(29,185,168,.1)', key: 'tk_feat_3' },
            { id: 'games', icon: '🧩', color: '#FFB830', bg: 'rgba(255,184,48,.1)', key: 'tk_feat_4' },
            { id: 'learn', icon: '📚', color: '#7C3AED', bg: 'rgba(124,58,237,.1)', key: 'tk_feat_5' },
            { id: 'interview', icon: '🎤', color: '#3B82F6', bg: 'rgba(59,130,246,.1)', key: 'tk_feat_6' }
        ];
        tkGrid.innerHTML = feats.map(f => `
            <div class="feat-card card" style="--ca:${f.color}" onclick="showPage('${f.id}')" role="button" tabindex="0">
                <div class="feat-icon" style="background:${f.bg}">${f.icon}</div>
                <h3>${t(f.key + '_t')}</h3>
                <p>${t(f.key + '_p')}</p>
                <button class="feat-go">${t(f.key + '_b')}</button>
            </div>
        `).join('');
    }

    // 3. How it Works
    var hwGrid = document.getElementById('hw-grid');
    if (hwGrid) {
        hwGrid.innerHTML = [1, 2, 3].map(n => `
            <div class="how-step">
                <div class="how-num">${n}</div>
                <h3 style="font-size:1rem;font-weight:800;margin-bottom:10px">${t('hw_step_' + n + '_t')}</h3>
                <p style="font-size:.83rem;color:var(--txt2);line-height:1.65">${t('hw_step_' + n + '_p')}</p>
            </div>
        `).join('');
    }

    // 4. Accessibility Grid
    var ayGrid = document.getElementById('a11y-grid');
    if (ayGrid) {
        var aIcons = ['🎙️', '🔊', '🔠', '🌙', '🌐', '⌨️', '🖱️', '💡'];
        ayGrid.innerHTML = aIcons.map((ico, idx) => `
            <div class="a11y-card"><span class="a11y-ico">${ico}</span>
                <h3 style="font-size:.9rem;font-weight:800;margin-bottom:6px">${t('a11y_feat_' + (idx + 1) + '_t')}</h3>
                <p style="font-size:.78rem;color:var(--txt2)">${t('a11y_feat_' + (idx + 1) + '_p')}</p>
            </div>
        `).join('');
    }

    // 5. Testimonials
    var tTrack = document.getElementById('ttrack');
    if (tTrack) {
        var avas = ['😊', '👩', '😄', '😃', '👨‍🏫'];
        var colors = ['rgba(255,107,53,.15)', 'rgba(29,185,168,.15)', 'rgba(124,58,237,.15)', 'rgba(16,185,129,.15)', 'rgba(59,130,246,.15)'];
        tTrack.innerHTML = [1, 2, 3, 4, 5].map((n, i) => `
            <div class="tcard">
                <div class="tq">"</div>
                <div class="tstars">⭐⭐⭐⭐⭐</div>
                <p class="ttext">${t('testi_' + n + '_t')}</p>
                <div class="tauth">
                    <div class="tava" style="background:${colors[i]}">${avas[i]}</div>
                    <div>
                        <div class="tname">${t('testi_' + n + '_n')}</div>
                        <div class="trole">${t('testi_' + n + '_r')}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // 6. Voice Guide Grid (Navigation)
    var vcgNav = document.getElementById('vcg-grid-nav');
    if (vcgNav) {
        var vItems = [
            { ico: '🏠', key: 'cmd_home' }, { ico: '📋', key: 'cmd_test' },
            { ico: '🏋️', key: 'cmd_train' }, { ico: '📄', key: 'cmd_cv' },
            { ico: '💼', key: 'cmd_jobs' }, { ico: '🎤', key: 'cmd_inter' },
            { ico: '🧩', key: 'cmd_games' }, { ico: '📚', key: 'cmd_learn' }
        ];
        vcgNav.innerHTML = vItems.map(v => `
            <div class="vcg-item"><span class="ico">${v.ico}</span>
                <div>
                    <div class="cmd">${t(v.key)}</div>
                    <div class="desc">${t(v.key + '_d')}</div>
                </div>
            </div>
        `).join('');
    }

    // 7. Voice Guide Grid (A11y)
    var vcgA11y = document.getElementById('vcg-grid-a11y');
    if (vcgA11y) {
        var aItems = [
            { ico: '🔊', key: 'cmd_read' }, { ico: '⏹', key: 'cmd_stop' },
            { ico: '🌙', key: 'cmd_dark' }, { ico: '◑', key: 'cmd_hc' },
            { ico: '🔠', key: 'cmd_big' }, { ico: '🔡', key: 'cmd_small' }
        ];
        vcgA11y.innerHTML = aItems.map(a => `
            <div class="vcg-item"><span class="ico">${a.ico}</span>
                <div>
                    <div class="cmd">${t(a.key)}</div>
                    <div class="desc">${t(a.key + '_d')}</div>
                </div>
            </div>
        `).join('');
    }

    // 8. CTA Badges
    var ctaBadges = document.getElementById('cta-badges');
    if (ctaBadges) {
        var badgeMap = {
            en: ['🆓 Completely Free', '🔒 Safe & Private', '🌐 Multilingual', '♿ Fully Accessible'],
            ar: ['🆓 مجاني تمامًا', '🔒 آمن وخاص', '🌐 متعدد اللغات', '♿ متاح للجميع'],
            fr: ['🆓 Totalement gratuit', '🔒 Sûr et privé', '🌐 Multilingue', '♿ Entièrement accessible'],
            es: ['🆓 Completamente gratis', '🔒 Seguro y privado', '🌐 Multilingüe', '♿ Totalmente accesible']
        };
        var bTexts = badgeMap[currentLang] || badgeMap.en;
        ctaBadges.innerHTML = bTexts.map(bt => `<div class="cta-badge">${bt}</div>`).join('');
    }
}

function updateNavText() {
    var navMap = {
        'nl-home': 'nav_home', 'nl-assess': 'nav_assess', 'nl-training': 'nav_training',
        'nl-cvlearn': 'nav_cvlearn', 'nl-cvbuild': 'nav_cvbuild', 'nl-games': 'nav_games',
        'nl-learn': 'nav_learn', 'nl-jobs': 'nav_jobs', 'nl-interview': 'nav_interview',
        'nl-dashboard': 'nav_dashboard', 'nl-about': 'nav_about',
        // Mobile menu
        'mm-home': 'nav_home', 'mm-assess': 'nav_assess', 'mm-training': 'nav_training',
        'mm-cvlearn': 'nav_cvlearn', 'mm-cvbuild': 'nav_cvbuild', 'mm-games': 'nav_games',
        'mm-learn': 'nav_learn', 'mm-jobs': 'nav_jobs', 'mm-interview': 'nav_interview',
        'mm-dashboard': 'nav_dashboard', 'mm-about': 'nav_about'
    };
    Object.keys(navMap).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.textContent = t(navMap[id]);
    });

    // Mobile buttons
    var mmLang = document.getElementById('mm-lang-btn'); if (mmLang) mmLang.textContent = t('lang_btn');
    var mmTheme = document.getElementById('mm-theme-btn'); if (mmTheme) mmTheme.innerHTML = '🌙 ' + t('cmd_dark').replace(/"/g, '');
    var mmRead = document.getElementById('mm-read-btn'); if (mmRead) mmRead.innerHTML = '🔊 ' + t('cmd_read').replace(/"/g, '');
    var mmGuide = document.getElementById('mm-guide-btn'); if (mmGuide) mmGuide.innerHTML = '📖 ' + t('btn_voice_guide');
}

// ── THEME / FONT ──────────────────────────────────────────────────────
function changeFontSize(dir) {
    fontStep = Math.max(-2, Math.min(3, fontStep + dir));
    var base = 1 + fontStep * 0.1;
    document.documentElement.style.setProperty('--fs', base + 'rem');
    showToast(dir > 0 ? '🔠 Text bigger' : '🔡 Text smaller');
}

function toggleTheme() {
    var curTheme = document.documentElement.getAttribute('data-theme');
    var newTheme = curTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.removeAttribute('data-contrast');
    var ti = document.getElementById('theme-icon'); if (ti) ti.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    showToast(newTheme === 'dark' ? '🌙 Dark mode on' : '☀️ Light mode on');
}

function toggleContrast() {
    var has = document.documentElement.hasAttribute('data-contrast');
    if (has) document.documentElement.removeAttribute('data-contrast');
    else document.documentElement.setAttribute('data-contrast', 'high');
    showToast(has ? '◑ Normal contrast' : '◑ High contrast on');
}

// ── HAMBURGER MENU ────────────────────────────────────────────────────
function toggleMenu() {
    var h = document.getElementById('hamburger'); var m = document.getElementById('mobile-menu');
    if (!h || !m) return;
    h.classList.toggle('open');
    if (h.classList.contains('open')) { m.style.display = 'flex'; setTimeout(function () { m.classList.add('open'); }, 10); }
    else { m.classList.remove('open'); setTimeout(function () { m.style.display = 'none'; }, 350); }
}

function closeMenu() {
    var h = document.getElementById('hamburger'); var m = document.getElementById('mobile-menu');
    if (!h || !m) return;
    h.classList.remove('open'); m.classList.remove('open');
    setTimeout(function () { m.style.display = 'none'; }, 350);
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────
function testiPrev() {
    var tt = document.getElementById('ttrack'); if (!tt) return;
    tIdx = Math.max(0, tIdx - 1);
    tt.style.transform = 'translateX(-' + (tIdx * 370) + 'px)';
    updateDots();
}

function testiNext() {
    var tt = document.getElementById('ttrack'); if (!tt) return;
    var cards = tt.querySelectorAll('.tcard');
    tIdx = Math.min(cards.length - 1, tIdx + 1);
    tt.style.transform = 'translateX(-' + (tIdx * 370) + 'px)';
    updateDots();
}

function updateDots() {
    var d = document.getElementById('tdots'); if (!d) return;
    d.querySelectorAll('.tdot').forEach(function (dot, i) { dot.classList.toggle('on', i === tIdx); });
}

function initTesti() {
    var tt = document.getElementById('ttrack'); var d = document.getElementById('tdots');
    if (!tt || !d) return;
    var n = tt.querySelectorAll('.tcard').length;
    d.innerHTML = Array.from({ length: n }, function (_, i) {
        return '<div class="tdot ' + (i === 0 ? 'on' : '') + '" onclick="tIdx=' + i + ';document.getElementById(\'ttrack\').style.transform=\'translateX(-\'+(' + i + '*370)+\'px)\';updateDots()"></div>';
    }).join('');
    setInterval(function () {
        var tt2 = document.getElementById('ttrack'); if (!tt2) return;
        var cards2 = tt2.querySelectorAll('.tcard');
        if (tIdx >= cards2.length - 1) tIdx = 0; else tIdx++;
        tt2.style.transform = 'translateX(-' + (tIdx * 370) + 'px)';
        updateDots();
    }, 4800);
}

// ── COUNTERS ──────────────────────────────────────────────────────────
function countUp(id, target) {
    var el = document.getElementById(id); if (!el) return;
    var n = 0, step = Math.ceil(target / 60);
    var iv = setInterval(function () { n = Math.min(n + step, target); el.textContent = n.toLocaleString() + '+'; if (n >= target) clearInterval(iv); }, 22);
}

// ── TOAST / NOTIF ─────────────────────────────────────────────────────
function showToast(msg) {
    var toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg; toast.classList.add('on');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('on'); toastTimer = null; }, 3000);
}

function showNotif(msg) {
    var n = document.getElementById('notif'); if (!n) return;
    n.textContent = msg; n.classList.add('on');
    setTimeout(function () { n.classList.remove('on'); }, 4000);
}

// ── THREE.JS HERO (lightweight – only if device is capable) ──────────
function initHeroThree() {
    // Skip on mobile or low-end devices to save performance
    if (window.innerWidth < 768) return;
    var canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    var W = canvas.offsetWidth || window.innerWidth;
    var H = canvas.offsetHeight || 500;
    canvas.width = W; canvas.height = H;
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false }); // antialias off for perf
    renderer.setSize(W, H);
    renderer.setPixelRatio(1); // Always 1 for performance
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.z = 45;
    // Fewer particles for performance
    var geo = new THREE.BufferGeometry();
    var count = 40; // Reduced from 140
    var pos = new Float32Array(count * 3);
    var vel = new Float32Array(count * 3);
    for (var i = 0; i < count * 3; i += 3) {
        pos[i] = (Math.random() - .5) * 80; pos[i + 1] = (Math.random() - .5) * 50; pos[i + 2] = (Math.random() - .5) * 30;
        vel[i] = (Math.random() - .5) * 0.1; vel[i + 1] = (Math.random() - .5) * 0.06; vel[i + 2] = 0;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var mat = new THREE.PointsMaterial({ color: 0x003049, size: 1.2, transparent: true, opacity: 1 });
    var particles = new THREE.Points(geo, mat);
    scene.add(particles);
    var clock = new THREE.Clock();
    var frameCount = 0;
    function animate() {
        animId = requestAnimationFrame(animate);
        frameCount++;
        // Only update every 2 frames for performance
        if (frameCount % 2 !== 0) { renderer.render(scene, camera); return; }
        var t = clock.getElapsedTime();
        for (var j = 0; j < count * 3; j += 3) {
            pos[j] += vel[j]; pos[j + 1] += vel[j + 1];
            if (Math.abs(pos[j]) > 40) vel[j] *= -1;
            if (Math.abs(pos[j + 1]) > 25) vel[j + 1] *= -1;
        }
        geo.attributes.position.needsUpdate = true;
        particles.rotation.y = t * 0.02;
        renderer.render(scene, camera);
    }
    animate();
    window.addEventListener('resize', function () {
        var nw = canvas.offsetWidth || window.innerWidth; var nh = canvas.offsetHeight || 500;
        camera.aspect = nw / nh; camera.updateProjectionMatrix(); renderer.setSize(nw, nh);
    });
}

// ── GSAP – minimal, only home page entrance ───────────────────────────
function initGSAP() {
    if (typeof gsap === 'undefined') return;
    // Only animate home page elements — no ScrollTrigger complexity
    gsap.fromTo('.hero-badge', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)', delay: 0.2 });
    gsap.fromTo('.hero h1', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.35 });
    gsap.fromTo('.hero p', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.5 });
    gsap.fromTo('.hero-btns', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.65 });
}

// ── INIT ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    // Restore language preference
    try {
        var savedLang = localStorage.getItem('bp_lang');
        if (savedLang && ['en', 'ar', 'fr', 'es'].indexOf(savedLang) !== -1) {
            currentLang = savedLang;
            isAR = (currentLang === 'ar');
        }
    } catch (e) { }

    // Apply language attributes
    var lang = currentLang;
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('dir', isAR ? 'rtl' : 'ltr');
    var lb = document.getElementById('lang-btn'); if (lb) lb.value = currentLang;
    var mmLb = document.getElementById('mm-lang-btn'); if (mmLb) mmLb.value = currentLang;

    // Update all nav and static content
    updateNavText();
    updateStaticContent();

    // Lightweight init — Three.js and GSAP load after main content
    setTimeout(function () {
        if (typeof THREE !== 'undefined') initHeroThree();
        if (typeof gsap !== 'undefined') initGSAP();
    }, 500);

    countUp('c1', 14200);
    countUp('c2', 8900);
    countUp('c3', 3800);
    setTimeout(initTesti, 600);

    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        var h = document.getElementById('hamburger'); var m = document.getElementById('mobile-menu');
        if (h && m && !h.contains(e.target) && !m.contains(e.target) && m.classList.contains('open')) closeMenu();
    });

    // Keyboard accessibility for voice guide modal
    var vcgModal = document.getElementById('vcg-modal');
    if (vcgModal) vcgModal.addEventListener('click', function (e) { if (e.target === this) closeVoiceGuide(); });

    // Keyboard accessibility for lesson modal
    var modalBg = document.getElementById('modal-bg');
    if (modalBg) modalBg.addEventListener('click', function (e) { if (e.target === this) closeModal(); });

    // Escape key closes modals
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeVoiceGuide(); closeModal(); stopVoiceCmd();
        }
    });
});

function tmImgClicked() {

    let tmImg = document.querySelectorAll('.tm-img');

    tmImg.forEach((tm) => {

        tm.addEventListener('click', (e) => {

            let card = e.target.closest('.tmc');

            let image = card.querySelector('.tm-ava img').src;
            let name = card.querySelector('.tm-name').textContent;
            let role = card.querySelector('.tm-role').textContent;
            let desc = card.querySelector('.tm-desc').textContent;

            tmImagePreview(image, name, role, desc);

        });

    });

}

function tmImagePreview(image, name, title, description) {

    let layout = document.getElementById('imgLayout');

    document.getElementById('previewImg').src = image;
    document.getElementById('previewName').textContent = name;
    document.getElementById('previewRole').textContent = title;
    document.getElementById('previewDesc').textContent = description;

    layout.style.display = 'flex';

}

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("close-preview") || e.target.id === "imgLayout") {
        document.getElementById("imgLayout").style.display = "none";
    }

});