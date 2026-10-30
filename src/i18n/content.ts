import type { SupportedLanguage } from './languages';

export interface PageContent {
  metaTitle: string;
  metaDesc: string;
  heroPill: string;
  heroTitle: string;
  heroSubtitle: string;
  secondaryTitle?: string;
  secondarySubtitle?: string;
}

export const homeContent: Record<SupportedLanguage, PageContent> = {
  en: {
    metaTitle: "LankaWayfinder.tours | Sri Lanka Safaris, Chauffeurs & Island Guide (2026)",
    metaDesc: "Independent Sri Lanka route coordination: verified 4x4 wildlife safaris in Yala & Udawalawe, Kandy-to-Ella train solutions, and fixed-rate chauffeur transfers.",
    heroPill: "Field Dispatch & Verified Experiences",
    heroTitle: "Sri Lanka Safaris, Scenic Trains & Chauffeurs",
    heroSubtitle: "Independently verified route intelligence for travelers who value time over trial-and-error. Fixed-rate transfers, pre-cleared safari permits, and reserved train seats.",
    secondaryTitle: "Verified Field Inventory",
    secondarySubtitle: "Every safari jeep, scenic rail route, and cultural trek independently vetted for quality and safety."
  },
  de: {
    metaTitle: "Sri Lanka Safaris, Züge & Chauffeur-Transfers (2026) | LankaWayfinder",
    metaDesc: "Unabhängige Sri Lanka Routenplanung: verifizierte 4x4 Safaris in Yala & Udawalawe, Kandy-nach-Ella Panoramazug-Lösungen und Chauffeurtransfers zum Festpreis.",
    heroPill: "Vor-Ort-Koordination & Geprüfte Erlebnisse",
    heroTitle: "Sri Lanka Safaris, Panoramazüge & Chauffeur-Reisen",
    heroSubtitle: "Unabhängig geprüfte Reise-Logistik für Reisende, die Planungssicherheit schätzen. Chauffeur-Festpreise, offizielle DWC-Safarigenehmigungen und reservierte Aussichtsplätze.",
    secondaryTitle: "Verifizierte Touren & Erlebnisse",
    secondarySubtitle: "Jeder Safari-Jeep, Zugtransfer und Ausflug wird unabhängig auf Zuverlässigkeit und Komfort geprüft."
  },
  fr: {
    metaTitle: "Sri Lanka Safaris, Trains Panoramiques & Chauffeurs (2026) | LankaWayfinder",
    metaDesc: "Coordination d’itinéraires indépendante au Sri Lanka : safaris 4x4 à Yala et Udawalawe, billets de train Kandy-Ella et chauffeurs privés climatisés à tarif fixe.",
    heroPill: "Coordination de Terrain & Expériences Vérifiées",
    heroTitle: "Safaris au Sri Lanka, Trains Panoramiques & Chauffeurs",
    heroSubtitle: "Renseignements d’itinéraires certifiés pour les voyageurs exigeants. Tarifs de transfert fixes, permis officiels DWC inclus et sièges de train réservés.",
    secondaryTitle: "Circuits & Expériences Certifiées",
    secondarySubtitle: "Chaque safari 4x4, trajet ferroviaire et excursion culturelle est vérifié indépendamment pour votre sécurité."
  },
  ru: {
    metaTitle: "Шри-Ланка: Сафари, Панорамные поезда и Водители (2026) | LankaWayfinder",
    metaDesc: "Независимый путеводитель по Шри-Ланке: проверенные джип-сафари в Яле и Удавалаве, билеты на поезд Канди — Элла и персональные трансферы по фиксированным ценам.",
    heroPill: "Проверенная логистика и маршруты",
    heroTitle: "Сафари по Шри-Ланке, Поезда в горах и Персональные водители",
    heroSubtitle: "Независимая координация маршрутов без переплат и сюрпризов. Фиксированные тарифы с кондиционером, официальные пропуска в парки DWC и гарантированные места на поезд.",
    secondaryTitle: "Проверенная база туров",
    secondarySubtitle: "Каждый сафари-джип, горный поезд и маршрут с водителем протестированы на безопасность и пунктуальность."
  },
  it: {
    metaTitle: "Sri Lanka: Safari 4x4, Treni Panoramici & Autisti (2026) | LankaWayfinder",
    metaDesc: "Guida indipendente per viaggiare in Sri Lanka: safari a Yala e Udawalawe, biglietti treno panoramico Kandy-Ella e autisti privati a tariffa fissa.",
    heroPill: "Logistica Indipendente & Esperienze Verificate",
    heroTitle: "Safari in Sri Lanka, Treni Panoramici & Autisti Privati",
    heroSubtitle: "Consulenza di viaggio verificata per chi desidera il massimo dal proprio tempo. Tariffe fisse senza sorprese, permessi DWC inclusi e posti panoramici garantiti.",
    secondaryTitle: "Esperienze e Tour Verificati",
    secondarySubtitle: "Ogni jeep 4x4, tratta ferroviaria ed escursione è accuratamente selezionata per qualità e sicurezza."
  },
  es: {
    metaTitle: "Safaris en Sri Lanka, Trenes Escénicos y Chóferes (2026) | LankaWayfinder",
    metaDesc: "Coordinación independiente de viajes en Sri Lanka: safaris 4x4 en Yala y Udawalawe, billetes del tren Kandy-Ella y chóferes privados a precio fijo garantizado.",
    heroPill: "Logística en Destino y Experiencias Verificadas",
    heroTitle: "Safaris en Sri Lanka, Trenes Escénicos y Chóferes Privados",
    heroSubtitle: "Información y logística comprobada para viajeros que valoran su tiempo. Tarifas de transporte fijas, permisos de parques DWC incluidos y asientos reservados de tren.",
    secondaryTitle: "Colección Verificada de Excursiones",
    secondarySubtitle: "Cada jeep de safari, ruta de tren y chófer privado ha sido auditado de forma independiente."
  }
};

