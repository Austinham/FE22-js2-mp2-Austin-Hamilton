import { Tamagotchi } from "./modules/animal.js";

const form = document.querySelector('form');
form.addEventListener('submit', event => {
    // console.log('Form submitted');
  event.preventDefault();
  const petNameInput = form.querySelector('input[name="text"]');
//   console.log(petNameInput)
  const petTypeSelect = form.querySelector('#pet-select');

//   console.log(petTypeSelect);
  const petName = petNameInput.value;
  const petType = petTypeSelect.value;

  console.log(`Pet name: ${petName}, Pet type: ${petType}`); 


  const pet = new Tamagotchi(petName, petType);
  pet.makingPet();

  petNameInput.value = '';
  petTypeSelect.value = '';
});
