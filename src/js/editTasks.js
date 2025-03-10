import appState from "./appState.js";
import { database } from "./firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const formModal = document.querySelector(".form-modal");

const titleInput = document.querySelector(".form__title-input");
const dateInput = document.querySelector(".form__date-input");
const timeInput = document.querySelector(".form__time-input");
const categorySelect = document.querySelector(".form__category-select");
const prioritySelect = document.querySelector(".form__priority-select");
const submitButton = document.querySelector(".form__submit-button");

const populateEditForm = async (id) => {
  const docRef = doc(database, "tasks", id);
  const docToEditSnap = await getDoc(docRef);
  if (docToEditSnap.exists()) {
    const docToEdit = docToEditSnap.data();
    titleInput.value = docToEdit.title;
    dateInput.value = docToEdit.date;
    timeInput.value = docToEdit.time;
    categorySelect.value = docToEdit.category;
    prioritySelect.value = docToEdit.priority;
    submitButton.textContent = "Confirm Edit";
    appState.editState = id;
  } else {
    console.log("No such document!");
  }
};

const editTask = async (id) => {
  try {
    const editedTask = {
      title: titleInput.value,
      date: dateInput.value,
      time: timeInput.value,
      category: categorySelect.value,
      priority: prioritySelect.value,
    };
    const docRef = doc(database, "tasks", id.editState);
    await updateDoc(docRef, editedTask);
    formModal.classList.remove("form-modal--display");
    submitButton.textContent = "Add Task";
    console.log("Document edited successfully!");
  } catch (error) {
    console.log("Error editing document: ");
  }
};

export { populateEditForm, editTask };
