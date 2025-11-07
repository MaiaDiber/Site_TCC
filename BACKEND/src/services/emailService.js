
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
        const resetURL = `http://localhost:6045/reset-password/${token}`

        
        const mailOptions = {
            from: '"TCC Via Saúde" <viasaudetcc@gmail.com>',
            to: emailDestino,
            subject: 'Redefinição de Senha - Via Saúde',
            html: `
                 <div style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif ; width: 600px; height: 200px;margin: 0 auto;">
                    <div style="background: #1c7e5dff; color: white; padding: 20px; text-align: center;">
                        <img src="cid:logoTCC" height="130px" alt="">
                        <p style="font-size: 16px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Sistema Inteligente de Saúde - Zona Sul SP</p>
                    </div>
                    
                    <div style="padding: 30px;">
                        <h2  style="color: #007bff; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; ">Redefinição de Senha</h2>
                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;" >Olá,</p>
                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;" >Você solicitou a redefinição de senha para sua conta no Via Saúde.</p>
                        
                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${resetURL}" 
                               style="background: #339e7eff; color: white; padding: 15px 30px;
                                      text-decoration: none; border-radius: 5px; 
                                      display: inline-block; font-weight: bold; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; ">
                                Redefinir Minha Senha
                            </a>
                        </div>
                        
                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;" >Se você não solicitou esta alteração, ignore este e-mail.</p>
                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;" ><strong>Este link expira em 1 hora.</strong></p>
                    </div>
                    
                    <div style="background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666;">
                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;" >Via Saúde - Zona Sul de São Paulo</p>
                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;" >Trabalho de Conclusão de Curso</p>
                    </div>
                </div>
            `,

            attachments: [
                {
                    filename: 'a.png',          // nome do arquivo
                    path: './src/image/a.png',     // caminho da imagem no servidor
                    cid: 'logoTCC'                 // o mesmo cid usado no HTML
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

export  { enviarEmailRedefinicao }