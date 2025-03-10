import addTasks from "./addTasks";
import appState from "./appState";
import { editTask } from "./editTasks";
import filterTasksByMonth from "./filterTasks";
import app, { database } from "./firebaseConfig";
import { openModal, closeModal, closeDeleteModal } from "./modal";
import renderTasks from "./renderTasks";
import validateForm from "./validation";

// Selecting DOM elements
const formModal = document.querySelector(".form-modal");
const form = document.querySelector(".form");
const openModalButton = document.querySelector(".tools__button--add");
const closeModalButton = document.querySelector(".form__close-button");
const titleInput = document.querySelector(".form__title-input");
const dateInput = document.querySelector(".form__date-input");
const timeInput = document.querySelector(".form__time-input");
const categorySelect = document.querySelector(".form__category-select");
const prioritySelect = document.querySelector(".form__priority-select");
const openChartButton = document.querySelector(".tools__button--chart");
const filterSelect = document.querySelector(".tools__filter-month");
const submitButton = document.querySelector(".form__submit-button");
const formSubmissionFeedback = document.querySelector(
  ".form__submission-feedback"
);

document.addEventListener("DOMContentLoaded", () => {
  openModal(formModal, openModalButton);
  closeModal(form, formModal, closeModalButton, submitButton);
  closeDeleteModal();
  renderTasks();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formSubmissionFeedback.classList.remove("form--invalid-input", "form--valid");
  if (!validateForm()) {
    formSubmissionFeedback.classList.add("form--invalid-input");
    formSubmissionFeedback.textContent =
      "Please fill in all the fields before adding a task";
    setTimeout(() => {
      formSubmissionFeedback.textContent = "";
    }, 3000);
    return;
  }
  if (!appState.editState) {
    addTasks(
      titleInput.value,
      dateInput.value,
      timeInput.value,
      categorySelect.value,
      prioritySelect.value
    );
  } else {
    editTask(appState);
    appState.editState = null;
  }
  renderTasks();
  form.reset();
  formSubmissionFeedback.classList.remove("form--invalid-input");
  formSubmissionFeedback.classList.add("form--valid");
  formSubmissionFeedback.textContent = "Task added successfully";
  setTimeout(() => {
    formSubmissionFeedback.textContent = "";
  }, 3000);
});

filterSelect.addEventListener("change", (e) => {
  const selectedMonth = e.target.value;
  filterTasksByMonth(selectedMonth);
});
