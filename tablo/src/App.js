import Table from "./table";
import "./css/table.css"
import { useState } from "react";

function App() {

   const [users, setUsers] = useState(() => [{
    name: 'Tayfun',
    surname: 'Erbilen',
    email: 'te@gmail.com',
    age: 29
  },
  {
    name: 'Mehmet',
    surname: 'Seven',
    email: 'msn@gmail.com',
    age: 29
  },
  {
    name: 'Ahmet',
    surname: 'Tarık G.',
    email: 'atg@gmail.com',
    age: 24
  },
  {
   name: 'Gökhan',
   surname: 'Kandemir',
   email: 'gkandemir@gmail.com',
   age: 35
 },])

    return (
      <div>
         <Table
          searchable={true} 
          head={[
            {name: 'Ad-Soyad', sortable: true}, 
            {name: 'E-posta'}, 
            {name: ' Yaş', sortable: true}, 
            {name: 'İşlemler'}
          ]}
          body={users && users.map((user, key) => ([
            [user.name + " " + user.surname],
            [user.email],
            [user.age],
            [
              <button className="edit">Düzenle</button>,
              <button onClick={() => {
                const tmpUsers = [...users]
                tmpUsers.splice(key, 1)
                setUsers(tmpUsers)
              }} className="delete">Sil</button>
            ]
          ]))}
        /> 
      </div>
    );
  }
  
  export default App;
  