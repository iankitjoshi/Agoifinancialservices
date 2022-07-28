import moment from "moment";

export function isLoggedIn(name) {
  const access_token = window.localStorage.getItem(name)
  return access_token;
}

export function getObject(key) {
  if (window && window.localStorage) {
    return window.localStorage.getItem(key);
  }
}

export function saveObject(key, value) {
  if (window && window.localStorage) {
    window.localStorage.setItem(key, value);
  }
}

export function multiPartData(data) {
  let multiPart = new FormData();

  for (let prop in data) {
    multiPart.append(prop, data[prop]);
  }

  return multiPart;
}

export function logOut(userType) {
  return new Promise((res, rej) => {
    localStorage.removeItem(userType);
    res(true);
  });
}


export function rememberMe(checked, data) {
  if (checked)
    saveObject('remember_me', window.btoa(JSON.stringify(data)))
  else {
    const remember = getObject(`remember_me`);
    if (remember) localStorage.removeItem(`remember_me`);
  }
}


//Function For Managinig Table Rows Functionality
export function descendingComparator(a, b, orderBy) {
  if (!a || !b) return
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export const tablestyle = (theme) => ({
  root: {
    width: '100%',
    maxHeight: 600,
  },
  // tbody: {
  //   maxHeight: 600,
  // },
  [theme.breakpoints.up('md')]: {
    container: {
      maxHeight: 595
    }
  }
});

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array = [], comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}


export function formatString(string = '') {
  string = string && string.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  return string || '';
}

export function AvatarName(data) {
  return data && data?.toLowerCase().split(' ').map(s => s.charAt(0)).slice(0, 2).join('').toUpperCase() || 'N/A'
}

export function timeFormat(data) {
  return moment(data).format('DD MMM YYYY') || ''
}

export function ExpirytimeFormat(data) {
  return moment(data).format('MM/YY') || ''
}


export function decorateAmount(amt) {
  if (Math.sign(amt) === -1) {
    return amt && `- ₹${Math.abs(amt).toFixed(2)}` || ' ₹0.00'
  }
  return amt && `+ ₹${Math.abs(amt).toFixed(2)}` || ' ₹0.00'

  // return amt && `${new Intl.NumberFormat('en-IN', { style: 'currency', signDisplay: "exceptZero", currency: `${config.CURRENCY_FORMAT}` }).format(amt)} ${config.CURRENCY_FORMAT}`
}

export function positiveAmount(amt) {
  if (amt < 0) {
    return amt && ` ₹${(Math.abs(amt) * -1).toFixed(2)}` || ' ₹0.00'
  }
  return amt && ` ₹${Math.abs(amt).toFixed(2)}` || ' ₹0.00'
}

export function phoneFormatter(number) {
  return number && ` +91-${number}`
}



/**
 * Function to stop entering special chars + e in the number feild
 * It must be added while the component mounts and removed once component unmounts
 * @param {*} id 
 */
export function preventSpecialChars(id) {
  if (!id || document.getElementById(id) === null)
    return false;

  var dataInput = document.getElementById(id);

  if (document.addEventListener) {
    dataInput.addEventListener("keydown", handleKey);
  } else if (document.attachEvent) {
    dataInput.attachEvent("onKeydown", handleKey);
  }
}

/**
 * Function to remove special chat preventor
 * @param {*} id 
 */
export function removePreventSpecialChars(id) {
  if (!id || document.getElementById(id) === null)
    return false;

  var dataInput = document.getElementById(id);
  dataInput.removeEventListener("keydown", handleKey);
}

/**
 * Special char preventor
 * @param {*} e 
 */
export function handleKey(e) {
  //restrictAlphabets(e);
  // prevent: "e", "=", ",", "-", ".", "-", "+"
  if ([69, 187, 188, 189/*, 190*/, 43, 45].includes(e.keyCode)) {
    e.preventDefault();
  }
  var isFirefox = typeof InstallTrigger !== 'undefined';
  if (isFirefox && [173, 61].includes(e.keyCode) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keycode >= 97 && e.keycode >= 122) || (e.keycode == 43) || (e.keycode == 45)) {
    e.preventDefault();
  }
}

//

//First Character of sentence is uppercase
export function FirstCharUpperCase(mySentence) {
  const words = mySentence.split("-");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  return words.join(" ")
}

export function scrollIntoViewById(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }
}

export const getTimeStamps = (type, reqStartDate = 0, reqEndDate = 0) => {
  let startDate = null;
  let endDate = null;
  switch (type) {
    case 'today':
      startDate = moment().startOf('D').valueOf()
      endDate = moment().valueOf()
      break;
    case 'yesterday':
      startDate = moment().subtract(1, 'd').startOf('D').valueOf()
      endDate = moment().subtract(1, 'd').endOf('D').valueOf()
      break;
    case 'last7Days':
      startDate = moment().subtract(6, 'd').startOf('D').valueOf()
      endDate = moment().valueOf()
      break;
    case 'lastWeek':
      startDate = moment().subtract(1, 'weeks').startOf('isoWeek').valueOf()
      endDate = moment().subtract(1, 'weeks').endOf('isoWeek').valueOf()
      break;
    case 'last30Days':
      startDate = moment().subtract(30, 'd').startOf('D').valueOf()
      endDate = moment().valueOf()
      break
    case 'thisMonth':
      startDate = moment().startOf('month').valueOf()
      endDate = moment().valueOf()
      break;
    case 'lastMonth':
      startDate = moment().subtract(1, 'M').startOf('month').valueOf()
      endDate = moment().subtract(1, 'M').endOf('month').valueOf()
      break;
    case 'last60Days':
      startDate = moment().subtract(60, 'd').startOf('D').valueOf()
      endDate = moment().valueOf()
      break;
    case 'last90Days':
      startDate = moment().subtract(90, 'd').startOf('D').valueOf()
      endDate = moment().valueOf()
      break;
    case 'customDate':
      startDate = moment(reqStartDate).valueOf()
      endDate = moment(reqEndDate).valueOf()
      break;
    case 'all':
      startDate = moment(1577836800000).valueOf()
      endDate = moment().valueOf()
      break;

    default:
      startDate = moment().subtract(6, 'd').startOf('D').valueOf()
      endDate = moment().valueOf()
      break;
  }
  return { startDate, endDate }
}


export function DataValue(data) {
  return data ? data : '-'
}