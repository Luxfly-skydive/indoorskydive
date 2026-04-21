(function () {
  'use strict';

  // ─── Knowledge Base ────────────────────────────────────────────────────────
  const KB = {
    skydive_for_me: {
      keywords: ['book a flight','book a single flight','is it ok if i fly','can i book a flight','can i fly here','i want to skydive','i want to fly','i want to try','can i fly here','can i do indoor skydiving','adult skydiving','skydive for me','fly myself','my first flight','want to come fly','indoor skydiving for me','just me','solo booking','single ticket','individual booking','single flight','individual flight','not a party','not for a party','no birthday','without a birthday','not a birthday','no party','alone','just myself','solo','couple','me and my partner','me and my friend','just two of us','2 adults','couple flight','date night'],
      response: () => `Sounds like you are looking for a **regular adult or single flight**, not a birthday party. You are on the birthday-only site, so here's where to go:\n\n✈️ **Adult packages (LUXCOVERY / LUXENSATION / LUXEMOTION):** https://indoorskydive.lu/en/chute-libre/tarifs-adultes\n🎁 **Gift vouchers:** https://indoorskydive.lu/en/gift-voucher\n🌐 **Main LUXFLY site:** https://indoorskydive.lu\n\nIf you are looking to celebrate a child\u2019s or teen\u2019s birthday — stay here and ask me about prices or booking. 🎂`
    },
    adult_pricing: {
      keywords: ['adult price','adult prices','adult cost','grown-up price','grown up price','price for adults','how much for adults','adult package price','adult rate','individual adult price','solo flight price','LUXCOVERY price','LUXENSATION price','LUXEMOTION price','package for adults','adult tickets'],
      response: () => `This site only lists **birthday party prices** (kids 4\u201313 and teens 14\u201317).\n\nFor **adult flight packages** (LUXCOVERY, LUXENSATION, LUXEMOTION and Basic), here is the right page:\n\n👉 **https://indoorskydive.lu/en/chute-libre/tarifs-adultes**\n\nIf you want an adult at a kids or teen birthday, adults can watch for free from the amphitheatre \u2014 they just can\u2019t fly on a birthday package.`
    },
    pro_training: {
      keywords: ['pro flyer','professional flyer','pro training','coaching','coach','instructor course','become an instructor','training course','skill progression','body flight','freefly','tracking course','dynamic flight','vertical flight','advanced coaching','flying lessons','learn to fly'],
      response: () => `Pro-flyer training, coaching and advanced body-flight courses are handled by the main LUXFLY site, not here.\n\n👉 **https://indoorskydive.lu/en/pro-flyers**\n\nThis birthday site is focused on kids (4\u201313) and teens (14\u201317) parties. 🎂`
    },
    art_museum: {
      keywords: ['museum','art of skydiving','exhibition','history of skydiving','skydiving history','skydive museum','museum ticket','museum entry','museum hours','museum price'],
      response: () => `The **Art of Skydiving museum** is part of the main LUXFLY venue, not part of the birthday site.\n\n👉 Visit the main site: **https://indoorskydive.lu**\n\nMuseum access is included with the adult flight packages. For birthday parties, parents and guests have full access to the viewing amphitheatre instead.`
    },
    corporate_events: {
      keywords: ['team building','teambuilding','team-building','corporate event','corporate booking','corporate day','company event','company outing','company day','work event','office party','colleagues','incentive','business event','group booking over 30','over 30 people','over 50 people'],
      response: () => `Corporate events and team-building days are organised by LUXFLY directly \u2014 not through this birthday site.\n\n👉 **Main site:** https://indoorskydive.lu\n📧 For a corporate quote: **hello@luxfly.eu**\n\nThis site only covers kids (4\u201313) and teen (14\u201317) birthday bookings. 🎂`
    },
    bachelor_events: {
      keywords: ['bachelor','bachelorette','hen do','hen party','stag do','stag party','bachelor party','bachelorette party','evjf','evg','enterrement'],
      response: () => `Bachelor / hen / stag parties are not birthday packages. 🥂\n\nFor group flights for adults, email **hello@luxfly.eu** directly \u2014 the main LUXFLY team will build a custom package for you. You can also look at adult pricing: **https://indoorskydive.lu/en/chute-libre/tarifs-adultes**`
    },
    wedding_events: {
      keywords: ['wedding','wedding guest','wedding activity','wedding anniversary','anniversary','anniversary gift'],
      response: () => `Weddings and anniversaries are not part of the birthday-only packages on this site. For a custom experience, contact LUXFLY directly: **hello@luxfly.eu** or visit **https://indoorskydive.lu**.\n\nFor a one-off anniversary gift, a **gift voucher** is usually the easiest solution: https://indoorskydive.lu/en/gift-voucher 🎁`
    },
    greeting_explicit: {
      keywords: ['how are you', 'how is it going', 'how you doing', 'whats up', "what's up", 'how r u', 'how r you', 'hows things', "how's things", 'are you a bot', 'are you human', 'who are you', 'what are you', 'tell me about yourself'],
      response: () => `I'm good, thanks for asking! 😊 I'm the LUXFLY Birthday chatbot — I can help you plan a kids or teen birthday party here at LUXFLY.\n\nTry asking about **prices**, **HighFly**, **age limits**, **what to wear**, **add-ons**, **opening hours**, or **how to book**. What would you like to know?`
    },

    prices: {
      keywords: [
        'price','prices','cost','costs','how much','how much is it','how much does it cost','package','packages',
        'rate','rates','pricing','tariff','tarifs','prix','combien','fee','fees','charge','pay','ticket','tickets',
        'kostet','kosten','preis','preise','what is the price','what do you charge','how much per',
        
        'tell me the prices','show me prices','list of packages','package price','package prices',
        'how much for 6','how much for 10','how much for a group','price per child','price per teen','euro','euros','€',
        'full price','total price','final price','price list','pricelist','what does it cost','how expensive',
        'expensive','budget','affordable'
      ],
      response: () => `Here are our birthday package prices:\n\n**🎂 KIDS (4–13)**\n• Weekday (Mon–Fri): **€32/child**\n• Weekend (Sat–Sun): **€69.16/child** for the first 6, then **€59/child** from the 7th\n\n**🚀 TEENS (14–17)**\n• Weekday: **€45/teen**\n• Weekend: **€79/teen** for the first 6, then **€59/teen** from the 7th\n\n**➕ HighFly upgrade:** +€15/person (strongly recommended)\n\nMinimum 6 participants per booking. All packages include briefing, full equipment, 2 flights per flyer, instructor demo, diploma, private birthday room with tableware, unlimited water and flavoured water, and music. 🎉`
    },

    kids_price: {
      keywords: ['kids price','teen price','children prices','teens prices','kids party','kid party','kids party cost','kid party cost','cost of a kids party','cost of a kid party','price of a kids party','children party','child party','how much for my son','how much for my daughter','how much for a child','price per child','cost per child','my son price','my daughter price','my child price','price for one kid','per kid',
        'kids package','children package','kids pricing','kid price','child price','how much for kids','how much for a child','how much for children',
        'kids rate','kid rate','children rate','price for child','price for kids','price for my son','price for my daughter',
        '4 year old price','5 year old price','6 year old price','7 year old price','8 year old price','9 year old price','10 year old price','11 year old price','12 year old price','13 year old price',
        'kid weekday','kid weekend','children weekday','children weekend','prix enfant','kindertarif'
      ],
      response: () => `**Kids birthday pricing (ages 4–13):**\n\n• **Weekday (Mon–Fri): €32/child** — all children same rate\n• **Weekend (Sat–Sun): €69.16/child** for the first 6, then **€59/child** from the 7th onwards\n\n**Minimum 6 children per booking.**\n\nIncludes briefing, full gear, 2 flights, instructor demo, diploma, private birthday room, tableware, unlimited water and flavoured water, music. 🎂`
    },

    teen_price: {
      keywords: ['teen party','teens party','teen birthday party','teenager party','teen party price','teens party cost','cost of a teen party','price of a teen party','teen price','teens price','teenager price','ado price','how much is the teen package','how much for a teen','how much for a teenager','teen package price','teens package price','price for a teen','cost for a teen','cost for teens',
        'teen package','teens package','teen pricing','teens pricing','teen rate','teens rate','ados price','ado price',
        'how much for teen','how much for teens','price for teen','price for teens','price for my teenager','teenage price',
        '14 year old price','15 year old price','16 year old price','17 year old price',
        'teen weekday','teen weekend','teenager','teenagers','adolescent','adolescents'
      ],
      response: () => `**Teen birthday pricing (ages 14–17):**\n\n• **Weekday (Mon–Fri): €45/teen** — all participants same rate\n• **Weekend (Sat–Sun): €79/teen** for the first 6, then **€59/teen** from the 7th onwards\n\n**Minimum 6 teens per booking.**\n\nIncludes briefing, full gear, 2 flights per teen with a dedicated instructor, instructor demo, diploma, private party room, tableware, unlimited water, music. 🚀\n\nHighFly upgrade (+€15/teen) is strongly recommended — teens love the extra speed and altitude.`
    },

    weekend_price: {
      keywords: ['saturday rate','sunday rate','weekend rate','saturday price','sunday price','weekend party','saturday party','sunday party','10 kids on saturday','cost on saturday','cost on sunday','on a saturday','on a sunday','weekend party price','party on saturday','party on sunday','saturday weekend','saturday booking price','sunday booking price',
        'weekend price','saturday price','sunday price','weekend rate','weekend cost','saturday cost','sunday cost',
        'sat sun price','weekend booking price','how much weekend','weekend per child','weekend per teen',
        'price on saturday','price on sunday','price for weekend','weekend kids','weekend teens',
        '6 kids weekend','6 teens weekend','7th child price','7th teen price','after 6 price','discount after 6'
      ],
      response: () => `**Weekend pricing (Saturday & Sunday):**\n\n**Kids (4–13):** €69.16/child for the first 6, then **€59/child** from the 7th onwards\n**Teens (14–17):** €79/teen for the first 6, then **€59/teen** from the 7th onwards\n\nSo a group of 10 kids on Saturday = (6 × €69.16) + (4 × €59) = **€650.96 total**. Minimum 6 participants.`
    },

    weekday_price: {
      keywords: ['weekday price','monday price','tuesday price','wednesday price','thursday price','friday price','weekday rate','weekday cost','weekday party','cheapest day','cheap day','best weekday price',
        'weekday price','monday price','tuesday price','wednesday price','thursday price','friday price',
        'weekday rate','weekday cost','mon fri price','week day price','cheapest day','cheap day','cheapest price',
        'best price','best rate','lowest price','most affordable','what is the weekday price','weekday booking'
      ],
      response: () => `**Weekday pricing (Monday–Friday) — our best rate:**\n\n**Kids (4–13):** **€32/child** — same rate for every child\n**Teens (14–17):** **€45/teen** — same rate for every teen\n\nMinimum 6 participants per booking. No tiered pricing on weekdays — same rate from first to last flyer. 👍`
    },

    included: {
      keywords: [
        'include','included','what do we get','what comes with','what is included','what is in the package','what comes in',
        'equipment','gear','what is provided','briefing','diploma','party room','birthday room','music','water','tableware',
        'whats included','what do i get','in the package','comes with','everything included','all included','all in one',
        'glasses','plates','cutlery','napkins','flavoured water','still water','unlimited water','music system',
        'flight suit','helmet','goggles','earplugs','what equipment','equipment provided','gear provided'
      ],
      response: () => `**Every birthday package includes:**\n\n✅ Safety briefing by a certified instructor\n✅ Full equipment — flight suit, helmet, goggles, earplugs\n✅ **2 flights** per participant, one-on-one with the instructor inside the tunnel\n✅ Instructor demonstration flight\n✅ Personalised LUXFLY diploma\n✅ **Private birthday room** with tableware (glasses, plates, cutlery, napkins)\n✅ **Unlimited water and flavoured water**\n✅ Music in the party room\n\nYou can bring your own cake and decorations. 🎂`
    },

    highfly: {
      keywords: [
        'highfly','high fly','high-fly','upgrade','premium','high speed','higher speed','faster flight','better flight',
        'what is highfly','should i add highfly','highfly price','highfly cost','add highfly','highfly option',
        'more speed','extra speed','bigger flight','advanced flight','premium flight','vip flight','worth highfly'
      ],
      response: () => `**HighFly** is our premium flight upgrade — **+€15 per person** on top of any package.\n\n🚀 Higher wind speed, more altitude, harness-assisted with the instructor. Strongly recommended — kids love it and teens get a real adrenaline rush.\n\nYou can add HighFly during booking, **per participant** — not everyone in the group has to take it. It's the single most common add-on parents pick.`
    },

    addons: {
      keywords: [
        'add-on','add ons','addon','extras','extra','souvenir','photo','photos','picture','pictures','memory',
        'magnet','magnets','souvenir magnet','soft drinks','drinks kit','drinks','gift pouch','checkout options',
        'options at checkout','what can i add','what extras','any extras','extra options','optional','optional extras',
        'souvenir photo','individual photo','souvenir','pouch','personalised magnet','drink kit','soft drink'
      ],
      response: () => `**Optional extras at checkout:**\n\n📸 **Souvenir photo** — €15/booking. Individual photo during the flight, emailed after the session.\n🧲 **LUXFLY souvenir magnet** — €3.50/child. Personalised magnet in a gift pouch, one per child.\n🥤 **Soft drinks kit** — €3/child. A choice of soft drinks for the children.\n\nMagnets and drinks default to the number of participants; you can adjust the quantity before paying. HighFly (+€15/person) is also offered at checkout.`
    },

    ages: {
      keywords: ['book for my 14 year old','book for my 15 year old','book for my 16 year old','book for my 17 year old','book for my teenager','book for my teen','book for my kid','book for my son','book for my daughter','is it ok for my teen','is it ok for my kid','is it ok for my teenager',
        'age','old','minimum age','how old','age limit','age requirement','youngest','too young','too old','toddler',
        '4 year','four year','5 year','6 year','7 year','8 year','9 year','10 year','11 year','12 year','13 year','14 year','15 year','16 year','17 year','18 year',
        'kids age','teen age','what age','what ages','my kid is','my son is','my daughter is','my child is','my teenager is',
        'child age','childrens age','age range','age group','can my','can a 4','can a 5','can my 4 year old',
        'my kid wants','my son wants','my daughter wants','my nephew','my niece','my grandchild','grandchild','grandson','granddaughter'
      ],
      response: () => `**Age requirements:**\n\n🎂 Kids package: **ages 4–13**\n🚀 Teen package: **ages 14–17** (dedicated, more dynamic experience)\n\n**Minimum age to fly: 4 years old.** Children under 12 must have an adult on site during the session. No upper age limit for birthday flyers within the package age groups.\n\nFor an adult flying — that's handled by the main LUXFLY site: **indoorskydive.lu**`
    },

    adult_flying: {
      keywords: ['grown ups','grown-ups','grownups','grownup','grown up','grown-up','can my husband','husband fly','wife fly','partner fly','corporate event','team building','team-building','corporate event','corporate','teambuilding','team building event','corporate party','company event','business event','office party',
        'adult','adults','grown up','grownup','grown-up','my husband','my wife','my partner','myself','for me','my age',
        'over 17','over 18','over 20','over 30','over 40','over 50','over 60','over 70','too old to fly','am i too old',
        'can i fly','i want to fly','parent fly','parents fly','mum fly','dad fly','mom flying','dad flying','adult package','adult price','luxcovery','luxensation','luxemotion',
        '20 year old','30 year old','40 year old','50 year old','60 year old','70 year old','80 year old','adult guest'
      ],
      response: () => `This site covers **birthday packages for kids (4–13) and teens (14–17) only**. 🎂\n\nFor adult flights (LUXCOVERY, LUXENSATION, LUXEMOTION), pro-flyer packages and the Art of Skydiving museum, please visit the main LUXFLY site:\n\n👉 **https://indoorskydive.lu**\n\nParents are of course welcome on site to watch — see the amphitheatre viewing area. 😊`
    },

    weight: {
      keywords: [
        'weight','heavy','how heavy','weight limit','maximum weight','max weight','kg','overweight','weight restriction',
        'body weight','too heavy','can i fly if','weight 100','weight 110','weight 120','weight 90','weight 80','100 kg','110 kg','120 kg',
        'poids','gewicht','kilos','large person','bigger person','plus size'
      ],
      response: () => `Maximum weight per flyer is **120 kg**. Wind speed is calibrated to each flyer's body weight, so there's no fixed setting everyone has to fit — smaller kids get gentler airflow, heavier teens get stronger airflow. 👍`
    },

    health: {
      keywords: ['fly with asthma','fly with a heart','fly with shoulder','fly with a bad back','fly with back pain','fly with injury','child fly with','child fly if','my child fly if','my child fly with','flying with asthma','flying with heart','flying with shoulder','can my child fly with','bad back','back pain','back injury','back problem','back issue','bad knee','bad shoulder','my shoulder','any medical','medical issue','fitness','fit to fly','fit enough','my health',
        'health','healthy','restriction','restrictions','medical','heart','shoulder','dislocation','injury',
        'safe','safety','condition','medical condition','can i fly','is it safe','is this safe','is it dangerous','dangerous',
        'back pain','broken bone','arm','leg','knee','disability','disabled','autistic','autism','adhd',
        'asthma','seizure','epilepsy','claustrophobic','claustrophobia','panic attack','anxiety','fear of heights','vertigo',
        'wheelchair','glasses','contact lenses','braces','stitches'
      ],
      response: () => `**Flying is not suitable if you have:**\n\n⚠️ Previous shoulder dislocation\n⚠️ A heart condition\n⚠️ Pregnancy\n\nEveryone else is welcome — including grandparents. All flights are supervised by a certified instructor inside the tunnel. The chamber is fully padded and you never leave the ground level.\n\n🎯 **No vertigo** — you never gain altitude in the traditional sense. It feels like floating on air, not falling.\n\nIf you're unsure about a specific condition, email **hello@luxfly.eu** — our team will advise. Glasses are fine; we provide goggles that fit over them.`
    },

    wear: {
      keywords: [
        'wear','clothes','clothing','what to wear','dress','outfit','shoes','trainers','sneakers','hair','jewellery','jewelry',
        'what should we wear','what should i wear','what to bring','dress code','attire','flight suit','can i wear',
        'jeans','shorts','skirt','dress (clothing)','leggings','trousers','socks','ring','rings','earrings','necklace',
        'long hair','tied back','closed shoes','open shoes','sandals','flip flops','boots','makeup','nails'
      ],
      response: () => `**What to wear on the day:**\n\n👟 **Lace-up trainers** (no sandals, flip-flops or slip-ons)\n👕 **Fitted, comfortable clothing** — leggings, joggers, t-shirts. Avoid skirts, dresses or very loose tops.\n💁 **Long hair tied back**\n💍 Leave jewellery and watches at home if possible\n\n**We provide:** flight suit, helmet, goggles, earplugs. Glasses can be worn under the goggles.\n\nArrive 15 minutes before your slot to suit up.`
    },

    bring: {
      keywords: ['can I bring','can we bring','can you bring','do i need to bring','do we need to bring','should i bring','should we bring','what to bring','is it ok to bring','allowed to bring','bring your own','own food','own drinks','own snacks','own cake','own decorations','own candles',
        'bring','what do i bring','what should i bring','what do we bring','what should we bring','do i need to bring',
        'cake','birthday cake','food','snacks','decorations','decoration','balloons','candles','cutlery','napkins',
        'camera','phone','water bottle','drinks to bring','own drinks','own food','own snacks','own cake'
      ],
      response: () => `**You can bring:**\n\n🎂 Your own **birthday cake**\n🍿 Snacks, candy, treats\n🎈 Decorations, balloons, banners\n📷 Camera and phone for photos\n\n**We provide:** the birthday room with tableware (glasses, plates, cutlery, napkins), unlimited water and flavoured water, music, and all flight equipment (suit, helmet, goggles, earplugs). You don't need to bring plates or cups. 👍`
    },

    duration: {
      keywords: [
        'duration','how long','length','time','takes','how much time','party length','total time','party duration',
        'time slot','how long will it take','how long does it last','how long is it','how long is the party',
        'flight duration','minute','minutes','one minute','per flight','each flight','how long is each flight',
        'arrival time','when to arrive','how early','how soon'
      ],
      response: () => `**Plan for 1.5 to 2 hours total.**\n\n⏱️ **~15 min** — arrival, welcome, suit-up\n⏱️ **~10 min** — safety briefing\n⏱️ **~15 min** — 2 flights per flyer (each flight ≈ 60 seconds, plus changeovers between flyers)\n⏱️ **~5 min** — instructor demo\n⏱️ **~30–45 min** — private birthday room time for cake and celebration\n\nArrive 15 minutes before your scheduled slot. The whole group finishes around the same time.`
    },

    group_size: {
      keywords: [
        'group','minimum','min','booking size','how many','minimum group','group size','group of','how many kids','how many teens',
        'minimum number','minimum 6','maximum group','max group','biggest group','largest group','24','how big','small group',
        'group booking','large booking','can i book for 3','can i book for 4','can i book for 5','can i book for 2'
      ],
      response: () => `**Minimum booking size: 6 participants.**\n\nGroups up to ~24 are welcome. On weekends, the first 6 are at the weekend rate, and each additional flyer from the 7th onwards gets a discounted rate (**€59/child or teen**).\n\nIf you have fewer than 6, you can join a public Open Day or book individually via the main LUXFLY site.`
    },

    location: {
      keywords: ['adress','adres','where exactly','where is it','where are you based','where to find you','where to go',
        'where','location','address','how to get there','directions','map','parking','sterpenich','arlon','belgium','luxembourg border',
        'postcode','post code','zip','zip code','e411','ikea','decathlon','near','close to','nearest','far from',
        'rue de grass','6700','how do i find','how do i get','coming from','coming by','drive','car','train','bus'
      ],
      response: () => `**LUXFLY Indoor Skydive**\n📍 **Rue de Grass 103, 6700 Sterpenich, Belgium**\n\n🚗 **5 minutes from the Luxembourg border.** Visible from the **E411 motorway**, next to **IKEA** and **Decathlon**.\n🅿️ **Free parking on site.**\n\nComing from Luxembourg City by car: follow A3 to E411 direction Arlon, exit at Sterpenich — we're right there.`
    },

    hours: {
      keywords: [
        'hours','opening','open','opening hours','when open','times','schedule','when are you open','closed',
        'monday','tuesday','wednesday','thursday','friday','saturday','sunday','weekend hours','weekday hours',
        'time','what time','hours today','hours tomorrow','open on','closed on','public holiday','bank holiday',
        'when can i come','day off','closing time','am i late','open now','still open','open today','late opening'
      ],
      response: () => `**Opening hours:**\n\n🕛 **Wednesday to Friday: 12:00 – 19:00**\n🕙 **Saturday & Sunday: 10:00 – 19:00**\n🚫 **Closed Monday and Tuesday**\n\nBirthday party slots are available during opening hours — most weekend slots run 10:00, 12:00, 14:00, 16:00. Contact us for a specific date/time.`
    },

    contact: {
      keywords: [
        'contact','email','phone','whatsapp','call','reach you','get in touch','talk to someone','customer service','support',
        'tell me more','speak to someone','speak to a human','human','operator','agent','representative','staff',
        'who do i contact','who do i email','who do i call','how can i reach','how to contact','how to reach','telephone','number'
      ],
      response: () => `**Get in touch:**\n\n📧 **Email:** hello@luxfly.eu\n💬 **WhatsApp:** +32 2 320 55 09\n📍 **Address:** Rue de Grass 103, 6700 Sterpenich, Belgium\n\nSupport inbox for bookings: **support@luxfly.eu**\n\nWe reply within 48 hours on working days.`
    },

    book: {
      keywords: ['want to book','we want to book','i want to book','id like to book','like to book','book a party','book for 10','book for 12','book for 20','schedule a party','want to reserve','want to schedule',
        'book','booking','reserve','reservation','how to book','how do i book','can i book','booking system','make a booking',
        'book now','book a party','schedule','set up a date','plan a party','pick a date','book online','online booking',
        'when can i book','how far in advance','how early should i book','availability','is there availability'
      ],
      response: () => `**Booking is easy:**\n\n1️⃣ Click **Book Now** at the top of the page\n2️⃣ Choose kids or teens package\n3️⃣ Pick your date and slot\n4️⃣ Enter number of participants and any add-ons (HighFly, photo, magnet, drinks)\n5️⃣ Pay securely — you get an instant email confirmation\n\nBook at least **2 weeks ahead** for weekend dates during school holidays. Prefer human help? Email **hello@luxfly.eu** or WhatsApp **+32 2 320 55 09**.`
    },

    cancel: {
      keywords: ['change my date','change my booking date','change the date','date change','move my booking','move my date','postpone my booking','i need to cancel','i want to cancel','how to cancel','cancel my booking',
        'cancel','cancellation','reschedule','refund','change date','date change','change my booking','postpone','move',
        'change time','change participants','not coming','sick','illness','emergency','policy','refund policy','cancel policy',
        'money back','get refund','48 hours','48h','late cancel','last minute cancel'
      ],
      response: () => `**Changes and cancellations:**\n\n✅ **Free changes up to 48 hours before** your slot — contact support@luxfly.eu\n❌ **Late cancellations are non-refundable** (less than 48h)\n🔄 If you need to reschedule, we'll do our best to move you to a suitable slot based on availability\n\nFor last-minute illness or emergencies, email us ASAP — we always try to find a solution.`
    },

    spectators: {
      keywords: ['where do parents sit','where do we sit','parent seating','seat for parents','seat for family','family seating','parents watching','can i watch my kid','can i watch my child',
        'parent','parents','watch','spectator','spectators','family','non-flying','viewing','gallery','amphitheatre','amphitheater',
        'can parents watch','where do parents go','where do we watch','can i watch','can guests watch','can grandparents come',
        'audience','visitors','non flyers','observer','sit down','seats','seating','bring friends','how many spectators','spectator fee','spectator free'
      ],
      response: () => `**Parents and non-flying guests watch from a private amphitheatre** next to the flight tunnel.\n\n🎥 Tiered seating with full view of every flight\n🪑 Comfortable seats, big windows\n👨‍👩‍👧‍👦 No spectator fee — grandparents, siblings, friends, all welcome\n\nIt's a great view, much better than standing in a corridor.`
    },

    cake_food: {
      keywords: ['food served','food provided','catering provided','is there food','is food served','do you serve food','birthday room food','food in the party room','meal provided','lunch provided','dinner provided','bar on site','is there a bar','food menu',
        'cake','food','bring food','catering','bring cake','can we bring','can i bring','own cake','own food','own snacks','candy',
        'pizza','sandwiches','chips','juice','lemonade','soft drinks','refreshment','dessert','ice cream','fruit','lunch','dinner',
        'meal','breakfast','hot food','cold food','candles','birthday candles','cut cake','knife','lighter'
      ],
      response: () => `**You can bring your own cake, food and decorations.** 🎂\n\n✅ Cake and candles (we have knives and lighters if needed)\n✅ Snacks, candy, chips, sandwiches, fruit\n✅ Decorations, balloons, banners, party hats\n\n**We provide:** tableware, unlimited still and flavoured water, music. No bar or catering — you bring the rest.`
    },

    kids_camp: {
      keywords: [
        'kids camp','camp','holiday','school holiday','multi-day','summer camp','vacation camp','spring camp','easter camp','christmas camp',
        'half term','mid term','half-term','mid-term','day camp','holiday programme','holiday program','holiday schedule','winter camp'
      ],
      response: () => `**Kids Camp** runs during school holidays — multi-day programmes for children ages **6–13** mixing flights with games, challenges and team activities.\n\nDates vary by season (spring, summer, autumn, Christmas). See the **Kids Camp** page or email **hello@luxfly.eu** to join the notification list for the next session.`
    },

    open_days: {
      keywords: [
        'open day','open days','portes ouvertes','free trial','discovery day','try for free','visit','tour','walk in','walk-in',
        'free flight','free session','come check it out','event','special event','promo','promotion','discount day','offer','limited time'
      ],
      response: () => `**Open Days** are occasional free or discounted discovery events we run throughout the year.\n\n🎟️ Meet the instructors\n🏭 Tour the wind tunnel\n✈️ Try a short introductory flight\n📅 Check the Open Days page for the next date, or sign up via the contact form\n\nDates are announced on the Open Days page and on Instagram @luxflyskydive.`
    },

    gift_voucher: {
      keywords: [
        'gift','voucher','gift card','present','gift voucher','buy a gift','gift for someone','give as a gift','wrap','anniversary','valentine','christmas present','birthday present for someone',
        'bon cadeau','kadoschein','geschenkgutschein','christmas gift','fathers day','mothers day','teacher gift'
      ],
      response: () => `Not planning a birthday party but want to give the flying experience? LUXFLY offers **gift vouchers** for any package.\n\n🎁 **Buy a gift voucher:** https://indoorskydive.lu/en/gift-voucher\n\nInstant delivery by email, printable PDF. Redeemable for any available flight experience on the main LUXFLY site.`
    },

    languages: {
      keywords: ['book for my 14 year old','book for my 15 year old','book for my 16 year old','book for my 17 year old','book for my teenager','book for my teen','book for my kid','book for my son','book for my daughter','is it ok for my teen','is it ok for my kid','is it ok for my teenager','briefing in french','briefing language','is the briefing in english','is the briefing in german','french briefing','english briefing','german briefing','multilingual','multi-lingual',
        'language','languages','french','english','german','dutch','luxembourgish','french speaking','english speaking','german speaking',
        'francais','français','nederlands','deutsch','luxembourgeois','luxemburgisch','speak english','speak french','speak german','what language'
      ],
      response: () => `The site and our team speak **English, French, German, Dutch and Luxembourgish**.\n\n🌐 Switch language at the top of any page. Birthday briefings are given in the language that suits your group.`
    },

    first_time: {
      keywords: [
        'first time','never done this','never flown','beginner','beginners','new to this','is this for me','is it easy',
        'can i do it','can anyone do it','no experience','do i need experience','is it hard','is it difficult','learning curve','first flight'
      ],
      response: () => `**Zero experience needed!** 🙌\n\nMost of our flyers are first-timers — our instructors specialise in getting kids and teens airborne on their very first flight. You'll get a short safety briefing, a hand-signal overview, and then you're in the tunnel with the instructor one-on-one.\n\nBy the end of the second flight, most flyers feel stable and can start trying turns with the instructor. It's genuinely easy to enjoy from minute one.`
    },

    what_it_feels: {
      keywords: ['tell me about the chamber','tell me about the tunnel','what is the chamber like','what is the tunnel like','inside the chamber','inside the tunnel','chamber experience','tunnel experience','flight experience','flying experience',
        'what does it feel like','how does it feel','sensation','feeling','feel like','scary','is it scary','is it fun','is it loud',
        'like skydiving','like real skydiving','difference','vs skydiving','compare','weird','strange','uncomfortable','comfortable'
      ],
      response: () => `**The feeling:**\n\n🌬️ Like being caught in a **warm, powerful upward wind**. Loud, steady, unmistakable.\n😄 **Not scary** — you never fall, never leave the ground. The chamber is fully padded and the instructor is right with you.\n✈️ **Same sensation as free-fall from a skydive**, minus the plane, parachute and altitude.\n\nWithin ~30 seconds most first-timers settle into a stable belly-down position. Most kids come out of their first flight laughing.`
    },

    fear_safety: {
      keywords: ['my kid is scared','my child is scared','my son is scared','my daughter is scared','my kid is nervous','my child is nervous','my kid is afraid','my child is afraid','my kid is shy','first time nerves','first-time jitters','what if they panic','what if my kid cries',
        'scared','afraid','nervous','worried','anxious','fear','phobia','panic','my kid is nervous','my child is scared',
        'shy','timid','small for age','not sure if my kid','what if my kid panics','what if i panic','is there an escape'
      ],
      response: () => `**Totally understandable.** 😊\n\nOur instructors specialise in first-time kids who are nervous. They:\n\n🧑‍🏫 Stay with your child in the chamber for **every second** of every flight\n🫶 Hold them firmly until they're comfortable\n✋ Use hand signals for 'ok' / 'take a break'\n🚪 Can end a flight instantly if a child wants out — no pressure\n\nMost nervous kids come out of flight #1 asking if they can do flight #2 right away.`
    },

    payment: {
      keywords: [
        'payment','pay','how do i pay','how to pay','payment method','credit card','visa','mastercard','bancontact','sepa','paypal',
        'cash','online payment','secure payment','pay on site','pay at venue','mollie','payment options','debit card','bank transfer'
      ],
      response: () => `**Payment methods:**\n\n💳 Credit card (Visa, Mastercard)\n💳 **Bancontact** (mandatory for Belgian market)\n💙 PayPal\n🏦 SEPA bank transfer\n\nAll online payments are processed through **Mollie** — fully secure, PCI-compliant. You'll get an instant email confirmation once payment is received.`
    },

    vat: {
      keywords: ['prices include tax','price includes tax','price includes vat','price inclusive','inclusive of vat','is vat added','extra tax','hidden tax','hidden fees','fees on top',
        'vat','tax','taxes','included','tva','btw','belgian vat','price with vat','before vat','ex vat','inc vat','20%','21%','vat rate'
      ],
      response: () => `All prices shown **include Belgian VAT (21%)**. Your confirmation email shows a full breakdown of the VAT for your booking.`
    },

    nearby: {
      keywords: ['where can we eat','places to eat','where to have lunch','where to have dinner','food options nearby','restaurant near you','restaurants near luxfly','hotels near luxfly','accommodation near luxfly','stay near luxfly',
        'hotel','hotels','accommodation','place to stay','stay over','airbnb','book a room','sleep','night',
        'restaurant','restaurants','eat','dinner','lunch','nearby food','where to eat','cafe','coffee',
        'things to do','activities','nearby activities','nearby attractions','kids activities','luxembourg attractions','arlon attractions'
      ],
      response: () => `There are several hotels and restaurants within 5–10 minutes of LUXFLY, on both the Belgian and Luxembourg sides of the border. **IKEA** (with restaurant) is literally next door and **Decathlon** is across the road.\n\nFor specific recommendations, email **hello@luxfly.eu** — our team can suggest family-friendly places near us.`
    },

    pregnancy: {
      keywords: ['safe while pregnant','safe when pregnant','safe if pregnant','safe during pregnancy','safe in early pregnancy','can i fly pregnant','can i fly while pregnant','can i fly when pregnant','can i fly during pregnancy','can i fly in early pregnancy','flying while pregnant','flying when pregnant','is it safe pregnant','is it ok pregnant','is it safe while pregnant','pregnant person','pregnant guest','pregnant mum','pregnant flyer','pregnant','pregnancy','expecting','baby due','i am pregnant','my wife is pregnant','pregnant and want to fly','safe when pregnant','safe if pregnant','pregnancy allowed','flying while pregnant','pregnant person','early pregnancy','late pregnancy',
        'expecting','baby on the way','1 trimester','first trimester','second trimester','third trimester'
      ],
      response: () => `Flying is **not suitable during pregnancy**. We do not allow pregnant guests in the chamber at any stage.\n\nHowever, pregnant guests are **welcome to watch** from the amphitheatre — no restriction there. If you're due soon, let us know and we'll make sure you have comfortable seating. 🤍`
    },

    insurance: {
      keywords: [
        'insurance','insured','accident','injury cover','liability','waiver','consent form','guardian consent','parent consent','sign','forms'
      ],
      response: () => `LUXFLY is **fully insured** for third-party liability and the flights are supervised by certified instructors inside the tunnel.\n\n📝 On arrival, adults sign a standard waiver. For minors, a parent or guardian signs on their behalf. Forms are provided on the day.`
    },

    video: {
      keywords: ['can i record','can we record','record the flight','record my kid','record my child','record the party','video recording','camera allowed','film the flight','film the party',
        'video','videos','movie','record','recording','film','gopro','youtube','instagram reel','tiktok','social media','social post',
        'video pack','video add-on','video add on','record my kid','filming'
      ],
      response: () => `We don't currently sell a video pack, but:\n\n📸 The **souvenir photo (€15/booking)** is the best way to take home a keepsake.\n🎥 Flights happen in full view — parents filming from the amphitheatre with phones/GoPros is welcome.\n📺 See LUXFLY videos on YouTube: **@luxflyskydive**`
    },

    bathroom: {
      keywords: ['where are the toilets','where is the toilet','where is the bathroom','where are the bathrooms','changing area','place to change','where do we change','changing facilities','wc location','toilet facilities',
        'toilet','toilets','bathroom','restroom','wc','loo','changing room','change room','locker','lockers','storage','where to change','where to put my bag'
      ],
      response: () => `We have **toilets, changing rooms and lockers** on site. Your group can leave coats, bags and shoes in the changing area — lockers for valuables available.`
    },

    wifi: {
      keywords: ['wifi','wi-fi','wireless','internet','free wifi'],
      response: () => `Yes — **free Wi-Fi** is available throughout the building for you and your guests.`
    },

    disabled_access: {
      keywords: ['disability access','disabled access','wheelchair access','accessibility','wheelchair friendly','disabled parking','disabled entry','lift to amphitheatre','ramp to entrance','hearing aid','visually impaired','blind guest','deaf guest','deaf friendly','autism','autistic','special needs access',
        'accessible','accessibility','wheelchair','disabled','disability','mobility','ramp','step free','lift','elevator','special needs','autism friendly','autism-friendly'
      ],
      response: () => `The building is **fully wheelchair accessible** — ramps, lifts, accessible toilets, and spectator seating in the amphitheatre.\n\nFor flyers with specific needs (autism, sensory sensitivities, etc.), email **hello@luxfly.eu** before booking. Our instructors regularly adapt the briefing to make neurodivergent guests comfortable.`
    },

    weather: {
      keywords: ['rains','raining','if it rains','ok if it rains','weather dependent','what if it rains','rains outside','what about rain','snowing','is it cancelled if it rains','outdoor or indoor','indoor venue','under cover','all weather',
        'weather','rain','snow','windy','hot','cold','summer','winter','storm','bad weather','good weather','indoor','outside','outdoor','all weather'
      ],
      response: () => `**It's all indoors!** 🏠 Rain, snow, storm, heatwave — the wind tunnel runs in any weather. The only reason we'd cancel is a building-wide issue (power, maintenance) — extremely rare. You can book weekend slots in December with full confidence.`
    },

    cake_candles: {
      keywords: ['candles','lighter','matches','light candles','can we light candles'],
      response: () => `Yes — **candles are fine** in the birthday room. We can lend a lighter and provide a plate/knife for the cake. 🕯️🎂`
    },

    photos_rules: {
      keywords: [
        'can i take photos','can i take pictures','photos allowed','photos inside','photography','flash','can i film','filming allowed','can i record'
      ],
      response: () => `**Photos and videos are welcome** from the amphitheatre (parents filming their kids flying). Inside the chamber itself, only the instructor or booked photo add-on captures media for safety reasons. 📸`
    },

    second_birthday: {
      keywords: [
        'siblings','siblings fly','my other child','brother','sister','twins','two birthdays','combined birthday','shared party','another birthday'
      ],
      response: () => `**Siblings are very welcome** — and we often host combined or shared parties. All flyers need to fall in the 4–17 age range, and the whole group uses the same package (either kids or teens). If your kids straddle the age groups (e.g. 12 and 14), email us and we'll advise.`
    },

    pro_flyers: {
      keywords: [
        'pro flyer','pro flyers','professional flyer','professional skydiver','competition','competitive','training','advanced','coaching','instructor training'
      ],
      response: () => `Pro-flyer training and coaching happens on the main LUXFLY site: **https://indoorskydive.lu/en/pro-flyers**\n\nThis birthday site focuses only on 4–13 and 14–17 party experiences. 🎂`
    },

    museum: {
      keywords: ['museum','art of skydiving','exhibition','history','skydiving history','tour','museum tour'],
      response: () => `The **Art of Skydiving museum** is part of the main LUXFLY site, not included in birthday packages by default. Visit **indoorskydive.lu** for details.`
    }
  };
  // ─── Word-boundary regex ────────────────────────────────────────────────────
  function kwRegex(kw) {
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('(?:^|[\\s,.!?\'"-])' + escaped + '(?:[\\s,.!?\'"-]|$)', 'i');
  }

  // ─── Damerau-Levenshtein distance (handles transpositions like yaer→year) ───
  function lev(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({length: m + 1}, (_, i) => Array.from({length: n + 1}, (_, j) => j === 0 ? i : 0));
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i-1] === b[j-1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost);
        // Transposition (adjacent swap counts as 1 edit, not 2)
        if (i > 1 && j > 1 && a[i-1] === b[j-2] && a[i-2] === b[j-1])
          dp[i][j] = Math.min(dp[i][j], dp[i-2][j-2] + cost);
      }
    }
    return dp[m][n];
  }

  // Build a vocabulary from all KB keyword words (3+ chars, so 'old','age' etc. are reachable targets)
  const kbVocab = (() => {
    const seen = new Set();
    for (const d of Object.values(KB))
      for (const kw of d.keywords)
        kw.split(/\s+/).forEach(w => { if (w.length >= 3) seen.add(w.toLowerCase()); });
    return [...seen];
  })();

  // Replace each 4+ char word in user input with the closest KB vocab word if within threshold.
  // Tiebreaker: prefer the longer correction (more specific keyword wins over short common words).
  function fuzzyCorrect(text) {
    return text.replace(/[a-zA-Z]{4,}/g, word => {
      const w = word.toLowerCase();
      if (kbVocab.includes(w)) return word; // exact match — no change needed
      // Tolerance: 1 edit for 4-5 char words, 2 edits for 6+ char words
      const maxDist = w.length <= 5 ? 1 : 2;
      let best = null, bestDist = maxDist + 1;
      for (const v of kbVocab) {
        if (Math.abs(v.length - w.length) > maxDist) continue;
        const d = lev(w, v);
        // Accept if better distance, or same distance but longer (more specific) match
        if (d < bestDist || (d === bestDist && best !== null && v.length > best.length)) {
          bestDist = d; best = v;
        }
      }
      return best !== null ? best : word;
    });
  }

  // ─── Classifier ─────────────────────────────────────────────────────────────
  function classify(text) {
    const lower = fuzzyCorrect(text).toLowerCase();
    let bestCategory = null, bestScore = 0;
    for (const [cat, data] of Object.entries(KB)) {
      let score = 0;
      for (const kw of data.keywords) {
        if (kwRegex(kw).test(lower)) {
          const wc = kw.split(' ').length;
          score += wc * wc;
        }
      }
      if (score > bestScore) { bestScore = score; bestCategory = cat; }
    }
    return bestScore > 0 ? bestCategory : null;
  }

  // ─── Greeting / thanks ───────────────────────────────────────────────────────
  function isGreeting(text) {
    const lower = text.trim().toLowerCase();
    if (/^(hi|hello|hey|bonjour|hallo|salut|guten tag|good morning|good afternoon|good evening|howdy|yo|sup|hiya|greetings?|coucou|hoi|dag|moien|allo|moin|g'?day|namaste|ciao)[\s!.?,]*$/i.test(lower)) return true;
    if (/^(how are you|how's it going|how you doing|how are you doing|what's up|whats up|wassup|how r u|how's things|hows it going)[\s!.?,]*$/i.test(lower)) return true;
    return false;
  }

  function isThanks(text) {
    return /\b(thanks?|thank you|merci|danke|dank je|cheers|perfect|great|awesome|brilliant|amazing|wonderful|super|parfait|genial|génial)\b/i.test(text) &&
      text.trim().split(/\s+/).length < 10;
  }

  // ─── Formatter ───────────────────────────────────────────────────────────────
  function formatResponse(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#f02cb8">$1</a>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  const greetings = [
    "Hey! 👋 I'm the LUXFLY Birthday assistant. Ask me anything about birthday parties — prices, dates, HighFly, what to wear, where to find us, and more!",
    "Hi! 😊 Doing great, thanks! I'm here to help with LUXFLY birthday parties — what can I help with today?",
    "Hello! 🎂 Ready to plan a birthday? Ask me about pricing, dates, HighFly, or how it all works.",
    "Hey there! ✈️ Fire away — prices, age limits, HighFly, add-ons, booking, directions, whatever you need."
  ];
  const replies = [
    "You're welcome! 😊 Anything else I can help with?",
    "Happy to help! 🙌 Feel free to ask anything else.",
    "Of course! Let me know if you have more questions. 😄",
    "No problem at all! Is there anything else you'd like to know? ✈️"
  ];
  const fallbacks = [
    "I'm Luxfly's chatbot, so I can only help with questions about indoor skydiving! 🪂\n\nTry asking about:\n💰 **Prices** · ⏰ **Hours** · 📍 **Location** · 📅 **Booking** · 🎂 **Birthday Parties**\n👨‍👩‍👧 **Groups** · 🏅 **Experience** · 👕 **What to Wear** · 🎟️ **Vouchers** · 💼 **Jobs**\n\nOr reach our team: 📞 **+32 2 320 55 09** | 💬 **WhatsApp: +32 2 320 55 09** 😊",
    "That's outside my area — I'm the birthday-party chatbot. 🎂\n\n📧 **hello@luxfly.eu** · 💬 **WhatsApp +32 2 320 55 09**\n\nFor adult flights, corporate events or pro-flyer packages, visit the main site: **indoorskydive.lu** ✈️",
    "I want to make sure you get the right answer for that — reach our team directly:\n📧 **hello@luxfly.eu** · 💬 **WhatsApp +32 2 320 55 09**\n\nI can answer birthday questions: prices, packages, booking, HighFly, health, hours, location, add-ons, and more! 😊"
  ];

  function getResponse(userText) {
    const text = userText.trim();
    if (!text) return fallbacks[0];
    if (isGreeting(text)) return greetings[Math.floor(Math.random() * greetings.length)];
    if (isThanks(text)) return replies[Math.floor(Math.random() * replies.length)];
    const category = classify(text);
    if (category && KB[category]) return KB[category].response();
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }

  // ─── Styles (original dark theme) ───────────────────────────────────────────
  const css = `
    #lf-chat-btn {
      position: fixed; bottom: 28px; right: 28px; z-index: 9999;
      width: 60px; height: 60px; border-radius: 50%;
      background: #f02cb8; border: none; cursor: pointer;
      box-shadow: 0 4px 24px rgba(240,44,184,0.45);
      display: flex; align-items: center; justify-content: center;
      transition: transform 0.2s, box-shadow 0.2s; outline: none;
    }
    #lf-chat-btn:hover { transform: scale(1.08); box-shadow: 0 6px 32px rgba(240,44,184,0.6); }
    #lf-chat-btn svg { pointer-events: none; }
    #lf-chat-badge {
      position: absolute; top: -4px; right: -4px; width: 18px; height: 18px;
      background: #fff; border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 11px; font-weight: 700; color: #f02cb8;
    }
    #lf-chat-window {
      position: fixed; bottom: 100px; right: 28px; z-index: 9998;
      width: 360px; max-width: calc(100vw - 40px);
      height: 520px; max-height: calc(100vh - 130px);
      background: #0a0a0a; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px; display: flex; flex-direction: column;
      box-shadow: 0 16px 48px rgba(0,0,0,0.6); overflow: hidden;
      transform: scale(0.95) translateY(10px); opacity: 0; pointer-events: none;
      transition: transform 0.25s cubic-bezier(.34,1.56,.64,1), opacity 0.2s ease;
    }
    #lf-chat-window.open { transform: scale(1) translateY(0); opacity: 1; pointer-events: all; }
    #lf-chat-header {
      background: #111; border-bottom: 1px solid rgba(255,255,255,0.08);
      padding: 14px 16px; display: flex; align-items: center; gap: 10px; flex-shrink: 0;
    }
    #lf-chat-header-avatar {
      width: 36px; height: 36px; border-radius: 50%; background: #f02cb8;
      display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0;
    }
    #lf-chat-header-info { flex: 1; }
    #lf-chat-header-name {
      font-family: 'Montserrat','Inter',sans-serif; font-size: 13px;
      font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #fff;
    }
    #lf-chat-header-status { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 1px; }
    #lf-chat-close {
      background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.5);
      padding: 4px; border-radius: 6px; display: flex; align-items: center;
      justify-content: center; transition: color 0.2s;
    }
    #lf-chat-close:hover { color: #fff; }
    #lf-chat-messages {
      flex: 1; overflow-y: auto; padding: 16px 14px;
      display: flex; flex-direction: column; gap: 10px; scroll-behavior: smooth;
    }
    #lf-chat-messages::-webkit-scrollbar { width: 4px; }
    #lf-chat-messages::-webkit-scrollbar-track { background: transparent; }
    #lf-chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 4px; }
    .lf-msg {
      max-width: 85%; padding: 10px 13px; border-radius: 12px;
      font-size: 13.5px; line-height: 1.55; font-family: 'Inter',sans-serif; word-break: break-word;
    }
    .lf-msg-bot {
      background: #1a1a1a; color: rgba(255,255,255,0.88);
      border-bottom-left-radius: 3px; align-self: flex-start; border: 1px solid rgba(255,255,255,0.07);
    }
    .lf-msg-bot p { margin: 0 0 6px; }
    .lf-msg-bot p:last-child { margin-bottom: 0; }
    .lf-msg-user { background: #f02cb8; color: #fff; border-bottom-right-radius: 3px; align-self: flex-end; }
    .lf-msg-typing { display: flex; align-items: center; gap: 4px; padding: 12px 14px; }
    .lf-dot { width: 7px; height: 7px; background: rgba(255,255,255,0.4); border-radius: 50%; animation: lf-bounce 1.2s infinite; }
    .lf-dot:nth-child(2) { animation-delay: 0.2s; }
    .lf-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes lf-bounce { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }
    #lf-chat-quick { padding: 8px 14px 4px; display: flex; flex-wrap: wrap; gap: 6px; flex-shrink: 0; }
    .lf-quick-btn {
      background: rgba(240,44,184,0.1); border: 1px solid rgba(240,44,184,0.3);
      border-radius: 20px; color: #f02cb8; font-size: 12px; font-family: 'Inter',sans-serif;
      padding: 5px 11px; cursor: pointer; transition: background 0.2s; white-space: nowrap;
    }
    .lf-quick-btn:hover { background: rgba(240,44,184,0.2); }
    #lf-chat-form {
      padding: 10px 12px 12px; display: flex; gap: 8px;
      border-top: 1px solid rgba(255,255,255,0.07); flex-shrink: 0;
    }
    #lf-chat-input {
      flex: 1; background: #1a1a1a; border: 1px solid rgba(255,255,255,0.1);
      border-radius: 10px; color: #fff; font-size: 16px; font-family: 'Inter',sans-serif; touch-action: manipulation;
      padding: 9px 13px; outline: none; resize: none; line-height: 1.4;
      max-height: 80px; transition: border-color 0.2s;
    }
    #lf-chat-input::placeholder { color: rgba(255,255,255,0.3); font-size: 14px; }
    #lf-chat-input:focus { border-color: rgba(240,44,184,0.5); }
    #lf-chat-send {
      width: 38px; height: 38px; border-radius: 10px; background: #f02cb8; border: none;
      cursor: pointer; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; align-self: flex-end; transition: opacity 0.2s, transform 0.15s;
    }
    #lf-chat-send:hover { opacity: 0.85; transform: scale(1.05); }
    /* Touch devices: no-scale animation prevents Safari zoom */
    @media (hover: none) and (pointer: coarse) {
      #lf-chat-window {
        transform: translateY(24px);
        transition: transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.22s;
      }
      #lf-chat-window.open { transform: translateY(0); }
      #lf-chat-window, #lf-chat-btn { touch-action: pan-x pan-y; }
    }
    @media (max-width: 480px) {
      #lf-chat-window { right: 12px; bottom: 90px; width: calc(100vw - 24px); }
      #lf-chat-btn { bottom: 20px; right: 16px; }
    }

    /* ── Attention bubble ──────────────────────────────────────────── */
    #lf-chat-bubble {
      position: fixed; bottom: 96px; right: 16px; z-index: 9998;
      background: #f02cb8; color: #fff;
      padding: 9px 15px; border-radius: 18px 18px 4px 18px;
      font-size: 13px; font-weight: 600; line-height: 1.3;
      font-family: 'Montserrat','Inter',sans-serif;
      box-shadow: 0 4px 20px rgba(240,44,184,0.45);
      white-space: nowrap; cursor: pointer;
      animation: lf-bubble-in 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards;
      -webkit-tap-highlight-color: transparent;
      touch-action: manipulation;
    }
    #lf-chat-bubble::after {
      content: ''; position: absolute; bottom: -7px; right: 20px;
      width: 0; height: 0;
      border-left: 7px solid transparent;
      border-right: 4px solid transparent;
      border-top: 8px solid #f02cb8;
    }
    @keyframes lf-bubble-in {
      from { opacity: 0; transform: translateY(14px) scale(0.9); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .lf-bubble-out {
      animation: lf-bubble-out 0.25s ease forwards !important;
    }
    @keyframes lf-bubble-out {
      to { opacity: 0; transform: translateY(8px) scale(0.92); }
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ─── Build DOM ───────────────────────────────────────────────────────────────
  document.body.insertAdjacentHTML('beforeend', `
    <button id="lf-chat-btn" aria-label="Chat with Luxfly">
      <span id="lf-chat-badge" style="display:none">1</span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.06 2 11c0 2.64 1.18 5.02 3.07 6.72L4 22l4.54-2.04A10.7 10.7 0 0012 20c5.52 0 10-4.06 10-9S17.52 2 12 2z" fill="white"/>
      </svg>
    </button>
    <div id="lf-chat-window" role="dialog" aria-label="Luxfly Chat">
      <div id="lf-chat-header">
        <div id="lf-chat-header-avatar">✈</div>
        <div id="lf-chat-header-info">
          <div id="lf-chat-header-name">Zoom</div>
          <div id="lf-chat-header-status">Online · Always here to help</div>
        </div>
        <button id="lf-chat-close" aria-label="Close chat">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div id="lf-chat-messages"></div>
      <div id="lf-chat-quick">
        <button class="lf-quick-btn" data-q="What are your prices?">💰 Prices</button>
        <button class="lf-quick-btn" data-q="What are your opening hours?">🕐 Hours</button>
        <button class="lf-quick-btn" data-q="Is it safe for kids?">👦 Kids</button>
        <button class="lf-quick-btn" data-q="How do I book?">🎟️ Book</button>
        <button class="lf-quick-btn" data-q="Where are you located?">📍 Location</button>
        <button class="lf-quick-btn" data-q="Which package would you recommend?">⭐ Recommend</button>
      </div>
      <form id="lf-chat-form" autocomplete="off">
        <textarea id="lf-chat-input" placeholder="Ask me anything…" rows="1"></textarea>
        <button type="submit" id="lf-chat-send" aria-label="Send">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </form>
    </div>
  `);

  // ─── Elements ────────────────────────────────────────────────────────────────
  const btn       = document.getElementById('lf-chat-btn');
  const win       = document.getElementById('lf-chat-window');
  const closeBtn  = document.getElementById('lf-chat-close');
  const messages  = document.getElementById('lf-chat-messages');
  const form      = document.getElementById('lf-chat-form');
  const input     = document.getElementById('lf-chat-input');
  const quickBtns = document.querySelectorAll('.lf-quick-btn');
  let isOpen = false, greeted = false;

  // ─── Helpers ─────────────────────────────────────────────────────────────────
  function addMsg(html, role) {
    const el = document.createElement('div');
    el.className = 'lf-msg ' + (role === 'user' ? 'lf-msg-user' : 'lf-msg-bot');
    if (role === 'user') {
      el.textContent = html;
    } else {
      el.innerHTML = '<p>' + formatResponse(html) + '</p>';
    }
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'lf-msg lf-msg-bot lf-msg-typing';
    el.id = 'lf-typing';
    el.innerHTML = '<div class="lf-dot"></div><div class="lf-dot"></div><div class="lf-dot"></div>';
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTyping() {
    const el = document.getElementById('lf-typing');
    if (el) el.remove();
  }

  function toggleQuickBtns(show) {
    document.getElementById('lf-chat-quick').style.display = show ? 'flex' : 'none';
  }

  // ─── Send ────────────────────────────────────────────────────────────────────
  function sendMessage(text) {
    text = text.trim();
    if (!text) return;
    toggleQuickBtns(false);
    addMsg(text, 'user');
    input.value = '';
    input.style.height = 'auto';
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMsg(getResponse(text), 'bot');
      input.focus();
    }, 400 + Math.random() * 500);
  }

  // ─── Open / Close ────────────────────────────────────────────────────────────
  // Touch detection + scroll lock helpers
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  let _lockedScrollY = 0;
  function lockBodyScroll() {
    _lockedScrollY = window.scrollY;
    document.body.style.cssText += ';position:fixed;top:-' + _lockedScrollY + 'px;width:100%;overflow-y:scroll';
  }
  function unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, _lockedScrollY);
  }

  function openChat() {
    isOpen = true;
    dismissBubble();
    win.classList.add('open');
    const badge = document.getElementById('lf-chat-badge');
    if (badge) badge.style.display = 'none';
    btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
    </svg>`;
    if (!greeted) {
      greeted = true;
      setTimeout(() => {
        addMsg("Hey! 👋 I'm Zoom, the Luxfly assistant. Ask me anything about our indoor skydiving experience — prices, booking, health, kids, location, and more!", 'bot');
      }, 300);
    }
    if (isTouch) {
      lockBodyScroll(); // no input.focus() — prevents Safari zoom
    } else {
      input.focus();
    }
  }

  function closeChat() {
    isOpen = false;
    win.classList.remove('open');
    btn.innerHTML = `<span id="lf-chat-badge" style="display:none">1</span>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C6.48 2 2 6.06 2 11c0 2.64 1.18 5.02 3.07 6.72L4 22l4.54-2.04A10.7 10.7 0 0012 20c5.52 0 10-4.06 10-9S17.52 2 12 2z" fill="white"/>
      </svg>`;
    if (isTouch) unlockBodyScroll();
  }

  // ─── Events ──────────────────────────────────────────────────────────────────
  btn.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);
  form.addEventListener('submit', (e) => { e.preventDefault(); sendMessage(input.value); });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input.value); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 80) + 'px';
  });
  quickBtns.forEach(b => { b.addEventListener('click', () => sendMessage(b.dataset.q)); });

  // ── Attention bubble ───────────────────────────────────────────────────────
  function dismissBubble() {
    const b = document.getElementById('lf-chat-bubble');
    if (!b) return;
    b.classList.add('lf-bubble-out');
    setTimeout(() => b && b.parentNode && b.parentNode.removeChild(b), 260);
  }

  const bubble = document.createElement('div');
  bubble.id = 'lf-chat-bubble';
  bubble.textContent = 'Have a question? Ask here!';
  bubble.setAttribute('role', 'button');
  bubble.setAttribute('aria-label', 'Open chat assistant');
  document.body.appendChild(bubble);
  bubble.addEventListener('click', () => { dismissBubble(); openChat(); });

  // Auto-dismiss after 9 seconds
  const bubbleTimeout = setTimeout(() => dismissBubble(), 9000);
  bubble.addEventListener('click', () => clearTimeout(bubbleTimeout));

})();