export const toursPageContent: Record<SupportedLanguage, PageContent> = {
  en: {
    metaTitle: "10 Best Sri Lanka Safaris & Day Tours (2026 Verified) | LankaWayfinder",
    metaDesc: "Compare 10 verified Sri Lanka tours & 4x4 wildlife safaris in Yala, Udawalawe & Minneriya (from $25). Pre-cleared DWC permits & 24-hour free cancellation.",
    heroPill: "Verified Experiences",
    heroTitle: "Tours & Wildlife Safaris in Sri Lanka",
    heroSubtitle: "Every experience in our collection has been independently vetted for route feasibility, tracker quality, and reliable booking. Book online with instant confirmation and 24-hour free cancellation."
  },
  de: {
    metaTitle: "Die 10 besten Sri Lanka Safaris & Tagestouren (2026) | LankaWayfinder",
    metaDesc: "Vergleichen Sie 10 geprüfte Sri Lanka Safaris in Yala, Udawalawe & Minneriya (ab 25 $). Inklusive DWC-Genehmigung & kostenloser Stornierung bis 24 Std.",
    heroPill: "Geprüfte Erlebnisse",
    heroTitle: "Touren & Wildtier-Safaris in Sri Lanka",
    heroSubtitle: "Jedes Erlebnis unserer Kollektion ist unabhängig auf Routenqualität, professionelle Tracker und zuverlässige Buchung geprüft. Online buchbar mit 24h-Stornierungsgarantie."
  },
  fr: {
    metaTitle: "Les 10 Meilleurs Safaris & Circuits au Sri Lanka (2026) | LankaWayfinder",
    metaDesc: "Comparez 10 safaris et circuits vérifiés à Yala, Udawalawe et Minneriya (dès 25 $). Permis d'entrée DWC inclus et annulation gratuite jusqu'à 24h.",
    heroPill: "Expériences Vérifiées",
    heroTitle: "Circuits & Safaris Animaliers au Sri Lanka",
    heroSubtitle: "Toutes nos excursions ont été sélectionnées pour leur fiabilité, la qualité des guides et la facilité de réservation. Confirmation immédiate et annulation gratuite sous 24h."
  },
  ru: {
    metaTitle: "10 лучших сафари и туров по Шри-Ланке (2026) | LankaWayfinder",
    metaDesc: "Сравните 10 проверенных туров и сафари 4x4 в Яле, Удавалаве и Миннерии (от 25 $). Пропуска DWC включены, бесплатная отмена бронирования за 24 часа.",
    heroPill: "Проверенные экскурсии",
    heroTitle: "Туры и сафари по дикой природе Шри-Ланки",
    heroSubtitle: "Все туры проверены на пунктуальность, мастерство следопытов и комфорт. Моментальное онлайн-бронирование и бесплатная отмена за 24 часа."
  },
  it: {
    metaTitle: "I 10 Migliori Safari e Tour in Sri Lanka (2026) | LankaWayfinder",
    metaDesc: "Confronta 10 safari in 4x4 a Yala, Udawalawe e Minneriya (da 25 $). Permessi DWC inclusi e cancellazione gratuita fino a 24 ore prima.",
    heroPill: "Esperienze Verificate",
    heroTitle: "Tour & Safari nella Natura in Sri Lanka",
    heroSubtitle: "Ogni tour è stato testato per affidabilità dell'itinerario e professionalità delle guide. Prenotazione immediata e cancellazione gratuita fino a 24 ore prima."
  },
  es: {
    metaTitle: "Los 10 Mejores Safaris y Tours en Sri Lanka (2026) | LankaWayfinder",
    metaDesc: "Compara 10 safaris en 4x4 en Yala, Udawalawe y Minneriya (desde 25 $). Entradas DWC incluidas y cancelación gratuita hasta 24 horas antes.",
    heroPill: "Experiencias Verificadas",
    heroTitle: "Tours y Safaris en Sri Lanka",
    heroSubtitle: "Cada excursión de nuestra colección ha sido verificada en cuanto a seguridad, calidad de guías y fiabilidad. Reserva con confirmación inmediata y cancelación gratuita 24h."
  }
};

