import { AnalysisResult, CategoryId, Language, Priority } from '../types';
import { CATEGORIES, getCategoryById } from '../data/categories';

// Multilingual keyword dictionary for classification
const KEYWORD_MAP: Record<CategoryId, { en: string[]; ta: string[]; hi: string[] }> = {
  water: {
    en: ['water', 'drinking', 'supply', 'tap', 'pipe', 'pipeline', 'tanker', 'pressure', 'leak'],
    ta: ['குடிநீர்', 'தண்ணீர்', 'நீர்', 'குழாய்', 'விநியோகம்', 'டேங்கர்', 'கசிவு'],
    hi: ['पानी', 'जल', 'आपूर्ति', 'नल', 'पाइप', 'टैंकर', 'रिसाव', 'पेयजल']
  },
  electricity: {
    en: ['electricity', 'power', 'current', 'voltage', 'transformer', 'wire', 'meter', 'outage', 'cut'],
    ta: ['மின்சாரம்', 'மின்தடை', 'கரண்ட்', 'மின்', 'மின்மாற்றி', 'மின்னழுத்தம்', 'கம்பி'],
    hi: ['बिजली', 'कटौती', 'पावर', 'ट्रान्सफॉर्मर', 'वोल्टेज', 'तार', 'मीटर']
  },
  roads: {
    en: ['road', 'pothole', 'tar', 'asphalt', 'street', 'divider', 'highway', 'speed breaker', 'broken road'],
    ta: ['சாலை', 'பள்ளம்', 'தெரு', 'ரோடு', 'தார்', 'நெடுஞ்சாலை', 'வேகத்தடை'],
    hi: ['सड़क', 'गड्ढा', 'रास्ता', 'मार्ग', 'हाईवे', 'स्पीड ब्रेकर', 'टूटी']
  },
  street_lights: {
    en: ['street light', 'lamp', 'dark', 'bulb', 'pole', 'flicker', 'night light'],
    ta: ['தெருவிளக்கு', 'லைட்', 'வெளிச்சம்', 'இருள்', 'மின் கம்பம்', 'விளக்கு'],
    hi: ['स्ट्रीट लाइट', 'लाइट', 'रोशनी', 'अंधेरा', 'बल्ब', 'खंभा']
  },
  garbage: {
    en: ['garbage', 'waste', 'dump', 'trash', 'litter', 'bin', 'dustbin', 'smell', 'odor'],
    ta: ['குப்பை', 'கழிவு', 'அழுக்கு', 'துர்நாற்றம்', 'தொட்டி', 'குப்பைத் தொட்டி'],
    hi: ['कचरा', 'गंदगी', 'कूड़ा', 'सफाई', 'बदबू', 'कूड़ेदान', 'कचरा गाड़ी']
  },
  drainage: {
    en: ['drainage', 'sewage', 'overflow', 'gutter', 'manhole', 'clog', 'blocked drain'],
    ta: ['சாக்கடை', 'கழிவுநீர்', 'அடைப்பு', 'மேன்ஹோல்', 'வாய்க்கால்', 'வழிதல்'],
    hi: ['नाली', 'सीवर', 'जलभराव', 'गंदा पानी', 'मैनहोल', 'रुकावट', 'जल निकासी']
  },
  transport: {
    en: ['bus', 'transport', 'stand', 'stop', 'shelter', 'route', 'conductor', 'driver'],
    ta: ['பேருந்து', 'போக்குவரத்து', 'பஸ்', 'நிறுத்தம்', 'நிழற்கூரை'],
    hi: ['बस', 'परिवहन', 'स्टॉप', 'बस स्टैंड', 'रूट', 'चालक']
  },
  healthcare: {
    en: ['hospital', 'doctor', 'health', 'clinic', 'mosquito', 'dengue', 'medicine', 'fever'],
    ta: ['மருத்துவமனை', 'டாக்டர்', 'சுகாதாரம்', 'கொசு', 'மருந்து', 'காய்ச்சல்', 'மருத்துவ மையம்'],
    hi: ['अस्पताल', 'डॉक्टर', 'स्वास्थ्य', 'मच्छर', 'दवा', 'बुखार', 'क्लीनिक']
  },
  sanitation: {
    en: ['toilet', 'hygiene', 'sanitation', 'restroom', 'public toilet', 'cleanliness'],
    ta: ['கழிப்பறை', 'துப்புரவு', 'சுவாசம்', 'பொதுக் கழிப்பறை', 'சுத்தம்'],
    hi: ['शौचालय', 'स्वच्छता', 'सार्वजनिक शौचालय', 'सफाई अभियान']
  },
  certificates: {
    en: ['certificate', 'birth', 'death', 'registrar', 'name change', 'spelling'],
    ta: ['சான்றிதழ்', 'பிறப்பு', 'இறப்பு', 'பதிவாளர்', 'பெயர் திருத்தம்'],
    hi: ['प्रमाण पत्र', 'जन्म', 'मृत्यु', 'पंजीकरण', 'नाम सुधार']
  },
  property_tax: {
    en: ['tax', 'property', 'house tax', 'bill', 'assessment', 'receipt'],
    ta: ['சொத்துவரி', 'வரி', 'வீட்டு வரி', 'ரசீது', 'கணக்கீடு'],
    hi: ['कर', 'संपत्ति कर', 'हाउस टैक्स', 'रसीद', 'मूल्यांकन']
  },
  police: {
    en: ['police', 'safety', 'crime', 'theft', 'nuisance', 'noise', 'parking', 'traffic'],
    ta: ['காவல்துறை', 'போலீஸ்', 'பாதுகாப்பு', 'திருட்டு', 'தொந்தரவு', 'சத்தம்', 'போக்குவரத்து நெரிசல்'],
    hi: ['पुलिस', 'सुरक्षा', 'चोरी', 'उपद्रव', 'शोर', 'पार्किंग', 'ट्रैफिक']
  },
  schemes: {
    en: ['ration', 'pension', 'scheme', 'subsidy', 'card', 'benefit', 'welfare'],
    ta: ['ரேஷன்', 'பென்ஷன்', 'திட்டம்', 'கார்டு', 'உதவித் தொகை', 'குடும்ப அட்டை'],
    hi: ['राशन', 'पेंशन', 'योजना', 'कार्ड', 'सब्सिडी', 'कल्याण']
  },
  other: {
    en: ['other', 'general', 'tree', 'branch', 'animal', 'dog', 'issue'],
    ta: ['இதர', 'பொது', 'மரம்', 'நாய்', 'விலங்கு'],
    hi: ['अन्य', 'सामान्य', 'पेड़', 'कुत्ता', 'पशु']
  }
};

