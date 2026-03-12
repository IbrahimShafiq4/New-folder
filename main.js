// ╔══════════════════════════════════════════════════════════════════
// FIXED: All variables declared at top level to prevent ReferenceErrors
// ╚══════════════════════════════════════════════════════════════════
// FIX 1: Declare jobVidTimer at top level
var jobVidTimer = null;
var jobVidPlaying = false;
var jobVidIdx = 0;
var cvVidTimer = null;
var cvVidPlaying = false;
var cvVidIdx = 0;

// DATA
const JOBS_DATA = [
    {
        id: 'store', icon: '🛒', name: 'Store Helper', nameAr: 'مساعد متجر', color: '#FF6B35',
        desc: 'Helps customers find products, organises shelves, and keeps the store tidy.',
        descAr: 'يساعد العملاء في إيجاد المنتجات وينظم الرفوف.',
        questions: [
            { q: 'Do you enjoy helping people?', qAr: 'هل تستمتع بمساعدة الناس؟', opts: ['Yes, I love it! 😊', 'Sometimes', 'Not really'], scores: [3, 2, 1] },
            { q: 'Can you count items and stay organised?', qAr: 'هل يمكنك عد الأشياء والبقاء منظماً؟', opts: ['Yes, very organised!', 'I can try', 'I find it hard'], scores: [3, 2, 1] },
            { q: 'Do you like working with people?', qAr: 'هل تحب العمل مع الآخرين؟', opts: ['I love teamwork! 🤝', 'Sometimes', 'I prefer alone'], scores: [3, 2, 1] },
            { q: 'Can you stand for most of the day?', qAr: 'هل يمكنك الوقوف معظم اليوم؟', opts: ['Yes, no problem!', 'With breaks', 'That is hard'], scores: [3, 2, 1] },
            { q: 'Do you like keeping places tidy?', qAr: 'هل تحب إبقاء الأماكن نظيفة؟', opts: ['Yes! I love tidying! 🧹', 'Sometimes', 'Not really'], scores: [3, 2, 1] },
        ]
    },
    {
        id: 'cafe', icon: '☕', name: 'Café Assistant', nameAr: 'مساعد مقهى', color: '#1DB9A8',
        desc: 'Serves drinks and food, keeps the café clean, and makes every customer feel welcome.',
        descAr: 'يخدم المشروبات والطعام ويحافظ على نظافة المقهى.',
        questions: [
            { q: 'Do you enjoy talking to people?', qAr: 'هل تستمتع بالتحدث مع الناس؟', opts: ['I love it! 😄', 'Sometimes', 'I prefer quiet tasks'], scores: [3, 2, 1] },
            { q: 'Can you carry trays and move quickly?', qAr: 'هل يمكنك حمل الصواني والتحرك بسرعة؟', opts: ['Yes, easily!', 'With practice', 'Sounds difficult'], scores: [3, 2, 1] },
            { q: 'Do you like busy, lively places?', qAr: 'هل تحب الأماكن المزدحمة والحيوية؟', opts: ['Love the energy! ⚡', 'I can manage', 'I prefer quiet'], scores: [3, 2, 1] },
            { q: 'Can you remember simple orders?', qAr: 'هل يمكنك تذكر الطلبات البسيطة؟', opts: ['Good memory!', 'I write them', 'That is hard'], scores: [3, 2, 1] },
            { q: 'Do you care about making people welcome?', qAr: 'هل تهتم بجعل الناس يشعرون بالترحيب؟', opts: ['Always! 💝', 'Most times', 'Not really'], scores: [3, 2, 1] },
        ]
    },
    {
        id: 'library', icon: '📚', name: 'Library Assistant', nameAr: 'مساعد مكتبة', color: '#7C3AED',
        desc: 'Organises and sorts books, helps visitors find materials, and keeps the library peaceful.',
        descAr: 'ينظم الكتب ويساعد الزوار في إيجاد ما يبحثون عنه.',
        questions: [
            { q: 'Do you enjoy organising and sorting?', qAr: 'هل تستمتع بالتنظيم والترتيب؟', opts: ['Love sorting! 📂', 'Sometimes', 'Not really'], scores: [3, 2, 1] },
            { q: 'Can you work in a quiet environment?', qAr: 'هل يمكنك العمل في بيئة هادئة؟', opts: ['Love quiet! 🤫', 'Can manage', 'Prefer busy'], scores: [3, 2, 1] },
            { q: 'Do you like helping people find information?', qAr: 'هل تحب مساعدة الناس في العثور على معلومات؟', opts: ['Yes, always!', 'Sometimes', 'Not really'], scores: [3, 2, 1] },
            { q: 'Are you careful and detail-oriented?', qAr: 'هل أنت دقيق ومنتبه للتفاصيل؟', opts: ['Very careful! 🎯', 'Mostly yes', 'I miss things'], scores: [3, 2, 1] },
            { q: 'Do you enjoy being around books?', qAr: 'هل تستمتع بالتواجد مع الكتب؟', opts: ['Love books! 📖', 'They are okay', 'Not really'], scores: [3, 2, 1] },
        ]
    },
    {
        id: 'garden', icon: '🌿', name: 'Garden Helper', nameAr: 'مساعد حديقة', color: '#10B981',
        desc: 'Plants flowers, waters plants, keeps gardens beautiful. A peaceful outdoor job!',
        descAr: 'يزرع الزهور ويسقي النباتات ويحافظ على جمال الحدائق.',
        questions: [
            { q: 'Do you enjoy working outdoors?', qAr: 'هل تستمتع بالعمل في الهواء الطلق؟', opts: ['Love being outside! 🌞', 'Sometimes', 'Prefer indoors'], scores: [3, 2, 1] },
            { q: 'Do you like plants and nature?', qAr: 'هل تحب النباتات والطبيعة؟', opts: ['Nature is beautiful! 🌸', 'A little', 'Not really'], scores: [3, 2, 1] },
            { q: 'Can you do physical tasks like digging?', qAr: 'هل يمكنك القيام بمهام جسدية كالحفر؟', opts: ['Yes, I am strong! 💪', 'With breaks', 'Too hard'], scores: [3, 2, 1] },
            { q: 'Do you enjoy quiet, peaceful work?', qAr: 'هل تستمتع بالعمل الهادئ والسلمي؟', opts: ['Love calm work!', 'Sometimes', 'Prefer busy'], scores: [3, 2, 1] },
            { q: 'Can you follow a daily routine?', qAr: 'هل يمكنك اتباع روتين يومي؟', opts: ['Routines help me! ⏰', 'Usually yes', 'Find routines hard'], scores: [3, 2, 1] },
        ]
    },
    {
        id: 'office', icon: '🏢', name: 'Office Helper', nameAr: 'مساعد مكتب', color: '#3B82F6',
        desc: 'Organises documents, delivers messages, helps with filing. An indoor professional role.',
        descAr: 'ينظم المستندات ويوصل الرسائل ويساعد في الأرشفة.',
        questions: [
            { q: 'Do you enjoy indoor desk-based work?', qAr: 'هل تستمتع بالعمل المكتبي الداخلي؟', opts: ['Offices are great! 💼', 'Sometimes', 'Prefer outdoor'], scores: [3, 2, 1] },
            { q: 'Can you organise papers carefully?', qAr: 'هل يمكنك تنظيم الأوراق بعناية؟', opts: ['Very carefully!', 'With some help', 'Sounds hard'], scores: [3, 2, 1] },
            { q: 'Do you like following clear rules?', qAr: 'هل تحب اتباع القواعد الواضحة؟', opts: ['Love clear rules!', 'Usually yes', 'Prefer freedom'], scores: [3, 2, 1] },
            { q: 'Can you use a computer for basic tasks?', qAr: 'هل يمكنك استخدام الكمبيوتر للمهام الأساسية؟', opts: ['Yes I can! 💻', 'With training', 'Not yet'], scores: [3, 2, 1] },
            { q: 'Are you polite and professional?', qAr: 'هل أنت مؤدب واحترافي؟', opts: ['Always! 😊', 'Usually', 'Not always'], scores: [3, 2, 1] },
        ]
    },
];

const JOBS_LISTINGS = [
    { id: 1, title: 'Store Helper', company: 'Al-Amal Supermarket', icon: '🛒', type: 'Retail', location: 'Cairo', match: 95, desc: 'Help customers and organise shelves in a welcoming inclusive team.', tags: ['Retail', 'No Experience', 'Full Time'] },
    { id: 2, title: 'Café Assistant', company: 'Sunrise Café', icon: '☕', type: 'Food & Beverage', location: 'Cairo', match: 90, desc: 'Serve drinks and snacks, greet customers, and keep the café tidy.', tags: ['Food', 'Part Time', 'Friendly Team'] },
    { id: 3, title: 'Library Assistant', company: 'City Public Library', icon: '📚', type: 'Education', location: 'Alexandria', match: 85, desc: 'Sort books, help visitors find materials, and maintain the library.', tags: ['Education', 'Quiet', 'Structured'] },
    { id: 4, title: 'Garden Helper', company: 'Green Park', icon: '🌿', type: 'Outdoors', location: 'Giza', match: 88, desc: 'Water plants, plant flowers, and keep the garden beautiful.', tags: ['Outdoor', 'Active', 'Creative'] },
    { id: 5, title: 'Office Helper', company: 'Bright Offices', icon: '🏢', type: 'Office', location: 'Cairo', match: 80, desc: 'Organise documents, assist with copying, and support the team.', tags: ['Office', 'Indoor', 'Professional'] },
    { id: 6, title: 'Bakery Helper', company: 'Golden Bakery', icon: '🍞', type: 'Food & Beverage', location: 'Cairo', match: 82, desc: 'Help bake and package bread, organise shelves, and serve customers.', tags: ['Food', 'Active', 'Morning Shift'] },
    { id: 7, title: 'Recycling Sorter', company: 'EcoGreen Centre', icon: '♻️', type: 'Environment', location: 'Giza', match: 78, desc: 'Sort recyclable materials by type and help run the recycling station.', tags: ['Environmental', 'Active', 'Routine'] },
    { id: 8, title: 'Art Studio Helper', company: 'Creative Hands Studio', icon: '🎨', type: 'Creative', location: 'Alexandria', match: 86, desc: 'Help set up art materials, clean brushes, and assist art teachers.', tags: ['Creative', 'Art', 'Part Time'] },
    { id: 9, title: 'Animal Care Helper', company: 'Happy Paws Centre', icon: '🐾', type: 'Animal Care', location: 'Cairo', match: 84, desc: 'Feed and care for animals, clean enclosures, and welcome visitors.', tags: ['Animals', 'Active', 'Rewarding'] },
];