export const destinationsContent: Record<SupportedLanguage, PageContent> = {
  en: {
    metaTitle: "Sri Lanka Destinations & Regional Corridors (2026) | LankaWayfinder",
    metaDesc: "Explore 5 core regional corridors in Sri Lanka: Yala & Udawalawe wildlife, Ella Hill Country, Cultural Triangle, Mirissa coast, and Colombo transit hubs.",
    heroPill: "Island Geography",
    heroTitle: "Sri Lanka Regional Travel Corridors",
    heroSubtitle: "Strategic route overviews designed around actual drive times, road topography, and seasonal wildlife migrations."
  },
  de: {
    metaTitle: "Sri Lanka Reiseziele & Regionale Korridore (2026) | LankaWayfinder",
    metaDesc: "Entdecken Sie die 5 wichtigsten Reise-Korridore in Sri Lanka: Yala & Udawalawe, Ella Bergland, Kulturdreieck Sigiriya, Mirissa Südküste und Colombo Transit.",
    heroPill: "Insel-Geografie",
    heroTitle: "Regionale Reisekorridore in Sri Lanka",
    heroSubtitle: "Optimierte Routenübersichten basierend auf realistischen Fahrzeiten, Straßenverhältnissen und saisonalen Tiermigrationen."
  },
  fr: {
    metaTitle: "Destinations & Régions Incontournables au Sri Lanka (2026) | LankaWayfinder",
    metaDesc: "Découvrez 5 régions majeures du Sri Lanka : safaris de Yala & Udawalawe, hautes terres d'Ella, Triangle Culturel, plages de Mirissa et hub de Colombo.",
    heroPill: "Géographie de l'Île",
    heroTitle: "Les Grands Corridors de Voyage au Sri Lanka",
    heroSubtitle: "Aperçus d'itinéraires conçus selon les temps de trajet réels, le relief montagnard et les saisons de passage des éléphants."
  },
  ru: {
    metaTitle: "Направления и регионы Шри-Ланки (2026) | LankaWayfinder",
    metaDesc: "5 ключевых маршрутов Шри-Ланки: сафари в Яле и Удавалаве, горы Эллы, Культурный треугольник Сигирии, пляжи Мириссы и транзит в Коломбо.",
    heroPill: "География острова",
    heroTitle: "Региональные туристические маршруты Шри-Ланки",
    heroSubtitle: "Маршруты, рассчитанные с учетом реального времени в пути, горного рельефа и сезонной миграции слонов и леопардов."
  },
  it: {
    metaTitle: "Destinazioni & Regioni dello Sri Lanka (2026) | LankaWayfinder",
    metaDesc: "Scopri i 5 corridoi principali dello Sri Lanka: safari a Yala e Udawalawe, montagne di Ella, Triangolo Culturale, spiagge di Mirissa e hub di Colombo.",
    heroPill: "Geografia dell'Isola",
    heroTitle: "Corridoi e Regioni di Viaggio in Sri Lanka",
    heroSubtitle: "Itinerari strategici calcolati su tempi di guida reali, altimetria stradale e stagionalità dei parchi naturali."
  },
  es: {
    metaTitle: "Destinos y Regiones Clave en Sri Lanka (2026) | LankaWayfinder",
    metaDesc: "Descubre los 5 corredores turísticos de Sri Lanka: safaris de Yala y Udawalawe, montañas de Ella, Triángulo Cultural, costa sur de Mirissa y Colombo.",
    heroPill: "Geografía de la Isla",
    heroTitle: "Corredores Regionales de Sri Lanka",
    heroSubtitle: "Itinerarios diseñados en base a tiempos de conducción reales, carreteras de montaña y movimientos de fauna estacional."
  }
};
