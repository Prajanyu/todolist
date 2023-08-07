import { useState, useEffect } from "react";

function App() {
  const [list, setList] = useState([]);
  const [item, setItem] = useState();

  const API_BASE = "http://localhost:3001"

  const getList = () => {
    fetch(API_BASE + "/todo")
      .then(res => res.json())
      .then(data => setList(data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    getList();
  }, []);

  const newItem = (event) => {
    setItem(event.target.value);
  }

  const addItem = async event => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "post",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        content: item
      })
    }).then(res => res.json());

    setList([...list, data]);
    setItem("");

    event.preventDefault();
  }

  const completeItem = async id => {
    const data = await fetch(API_BASE + "/todo/update/" + id, { method: "put" })
      .then(res => res.json());

    setList(list => list.map((item) => {
      if (item._id === data._id) {
        item.isComplete = data.isComplete;
      }

      return item;

    }));
  }

  const deleteItem = async(id) => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, {
      method: "delete"
    }).then(res => res.json());

    setList(list => list.filter(item => item._id !== data._id));

  }


  return (
    <div className="App">
      <h1 className="greeting"> Welcome, Prajanyu </h1>
      <h2 className="title"> Todo List </h2>
      {
        list.map((data) => (
          <div className="item-container" key={data._id}>
            <h4 onClick={() => (completeItem(data._id))} className={(data.isComplete && "complete")}>{data.content}</h4>
            <button onClick={() => deleteItem(data._id)}>X</button>
          </div>
        ))
      }
      <div class="form-container">
      <input autoComplete="off" onChange={newItem} type="text" name="item" value={item} className="add-text" placeholder="Add Item" />
      <button onClick={addItem} type="submit" className="add-btn">+</button>
      </div>
      
    </div>
  );
}

export default App;
