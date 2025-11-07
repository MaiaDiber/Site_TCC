// teste-email.js (com import)
import { enviarEmailRedefinicao } from './src/services/emailService.js'

async function testar() {
    try {
        console.log('Enviando e-mail de teste...')
        
        const resultado = await enviarEmailRedefinicao(
            'guilhermemaiadibernardi@gmail.com', // SEU E-MAIL AQUI
            'teste-token-123456'
        )
        
        if (resultado.success) {
            console.log('✅ E-mail enviado com sucesso!')
        } else {
            console.log('❌ Erro:', resultado.error)
        }
    } catch (error) {
        console.log('❌ Erro fatal:', error.message)
    }
}

testar()