import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'water',
    iconName: 'Droplets',
    name: {
      en: 'Water Supply',
      ta: 'குடிநீர் வழங்கல்',
      hi: 'जल आपूर्ति'
    },
    department: {
      en: 'Municipal Water Supply & Sewerage Board',
      ta: 'மாநகராட்சி குடிநீர் வழங்கல் மற்றும் கழிவுநீரக வாரியம்',
      hi: 'नगर निगम जल आपूर्ति एवं सीवरेज बोर्ड'
    },
    description: {
      en: 'No water supply, contaminated water, pipeline leaks, low pressure, tap damage',
      ta: 'குடிநீர் வரவில்லை, மாசுபட்ட நீர், குழாய் கசிவு, குறைந்த அழுத்தம்',
      hi: 'पानी की आपूर्ति बंद, दूषित पानी, पाइपलाइन रिसाव, कम दबाव'
    }
  },
  {
    id: 'electricity',
    iconName: 'Zap',
    name: {
      en: 'Electricity',
      ta: 'மின்சாரம்',
      hi: 'बिजली'
    },
    department: {
      en: 'State Electricity Distribution Corporation',
      ta: 'மாநில மின் பகிர்மானக் கழகம்',
      hi: 'राज्य विद्युत वितरण निगम'
    },
    description: {
      en: 'Power outage, low voltage, damaged transformer, hanging wires, meter fault',
      ta: 'மின்தடை, குறைந்த மின்னழுத்தம், பழுதான மின்மாற்றி, தொங்கும் மின்கம்பிகள்',
      hi: 'बिजली कटौती, लो वोल्टेज, खराब ट्रांसफार्मर, लटकते तार'
    }
  },
  {
    id: 'roads',
    iconName: 'Construction',
    name: {
      en: 'Roads & Potholes',
      ta: 'சாலைகள் மற்றும் பள்ளங்கள்',
      hi: 'सड़कें और गड्ढे'
    },
    department: {
      en: 'Highways & Public Works Department (PWD)',
      ta: 'நெடுஞ்சாலைகள் மற்றும் பொதுப்பணித் துறை',
      hi: 'लोक निर्माण विभाग (पीडब्ल्यूडी)'
    },
    description: {
      en: 'Potholes, damaged asphalt, missing road dividers, speed breaker repairs',
      ta: 'சாலைப் பள்ளங்கள், பழுதான சாலைகள், வேகத்தடை சீரமைப்பு',
      hi: 'सड़क के गड्ढे, टूटी सड़कें, स्पीड ब्रेकर मरम्मत'
    }
  },
  {
    id: 'street_lights',
    iconName: 'Lightbulb',
    name: {
      en: 'Street Lights',
      ta: 'தெருவிளக்குகள்',
      hi: 'स्ट्रीट लाइट'
    },
    department: {
      en: 'Municipal Electrical & Public Lighting Wing',
      ta: 'மாநகராட்சி மின்சார மற்றும் தெருவிளக்குப் பிரிவு',
      hi: 'नगर पालिका विद्युत एवं स्ट्रीट लाइट विभाग'
    },
    description: {
      en: 'Broken street lamps, dark streets at night, flickering pole lights',
      ta: 'எரியாத தெருவிளக்குகள், இரவில் இருண்ட தெருக்கள், பழுதான கம்பங்கள்',
      hi: 'खराब स्ट्रीट लाइट, अंधेरी सड़कें, टिमटिमाती बत्तियां'
    }
  },
  {
    id: 'garbage',
    iconName: 'Trash2',
    name: {
      en: 'Garbage / Waste Management',
      ta: 'குப்பை மற்றும் கழிவு மேலாண்மை',
      hi: 'कचरा / अपशिष्ट प्रबंधन'
    },
    department: {
      en: 'Municipal Solid Waste Management Department',
      ta: 'மாநகராட்சி திடக்கழிவு மேலாண்மைத் துறை',
      hi: 'नगर निगम ठोस कचरा प्रबंधन विभाग'
    },
    description: {
      en: 'Uncollected garbage, overflowing dustbins, open dumping, bad odor',
      ta: 'அகற்றப்படாத குப்பைகள், நிரம்பி வழியும் தொட்டிகள், துர்நாற்றம்',
      hi: 'बिना उठा कचरा, भरे हुए कूड़ेदान, खुले में कचरा फेंकना'
    }
  },
  {
    id: 'drainage',
    iconName: 'Waves',
    name: {
      en: 'Drainage & Sewage',
      ta: 'கழிவுநீர் மற்றும் சாக்கடை',
      hi: 'जल निकासी और सीवरेज'
    },
    department: {
      en: 'Underground Drainage & Sewerage Board',
      ta: 'பாதாள சாக்கடை மற்றும் கழிவுநீர் வாரியம்',
      hi: 'भूमिगत जल निकासी एवं सीवरेज बोर्ड'
    },
    description: {
      en: 'Clogged drains, sewage overflow on road, open manhole covers',
      ta: 'அடைபட்ட சாக்கடை, சாலையில் வழியும் கழிவுநீர், திறந்த மேன்ஹோல்',
      hi: 'बंद नालियां, सड़क पर सीवर का पानी, खुले मैनहोल'
    }
  },
  {
    id: 'transport',
    iconName: 'Bus',
    name: {
      en: 'Public Transport',
      ta: 'பொதுப் போக்குவரத்து',
      hi: 'सार्वजनिक परिवहन'
    },
    department: {
      en: 'State Road Transport Corporation (SRTC)',
      ta: 'அரசுப் போக்குவரத்துக் கழகம்',
      hi: 'राज्य सड़क परिवहन निगम'
    },
    description: {
      en: 'Bus shelter damage, non-availability of buses, driver rudeness',
      ta: 'பஸ் நிழற்கூரை பழுது, பேருந்துகள் வராத நிலை, நடத்துநர் புகார்',
      hi: 'बस स्टॉप क्षति, बसों की अनुपलब्धता, बस सेवा मुद्दे'
    }
  },
  {
    id: 'healthcare',
    iconName: 'Stethoscope',
    name: {
      en: 'Public Healthcare',
      ta: 'பொதுச் சுகாதாரம்',
      hi: 'सार्वजनिक स्वास्थ्य'
    },
    department: {
      en: 'Department of Public Health & Family Welfare',
      ta: 'பொதுச் சுகாதாரம் மற்றும் நோய் தடுப்பு மருந்துத் துறை',
      hi: 'लोक स्वास्थ्य एवं परिवार कल्याण विभाग'
    },
    description: {
      en: 'Primary health center issues, mosquito breeding, medicine shortages',
      ta: 'சுகாதார மையப் பிரச்சினைகள், கொசு உற்பத்தி, மருந்து தட்டுப்பாடு',
      hi: 'प्राथमिक स्वास्थ्य केंद्र मुद्दे, मच्छर का प्रकोप, दवा की कमी'
    }
  },
  {
    id: 'sanitation',
    iconName: 'ShieldCheck',
    name: {
      en: 'Sanitation & Hygiene',
      ta: 'துப்புரவு மற்றும் சுகாதாரம்',
      hi: 'स्वच्छता और स्वच्छता'
    },
    department: {
      en: 'City Public Sanitation & Environmental Hygiene Wing',
      ta: 'நகர துப்புரவு மற்றும் சுற்றுச்சூழல் சுகாதாரப் பிரிவு',
      hi: 'शहर सार्वजनिक स्वच्छता और स्वच्छता विभाग'
    },
    description: {
      en: 'Dirty public toilets, lack of sanitation, market area unhygienic conditions',
      ta: 'அசுத்தமான பொதுக் கழிப்பறைகள், சந்தைப் பகுதியில் சுகாதாரமின்மை',
      hi: 'गंदे सार्वजनिक शौचालय, स्वच्छता की कमी, बाज़ार क्षेत्र में गंदगी'
    }
  },
  {
    id: 'certificates',
    iconName: 'FileText',
    name: {
      en: 'Birth / Death Certificates',
      ta: 'பிறப்பு / இறப்பு சான்றிதழ்கள்',
      hi: 'जन्म / मृत्यु प्रमाण पत्र'
    },
    department: {
      en: 'Revenue & Vital Statistics Registrar Office',
      ta: 'வருவாய் மற்றும் பிறப்பு-இறப்பு பதிவுத் துறை',
      hi: 'राजस्व एवं जन्म-मृत्यु पंजीकरण कार्यालय'
    },
    description: {
      en: 'Delayed certificates, spelling correction, portal verification issue',
      ta: 'சான்றிதழ் தாமதம், எழுத்துப்பிழை திருத்தம், இணையதள சரிபார்ப்பு',
      hi: 'प्रमाणपत्र में देरी, नाम सुधार, ऑनलाइन सत्यापन समस्या'
    }
  },
  {
    id: 'property_tax',
    iconName: 'Home',
    name: {
      en: 'Property & Tax Assessment',
      ta: 'சொத்துவரி மற்றும் கணப்பீடு',
      hi: 'संपत्ति और कर मूल्यांकन'
    },
    department: {
      en: 'Municipal Revenue & Property Tax Office',
      ta: 'மாநகராட்சி சொத்துவரி மற்றும் வருவாய்த் துறை',
      hi: 'नगर निगम संपत्ति कर एवं राजस्व विभाग'
    },
    description: {
      en: 'Tax calculation error, name transfer delay, receipt generation failure',
      ta: 'வரி கணக்கீட்டுத் தவறு, பெயர் மாற்ற தாமதம், ரசீது பெற முடியாமை',
      hi: 'कर गणना त्रुटि, नाम हस्तांतरण में देरी, रसीद जनरेशन समस्या'
    }
  },
  {
    id: 'police',
    iconName: 'ShieldAlert',
    name: {
      en: 'Police & Public Safety',
      ta: 'காவல்துறை மற்றும் பொதுப் பாதுகாப்பு',
      hi: 'पुलिस और सार्वजनिक सुरक्षा'
    },
    department: {
      en: 'District Police Grievance & Public Safety Cell',
      ta: 'மாவட்டக் காவல்துறை குறைதீர்ப்பு மையம்',
      hi: 'जिला पुलिस शिकायत एवं सार्वजनिक सुरक्षा सेल'
    },
    description: {
      en: 'Nuisance at night, missing items, illegal parking, traffic congestion',
      ta: 'இரவு நேர தொந்தரவு, பொருட்கள் காணாமல் போதல், விதியை மீறிய பார்க்கிங்',
      hi: 'रात में उपद्रव, अनधिकृत पार्किंग, यातायात की भीड़, सुरक्षा'
    }
  },
  {
    id: 'schemes',
    iconName: 'Gift',
    name: {
      en: 'Government Schemes & Ration',
      ta: 'அரசுத் திட்டங்கள் மற்றும் ரேஷன்',
      hi: 'सरकारी योजनाएं और राशन'
    },
    department: {
      en: 'Civil Supplies & Social Welfare Department',
      ta: 'உணவுப் பொருள் வழங்கல் மற்றும் நுகர்வோர் பாதுகாப்புத் துறை',
      hi: 'खाद्य एवं नागरिक आपूर्ति और समाज कल्याण विभाग'
    },
    description: {
      en: 'Ration card issue, pension delay, scheme application pending',
      ta: 'ரேஷன் கார்டு பிரச்சினை, ஓய்வூதிய தாமதம், அரசு உதவித் தொகை பெறாமை',
      hi: 'राशन कार्ड समस्या, पेंशन में देरी, योजना आवेदन लंबित'
    }
  },
  {
    id: 'other',
    iconName: 'HelpCircle',
    name: {
      en: 'General Civic Grievance',
      ta: 'இதர பொதுக் கோரிக்கைகள்',
      hi: 'अन्य सामान्य शिकायत'
    },
    department: {
      en: 'General Public Grievance Redressal Cell',
      ta: 'பொது மக்கள் குறைதீர்க்கும் மையம்',
      hi: 'सामान्य जन शिकायत निवारण प्रकोष्ठ'
    },
    description: {
      en: 'Noise pollution, tree branch trimming, stray animal control',
      ta: 'ஒலி மாசுபாடு, மரம் கிளை வெட்டுதல், தெரு நாய் பிரச்சினை',
      hi: 'ध्वनि प्रदूषण, पेड़ की कटाई, आवारा पशु नियंत्रण'
    }
  }
];

export function getCategoryById(id: string): CategoryInfo {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}
