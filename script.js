import {russianCities} from "./src/cities.js"
import {skillsList} from "./src/skills.js"

class Person{
    constructor(name, city, softskills, skillsList){
        this.name = name
        this.city = city
        this.softskills = softskills.split(', ')
        this.skillsList = skillsList
    }
}

class Education{
    constructor(name, city){
        this.name = name
        this.city = city
    }
}

class FinalForm{
    constructor(person, education){
        this.person = person
        this.education = education
    }
}

class FormController{
    constructor(){
        this.navButtons = document.querySelectorAll(".nav-btn")
        this.sections = document.querySelectorAll(".info-section")
        this.skillsArray = []
        this.initialSetup()
    }
    initialSetup() {
        this.setupNavButtons()
        this.setupSections(0)
        this.setupSkillsButtons()
    }
    setupNavButtons(){
        this.navButtons.forEach((item, index) => {
            item.dataset.index = index;
            item.addEventListener('click', () => {
                this.navButtons.forEach(btn => {
                    btn.style.borderBottom = 'none';
                });
                item.style.borderBottom = '1px solid white';
                this.setupSections(Number(index))
            });
        });
    }
    setupSections(index){
        this.sections.forEach((item, index)=>{
            item.dataset.index = index
            item.style.cssText = `
                opacity: 0;
                visibility: hidden;
                position: absolute;
                transition: opacity .2s, visibility .2s;
            `
        })
        setTimeout(()=>{
            this.sections[index].style.cssText = `
                opacity: 1;
                visibility: visible;
            `
        },250)
        this.navButtons[index].style.borderBottom = "1px solid white"
    }
    setupSkillsButtons(){
        const skillsPage = document.getElementById("skillsSection")
        skillsList.forEach(skill =>{
            const button = document.createElement("button")
            button.classList.add("skills-select")
            button.innerHTML = skill
            button.addEventListener('click', ()=>{
                if(!this.skillsArray.includes(skill) && this.skillsArray.length !== 5){
                    this.skillsArray.push(skill)
                    button.style.cssText = `
                        color: black;
                        background-color: white;
                        border-bottom: 1px black solid;
                    `
                }
                else if(this.skillsArray.includes(skill)){
                    this.skillsArray.splice(this.skillsArray.indexOf(skill), 1)
                    button.style.cssText = ``
                }
                console.log(this.skillsArray)
            })
            skillsPage.appendChild(button)
        })
    }
}

const setup = new FormController