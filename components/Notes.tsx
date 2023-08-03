import { BasicIpfsData } from "../pages/api/ipfs"
import Note from "./Note"

type NotesProps = {
  notes: BasicIpfsData[]
}

function Notes({ notes }: NotesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {notes.map(note => (
        <Note key={note.cid} {...note} />
      ))}
    </div>
  )
}

export default Notes
