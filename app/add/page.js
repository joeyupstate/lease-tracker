'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabaseClient'
import "../styles/globalstyles.css"

export default function AddLeasePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    property_address: '',
    tenant_name: '',
    lease_start: '',
    lease_end: '',
    monthly_rent: '',
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
    <div style={{ padding: '2rem' }}>
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

        <label>Monthly Rent</label>
        <input type="number" name="monthly_rent" onChange={handleChange} />

        <label>Renewal Options</label>
        <textarea name="renewal_options" onChange={handleChange} />

        <label>Notes</label>
        <textarea name="notes" onChange={handleChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
