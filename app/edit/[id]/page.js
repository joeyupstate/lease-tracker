'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import Link from 'next/link'
import "../../styles/globalstyles.css"
import AuthGuard from '../../components/AuthGuard'

export default function EditLeasePage() {
  const router = useRouter()
  const { id } = useParams()
  const [form, setForm] = useState(null)

  useEffect(() => {
    if (!id) return
    async function loadLease() {
      const { data, error } = await supabase
        .from('leases')
        .select('*')
        .eq('id', id)
        .single()
      if (!error) setForm(data)
    }
    loadLease()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await supabase.from('leases').update(form).eq('id', id)
    router.push('/')
  }

  if (!form) return <p style={{ padding: '2rem' }}>Loading...</p>


  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this lease?')
    if (!confirmDelete) return
  
    const { error } = await supabase.from('leases').delete().eq('id', id)
    if (!error) {
      router.push('/')
    } else {
      alert('Failed to delete lease. Check console.')
      console.error(error)
    }
  }

  return (
    <AuthGuard>
    <div style={{ padding: '2rem' }}>
      <Link href="/">
        <button className="blue-button" style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
    
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          ← Back to Home
        </button>
      </Link>

      <h2>Edit Lease</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}className="lease-form-inline">
      <div className="form-row">
        <label>Property Address</label>
        <input
          name="property_address"
          value={form.property_address}
          onChange={handleChange}
          required
        />
        </div>
        <div className="form-row">
        <label>Tenant Name</label>
        <input
          name="tenant_name"
          value={form.tenant_name}
          onChange={handleChange}
          required
        />
        </div>
        <div className="form-row">
        <label>Lease Start Date</label>
        <input
          type="date"
          name="lease_start"
          value={form.lease_start || ''}
          onChange={handleChange}
        />
</div>
<div className="form-row">
        <label>Lease End Date</label>
        <input
          type="date"
          name="lease_end"
          value={form.lease_end || ''}
          onChange={handleChange}
        />
</div>
<div className="form-row">
        <label>Square Footage</label>
        <input
        
          name="square_footage"
          value={form.square_footage || ''}
          onChange={handleChange}
        />
</div>

<div className="form-row">
        <label>Rental Rate sqf/year</label>
        <input
        //   type="number"
          name="rental_rate_per_year"
          value={form.rental_rate_per_year || ''}
          onChange={handleChange}
        />
</div>


<div className="form-row">
        <label>Monthly Rent</label>
        <input
        //   type="number"
          name="rental_rate"
          value={form.rental_rate || ''}
          onChange={handleChange}
        />
</div>
<div className="form-row">
        <label>Annual Rent</label>
        <input
        //   type="number"
          name="annual_rent"
          value={form.annual_rent || ''}
          onChange={handleChange}
        />
</div>



<div className="form-row">
        <label>Renewal Options</label>
        <textarea
          name="renewal_options"
          value={form.renewal_options || ''}
          onChange={handleChange}
        />
</div>

<div className="form-row">
        <label>Notes</label>
        <textarea
          name="notes"
          value={form.notes || ''}
          onChange={handleChange}
        />
</div>
        <button className="light-blue-button" type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Save
        </button>

        <button
        className='blue-button'
  type="button"
  onClick={handleDelete}
  style={{
    marginTop: '1rem',
    padding: '0.5rem 1rem',
 
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }}
>
  Delete Lease
</button>
      </form>
    </div>
    </AuthGuard>
  )
}
