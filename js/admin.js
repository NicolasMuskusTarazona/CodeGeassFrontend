const container = document.getElementById("characters")
const token = localStorage.getItem("token")
const role = localStorage.getItem("role")


//  PROTECCION URL
if (!token || role !== "admin") {
    window.location.href = "login.html"
}

// mostrar/ocultar formulario
function toggleForm() {
    const form = document.getElementById("formContainer")
    form.style.display = form.style.display === "none" ? "block" : "none"
}

// cargar personajes
async function loadCharacters() {
    try {
        const res = await fetch("https://codegeass.up.railway.app/characters", {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        const data = await res.json()

        container.innerHTML = ""

        data.forEach(character => {
            const card = document.createElement("div")
            card.classList.add("card")

            card.innerHTML = `
                <img src="${character.image}">
                <h2>${character.name}</h2>
                <p>ID: ${character.id}</p>
                <p>Geass: ${character.geass}</p>
                <p>Affiliation: ${character.affiliation}</p>
            `

            container.appendChild(card)
        })

    } catch (error) {
        console.error(error)
    }
}

loadCharacters()

// crear personaje
document.getElementById("characterForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const name = document.getElementById("name").value
    const geass = document.getElementById("geass").value
    const affiliation = document.getElementById("affiliation").value
    const image = document.getElementById("image").value

    try {
        const res = await fetch("https://codegeass.up.railway.app/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ name, geass, affiliation, image })
        })

        if (!res.ok) {
            document.getElementById("message").innerText = "Error creating character"
            return
        }

        document.getElementById("message").innerText = "Character created"
        loadCharacters()

    } catch (error) {
        document.getElementById("message").innerText = "Server error"
    }
})

// buscar por ID
async function getCharacterById() {
    const id = document.getElementById("characterId").value

    if (!id) {
        container.innerHTML = "<p>Enter an id</p>"
        return
    }

    try {
        const res = await fetch(`https://codegeass.up.railway.app/characters/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        const character = await res.json()

        if (!res.ok) {
            container.innerHTML = "<p>Character not found</p>"
            return
        }

        container.innerHTML = ""

        const card = document.createElement("div")
        card.classList.add("card")

        card.innerHTML = `
            <img src="${character.image}">
            <h3>${character.name}</h3>
            <p>Geass: ${character.geass}</p>
            <p>Affiliation: ${character.affiliation}</p>
        `

        container.appendChild(card)

    } catch (error) {
        container.innerHTML = "<p>Enter the ID correctly</p>"
    }
}

// toggle edit
function toggleEditForm() {
    const form = document.getElementById("editFormContainer")
    form.style.display = form.style.display === "none" ? "block" : "none"
}

// editar personaje
document.getElementById("editCharacterForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const id = document.getElementById("editId").value
    const name = document.getElementById("editName").value
    const geass = document.getElementById("editGeass").value
    const affiliation = document.getElementById("editAffiliation").value
    const image = document.getElementById("editImage").value

    const updateData = {}

    if (name) updateData.name = name
    if (geass) updateData.geass = geass
    if (affiliation) updateData.affiliation = affiliation
    if (image) updateData.image = image

    try {
        const res = await fetch(`https://codegeass.up.railway.app/characters/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(updateData)
        })

        if (!res.ok) {
            document.getElementById("editMessage").innerText = "Error updating character"
            return
        }

        document.getElementById("editMessage").innerText = "Character updated"
        loadCharacters()

    } catch (error) {
        document.getElementById("editMessage").innerText = "Server error"
    }
})

// toggle delete
function toggleDeleteForm() {
    const form = document.getElementById("deleteFormContainer")
    form.style.display = form.style.display === "none" ? "block" : "none"
}

// delete character
async function deleteCharacter() {
    const id = document.getElementById("deleteId").value.trim()
    const message = document.getElementById("deleteMessage")
    message.innerText = ""

    if (!id) {
        message.innerText = "Please enter a character ID"
        return
    }

    if (!token) {
        message.innerText = "You must be logged in"
        return
    }

    try {
        const res = await fetch(`https://codegeass.up.railway.app/characters/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        if (!res.ok) {
            const errorData = await res.json()
            message.innerText = errorData.detail || "Error deleting character"
            return
        }

        message.innerText = "Character deleted"
        document.getElementById("deleteId").value = ""


        loadCharacters()

    } catch (error) {
        console.error(error)
        message.innerText = "Server error"
    }
}
