export function setDeliveriesFilter(filter) {
  return {
    type: '@deliveries/SET_FILTER',
    payload: { filter },
  };
}

export function setDeliveryId(deliveryId) {
  return {
    type: '@deliveries/SET_DELIVERY_ID',
    payload: { deliveryId },
  };
}

export function setShowPopup(showPopup) {
  return {
    type: '@deliveries/SET_SHOW_POPUP',
    payload: { showPopup },
  };
}

export function setShowDetails(showModal) {
  return {
    type: '@deliveries/SET_SHOW_MODAL',
    payload: { showModal },
  };
}
