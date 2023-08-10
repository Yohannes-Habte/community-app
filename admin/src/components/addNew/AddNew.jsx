import React from 'react'
import "./AddNew.scss"

// handle submit
const handleSubmit = () => {}

const AddNew = (props) => {
  return (
    <div className="add">
    <section className="modal">
      <span onClick={() => props.setOpen(false)} className="close">
        X
      </span>
      <h3 className="title"> Add {props.slug} </h3>
      <form onSubmit={handleSubmit} action="" className="form">
        {props.colums
          // in order to take the field for the place holder, you need to filter first and then proceed with map method
          .filter(
            (item) =>
              item.field !== 'id' &&
              item.field !== 'img' &&
              item.field !== 'fullName'
          )
          .map((column) => {
            return (
              <div className="item">
                <label htmlFor="" className="input-label">
                  {column.headerName}
                </label>
                <input
                  type={column.type}
                  placeholder={column.field}
                  className="input-field"
                />
              </div>
            );
          })}
        <button className="add-btn">Send</button>
      </form>
    </section>
  </div>
  )
}

export default AddNew