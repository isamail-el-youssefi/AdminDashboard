
import "./Add.scss"

export default function Add (props) {
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      //add new item
      // axios.post(`v1/${slug}`, {})
      // mutation.mutate();
      props.setOpen(false)
    };
    return (
      <div className="add">
        <div className="modal">
          <span className="close" onClick={() => props.setOpen(false)}>
            <h4>X</h4>
          </span>
          <h1>Add new {props.slug}</h1>
          <form onSubmit={handleSubmit}>
            {props.columns
              .filter((item) => item.field !== "id" && item.field !== "img")
              .map((column) => (
                <div className="item">
                  <label>{column.headerName}</label>
                  <input type={column.type} placeholder={column.field} />
                </div>
              ))}
            <button>Send</button>
          </form>
        </div>
      </div>
    );
  };