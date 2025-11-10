import Cabeçalho from '../../components/Index/cabecalho'
import Rodape from '../../components/Index/rodape'
import './Perfil.scss'

export default function Perfil() {
    return (
        <>
        <Cabeçalho/>
        <section class="profile-tab" role="region" aria-label="Perfil do usuário">
<div class="profile-card">
<div class="profile-avatar">
<div class="avatar-fallback">FT</div>
</div>


<div class="profile-info">
<h2 class="profile-name">Carlos Oliver (Exemplo)</h2>
<p>CPF</p>
<p>123.456.789-10</p>
</div>


<div class="profile-actions">
<button className='btn-edit'>Editar</button>
<button className='bnt-exit'>Sair</button>
    

</div>
</div>




<div class="detail">
<h3>Sobre</h3>
<div className='details'>    
    <div className='tel'>
<h5>Tel</h5>
<p>(11)99999-9999</p>
</div>
<div className='data'>
<h5>Data de nascimento</h5>
<p>01/01/2001</p>
</div>
<div className='email'>
<h5>Email</h5>
<p>Carlos@gmail.com</p>
</div>
<div className='cep'>
<h5>Cep</h5>
<p>00000-000</p>
</div>
</div>
</div>
</section>

        
<Rodape/>        
        
        </>
    );

}
    