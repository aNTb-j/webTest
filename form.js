const form = document.querySelector("#contact-form");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };

    await fetch("https://tu-api.com/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

});