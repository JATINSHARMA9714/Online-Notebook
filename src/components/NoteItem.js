import React from 'react'

export default function NoteItem(props) {
  const { element } = props
  return (
    <div className='col-md-3'>
      <div class="card" style={{width: "18rem"}}>
        <div class="card-body">
          <h5 class="card-title">{element.title}</h5>
          <p class="card-text">{element.description}</p>
        </div>
      </div>
    </div>
  )
}
