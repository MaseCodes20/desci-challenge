import { FormEvent, useState } from "react"
import { useMutation, useQueryClient } from "react-query"
import { createNote } from "../utils/mutation/createNote"
import { BasicIpfsData } from "../pages/api/ipfs"

type NoteFormProps = {
  notes: BasicIpfsData[]
  addNote: (val: BasicIpfsData) => void
}

function NoteForm({ notes, addNote }: NoteFormProps) {
  const [note, setNote] = useState({ note: "" })

  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(createNote, {
    // onSuccess: () => queryClient.invalidateQueries("notes"),
  })

  const submiteNote = async (e: FormEvent) => {
    e.preventDefault()
    let inputValue = note.note

    // if input field is empty immediately return from function
    if (!inputValue || notes.find(note => note.content === inputValue)) return

    const { data: noteData } = await mutateAsync(note)

    if (noteData) {
      addNote(noteData)
    }
  }
  return (
    <form onSubmit={submiteNote} className="flex gap-3 p-3 bg-slate-300 drop-shadow-md rounded-md w-fit">
      <div className="flex flex-col">
        <label htmlFor="note" className="mb-2">
          Note
        </label>
        <input
          type="text"
          name="note"
          id="note"
          value={note.note}
          onChange={e => setNote({ note: e.target.value })}
          className="h-[30px] bg-white w-full rounded-full border-[1px] border-gray-500 pl-5  hover:border-black focus:border-b focus:border-black focus:outline-none focus:ring-0 lg:w-[500px]"
        />
      </div>

      <button type="submit" className="bg-white hover:bg-slate-500 hover:text-white font-semibold p-3 rounded-md" disabled={isLoading}>
        {isLoading ? "Posting" : "Submit"}
      </button>
    </form>
  )
}

export default NoteForm
