import { importarMedicamentosCSV } from './importarMedicamentos.js';

async function importarAutomatico() {
  try {
    console.log('🎯 INICIANDO IMPORTAÇÃO AUTOMÁTICA...');
    const resultado = await importarMedicamentosCSV('DADOS_ABERTOS_MEDICAMENTOS.csv');
    console.log('✅ IMPORTAÇÃO CONCLUÍDA!');
    console.log(JSON.stringify(resultado, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('❌ ERRO NA IMPORTAÇÃO:', error);
    process.exit(1);
  }
}

importarAutomatico();
