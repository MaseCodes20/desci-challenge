import React, { FormEvent, useEffect, useState } from "react"
import { fetchData } from "../utils/query/fetchData"
import { classNames } from "../utils/classNamesFN"
import { BasicIpfsData } from "../pages/api/ipfs"

type RetrieveNoteProps = {
  addNote: (val: BasicIpfsData) => void
}

function RetriveNote({ addNote }: RetrieveNoteProps) {
  const [loading, setLoading] = useState(false)
  const [txt, setTxt] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const submitCID = async (e: FormEvent) => {
    e.preventDefault()
    if (!txt || loading) return
    setLoading(true)

    try {
      const { data } = await fetchData(txt)
      addNote(data)
    } catch (error) {
      setErrorMessage("We have encontered a problem, Try again in a couple minutes")
      setIsError(true)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (isError) {
      alert(errorMessage)
    }
  }, [isError, errorMessage])

  return (
    <form onSubmit={submitCID} className="flex items-center w-fit bg-slate-300 p-3 gap-3 drop-shadow-md rounded-md">
      <label htmlFor="cid" className="hidden">
        CID
      </label>
      <input
        type="text"
        name="cid"
        id="cid"
        value={txt}
        onChange={e => setTxt(e.target.value)}
        className="h-[30px] w-full rounded-full border-[1px] border-gray-500 pl-5  hover:border-black focus:border-b focus:border-black focus:outline-none focus:ring-0 lg:w-[460px]"
      />
      <button
        type="submit"
        disabled={loading}
        className={classNames(
          "bg-white hover:bg-slate-500 font-semibold hover:text-white text-black rounded-md p-2 drop-shadow-md w-32",
          loading ? "animate-pulse" : ""
        )}
      >
        {loading ? "Loading..." : "Retrieve Data"}
      </button>
    </form>
  )
}

export default RetriveNote
