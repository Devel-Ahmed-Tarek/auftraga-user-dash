import type { Locale } from "./locales";

export type Messages = {
  brandSubtitle: string;
  toWebsite: string;
  language: string;
  portalEyebrow: string;
  homeTitle: string;
  homeIntro: string;
  tokenLabel: string;
  tokenPlaceholder: string;
  openRequest: string;
  tokenError: string;
  signingIn: string;
  authRedirectError: string;
  noOffersForAccount: string;
  trackTitle: string;
  requestNumber: string;
  confirmed: string;
  waitingConfirm: string;
  confirmNow: string;
  confirming: string;
  confirmSuccess: string;
  status: string;
  statusHint: string;
  companiesCount: string;
  details: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  address: string;
  interestedCompanies: string;
  noCompanies: string;
  interested: string;
  executed: string;
  markDone: string;
  rateTitle: string;
  rateHint: string;
  company: string;
  pleaseSelect: string;
  stars: string;
  comment: string;
  optional: string;
  submitRating: string;
  sending: string;
  rateSuccess: string;
  messageTitle: string;
  messageHint: string;
  messagePlaceholder: string;
  sendMessage: string;
  messageSuccess: string;
  invalidLink: string;
  backHome: string;
  confirmPageTitle: string;
  confirmPageDone: string;
  confirmPageWait: string;
  error: string;
  openTrackingAnyway: string;
  current: string;
  savedExecution: string;
  chooseCompany: string;
  chatTitle: string;
  chatHint: string;
  chatOpen: string;
  chatBack: string;
  chatEmpty: string;
  chatNoCompanies: string;
  chatPlaceholder: string;
  chatSend: string;
  chatYou: string;
  chatCompany: string;
  chatAdmin: string;
  chatUnread: string;
  steps: {
    received: string;
    confirmed: string;
    forwarded: string;
    interest: string;
    executed: string;
    done: string;
  };
};

