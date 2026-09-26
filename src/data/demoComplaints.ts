import { ComplaintData } from '../types';

export const INITIAL_DEMO_COMPLAINTS: ComplaintData[] = [
  {
    id: "JNC-2026-0001",
    citizenDescription: "எங்கள் பகுதியில் கடந்த மூன்று நாட்களாக குடிநீர் வரவில்லை. குழாய்களில் தண்ணீர் விநியோகம் முற்றிலும் நின்றுவிட்டது.",
    location: "அண்ணா நகர் 4வது மெயின் ரோடு",
    district: "சென்னை",
    state: "தமிழ்நாடு",
    contactName: "கார்த்திக்",
    contactPhone: "9876543210",
    categoryId: "water",
    categoryName: {
      en: "Water Supply",
      ta: "குடிநீர் வழங்கல்",
      hi: "जल आपूर्ति"
    },
    departmentName: {
      en: "Municipal Water Supply & Sewerage Board",
      ta: "மாநகராட்சி குடிநீர் வழங்கல் மற்றும் கழிவுநீரக வாரியம்",
      hi: "नगर निगम जल आपूर्ति एवं सीवरेज बोर्ड"
    },
    issueTitle: {
      en: "Drinking Water Supply Interruption",
      ta: "குடிநீர் விநியோகம் தடையாதல்",
      hi: "पेयजल आपूर्ति में व्यवधान"
    },
    priority: "Urgent",
    aiSummary: {
      en: "🚨 Urgent: Drinking water supply halted for 3 days in Anna Nagar — 48h SLA. Severe hardship, risk of dehydration. AI triaged as Urgent.",
      ta: "அண்ணா நகர் 4வது மெயின் ரோடு பகுதியில் கடந்த 3 நாட்களாக குடிநீர் விநியோகம் முற்றிலும் தடைபட்டுள்ளதால் பொதுமக்கள் அவதிப்படுகின்றனர்.",
      hi: "अण्णा नगर 4थ मेन रोड में पिछले 3 दिनों से पेयजल आपूर्ति पूरी तरह से ठप है, जिससे निवासियों को भारी परेशानी हो रही है।"
    },
    requestedAction: {
      en: "Priority Order #2 — Urgent Queue: Inspect pipeline leaks/valves within 24h and restore supply within 48h SLA.",
      ta: "குழாய் அடைப்பு மற்றும் வால்வுகளை உடனடியாக ஆய்வு செய்து குடிநீர் விநியோகத்தை சீரமைக்கவும்.",
      hi: "पाइपलाइन रिसाव/वाल्व का तुरंत निरीक्षण करें और सामान्य पेयजल आपूर्ति बहाल करें।"
    },
    geoLocation: {
      latitude: 13.0827,
      longitude: 80.2100,
      accuracy: 18,
      address: "Anna Nagar 4th Main Road, Chennai, Tamil Nadu 600040, India",
      ward: "Ward 8",
      pincode: "600040",
      timestamp: "2026-09-20T09:30:00.000Z",
      source: "gps"
    },
    status: "In Progress",
    createdAt: "2026-09-20T09:30:00.000Z",
    updatedAt: "2026-09-22T14:15:00.000Z",
    statusHistory: [
      {
        status: "Submitted",
        timestamp: "2026-09-20T09:30:00.000Z",
        note: {
          en: "Complaint logged via JanConnect portal.",
          ta: "ஜன்கனெக்ட் தளம் வழியாக புகார் பதிவு செய்யப்பட்டது.",
          hi: "जनकनेक्ट पोर्टल के माध्यम से शिकायत दर्ज की गई।"
        }
      },
      {
        status: "Under Review",
        timestamp: "2026-09-20T11:45:00.000Z",
        note: {
          en: "Grievance cell assigned reference ID and reviewed priority.",
          ta: "குறைதீர்ப்பு மையம் முன்னுரிமையை ஆய்வு செய்து ஏற்றுக்கொண்டது.",
          hi: "शिकायत प्रकोष्ठ ने संदर्भ आईडी आवंटित की और प्राथमिकता की समीक्षा की।"
        }
      },
      {
        status: "Assigned",
        timestamp: "2026-09-21T08:20:00.000Z",
        note: {
          en: "Assigned to Executive Engineer, Water Works Zone 5.",
          ta: "மண்டலம் 5 குடிநீர் பொறியாளருக்கு ஒதுக்கப்பட்டது.",
          hi: "कार्यकारी इंजीनियर, जल कार्य क्षेत्र 5 को आवंटित।"
        }
      },
      {
        status: "In Progress",
        timestamp: "2026-09-22T14:15:00.000Z",
        note: {
          en: "Repair crew dispatched to repair main distribution valve.",
          ta: "முக்கிய குடிநீர் வால்வை சீரமைக்க விநியோகக் குழு அனுப்பப்பட்டுள்ளது.",
          hi: "मुख्य वितरण वाल्व की मरम्मत के लिए क्रू भेजा गया है।"
        }
      }
    ]
  },
  {
    id: "JNC-2026-0002",
    citizenDescription: "আমাদের এলাকায় গত তিন দিন ধরে রাস্তার আলো জ্বলছে না। (Hindi demo: हमारे इलाके में मुख्य मार्ग की स्ट्रीट लाइटें पिछले एक हफ्ते से खराब हैं।)",
    location: "वैशाली नगर मुख्य चौराहा",
    district: "जयपुर",
    state: "राजस्थान",
    contactName: "सुरेश शर्मा",
    contactPhone: "9812345678",
    categoryId: "street_lights",
    categoryName: {
      en: "Street Lights",
      ta: "தெருவிளக்குகள்",
      hi: "स्ट्रीट लाइट"
    },
    departmentName: {
      en: "Municipal Electrical & Public Lighting Wing",
      ta: "மாநகராட்சி மின்சார மற்றும் தெருவிளக்குப் பிரிவு",
      hi: "नगर पालिका विद्युत एवं स्ट्रीट लाइट विभाग"
    },
    issueTitle: {
      en: "Main Road Street Light Failure",
      ta: "பிரதான சாலை தெருவிளக்கு பழுது",
      hi: "मुख्य मार्ग स्ट्रीट लाइट खराबी"
    },
    priority: "Medium",
    aiSummary: {
      en: "Multiple street light poles on Vaishali Nagar main road junction are inactive causing safety hazards during night hours.",
      ta: "வைஷாலி நகர் பிரதான சந்திப்பில் உள்ள தெருவிளக்குகள் எரியாததால் இரவு நேரத்தில் பொதுமக்களுக்குப் பாதுகாப்பு அச்சுறுத்தல் உள்ளது.",
      hi: "वैशाली नगर मुख्य चौराहा मार्ग पर कई स्ट्रीट लाइट खंभे काम नहीं कर रहे हैं, जिससे रात के समय सुरक्षा का खतरा बना हुआ है।"
    },
    requestedAction: {
      en: "Replace burnt LED bulbs and repair central lighting cable connector.",
      ta: "பழுதான எல்.இ.டி விளக்குகளை மாற்றி மின் இணைப்பைச் சீரமைக்கவும்.",
      hi: "जले हुए एलईडी बल्बों को बदलें और केंद्रीय प्रकाश केबल कनेक्टर की मरम्मत करें।"
    },
    geoLocation: {
      latitude: 26.9124,
      longitude: 75.7873,
      accuracy: 32,
      address: "Vaishali Nagar Main Chowk, Jaipur, Rajasthan 302021, India",
      ward: "Ward 12",
      pincode: "302021",
      timestamp: "2026-09-18T16:00:00.000Z",
      source: "gps"
    },
    status: "Resolved",
    createdAt: "2026-09-18T16:00:00.000Z",
    updatedAt: "2026-09-21T17:30:00.000Z",
    statusHistory: [
      {
        status: "Submitted",
        timestamp: "2026-09-18T16:00:00.000Z",
        note: {
          en: "Complaint submitted online.",
          ta: "புகார் ஆன்லைனில் பதிவு செய்யப்பட்டது.",
          hi: "शिकायत ऑनलाइन दर्ज की गई।"
        }
      },
      {
        status: "Under Review",
        timestamp: "2026-09-19T09:00:00.000Z",
        note: {
          en: "Reviewed by Electrical Department Desk.",
          ta: "மின்சாரப் பிரிவு அலுவலரால் ஆய்வு செய்யப்பட்டது.",
          hi: "विद्युत विभाग डेस्क द्वारा समीक्षा की गई।"
        }
      },
      {
        status: "Assigned",
        timestamp: "2026-09-19T11:30:00.000Z",
        note: {
          en: "Assigned to Line Inspector, Zone 3.",
          ta: "மண்டலம் 3 மின்சார ஆய்வாளருக்கு ஒதுக்கப்பட்டது.",
          hi: "लाइन इंस्पेक्टर, ज़ोन 3 को आवंटित।"
        }
      },
      {
        status: "In Progress",
        timestamp: "2026-09-20T10:00:00.000Z",
        note: {
          en: "Maintenance van replacing 6 LED fittings.",
          ta: "பராமரிப்பு வாகனம் மூலம் 6 எல்.இ.டி விளக்குகள் மாற்றப்பட்டு வருகின்றன.",
          hi: "रखरखाव वैन 6 एलईडी फिटिंग्स बदल रही है।"
        }
      },
      {
        status: "Resolved",
        timestamp: "2026-09-21T17:30:00.000Z",
        note: {
          en: "All street lights successfully restored and verified.",
          ta: "அனைத்து தெருவிளக்குகளும் சீரமைக்கப்பட்டு சரிபார்க்கப்பட்டன.",
          hi: "सभी स्ट्रीट लाइटें सफलतापूर्वक बहाल और सत्यापित कर दी गईं।"
        }
      }
    ]
  },
  {
    id: "JNC-2026-0003",
    citizenDescription: "Large pothole on Indiranagar 100ft road near bus stop creating severe traffic delays and risk of accidents.",
    location: "Indiranagar 100ft Road Bus Stand",
    district: "Bengaluru",
    state: "Karnataka",
    contactName: "Anand Kumar",
    contactPhone: "9900112233",
    categoryId: "roads",
    categoryName: {
      en: "Roads & Potholes",
      ta: "சாலைகள் மற்றும் பள்ளங்கள்",
      hi: "सड़कें और गड्ढे"
    },
    departmentName: {
      en: "Highways & Public Works Department (PWD)",
      ta: "நெடுஞ்சாலைகள் மற்றும் பொதுப்பணித் துறை",
      hi: "लोक निर्माण विभाग (पीडब्ल्यूडी)"
    },
    issueTitle: {
      en: "Dangerous Pothole on Main Arterial Road",
      ta: "பிரதான சாலையில் ஆபத்தான குழி",
      hi: "मुख्य सड़क पर खतरनाक गड्ढा"
    },
    priority: "High",
    aiSummary: {
      en: "Deep asphalt pothole near bus stand causes traffic congestion and vehicle damage during peak commuting hours.",
      ta: "பேருந்து நிறுத்தம் அருகே உள்ள ஆழமான சாலைக் குழி போக்குவரத்து நெரிசலையும் வாகனப் பழுதையும் ஏற்படுத்துகிறது.",
      hi: "बस स्टैंड के पास गहरा सड़क का गड्ढा पीक आवर्स के दौरान ट्रैफिक जाम और वाहनों को नुकसान पहुंचा रहा है।"
    },
    requestedAction: {
      en: "Deploy cold-mix asphalt patch team immediately to level the road surface.",
      ta: "சாலையைச் சீரமைக்கத் தார் பூச்சுக் குழுவை உடனடியாக அனுப்பவும்.",
      hi: "सड़क की सतह को समतल करने के लिए तुरंत पैच वर्क टीम तैनात करें।"
    },
    geoLocation: {
      latitude: 12.9784,
      longitude: 77.6408,
      accuracy: 22,
      address: "Indiranagar 100ft Road, Bengaluru, Karnataka 560038, India",
      ward: "Ward 5",
      pincode: "560038",
      timestamp: "2026-09-23T08:15:00.000Z",
      source: "gps"
    },
    status: "Under Review",
    createdAt: "2026-09-23T08:15:00.000Z",
    updatedAt: "2026-09-23T09:00:00.000Z",
    statusHistory: [
      {
        status: "Submitted",
        timestamp: "2026-09-23T08:15:00.000Z",
        note: {
          en: "Complaint logged via JanConnect AI portal.",
          ta: "ஜன்கனெக்ட் AI தளம் வழியாகப் பதிவு செய்யப்பட்டது.",
          hi: "जनकनेक्ट एआई पोर्टल के माध्यम से शिकायत दर्ज की गई।"
        }
      },
      {
        status: "Under Review",
        timestamp: "2026-09-23T09:00:00.000Z",
        note: {
          en: "PWD Control Room assessing complaint photo & location.",
          ta: "பொதுப்பணித் துறை கட்டுப்பாட்டு மையம் புகாரை ஆய்வு செய்கிறது.",
          hi: "पीडब्ल्यूडी नियंत्रण कक्ष शिकायत की स्थान समीक्षा कर रहा है।"
        }
      }
    ]
  },
  {
    id: "JNC-2026-0004",
    citizenDescription: "Emergency: Open manhole near government school, 5ft deep, children walk here daily. Sewage overflow and live electric wire hanging nearby — immediate danger!",
    location: "MG Road, Near Govt School Gate",
    district: "Chennai",
    state: "Tamil Nadu",
    contactName: "Priya Nair",
    contactPhone: "9123456780",
    categoryId: "drainage",
    categoryName: { en: "Drainage & Sewage", ta: "கழிவுநீர் மற்றும் சாக்கடை", hi: "जल निकासी और सीवरेज" },
    departmentName: { en: "Underground Drainage & Sewerage Board", ta: "பாதாள சாக்கடை மற்றும் கழிவுநீர் வாரியம்", hi: "भूमिगत जल निकासी एवं सीवरेज बोर्ड" },
    issueTitle: { en: "🚨 Emergency: Open Manhole + Live Wire Near School", ta: "🚨 அவசரநிலை: பள்ளி அருகே திறந்த சாக்கடை", hi: "🚨 आपातकाल: स्कूल के पास खुला मैनहोल" },
    priority: "Emergency",
    aiSummary: {
      en: "🚨 EMERGENCY 24h SLA: Open 5ft manhole + sewage overflow + live wire near Govt School. AI triaged as Emergency — life/safety risk to children. Queue #1 — dispatch now.",
      ta: "🚨 அவசரநிலை 24 மணி SLA: பள்ளி அருகே திறந்த சாக்கடை, கழிவுநீர் வழிதல், தொங்கும் மின்கம்பி — குழந்தைகளுக்கு உயிர் ஆபத்து.",
      hi: "🚨 आपातकाल 24 घंटे SLA: स्कूल के पास 5 फीट खुला मैनहोल, सीवर ओवरफ्लो और लटकता बिजली तार — बच्चों के लिए जानलेवा।"
    },
    requestedAction: {
      en: "PRIORITY #1 — Emergency Queue: Barricade & cover manhole within 4h, isolate live wire, dewater sewage within 24h SLA. Notify nodal officer immediately.",
      ta: "முன்னுரிமை #1 — உடனடியாக தடுப்பு அமைத்து மேன்ஹோலை மூடவும், மின் இணைப்பை துண்டிக்கவும்.",
      hi: "प्राथमिकता #1 — 4 घंटे में बैरिकेड लगाएं, मैनहोल कवर करें, 24 घंटे में निस्तारण करें।"
    },
    geoLocation: {
      latitude: 13.067,
      longitude: 80.236,
      accuracy: 12,
      address: "MG Road Govt School Gate, Chennai, Tamil Nadu 600006, India",
      ward: "Ward 6",
      pincode: "600006",
      timestamp: "2026-09-24T06:00:00.000Z",
      source: "gps"
    },
    status: "Submitted",
    createdAt: "2026-09-24T06:00:00.000Z",
    updatedAt: "2026-09-24T06:00:00.000Z",
    statusHistory: [
      {
        status: "Submitted",
        timestamp: "2026-09-24T06:00:00.000Z",
        note: {
          en: "🚨 Emergency triaged: open manhole near school — 24h SLA, queue #1. Routed to Drainage Board + Safety cell.",
          ta: "🚨 அவசரநிலையாக வகைப்படுத்தப்பட்டது — 24 மணி SLA.",
          hi: "🚨 आपातकाल के रूप में वर्गीकृत — 24 घंटे SLA।"
        }
      }
    ]
  }
];
