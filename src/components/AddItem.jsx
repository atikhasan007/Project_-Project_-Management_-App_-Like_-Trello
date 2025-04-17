import React from 'react'

const AddItem = ({listAddItem, setEditMode}) => {
  return (
    <div className={listAddItem ? 
        "add-item list-add-item" : 
        "add-item task-add-item"}
        
        onClick={()=>setEditMode(true)}
        >

      
       <p className='add-item-icon'>+</p>
       <p className='add-item-text'>
         {listAddItem ? 'Add a List' : 'Add a Task'}
       </p>
       
    </div>
  )
}

export default AddItem
