import { useState, useEffect } from 'react'
import s from './App.module.css'
import { api } from './api/api'
import Card from './components/Card.jsx'

function App() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

       const response = await api.get('/character', {
  params: { page, name }
});


        if (!mounted) return
        setData(response.data?.results || [])
      } catch (err) {
        if (!mounted) return
        setError(err)
        setData([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()

    return () => { mounted = false }
  }, [page, name])

  return (
    <>
      <h1 className={s.title}>Personagens {name}</h1>
      <main>
        <div style={{
          display: 'flex', gap: 16, flexWrap: 'wrap',
          justifyContent: 'center', padding: '1rem'
        }}>
          <input
            type="number"
            min="1"
            value={page}
            onChange={e => setPage(Number(e.target.value) || 1)}
            placeholder='Página'
            style={{ padding: '12px 16px', fontSize: '1rem', minWidth: '180px' }}
          />

          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Procure um personagem (ex: Rick)'
            style={{ padding: '12px 16px', fontSize: '1rem', minWidth: '220px' }}
          />
        </div>

        {loading && <p style={{ color: '#fff' }}>Carregando personagens...</p>}
        {error && <p style={{ color: '#ff6b6b' }}>Não foi possível carregar personagens.</p>}

        <div className={s.wrapCards}>
          {data.map((item) => (
            <Card
              key={item.id}
              image={item.image}
              name={item.name}
              species={item.species}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default App
