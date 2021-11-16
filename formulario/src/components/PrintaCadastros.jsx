function PrintaCadastros({ cadastros, excluirCadastro, editarCadastro, MdDelete, BsPencilFill }) {
  return  (
    <table className='table-form'>
      <thead>
        <tr>
          {/* <th>ID</th> */}
          <th>Primeiro Nome</th>
          <th>Segundo Nome</th>
          <th>E-mail</th>
          <th>Endereço</th>
          <th>Telefone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {
          cadastros.map((e,i) => {
            return (
              <tr key={i}>
                {/* <td>{e.id}</td> */}
                <td>{e.primeiroNome}</td>
                <td>{e.segundoNome}</td>
                <td>{e.email}</td>
                <td>{e.endereco}</td>
                <td>{e.telefone}</td>
                <td>
                  <div className="btns-tabela">
                    <button onClick={()=> excluirCadastro(i)} className="btn-tabela"><MdDelete /></button>
                    <button onClick={()=> editarCadastro(e.id)} className="btn-tabela"><BsPencilFill /></button>
                  </div>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default PrintaCadastros;