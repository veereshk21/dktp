import { NOTIFICATION_ERROR_CSS_CLASS, NOTIFICATION_WARNING_CSS_CLASS, NOTIFICATION_SUCCESS_CSS_CLASS } from './../Constants';

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

export const updateCartCount = () => {
  if (window.gnav) {
    const cartCount = window.gnav.getCookie('cartCount');
    if (cartCount) {
      window.gnav.updateCartCountCookie(parseInt(cartCount, 10));
    } else {
      window.gnav.updateCartCountCookie(0);
    }
  }
};

export const parsePrice = (priceStr) => parseFloat(priceStr, 10);

export const getNotificationCssClass = (type, section) => {
  switch (type) {
    case NOTIFICATION_ERROR_CSS_CLASS:
      return `notification notificationErrors ${section || ''}`;
    case NOTIFICATION_WARNING_CSS_CLASS:
      return `notification notificationWarnings ${section || ''}`;
    case NOTIFICATION_SUCCESS_CSS_CLASS:
      return `notification notificationSuccess ${section || ''}`;
    default:
      return `notification notificationInfo ${section || ''}`;
  }
};
