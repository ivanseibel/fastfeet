export function setDeliverymansFilter(filter) {
  return {
    type: '@deliverymans/SET_FILTER',
    payload: { filter },
  };
}

export function setDeliverymanData(deliverymanData) {
  return {
    type: '@deliverymans/SET_DELIVERYMAN_DATA',
    payload: deliverymanData,
  };
}

export function setShowPopup(showPopup) {
  return {
    type: '@deliverymans/SET_SHOW_POPUP',
    payload: { showPopup },
  };
}
