enum Products {
  Starmap = "starmap"
}

enum PrintProviders {
  Pwinty = "pwinty"
}

enum PaymentProviders {
  Stripe = "stripe",
  PayPal = "paypal"
}

// NOTE: these country codes are used to pull shipping data from Pwinty.
export enum CountryCode {
  // AF = "AF", // AFGHANISTAN
  // AX = "AX", // ALAND ISLANDS
  // AL = "AL", // ALBANIA
  // DZ = "DZ", // ALGERIA
  // AS = "AS", // AMERICAN SAMOA
  // AD = "AD", // ANDORRA
  // AO = "AO", // ANGOLA
  // AI = "AI", // ANGUILLA
  // AQ = "AQ", // ANTARCTICA
  // AG = "AG", // ANTIGUA AND BARBUDA
  // AR = "AR", // ARGENTINA
  // AM = "AM", // ARMENIA
  // AW = "AW", // ARUBA
  // AU = "AU", // AUSTRALIA
  // AT = "AT", // AUSTRIA
  // AZ = "AZ", // AZERBAIJAN
  // BS = "BS", // BAHAMAS
  // BH = "BH", // BAHRAIN
  // BD = "BD", // BANGLADESH
  // BB = "BB", // BARBADOS
  // BY = "BY", // BELARUS
  // BE = "BE", // BELGIUM
  // BZ = "BZ", // BELIZE
  // BJ = "BJ", // BENIN
  // BM = "BM", // BERMUDA
  // BT = "BT", // BHUTAN
  // BO = "BO", // BOLIVIA
  // BA = "BA", // BOSNIA AND HERZEGOVINA
  // BW = "BW", // BOTSWANA
  // BV = "BV", // BOUVET ISLAND
  // BR = "BR", // BRAZIL
  // IO = "IO", // BRITISH INDIAN OCEAN TERRITORY
  // BN = "BN", // BRUNEI DARUSSALAM
  // BG = "BG", // BULGARIA
  // BF = "BF", // BURKINA FASO
  // BI = "BI", // BURUNDI
  // KH = "KH", // CAMBODIA
  // CM = "CM", // CAMEROON
  // CA = "CA", // CANADA
  // CV = "CV", // CAPE VERDE
  // KY = "KY", // CAYMAN ISLANDS
  // CF = "CF", // CENTRAL AFRICAN REPUBLIC
  // TD = "TD", // CHAD
  // CL = "CL", // CHILE
  // CN = "CN", // CHINA
  // CX = "CX", // CHRISTMAS ISLAND
  // CC = "CC", // COCOS (KEELING) ISLANDS
  // CO = "CO", // COLOMBIA
  // KM = "KM", // COMOROS
  // CG = "CG", // CONGO
  // CD = "CD", // CONGO THE DEMOCRATIC REPUBLIC OF THE
  // CK = "CK", // COOK ISLANDS
  // CR = "CR", // COSTA RICA
  // CI = "CI", // COTE D'IVOIRE
  // HR = "HR", // CROATIA
  // CU = "CU", // CUBA
  // CY = "CY", // CYPRUS
  // CZ = "CZ", // CZECH REPUBLIC
  // DK = "DK", // DENMARK
  // DJ = "DJ", // DJIBOUTI
  // DM = "DM", // DOMINICA
  // DO = "DO", // DOMINICAN REPUBLIC
  // EC = "EC", // ECUADOR
  // EG = "EG", // EGYPT
  // SV = "SV", // EL SALVADOR
  // GQ = "GQ", // EQUATORIAL GUINEA
  // ER = "ER", // ERITREA
  // EE = "EE", // ESTONIA
  // ET = "ET", // ETHIOPIA
  // FK = "FK", // FALKLAND ISLANDS(MALVINAS)
  // FO = "FO", // FAROE ISLANDS
  // FJ = "FJ", // FIJI
  // FI = "FI", // FINLAND
  // FR = "FR", // FRANCE
  // GF = "GF", // FRENCH GUIANA
  // PF = "PF", // FRENCH POLYNESIA
  // TF = "TF", // FRENCH SOUTHERN TERRITORIES
  // GA = "GA", // GABON
  // GM = "GM", // GAMBIA
  // GE = "GE", // GEORGIA
  // DE = "DE", // GERMANY
  // GH = "GH", // GHANA
  // GI = "GI", // GIBRALTAR
  // GR = "GR", // GREECE
  // GL = "GL", // GREENLAND
  // GD = "GD", // GRENADA
  // GP = "GP", // GUADELOUPE
  // GU = "GU", // GUAM
  // GT = "GT", // GUATEMALA
  // GG = "GG", // GUERNSEY
  // GN = "GN", // GUINEA
  // GW = "GW", // GUINEA-BISSAU
  // GY = "GY", // GUYANA
  // HT = "HT", // HAITI
  // HM = "HM", // HEARD ISLAND AND MCDONALD ISLANDS
  // VA = "VA", // HOLY SEE (VATICAN CITY STATE)
  // HN = "HN", // HONDURAS
  // HK = "HK", // HONG KONG
  // HU = "HU", // HUNGARY
  // IS = "IS", // ICELAND
  // IN = "IN", // INDIA
  // ID = "ID", // INDONESIA
  // IR = "IR", // IRAN ISLAMIC REPUBLIC OF
  // IQ = "IQ", // IRAQ
  IE = "IE", // IRELAND
  // IM = "IM", // ISLE OF MAN
  // IL = "IL", // ISRAEL
  // IT = "IT", // ITALY
  // JM = "JM", // JAMAICA
  // JP = "JP", // JAPAN
  // JE = "JE", // JERSEY
  // JO = "JO", // JORDAN
  // KZ = "KZ", // KAZAKHSTAN
  // KE = "KE", // KENYA
  // KI = "KI", // KIRIBATI
  // KP = "KP", // KOREA DEMOCRATIC PEOPLE'S REPUBLIC OF
  // KR = "KR", // KOREA REPUBLIC OF
  // XK = "XK", // KOSOVO
  // KW = "KW", // KUWAIT
  // KG = "KG", // KYRGYZSTAN
  // LA = "LA", // LAO PEOPLE'S DEMOCRATIC REPUBLIC
  // LV = "LV", // LATVIA
  // LB = "LB", // LEBANON
  // LS = "LS", // LESOTHO
  // LR = "LR", // LIBERIA
  // LY = "LY", // LIBYAN ARAB JAMAHIRIYA
  // LI = "LI", // LIECHTENSTEIN
  // LT = "LT", // LITHUANIA
  // LU = "LU", // LUXEMBOURG
  // MO = "MO", // MACAO
  // MK = "MK", // MACEDONIA THEFORMER YUGOSLAV REPUBLIC OF
  // MG = "MG", // MADAGASCAR
  // MW = "MW", // MALAWI
  // MY = "MY", // MALAYSIA
  // MV = "MV", // MALDIVES
  // ML = "ML", // MALI
  // MT = "MT", // MALTA
  // MH = "MH", // MARSHALL ISLANDS
  // MQ = "MQ", // MARTINIQUE
  // MR = "MR", // MAURITANIA
  // MU = "MU", // MAURITIUS
  // YT = "YT", // MAYOTTE
  // MX = "MX", // MEXICO
  // FM = "FM", // MICRONESIA FEDERATED STATES OF
  // MD = "MD", // MOLDOVA REPUBLIC OF
  // MC = "MC", // MONACO
  // MN = "MN", // MONGOLIA
  // ME = "ME", // MONTENEGRO
  // MS = "MS", // MONTSERRAT
  // MA = "MA", // MOROCCO
  // MZ = "MZ", // MOZAMBIQUE
  // MM = "MM", // MYANMAR
  // NA = "NA", // NAMIBIA
  // NR = "NR", // NAURU
  // NP = "NP", // NEPAL
  // NL = "NL", // NETHERLANDS
  // AN = "AN", // NETHERLANDS ANTILLES
  // NC = "NC", // NEW CALEDONIA
  // NZ = "NZ", // NEW ZEALAND
  // NI = "NI", // NICARAGUA
  // NE = "NE", // NIGER
  // NG = "NG", // NIGERIA
  // NU = "NU", // NIUE
  // NF = "NF", // NORFOLK ISLAND
  // MP = "MP", // NORTHERN MARIANA ISLANDS
  // NO = "NO", // NORWAY
  // OM = "OM", // OMAN
  // PK = "PK", // PAKISTAN
  // PW = "PW", // PALAU
  // PS = "PS", // PALESTINIAN TERRITORY OCCUPIED
  // PA = "PA", // PANAMA
  // PG = "PG", // PAPUA NEW GUINEA
  // PY = "PY", // PARAGUAY
  // PE = "PE", // PERU
  // PH = "PH", // PHILIPPINES
  // PN = "PN", // PITCAIRN
  // PL = "PL", // POLAND
  // PT = "PT", // PORTUGAL
  // PR = "PR", // PUERTO RICO
  // QA = "QA", // QATAR
  // RE = "RE", // REUNION
  // RO = "RO", // ROMANIA
  // RU = "RU", // RUSSIAN FEDERATION
  // RW = "RW", // RWANDA
  // BL = "BL", // Saint Barth?lemy
  // SH = "SH", // SAINT HELENA
  // KN = "KN", // SAINT KITTS AND NEVIS
  // LC = "LC", // SAINT LUCIA
  // MF = "MF", // Saint Martin
  // PM = "PM", // SAINT PIERRE AND MIQUELON
  // VC = "VC", // SAINT VINCENT AND THE GRENADINES
  // WS = "WS", // SAMOA
  // SM = "SM", // SAN MARINO
  // ST = "ST", // SAO TOME AND PRINCIPE
  // SA = "SA", // SAUDI ARABIA
  // SN = "SN", // SENEGAL
  // RS = "RS", // SERBIA
  // SC = "SC", // SEYCHELLES
  // SL = "SL", // SIERRA LEONE
  // SG = "SG", // SINGAPORE
  // SX = "SX", // Sint Maarten
  // SK = "SK", // SLOVAKIA
  // SI = "SI", // SLOVENIA
  // SB = "SB", // SOLOMON ISLANDS
  // SO = "SO", // SOMALIA
  // ZA = "ZA", // SOUTH AFRICA
  // GS = "GS", // SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS
  // ES = "ES", // SPAIN
  // LK = "LK", // SRI LANKA
  // SD = "SD", // SUDAN
  // SR = "SR", // SURINAME
  // SJ = "SJ", // SVALBARD AND JANMAYEN
  // SZ = "SZ", // SWAZILAND
  // SE = "SE", // SWEDEN
  // CH = "CH", // SWITZERLAND
  // SY = "SY", // SYRIAN ARAB REPUBLIC
  // TW = "TW", // TAIWAN PROVINCE OFCHINA
  // TJ = "TJ", // TAJIKISTAN
  // TZ = "TZ", // TANZANIA UNITED REPUBLIC OF
  // TH = "TH", // THAILAND
  // TL = "TL", // TIMOR-LESTE
  // TG = "TG", // TOGO
  // TK = "TK", // TOKELAU
  // TO = "TO", // TONGA
  // TT = "TT", // TRINIDAD ANDTOBAGO
  // TN = "TN", // TUNISIA
  // TR = "TR", // TURKEY
  // TM = "TM", // TURKMENISTAN
  // TC = "TC", // TURKS AND CAICOSISLANDS
  // TV = "TV", // TUVALU
  // UG = "UG", // UGANDA
  // UA = "UA", // UKRAINE
  // AE = "AE", // UNITED ARAB EMIR?ATES
  GB = "GB", // UNITED KINGDOM
  US = "US" // UNITED STATES
  // UM = "UM", // UNITED STATES MINOR OUTLYING ISLANDS
  // UY = "UY", // URUGUAY
  // UZ = "UZ", // UZBEKISTAN
  // VU = "VU", // VANUATU
  // VE = "VE", // VENEZUELA
  // VN = "VN", // VIETNAM
  // VG = "VG", // VIRGIN ISLANDS BRITISH
  // VI = "VI", // VIRGIN ISLANDS U.S.
  // WF = "WF", // WALLIS AND FUTUNA
  // EH = "EH", // WESTERN SAHARA
  // YE = "YE", // YEMEN
  // ZM = "ZM", // ZAMBIA
  // ZW = "ZW", // ZIMBABWE
}

export enum ShippingSpeed {
  Standard = "standard",
  Express = "express"
}

export enum ShippingStatus {
  Canceled = "Cancelled", // We program in US english, Pwinty takes in UK.
  Submitted = "Submitted"
}

export interface Design {
  type: Products.Starmap;
  props: {};
}

export interface CustomError extends Error {
  statusCode?: number;
}

export interface GoogleMapsAddress {
  streetNumber: string;
  route: string;
  locality: string;
  sublocality: string;
  adminArea1: string;
  adminArea2: string;
  postalCode: string;
  country: string;
}

// Details we need to make a new SCS order.
export interface CustomerDetails {
  email: string;
  firstName: string;
  lastName: string;
  preferredShippingMethod: ShippingSpeed;
  shippingAddress: GoogleMapsAddress;
}
