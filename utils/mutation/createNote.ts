import axios from "axios"

export const createNote = (note: { note: string }) => {
  return axios.post("/api/ipfs", note)
}