export async function classifyComplaint(description: string, targetLang: Language): Promise<AnalysisResult> {
  const apiKey = import.meta.env.VITE_AI_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      // If external API key is provided, attempt live API call (with graceful fallback on failure)
      return await callExternalAIClassifier(description, targetLang, apiKey);
    } catch (err) {
      console.warn("External AI call failed, falling back to rule-based engine:", err);
    }
  }

  // Fallback Rule-Based AI Engine
  return runRuleBasedClassifier(description, targetLang);
}

function runRuleBasedClassifier(description: string, targetLang: Language): AnalysisResult {
  const lowerDesc = description.toLowerCase();
  
  let bestCategory: CategoryId = 'other';
  let maxMatches = 0;

  for (const [catId, keywordsObj] of Object.entries(KEYWORD_MAP)) {
    let matches = 0;
    const allKeywords = [...keywordsObj.en, ...keywordsObj.ta, ...keywordsObj.hi];
    for (const kw of allKeywords) {
      if (lowerDesc.includes(kw.toLowerCase())) {
        matches += 1;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = catId as CategoryId;
    }
  }

  const categoryInfo = getCategoryById(bestCategory);

  // Priority detection
  let priority: Priority = 'Medium';
  const highPriorityKeywords = [
    'urgent', 'danger', 'hazard', 'hospital', 'fire', 'leak', 'accident', 'days', '3 days', 'week', 'blood',
    'உடனடி', 'ஆபத்து', '3 நாட்கள்', 'நாட்களாக', 'மருத்துவமனை', 'அவசியம்',
    'तुरंत', 'खतरा', '3 दिन', 'तीन दिन', 'अस्पताल', 'गंभीर', 'दुर्घटना'
  ];

  for (const hpkw of highPriorityKeywords) {
    if (lowerDesc.includes(hpkw.toLowerCase())) {
      priority = 'High';
      break;
    }
  }

  // Generate multi-lingual issue titles, AI summaries, and requested actions
  const issueTitle: Record<Language, string> = {
    en: `${categoryInfo.name.en} Issue Reported`,
    ta: `${categoryInfo.name.ta} பிரச்சினை பதிவு செய்யப்பட்டது`,
    hi: `${categoryInfo.name.hi} समस्या दर्ज की गई`
  };

  let summaryEn = `The citizen has reported a public grievance regarding ${categoryInfo.name.en.toLowerCase()}: "${description.slice(0, 150)}${description.length > 150 ? '...' : ''}". Prompt action is required.`;
  let summaryTa = `குடிமகன் தனது பகுதியில் ${categoryInfo.name.ta.toLowerCase()} தொடர்பான பின்வரும் பிரச்சினையைத் தெரிவித்துள்ளார்: "${description.slice(0, 150)}${description.length > 150 ? '...' : ''}". உடனடியாக நடவடிக்கை தேவைப்படுகிறது.`;
  let summaryHi = `नागरिक ने अपने क्षेत्र में ${categoryInfo.name.hi.toLowerCase()} से संबंधित शिकायत दर्ज कराई है: "${description.slice(0, 150)}${description.length > 150 ? '...' : ''}"। तुरंत कार्रवाई आवश्यक है।`;

  // Tailor specific summaries for water, electricity, roads, garbage, street lights
  if (bestCategory === 'water') {
    summaryEn = `Drinking water supply interruption reported. Resident states: "${description}". Requires urgent water department inspection and supply restoration.`;
    summaryTa = `குடிநீர் வழங்கல் தடை குறித்து புகார் அளிக்கப்பட்டு உள்ளது: "${description}". உடனடியாக குடிநீர் வடிகால் வாரியம் மூலம் சீரமைக்கக் கோரப்படுகிறது.`;
    summaryHi = `पेयजल आपूर्ति में व्यवधान की शिकायत: "${description}"। जल बोर्ड द्वारा तत्काल निरीक्षण एवं जलापूर्ति बहाल करने का अनुरोध किया गया है।`;
  } else if (bestCategory === 'electricity') {
    summaryEn = `Power failure/electrical infrastructure issue reported: "${description}". Needs line inspector field check.`;
    summaryTa = `மின்சாரத் தடை / பழுது குறித்துப் புகார்: "${description}". மின்சார வாரியக் குழுவின் நேரடி ஆய்வு தேவைப்படுகிறது.`;
    summaryHi = `बिजली कटौती / विद्युत अवसंरचना समस्या: "${description}"। बिजली विभाग की टीम द्वारा निरीक्षण आवश्यक है।`;
  } else if (bestCategory === 'roads') {
    summaryEn = `Road surface damage / pothole complaint logged: "${description}". Highway PWD repair crew needed.`;
    summaryTa = `சாலைப் பள்ளம் / பழுது குறித்துப் புகார்: "${description}". நெடுஞ்சாலைத் துறை மூலம் தார்ச் சீரமைப்பு தேவை.`;
    summaryHi = `सड़क क्षति / गड्ढे की शिकायत दर्ज: "${description}"। पीडब्ल्यूडी मरम्मत टीम की आवश्यकता है।`;
  } else if (bestCategory === 'garbage') {
    summaryEn = `Uncleared garbage and sanitation concern: "${description}". Municipal solid waste team dispatch required.`;
    summaryTa = `அகற்றப்படாத குப்பைகள் மற்றும் சுகாதாரப் பிரச்சினை: "${description}". தூய்மைப் பணியாளர்கள் மூலம் அகற்றுதல் தேவை.`;
    summaryHi = `अनपेक्षित कचरा और स्वच्छता की समस्या: "${description}"। नगर निगम की सफाई टीम द्वारा निस्तारण आवश्यक है।`;
  } else if (bestCategory === 'street_lights') {
    summaryEn = `Non-functional street lighting reported: "${description}". Electrical department maintenance needed.`;
    summaryTa = `எரியாத தெருவிளக்குகள் பற்றிப் புகார்: "${description}". மின்சாரப் பிரிவு மூலம் விளக்குகளை மாற்ற வேண்டும்.`;
    summaryHi = `खराब स्ट्रीट लाइट की शिकायत: "${description}"। विद्युत विभाग द्वारा मरम्मत आवश्यक है।`;
  }

  const requestedAction: Record<Language, string> = {
    en: `Please dispatch field inspection team to verify "${categoryInfo.name.en}" issue and resolve within standard SLA timeline.`,
    ta: `தயவுசெய்து ${categoryInfo.name.ta} தொடர்பான ஆய்வுக் குழுவை அனுப்பி நிர்ணயிக்கப்பட்ட காலக்கெடுவிற்குள் தீர்வு காண நடவடிக்கை எடுக்கவும்.`,
    hi: `कृपया ${categoryInfo.name.hi} से संबंधित समस्या के सत्यापन के लिए टीम भेजें और समय सीमा के भीतर समाधान करें।`
  };

  return {
    categoryId: bestCategory,
    categoryName: categoryInfo.name,
    departmentName: categoryInfo.department,
    issueTitle,
    priority,
    aiSummary: {
      en: summaryEn,
      ta: summaryTa,
      hi: summaryHi
    },
    requestedAction
  };
}

async function callExternalAIClassifier(description: string, targetLang: Language, apiKey: string): Promise<AnalysisResult> {
  // Mock external API call using Gemini / custom model endpoint if configured
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `You are an AI citizen grievance classifier for JanConnect India. Analyze this citizen complaint: "${description}". Output JSON with fields: category (one of water, electricity, roads, street_lights, garbage, drainage, transport, healthcare, sanitation, certificates, property_tax, police, schemes, other), priority (High, Medium, Low), summaryEn, summaryTa, summaryHi.`
        }]
      }]
    })
  });
  
  if (!res.ok) {
    throw new Error(`API responded with code ${res.status}`);
  }

  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  // Try parsing JSON from LLM output
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const parsed = JSON.parse(jsonMatch[0]);
    const catId = (parsed.category || 'water') as CategoryId;
    const catInfo = getCategoryById(catId);
    
    return {
      categoryId: catId,
      categoryName: catInfo.name,
      departmentName: catInfo.department,
      issueTitle: {
        en: `${catInfo.name.en} Grievance`,
        ta: `${catInfo.name.ta} புகார்`,
        hi: `${catInfo.name.hi} शिकायत`
      },
      priority: (parsed.priority || 'Medium') as Priority,
      aiSummary: {
        en: parsed.summaryEn || description,
        ta: parsed.summaryTa || description,
        hi: parsed.summaryHi || description
      },
      requestedAction: {
        en: "Inspect and resolve the issue on top priority.",
        ta: "பிரச்சினையை முன்னுரிமை கொடுத்துச் சீரமைக்கவும்.",
        hi: "समस्या का प्राथमिकता से निस्तारण करें।"
      }
    };
  }

  return runRuleBasedClassifier(description, targetLang);
}
