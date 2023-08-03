import axios from "axios"

export const fetchData = (cid: string) => {
  return axios.get(`/api/ipfs?cid=${cid}`)
}
