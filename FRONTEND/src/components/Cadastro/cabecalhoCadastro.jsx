import './cabecalhoCadastro.scss'

export default function CabecalhoCadastro() {
    return (
        <>
        <section className='Container-cadastro'>
             <img className='logosite' src="/assets/Images/logo_ViaSaúde.png" height={150} alt="" />

             <div className="aviso">
                <img src="/assets/Images/ChatGPT_Image_22_de_out._de_2025__23_34_59-removebg-preview.png" alt="" height={30} />

                <p><strong>Atenção: </strong>Este é apenas um pré-cadastro. Você ainda precisará comparecer à unidade de <br />
                 saúde com seus documentos originais (RG, CPF e comprovante de residência) para finalizar <br />
                  o cadastro e receber o Cartão SUS.</p>
             </div>
        </section>
        </>
    )
}