/* eslint-disable no-useless-escape */

export const fileExtension = /.?(csv|xls(m|x|b)?|pdf)/ig; // csv,xls,xlsm,xlb,pdf

export const multiSpaces = /\s+/g;

export const numberInBraces = /\(\d{1,}\)/g; //(1) kind of

export const AlhpabetsInBraces = /\([a-z-_\s]{1,}\)/ig; //(abc-_) kind of

export const AlhpaNumericInBraces = /\([a-z0-9_-\s]{1,}\)/ig; //(abc123_) kind of

export const decimalsRegex = /(\d{1,2})*([.]\d{1,2})+|\d{1,2}[.]/g; // 12.304.00

export const specialChars = /[^a-z0-9\s]/ig; // -/+= all special chars

export const onlyDigits = /^[0-9\s.]+$/g; // 12, 30, 000.01

export const digitsRegex = /^[\d.\-,]+$/; // 12,34.00 -12,34.00

export const rrDates = /(as\s?of\s?=\s?\d{1,2}[/\-\s]\d{1,2}[/\-\s]\d{4})|(month\s?=\s?\d{1,2}[/\-\s]\d{4})/ig;

export const rentRollIdentifier = /(\bRR\b)|(rroll)|(rent\s*roll)|(lease)/i;

export const headerIdentifier = /unit|lease|rent|apt|status|concession|charge|sqft|square|market|name|move|deposit|dep|tenant|code|effective|trm[\s-]type|vacan(t|cy)|resident|balance|floor|remy|ledger|credit|occupancy|parking|amenity|commercial|current|loss|building|receipt|bed|property|bath|(Reference[\s]?[+-]?[\s]?Amenities)|(bldg[-]?unit)|(unit\s?type)|(sq[.]?\s?(ft|feet)[.]?)|(square[\s]?footage)|((unit|apt)\s?status\s?)/i;

export const specialCharsAtEnd = /[\s-._]+$/g; // abc -%

export const specialCharsAtStart = /^[\s-._]+/g; // - abc apartments

export const junkHeaderCellText = /(Report Name)|(Account Name)|(Account No. & Name)|(Last\s+\d{1,2}\s+days)/i;

/** -------------------------- PROPERTY RELATED REGEX START ----------------------------- */

