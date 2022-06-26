let taskGroup = {}
let draggingElement = null

const handleSectionNameSubmit = () => {
    let sectionNameElement = document.getElementById("section-name")
    taskGroup[sectionNameElement.value] = []
    sectionNameElement.value = ""
    renderTasks()
}

const handleTaskSubmit = () => {
    let sectionOptions = document.getElementById("sectionOptions")
    let taskObject = {
        name: document.getElementById("task-name").value,
        desc: document.getElementById("task-desc").value,
        status: sectionOptions.value
    }
    taskGroup[sectionOptions.value].push(taskObject)
    renderTasks()
}

const renderTasks = () => {
    let sectionOptions = document.getElementById("sectionOptions")
    let sectionList = document.getElementById("sectionList")
    sectionList.innerHTML = ''
    sectionOptions.innerHTML = ''
    Object.keys(taskGroup).forEach( key => {
        let wrapper = document.createElement("div")
        wrapper.classList.add("sectionList__section")
        wrapper.ondragover = function (event) {
            event.preventDefault()
        }
        wrapper.ondrop = function(event) {
            taskGroup[draggingElement.status] = taskGroup[draggingElement.status].filter( item => item.name !== draggingElement.name)
            draggingElement.status = key
            taskGroup[key].push(draggingElement)
            draggingElement = {}
            renderTasks()
        }
        let heading = document.createElement("h4")
        heading.classList.add("sectionList__section__heading")
        let option = document.createElement("option")
        option.innerHTML = key
        option.setAttribute("value", key)
        heading.innerHTML = key
        wrapper.appendChild(heading)
        if(taskGroup[key]){
            taskGroup[key].forEach(task => {
                let taskItem = document.createElement("div")
                taskItem.classList.add("sectionList__section__task")
                taskItem.setAttribute("draggable", "true");
                let taskHeading =  document.createElement("h5")
                taskHeading.innerText = task.name;
                let taskDesc =  document.createElement("p")
                taskDesc.innerText = task.desc
                let taskStatus = document.createElement("h5")
                taskDesc.innerText = task.status
                taskItem.appendChild(taskHeading)
                taskItem.appendChild(taskDesc)
                taskItem.appendChild(taskStatus)
                taskItem.ondragstart = function (event) {
                    draggingElement = task
                }
                wrapper.append(taskItem)
            })
        }
        sectionList.appendChild(wrapper)
        sectionOptions.appendChild(option)

    })
}