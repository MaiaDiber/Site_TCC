import conexao from "./connection.js";



export async function Repository () {
    const comando = "select * from perfil"


    let [registro] = await conexao.query(comando)
    return registro
}