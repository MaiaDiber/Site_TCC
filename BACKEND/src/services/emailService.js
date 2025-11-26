
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'viasaudetcc@gmail.com', 
         pass: 'hzak pclz mgoq ffxv'       
    }
})

const enviarEmailRedefinicao = async (emailDestino, token) => {
    try {
       const resetURL = `http://localhost:5173/RedefinirSenha/${token}`

        const mailOptions = {
            from: '"TCC Via Saúde" <viasaudetcc@gmail.com>',
            to: emailDestino,
            subject: 'Redefinição de Senha - Via Saúde',
            html: `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinição de Senha - Via Saúde</title>
  </head>
  <body style="margin:0; padding:0; background:#f4f4f4; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
    <div style="width: 100%; padding: 30px 0;">
      <div style="background: #1c7e5dff; color: white; padding: 20px; text-align: center;">
        <img src="cid:logoTCC" height="130" alt="Logo Via Saúde">
        <p style="font-size: 16px; margin: 0;">Sistema Inteligente de Saúde - Zona Sul SP</p>
      </div>

      <div style="max-width: 600px; background: white; margin: 0 auto; padding: 30px; border-radius: 8px;">
        <h2 style="color: #007bff;">Redefinição de Senha</h2>
        <p>Olá,</p>
        <p>Você solicitou a redefinição de senha para sua conta no <strong>Via Saúde</strong>.</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetURL}" 
             style="background: #339e7eff; color: white; padding: 15px 30px;
                    text-decoration: none; border-radius: 5px; 
                    display: inline-block; font-weight: bold;">
            Redefinir Minha Senha
          </a>
        </div>

        <p>Se você não solicitou esta alteração, ignore este e-mail.</p>
        <p><strong>Este link expira em 1 hora.</strong></p>
      </div>

      <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
        <p>Via Saúde - Zona Sul de São Paulo</p>
        <p>Trabalho de Conclusão de Curso</p>
      </div>
    </div>
  </body>
  </html>
`,
            attachments: [
                {
                    filename: 'a.png',          
                    path: './src/image/a.png',     
                    cid: 'logoTCC'                 
                }
            ]
        }

        await transporter.sendMail(mailOptions)
        console.log(`E-mail enviado com sucesso para: ${emailDestino}`)
        return { success: true }
        
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error)
        return { success: false, error: error.message }
    }
}

export { transporter }
export { enviarEmailRedefinicao }
