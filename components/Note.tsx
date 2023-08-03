type NoteProps = {
  content: string
  cid: string
}

function Note({ content, cid }: NoteProps) {
  return (
    <div className="bg-slate-300 w-[380px] h-[200px] p-3 rounded-md drop-shadow-md">
      <h3 className="text-center font-semibold">Note</h3>
      <p className="text-xs text-center text-slate-600 mb-3">CID: {cid}</p>
      <p className="h-[120px] overflow-auto bg-white rounded-md p-2">{content}</p>
    </div>
  )
}

export default Note
