import UserForm from './components/UserForm'
import UserCard from './components/UserCard'
import { useEffect, useState } from 'react'
import AddUser from './components/AddUser'
import useFetch from './hooks/userFetch'
import './css/App.css'

function App() {

  const [infoUpdate, setInfoUpdate] = useState()
  const [isFormActive, setIsFormActive] = useState(false);

  const baseUrl = 'http://localhost:8080'
  const [ users, getUsers, createUser, deleteUser, updateUser ] = useFetch(baseUrl)

  useEffect(() => {
    getUsers('/users')
  }, [])

  return (
    <div className='page'>
      <header className='user_header'>
        <h1>User Crud</h1>
        <AddUser
          setIsFormActive={setIsFormActive}
        /> 
      </header>
      <main>
        <div className={`user_form_container ${isFormActive ? 'active' : ''}`}>
          <UserForm
            createUser={createUser}
            infoUpdate={infoUpdate}
            updateUser={updateUser}
            setInfoUpdate={setInfoUpdate}
            setIsFormActive={setIsFormActive}
          />
        </div>             
        <div className='user_card_container'>
          {
            users?.map(user => (
              <UserCard
                key={user.id}
                user={user}
                deleteUser={deleteUser}
                setInfoUpdate={setInfoUpdate}
                setIsFormActive={setIsFormActive}
              />
            ))
          }
        </div>
      </main>
    </div>
  )
}

export default App