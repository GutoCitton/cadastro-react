import { useFormik } from 'formik'

function Formulario() {

  const formik = useFormik ({
    initialValues: {
      primeiroNome: '',
      segundoNome: '',
      email: '',
      endereco: '',
      telefone: ''
    },
    onSubmit: values => {
      console.log(values)
    }
  })

  return(
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
         <label htmlFor='primeiroNome'>Nome</label>
         <input type="text" name='primeiroNome' id='primeiroNome' onChange={formik.handleChange} value={formik.values.primeiroNome} placeholder='Primeiro Nome' />
        </div>
        <div>
         <label htmlFor='segundoNome'>Sobrenome</label>
         <input type="text" name='segundoNome' id='segundoNome' onChange={formik.handleChange} value={formik.values.segundoNome}  placeholder='Segundo Nome' />
        </div>
        <div>
         <label htmlFor='email'>Email</label>
         <input type="email" name='email' id='email' onChange={formik.handleChange} value={formik.values.email} placeholder='Digite Seu Email' />
        </div>
        <div>
         <label htmlFor='endereco'>Endereço</label>
         <input type="text" name='endereco' id='endereco' onChange={formik.handleChange} value={formik.values.endereco} placeholder='Digite Seu Endereço' />
        </div>
        <div>
         <label htmlFor='telefone'>Telefone</label>
         <input type="text" name='telefone' id='telefone' onChange={formik.handleChange} value={formik.values.telefone} placeholder='Digite Seu Telefone' />
        </div>
        <div>
          <button type='submit'>Salvar</button>
          <button>Limpar</button>
        </div>
      </form>
    </div>
  )
}

export default Formulario;