const TOPICS = [
    {
        id: 'intro', icon: '👋', title: 'How to Introduce Yourself', time: '10 min', color: '#FF6B35',
        content: [
            { type: 'text', en: 'Introducing yourself is the first step in any new workplace. A good introduction helps people remember you!', ar: 'تقديم نفسك هو الخطوة الأولى في أي مكان عمل جديد.' },
            { type: 'tip', en: '💡 Keep it short: Your name, what you enjoy, and one fun fact!', ar: '💡 اجعلها قصيرة: اسمك وما تستمتع به وحقيقة ممتعة!' },
            { type: 'example', en: 'Example: "Hi! My name is Ahmed. I love gardening and I\'m excited to join your team!"', ar: 'مثال: "مرحباً! اسمي أحمد. أحب البستنة وأنا متحمس للانضمام!"' },
            { type: 'quiz', q: 'What should you say first?', qAr: 'ماذا تقول أولاً؟', opts: ['Your name', 'Your favourite food', 'Your age'], answer: 0 },
        ]
    },
    {
        id: 'interview', icon: '🎤', title: 'Preparing for a Job Interview', time: '15 min', color: '#1DB9A8',
        content: [
            { type: 'text', en: 'A job interview is when an employer asks you questions to see if you are right for the job. Being prepared makes you confident!', ar: 'مقابلة العمل هي عندما يطرح صاحب العمل عليك أسئلة.' },
            { type: 'tip', en: '💡 Before the interview: know the company name, arrive 10 minutes early, and smile!', ar: '💡 قبل المقابلة: اعرف اسم الشركة، احضر قبل 10 دقائق، وابتسم!' },
            { type: 'example', en: '"I am very excited about this job. I am hardworking and I love helping people!"', ar: '"أنا متحمس جداً لهذه الوظيفة. أنا مجتهد وأحب مساعدة الناس!"' },
            { type: 'quiz', q: 'How early should you arrive?', qAr: 'كم مبكراً يجب أن تصل؟', opts: ['5 minutes late', 'Exactly on time', '10 minutes early'], answer: 2 },
        ]
    },
    {
        id: 'comms', icon: '🗣️', title: 'Communicating with Coworkers', time: '12 min', color: '#7C3AED',
        content: [
            { type: 'text', en: 'Good communication means being clear, kind, and respectful. It helps everyone work together happily!', ar: 'التواصل الجيد يعني الوضوح واللطف والاحترام.' },
            { type: 'tip', en: '💡 Always say please and thank you! And listen carefully when others speak.', ar: '💡 قل دائماً من فضلك وشكراً!' },
            { type: 'example', en: '"Excuse me, could you help me with this task please?"', ar: '"عذراً، هل يمكنك مساعدتي في هذه المهمة من فضلك؟"' },
            { type: 'quiz', q: 'What should you do when a coworker is talking?', qAr: 'ماذا تفعل عندما يتحدث زميل؟', opts: ['Look at your phone', 'Listen carefully', 'Walk away'], answer: 1 },
        ]
    },
    {
        id: 'behavior', icon: '🤝', title: 'Workplace Behaviour', time: '10 min', color: '#10B981',
        content: [
            { type: 'text', en: 'Good workplace behaviour means being respectful, reliable, and friendly. Your actions affect the whole team!', ar: 'السلوك الجيد في مكان العمل يعني الاحترام والموثوقية.' },
            { type: 'tip', en: '💡 Always tell your manager if you will be late. Keep your work area tidy.', ar: '💡 أخبر مديرك دائماً إذا كنت ستتأخر.' },
            { type: 'example', en: 'Good behaviour: arriving on time, completing tasks, saying good morning to your team!', ar: 'السلوك الجيد: الحضور في الوقت وإتمام المهام وقول صباح الخير!' },
            { type: 'quiz', q: 'What should you do if you will be late?', qAr: 'ماذا تفعل إذا كنت ستتأخر؟', opts: ['Say nothing', 'Tell your manager', 'Ask a friend'], answer: 1 },
        ]
    },
    {
        id: 'time', icon: '⏰', title: 'Time Management', time: '12 min', color: '#FFB830',
        content: [
            { type: 'text', en: 'Managing your time means doing the right tasks at the right moment. It helps you feel calm and in control!', ar: 'إدارة وقتك تعني القيام بالمهام الصحيحة في الوقت المناسب.' },
            { type: 'tip', en: '💡 Use an alarm clock! Write a daily to-do list the night before work.', ar: '💡 استخدم المنبه! اكتب قائمة مهام يومية في الليلة السابقة.' },
            { type: 'example', en: 'Morning routine: wake up, get dressed, eat breakfast, and leave on time!', ar: 'روتين صباحي: استيقظ، والبس، وتناول الإفطار، واغادر في الوقت.' },
            { type: 'quiz', q: 'When to plan tomorrow\'s tasks?', qAr: 'متى تخطط لمهام الغد؟', opts: ['During work', 'The night before', 'On the way'], answer: 1 },
        ]
    },
    {
        id: 'computer', icon: '💻', title: 'Basic Computer Skills', time: '15 min', color: '#3B82F6',
        content: [
            { type: 'text', en: 'Basic computer skills are very helpful in many jobs. Learning to type, use email, and open files is a great start!', ar: 'مهارات الكمبيوتر الأساسية مفيدة جداً في كثير من الوظائف.' },
            { type: 'tip', en: '💡 Practice typing your name every day. Start with ASDF for your left hand!', ar: '💡 تدرب على كتابة اسمك كل يوم.' },
            { type: 'example', en: 'Key skills: turning on/off computer, typing, opening browser, sending emails.', ar: 'المهارات الرئيسية: تشغيل الكمبيوتر والكتابة وفتح المتصفح وإرسال البريد.' },
            { type: 'quiz', q: 'What is a keyboard used for?', qAr: 'ما استخدام لوحة المفاتيح؟', opts: ['To type letters', 'To take photos', 'To print'], answer: 0 },
        ]
    },
    {
        id: 'customer', icon: '🛍️', title: 'Customer Service Basics', time: '10 min', color: '#F43F5E',
        content: [
            { type: 'text', en: 'Customer service is about making customers feel happy and valued. Your smile makes a huge difference!', ar: 'خدمة العملاء تتعلق بجعل العملاء يشعرون بالسعادة.' },
            { type: 'tip', en: '💡 Always greet customers with a smile. If unsure, say "Let me find out for you!"', ar: '💡 دائماً رحب بالعملاء بابتسامة.' },
            { type: 'example', en: '"Welcome! How can I help you today?" is a perfect greeting.', ar: '"مرحباً! كيف يمكنني مساعدتك اليوم؟"' },
            { type: 'quiz', q: 'Most important in customer service?', qAr: 'أهم شيء في خدمة العملاء؟', opts: ['Selling quickly', 'Making customer happy', 'Working fast'], answer: 1 },
        ]
    },
];

const CV_FIELDS = [
    { key: 'name', en: 'What is your full name?', ar: 'ما اسمك الكامل؟', hint: 'e.g. Ahmed Mohammed Ali', type: 'text' },
    { key: 'role', en: 'What job do you want?', ar: 'ما الوظيفة التي تريدها؟', hint: 'e.g. Store Helper, Café Assistant', type: 'text' },
    { key: 'email', en: 'Your email address:', ar: 'عنوان بريدك الإلكتروني:', hint: 'e.g. ahmed@gmail.com', type: 'email' },
    { key: 'phone', en: 'Your phone number:', ar: 'رقم هاتفك:', hint: 'e.g. +20 100 000 0000', type: 'text' },
    { key: 'loc', en: 'Where do you live?', ar: 'أين تسكن؟', hint: 'e.g. Cairo, Egypt', type: 'text' },
    { key: 'summary', en: 'Write a short professional summary:', ar: 'اكتب ملخصاً احترافياً قصيراً:', hint: '2-3 sentences about your strengths and goals', type: 'textarea' },
    { key: 'exp', en: 'Work experience:', ar: 'خبرتك العملية:', hint: 'Any jobs, volunteering, or school activities.', type: 'textarea' },
    { key: 'edu', en: 'Your education:', ar: 'تعليمك:', hint: 'School name, year graduated, and achievements', type: 'textarea' },
    { key: 'cert', en: 'Any certifications or courses?', ar: 'أي شهادات أو دورات؟', hint: 'e.g. First Aid, computer course', type: 'text' },
    { key: 'skills', en: 'Your skills:', ar: 'مهاراتك:', hint: 'Click all that apply!', type: 'skills' },
    { key: 'hobbies', en: 'Hobbies and interests:', ar: 'هواياتك واهتماماتك:', hint: 'e.g. football, art, reading', type: 'textarea' },
];

const SKILLS_LIST = ['Friendly & polite', 'Good listener', 'Team player', 'Organised', 'Punctual', 'Creative', 'Good memory', 'Computer basics', 'Counting & maths', 'Customer service', 'Physical work', 'Drawing & art', 'Music', 'Cooking', 'Tidying & cleaning', 'Problem solving', 'Fast learner'];

const CV_SLIDES = [
    { c: '📄', en: "Welcome! Let's learn how to build an ATS-ready CV step by step!", ar: 'مرحباً! لنتعلم كيف نبني سيرة ذاتية!' },
    { c: '🤖', en: 'ATS = Applicant Tracking System. It reads your CV before a real person!', ar: 'ATS = نظام تتبع المتقدمين. يقرأ سيرتك الذاتية قبل الإنسان!' },
    { c: '👤', en: 'Section 1: Your Name, Email, Phone, and Location — all at the TOP.', ar: 'القسم 1: اسمك والبريد ورقم الهاتف والموقع — كلها في الأعلى.' },
    { c: '✍️', en: 'Section 2: Professional Summary — 2-3 sentences about your strengths.', ar: 'القسم 2: الملخص الاحترافي — 2-3 جمل عن نقاط قوتك.' },
    { c: '💼', en: 'Section 3: Work Experience — even small jobs and volunteering count!', ar: 'القسم 3: الخبرة العملية — حتى الأعمال الصغيرة والتطوع تهم!' },
    { c: '🎓', en: 'Section 4: Education — school name and graduation year.', ar: 'القسم 4: التعليم — اسم المدرسة وسنة التخرج.' },
    { c: '🏆', en: 'Section 5: Certifications — any courses, awards, or training.', ar: 'القسم 5: الشهادات — أي دورات أو جوائز.' },
    { c: '🧩', en: 'Section 6: Skills — teamwork, customer service, computer basics. Use keywords!', ar: 'القسم 6: المهارات — العمل الجماعي وخدمة العملاء.' },
    { c: '✅', en: 'Use simple fonts and clear headings. No photos — ATS cannot read them!', ar: 'استخدم خطوطاً بسيطة وعناوين واضحة.' },
    { c: '🎉', en: "Amazing! Now you know how to build an ATS CV. Let's build yours!", ar: 'رائع! الآن تعرف كيف تبني سيرة ذاتية. لنبنِ سيرتك!' },
];

const IV_QS = [
    { q: 'Tell me about yourself. What do you like and what are you good at?', qAr: 'أخبرني عن نفسك. ماذا تحب وما الذي تجيده؟' },
    { q: 'Why do you want this job? What excites you about it?', qAr: 'لماذا تريد هذه الوظيفة؟' },
    { q: 'What is your biggest strength? Can you give me an example?', qAr: 'ما هي أكبر نقطة قوة لديك؟' },
    { q: 'Have you ever worked with a team? How did that go?', qAr: 'هل عملت يوماً مع فريق؟' },
    { q: 'What do you do when something is difficult at work?', qAr: 'ماذا تفعل عندما تواجه صعوبة في العمل؟' },
    { q: 'Can you tell me about a time you helped someone?', qAr: 'هل يمكنك إخباري عن وقت ساعدت فيه شخصاً؟' },
    { q: 'How do you make sure you arrive on time every day?', qAr: 'كيف تضمن الوصول في الوقت المحدد كل يوم؟' },
    { q: 'Do you have any questions for me?', qAr: 'هل لديك أي أسئلة تود طرحها؟' },
];

const IV_FB = [
    ['Amazing start! You showed real confidence!', 'Great! Employers love hearing your personality!', 'Excellent! You introduced yourself clearly!'],
    ['Brilliant! Genuine interest impresses employers!', 'Great! Your enthusiasm comes through!', 'Passion is the most important ingredient!'],
    ['Perfect! Knowing your strengths is a superpower!', 'Well done! A specific example is very professional!', 'Outstanding! Examples make your answer memorable!'],
    ['Wonderful! Teamwork is a top valued skill!', 'Good! You showed you cooperate well!', 'You sound like a great team player!'],
    ['Great! Staying calm under pressure is valuable!', 'Good! Problem-solving will serve you well!', 'Amazing! You showed resilience and positivity!'],
    ['How kind! Empathy is what employers love!', 'Great! You showed care for others!', 'A caring colleague makes work better!'],
    ['Reliability is SO important! Punctuality matters!', 'Great! Being on time is a powerful habit!', 'Preparation shows you are serious!'],
    ['Asking questions shows curiosity! Employers love that!', 'Questions show you care about doing well!', 'Curiosity makes you stand out!'],
];

const TEAM = [
    { e: '👨‍💻', n: 'Ahmad Yasser', r: 'Frontend Developer – Angular', desc: 'Led the development of BrightPath, building all Angular components and ensuring the platform is fast and accessible.' },
    { e: '👩‍💼', n: 'Amany Ibrahim', r: 'Project Manager', desc: 'Coordinated the team and kept the project on track, ensuring every feature met user needs.' },
    { e: '👨‍🎨', n: 'Bessan Ahmad', r: 'UI/UX Designer', desc: 'Designed the visual language of BrightPath, creating a warm, clear, and accessible interface.' },
    { e: '👩‍🔬', n: 'Habiba Elsayed', r: 'Content Specialist', desc: 'Wrote all platform content in English and Arabic, ensuring clarity and inclusivity throughout.' },
    { e: '👩‍💻', n: 'Nourhan Ahmad', r: 'Backend Developer', desc: 'Built the data systems and APIs that power the CV builder and job matching features.' },
    { e: '👩‍🎤', n: 'Nourhan Ayman', r: 'Voice & Audio Lead', desc: 'Designed and implemented the voice navigation system and text-to-speech features.' },
    { e: '👩‍🎨', n: 'Nera Ayman', r: 'Graphic Designer', desc: 'Created all icons, illustrations, and visual assets used throughout the platform.' },
    { e: '👩‍🏫', n: 'Mariam Ehab', r: 'Education Specialist', desc: 'Designed the learning curriculum and quiz systems to build real workplace skills.' },
    { e: '👩‍💼', n: 'Nourhan Salah', r: 'Quality Assurance', desc: 'Tested every feature thoroughly to ensure a smooth, bug-free experience for all users.' },
    { e: '👩‍🔬', n: 'Rawan Nader', r: 'Accessibility Researcher', desc: 'Researched and implemented cognitive accessibility best practices for users with Down Syndrome.' },
];

