export function setRecipientsFilter(filter) {
  return {
    type: '@recipients/SET_FILTER',
    payload: { filter },
  };
}

export function setRecipientData(recipientData) {
  return {
    type: '@recipients/SET_RECIPIENT_DATA',
    payload: recipientData,
  };
}

export function setShowPopup(showPopup) {
  return {
    type: '@recipients/SET_SHOW_POPUP',
    payload: { showPopup },
  };
}
