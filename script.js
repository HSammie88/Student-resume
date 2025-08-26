import {russianCities} from "./src/cities.js"
import {skillsList} from "./src/skills.js"

class FormController{
    constructor(){
        this.navButtons = document.querySelectorAll(".nav-btn")
        this.sections = document.querySelectorAll(".info-section")
        this.textarea = document.getElementById('softskillsTextarea')
        this.inputAreas = document.querySelectorAll('.info-input')
        this.lists = document.querySelectorAll('ul')
        this.resumeText = this.sections[this.sections.length - 1].querySelectorAll('p')
        this.resumeButton = this.navButtons[this.navButtons.length - 1]
        this.skillsArray = []
        this.resumeUnlocker = new Set()
        this.initialSetup()
    }
    initialSetup() {
        this.textarea.dataset.index = 0
        this.setupNavButtons()
        this.setupSections(0)
        this.setupSkillsButtons()
        this.setupInputs()
        this.setupCityAutocomplete()
        this.resumeButton.addEventListener('focus', ()=>{
            document.getElementById('nameResumeText').innerHTML = this.inputAreas[0].value
            this.lists[0].innerHTML = ''
            this.lists[1].innerHTML = ''
            for(let i = 0; i < this.inputAreas.length - 1; i++)
                this.resumeText[i].innerText = this.inputAreas[i + 1].value
            if(this.skillsArray.length !== 0)
                this.skillsArray.forEach(item => this.addListItem(item, false))
            else
                this.addListItem('Нет', false)
            this.textarea.value.split(', ').forEach(item =>this.addListItem(item, true))
        })
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
            })
            skillsPage.appendChild(button)
        })
    }
    setupInputs(){
        this.inputAreas.forEach((item, index) =>{
            item.addEventListener('blur', ()=>{
                this.emptinessCheckout(item, index + 1)
            })
            item.addEventListener('keydown', (e)=>{
                if(e.key === 'Enter')
                    this.emptinessCheckout(item, index + 1)
            })
        })
        this.textarea.addEventListener('blur', ()=>{
            this.emptinessCheckout(this.textarea, 0)
        })
        this.textarea.addEventListener('keydown', (e)=>{
            if(e.key === 'Enter')
                this.emptinessCheckout(this.textarea, 0)
        })
    }
    emptinessCheckout(item, index){
        if(!item.value){
            item.style.borderBottom = '1px solid red'
            this.resumeUnlocker.delete(index)
        }else{
            item.style.borderBottom = '1px solid green'
            this.resumeUnlocker.add(index)
        }
        if(this.resumeUnlocker.size === this.inputAreas.length + 1){
            this.resumeButton.disabled = false
            this.resumeButton.style.cursor = 'pointer'
        }
        else{
            this.resumeButton.disabled = true
            this.resumeButton.style.cursor = 'not-allowed'
        }       
    }
    addListItem(item, check){
        const li = document.createElement('li')
        li.classList.add('final-item')
        li.innerText = item
        if(!check){
            this.lists[0].appendChild(li)
        }
        else{
            this.lists[1].appendChild(li)
        }
    }
    setupCityAutocomplete() {
        const cityInputs = [this.inputAreas[1], this.inputAreas[2]]
        cityInputs.forEach(input => {
            const datalist = document.createElement('datalist')
            datalist.id = `cities-${input.dataset.index}`
            input.setAttribute('list', datalist.id)
            input.parentNode.appendChild(datalist)
    
            input.addEventListener('input', () => {
                const value = input.value.toLowerCase()
                
                if (value.length > 1) {
                    const filteredCities = russianCities.filter(city => 
                        city.toLowerCase().includes(value)
                    )
                    
                    datalist.innerHTML = ''
                    filteredCities.forEach(city => {
                        const option = document.createElement('option')
                        option.value = city
                        datalist.appendChild(option)
                    })
                } else {
                    datalist.innerHTML = ''
                }
            })
            input.addEventListener('blur', () => {
                if (!russianCities.includes(input.value)) {
                    input.value = ''
                }
            })
        })
    }
}

const setup = new FormController