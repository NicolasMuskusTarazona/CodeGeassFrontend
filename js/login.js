document.getElementById("loginForm").addEventListener("submit", async (e) => {

    e.preventDefault()

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    try {

        const res = await fetch("https://codegeass.up.railway.app/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })

        const data = await res.json()

        if (res.status === 401) {
            document.getElementById("message").innerText = "Unauthorized"
            return
        }

        if (res.status === 404) {
            document.getElementById("message").innerText = "User not found"
            return
        }

        if (!res.ok) {
            document.getElementById("message").innerText = data.detail || "Login error"
            return
        }

        window.location.href = "charactersAdmin.html"

        document.getElementById("message").innerText = "Login successful"

    } catch (error) {

        document.getElementById("message").innerText = "Server error"

    }

})