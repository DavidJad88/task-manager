import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseConfig";

const addTasks = async (title, date, time, category, priority) => {
  try {
    const task = {
      title,
      date,
      time,
      category,
      priority,
      isCompleted: false,
      createdAt: serverTimestamp(),
    };
    console.log(task);

    await addDoc(collection(database, "tasks"), task);
    console.log("task added to firestore db successfully");
  } catch (error) {
    console.log("failed to add to firestore db");
  }
};

export default addTasks;
