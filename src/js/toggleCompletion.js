import { doc, updateDoc } from "firebase/firestore";
import { database } from "./firebaseConfig";

const toggleCompletion = async (id, isCompleted) => {
  try {
    const taskToCross = doc(database, "tasks", id);
    await updateDoc(taskToCross, { isCompleted: !isCompleted });
    console.log(isCompleted);
  } catch (error) {
    console.log("Error updating task completion");
  }
};

export default toggleCompletion;