export const messages: Record<Locale, Messages> = {
  de: {
    brandSubtitle: "Anfrage verfolgen",
    toWebsite: "Zur Website",
    language: "Sprache",
    portalEyebrow: "Kundenportal",
    homeTitle: "Anfrage verfolgen",
    homeIntro:
      "Öffnen Sie den Link aus Ihrer Bestätigungs-E-Mail oder geben Sie Ihre E-Mail-Adresse / Ihren Tracking-Token ein.",
    tokenLabel: "E-Mail oder Tracking-Token",
    tokenPlaceholder: "name@email.com oder Token",
    openRequest: "Anfrage öffnen",
    tokenError: "Bitte geben Sie Ihre E-Mail-Adresse oder einen gültigen Tracking-Token ein.",
    signingIn: "Anmeldung wird vorbereitet…",
    authRedirectError: "Anmeldung fehlgeschlagen. Bitte erneut über die Website anmelden.",
    noOffersForAccount: "Kein Auftrag für dieses Konto gefunden.",
    trackTitle: "Verfolgen Sie Ihre Anfrage Schritt für Schritt",
    requestNumber: "Anfrage",
    confirmed: "Bestätigt",
    waitingConfirm: "Wartet auf Bestätigung",
    confirmNow: "Anfrage jetzt bestätigen",
    confirming: "Wird bestätigt…",
    confirmSuccess: "Ihre Anfrage wurde bestätigt.",
    status: "Status",
    statusHint: "Aktueller Stand Ihrer Anfrage",
    companiesCount: "Unternehmen",
    details: "Details",
    name: "Name",
    email: "E-Mail",
    phone: "Telefon",
    service: "Service",
    date: "Termin",
    address: "Adresse",
    interestedCompanies: "Interessierte Unternehmen",
    noCompanies:
      "Noch kein Unternehmen hat Ihre Anfrage übernommen. Sobald ein Partner interessiert ist, erscheint er hier.",
    interested: "Interessiert",
    executed: "Ausgeführt",
    markDone: "Erledigt",
    rateTitle: "Unternehmen bewerten",
    rateHint: "Nach der Ausführung können Sie Ihr Feedback hinterlassen.",
    company: "Unternehmen",
    pleaseSelect: "Bitte wählen",
    stars: "Sterne",
    comment: "Kommentar",
    optional: "Optional",
    submitRating: "Bewertung absenden",
    sending: "Senden…",
    rateSuccess: "Vielen Dank für Ihre Bewertung.",
    messageTitle: "Nachricht an AuftragKompass",
    messageHint: "Fragen, Absage oder Hinweise zu Ihrer Anfrage.",
    messagePlaceholder: "Ihre Nachricht…",
    sendMessage: "Nachricht senden",
    messageSuccess: "Ihre Nachricht wurde gesendet.",
    invalidLink: "Link ungültig",
    backHome: "Zur Startseite",
    confirmPageTitle: "Anfrage wird bestätigt…",
    confirmPageDone: "Bestätigt",
    confirmPageWait:
      "Bitte einen Moment warten. Danach öffnen wir Ihr Tracking-Portal.",
    error: "Fehler",
    openTrackingAnyway: "Trotzdem Tracking öffnen",
    current: "Aktuell",
    savedExecution: "Ausführung gespeichert.",
    chooseCompany: "Bitte ein Unternehmen wählen.",
    chatTitle: "Chat mit Unternehmen",
    chatHint: "Schreiben Sie direkt mit Unternehmen, die Ihre Anfrage gekauft haben.",
    chatOpen: "Chat öffnen",
    chatBack: "Zurück zur Übersicht",
    chatEmpty: "Noch keine Nachrichten. Schreiben Sie die erste Nachricht.",
    chatNoCompanies: "Chat ist verfügbar, sobald ein Unternehmen Ihre Anfrage gekauft hat.",
    chatPlaceholder: "Nachricht schreiben…",
    chatSend: "Senden",
    chatYou: "Sie",
    chatCompany: "Unternehmen",
    chatAdmin: "AuftragKompass",
    chatUnread: "neu",
    steps: {
      received: "Anfrage eingegangen",
      confirmed: "E-Mail bestätigt",
      forwarded: "An Unternehmen weitergeleitet",
      interest: "Unternehmen interessiert",
      executed: "Auftrag ausgeführt",
      done: "Abgeschlossen",
    },
  },
  en: {
    brandSubtitle: "Track your request",
    toWebsite: "Website",
    language: "Language",
    portalEyebrow: "Customer portal",
    homeTitle: "Track your request",
    homeIntro:
      "Open the link from your confirmation email or enter your email address / tracking token.",
    tokenLabel: "Email or tracking token",
    tokenPlaceholder: "name@email.com or token",
    openRequest: "Open request",
    tokenError: "Please enter your email address or a valid tracking token.",
    signingIn: "Signing you in…",
    authRedirectError: "Sign-in failed. Please log in again from the website.",
    noOffersForAccount: "No request found for this account.",
    trackTitle: "Follow your request step by step",
    requestNumber: "Request",
    confirmed: "Confirmed",
    waitingConfirm: "Waiting for confirmation",
    confirmNow: "Confirm request now",
    confirming: "Confirming…",
    confirmSuccess: "Your request has been confirmed.",
    status: "Status",
    statusHint: "Current status of your request",
    companiesCount: "companies",
    details: "Details",
    name: "Name",
    email: "Email",
    phone: "Phone",
    service: "Service",
    date: "Date",
    address: "Address",
    interestedCompanies: "Interested companies",
    noCompanies:
      "No company has taken your request yet. As soon as a partner is interested, it will appear here.",
    interested: "Interested",
    executed: "Completed",
    markDone: "Done",
    rateTitle: "Rate a company",
    rateHint: "After completion you can leave your feedback.",
    company: "Company",
    pleaseSelect: "Please select",
    stars: "Stars",
    comment: "Comment",
    optional: "Optional",
    submitRating: "Submit rating",
    sending: "Sending…",
    rateSuccess: "Thank you for your rating.",
    messageTitle: "Message to AuftragKompass",
    messageHint: "Questions, cancellation or notes about your request.",
    messagePlaceholder: "Your message…",
    sendMessage: "Send message",
    messageSuccess: "Your message has been sent.",
    invalidLink: "Invalid link",
    backHome: "Back to home",
    confirmPageTitle: "Confirming your request…",
    confirmPageDone: "Confirmed",
    confirmPageWait: "Please wait a moment. Then we open your tracking portal.",
    error: "Error",
    openTrackingAnyway: "Open tracking anyway",
    current: "Current",
    savedExecution: "Completion saved.",
    chooseCompany: "Please select a company.",
    chatTitle: "Chat with companies",
    chatHint: "Message companies that purchased your request directly.",
    chatOpen: "Open chat",
    chatBack: "Back to overview",
    chatEmpty: "No messages yet. Send the first message.",
    chatNoCompanies: "Chat becomes available once a company purchases your request.",
    chatPlaceholder: "Write a message…",
    chatSend: "Send",
    chatYou: "You",
    chatCompany: "Company",
    chatAdmin: "AuftragKompass",
    chatUnread: "new",
    steps: {
      received: "Request received",
      confirmed: "Email confirmed",
      forwarded: "Forwarded to companies",
      interest: "Company interested",
      executed: "Job completed",
      done: "Finished",
    },
  },
  ar: {
    brandSubtitle: "متابعة الطلب",
    toWebsite: "الموقع",
    language: "اللغة",
    portalEyebrow: "بوابة العميل",
    homeTitle: "متابعة الطلب",
    homeIntro:
      "افتح الرابط من رسالة التأكيد أو أدخل بريدك الإلكتروني / رمز التتبع.",
    tokenLabel: "البريد الإلكتروني أو رمز التتبع",
    tokenPlaceholder: "name@email.com أو الرمز",
    openRequest: "فتح الطلب",
    tokenError: "من فضلك أدخل بريدك الإلكتروني أو رمز تتبع صالح.",
    signingIn: "جاري تسجيل الدخول…",
    authRedirectError: "فشل تسجيل الدخول. سجّل من الموقع مرة أخرى.",
    noOffersForAccount: "لا يوجد طلب مرتبط بهذا الحساب.",
    trackTitle: "تابع طلبك خطوة بخطوة",
    requestNumber: "طلب",
    confirmed: "مؤكد",
    waitingConfirm: "بانتظار التأكيد",
    confirmNow: "تأكيد الطلب الآن",
    confirming: "جاري التأكيد…",
    confirmSuccess: "تم تأكيد طلبك.",
    status: "الحالة",
    statusHint: "الوضع الحالي لطلبك",
    companiesCount: "شركات",
    details: "التفاصيل",
    name: "الاسم",
    email: "البريد",
    phone: "الهاتف",
    service: "الخدمة",
    date: "الموعد",
    address: "العنوان",
    interestedCompanies: "الشركات المهتمة",
    noCompanies:
      "لم تستلم أي شركة طلبك بعد. بمجرد اهتمام شريك سيظهر هنا.",
    interested: "مهتمة",
    executed: "تم التنفيذ",
    markDone: "تم",
    rateTitle: "تقييم الشركة",
    rateHint: "بعد التنفيذ يمكنك ترك ملاحظاتك.",
    company: "الشركة",
    pleaseSelect: "اختر",
    stars: "النجوم",
    comment: "تعليق",
    optional: "اختياري",
    submitRating: "إرسال التقييم",
    sending: "جاري الإرسال…",
    rateSuccess: "شكرًا لتقييمك.",
    messageTitle: "رسالة إلى AuftragKompass",
    messageHint: "أسئلة أو إلغاء أو ملاحظات حول طلبك.",
    messagePlaceholder: "رسالتك…",
    sendMessage: "إرسال الرسالة",
    messageSuccess: "تم إرسال رسالتك.",
    invalidLink: "رابط غير صالح",
    backHome: "العودة للرئيسية",
    confirmPageTitle: "جاري تأكيد الطلب…",
    confirmPageDone: "تم التأكيد",
    confirmPageWait: "انتظر لحظة، ثم نفتح بوابة المتابعة.",
    error: "خطأ",
    openTrackingAnyway: "فتح المتابعة على أي حال",
    current: "الحالي",
    savedExecution: "تم حفظ التنفيذ.",
    chooseCompany: "من فضلك اختر شركة.",
    chatTitle: "محادثة مع الشركات",
    chatHint: "تواصل مباشرة مع الشركات التي اشترت طلبك.",
    chatOpen: "فتح المحادثة",
    chatBack: "العودة للقائمة",
    chatEmpty: "لا توجد رسائل بعد. أرسل أول رسالة.",
    chatNoCompanies: "الشات يظهر بعد ما تشتري شركة طلبك.",
    chatPlaceholder: "اكتب رسالة…",
    chatSend: "إرسال",
    chatYou: "أنت",
    chatCompany: "الشركة",
    chatAdmin: "AuftragKompass",
    chatUnread: "جديد",
    steps: {
      received: "تم استلام الطلب",
      confirmed: "تم تأكيد البريد",
      forwarded: "تم التحويل للشركات",
      interest: "شركة مهتمة",
      executed: "تم تنفيذ الطلب",
      done: "مكتمل",
    },
  },
  fr: {
    brandSubtitle: "Suivre la demande",
    toWebsite: "Site web",
    language: "Langue",
    portalEyebrow: "Portail client",
    homeTitle: "Suivre votre demande",
    homeIntro:
      "Ouvrez le lien de votre e-mail de confirmation ou saisissez votre e-mail / jeton de suivi.",
    tokenLabel: "E-mail ou jeton de suivi",
    tokenPlaceholder: "name@email.com ou jeton",
    openRequest: "Ouvrir la demande",
    tokenError: "Veuillez saisir votre e-mail ou un jeton de suivi valide.",
    signingIn: "Connexion en cours…",
    authRedirectError: "Échec de la connexion. Veuillez vous reconnecter via le site.",
    noOffersForAccount: "Aucune demande trouvée pour ce compte.",
    trackTitle: "Suivez votre demande étape par étape",
    requestNumber: "Demande",
    confirmed: "Confirmée",
    waitingConfirm: "En attente de confirmation",
    confirmNow: "Confirmer maintenant",
    confirming: "Confirmation…",
    confirmSuccess: "Votre demande a été confirmée.",
    status: "Statut",
    statusHint: "État actuel de votre demande",
    companiesCount: "entreprises",
    details: "Détails",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    service: "Service",
    date: "Date",
    address: "Adresse",
    interestedCompanies: "Entreprises intéressées",
    noCompanies:
      "Aucune entreprise n’a encore pris votre demande. Dès qu’un partenaire est intéressé, il apparaîtra ici.",
    interested: "Intéressée",
    executed: "Réalisée",
    markDone: "Terminé",
    rateTitle: "Noter une entreprise",
    rateHint: "Après la réalisation, vous pouvez laisser votre avis.",
    company: "Entreprise",
    pleaseSelect: "Veuillez choisir",
    stars: "Étoiles",
    comment: "Commentaire",
    optional: "Facultatif",
    submitRating: "Envoyer l’avis",
    sending: "Envoi…",
    rateSuccess: "Merci pour votre avis.",
    messageTitle: "Message à AuftragKompass",
    messageHint: "Questions, annulation ou remarques sur votre demande.",
    messagePlaceholder: "Votre message…",
    sendMessage: "Envoyer le message",
    messageSuccess: "Votre message a été envoyé.",
    invalidLink: "Lien invalide",
    backHome: "Retour à l’accueil",
    confirmPageTitle: "Confirmation en cours…",
    confirmPageDone: "Confirmée",
    confirmPageWait:
      "Veuillez patienter. Nous ouvrons ensuite votre portail de suivi.",
    error: "Erreur",
    openTrackingAnyway: "Ouvrir le suivi quand même",
    current: "Actuel",
    savedExecution: "Réalisation enregistrée.",
    chooseCompany: "Veuillez choisir une entreprise.",
    chatTitle: "Chat avec les entreprises",
    chatHint: "Écrivez directement aux entreprises qui ont acheté votre demande.",
    chatOpen: "Ouvrir le chat",
    chatBack: "Retour à l’aperçu",
    chatEmpty: "Pas encore de messages. Envoyez le premier.",
    chatNoCompanies: "Le chat est disponible dès qu’une entreprise achète votre demande.",
    chatPlaceholder: "Écrire un message…",
    chatSend: "Envoyer",
    chatYou: "Vous",
    chatCompany: "Entreprise",
    chatAdmin: "AuftragKompass",
    chatUnread: "nouveau",
    steps: {
      received: "Demande reçue",
      confirmed: "E-mail confirmé",
      forwarded: "Transmise aux entreprises",
      interest: "Entreprise intéressée",
      executed: "Travail réalisé",
      done: "Terminé",
    },
  },
  it: {
    brandSubtitle: "Segui la richiesta",
    toWebsite: "Sito web",
    language: "Lingua",
    portalEyebrow: "Portale clienti",
    homeTitle: "Segui la tua richiesta",
    homeIntro:
      "Apri il link dalla tua e-mail di conferma oppure inserisci la tua e-mail / token di tracciamento.",
    tokenLabel: "E-mail o token di tracciamento",
    tokenPlaceholder: "name@email.com o token",
    openRequest: "Apri richiesta",
    tokenError: "Inserisci la tua e-mail o un token di tracciamento valido.",
    signingIn: "Accesso in corso…",
    authRedirectError: "Accesso non riuscito. Accedi di nuovo dal sito.",
    noOffersForAccount: "Nessuna richiesta trovata per questo account.",
    trackTitle: "Segui la tua richiesta passo dopo passo",
    requestNumber: "Richiesta",
    confirmed: "Confermata",
    waitingConfirm: "In attesa di conferma",
    confirmNow: "Conferma ora",
    confirming: "Conferma in corso…",
    confirmSuccess: "La tua richiesta è stata confermata.",
    status: "Stato",
    statusHint: "Stato attuale della tua richiesta",
    companiesCount: "aziende",
    details: "Dettagli",
    name: "Nome",
    email: "E-mail",
    phone: "Telefono",
    service: "Servizio",
    date: "Data",
    address: "Indirizzo",
    interestedCompanies: "Aziende interessate",
    noCompanies:
      "Nessuna azienda ha ancora preso la tua richiesta. Appena un partner è interessato, comparirà qui.",
    interested: "Interessata",
    executed: "Eseguita",
    markDone: "Fatto",
    rateTitle: "Valuta un’azienda",
    rateHint: "Dopo l’esecuzione puoi lasciare il tuo feedback.",
    company: "Azienda",
    pleaseSelect: "Seleziona",
    stars: "Stelle",
    comment: "Commento",
    optional: "Opzionale",
    submitRating: "Invia valutazione",
    sending: "Invio…",
    rateSuccess: "Grazie per la valutazione.",
    messageTitle: "Messaggio a AuftragKompass",
    messageHint: "Domande, cancellazione o note sulla tua richiesta.",
    messagePlaceholder: "Il tuo messaggio…",
    sendMessage: "Invia messaggio",
    messageSuccess: "Il tuo messaggio è stato inviato.",
    invalidLink: "Link non valido",
    backHome: "Torna alla home",
    confirmPageTitle: "Conferma in corso…",
    confirmPageDone: "Confermata",
    confirmPageWait:
      "Attendi un momento. Poi apriamo il portale di tracciamento.",
    error: "Errore",
    openTrackingAnyway: "Apri comunque il tracciamento",
    current: "Attuale",
    savedExecution: "Esecuzione salvata.",
    chooseCompany: "Seleziona un’azienda.",
    chatTitle: "Chat con le aziende",
    chatHint: "Scrivi direttamente alle aziende che hanno acquistato la tua richiesta.",
    chatOpen: "Apri chat",
    chatBack: "Torna alla panoramica",
    chatEmpty: "Nessun messaggio ancora. Invia il primo.",
    chatNoCompanies: "La chat è disponibile quando un’azienda acquista la tua richiesta.",
    chatPlaceholder: "Scrivi un messaggio…",
    chatSend: "Invia",
    chatYou: "Tu",
    chatCompany: "Azienda",
    chatAdmin: "AuftragKompass",
    chatUnread: "nuovo",
    steps: {
      received: "Richiesta ricevuta",
      confirmed: "E-mail confermata",
      forwarded: "Inoltrata alle aziende",
      interest: "Azienda interessata",
      executed: "Lavoro eseguito",
      done: "Completata",
    },
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale] || messages.de;
}
