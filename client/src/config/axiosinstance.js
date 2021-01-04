import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://fancytodorud.herokuapp.com'
  // baseURL: 'http://localhost:3001'
})

export default instance