const GAMES = [
    { id: 'memory', icon: '🧠', title: 'Memory Game', titleAr: 'لعبة الذاكرة', color: '#FF6B35', desc: 'Match all pairs of cards!', instEn: 'Flip cards to find matching pairs. Try to remember where each one is!', instAr: 'اقلب البطاقات للعثور على الأزواج المتطابقة!' },
    { id: 'pattern', icon: '🔷', title: 'Pattern Game', titleAr: 'لعبة الأنماط', color: '#1DB9A8', desc: 'Complete the pattern sequence!', instEn: 'Look at the pattern and click the shape that comes next!', instAr: 'انظر إلى النمط وانقر على الشكل التالي!' },
    { id: 'math', icon: '🔢', title: 'Maths Game', titleAr: 'لعبة الرياضيات', color: '#FFB830', desc: 'Solve simple maths problems!', instEn: 'Solve the maths question and tap the correct answer!', instAr: 'احل مسألة الرياضيات وانقر على الإجابة الصحيحة!' },
    { id: 'sort', icon: '📦', title: 'Sorting Game', titleAr: 'لعبة التصنيف', color: '#7C3AED', desc: 'Sort items into right categories!', instEn: 'Drag each word into the correct category box!', instAr: 'اسحب كل كلمة إلى صندوق الفئة الصحيحة!' },
    { id: 'focus', icon: '👁️', title: 'Focus Game', titleAr: 'لعبة التركيز', color: '#10B981', desc: 'Click glowing squares fast!', instEn: 'Click each glowing square quickly before it fades! Keep your focus!', instAr: 'انقر على كل مربع متوهج بسرعة قبل أن يتلاشى!' },
];

// ────────────────────────────────────────────────────
// VOICE ENGINE
// ────────────────────────────────────────────────────
var isSpeaking = false;
var isReading = false;
var SR = window.SpeechRecognition || window.webkitSpeechRecognition;

function speak(text, onEnd) {
    stopAll();
    if (!window.speechSynthesis || !text) return;
    var u = new SpeechSynthesisUtterance(text);
    var isAr = document.documentElement.getAttribute('data-lang') === 'ar';
    u.lang = isAr ? 'ar-SA' : 'en-US';
    u.rate = 0.87;
    u.pitch = 1.05;
    isSpeaking = true;
    document.getElementById('stop-btn').classList.add('on');
    u.onend = function () {
        isSpeaking = false;
        if (!isReading) document.getElementById('stop-btn').classList.remove('on');
        if (onEnd) onEnd();
    };
    u.onerror = function () { isSpeaking = false; };
    speechSynthesis.speak(u);
}

// FIX: stopAll now properly handles all timers including jobVidTimer
function stopAll() {
    if (window.speechSynthesis) speechSynthesis.cancel();
    isSpeaking = false;
    isReading = false;
    document.getElementById('stop-btn').classList.remove('on');
    document.getElementById('reading-bar').classList.remove('on');
    var bot = document.getElementById('iv-bot');
    if (bot) bot.classList.remove('talk');
    var lbl = document.getElementById('iv-tlbl');
    if (lbl) lbl.classList.remove('on');
    // FIX: properly clear both video timers
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
        var t = el.textContent.trim();
        if (t.length > 6 && t.length < 260) texts.push(t);
    });
    var combined = texts.slice(0, 7).join('. ');
    isReading = true;
    var bar = document.getElementById('reading-bar');
    bar.classList.add('on');
    document.getElementById('stop-btn').classList.add('on');
    speak(combined, function () {
        isReading = false;
        bar.classList.remove('on');
        document.getElementById('stop-btn').classList.remove('on');
    });
}

// ────────────────────────────────────────────────────
// VOICE COMMANDS (FIXED - stays open properly)
// ────────────────────────────────────────────────────
var vcRec = null;
var vcActive = false;

function startVoiceCmd() {
    if (vcActive) { stopVoiceCmd(); return; }
    if (!SR) { showNotif('❌ Voice not supported. Please use Chrome.'); return; }
    // Open overlay FIRST - keep it open
    document.getElementById('v-over').classList.add('on');
    document.getElementById('v-result').textContent = '🎙️ Listening... / جاري الاستماع...';
    vcRec = new SR();
    vcRec.lang = 'en-US';
    vcRec.continuous = true;
    vcRec.interimResults = false;
    vcActive = true;
    vcRec.onresult = function (e) {
        var txt = Array.from(e.results).map(function (r) { return r[0].transcript; }).join(' ').toLowerCase();
        document.getElementById('v-result').textContent = '🗣 "' + txt + '"';
        processVoiceCmd(txt);
    };
    vcRec.onerror = function (e) {
        document.getElementById('v-result').textContent = '⚠️ Error: ' + e.error + '. Try again.';
        // Don't close overlay on error - let user try again
        setTimeout(function () {
            if (vcActive) {
                try { vcRec.start(); } catch (err) { }
            }
        }, 1000);
    };
    vcRec.onend = function () {
        // FIXED: restart instead of closing on end
        if (vcActive) {
            setTimeout(function () {
                try { vcRec.start(); } catch (err) { }
            }, 300);
        }
    };
    try { vcRec.start(); } catch (e) { }
}

function stopVoiceCmd() {
    vcActive = false;
    if (vcRec) { try { vcRec.stop(); } catch (e) { } vcRec = null; }
    document.getElementById('v-over').classList.remove('on');
}

function processVoiceCmd(txt) {
    var cmds = [
        [['home', 'الرئيسية', 'go home'], 'home', null],
        [['assess', 'test', 'اختبار', 'job test'], 'assess', null],
        [['cv guide', 'learn cv', 'دليل السيرة'], 'cvlearn', null],
        [['build cv', 'cv build', 'ابنِ', 'open cv', 'افتح السيرة'], 'cvbuild', null],
        [['game', 'games', 'العب', 'الألعاب', 'open games', 'افتح الألعاب'], 'games', null],
        [['learn', 'topic', 'تعلم'], 'learn', null],
        [['jobs', 'وظائف', 'show jobs', 'اعرض الوظائف'], 'jobs', null],
        [['interview', 'مقابلة', 'start interview', 'ابدأ المقابلة'], 'interview', null],
        [['dashboard', 'progress', 'لوحة'], 'dashboard', null],
        [['about', 'team', 'فريق'], 'about', null],
        [['stop', 'quiet', 'توقف', 'وقف', 'stop voice', 'وقف القراءة', 'stop reading'], null, 'stop'],
        [['read', 'اقرأ', 'read page', 'اقرأ الصفحة'], null, 'read'],
        [['dark', 'night', 'مظلم', 'dark mode', 'وضع مظلم'], null, 'dark'],
        [['bigger', 'larger', 'أكبر', 'نص أكبر', 'كبر'], null, 'bigger'],
        [['smaller', 'smaller', 'أصغر', 'نص أصغر', 'صغر'], null, 'smaller'],
        [['contrast', 'high contrast', 'تباين'], null, 'contrast'],
        [['guide', 'voice guide', 'دليل'], null, 'guide'],
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
    document.getElementById('v-result').textContent = '🤔 Not understood, try again...';
}

// Voice guide modal
function openVoiceGuide() { document.getElementById('vcg-modal').classList.add('on'); }
function closeVoiceGuide() { document.getElementById('vcg-modal').classList.remove('on'); }

// ────────────────────────────────────────────────────
// ROUTING
// ────────────────────────────────────────────────────
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
    else if (id === 'cvlearn') buildCVLearnPage();
    else if (id === 'cvbuild') buildCVBuildPage();
    else if (id === 'games') buildGamesPage();
    else if (id === 'learn') buildLearnPage();
    else if (id === 'jobs') buildJobsPage();
    else if (id === 'interview') buildInterviewPage();
    else if (id === 'dashboard') buildDashPage();
    else if (id === 'about') buildAboutPage();
    // GSAP entrance animations for the new page
    setTimeout(function () { runPageGSAP(id); }, 100);
}

// ────────────────────────────────────────────────────
// ASSESSMENT
// ────────────────────────────────────────────────────
var quizJob = null, quizIdx = 0, quizScores = {};

function buildAssessPage() {
    var pg = document.getElementById('page-assess');
    pg.innerHTML = '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')">←</button><h2>📋 Job Assessment · اختبار الوظيفة</h2><span class="step-badge" style="background:var(--sun)">Step 1 of 5</span></div>' +
        '<div style="background:var(--sky);color:#fff;padding:12px 32px;font-size:.84rem;font-weight:800">🌟 Step 1 — Choose a job and answer 5 questions to find your best match!</div>' +
        '<div style="padding:32px;max-width:920px;margin:0 auto">' +
        '<h3 style="font-family:var(--fd);font-size:1.25rem;font-weight:900;margin-bottom:6px">Choose a Job to Explore 👇</h3>' +
        '<p style="color:var(--txt2);font-size:.85rem;margin-bottom:22px">Click on a job to start the quiz · انقر على وظيفة لبدء الاختبار</p>' +
        '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:28px" id="job-sel"></div>' +
        '<div id="quiz-wrap"></div><div id="result-wrap"></div></div>';
    renderJobSel();
}

