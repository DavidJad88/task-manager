import deleteTask from "./deleteTask";

const deleteModal = document.querySelector(".delete-modal");
const deleteModalText = document.querySelector(".delete-modal__text");
const cancelDeleteButton = document.querySelector(
  ".delete-modal__cancel-button"
);
const confirmDeleteModalButton = document.querySelector(
  ".delete-modal__confirm-button"
);

let previousConfirmDeleteHandler = null;

const openModal = (formModal, openModalButton) => {
  openModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.add("form-modal--display");
  });
};

const closeModal = (formModal, closeModalButton) => {
  closeModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.remove("form-modal--display");
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

export { openModal, closeModal, openDeleteModal, closeDeleteModal };
