import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";
import { hideSpinner, showSpinner } from "./spinner";

const toggleCompletion = async (id, tableRow) => {
  showSpinner();
  try {
    const taskToCross = doc(database, "tasks", id);
    const taskSnapShot = await getDoc(taskToCross);
    const currentIsCompletedState = taskSnapShot.data().isCompleted;
    const updatedIsCompletedState = !currentIsCompletedState;
    await updateDoc(taskToCross, { isCompleted: updatedIsCompletedState });
    if (updatedIsCompletedState) {
      tableRow.classList.add("task--completed");
    } else {
      tableRow.classList.remove("task--completed");
    }
  } catch (error) {
    console.log("Error updating task completion");
  } finally {
    hideSpinner();
  }
};

export default toggleCompletion;
