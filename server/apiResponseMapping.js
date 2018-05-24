/**
 * Format:
 * {
 *  endPoint = apiEndpoint
 *  fileName = mockJSONFile.js
 *  fields: expectedResKey
 * }
 * Field(s):
 *      deviceSelectView = to get only a specific key
 *      *     = to get and load all the keys
 *      deviceSelectView, cqJSON = to get multiple keys
 *
 * TODO: querySting based & HTTP filters
 *
 * NOTE: Restart Dev server whenever this file is modified
 */

const apiMapping = [
  /* Trade-in JSON */
  {
    endPoint: '/od/cust/auth/device/deviceDetails/',
    fileName: 'deviceDetails.js',
    fields: 'pdpJSON',
  },
  {
    endPoint: '/od/cust/auth/tradein/questionnaire/',
    fileName: 'tradeinJSON.js',
    fields: 'onSelectedDeviceAjaxResponse',
  },
  {
    endPoint: "/od/cust/auth/tradein/questionsAjax",
    fileName: "tradeinJSON.js",
    fields: "questionsAjaxResponse"
  },
  // Appraisal submit response
  {
    endPoint: '/od/cust/auth/tradein/creditAjax',
    fileName: 'tradeinJSON.js',
    fields: 'outputForCredit',
  },
  {
    endPoint :'/od/cust/auth/device/getPromotions',
    fileName: 'promosResponse.js',
    fields: 'promotions',
  },

  {
    endPoint: '/od/cust/auth/hum/makes',
    fileName: 'humConfig/makes.js',
    fields: 'makesJSON'
  },
  {
    endPoint: '/od/cust/auth/hum/models',
    fileName: 'humConfig/models.js',
    fields: 'modelsJSON'
  },
  {
    endPoint: '/od/cust/auth/iscompatiblevehicle',
    fileName: 'humConfig/vehicleCompatibilityCheck.js',
    fields: 'vehicleCompatibilityCheck'
  },
  {
    endPoint: '/od/cust/auth/emailaddresscheck',
    fileName: 'humConfig/emailaddresscheck.js',
    fields: 'emailaddresscheck3'
  },
  
  {
    endPoint: '/od/cust/auth/cart/getCompatibleFeatures',
    fileName: 'protectionJSON.js',
    fields: 'protections',
  },
  {
    endPoint: '/od/cust/auth/checkout/updateShippingInfo',
    fileName: 'updatePaymentInfo.js',
    fields: 'updateShippingInfo',
  },
  {
    endPoint: "/od/cust/auth/checkout/storeDetails",
    fileName: "checkout/storeDetailsJSON.js",
    fields: "storeDetails"
  },
  {
    endPoint: "/od/cust/auth/checkout/updatePaymentInfo",
    fileName: "checkout/updatePaymentInfo.js",
    fields: "updatePaymentInfo"
  },
  {
    endPoint: "/od/cust/auth/checkout/securePin",
    fileName: "securePin/securePinUrls.js",
    fields: "securePinUrls"
  },
  {
    endPoint: "/od/cust/auth/checkout/fetchSMSEnabledDevices",
    fileName: "securePin/fetchSMSEnabledDevices.js",
    fields: "fetchJSON"
  },
  // Send SMS flow
  {
    endPoint: "/od/cust/auth/checkout/sendSMS",
    fileName: "securePin/sendSMS.js",
    fields: "sendSMSJSON"
  },
  {
    endPoint: "/od/cust/auth/checkout/validateAuthCode",
    fileName: "securePin/validateAuthCode.js",
    fields: "validateAuthCodeJSON"
  },


  // Cart responses
  // Accessories responses
  {
    endPoint: "/od/cust/auth/cart/addOrRemoveAccessory",
    fileName: "addOrRemoveAccessory.js",
    fields: "addOrRemoveAccessory"
  },
  {
    endPoint: "/od/cust/auth/cart/saveCart",
    fileName: "cart/saveCart.js",
    fields: "saveCartJSON"
  },
  {
    endPoint: "/od/cust/auth/cart/addOrUpdateDevice",
    fileName: "cart/addOrUpdateDevice.js",
    fields: "cartJSON"
  },
  {
    endPoint: "/od/cust/auth/checkout/initiateCheckout",
    fileName: "cart/initiateCheckout.js",
    fields: "initiateCheckout"
  },
  {
    endPoint: "/od/cust/auth/cart/applyPromoCode",
    fileName: "cart/applyPromoCode.js",
    fields: "invalidPromo_cartJSON"
  },
  {
    endPoint: "/od/cust/auth/cart/clearCart",
    fileName: "cart/clearCart.js",
    fields: "cartJSON"
  },
  {
    endPoint: "/od/cust/auth/cart/expressAddToCart",
    fileName: "cart/clearCart.js",
    fields: "cartJSON"
  },

 {
    endPoint: "/od/cust/auth/device/deviceImage/",
    fileName: "deviceImageJSON.js",
    fields: "deviceImageJSON"
  },
  {
		endPoint: "/od/cust/auth/checkout/npaNxxNumber",
		fileName: "checkout/npaNxxNumber.js",
		fields: "npaNxxNumber"
  },
  {
    endPoint: "/od/cust/auth/numbershare",
    fileName: "numberShare/numberShareJSON.js",
    fields: "numberShareJSON"
  },
  {
    endPoint: "/od/cust/auth/getE911Address",
    fileName: "numberShare/e911.js",
    fields: "e911JSON"
  },
  // MDN Selection
  {
    endPoint: "/od/cust/auth/submitaddaline",
    fileName: "mtnSelection/mdnAALJSON.js",
    fields: "mdnAALJSON"
  },
  {
    endPoint: '/od/cust/auth/mtnDetail/json',
    fileName: 'mdn/mtnDetailAjax.js',
    fields: 'mtnDetailAjax'
  },
  {
    endPoint: '/od/cust/auth/submitSummary',
    fileName: 'mdn/submitSummaryJSON.js',
    fields: 'loanPaySummary'
  },
  {
    endPoint: '/od/cust/auth/account/transferUpgrade',
    fileName: 'mdn/transferUpgrade.js',
    fields: 'transferUpgrade'
  },
  {
    endPoint: '/od/cust/auth/redo/transferUpgrade',
    fileName: 'mdn/undoTransferUpgrade.js',
    fields: 'undoTransferUpgrade'
  },
  {
    endPoint: '/od/cust/auth/cart/applyPromoCode',
    fileName: 'cart/cartJSON.js',
    fields: "cartJSON"
  },
  {
    endPoint: '/od/cust/auth/cart/clearCart',
    fileName: 'cart/cartJSON.js',
    fields: "cartJSON"
  },
  {
    endPoint: "/content/wcms/one-digital/global-header/prospect.globalheader.json",
    fileName: "globalheader.js",
    fields: "globalheaderJSON"
  },
  {
    endPoint: "/content/wcms/one-digital/global-footer/prospect.globalfooter.json",
    fileName: "globalfooter.js",
    fields: "globalfooterJSON"
  },

  // BYOD
  {
    endPoint: "/od/cust/auth/byod/validateIMEI",
    fileName: "byod/validateByod.js",
    fields: "imei"
  },
  {
    endPoint: "/od/cust/auth/byod/validateSIM",
    fileName: "byod/validateByod.js",
    fields: "sim"
  },
  {
    endPoint: "/od/cust/auth/byod/addNewSIM",
    fileName: "byod/validateByod.js",
    fields: "addsim"
  },
  {
    endPoint: "/od/cust/auth/byod/removeDevice",
    fileName: "byod/validateByod.js",
    fields: "removeDevice"
  },
  {
    endPoint: "/od/cust/auth/byod/skipSIM",
    fileName: "byod/validateByod.js",
    fields: "skipSim"
  },

  // Multi Upgrade scenario CPC Prompt
  {
    endPoint: "/od/cust/auth/compatiblePlans",
    fileName: "cpcPrompt/validateMultiCpcPrompt.js",
    fields: "multiSuccess"
  },

  {
    endPoint: "/od/cust/auth/keepCurrentPlan",
    fileName: "cpcPrompt/validateMultiCpcPrompt.js",
    fields: "multiSuccess"
  },

  {
    endPoint: "/od/cust/auth/selectPlan",
    fileName: "cpcPrompt/validateMultiCpcPrompt.js",
    fields: "multiSuccess"
  },

  {
    endPoint: "/od/cust/auth/cart/saveAccountMemberCart",
    fileName: "cart/saveAccountMemberCart.js",
    fields: "saveAccountMemberCartJSON"
  },
  {
    endPoint: "/od/cust/auth/cancelPendingOrder/",
    fileName: "mdn/cancelPendingOrder.js",
    fields: "cancelPendingOrder"
  },
  {
    endPoint: "/od/trade-in/removeTradein",
    fileName: "cart/tradeIn.js",
    fields: "cartJSON"
  },
  {
    endPoint: "/od/cust/auth/getCartDetails",
    fileName: "cart/tradeIn.js",
    fields: "cartJSON"
  },
  {
    endPoint: "/od/cust/auth/accessories/",
    fileName: "accessoriesJSON.js",
    fields: "accessoriesJSON"
  }
];


module.exports = apiMapping;
