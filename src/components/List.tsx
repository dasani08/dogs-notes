import React from 'react'
import { withRouter } from 'react-router-dom'

const NOTES = [
  {
    id: 1,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 2,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 3,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 4,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 5,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 6,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 7,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 8,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 9,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 10,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 11,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
  {
    id: 12,
    title: 'PWA (Note taking)',
    body: "The note's body",
    tags: [],
  },
]

function ListNote(props: any) {
  const gotoDetail = (note: any) => () => {
    props.history.push(`/notes/${note.id}`)
  }

  return (
    <div className="notes">
      {NOTES.map((note) => (
        <div onClick={gotoDetail(note)} className="notes__item" key={note.id}>
          <h5 className="notes__title">{note.title}</h5>
          <p className="notes__body">{note.body}</p>
        </div>
      ))}
    </div>
  )
}

export default withRouter(ListNote)
