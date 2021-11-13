import { useFormik } from 'formik';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md'
import { BsPencilFill } from 'react-icons/bs'
import './Formulario.modules.css'

function Formulario() {

  const [cadastros, setCadastros] = useState ([]);
  const [idAtual, setIdAtual] = useState(1);
  const [primeiroNome, setPrimeiroNome] = useState('');
  const [segundoNome, setSegundoNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');


  const validacao = values => {
    const erros = {};
    if (!values.primeiroNome) {
      erros.primeiroNome = 'Campo Obrigatório'
    }
    if (!values.segundoNome) {
      erros.segundoNome = 'Campo Obrigatório'
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
      primeiroNome: primeiroNome,
      segundoNome: segundoNome,
      email: email,
      endereco: endereco,
      telefone: telefone
    },
    onSubmit: values => {
      let arrTemporario = [...cadastros];
      arrTemporario.push({id: idAtual, ...values});
      setIdAtual(idAtual + 1);
      setCadastros(arrTemporario);
      let [arraydestruction] = arrTemporario
      let arrayjson = JSON.stringify(arraydestruction)
      console.log(arrayjson)
      sessionStorage.setItem(`${idAtual}`, arrayjson)
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

  function editarCadastro() {
    let editar = sessionStorage.getItem('1')
    let editarObjeto = JSON.parse(editar)
    setPrimeiroNome(editarObjeto.primeiroNome)
    setSegundoNome(editarObjeto.segundoNome)
    setEmail(editarObjeto.email)
    setEndereco(editarObjeto.endereco)
    setTelefone(editarObjeto.telefone)
    console.log(editarObjeto.primeiroNome)
  }


  function printaCadastros() {
    return  (
      cadastros.map((cadastro, index) => {
        return (
          <>
            <div key={cadastro.id} className='tbody'>
                <div className='tr'>
                    <div className='tb primeiro'>{cadastro.primeiroNome}</div>
                    <div className='tb segundo'>{cadastro.segundoNome}</div>
                    <div className='tb email'>{cadastro.email}</div>
                    <div className='tb end'>{cadastro.endereco}</div>
                    <div className='tb tel'>{cadastro.telefone}</div>
                    
                      <div className="btns-tabela">
                        <button onClick={()=> excluirCadastro(index)} className="btn-tabela"><MdDelete /></button>
                        <button onClick={()=> editarCadastro(index)} className="btn-tabela"><BsPencilFill /></button>
                      </div>
                </div>
            </div>
          </>
        )
      })
    )
  }

  return(
    <div className="conteudo">
      <form onSubmit={formik.handleSubmit}>
        <div className="cadastro">
          <p>Cadastro</p>
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
          <button type='submit'>Cadastrar</button>
          <button onClick={formik.resetForm}>Limpar</button>
        </div>
      </form>
      <div className="tabela">
      <div className='table'>
            <div className ="thead">
                <div className = "th">
                    <div className= 'td primeiro'>Primeiro Nome:</div>
                    <div className= 'td segundo'>Segundo Nome:</div>
                    <div className= 'td email'>E-mail:</div>
                    <div className= 'td end'>Endereço:</div>
                    <div className= 'td tel'>Telefone:</div>
                    <div></div>
                </div>
            </div>
            {printaCadastros()}
        </div>
        
      </div>
    </div>
  )
}

export default Formulario;