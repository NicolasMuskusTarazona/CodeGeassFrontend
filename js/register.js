document.getElementById("registerForm").addEventListener("submit", async (e) => {

    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {

        const res = await fetch("https://codegeass.up.railway.app/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })

        const data = await res.json()

        if (!res.ok) {
            document.getElementById("message").innerText = data.detail || "Register error"
            return
        }

        document.getElementById("message").innerText = "Account created"

        window.location.href = "characters.html"

    } catch (error) {

        document.getElementById("message").innerText = "Server error"

    }

})