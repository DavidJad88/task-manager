import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";

const toggleCompletion = async (id, tableRow) => {
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
  }
};

export default toggleCompletion;
