import { fetchAndRenderComments } from '../index.js'
import { login, setName, setToken } from './api.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
  const container = document.querySelector('.container')

  const loginHtml = `
    
		<section class="add-form">
    <h1>Форма входа</h1>
    <input
        type="text"
        class="add-form-name"
        placeholder="Введите логин"
        id="login"
        required
    />
    <input
        type="password"
        class="add-form-pass"
        placeholder="Введите пароль"
        id="password"
        required
    />
    <fieldset class="add-form-registry">
        <button class="add-form-button button-main" type="submit">
            Войти
        </button>
        <a href="#" class="add-form-button-link registry">
            Зарегистрироваться
        </a>
    </fieldset>
    </section>
		`
  container.innerHTML = loginHtml

  document.querySelector('.registry').addEventListener('click', () => {
    renderRegistration()
  })

  const loginEl = document.querySelector('#login')
  const passwordEl = document.querySelector('#password')
  const submitButton = document.querySelector('.button-main')

  submitButton.addEventListener('click', () => {
    login(loginEl.value, passwordEl.value)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setToken(data.user.token)
        setName(data.user.name)
        fetchAndRenderComments()
      })
  })
}
