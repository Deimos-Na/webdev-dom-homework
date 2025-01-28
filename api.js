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
