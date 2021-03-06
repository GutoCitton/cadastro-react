import { useFormik } from 'formik';
import { useState } from 'react';
import './Formulario.modules.css'
import PrintaCadastros from './PrintaCadastros';
import { MdDelete } from 'react-icons/md'
import { BsPencilFill } from 'react-icons/bs'

function Formulario() {

  const [cadastros, setCadastros] = useState ([]);
  const [idAtual, setIdAtual] = useState(1);

  const validacao = values => {
    const erros = {};
    const regexNome = /^([a-zA-Zà-úÀ-Ú]|\s+)+$/;
    if (!values.primeiroNome) {
      erros.primeiroNome = 'Campo Obrigatório'
    } else if (!regexNome.test(values.primeiroNome)) {
      erros.primeiroNome = 'Por favor digite somente letras'
    }
    if (!values.segundoNome) {
      erros.segundoNome = 'Campo Obrigatório'
    } else if (!regexNome.test(values.segundoNome)) {
      erros.segundoNome = 'Por favor digite somente letras'
    }

    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.([a-z]+)?$/i;
    if (!values.email) {
      erros.email = 'Campo Obrigatório'
    } else if (!regexEmail.test(values.email)) {
      
      erros.email ='Insira um email válido'
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
      id: '',
      primeiroNome: '',
      segundoNome: '',
      email: '',
      endereco: '',
      telefone: ''
    },
    initialErrors: {
      primeiroNome: '',
      segundoNome: '',
      email: '',
      endereco: '',
      telefone: ''
    },
    onSubmit: values => {
      
      if(values.id) {

        const users= cadastros.map(e => {
          if(e.id === values.id) {
            return values
          } else {
            return e
          }
        })

        setCadastros(users);
        formik.resetForm()
      }else {

        values.id = idAtual

        setCadastros(cadastros.concat(values));
        setIdAtual(idAtual + 1);
        formik.resetForm()
      }
      
    },
    validate: validacao
  })


  function excluirCadastro(index) {
    let arrTemporario = [...cadastros]; // Clonei lista de cadastros completa
    arrTemporario.splice(index, 1);
    setCadastros(arrTemporario);
  }

  function editarCadastro(id) {
    const user = cadastros.find(e => e.id === id)

    formik.setFieldValue('id', id)
    formik.setFieldValue('primeiroNome', user.primeiroNome)
    formik.setFieldValue('segundoNome', user.segundoNome)
    formik.setFieldValue('email', user.email)
    formik.setFieldValue('endereco', user.endereco)
    formik.setFieldValue('telefone', user.telefone)
    formik.setFieldError(formik.initialErrors)
  }

  <PrintaCadastros />

  return(
    <div className="conteudo">
      <form onSubmit={formik.handleSubmit}>
        <div className="cadastro">
          <p>{formik.values.id !== '' ? 'Editar' : 'Cadastro'}</p>
        </div>
        <div className="container-input">
        <label htmlFor='primeiroNome'>Nome*</label>
        <input type="text" name='primeiroNome' id='primeiroNome' onChange={formik.handleChange} value={formik.values.primeiroNome} placeholder='Primeiro Nome' />
        {formik.errors.primeiroNome ? <div className="error-color">{formik.errors.primeiroNome}</div> : null}  
        </div>
        <div className="container-input">
        <label htmlFor='segundoNome'>Sobrenome*</label>
        <input type="text" name='segundoNome' id='segundoNome' onChange={formik.handleChange} value={formik.values.segundoNome}  placeholder='Segundo Nome' />
        {formik.errors.segundoNome ? <div className="error-color">{formik.errors.segundoNome}</div> : null}  
        </div>
        <div className="container-input">
        <label htmlFor='email'>Email*</label>
        <input type="email" name='email' id='email' onChange={formik.handleChange} value={formik.values.email} placeholder='Digite Seu Email' />
        {formik.errors.email ? <div className="error-color">{formik.errors.email}</div> : null}  
        </div>
        <div className="container-input">
        <label htmlFor='endereco'>Endereço*</label>
        <input type="text" name='endereco' id='endereco' onChange={formik.handleChange} value={formik.values.endereco} placeholder='Digite Seu Endereço' />
        {formik.errors.endereco ? <div className="error-color">{formik.errors.endereco}</div> : null}  
        </div>
        <div className="container-input">
        <label htmlFor='telefone'>Telefone*</label>
        <input type="text" name='telefone' id='telefone' onChange={formik.handleChange} value={formik.values.telefone} placeholder='Digite Seu Telefone' />
        {formik.errors.telefone ? <div className="error-color">{formik.errors.telefone}</div> : null}  
        </div>
        <div className="buttons">
          <button type='submit'>{formik.values.id !== '' ? 'Salvar' : 'Cadastrar'}</button>
          <button onClick={formik.resetForm}>Limpar</button>
        </div>
      </form>
      <div className="tabela">
      <PrintaCadastros cadastros={cadastros} excluirCadastro={excluirCadastro} editarCadastro={editarCadastro} MdDelete={MdDelete} BsPencilFill={BsPencilFill}/>
      </div>
    </div>
  )
}

export default Formulario;