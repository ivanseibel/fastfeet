export function setIssuesFilter(filter) {
  return {
    type: '@issues/SET_FILTER',
    payload: { filter },
  };
}

export function setIssueData(issueData) {
  return {
    type: '@issues/SET_ISSUE_DATA',
    payload: issueData,
  };
}

export function setShowPopup(showPopup) {
  return {
    type: '@issues/SET_SHOW_POPUP',
    payload: { showPopup },
  };
}

export function setShowDetails(showModal) {
  return {
    type: '@issues/SET_SHOW_MODAL',
    payload: { showModal },
  };
}
