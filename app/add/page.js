'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import "../styles/globalstyles.css"
import Link from 'next/link'
import AuthGuard from '../components/AuthGuard'

export default function AddLeasePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    property_address: '',
    tenant_name: '',
    lease_start: '',
    lease_end: '',
    square_footage:'',
    rental_rate_per_year:'',
    rental_rate: '',
    annual_rent:"",
    renewal_options: '',
    notes: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('leases').insert([form])
    if (error) {
      console.error('Error adding lease:', error.message)
      alert('Failed to add lease. Check console.')
      return
    }
    router.push('/')
  }

  return (
      <AuthGuard>
    <div style={{ padding: '2rem' }}>

<Link href="/">
  <button className ="blue-button"
  style={{
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer'
  }}>
    ← Back to Home
  </button>
</Link>
      <h2>Add New Lease</h2>
      <form onSubmit={handleSubmit} className="lease-form">
        <label>Property Address</label>
        <input name="property_address" onChange={handleChange} required />

        <label>Tenant Name</label>
        <input name="tenant_name" onChange={handleChange} required />

        <label>Lease Start Date</label>
        <input type="date" name="lease_start" onChange={handleChange} />

        <label>Lease End Date</label>
        <input type="date" name="lease_end" onChange={handleChange} />
        
        <label>Square Footage</label>
        <input  name="square_footage" onChange={handleChange} />

        <label>Rental Rate sqf/year</label>
        <input  name="rental_rate_per_year" onChange={handleChange} />

        <label>Monthly Rent</label>
        <input  name="rental_rate" onChange={handleChange} />
        
        <label>Annual Rent</label>
        <input  name="annual_rent" onChange={handleChange} />
   
        <label>Renewal Options</label>
        <textarea name="renewal_options" onChange={handleChange} />

        <label>Notes</label>
        <textarea name="notes" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
    </AuthGuard>
  )
}
