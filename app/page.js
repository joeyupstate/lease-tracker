'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import "./styles/globalstyles.css";

export default function HomePage() {
  const [leases, setLeases] = useState([])
  const [results, setResults] = useState([])
  const [search, setSearch] = useState('')
  const [mode, setMode] = useState('idle') // 'search' or 'all'

  useEffect(() => {
    fetchLeases()
  }, [])

  async function fetchLeases() {
    const { data } = await supabase
      .from('leases')
      .select('*')
      .order('created_at', { ascending: false })
    setLeases(data)
  }

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearch(term)
    setMode('search')
    if (term === '') {
      setResults([])
      return
    }

    const filtered = leases.filter(
      (lease) =>
        lease.property_address.toLowerCase().includes(term) ||
        lease.tenant_name.toLowerCase().includes(term)
    )
    setResults(filtered)
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this lease?')
    if (!confirm) return

    await supabase.from('leases').delete().eq('id', id)
    fetchLeases()
    setSearch('')
    setResults([])
    setMode('idle')
  }

  const handleViewAll = () => {
    setSearch('')
    setMode('all')
    setResults(leases)
  }

  const leasesToDisplay = mode === 'search' || mode === 'all' ? results : []

  return (
    <div className="front-page">
        <div className="front-container">
      <h1>Lease Tracker</h1>

   
        <input
          type="text"
          placeholder="Search leases by property or tenant..."
          value={search}
          onChange={handleSearch}
          style={{ padding: '0.5rem', width: '300px' }}
        />

<div className="front-buttons">
        <button
        className='blue-button'
          onClick={handleViewAll}
          style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}
        >
          View All
        </button>

        <Link href="/add" style={{ marginLeft: '1rem' }}>
          <button className="black-button"style={{ padding: '0.5rem 1rem' }}>Add Lease</button>
        </Link>
      </div>

      

      {mode !== 'idle' && (
        leasesToDisplay.length === 0 ? (
          <p>No leases found.</p>
        ) : (
          <ul>
            {leasesToDisplay.map((lease) => (
              <li key={lease.id} style={{ marginBottom: '1rem'}}>
                <Link href={`/edit/${lease.id}`} className="tenant-link">
                  <strong>{lease.tenant_name}</strong> — {lease.property_address}
                </Link>
                <button
                  onClick={() => handleDelete(lease.id)}
                  style={{
                    marginLeft: '1rem',
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
    </div>
  )
}
