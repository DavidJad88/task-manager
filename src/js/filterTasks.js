import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { database } from "./firebaseConfig";
import renderTasks from "./renderTasks";
import { hideSpinner, showSpinner } from "./spinner";

const filterTasksByMonth = async (selectedMonth) => {
  showSpinner();
  try {
    const tasksCollection = collection(database, "tasks");
    const q = query(tasksCollection, orderBy("createdAt"));
    const tasksSnapshot = await getDocs(q);

    //filter tasks by selected month
    const filteredTasks = tasksSnapshot.docs.filter((doc) => {
      const task = doc.data();
      const taskDate = new Date(task.date);
      const taskMonth = taskDate.getMonth() + 1;
      return selectedMonth === "all" || taskMonth === parseInt(selectedMonth);
    });

    renderTasks(filteredTasks);
  } catch (error) {
    console.log("Error filtering tasks: ");
  } finally {
    hideSpinner();
  }
};

export default filterTasksByMonth;