export const guidRegex = /([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|(\d{2,}-?([a-z\d]+[_]+)+))/i;

export const CapitalAlphaNumericWith3Letters = /^[0-9]*\s*[A-Z]{1,3}\s*[0-9]*\s*$/g; // BWI 605 ,ALT 104 , BWI

export const timeRegex = /((0?[1-9]|1[0-2]):([0-5][0-9])(:([0-5][0-9]))?[-\s]?(am|pm)?[-\s]?(\w{3})?)|(\d{1,2}[:_]?\d{2}[\s_:]?(\d{2})?\s?((a|p)m))\b/i;

export const propertyNameFilter = /(property(\s?)(name)?)(\s?):?=?-?|(property(\s)?:?=?-?)/i;

export const propertyRefinement = /(the)|(apartment(s)?)|park(s)?|resident(ial)?(s)?|\bllc\b|\bllp\b|management|mgmt|company|residence(s)?|establishment(s)?|group/ig;

export const propertyRelatedKeywords = /(address)|(apartment)|\bapts\b|(autumn)|(bay)|(bridge)|(broadway)|(brook)|(center)|(centre)|(city)|(cliff)|(club)|(coast)|(cottage)|(country)|(court)|(creek)|(crest)|(crossing)|(divide)|(east)|(estate)|(falls)|(farm)|(fountain)|(garden)|(gate)|(grove)|(hall)|(harbour)|(height)|(heritage)|(hill)|(home)|(house)|(island)|(lake)|(landing)|(lane)|(line)|(loft)|(lot)|(major)|(manor)|(meadow)|(mill)|(mountain)|(nest)|(north)|(oak)|(palm)|(parc)|(parcel)|(park)|(place)|(plantation)|(plat)|(plot)|(point)|(pond)|(branch)|(residence)|(resort)|(ridge)|(river)|(road)|(seasons)|(south)|(spring)|(square)|(station)|(stone)|(street)|(temple)|(terrace)|(tower)|(town)|(tract)|(tree\s*[^=])|(valley)|(view)|(vill(age|a|e)?)|(walk)|(water)|(way)|(west)|(wood)/i

export const junkTextInFileName = /copy of|copy|(\d{1,2}\s?of\s?\d{1,2})|\b(for)?[\s_]?RESI(model)?\b|_resi\b|at\s?\d{1,2}%|excel\s?(format)?|\bWEB\b|(one|single)[-_\s]?line|(as\s?of)|test|(Ex-)|occupied|single_line|effective|detailed|detail|original|(All[\s.\+]?unit(s?))|report(s?)|(aggregated\s?per\s?bed)|conflicted|autosaved|\bwith\b|standard|\bfor\b|\bto\b|through|\bgo\b|excel|\bafter\b|model|\b(yr|ay|fy)\b|monthly|(loan\s?no\s?\d+)/ig;

export const junkTextInSheetName = /(t[\s-]?\d{2})|(resi\s?\-?\s?rent\s?roll)|(unit\s?)?(detail(s|ed)?|mix)|((12\s?month\s?)?(inc|income)\s?statement(s)?)\s?(hoa)?|pdf|(_?unit_?rent_?roll_?(roommate|chg|case)?(_case)?)|report\s?(\(\d{0,3}\)|parameter(s?))|pivot\stable|formatted|(sheet|report)\s?\d{1}\s?\((\d{1}\))?|(sheet|report|table)\s?(\d{1})?|\b(yardi)?\s?RR[\s-]?(\d{1,2}[\s-.]?\d{2}[\s-.]\d{2,4})?\b|((\d{1,2}[\s.-]?\d{1,2}[\s-.]?\d{2,4}\s?)?rent[\s-._]?roll\s?(hoa)?)|rent\s?roll\s?data|\b(([1234])?Q([1234])?)\b/ig;

export const RRKeywordsInFileName = /((\br\s?roll(\s?v2)?\b)|rent\s?roll\s?v(\d{1})?|(Rent Roll\s?w\s?lc)|((current\s)?(rent[_+.\-\s]?roll[_+.\-\s]?)?(with[_+.\-\s]?|w[_+.\-\s]?|(w.[_+\-\s]?))?)?((lease[_+.\-\s]?charge(s?))|upgrade(s?)|concession(s?))|((property|unit)\s?(_?))?(1_)?(rent[_+.\-\s]?rolls?(_?v2)?)(\s?[_+.\-]?\s?(detail|updated|(_chg)|((&|and)?\s?operating statement(s?))))?)|(\brent\b)|(income\s?statement(s?)\s?(and)?\s?(rent\s?roll)?)|(RR\s?and\s?Income\s?Statements\s?-\s?Incl\s?COA)/ig;

export const RRKeywords = /(\bSLRR\b|\bMLRR\b|\bRRD\b|(_?(RR|rr)\s?(v|V)2)|\b_?_?RR_?\b)|RR_|_RR/g;

export const osGenericKeywords = /\d{4}[\s-]?(p[&\s-_]?l)|servicing|(operating\s?statement(s)?)|\bos\b|trailing|accrual|\bpos\b|net|cash\s?flow|\bp[&\s-_]?l\b|profit\s?(&|and|\s)?loss\s?standard?|[pymq]td|financials?|income|statement(s)?|fiscal|year|trend|proforma|budget|cash|assets|EQUIVALENTS|historic|rolling|\b(ye|year\send)\b|final\s?audit|month|report|\beoy\b|\bend\s?of\s?year\b|stmt|trailing[\s_-]?\d{1,2}/ig;

export const OSIdentifier = /(((year|month)[\s-_]end)|(income(\s)?(and|&)[\s]?expense)|(?:\b|_\K)(t[\s-_]?\d{1,2}_?(\d{4})?)\b|(?:\b|_\K)p[\s-\/&]?(and)?l_?\b|\bye[\s-_]statement(s)?\b|\bye[\s-_]?\d{4}\b|\bttm\b|\bnoi\b|(?:\b|_\K)(y|q|m|p)tds?_?\b|(?:\b|_\K)ops(?:\b|_\K)|(?:\b|_\K)pos(?:\b|_\K)|(?:\b|_\K)os_?\b|budget|(month|trailing|income|operating)([\s-_]?(statement(s)?|historical(s)?))?|12[\s-_]?month|profit[\s-_]?(and|&)[\s-_]?loss|net[\s-_]?income|historical(s)?|cash[\s-_]?flow|\d{2}[\s-_]?(period|month)|financ(e|ial)\s?statement(s)?|rolling[\_-]?\d{1,2}[\s_-]?(statement(s)?)?|\d{1,2}[\s-_]?trail(ing)?|fiscals[\s_-]?year|trial[\s-_]?balance|(op|month)[\s-_]?(stmt|statement)|rolling|\btrend\b|\bproject(ed|ion)\b)/i;

export const POSLooseTextKeywords = /(cash\s?flow[\s-]\d{4})|trend\s*report|trailing|accrual|((statements?)?\s?\(?(twelve|12)[-\s]?months?\)?)|((p|profit)\s*(and|&)\s*(l|loss))|((operating|income|trailing)\s*statements?)|(income\s*(and|\/|&)?\s*expense(s)?)|(ptd)|(book\s?=\s?cash)|(expenses?\s*(and|&)?\s*income)|(t[-\s]?(\d{2}|\d{1}))|cash\s*flow|budget|fore\?cast|project(ion|ed)/ig

export const rentRollLooseTextJunk = /(page:?\s?\d?\s?(of)?\s?\d?)|(v\d.\d)|(rent\s?roll\s?with\s?lease\s?charges?)|(mgt(-\d+)+)|(s1\s?m1)|(ssi\d+)|(income)|(period)=?:?|(book)\s?=?:?(cash|accrual)?|(print)|(Note)|(Actual)|(summary)|(\bRR\b)|(rroll)|(rent\s*roll)|(unit)|(detail)|(report)|(paramater)|(lease)|(service)|(trust)|(time)|(page)|(ao\d+)|((\d+?,?\d+?)\s?apt(s)?.?,?)|((\d+?,?\d+?)?\s?sq.\s?ft.\s?)|((\d+?,?\d+?)?\s?beds.?,?)|^\d+$|(tree\s?=\s?\w+)/i;

export const docTypeKeywords = new RegExp("(" + osGenericKeywords.source + ")|(" + OSIdentifier.source + ")|(" + POSLooseTextKeywords.source + ")|(" + RRKeywordsInFileName.source + ")|(" + RRKeywords.source + ")", 'ig')

export const propertyJunkKeywords = new RegExp("(" + rentRollLooseTextJunk.source + ")|(" + POSLooseTextKeywords.source + ")|(" + OSIdentifier.source + ")", 'ig')

export const datesInDoc = /\bt[\s-_]?\d{1,2}\b|(([0-9]{1,2})?(?:\b|_\K)(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\b(([\s\-_]?[0-9]{1,4})?[\s\-_]?\s?[0-9]{1,4})?)|\b(\d{2})?[\s-]?(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)(\s)?(\d{2,4})?(RR)?\b|\d{1,2}[.\-\s]\d{4}|[0-9]{1,2}[0-9]{2}[0-9]{2,4}|(\d{4}[\s-._]?\d{1,2}[\s.-]?\d{1,2})|[0-9]{1,2}[._\-\s]?[0-9]{1,2}[._\-\s][0-9]{2,4}|\d{1,2}[.\-\s]\d{1,2}|(\d{1}[\s-]\d{4})|((for|through)[\s-]\d{4})|((t\d{1,2})?[\s-]?\d{4}[.\-\s]?\d{2}[\s]?(t\d{1,2})?)/ig

export const rentRollAsOfKeywords = /((?:\b|_\K)(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)\b|(last\s?bod)?(select)?(AND)?\s?(as)?\s?(of)?\s?(date)?\s?(balance)?\s?(month)?\s?(year)?\s?(of)?\s?\s?=?:?\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec|january|febuary|march|april|june|july|august|september|october|november|december)?\s?\d{1,2}[\/\,\-\s](\d{1,2})?[\/\s\-]?\d{2,4})|(date)\s?:?=?|(property)\s?=?:?|(\\n)|onesite[-\s]?report[-\s]?|(as\s?of\s?=?\s?\d{1,2}[\/\s\-]\d{1,2}[\/\s\-]\d{4})|(month\s?=\s?\d{1,2}[/\-\s]\d{4})/ig

export const docDateKeywords = new RegExp("(" + datesInDoc.source + ")|(" + rentRollAsOfKeywords.source + ")", 'ig')

/** -------------------------- PROPERTY RELATED REGEX END ----------------------------- */

export const validDateFormats = [
  'M D YY',
  'M DD YY',
  'M D YYYY',
  'M DD YYYY',
  'MM D YY',
  'MM D YYYY',
  'MM DD YY',
  'MM DD YYYY',
  'MMM D YYYY',

  'M YY',
  'M YYYY',
  'MM YY',
  'MM YYYY',
  'MMM YY',
  'MMM YYYY',
  'MMMD YYYY',
  'MMM D YY',
  'MMMM YY',
  'MMMM YYYY',
  'MMMM DD YYYY',
  'MMMM D YY',
  'MMMM D YYYY',
  'MMMYY',
  'MMMMYY',
  'MMMYYYY',
  'MMMMYYYY',

  'MMM',
  'MMMM',

  'D MMM YY',
  'D MMM YYYY',
  'D MMMM YYYY',
  'D MMMM YY',
  'D MM YY',
  'D M YY',
  'D YY',
  'D MMM',
  'DD YYYY',
  'DD MMM YY',
  'DD MM YYYY',
  'DD MMM YYYY',
  'DD MMMM YYYY',
  'DDMMMYY',
  'DDMMMYYYY',

  'YY MMM',
  'YYYY MMM',
  'YYYY MMMM',
  'YYYY M D',
  'YYYY MM DD',
  'YYYY DD MMMM',

  'MM YY MM YY',
  'MMM YY MMM YY',
  'MMM MMM YY',
  'MMM MMM YYYY',
  'MM/DD/YYYY hh:mm:ss a',
  'MM-DD-YYYY hh:mm:ss a',
];

export const POAFormats = ['%',
  'jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[\s-]?(to|through|\-)?[\s-]?(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december',
  '\bvar\b', '\bcurr\b', '(current|prior)[^\\w\\d\\r\\n:]?pd[^\\w\\d\\r\\n:]?[0-9]{2,4}?', 'year[^\\w\\d\\r\\n:]?[0-9]{2,4}', 'project(ed|ion)', 'forecast', 'variance', 'last[^\\w\\d\\r\\n:]?(period|year|month)', 'ytdtotal', '([0-9]{4})budget', 'year-?to-?date', 'selectedperiod', '%var', 'variance\\(\\$\\)', 'variance\\(%\\)', '\\$variance', 'percentagevariance',
  'act\\/budperunitamount', 'variancecomment', 'var%', '%change', 'y-t-d', 'p-t-d', 'm-t-d', 'q_t_d', 'p_t_d', 'Y_T_d', 'm_t_d', 'mtd%', 'ytd%', 'annualizedperunitaverage', '%variance',
  '%ofyeartomonthend', '%ofselectedmonth', 'total', 'periodtodate', 'year-to-date', 'period-to-date', 'month-to-date', 'yeartodate', 'ptdactual', '([0-9]{2,4})\s?ytd', 'ptdbudget', 'ytd', 'ytdactual', 'ytdbudget', 'annual', 'current', 'month', '(current)?(month|PPD|ytd)(actual|budget|Diff)', 'currentmonthbudget', 'actual', 'budget', 'ytdactual', 'annualoriginalbudget',
  'annualbudget', 'ptdlastyear', 'ytdlastyear', 'original', 'adjusted', 'total\\(actual\\+forecast\\)', 'total\\(actual\\+budget\\)',
  'yearto', 'total([0-9]{2,4})', 'monthending', 'annualized', 'mtdactual', 'rollingtotal', 'originalbudget', 'sept',
  'mtdbudget', 'ytdactualplusbudget', 'rolling12month', 'closingprojection', 'ptd', 'qtd', 'mtd', 'lastyear',
  'ccurrentbalance', 'currentbalance', 'prioryear', 'monthtotal', 'totalmonth', 'yeartomonthend', 'selectedmonth', 'account', 'title',
  '[0-9]{1,2}monthsended([0-9]{1,2})([^\\w\\d\\r\\n:]?[^\\w\\d\\r\\n:])([0-9]{1,2})([^\\w\\d\\r\\n:]?[^\\w\\d\\r\\n:])([0-9]{2,4})',
  // tslint:disable-next-line:max-line-length
  '(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)-(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)([^\\w\\d\\r\\n:]?)([0-9]{2,4})', // eg. Jan-Jun 2017
  // tslint:disable-next-line:max-line-length
  'periodend(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)?(([0-9]{1,2}))?(,)?([0-9]{2,4})?',
  // tslint:disable-next-line:max-line-length
  '([0-9]{1,2})([^\\w\\d\\r\\n:]?[^\\w\\d\\r\\n:])([0-9]{1,2})([^\\w\\d\\r\\n:]?[^\\w\\d\\r\\n:])([0-9]{2,4})-([0-9]{1,2})([^\\w\\d\\r\\n:]?[^\\w\\d\\r\\n:])([0-9]{1,2})([^\\w\\d\\r\\n:]?[^\\w\\d\\r\\n:])([0-9]{2,4})',
  '(q([0-9]{1,2}))', '(q1)-([0-9]{2,4})', 'q1([0-9]{2,4})', 'q1’([0-9]{2,4})', '[0-9]{4}q[0-9]',
  // tslint:disable-next-line:max-line-length
  '(fy([0-9]{2,4})|curr_?)(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)?',
  'past([0-9]{1,2})', '[0-9]{4}annualized', 'trailing([0-9]{1,2})actual', 'trailing([0-9]{1,2})', '([0-9]{1,2})month',
  'ytd([0-9]{2,4})', '20([0-9]{2})', 'actual([0-9]{2,4})',
  // tslint:disable-next-line:max-line-length
  '([0-9]{1,2})([^\\w\\d\\r\\n:]?[^\\w\\d\\r\\n:])([0-9]{1,2})([^\\w\\d\\r\\n:]?[^\\w\\d\\r\\n:])([0-9]{2,4})((actual)?)', // eg. 12/12/2019 or 12/12/2019 actual
  '([0-9]{1,2})([^\\w\\d\\r\\n:]?[^\\w\\d\\r\\n:])([0-9]{1,2})(actual)', // eg. 12/20 actual
  // eg. january 2020 OR january 2020#actual OR OR january 2020actual OR Jan 2017 OR Jan 2017 Actual OR january 2020#accrual
  // tslint:disable-next-line:max-line-length
  '(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)([^\\w\\d\\r\\n:]?)([0-9]{2,4})([^\\w\\d\\r\\n:]?)((actual|accrual|(M|p|q|y)td)?)',
  'year\\s?[0-9]{1,2}',
  'pro\s?forma',
  'comments'
];

export const POAInLooseTextOS = /(\d{1,2}[-\/\s]\d{1,2}[-\/\s]\d{2,4}[-\/\s]*\d{1,2}[-\/\s]\d{1,2}[-\/\s]\d{2,4})|(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)\s?(through|[^\\w\\d\\r\\n:])?\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)(\s?[^\\w\\d\\r\\n:]?\s?)([0-9]{2,4})|((jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[^\\w\\d\\r\\n:]?\d{2,4}\s?(to|[^\\w\\d\\r\\n:])?\s?(jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)\s?[^\\w\\d\\r\\n:]?\s?\d{2,4})|((jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|january|february|march|april|may|june|july|august|september|october|november|december)[^a-z0-9]?\d{2}[^a-z0-9]*\d{4}[^a-z0-9]?and[^a-z0-9]?\d{4})/i;

export const OSLineItems = ['trash', 'yard', 'write', 'workplace', 'window', 'website', 'water', 'waste', 'wash', 'hardware', 'software', 'wallpaper', 'wage', 'vinyl', 'verification', 'vendor', 'vending', 'utilit', 'vehicle', 'vanity', 'valet', 'vacation', 'upgrade', 'upgrad', 'upfront', 'uniform', 'turnkey', 'turn', 'tub', 'trim', 'tree', 'treatment', 'travel', 'transport', 'train', 'tower', 'top', 'tool', 'tile', 'tax', 'termite', 'terminat', 'tenant', 'temp', 'tech', 'takeover', 'system', 'swim', 'sweep', 'suta', 'surround', 'surfac', 'support', 'supplier', 'suppl', 'superintendent', 'suite', 'subsidy', 'subscription', 'structur', 'stove', 'storm', 'storage', 'station', 'sport', 'speciality', 'sold', 'social', 'snow', 'site', 'sign', 'shuttle', 'shower', 'shop', 'shade', 'sewer', 'settlement', 'service', 'seminar', 'security', 'securit', 'season', 'screen', 'shrub', 'scheduled', 'satellite', 'sanitary', 'sale', 'salary', 'salaries', 'safe', 'rubbish', 'routine', 'room', 'roof', 'revenue', 'retirement', 'retention', 'gift', 'restaurant', 'respite', 'resident', 'reserve', 'reputation', 'report', 'replacement', 'replace', 'renovat', 'repair', 'renewal', 'remediation', 'reimburse', 'rehab', 'regional', 'refuse', 'refrigerator', 'referral', 'recycling', 'recurring', 'recruit', 'recreation', 'recover', 'reconciliation', 'recognition', 'receivable', 'receipt', 'rebill', 'rebate', 'radio', 'pymt', 'purchase', 'publication', 'protect', 'promotion', 'project', 'program', 'profession', 'process', 'print', 'principal', 'premium', 'power', 'postage', 'delivery', 'post', 'porter', 'express', 'portal', 'port', 'carport', 'pool', 'plumbing', 'photo', 'phone', 'pest', 'personnel', 'permit', 'performance', 'penalt', 'payroll', 'payment', 'paving', 'patrol', 'partner', 'part', 'park', 'paint', 'paid', 'consultant', 'pager', 'package', 'overtime', 'overhead', 'oven', 'other', 'extraordinary', 'opex', 'operation', 'operating', 'office', 'nursing', 'newspaper', 'network', 'mowing', 'moveout', 'movein', 'month', 'monitor', 'mold', 'model', 'mobile', 'misc', 'mirror', 'mileage', 'microwave', 'meter', 'membership', 'meeting', 'medica', 'meal', 'material', 'market', 'manage', 'maker', 'maint', 'mail', 'maid', 'magazine', 'machine', 'lot', 'locksmith', 'lock', 'location', 'locator', 'loan', 'light', 'license', 'licensing', 'legal', 'leasing', 'late', 'landscape', 'contract', 'land', 'lamp', 'labor', 'kitchen', 'key', 'house', 'keeper', 'janitor', 'irrigation', 'investment', 'internet', 'interest', 'cable', 'insure', 'inspect', 'insurance', 'incentive', 'improvement', 'hotel', 'hospital', 'heat', 'income', 'gym', 'gutter', 'ground', 'graphic', 'goods', 'golf', 'glass', 'generator', 'gate', 'fencing', 'gas', 'gross', 'garbage', 'garage', 'gain', 'furniture', 'fuel', 'refreshment', 'freight', 'free', 'fountain', 'forms', 'forfeit', 'food', 'flyer', 'floor', 'flood', 'fixture', 'finishing', 'financ', 'filter', 'wall', 'fee', 'fare', 'fan', 'facility', 'extraction', 'exercise', 'executive', 'excess', 'eviction', 'event', 'equip', 'entertainment', 'energy', 'encumbrance', 'elevator', 'electric', 'electronic', 'education', 'expense', 'duplication', 'due', 'dryer', 'laundry', 'drug', 'drill', 'drape', 'drainage', 'door', 'donation', 'document', 'disposal', 'dish', 'discount', 'director', 'diet', 'development', 'detector', 'desk', 'depreciation', 'deposit', 'delinquen', 'decorat', 'day', 'damage', 'criminal', 'credit', 'cover', 'court', 'old', 'courier', 'counter', 'account', 'cost', 'copy', 'copier', 'cooling', 'convention', 'control', 'contra', 'consult', 'concession', 'computer', 'compensation', 'community', 'communication', 'commission', 'commercial', 'collect', 'collateral', 'cleaning', 'check', 'charitable', 'charge', 'bank', 'center', 'cellular', 'ceiling', 'casualty', 'cart', 'carpet', 'carpentry', 'care', 'capital', 'campus', 'cabinet', 'business', 'bureau', 'burden', 'bulb', 'built', 'building', 'brochure', 'bonus', 'bond', 'board', 'blind', 'bill', 'beverage', 'benefit', 'before', 'bedding', 'based', 'banner', 'bad', 'audit', 'assist', 'area', 'acquisition', 'application', 'appliance', 'apparel', 'antenna', 'amortization', 'allowance', 'alarm', 'agent', 'advertis', 'admin', 'adjustment', 'additional', 'activity', 'accompany', 'accessor', 'abatement', 'station', 'lease', 'leasing', 'telephone', 'locator'];

export const OSLineItemAccronym = ['\\butl\\b', '\\btv\\b', '\\bpet\\b','\\bmtm\\b', '\\bsw\\b', '\\bstate\\b', '\\bsq\\b', '\\bspa\\b', '\\bsfha\\b', '\\bscrie\\b', '\\bres\\b', '\\bpay\\b', '\\bnote\\b', '\\bnoi\\b', '\\blein\\b', '\\blawn\\b', '\\bins\\b', '\\binc\\b', '\\bhvac\\b', '\\bgpa\\b', '\\bfuta\\b', '\\bfica\\b', '\\bent\\b', '\\bemp\\b', '\\bcomp\\b', '\\bcar\\b', '\\bcam\\b', '\\balz\\b', '\\bal\\b', '\\bads\\b', '\\bad\\b', '\\bac\\b']

export const unitStatusSummaryheaders = /occupied|unitanalysis|(occupancy|unit|vacancy)status|occupancy|Vacancy|status/i;

export const unitStatusSummarySubHeaders = /vacant|occupied|nonrevenueunits|model|down|total|occ/i;

export const chargeCodeTableDataKeywords = /(\brent\b)|(incomecode)|(chargecode)|(transactioncode)|(\bcode\b)|(summaryofactualcharges)/i

export const chargeCodeHeaderDescriptionKeywords = /(income\s?code)|(charge\s?(code|type))|(summary\s?of\s?((charge\s?code)|actual\s?charges?))|(transaction\s?code)|(total\s?(charge(s)?|credits))|(Recurring\s?Charges?)/i

export const RRDataTable = /(unit)|(lease)|(Customer)|(name)|(\brc\b)|(rent)|(apt)|(status)|(concession)|(charge)|(sq[.]?\s?(ft|feet)[.]?)|\bsft\b|square|market|move|deposit|\bdep\b|tenant|effective|trm[\s-]type|vacan(t|cy)|code|(resident)|(balance)|floor|remy|ledger|credit|occupancy|parking|amenity|commercial|current|loss|building|receipt|bed|property|bath|(Reference[\s]?[+-]?[\s]?Amenities)|(bldg[-]?unit)|(unit\s?type)|(sq[.]?\s?(f(t)?|feet)[.]?)|((unit|apt)\s?status\s?)|(charge\s?code)|(market\s?rent)|(scheduled\s?charges)|(bath)|(monthly[\s]?rate)|(Other\s?Charges)|(Reference[\s]?[+-]?[\s]?Amenities)|\bid\b|description|subsidy|bd\/ba/i

export const falseRRHeaderCell = /deal\Wname|(\bDt\b[.])/i;

export const falseRRDateCell = /added|modified|(\bDt\b[.])|last sale date/i;

export const RRPrimaryKeyCells = /^(unit)$|^(bldg\s?unit)$|upgrade/i;

export const tenantNamesPrimaryCells = /primary (tenant|resident)|(residents?|tenant|customer|security|person|occupant|status|applicant|lease)(status)?\s?names?(unit)?|^(names?)$|^tenants?$|tenant (type|code)/i;

// Subset of RRDataTable
export const RRDataTableDateColumns = /(move[\s-]?in)|(lease\s?(start|end|from|to))|(move[\s-]?out)/i

export const floorPlanTableKeywords = /(floor\s?plan)|(unit\s?type)/i

export const totalTablePrimaryColRegex = /((Market|lease|Actual)\s+Rent)|(total\s?units?)|(Scheduled\s+Rent\s+Charges)|(Rent\s+Schedule)|(billing\s+(amount|potential))/i

export const totalTableKey = /total\s?units?/i;

export const unitStatusKeywords = /vacan|occup|total|occ/ig

export const stringDataTypes = ['a', 'an', 'as', 'ans', 's', 'alpha', 'alphaNumeric', 'alphaSpecial', 'alphaNumericSpecial', 'string'];

export const currencyDataTypes = ['c', 'i', 'f', 'n', 'currency', 'integer', 'float'];

export const mergedDataType = ['m', 'merged'];

export const numericColumns = ['c', 'i', 'f', 'n', 'p', 'currency', 'integer', 'float', 'percentage'];
export const numericColumnsRegex = /^c$|^i$|^f$|^n$|^p$|currency|integer|float|percentage/i
export const assestKeys = /\bassets\b/i;

export const liabilitiesKeys = /\bliabilities\b/i

export const balanceSheetKeys = /balance\s?sheet/i; 

// December 20 2019
// Dec 20 2019
// Dec 2019
// 12/31/2020
// 12-12
// 12-2020
// Dec2019
// oct y2019
// oct year2018
// oct FY 2018 
export const dateRegex = /((20\d{2})(\W+|_)(1[0-2]|0?\d{1})((\W+|_)(([012]\d|3[0-1])))?)|\b((1[0-2]|0?\d{1})((\W+|_)([012]\d?|3[0-1]))?(\W+|_)(20\d{2}|\d{2}(\b|_)))|(\b(20\d{2}|\d{2})(\W*|_)(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?))|((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|(Nov|Dec)(?:ember)?)([-\s]*(ye|y[\s-]?|fy|(year[\s-]?(end(ed|ing)?)?)|(fiscal[\s-]?year))[-\s]*)?((\W+|_)([012]\d?|3[0-1]))?(\W+|_)?(20\d{2}|\d{2}))|(\bDt\b[.])/i

export const ignoredKeywordsInHeader = /vacant\s*units/i