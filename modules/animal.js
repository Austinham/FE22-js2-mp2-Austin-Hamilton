export class Tamagotchi {
    // define the classes

    #hungerLevel;
    #happinessLevel;
    #id;
    #id2;
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.#hungerLevel = 10;
        this.#happinessLevel = 10;
        this.updateStatus();


    }
    // feed/playing logic

    feed() {
        this.#hungerLevel += 1;
        if (this.#hungerLevel > 10) {
            this.#hungerLevel = 10;
        }
        this.updateStatus();

        const petDiv = document.querySelector(`#${this.name}-hunger-level`);
        console.log(petDiv)
        if (petDiv) {
            petDiv.classList.add('jump');
            setTimeout(() => {
                petDiv.classList.remove('jump');
            }, 500);
        }

        const hungerLevelEl = document.querySelector(`#${this.name}-hunger-level span`);
        if (hungerLevelEl) {
            hungerLevelEl.textContent = this.#hungerLevel;
            hungerLevelEl.classList.add('blink-green');
            setTimeout(() => {
                hungerLevelEl.classList.remove('blink-green');
            }, 500);
        }

    }

    play() {

        
        this.#happinessLevel += 1;
        if (this.#happinessLevel > 10) {
            this.#happinessLevel = 10;
        }
        this.updateStatus();

        const petDiv = document.querySelector(`#${this.name}-happiness-level`);
        petDiv.classList.add('jump');
        setTimeout(() => {
            petDiv.classList.remove('jump');
        }, 500);


        const happinessLevelEl = document.querySelector(`#${this.name}-happiness-level span`);
        if (happinessLevelEl) {
            happinessLevelEl.textContent = this.#happinessLevel;
            happinessLevelEl.classList.add('blink-green');
            setTimeout(() => {
                happinessLevelEl.classList.remove('blink-green');
            }, 500);
        }


    }

    


    updateStatus() {
       
        const happinessLevelEl = document.querySelector(`#${this.name}-happiness-level span`);
        if (happinessLevelEl) {
            happinessLevelEl.textContent = this.#happinessLevel;
            console.log('Called happiness level: ' + this.#happinessLevel);
        }

    }

    updateStatusHunger(){

        const hungerLevelEl = document.querySelector(`#${this.name}-hunger-level span`);
        if (hungerLevelEl) {
            hungerLevelEl.textContent = this.#hungerLevel;
            console.log('Called huger level: ' + this.#hungerLevel);
        }

        
    }


    startTimer() {



        this.#id = setInterval(() => {
            const pointsDecreased = this.decreasePoints(1);
            
            if ( pointsDecreased ) {

                // console.log('Calling huger level: ' + this.#hungerLevel);
                // console.log('Calling happiness level: ' + this.#happinessLevel);
                this.updateStatus();
            }
        }, 1000);


        this.#id2 = setInterval(()=>{

            const hungerPointsDecreased = this.decreaseHungerPoints(1);

            if ( hungerPointsDecreased ) {
                

                // console.log('Calling huger level: ' + this.#hungerLevel);
                // console.log('Calling happiness level: ' + this.#happinessLevel);
                this.updateStatusHunger();
            }

            // console.log('it working i think')
            
        },2000)
    }

    stop() {

        clearInterval(this.#id);
        clearInterval(this.#id2);
    }


    decreaseHungerPoints(hungerPoints){

        let hungerPointsDecreased = false;

        if (this.#hungerLevel > 0) {
            this.#hungerLevel -= hungerPoints;
            if (this.#hungerLevel < 0) {
                this.#hungerLevel = 0;
            }
            hungerPointsDecreased = true;
            const hungerLevelEl = document.querySelector(`#${this.name}-hunger-level span`);
            if (hungerLevelEl) {
                hungerLevelEl.textContent = this.#hungerLevel;
                if (this.#hungerLevel < 5) {
                    hungerLevelEl.classList.add('blink-red');
                } else {
                    hungerLevelEl.classList.remove('blink-red')

                }
            }
        }

        if (this.#hungerLevel === 0) {
            const petDiv = document.getElementById(this.name + 'pet');
            petDiv.style.backgroundColor = "gray";

       
         ;
            
            // petDiv.parentNode.removeChild(petDiv)
            clearInterval(this.#id2);
            // alert(`${this.name} has died of starvation.`);
            return;
        }

        return hungerPointsDecreased
        


    }

    


    decreasePoints(points) {
        let pointsDecreased = false;



       
        
        if (this.#happinessLevel > 0) {
            this.#happinessLevel -= points;
            if (this.#happinessLevel < 0) {
                this.#happinessLevel = 0;
            }
            pointsDecreased = true;
            const happinessLevelEl = document.querySelector(`#${this.name}-happiness-level span`);
            if (this.#happinessLevel < 5) {
                happinessLevelEl.classList.add('blink-gold');
            } else {
                happinessLevelEl.classList.remove('blink-gold')

            }

        }
       
        return pointsDecreased;
    }


    // select the div container 
    makingPet() {

        const petContainer = document.getElementById('pet-container')

        // make a new pet container
        const petDiv = document.createElement('div');
        petDiv.setAttribute('id', this.name + 'pet');
        petDiv.classList.add('pet')

        // adding it to the container 
        const petName = document.createElement('h3');
        petName.textContent = `${this.name} the ${this.type}`;
        petDiv.appendChild(petName);

        // adding the hunger/happinessLevel

        const hungerLevel = document.createElement('p');
        hungerLevel.innerHTML = `Hunger Level: <span>${this.#hungerLevel}</span>`;
        hungerLevel.setAttribute('id', this.name + '-hunger-level'); // Add ID attribute
        petDiv.appendChild(hungerLevel);

        const happinessLevel = document.createElement('p');
        happinessLevel.innerHTML = `Happiness Level: <span>${this.#happinessLevel}</span>`;
        happinessLevel.setAttribute('id', this.name + '-happiness-level'); // Add ID attribute
        petDiv.appendChild(happinessLevel);

        // adding the feed/play button to the field

        const feedBtn = document.createElement('button')
        feedBtn.classList.add('feed-Btn');
        feedBtn.textContent = 'Feed'
        feedBtn.addEventListener('click', () => {
            this.feed();
            hungerLevel.querySelector('span').textContent = this.#hungerLevel;
        });
        petDiv.appendChild(feedBtn);

        const playBtn = document.createElement('button');
        playBtn.classList.add('play-Btn');
        playBtn.textContent = 'Play';
        playBtn.addEventListener('click', () => {
            this.play();
            happinessLevel.querySelector('span').textContent = this.#happinessLevel;
        });



        petDiv.appendChild(playBtn);


        petContainer.appendChild(petDiv);

        this.startTimer();


    }



}
