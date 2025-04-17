import React from 'react'
import '../App.css'
const AddItemForm = ({
    listForm,
    submitHandler,
    title,
    onChangeHandler,
    setEditMode,

}) => {
  return (
    <div className='form-container'>
        <div className='form-card'>
            <textarea 
            value={title}
            onChange={onChangeHandler}
            cols="30"
            row = "2"
            className='form-textarea'
            
            >

            </textarea>

        </div>

        <div className='button-container'>
            <button className='add-button' onClick={submitHandler}>
                {listForm ? "Add List" : "Add/Update Task"}

            </button>
            <p className='add-item-icon' onClick={()=>setEditMode(false)}>x</p>

        </div>
      
    </div>
  )
}

export default AddItemForm
