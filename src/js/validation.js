export const fieldsToValidate = [
  {
    id: "title",
    message: "Title is required",
    errorClass: "form__title-error",
  },
  {
    id: "date",
    message: "Date is required",
    errorClass: "form__date-error",
  },
  {
    id: "category",
    message: "Category is required",
    errorClass: "form__category-error",
  },
  {
    id: "priority",
    message: "Priority is required",
    errorClass: "form__priority-error",
  },
];

const checkFields = (element) => {
  const fieldToValidate = document.querySelector(`#${element.id}`);
  const errorParagraph = document.querySelector(`.${element.errorClass}`);
  if (!fieldToValidate.value.trim()) {
    errorParagraph.style.display = "block";
    errorParagraph.textContent = element.message;
    return false;
  } else {
    errorParagraph.style.display = "none";
    errorParagraph.textContent = "";
    return true;
  }
};

const validateForm = () => {
  let isValid = true;
  fieldsToValidate.forEach((element) => {
    const result = checkFields(element);
    if (!result) {
      isValid = false;
    }
  });
  return isValid;
};

// const validateForm = () => {
//   console.log("from validateForm");

//   let isValid = true;
//   fieldsToValidate.forEach((field) => {
//     const fieldToValidate = document.querySelector(`#${field.id}`);
//     const errorParagraph = document.querySelector(`.${field.errorClass}`);
//     fieldToValidate.addEventListener("blur", () => {
//       if (!fieldToValidate.value.trim()) {
//         errorParagraph.style.display = "block";
//         errorParagraph.textContent = field.message;
//       } else {
//         errorParagraph.style.display = "none";
//         errorParagraph.textContent = "";
//       }
//     });
//   });
//   fieldsToValidate.forEach((field) => {
//     const fieldToValidate = document.querySelector(`#${field.id}`);
//     if (!fieldToValidate.value.trim()) {
//       isValid = false;
//     }
//   });
//   return isValid;
// };
export default validateForm;
