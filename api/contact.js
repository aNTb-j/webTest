import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

console.log("Resend API Key:", process.env.RESEND_API_KEY); // Log the API key to verify it's being read correctly

export default async function handler(req, res) {

    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method Not Allowed"
        });
    }
    console.log("Request body:", req.body); // Log the request body to verify the data being sent
    try {

        const {
            name,
            surname,
            company,
            cuit,
            email,
            phone,
            description
        } = req.body;

        await resend.emails.send({

            from: "Formulario <onboarding@resend.dev>",

            to: "tu_mail@gmail.com",

            subject: "Nuevo contacto",

            html: `
                <h2>Nuevo contacto</h2>

                <p><b>Nombre:</b> ${name}</p>
                <p><b>Apellido:</b> ${surname}</p>
                <p><b>Empresa:</b> ${company}</p>
                <p><b>CUIT:</b> ${cuit}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Teléfono:</b> ${phone}</p>

                <hr>

                <p>${description}</p>
            `
        });

        return res.status(200).json({
            success: true
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false
        });

    }

}