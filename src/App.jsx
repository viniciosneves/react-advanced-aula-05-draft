import Container from './components/Container'
import GlobalStyles from './components/GlobalStyles'
import Heading from './components/Heading'
import Fieldset from './components/Fieldset'
import Label from './components/Label'
import Input from './components/Input'
import Button from './components/Button'
import Form from './components/Form'
import { ErrorMessage, Formik } from 'formik'

import * as Yup from 'yup'
import ErrorText from './components/ErrorText'
import axios from 'axios'


const validationSchema = Yup.object({
  name: Yup.string()
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('Por favor, informe um e-mail válido')
    .required('Por favor, informe o seu email'),
  password: Yup.string()
    .min(8, 'A senha deve possuir pelo menos 8 caracteres')
    .required(),
  confirmPassword: Yup.string().
    oneOf([Yup.ref('password')], 'As senhas devem ser iguais!')
    .required('Confirme sua senha!')
})

function App() {

  const createUser = (values, { resetForm }) => {
    const user = values
    delete user.confirmPassword
    axios.post('http://localhost:3000/users', user)
      .then(() => {
        alert('Usuário cadastrado com sucesso')
        resetForm()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <>
      <GlobalStyles />
      <Container>
        <Heading>
          Cadastro
        </Heading>
        <Formik
          onSubmit={createUser}
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
          }}
          validationSchema={validationSchema}
        >
          <Form>
            <Fieldset>
              <Label>
                Nome
              </Label>
              <Input name="name"/>
              <ErrorMessage name='name' component={ErrorText} />
            </Fieldset>
            <Fieldset>
              <Label>
                E-mail
              </Label>
              <Input name="email" type="email" />
              <ErrorMessage name='email' component={ErrorText} />
            </Fieldset>
            <Fieldset>
              <Label>
                Senha
              </Label>
              <Input name="password" type="password"/>
              <ErrorMessage name='password' component={ErrorText} />
            </Fieldset>
            <Fieldset>
              <Label>
                Confirme sua senha
              </Label>
              <Input name="confirmPassword" type="password"/>
              <ErrorMessage name='confirmPassword' component={ErrorText} />
            </Fieldset>
            <Button type='submit'>
              Enviar
            </Button>
          </Form>
        </Formik>
      </Container>
    </>
  )
}

export default App
