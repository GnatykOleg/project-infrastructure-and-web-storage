import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const FORM_KEY = 'feedback-form-state';

refreshInputUpdate();

form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onFormSubmit);

function onInput(event) {
  let object = localStorage.getItem(FORM_KEY);

  if (object) {
    object = JSON.parse(object);
  } else {
    object = {};
  }
  object[event.target.name] = event.target.value;
  const stringifyJson = JSON.stringify(object);
  localStorage.setItem(FORM_KEY, stringifyJson);
}

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();
  localStorage.removeItem(FORM_KEY);
}

function refreshInputUpdate() {
  let object = localStorage.getItem(FORM_KEY);

  if (object) {
    object = JSON.parse(object);
    Object.entries(object).forEach(([name, value]) => {
      form.elements[name].value = value;
    });
  }
}
