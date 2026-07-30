const form = document.querySelector("#contact-form");
const submitButton = document.querySelector("#application-button");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
        name: form.name.value.trim(),
        surname: form.surname.value.trim(),
        company: form.company.value.trim(),
        cuit: form.cuit.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        description: form.description.value.trim()
    };

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";

    try {
        const response = await fetch("/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        console.log("Response from server:", response);
        if (!response.ok) {
            throw new Error("No se pudo enviar el formulario.");
        }

        alert("¡Gracias! Tu solicitud fue enviada correctamente.");

        form.reset();

    } catch (error) {
        console.error(error);
        alert("Ocurrió un error al enviar el formulario. Intentá nuevamente.");
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Enviar";
    }
});