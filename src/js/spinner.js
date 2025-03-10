import appState from "./appState";

const updateSpinnerVisibility = () => {
  const spinner = document.querySelector(".spinner");
  if (appState.loadingState) {
    spinner.classList.add("spinner--show");
  } else {
    spinner.classList.remove("spinner--show");
  }
};

const showSpinner = () => {
  appState.loadingState = true;
  updateSpinnerVisibility();
};

const hideSpinner = () => {
  appState.loadingState = false;
  updateSpinnerVisibility();
};

export { showSpinner, hideSpinner };
