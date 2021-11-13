import { useFormik } from 'formik';
import { useState } from 'react';

function Formulario() {

  const [cadastros, setCadastros] = useState ([]);
  const [idAtual, setIdAtual] = useState(1);


  const validacao = values => {
    const erros = {};
    if (!values.primeiroNome) {
      erros.primeiroNome = 'Campo Obrigatório'
    }
    if (!values.segundoNome) {
      erros.segundoNome = 'Campo Obrigatório'
    }

    const regexEmail = /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;
    if (!values.email) {
      erros.email = 'Campo Obrigatório'
    } 
    else if (!regexEmail.test(values.email)) {
      erros.email ='Insira um email válido'
      console.log(!regexEmail.test(values.email))
    }
    
    
    if (!values.endereco) {
      erros.endereco = 'Campo Obrigatório'
    }
    if (!values.telefone) {
      erros.telefone = 'Campo Obrigatório'
    } else if (values.telefone.length !== 11) {
      erros.telefone = 'Digite um número válido'
    }
    return erros;
  }

  const formik = useFormik ({
    initialValues: {
      primeiroNome: '',
      segundoNome: '',
      email: '',
      endereco: '',
      telefone: ''
    },
    onSubmit: values => {
      let arrTemporario = [...cadastros];
      arrTemporario.push({id: idAtual, ...values});
      setIdAtual(idAtual + 1);
      setCadastros(arrTemporario);
      console.log(arrTemporario);
      formik.resetForm();
    },
    validate: validacao
  })


  function excluirCadastro(index) {
    let arrTemporario = [...cadastros]; // Clonei lista de cadastros completa
    arrTemporario.splice(index, 1);
    setCadastros(arrTemporario);
  }


  function printaCadastros() {
    return  (
      cadastros.map((cadastro, index) => {
        return (
          <div key={cadastro.id}>
            <p>Primeiro Nome: {cadastro.primeiroNome}</p>
            <p>Segundo Nome: {cadastro.segundoNome}</p>
            <p>Email: {cadastro.email}</p>
            <p>endereco: {cadastro.endereco}</p>
            <p>telefone: {cadastro.telefone}</p>
            <button onClick={()=> excluirCadastro(index)}>Excluir</button>
            {/* <button onClick={()=> excluirCadastro(index)}>Editar</button> */}
            <br />
            <br />
          </div>
        )
      })
    )
  }

  return(
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>
         <label htmlFor='primeiroNome'>Nome</label>
         <input type="text" name='primeiroNome' id='primeiroNome' onChange={formik.handleChange} value={formik.values.primeiroNome} placeholder='Primeiro Nome' />
         {formik.errors.primeiroNome ? <div>{formik.errors.primeiroNome}</div> : null}  
        </div>
        <div>
         <label htmlFor='segundoNome'>Sobrenome</label>
         <input type="text" name='segundoNome' id='segundoNome' onChange={formik.handleChange} value={formik.values.segundoNome}  placeholder='Segundo Nome' />
         {formik.errors.segundoNome ? <div>{formik.errors.segundoNome}</div> : null}  
        </div>
        <div>
         <label htmlFor='email'>Email</label>
         <input type="email" name='email' id='email' onChange={formik.handleChange} value={formik.values.email} placeholder='Digite Seu Email' />
         {formik.errors.email ? <div>{formik.errors.email}</div> : null}  
        </div>
        <div>
         <label htmlFor='endereco'>Endereço</label>
         <input type="text" name='endereco' id='endereco' onChange={formik.handleChange} value={formik.values.endereco} placeholder='Digite Seu Endereço' />
         {formik.errors.endereco ? <div>{formik.errors.endereco}</div> : null}  
        </div>
        <div>
         <label htmlFor='telefone'>Telefone</label>
         <input type="text" name='telefone' id='telefone' onChange={formik.handleChange} value={formik.values.telefone} placeholder='Digite Seu Telefone' />
         {formik.errors.telefone ? <div>{formik.errors.telefone}</div> : null}  
        </div>
        <div>
          <button type='submit'>Salvar</button>
          <button onClick={formik.resetForm}>Limpar</button>
        </div>
      </form>
      <div>
        {printaCadastros()}
      </div>
    </div>
  )
}

export default Formulario;
