import { deleteDoc, doc } from "firebase/firestore";
import { database } from "./firebaseConfig";
import renderTasks from "./renderTasks";

const deleteTask = async (id) => {
  try {
    const taskToDelete = doc(database, "tasks", id);
    await deleteDoc(taskToDelete);
    renderTasks();
  } catch (error) {
    console.log("Error deleting the task");
  }
};

export default deleteTask;
