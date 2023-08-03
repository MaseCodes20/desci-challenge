import Head from "next/head"
import { Inter } from "@next/font/google"
import { useState } from "react"
import { BasicIpfsData } from "./api/ipfs"
import NoteForm from "../components/NoteForm"
import RetriveNote from "../components/RetriveNote"
import Notes from "../components/Notes"
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [notes, setNotes] = useState<BasicIpfsData[]>([])

  const addNote = (noteData: BasicIpfsData) => {
    const { cid } = noteData

    if (!notes.find(note => note.cid === cid)) {
      const updatedNotes = [...notes, noteData]
      setNotes(updatedNotes)
    }
  }

  return (
    <>
      <Head>
        <title>IPFS Notes</title>
        <meta name="description" content="IPFS Notes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col gap-3">
          <div className="text-3xl font-bold underline">IPFS Notes</div>

          <RetriveNote addNote={addNote} />

          <NoteForm addNote={addNote} notes={notes} />

          <Notes notes={notes} />
        </div>
      </main>
    </>
  )
}
