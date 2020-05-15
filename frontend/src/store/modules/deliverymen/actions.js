export function setDeliverymenFilter(filter) {
  return {
    type: '@deliverymen/SET_FILTER',
    payload: { filter },
  };
}

export function setDeliverymanData(deliverymanData) {
  return {
    type: '@deliverymen/SET_DELIVERYMAN_DATA',
    payload: deliverymanData,
  };
}

export function setShowPopup(showPopup) {
  return {
    type: '@deliverymen/SET_SHOW_POPUP',
    payload: { showPopup },
  };
}
