import deleteTask from "./deleteTask";
import validateForm, { fieldsToValidate } from "./validation";

const deleteModal = document.querySelector(".delete-modal");
const deleteModalText = document.querySelector(".delete-modal__text");
const cancelDeleteButton = document.querySelector(
  ".delete-modal__cancel-button"
);
const confirmDeleteModalButton = document.querySelector(
  ".delete-modal__confirm-button"
);

const formModal = document.querySelector(".form-modal");

let previousConfirmDeleteHandler = null;

const openModal = (formModal, openModalButton) => {
  openModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.add("form-modal--display");
  });
};

const closeModal = (form, formModal, closeModalButton, submitButton) => {
  closeModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.remove("form-modal--display");
    fieldsToValidate.forEach((field) => {
      //const fieldToValidate = document.querySelector(`#${field.id}`);
      const errorParagraph = document.querySelector(`.${field.errorClass}`);

      errorParagraph.style.display = "none";
      errorParagraph.textContent = "";
    });
    submitButton.textContent = "Add Task";
    form.reset();
  });
};

const openDeleteModal = (id, taskTitle) => {
  deleteModal.classList.add("delete-modal--display");
  deleteModalText.textContent = `Are you want to delete "${taskTitle}" ?`;
  //console.log("from open deletModal");

  const confirmDeleteHandler = async () => {
    await deleteTask(id);
    deleteModal.classList.remove("delete-modal--display");
  };
  if (previousConfirmDeleteHandler) {
    confirmDeleteModalButton.removeEventListener(
      "click",
      previousConfirmDeleteHandler
    );
  }
  confirmDeleteModalButton.addEventListener("click", confirmDeleteHandler);
  previousConfirmDeleteHandler = confirmDeleteHandler;
};

const closeDeleteModal = () => {
  cancelDeleteButton.addEventListener("click", () => {
    deleteModal.classList.remove("delete-modal--display");
  });
};

const openEditModal = () => {
  formModal.classList.add("form-modal--display");
};

export {
  openModal,
  closeModal,
  openDeleteModal,
  closeDeleteModal,
  openEditModal,
};
