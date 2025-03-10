import { deleteDoc, doc } from "firebase/firestore";
import { database } from "./firebaseConfig";
import renderTasks from "./renderTasks";
import { hideSpinner, showSpinner } from "./spinner";

const deleteTask = async (id) => {
  showSpinner();
  try {
    const taskToDelete = doc(database, "tasks", id);
    await deleteDoc(taskToDelete);
    renderTasks();
  } catch (error) {
    console.log("Error deleting the task");
  } finally {
    hideSpinner();
  }
};

export default deleteTask;
