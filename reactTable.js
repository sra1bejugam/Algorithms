import './App.css';
const data=[{
    "name":"sravan",
    "description":"sravan"
},{
    "name":"sravan",
    "description":"sravan"
}]
function App(){
    <div className="App">
    <Table>
        <tr>
            <th>Name</th>
            <th>Description</th>
        </tr>
     {data.map((val,key)=>{
         return (
             <tr key={key}>
                 <td>{val.name}</td>
                 <td>{val.description}</td>
             </tr>
         )
     })}
    </Table>
    </div>
}
export default Table;

//CSS
// .App {
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//   }
    
//   table {
//     border: 2px solid forestgreen;
//     width: 800px;
//     height: 200px;
//   }
    
//   th {
//     border-bottom: 1px solid black;
//   }
    
//   td {
//     text-align: center;
//   }