function renderJobSel() {
    var el = document.getElementById('job-sel');
    if (!el) return;
    el.innerHTML = JOBS_DATA.map(function (j) {
        return '<div onclick="selectJob(\'' + j.id + '\')" style="background:var(--surf);border:2.5px solid ' + (quizJob === j.id ? j.color : 'var(--bdr)') + ';border-radius:var(--r);padding:22px 14px;text-align:center;cursor:pointer;transition:all .25s;' + (quizJob === j.id ? 'background:' + j.color + '11;' : '') + '">' +
            '<div style="font-size:2.4rem;margin-bottom:9px">' + j.icon + '</div>' +
            '<div style="font-size:.82rem;font-weight:800;margin-bottom:4px">' + j.name + '</div>' +
            '<div style="font-family:var(--fa);font-size:.72rem;color:var(--txt2)">' + j.nameAr + '</div></div>';
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
        '<div><div style="font-weight:900">' + job.name + ' · ' + job.nameAr + '</div><div style="font-size:.76rem;color:var(--txt2)">Answer 5 questions · أجب على 5 أسئلة</div></div>' +
        '<button class="voicebtn nb" onclick="speak(\'' + job.name + '. ' + job.desc + '\',null)" style="margin-left:auto">🔊</button></div>' +
        '<div style="height:7px;background:var(--bg2);border-radius:50px;margin-bottom:20px;overflow:hidden"><div id="qprog" style="height:100%;background:linear-gradient(90deg,var(--sun),var(--gold));border-radius:50px;width:0%;transition:width .4s"></div></div>' +
        '<div id="qnum" style="font-size:.76rem;font-weight:800;color:var(--txt2);margin-bottom:8px">Question 1 of 5</div>' +
        '<div style="display:flex;align-items:flex-start;gap:9px;margin-bottom:6px"><div id="qtext" style="font-size:1.1rem;font-weight:800;line-height:1.4;flex:1"></div><button class="voicebtn nb" onclick="speakQ()">🔊</button></div>' +
        '<div id="qar" style="font-family:var(--fa);font-size:.9rem;color:var(--txt2);direction:rtl;margin-bottom:22px"></div>' +
        '<div id="qopts"></div>' +
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:22px">' +
        '<span id="qhint" style="font-size:.8rem;color:var(--txt2);font-weight:700">Click an answer to continue · انقر للمتابعة</span>' +
        '<button class="btn btn-t btn-sm" onclick="nextQ()" id="qnext" style="display:none">Next →</button></div></div>';
    renderQ();
    speak('You selected ' + job.name + '. Let\'s answer 5 questions!', null);
    document.getElementById('quiz-wrap').scrollIntoView({ behavior: 'smooth' });
}

function renderQ() {
    var job = JOBS_DATA.find(function (j) { return j.id === quizJob; });
    if (!job) return;
    var q = job.questions[quizIdx];
    var pct = quizIdx / job.questions.length * 100;
    var qp = document.getElementById('qprog'); if (qp) qp.style.width = pct + '%';
    var qn = document.getElementById('qnum'); if (qn) qn.textContent = 'Question ' + (quizIdx + 1) + ' of ' + job.questions.length;
    var qt = document.getElementById('qtext'); if (qt) qt.textContent = q.q;
    var qa = document.getElementById('qar'); if (qa) qa.textContent = q.qAr;
    var qnext = document.getElementById('qnext'); if (qnext) qnext.style.display = 'none';
    var icons = ['😊', '🤔', '😐', '💪', '🌟'];
    var qo = document.getElementById('qopts');
    if (qo) qo.innerHTML = q.opts.map(function (o, i) {
        return '<div class="lquiz-opt" onclick="selectOpt(this,' + i + ')">' +
            '<div style="width:36px;height:36px;border-radius:9px;background:var(--surf);border:1.5px solid var(--bdr);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0">' + (icons[i] || '•') + '</div>' +
            '<div>' + o + '</div></div>';
    }).join('');
}

function speakQ() {
    var job = JOBS_DATA.find(function (j) { return j.id === quizJob; });
    if (!job) return;
    var q = job.questions[quizIdx];
    speak(q.q + '. ' + q.qAr, null);
}

function selectOpt(el, i) {
    document.querySelectorAll('.lquiz-opt').forEach(function (o) { o.classList.remove('ok', 'no'); });
    el.classList.add('ok');
    var job = JOBS_DATA.find(function (j) { return j.id === quizJob; });
    quizScores[quizIdx] = job.questions[quizIdx].scores[i];
    var qnext = document.getElementById('qnext'); if (qnext) qnext.style.display = 'flex';
    var qh = document.getElementById('qhint'); if (qh) qh.textContent = '✅ Great! Press Next.';
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
        '<h2 style="font-family:var(--fd);font-size:1.8rem;font-weight:900;margin-bottom:8px">Your Match: ' + bestJob.name + '! 🎉</h2>' +
        '<p style="color:var(--txt2);margin-bottom:24px;max-width:480px;margin-left:auto;margin-right:auto;line-height:1.7">You scored ' + pct + '%. ' + bestJob.desc + '</p>' +
        '<div style="display:flex;gap:11px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn btn-o" onclick="speak(\'' + bestJob.desc + '\',null)">🔊 Hear Description</button>' +
        '<button class="btn btn-t" onclick="showPage(\'cvlearn\')">📄 Build My CV</button>' +
        '<button class="btn btn-g" onclick="showPage(\'jobs\')">💼 Find Jobs</button></div></div>';
    speak('Congratulations! Your best job match is ' + bestJob.name + '! You scored ' + pct + ' percent.', null);
    document.getElementById('result-wrap').scrollIntoView({ behavior: 'smooth' });
    updateStat('tests', 1); updateStat('pts', pct * 2);
    addAct('📋', 'Assessment Done', 'Score: ' + pct + '%', '+' + pct + ' pts');
}

// ────────────────────────────────────────────────────
// CV LEARN
// ────────────────────────────────────────────────────
function buildCVLearnPage() {
    var pg = document.getElementById('page-cvlearn');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')">←</button><h2>📖 Learn to Build an ATS CV</h2><span class="step-badge" style="background:var(--jade)">Step 2 of 5</span></div>' +
        '<div style="padding:32px;max-width:960px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,#1A1A2E,#0F3460);border-radius:var(--rlg);overflow:hidden;margin-bottom:28px;aspect-ratio:16/9;position:relative;cursor:pointer" id="cv-vid-wrap">' +
        '<div id="cv-scene-0" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:40px">' +
        '<div style="font-size:5rem;animation:charBounce 2s ease-in-out infinite">🎬</div>' +
        '<div style="background:rgba(0,0,0,.6);backdrop-filter:blur(8px);padding:13px 26px;border-radius:50px;color:#fff;font-size:1rem;font-weight:700;border:1px solid rgba(255,255,255,.15)">▶️ Click to Start the CV Guide Video!</div>' +
        '<div style="background:rgba(29,185,168,.2);padding:9px 22px;border-radius:50px;color:var(--sky);font-size:.85rem;font-weight:700;font-family:var(--fa)">اضغط لمشاهدة فيديو دليل السيرة الذاتية</div></div>' +
        '<div id="cv-scene-1" style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:40px;opacity:0;pointer-events:none;transition:opacity .5s">' +
        '<div id="cv-char" style="font-size:5rem;animation:charBounce 2s ease-in-out infinite">📄</div>' +
        '<div id="cv-cap" style="background:rgba(0,0,0,.65);backdrop-filter:blur(10px);padding:13px 26px;border-radius:50px;color:#fff;font-size:.95rem;font-weight:700;text-align:center;max-width:500px;line-height:1.5;border:1px solid rgba(255,255,255,.12)">What is an ATS CV?</div>' +
        '<div id="cv-cap-ar" style="background:rgba(29,185,168,.22);padding:9px 22px;border-radius:50px;color:var(--sky);font-size:.84rem;font-weight:700;font-family:var(--fa)">ما هي السيرة الذاتية المتوافقة؟</div></div>' +
        '<div style="position:absolute;bottom:0;left:0;right:0;display:flex;align-items:center;gap:11px;padding:14px 22px;background:rgba(0,0,0,.45)">' +
        '<button class="vc-btn-play" id="cv-play-btn" onclick="toggleCVVideo()" style="padding:8px 20px;border-radius:50px;background:var(--sun);border:none;color:#fff;font-size:.8rem;font-weight:800;cursor:pointer">▶ Play</button>' +
        '<div style="flex:1;height:5px;background:rgba(255,255,255,.2);border-radius:50px;overflow:hidden"><div id="cv-prog" style="height:100%;background:var(--sun);border-radius:50px;width:0%;transition:width .3s"></div></div>' +
        '<button onclick="restartCVVid()" style="padding:8px 18px;border-radius:50px;background:rgba(255,255,255,.12);border:1.5px solid rgba(255,255,255,.2);color:#fff;font-size:.78rem;font-weight:800;cursor:pointer">↩ Restart</button></div></div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:32px">' +
        [['👤', '1. Contact Info', 'Name, email, phone, location at the top'], ['✍️', '2. Summary', '2-3 sentences about your strengths'], ['💼', '3. Experience', 'Any job, volunteering or school activity'], ['🎓', '4. Education', 'School name and graduation year'], ['🏆', '5. Certifications', 'Courses, awards, training'], ['🧩', '6. Skills', 'Teamwork, computer basics, communication']].map(function (item) {
            return '<div style="background:var(--surf);border:2px solid var(--bdr);border-radius:var(--r);padding:24px 20px;transition:all .25s" onmouseover="this.style.borderColor=\'var(--sky)\';this.style.transform=\'translateY(-3px)\'" onmouseout="this.style.borderColor=\'var(--bdr)\';this.style.transform=\'\'">' +
                '<div style="font-size:1.9rem;margin-bottom:10px">' + item[0] + '</div><h3 style="font-size:.9rem;font-weight:800;margin-bottom:5px">' + item[1] + '</h3>' +
                '<p style="font-size:.78rem;color:var(--txt2);line-height:1.5">' + item[2] + '</p></div>';
        }).join('') + '</div>' +
        '<div style="text-align:center"><button class="btn btn-o" onclick="showPage(\'cvbuild\')">📄 Now Build My CV →</button></div></div>';
    cvVidIdx = 0; cvVidPlaying = false;
    // attach click to video wrap
    document.getElementById('cv-vid-wrap').onclick = toggleCVVideo;
}

function toggleCVVideo() {
    if (cvVidPlaying) {
        cvVidPlaying = false;
        if (cvVidTimer) { clearTimeout(cvVidTimer); cvVidTimer = null; }
        stopAll();
        var b = document.getElementById('cv-play-btn');
        if (b) b.textContent = '▶ Resume';
        return;
    }
    cvVidPlaying = true;
    var s0 = document.getElementById('cv-scene-0');
    var s1 = document.getElementById('cv-scene-1');
    if (s0) { s0.style.opacity = '0'; s0.style.pointerEvents = 'none'; }
    if (s1) { s1.style.opacity = '1'; s1.style.pointerEvents = 'auto'; }
    var b = document.getElementById('cv-play-btn');
    if (b) b.textContent = '⏸ Pause';
    playCVSlide();
}

function playCVSlide() {
    if (cvVidIdx >= CV_SLIDES.length) { cvVidPlaying = false; var b = document.getElementById('cv-play-btn'); if (b) b.textContent = '▶ Replay'; return; }
    var s = CV_SLIDES[cvVidIdx];
    var ch = document.getElementById('cv-char');
    var cp = document.getElementById('cv-cap');
    var ca = document.getElementById('cv-cap-ar');
    var pg = document.getElementById('cv-prog');
    if (ch) ch.textContent = s.c;
    if (cp) cp.textContent = s.en;
    if (ca) ca.textContent = s.ar;
    if (pg) pg.style.width = ((cvVidIdx + 1) / CV_SLIDES.length * 100) + '%';
    speak(s.en, function () {
        if (cvVidPlaying) {
            cvVidIdx++;
            cvVidTimer = setTimeout(playCVSlide, 500);
        }
    });
}

function restartCVVid() {
    cvVidIdx = 0; cvVidPlaying = false;
    if (cvVidTimer) { clearTimeout(cvVidTimer); cvVidTimer = null; }
    stopAll();
    var p = document.getElementById('cv-prog'); if (p) p.style.width = '0%';
    var b = document.getElementById('cv-play-btn'); if (b) b.textContent = '▶ Play';
}

// ────────────────────────────────────────────────────
// CV BUILD
// ────────────────────────────────────────────────────
var cvData = {};
var cvRecMap = {};

function buildCVBuildPage() {
    loadCV();
    var pg = document.getElementById('page-cvbuild');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'cvlearn\')">←</button><h2>📄 Build Your CV · ابنِ سيرتك الذاتية</h2><span class="step-badge" style="background:var(--gold);color:#1a1a1a">Step 3 of 5</span></div>' +
        '<div style="background:var(--gold);color:#1a1a1a;padding:12px 32px;font-size:.84rem;font-weight:800">🌟 Fill in your details — your CV preview appears on the right!</div>' +
        '<div class="cvwrap"><div class="cvform" id="cvform"></div>' +
        '<div class="cvprev"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">' +
        '<h3 style="font-weight:900;font-size:.9rem">👀 Live Preview</h3>' +
        '<div style="display:flex;gap:7px"><button class="btn btn-o btn-sm" onclick="exportCV(\'pdf\')">📥 PDF</button><button class="btn btn-g btn-sm" onclick="saveCV()">💾 Save</button></div></div>' +
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
        '<button class="btn btn-o btn-sm" onclick="exportCV(\'pdf\')">📥 Download PDF</button>' +
        '<button class="btn btn-g btn-sm" onclick="exportCV(\'txt\')">📝 Download ATS Text</button></div></div></div>';
    renderCVForm();
}

function renderCVForm() {
    var el = document.getElementById('cvform');
    if (!el) return;
    var html = CV_FIELDS.map(function (f) {
        var inputHtml;
        if (f.type === 'textarea') {
            inputHtml = '<textarea class="cvinput cvtarea" id="cvf-' + f.key + '" placeholder="' + f.hint + '" oninput="cvLive(\'' + f.key + '\',this.value)">' + (cvData[f.key] || '') + '</textarea>';
        } else if (f.type === 'skills') {
            inputHtml = '<div class="schips" id="cvchips-' + f.key + '">' + SKILLS_LIST.map(function (s) {
                return '<div class="schip ' + ((cvData.skills || []).includes(s) ? 'on' : '') + '" onclick="toggleSkill(\'' + s.replace(/'/g, "\\'") + '\',this)">' + s + '</div>';
            }).join('') + '</div>';
        } else {
            inputHtml = '<input class="cvinput" type="' + f.type + '" id="cvf-' + f.key + '" placeholder="' + f.hint + '" value="' + (cvData[f.key] || '') + '" oninput="cvLive(\'' + f.key + '\',this.value)">';
        }
        var recHtml = f.type !== 'skills' ? '<div class="cvrecrow"><button class="cvrecbtn" id="cvrc-' + f.key + '" onclick="toggleCVRec(\'' + f.key + '\')">🎤 Record Voice</button></div>' : '';
        return '<div class="cvfblock" id="cvb-' + f.key + '">' +
            '<div class="cflrow"><span class="cflen">' + f.en + '</span><button class="voicebtn nb" onclick="speak(\'' + f.en + '\',null)" title="Listen">🔊</button></div>' +
            '<div class="cflar">' + f.ar + '</div>' +
            '<div class="cfhint">' + f.hint + '</div>' +
            inputHtml + recHtml + '</div>';
    }).join('');
    html += '<div style="display:flex;gap:9px;margin-top:6px;flex-wrap:wrap">' +
        '<button class="btn btn-o" onclick="saveCV();showToast(\'💾 CV saved!\')">💾 Save</button>' +
        '<button class="btn btn-t" onclick="exportCV(\'pdf\')">📥 PDF</button>' +
        '<button class="btn btn-g" onclick="showPage(\'games\')">🧩 Next: Games →</button></div>';
    el.innerHTML = html;
    updateCVPrev();
}

function cvLive(key, val) { cvData[key] = val; updateCVPrev(); }

function toggleSkill(skill, el) {
    if (!cvData.skills) cvData.skills = [];
    var i = cvData.skills.indexOf(skill);
    if (i > -1) cvData.skills.splice(i, 1);
    else cvData.skills.push(skill);
    el.classList.toggle('on');
    updateCVPrev();
}

function toggleCVRec(key) {
    var btn = document.getElementById('cvrc-' + key);
    if (cvRecMap[key] && cvRecMap[key].active) {
        try { cvRecMap[key].r.stop(); } catch (e) { }
        cvRecMap[key].active = false;
        if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 Record Voice'; }
        return;
    }
    if (!SR) { showNotif('❌ Voice not supported. Use Chrome.'); return; }
    var r = new SR();
    r.lang = 'en-US'; r.continuous = true; r.interimResults = true; r.start();
    if (btn) { btn.classList.add('rec'); btn.textContent = '🛑 Stop Recording'; }
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
    if (type === 'pdf') {
        loadJsPDF(function () {
            var d = cvData;
            var jsPDF = window.jspdf && window.jspdf.jsPDF;
            if (!jsPDF) { showNotif('PDF library not loaded. Try again.'); return; }
            var doc = new jsPDF({ unit: 'mm', format: 'a4' });
            doc.setFillColor(255, 107, 53); doc.rect(0, 0, 210, 36, 'F');
            doc.setTextColor(255, 255, 255); doc.setFont('helvetica', 'bold'); doc.setFontSize(20);
            doc.text(d.name || 'Your Name', 18, 14);
            doc.setFontSize(11); doc.setFont('helvetica', 'normal');
            doc.text(d.role || 'Job Title', 18, 22);
            doc.setFontSize(9);
            doc.text([(d.email || ''), (d.phone || ''), (d.loc || '')].filter(Boolean).join('  |  '), 18, 30);
            var y = 46;
            function sec(t, content) {
                if (!content) return;
                doc.setFont('helvetica', 'bold'); doc.setFontSize(10);
                doc.setTextColor(255, 107, 53); doc.text(t.toUpperCase(), 18, y); y += 2;
                doc.setDrawColor(255, 107, 53); doc.setLineWidth(.3); doc.line(18, y, 192, y); y += 5;
                doc.setFont('helvetica', 'normal'); doc.setFontSize(9.5); doc.setTextColor(60, 60, 60);
                var lines = doc.splitTextToSize(content, 170);
                doc.text(lines, 18, y); y += lines.length * 5.5 + 6;
            }
            sec('Professional Summary', d.summary);
            sec('Work Experience', d.exp);
            sec('Education', d.edu);
            if (d.cert) sec('Certifications', d.cert);
            if (d.skills && d.skills.length) sec('Skills', d.skills.join(' • '));
            sec('Hobbies & Interests', d.hobbies);
            doc.save((d.name || 'MyCV').replace(/\s+/g, '_') + '_BrightPath.pdf');
            showToast('📥 PDF downloaded!');
        });
    } else {
        var d = cvData;
        var lines = [
            d.name || 'Your Name', '='.repeat(40), d.role || 'Job Title',
            'Email: ' + (d.email || '') + '  |  Phone: ' + (d.phone || '') + '  |  Location: ' + (d.loc || ''),
            '', 'PROFESSIONAL SUMMARY', '-'.repeat(40), d.summary || '',
            '', 'WORK EXPERIENCE', '-'.repeat(40), d.exp || '',
            '', 'EDUCATION', '-'.repeat(40), d.edu || '',
            '', 'CERTIFICATIONS', '-'.repeat(40), d.cert || '',
            '', 'SKILLS', '-'.repeat(40), (d.skills || []).join(' | ') || '',
            '', 'HOBBIES & INTERESTS', '-'.repeat(40), d.hobbies || '',
        ];
        var blob = new Blob([lines.join('\n')], { type: 'text/plain' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = (d.name || 'MyCV').replace(/\s+/g, '_') + '_BrightPath_ATS.txt';
        a.click();
        showToast('📝 ATS CV text file downloaded!');
    }
}

function loadJsPDF(cb) {
    if (window.jspdf) { cb(); return; }
    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = cb;
    s.onerror = function () { showNotif('Could not load PDF library. Check your internet connection.'); };
    document.head.appendChild(s);
}

// ────────────────────────────────────────────────────
// GAMES (FIXED - all games render and work correctly)
// ────────────────────────────────────────────────────
var gameActive = null;

function buildGamesPage() {
    var pg = document.getElementById('page-games');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')">←</button><h2>🧩 Skill Games · ألعاب المهارات</h2></div>' +
        '<div style="padding:32px;max-width:1100px;margin:0 auto">' +
        '<div style="margin-bottom:24px"><h3 style="font-family:var(--fd);font-size:1.25rem;font-weight:900;margin-bottom:5px">Play Games to Build Real Skills! 🎯</h3>' +
        '<p style="color:var(--txt2);font-size:.86rem">Every game helps you practice memory, focus, and problem-solving for the workplace.</p></div>' +
        '<div class="games-grid">' +
        GAMES.map(function (g) {
            return '<div class="card game-card" onclick="startGame(\'' + g.id + '\')">' +
                '<div class="g-ico">' + g.icon + '</div>' +
                '<h3>' + g.title + '</h3>' +
                '<div style="font-family:var(--fa);font-size:.72rem;color:var(--txt2);margin-bottom:5px">' + g.titleAr + '</div>' +
                '<p>' + g.desc + '</p>' +
                '<span class="g-playtag" style="background:' + g.color + '">▶ Play</span></div>';
        }).join('') + '</div>' +
        '<div class="game-arena" id="game-arena"></div></div>';
}

function startGame(id) {
    gameActive = id;
    var g = GAMES.find(function (x) { return x.id === id; });
    var a = document.getElementById('game-arena');
    if (!a) return;
    a.classList.add('on');
    a.innerHTML =
        '<div style="display:flex;align-items:center;gap:14px;margin-bottom:20px">' +
        '<span style="font-size:2rem">' + g.icon + '</span>' +
        '<div><h3 style="font-weight:900;margin-bottom:3px">' + g.title + ' · ' + g.titleAr + '</h3>' +
        '<p style="font-size:.8rem;color:var(--txt2)">' + g.instEn + '</p></div>' +
        '<button class="voicebtn nb" onclick="speak(\'' + g.instEn.replace(/'/g, "\\'") + '\',null)" style="margin-left:auto">🔊</button>' +
        '<button class="btn btn-g btn-sm" onclick="closeGame()">✕ Close</button></div>' +
        '<div id="game-inner"></div>';
    a.scrollIntoView({ behavior: 'smooth' });
    speak(g.instEn, null);
    if (id === 'memory') buildMemory();
    else if (id === 'pattern') buildPattern();
    else if (id === 'math') buildMath();
    else if (id === 'sort') buildSort();
    else if (id === 'focus') buildFocus();
}

function closeGame() {
    var a = document.getElementById('game-arena');
    if (a) a.classList.remove('on');
}

// MEMORY GAME (FIXED grid layout)
var memFlipped = [], memMatched = 0, memLocked = false, memMoves = 0, memT = null, memSec = 0;

function buildMemory() {
    var EMOJIS = ['🍎', '🐶', '🌺', '⭐', '🎈', '🦁', '🍕', '🎸'];
    var cards = EMOJIS.concat(EMOJIS).sort(function () { return Math.random() - .5; });
    var inn = document.getElementById('game-inner');
    memFlipped = []; memMatched = 0; memLocked = false; memMoves = 0; memSec = 0;
    clearInterval(memT);
    inn.innerHTML =
        '<div class="scorebar">' +
        '<div class="sitem"><div class="snum" id="mem-moves">0</div><div class="slbl">Moves</div></div>' +
        '<div class="sitem"><div class="snum" id="mem-pairs">0/' + EMOJIS.length + '</div><div class="slbl">Pairs Found</div></div>' +
        '<div class="sitem"><div class="snum" id="mem-time">0s</div><div class="slbl">Time</div></div></div>' +
        '<div class="mem-board" id="mem-board"></div>' +
        '<div style="text-align:center;margin-top:16px"><button class="btn btn-o btn-sm" onclick="buildMemory()">🔄 New Game</button></div>';
    var board = document.getElementById('mem-board');
    cards.forEach(function (emoji, i) {
        var c = document.createElement('div');
        c.className = 'mc';
        c.dataset.emoji = emoji;
        c.dataset.idx = i;
        c.innerHTML = '<div class="mc-back">?</div><div class="mc-front">' + emoji + '</div>';
        c.onclick = function () { flipCard(c); };
        board.appendChild(c);
    });
    memT = setInterval(function () {
        memSec++;
        var el = document.getElementById('mem-time');
        if (el) el.textContent = memSec + 's';
    }, 1000);
}

function flipCard(c) {
    if (memLocked || c.classList.contains('flip') || c.classList.contains('done')) return;
    c.classList.add('flip');
    memFlipped.push(c);
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
                speak('Congratulations! You matched all the cards in ' + memMoves + ' moves!', null);
                showToast('🎉 All pairs matched! Amazing!');
                updateStat('pts', 50);
                addAct('🧠', 'Memory Game', 'Completed', '+ 50 pts');
            }
        } else {
            setTimeout(function () { memFlipped.forEach(function (x) { x.classList.remove('flip'); }); memFlipped = []; memLocked = false; }, 1000);
        }
    }
}

// PATTERN GAME
var patScore = 0, patLevel = 1;
var PAT_SHAPES = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'];

function buildPattern() {
    var inn = document.getElementById('game-inner');
    patScore = 0; patLevel = 1;
    inn.innerHTML =
        '<div class="scorebar"><div class="sitem"><div class="snum" id="pat-score">0</div><div class="slbl">Score</div></div>' +
        '<div class="sitem"><div class="snum" id="pat-level">1</div><div class="slbl">Level</div></div></div>' +
        '<div id="pat-inner"></div>';
    nextPattern();
}

function nextPattern() {
    var size = 3 + Math.floor(patLevel / 2);
    var pat = [];
    for (var k = 0; k < size; k++) pat.push(PAT_SHAPES[Math.floor(Math.random() * 4)]);
    var next = PAT_SHAPES[Math.floor(Math.random() * 4)];
    var choices = [next].concat(PAT_SHAPES.filter(function (s) { return s !== next; }).slice(0, 3)).sort(function () { return Math.random() - .5; });
    var inn = document.getElementById('pat-inner'); if (!inn) return;
    inn.innerHTML =
        '<p style="font-weight:800;margin-bottom:10px;font-size:.9rem">What shape comes next? · ما الشكل التالي؟</p>' +
        '<div class="pat-display">' + pat.map(function (s) { return '<div class="pat-shape" style="background:var(--bg2);border:2.5px solid var(--bdr)">' + s + '</div>'; }).join('') +
        '<div class="pat-shape" style="background:var(--sun);border:2.5px solid var(--sun);font-size:1.5rem;color:#fff;font-weight:900">?</div></div>' +
        '<div class="pat-choices">' + choices.map(function (s) {
            return '<div class="pat-opt" onclick="checkPat(\'' + s + '\',\'' + next + '\',this)">' + s + '</div>';
        }).join('') + '</div>';
}

function checkPat(chosen, correct, el) {
    if (chosen === correct) {
        patScore += 10; patLevel++;
        speak('Correct! Well done!', null); showToast('✅ Correct!');
        el.style.background = 'rgba(16,185,129,.2)'; el.style.borderColor = 'var(--jade)';
        var sc = document.getElementById('pat-score'); if (sc) sc.textContent = patScore;
        var lv = document.getElementById('pat-level'); if (lv) lv.textContent = patLevel;
        updateStat('pts', 10);
        setTimeout(nextPattern, 800);
    } else {
        speak('Not quite! Look at the pattern again.', null);
        el.style.background = 'rgba(244,63,94,.15)'; el.style.borderColor = 'var(--rose)';
        showToast('🤔 Not quite — look at the pattern!');
    }
}

// MATH GAME
var mathScore = 0, mathLevel = 1;

function buildMath() {
    mathScore = 0; mathLevel = 1;
    var inn = document.getElementById('game-inner');
    inn.innerHTML =
        '<div class="scorebar"><div class="sitem"><div class="snum" id="math-score">0</div><div class="slbl">Score</div></div>' +
        '<div class="sitem"><div class="snum" id="math-level">1</div><div class="slbl">Level</div></div></div>' +
        '<div id="math-inner"></div>';
    nextMath();
}

function nextMath() {
    var max = 3 + mathLevel * 2;
    var a = Math.ceil(Math.random() * max), b = Math.ceil(Math.random() * (max / 2));
    var ops = ['+', '-', '×']; var op = ops[Math.floor(Math.random() * (mathLevel > 3 ? 3 : mathLevel > 1 ? 2 : 1))];
    var ans;
    if (op === '+') ans = a + b;
    else if (op === '-') ans = Math.abs(a - b);
    else ans = a * b;
    var wrongs = new Set();
    while (wrongs.size < 3) { var w = ans + (Math.floor(Math.random() * 5) - 2); if (w !== ans && w >= 0) wrongs.add(w); }
    var opts = [ans].concat(Array.from(wrongs)).sort(function () { return Math.random() - .5; });
    var inn = document.getElementById('math-inner'); if (!inn) return;
    var display = op === '-' ? Math.max(a, b) + ' − ' + Math.min(a, b) : a + ' ' + op + ' ' + b;
    inn.innerHTML = '<div class="math-q">' + display + ' = ?</div>' +
        '<div class="math-opts">' + opts.map(function (o) {
            return '<button class="math-opt" onclick="checkMath(' + o + ',' + ans + ',this)">' + o + '</button>';
        }).join('') + '</div>';
    speak('What is ' + display + '?', null);
}

function checkMath(chosen, correct, el) {
    document.querySelectorAll('.math-opt').forEach(function (b) { b.onclick = null; });
    if (chosen === correct) {
        mathScore += 10; mathLevel++;
        el.classList.add('ok');
        speak('Correct! Great work!', null); showToast('✅ Correct!');
        var sc = document.getElementById('math-score'); if (sc) sc.textContent = mathScore;
        var lv = document.getElementById('math-level'); if (lv) lv.textContent = mathLevel;
        updateStat('pts', 10);
        setTimeout(nextMath, 900);
    } else {
        el.classList.add('no');
        speak('Not quite! Try again.', null); showToast('🤔 Try again!');
        setTimeout(function () {
            el.classList.remove('no');
            document.querySelectorAll('.math-opt').forEach(function (b) {
                b.onclick = function () { checkMath(parseInt(b.textContent), correct, b); };
            });
        }, 800);
    }
}

// SORT GAME
var sortScore = 0, sortDragEl = null;
var SORT_DATA = {
    colors: { items: ['Red', 'Blue', 'Green', 'Yellow'], category: 'Colours' },
    shapes: { items: ['Circle', 'Square', 'Triangle', 'Star'], category: 'Shapes' },
    food: { items: ['Apple', 'Pizza', 'Banana', 'Salad'], category: 'Food' },
    jobs: { items: ['Library', 'Garden', 'Café', 'Office'], category: 'Workplaces' }
};

function buildSort() {
    var inn = document.getElementById('game-inner');
    sortScore = 0;
    var cats = Object.values(SORT_DATA);
    var all = [];
    cats.forEach(function (c) { c.items.forEach(function (item) { all.push({ item: item, cat: c.category }); }); });
    all.sort(function () { return Math.random() - .5; });
    var bins = cats.map(function (c) { return c.category; });
    inn.innerHTML =
        '<div class="scorebar"><div class="sitem"><div class="snum" id="sort-score">0</div><div class="slbl">Score</div></div>' +
        '<div class="sitem"><div class="snum" id="sort-left">' + all.length + '</div><div class="slbl">Left</div></div></div>' +
        '<p style="font-weight:800;margin-bottom:8px">Drag each item into the correct box! · اسحب كل عنصر إلى الصندوق الصحيح!</p>' +
        '<div class="sort-pool" id="sort-pool">' + all.map(function (x, i) {
            return '<div class="sort-item" draggable="true" data-cat="' + x.cat + '" id="si-' + i + '">' + x.item + '</div>';
        }).join('') + '</div>' +
        '<div class="sort-bins">' + bins.map(function (b) {
            return '<div class="sort-bin" ondragover="event.preventDefault();this.classList.add(\'drag-over\')" ondragleave="this.classList.remove(\'drag-over\')" ondrop="dropSort(event,\'' + b + '\',this)"><div class="sort-bin-lbl">' + b + '</div></div>';
        }).join('') + '</div>';
    // Attach drag events
    all.forEach(function (x, i) {
        var el = document.getElementById('si-' + i);
        if (el) el.addEventListener('dragstart', function () { sortDragEl = el; });
    });
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
        showToast('✅ Correct place!'); updateStat('pts', 10);
        if (rem === 0) { speak('Amazing! You sorted everything correctly!', null); showToast('🎉 All sorted! Great job!'); }
    } else {
        showToast('🤔 Wrong category, try again!');
        speak('Not quite! Try a different box.', null);
    }
    sortDragEl = null;
}

// FOCUS GAME
var focusScore = 0, focusLit = -1, focusFocusTimer = null, focusDelay = 700, focusMissed = 0;
var FOCUS_EMOJIS = ['😊', '🌟', '❤️', '🎈', '🎉', '🌈', '⚡', '🎵', '🔔', '🍀', '🌺', '🦋', '🎯', '🏆', '💎', '🌙', '☀️', '🍕', '🎸', '🦁', '🐶', '🐱', '🌸', '🍎', '🦊'];

function buildFocus() {
    focusScore = 0; focusLit = -1; focusDelay = 700; focusMissed = 0;
    if (focusFocusTimer) clearTimeout(focusFocusTimer);
    var inn = document.getElementById('game-inner');
    inn.innerHTML =
        '<div class="scorebar"><div class="sitem"><div class="snum" id="foc-score">0</div><div class="slbl">Score</div></div>' +
        '<div class="sitem"><div class="snum" id="foc-speed">700ms</div><div class="slbl">Speed</div></div></div>' +
        '<div class="focus-board" id="foc-board">' + Array.from({ length: 25 }, function (_, i) {
            return '<div class="focus-cell" id="foc-' + i + '" onclick="hitFocus(' + i + ')">' + FOCUS_EMOJIS[i] + '</div>';
        }).join('') + '</div>' +
        '<div style="text-align:center;margin-top:14px"><button class="btn btn-o btn-sm" onclick="buildFocus()">🔄 New Game</button></div>';
    nextFocusCell();
}

function nextFocusCell() {
    if (focusFocusTimer) clearTimeout(focusFocusTimer);
    if (focusLit >= 0) { var prev = document.getElementById('foc-' + focusLit); if (prev) prev.classList.remove('lit'); }
    focusMissed++;
    if (focusMissed > 3) {
        speak('Game over! Great try!', null);
        showToast('⏰ Game Over! Score: ' + focusScore);
        updateStat('pts', focusScore);
        addAct('👁️', 'Focus Game', 'Score: ' + focusScore, '+' + focusScore + ' pts');
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

// ────────────────────────────────────────────────────
// LEARN TOPICS
// ────────────────────────────────────────────────────
var topicProgress = {};

function buildLearnPage() {
    var pg = document.getElementById('page-learn');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')">←</button><h2>📚 Learning Topics · موضوعات التعلم</h2></div>' +
        '<div style="padding:32px;max-width:1100px;margin:0 auto">' +
        '<div style="margin-bottom:24px"><h3 style="font-family:var(--fd);font-size:1.25rem;font-weight:900;margin-bottom:5px">Learn Workplace Skills! 📖</h3>' +
        '<p style="color:var(--txt2);font-size:.86rem">7 topics to help you succeed at work. Each topic has audio, explanations, and a quiz!</p></div>' +
        '<div class="topics-grid">' + TOPICS.map(function (t) {
            return '<div class="card topic-card" onclick="openTopic(\'' + t.id + '\')">' +
                '<div class="topic-ico">' + t.icon + '</div>' +
                '<h3>' + t.title + '</h3>' +
                '<p>' + t.content[0].en.slice(0, 80) + '…</p>' +
                '<div class="topic-meta"><span class="topic-time">⏱ ' + t.time + '</span><span style="font-size:.72rem;font-weight:800;padding:4px 11px;border-radius:50px;background:' + t.color + '22;color:' + t.color + '">Start →</span></div>' +
                '<div class="topic-prog-bar"><div class="topic-prog-fill" style="width:' + ((topicProgress[t.id] || 0) * 100) + '%;background:' + t.color + '"></div></div></div>';
        }).join('') + '</div></div>';
}

function openTopic(id) {
    var t = TOPICS.find(function (x) { return x.id === id; });
    if (!t) return;
    var inner = document.getElementById('modal-inner');
    inner.innerHTML =
        '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">' +
        '<span style="font-size:2.5rem">' + t.icon + '</span>' +
        '<div><h2 style="font-family:var(--fd);font-weight:900;font-size:1.3rem">' + t.title + '</h2></div>' +
        '<button class="voicebtn nb" onclick="speak(\'' + t.title + '.\',null)" style="margin-left:auto">🔊</button></div>' +
        t.content.map(function (block) {
            if (block.type === 'text') return '<p style="font-size:.9rem;line-height:1.7;margin-bottom:12px">' + block.en + '</p><p style="font-family:var(--fa);font-size:.83rem;color:var(--txt2);direction:rtl;margin-bottom:18px;line-height:1.65">' + block.ar + '</p>';
            if (block.type === 'tip') return '<div style="background:rgba(255,184,48,.1);border:1.5px solid rgba(255,184,48,.3);border-radius:var(--rsm);padding:14px 18px;margin-bottom:14px;font-size:.88rem;font-weight:700;line-height:1.6">' + block.en + '</div>';
            if (block.type === 'example') return '<div style="background:rgba(29,185,168,.07);border:1.5px solid rgba(29,185,168,.25);border-radius:var(--rsm);padding:14px 18px;margin-bottom:14px;font-size:.87rem;font-style:italic;line-height:1.6"><strong>Example:</strong> ' + block.en + '</div>';
            if (block.type === 'quiz') return '<div style="background:var(--bg2);border:2px solid var(--bdr);border-radius:var(--r);padding:22px;margin-top:16px"><div style="font-size:.9rem;font-weight:800;margin-bottom:6px">🧩 Quick Quiz</div><div style="font-size:.95rem;font-weight:700;margin-bottom:6px">' + block.q + '</div><div style="font-family:var(--fa);font-size:.85rem;color:var(--txt2);direction:rtl;margin-bottom:14px">' + block.qAr + '</div>' + block.opts.map(function (o, i) { return '<div class="lquiz-opt" id="tq-' + i + '" onclick="checkTopicQ(' + i + ',' + block.answer + ',' + block.opts.length + ',\'' + t.id + '\')">' + o + '</div>'; }).join('') + '</div>';
            return '';
        }).join('') +
        '<div style="display:flex;gap:10px;margin-top:24px;flex-wrap:wrap">' +
        '<button class="btn btn-o btn-sm" onclick="readTopicAloud(\'' + t.id + '\')">🔊 Read Aloud</button>' +
        '<button class="btn btn-g btn-sm" onclick="closeModal()">✓ Done</button></div>';
    document.getElementById('modal-bg').classList.add('on');
}

function readTopicAloud(id) {
    var t = TOPICS.find(function (x) { return x.id === id; });
    if (!t) return;
    var txt = t.content.filter(function (c) { return c.type === 'text'; }).map(function (c) { return c.en; }).join('. ');
    speak(txt, null);
}

function checkTopicQ(chosen, correct, n, tid) {
    for (var i = 0; i < n; i++) { var el = document.getElementById('tq-' + i); if (el) el.onclick = null; }
    var el = document.getElementById('tq-' + chosen);
    var elc = document.getElementById('tq-' + correct);
    if (el) el.classList.add(chosen === correct ? 'ok' : 'no');
    if (chosen !== correct && elc) elc.classList.add('ok');
    if (chosen === correct) { speak('Correct! Well done!', null); showToast('✅ Correct answer!'); topicProgress[tid] = 1; updateStat('pts', 20); addAct('📚', 'Topic Quiz', 'Answered correctly', '+20 pts'); }
    else { speak('Not quite! The correct answer is highlighted.', null); showToast('💡 See the correct answer!'); }
}

function closeModal() { document.getElementById('modal-bg').classList.remove('on'); stopAll(); }

// ────────────────────────────────────────────────────
// JOBS
// ────────────────────────────────────────────────────
var jobFilter = 'All';
var jobInterests = [];
try { jobInterests = JSON.parse(localStorage.getItem('bp_interests') || '[]'); } catch (e) { }

function buildJobsPage() {
    var pg = document.getElementById('page-jobs');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')">←</button><h2>💼 Job Search · البحث عن وظيفة</h2></div>' +
        '<div style="padding:32px;max-width:1100px;margin:0 auto">' +
        '<div style="margin-bottom:22px"><h3 style="font-family:var(--fd);font-size:1.25rem;font-weight:900;margin-bottom:5px">Inclusive Job Listings 🌟</h3>' +
        '<p style="color:var(--txt2);font-size:.86rem">All jobs are from inclusive employers who celebrate every talent!</p></div>' +
        '<div class="job-filters" id="job-filters">' +
        ['All', 'Retail', 'Food & Beverage', 'Education', 'Outdoors', 'Office', 'Creative'].map(function (f) {
            return '<button class="jfbtn ' + (jobFilter === f ? 'on' : '') + '" onclick="filterJobs(\'' + f + '\')">' + f + '</button>';
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
            '<h3>' + j.title + '</h3>' +
            '<div class="job-co">🏢 ' + j.company + ' · 📍 ' + j.location + '</div>' +
            '<div class="job-tags">' + j.tags.map(function (t) { return '<span class="job-tag">' + t + '</span>'; }).join('') + '</div>' +
            '<p style="font-size:.8rem;color:var(--txt2);margin-bottom:14px;line-height:1.5">' + j.desc + '</p>' +
            '<div class="job-foot">' +
            '<div><div class="job-match">' + j.match + '%</div><div style="font-size:.66rem;color:var(--txt2);font-weight:700">Match</div></div>' +
            '<div style="display:flex;gap:7px"><button class="voicebtn nb" onclick="speak(\'' + j.title + '. ' + j.desc + '\',null)">🔊</button>' +
            '<button class="int-btn ' + (jobInterests.includes(j.id) ? 'sent' : '') + '" id="intbtn-' + j.id + '" onclick="expressInterest(' + j.id + ',\'' + j.title + '\')">' +
            (jobInterests.includes(j.id) ? '✅ Interested!' : '👋 Express Interest') + '</button></div></div></div>';
    }).join('');
}

function expressInterest(id, title) {
    if (!jobInterests.includes(id)) {
        jobInterests.push(id);
        try { localStorage.setItem('bp_interests', JSON.stringify(jobInterests)); } catch (e) { }
        updateStat('pts', 15); addAct('💼', 'Job Interest', title, '+15 pts');
    }
    var btn = document.getElementById('intbtn-' + id);
    if (btn) { btn.textContent = '✅ Interested!'; btn.classList.add('sent'); btn.style.transform = 'scale(1.12)'; setTimeout(function () { btn.style.transform = ''; }, 400); }
    showToast('🌟 Interest saved for ' + title + '!');
    speak('Great! You have expressed interest in ' + title, null);
}

// ────────────────────────────────────────────────────
// INTERVIEW
// ────────────────────────────────────────────────────
var ivIdx = 0, ivRec = null, ivRecAct = false;

function buildInterviewPage() {
    var pg = document.getElementById('page-interview');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')">←</button><h2>🎤 AI Interview Practice · تدريب على المقابلة</h2><span class="step-badge" style="background:var(--jade)">Step 5 of 5</span></div>' +
        '<div style="background:var(--jade);color:#fff;padding:12px 32px;font-size:.84rem;font-weight:800">🌟 Step 5 — Practice makes perfect! Click Next Question to begin.</div>' +
        '<div class="ivwrap">' +
        '<div style="display:flex;flex-direction:column;gap:16px">' +
        '<div class="iv-bot" id="iv-bot">🤖</div>' +
        '<div class="iv-talk-lbl" id="iv-tlbl">🔊 AI is speaking…</div>' +
        '<div class="sbox"><div id="iv-q">Hi! I\'m your interview coach. Click "Next Question" to begin! 😊</div></div>' +
        '<div><label style="font-size:.9rem;font-weight:800;display:block;margin-bottom:8px">✍️ Your Answer:</label>' +
        '<textarea class="ivtarea" id="iv-ans" placeholder="Click Start Answer and speak, or type here…"></textarea>' +
        '<div class="ivcontrols">' +
        '<button class="ivrecbtn" id="iv-rec" onclick="toggleIVRec()">🎤 Start Answer</button>' +
        '<button class="btn btn-t btn-sm" onclick="submitIV()">✅ Submit Answer</button>' +
        '<button class="btn btn-o btn-sm" onclick="nextIV()">➡️ Next Question</button></div>' +
        '<p style="font-size:.78rem;color:var(--txt2);margin-top:8px;line-height:1.5">💡 Click Start Answer and speak — your voice is automatically converted to text!</p></div>' +
        '<div class="ivfb" id="iv-fb"><div style="font-size:1.3rem;margin-bottom:7px">🌟 Great effort!</div><div class="ivfb-stars" id="iv-stars">⭐⭐⭐⭐⭐</div><p id="iv-fb-txt" style="font-size:.88rem;color:var(--txt2);line-height:1.65"></p></div>' +
        '<div class="ivprog"><div class="ivprog-lbl"><span>Interview Progress</span><span id="iv-plbl">Q 1 of 8</span></div><div class="ivprog-bar"><div class="ivprog-fill" id="iv-pfill" style="width:12%"></div></div></div>' +
        '</div></div>';
    ivIdx = 0;
}

function nextIV() {
    if (ivIdx >= IV_QS.length) { showToast('🎉 Interview complete! You did amazing!'); speak('Congratulations! You completed the full interview!', null); return; }
    var q = IV_QS[ivIdx];
    var qEl = document.getElementById('iv-q');
    if (qEl) qEl.innerHTML = q.q + '<div style="font-family:var(--fa);font-size:.86rem;color:var(--txt2);direction:rtl;margin-top:8px">' + q.qAr + '</div>';
    var ans = document.getElementById('iv-ans'); if (ans) ans.value = '';
    var fb = document.getElementById('iv-fb'); if (fb) fb.classList.remove('on');
    var pct = ((ivIdx + 1) / IV_QS.length) * 100;
    var pf = document.getElementById('iv-pfill'); if (pf) pf.style.width = pct + '%';
    var pl = document.getElementById('iv-plbl'); if (pl) pl.textContent = 'Q ' + (ivIdx + 1) + ' of ' + IV_QS.length;
    var bot = document.getElementById('iv-bot'); var lbl = document.getElementById('iv-tlbl');
    if (bot) bot.classList.add('talk'); if (lbl) lbl.classList.add('on');
    speak(q.q, function () { if (bot) bot.classList.remove('talk'); if (lbl) lbl.classList.remove('on'); });
}

function submitIV() {
    var ans = document.getElementById('iv-ans');
    if (!ans || !ans.value.trim()) { showToast('💬 Please answer first!'); return; }
    var fbArr = IV_FB[ivIdx] || IV_FB[0];
    var msg = fbArr[Math.floor(Math.random() * fbArr.length)];
    var stars = document.getElementById('iv-stars'); if (stars) stars.textContent = '⭐'.repeat(Math.floor(Math.random() * 2) + 4);
    var fbt = document.getElementById('iv-fb-txt'); if (fbt) fbt.textContent = msg;
    var fb = document.getElementById('iv-fb'); if (fb) fb.classList.add('on');
    speak(msg, null); ivIdx++;
    showToast('✅ Answer submitted!'); updateStat('ivs', 1); updateStat('pts', 30);
    addAct('🎤', 'IV Answer', 'Q' + ivIdx, '+30 pts');
}

function toggleIVRec() {
    var btn = document.getElementById('iv-rec');
    if (ivRecAct) {
        try { ivRec.stop(); } catch (e) { }
        ivRecAct = false;
        if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 Start Answer'; }
        return;
    }
    if (!SR) { showNotif('❌ Voice not supported. Use Chrome.'); return; }
    ivRec = new SR(); ivRec.lang = 'en-US'; ivRec.continuous = true; ivRec.interimResults = true;
    ivRec.start(); ivRecAct = true;
    if (btn) { btn.classList.add('rec'); btn.textContent = '🛑 Stop Listening'; }
    showToast('🎤 Listening…');
    ivRec.onresult = function (e) {
        var fin = '';
        for (var i = e.resultIndex; i < e.results.length; i++) if (e.results[i].isFinal) fin += e.results[i][0].transcript;
        var ta = document.getElementById('iv-ans'); if (fin && ta) ta.value = (ta.value + ' ' + fin).trim();
    };
    ivRec.onerror = function (e) { ivRecAct = false; if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 Start Answer'; } showNotif('❌ Mic error: ' + e.error); };
    ivRec.onend = function () { if (ivRecAct) { ivRecAct = false; if (btn) { btn.classList.remove('rec'); btn.textContent = '🎤 Start Answer'; } } };
}

// ────────────────────────────────────────────────────
// DASHBOARD
// ────────────────────────────────────────────────────
var SP = [
    { n: 'Communication', v: 65, c: '#FF6B35' }, { n: 'Organisation', v: 72, c: '#1DB9A8' },
    { n: 'Teamwork', v: 78, c: '#10B981' }, { n: 'Problem Solving', v: 55, c: '#7C3AED' }, { n: 'Punctuality', v: 82, c: '#FFB830' }
];
var dStats = {};
var actLog = [];
try { dStats = JSON.parse(localStorage.getItem('bp_stats') || '{}'); } catch (e) { }

function updateStat(k, n) {
    dStats[k] = (dStats[k] || 0) + n;
    try { localStorage.setItem('bp_stats', JSON.stringify(dStats)); } catch (e) { }
}

function addAct(ico, name, detail, pts) {
    actLog.unshift({ ico: ico, name: name, detail: detail, pts: pts, time: new Date().toLocaleTimeString() });
    if (actLog.length > 12) actLog.pop();
}

function buildDashPage() {
    try { dStats = JSON.parse(localStorage.getItem('bp_stats') || '{}'); } catch (e) { }
    var dpName = 'BrightPath User';
    try { var cv = JSON.parse(localStorage.getItem('bp_cv') || '{}'); if (cv.name) dpName = cv.name; } catch (e) { }
    var pg = document.getElementById('page-dashboard');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')">←</button><h2>📊 Progress Dashboard · لوحة التقدم</h2></div>' +
        '<div class="dashwrap"><div class="dashgrid">' +
        '<div style="display:flex;flex-direction:column;gap:16px">' +
        '<div class="card dp-card"><div class="dp-ava">😊</div><div class="dp-name">' + dpName + '</div><div class="dp-tag">BrightPath Member ⭐</div>' +
        '<div class="badges" style="margin-top:12px"><div class="bdg" style="background:rgba(255,107,53,.15)">🏆</div><div class="bdg" style="background:rgba(29,185,168,.15)">📄</div><div class="bdg" style="background:rgba(16,185,129,.15)">🎤</div><div class="bdg" style="background:rgba(124,58,237,.15)">🧩</div><div class="bdg" style="background:rgba(255,184,48,.15)">📚</div></div></div>' +
        '<div class="card" style="padding:18px"><div style="font-size:.82rem;font-weight:900;margin-bottom:10px">🗺️ Journey Progress</div>' +
        [['Assessment', 'tests'], ['CV Built', 'cvs'], ['Interview', 'ivs']].map(function (s) {
            return '<div style="display:flex;align-items:center;gap:9px;padding:7px 0;border-bottom:1px solid var(--bdr);font-size:.79rem;font-weight:700"><span>' + (dStats[s[1]] > 0 ? '✅' : '⭕') + '</span><span>' + s[0] + '</span></div>';
        }).join('') + '</div></div>' +
        '<div style="display:flex;flex-direction:column;gap:18px">' +
        '<div class="stats-row">' +
        [['📋', 'tests', 'Tests'], ['📄', 'cvs', 'CVs'], ['🎤', 'ivs', 'Interviews'], ['⭐', 'pts', 'Points']].map(function (s) {
            return '<div class="card scard"><div class="sc-ico">' + s[0] + '</div><div class="sc-val">' + (dStats[s[1]] || 0) + '</div><div class="sc-lbl">' + s[2] + '</div></div>';
        }).join('') + '</div>' +
        '<div class="card dc"><h3>📋 Recent Activity</h3>' + (actLog.length ? actLog.map(function (a) {
            return '<div class="act-item"><div class="ai-ico">' + a.ico + '</div><div class="ai-info"><strong>' + a.name + '</strong><span>' + a.detail + ' · ' + a.time + '</span></div><div class="ai-pts">' + a.pts + '</div></div>';
        }).join('') : '<p style="font-size:.82rem;color:var(--txt2)">No activities yet. Start your journey!</p>') + '</div>' +
        '<div class="card dc"><h3>📈 Skill Progress</h3>' + SP.map(function (s) {
            return '<div class="skp"><div class="skp-top"><span>' + s.n + '</span><span>' + s.v + '%</span></div><div class="skp-bar"><div class="skp-fill" style="width:' + s.v + '%;background:' + s.c + '"></div></div></div>';
        }).join('') + '</div></div></div></div>';
}

// ────────────────────────────────────────────────────
// ABOUT (with full team - Ahmad Yasser first)
// ────────────────────────────────────────────────────
function buildAboutPage() {
    var pg = document.getElementById('page-about');
    pg.innerHTML =
        '<div class="phdr"><button class="backbtn" onclick="showPage(\'home\')">←</button><h2>👥 About BrightPath · عن مسار مشرق</h2></div>' +
        '<div style="padding:32px;max-width:1100px;margin:0 auto">' +
        '<div style="background:linear-gradient(135deg,var(--sun),var(--gold));border-radius:var(--rlg);padding:44px;text-align:center;color:#fff;margin-bottom:40px">' +
        '<div style="font-size:3.5rem;margin-bottom:12px">🌟</div>' +
        '<div style="font-family:var(--fd);font-size:2.6rem;font-weight:900;margin-bottom:5px">BrightPath</div>' +
        '<p style="opacity:.9;max-width:500px;margin:0 auto;line-height:1.7;font-size:.9rem">An AI-powered career platform designed with love for people with Down Syndrome. Empowering every person to find their perfect career path.</p></div>' +

        '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:44px">' +
        [['📋', 'Take the Test', 'Answer 5 questions to find your perfect job!'], ['📄', 'Build Your CV', 'Use voice or typing to create your professional CV.'], ['🧩', 'Play Games', 'Fun games that build memory, focus, and maths skills!'], ['🎤', 'Practice Interview', 'Talk to our AI coach and get feedback on your answers!']].map(function (item) {
            return '<div style="background:var(--surf);border:2px solid var(--bdr);border-radius:var(--r);padding:26px 18px;text-align:center">' +
                '<div style="font-size:2rem;margin-bottom:10px">' + item[0] + '</div><h3 style="font-size:.88rem;font-weight:800;margin-bottom:7px">' + item[1] + '</h3>' +
                '<p style="font-size:.76rem;color:var(--txt2);line-height:1.5">' + item[2] + '</p></div>';
        }).join('') + '</div>' +

        '<div class="stag">Our Team · فريقنا</div>' +
        '<h2 class="stitle" style="margin-bottom:24px">The People Behind BrightPath 💛</h2>' +
        '<div class="team-grid">' + TEAM.map(function (t) {
            return '<div class="card tmc">' +
                '<div class="tm-ava">' + t.e + '</div>' +
                '<div class="tm-name">' + t.n + '</div>' +
                '<div class="tm-role">' + t.r + '</div>' +
                '<div class="tm-desc">' + t.desc + '</div>' +
                '<div class="tm-socials"><span class="tm-soc">🔗</span><span class="tm-soc">💼</span><span class="tm-soc">✉️</span></div></div>';
        }).join('') + '</div></div>';
}

// ────────────────────────────────────────────────────
// THEME / LANG / FONT
// ────────────────────────────────────────────────────
var fontStep = 0;
function changeFontSize(dir) {
    fontStep = Math.max(-2, Math.min(3, fontStep + dir));
    var base = 1 + fontStep * 0.1;
    document.documentElement.style.setProperty('--fs', base + 'rem');
    showToast(dir > 0 ? '🔠 Text bigger' : '🔡 Text smaller');
}

function toggleTheme() {
    var t = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
    document.documentElement.removeAttribute('data-contrast');
    document.getElementById('theme-icon').textContent = t === 'dark' ? '☀️' : '🌙';
    showToast(t === 'dark' ? '🌙 Dark mode on' : '☀️ Light mode on');
}

function toggleContrast() {
    var has = document.documentElement.hasAttribute('data-contrast');
    if (has) document.documentElement.removeAttribute('data-contrast');
    else document.documentElement.setAttribute('data-contrast', 'high');
    showToast(has ? '◑ Normal contrast' : '◑ High contrast on');
}

var isAR = false;
function toggleLang() {
    isAR = !isAR;
    var lang = isAR ? 'ar' : 'en';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.setAttribute('dir', isAR ? 'rtl' : 'ltr');
    document.getElementById('lang-btn').textContent = isAR ? '🌐 EN' : '🌐 AR';
    showToast(isAR ? '🌐 Arabic / عربي' : '🌐 English');
}

// ────────────────────────────────────────────────────
// HAMBURGER MENU
// ────────────────────────────────────────────────────
function toggleMenu() {
    var h = document.getElementById('hamburger');
    var m = document.getElementById('mobile-menu');
    h.classList.toggle('open');
    if (h.classList.contains('open')) { m.style.display = 'flex'; setTimeout(function () { m.classList.add('open'); }, 10); }
    else { m.classList.remove('open'); setTimeout(function () { m.style.display = 'none'; }, 350); }
}

function closeMenu() {
    var h = document.getElementById('hamburger');
    var m = document.getElementById('mobile-menu');
    h.classList.remove('open');
    m.classList.remove('open');
    setTimeout(function () { m.style.display = 'none'; }, 350);
}

// ────────────────────────────────────────────────────
// TESTIMONIALS
// ────────────────────────────────────────────────────
var tIdx = 0;
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
    var tt = document.getElementById('ttrack');
    var d = document.getElementById('tdots');
    if (!tt || !d) return;
    var n = tt.querySelectorAll('.tcard').length;
    d.innerHTML = Array.from({ length: n }, function (_, i) {
        return '<div class="tdot ' + (i === 0 ? 'on' : '') + '" onclick="tIdx=' + i + ';document.getElementById(\'ttrack\').style.transform=\'translateX(-\'+(' + i + '*370)+\'px)\';updateDots()"></div>';
    }).join('');
    setInterval(function () {
        var tt2 = document.getElementById('ttrack');
        if (!tt2) return;
        var cards2 = tt2.querySelectorAll('.tcard');
        if (tIdx >= cards2.length - 1) tIdx = 0; else tIdx++;
        tt2.style.transform = 'translateX(-' + (tIdx * 370) + 'px)';
        updateDots();
    }, 4800);
}

// ────────────────────────────────────────────────────
// COUNTERS
// ────────────────────────────────────────────────────
function countUp(id, target) {
    var el = document.getElementById(id); if (!el) return;
    var n = 0, step = Math.ceil(target / 60);
    var iv = setInterval(function () {
        n = Math.min(n + step, target);
        el.textContent = n.toLocaleString() + '+';
        if (n >= target) clearInterval(iv);
    }, 22);
}

// ────────────────────────────────────────────────────
// TOAST (FIXED - disappears automatically)
// ────────────────────────────────────────────────────
var toastTimer = null;
function showToast(msg) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('on');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('on'); toastTimer = null; }, 3000);
}

function showNotif(msg) {
    var n = document.getElementById('notif');
    n.textContent = msg;
    n.classList.add('on');
    setTimeout(function () { n.classList.remove('on'); }, 4000);
}

// ────────────────────────────────────────────────────
// INIT
// ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    // Init Three.js hero and GSAP (wait for CDN libs)
    function tryInitLibs(tries) {
        if (typeof THREE !== 'undefined' && typeof gsap !== 'undefined') {
            initHeroThree();
            initGSAP();
        } else if (tries > 0) {
            setTimeout(function () { tryInitLibs(tries - 1); }, 300);
        }
    }
    tryInitLibs(15);
    countUp('c1', 14200);
    countUp('c2', 8900);
    countUp('c3', 3800);
    setTimeout(initTesti, 600);
    // Close mobile menu on outside click
    document.addEventListener('click', function (e) {
        var h = document.getElementById('hamburger');
        var m = document.getElementById('mobile-menu');
        if (h && m && !h.contains(e.target) && !m.contains(e.target) && m.classList.contains('open')) closeMenu();
    });
    // Close voice guide on outside click
    document.getElementById('vcg-modal').addEventListener('click', function (e) {
        if (e.target === this) closeVoiceGuide();
    });
    // Close lesson modal on outside click
    document.getElementById('modal-bg').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });
});

