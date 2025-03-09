import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { renderComments } from './modules/renderComments.js'

export const fetchAndRenderComments = (isFirstLoading) => {
  if (isFirstLoading) {
    document.querySelector('.container').innerHTML =
      `<p>Пожалуйста, подождите, загрузка комментариев...</p>`
  }
  fetchComments().then((data) => {
    updateComments(data)
    renderComments()
  })
}

fetchAndRenderComments(true)
