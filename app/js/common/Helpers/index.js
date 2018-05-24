export const calculateTimeRemaining = (givenDate) => {
  const formattedGivenDate = new Date(givenDate);
  const today = new Date();
  const msDiff = typeof window.duration !== 'undefined' ? window.duration : (formattedGivenDate - today);
  // console.log(msDiff);
  return !((msDiff < 0));
};

export const getCookie = (name) => {
  const pattern = RegExp(name + '=.[^;]*');
  const matched = document.cookie.match(pattern);
  if (matched) {
    const cookie = matched[0].split('=');
    return cookie[1];
  }
  return false;
};

export const getErrorMap = (errorMap) => {
  const fallback = 'There is a problem with one of our systems. Please try again later.';
  let msg = '';
  for (const prop in errorMap) {
    msg += '<p>' + errorMap[prop] + '</p>';
  }
  if (msg.length < 2) {
    msg = fallback;
  }
  return msg;
};

export const parsePrice = (priceStr) => parseFloat(priceStr, 10);