// ────────────────────────────────────────────────────
// THREE.JS HERO BACKGROUND
// ────────────────────────────────────────────────────
function initHeroThree() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    var W = canvas.offsetWidth || window.innerWidth;
    var H = canvas.offsetHeight || 500;
    canvas.width = W; canvas.height = H;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.z = 45;

    // Floating particles
    var geo = new THREE.BufferGeometry();
    var count = 140;
    var pos = new Float32Array(count * 3);
    var vel = new Float32Array(count * 3);
    for (var i = 0; i < count * 3; i += 3) {
        pos[i] = (Math.random() - 0.5) * 80;
        pos[i + 1] = (Math.random() - 0.5) * 50;
        pos[i + 2] = (Math.random() - 0.5) * 30;
        vel[i] = (Math.random() - 0.5) * 0.02;
        vel[i + 1] = (Math.random() - 0.5) * 0.02;
        vel[i + 2] = 0;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    var mat = new THREE.PointsMaterial({ color: 0xFF6B35, size: 1.0, transparent: true, opacity: 0.7 });
    var particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Connection lines group
    var lineGroup = new THREE.Group();
    scene.add(lineGroup);

    var clock = new THREE.Clock();
    var animId;

    function animate() {
        animId = requestAnimationFrame(animate);
        var t = clock.getElapsedTime();
        // Move particles
        for (var j = 0; j < count * 3; j += 3) {
            pos[j] += vel[j];
            pos[j + 1] += vel[j + 1];
            if (Math.abs(pos[j]) > 40) vel[j] *= -1;
            if (Math.abs(pos[j + 1]) > 25) vel[j + 1] *= -1;
        }
        geo.attributes.position.needsUpdate = true;
        particles.rotation.y = t * 0.03;

        // Update line connections
        while (lineGroup.children.length) lineGroup.remove(lineGroup.children[0]);
        for (var a = 0; a < count; a += 4) {
            for (var b = a + 4; b < count; b += 4) {
                var dx = pos[a * 3] - pos[b * 3];
                var dy = pos[a * 3 + 1] - pos[b * 3 + 1];
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 14) {
                    var lGeo = new THREE.BufferGeometry().setFromPoints([
                        new THREE.Vector3(pos[a * 3], pos[a * 3 + 1], pos[a * 3 + 2]),
                        new THREE.Vector3(pos[b * 3], pos[b * 3 + 1], pos[b * 3 + 2])
                    ]);
                    var lMat = new THREE.LineBasicMaterial({ color: 0x1DB9A8, transparent: true, opacity: (1 - dist / 14) * 0.4 });
                    lineGroup.add(new THREE.Line(lGeo, lMat));
                }
            }
        }
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', function () {
        var nw = canvas.offsetWidth || window.innerWidth;
        var nh = canvas.offsetHeight || 500;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
    });
}

