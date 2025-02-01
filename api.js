const host = 'https://wedev-api.sky.pro/api/v1/deimos'

export const fetchComments = () => {
  return fetch(host + '/comments')
    .then((res) => {
      return res.json()
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isliked: false,
        }
      })
      return appComments
    })
}

export const postComments = (name, text) => {
  return fetch(host + '/comments', {
    method: 'POST',
    body: JSON.stringify({ text, name }),
  }).then(async (response) => {
    console.log('Response status:', response.status)

    const data = await response.json().catch(() => null)
    console.log('Response data:', data)

    if (response.status === 500) {
      throw new Error('Ошибка сервера')
    }
    if (response.status === 400) {
      throw new Error('Неверный запрос')
    }
    if (response.status === 201) {
      return data
    }

    throw new Error('Неизвестная ошибка')
  })
}
