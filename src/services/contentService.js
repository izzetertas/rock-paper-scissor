import axios from 'axios'

const getPlayers = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://gist.githubusercontent.com/ldabiralai/cf1588cd80fed41661adecb2e3ca9704/raw/8df6831c33c1b0c178a533e8953a61d11434f220/headtohead.json')
      .then(response => resolve(response.data.players))
      .catch(error => reject(error.message))
  })
}

export default {
  getPlayers
}
