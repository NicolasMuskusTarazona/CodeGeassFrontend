document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()

    document.getElementById("message").innerText = ""

    try {
        const res = await fetch("https://codegeass.up.railway.app/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()

        if (!res.ok) {
            document.getElementById("message").innerText = "Email o contraseña incorrectos"
            return
        }

        // guardar token
        localStorage.setItem("token", data.access_token)

        // extraer payload del JWT
        const payload = JSON.parse(atob(data.access_token.split(".")[1]))

        // guardar role 
        localStorage.setItem("role", payload.role)

        // redirigir segun rol
        if (payload.role === "admin") {
            window.location.href = "admin.html"
        } else {
            window.location.href = "characters.html"
        }

    } catch (error) {
        document.getElementById("message").innerText = "Error del servidor intenta mas tarde"
        console.error(error)
    }
})