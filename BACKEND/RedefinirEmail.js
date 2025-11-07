
import { enviarEmailRedefinicao } from './src/services/emailService.js'

async function testar() {
    try {
        console.log('Enviando e-mail de teste...')
        
        const resultado = await enviarEmailRedefinicao(
            'ra50892392827@acaonsfatima.org.br', 
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