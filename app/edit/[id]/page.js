'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '../../../lib/supabaseClient'
import Link from 'next/link'
import "../../styles/globalstyles.css"

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

  return (
    <div style={{ padding: '2rem' }}>
      <Link href="/">
        <button style={{
          marginBottom: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#ccc',
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
        <label>Monthly Rent</label>
        <input
          type="number"
          name="monthly_rent"
          value={form.monthly_rent || ''}
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
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
          Save
        </button>
      </form>
    </div>
  )
}
