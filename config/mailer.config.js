const nodemailer = require('nodemailer');

const APP_HOST = process.env.APP_HOST || 'http://localhost:3000';

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
}); 

module.exports.sendValidateEmail = (targetUser) => {
    transporter.sendMail({
        from: 'Remoxion',
        to: targetUser.email,
        subject: 'Bienvenido a Remoxion!',
        html: `
        <h1>Bienvenido a Remoxion</h1>
        <p> Por favor, para terminar de validar el resgistro de tu empresa en nuestra en plataforma,
        es necesario que valides tu email: 
        <a href='${APP_HOST}/company/${targetUser.validateToken}/validate'>Valida tu cuenta</a>
        `
    })
        .then(info => console.log(info))
        .catch(error => console.log(error))
}