// ────────────────────────────────────────────────────
// GSAP ANIMATIONS
// ────────────────────────────────────────────────────
function initGSAP() {
    if (typeof gsap === 'undefined') return;
    if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

    // Hero entrance
    gsap.fromTo('.hero-badge', { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)', delay: 0.2 });
    gsap.fromTo('.hero h1', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.4 });
    gsap.fromTo('.hero p', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.6 });
    gsap.fromTo('.hero-btns', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.8 });
    gsap.fromTo('.hero-stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 1.0 });

    // Feature cards stagger
    gsap.fromTo('.feat-card', { opacity: 0, y: 40, scale: 0.95 },
        {
            opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out', stagger: 0.12,
            scrollTrigger: { trigger: '.features-grid', start: 'top 80%', toggleActions: 'play none none reset' }
        });

    // Journey cards
    gsap.fromTo('.jcard', { opacity: 0, x: -30 },
        {
            opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1,
            scrollTrigger: { trigger: '.journey-grid', start: 'top 80%', toggleActions: 'play none none reset' }
        });

    // Stats section
    gsap.fromTo('.stat-item', { opacity: 0, scale: 0.8 },
        {
            opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.2)', stagger: 0.15,
            scrollTrigger: { trigger: '.stats-section', start: 'top 85%', toggleActions: 'play none none reset' }
        });

    // Testimonials
    gsap.fromTo('.tcard', { opacity: 0, y: 30 },
        {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.18,
            scrollTrigger: { trigger: '.testimonials', start: 'top 80%', toggleActions: 'play none none reset' }
        });

    // Team cards
    gsap.fromTo('.tmc', { opacity: 0, y: 40, scale: 0.9 },
        {
            opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.1)', stagger: 0.1,
            scrollTrigger: { trigger: '.team-grid', start: 'top 80%', toggleActions: 'play none none reset' }
        });

    // Feat cards hover
    document.querySelectorAll('.feat-card').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            gsap.to(card, { y: -6, scale: 1.03, duration: 0.25, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', function () {
            gsap.to(card, { y: 0, scale: 1, duration: 0.25, ease: 'power2.in' });
        });
    });
}

// Called after page switch to re-run card animations on newly visible pages
function runPageGSAP(pageId) {
    if (typeof gsap === 'undefined') return;
    var targets = {
        'games': '.game-card',
        'learn': '.topic-card',
        'jobs': '.job-card',
        'about': '.tmc',
        'dashboard': '.scard, .dc'
    };
    var sel = targets[pageId];
    if (sel) {
        gsap.fromTo(sel,
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08, delay: 0.1 });
    }
}
