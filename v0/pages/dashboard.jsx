// pages/dashboard.jsx
export default function Dashboard() {
    const [data, setData] = React.useState(null)

    React.useEffect(() => {
            fetch('/api/slots').then(r => r.json()).then(d => {
            setData(d)
        })
    }, [])

    if (!data) return <div>chargement...</div>

    return (
        <div>
        {data.map(s => (
            <div key={s.id} style={{
                backgroundColor: s.status === 'confirmed' ? '#800080' : 'white',
                padding: '12px',
                marginBottom: '8px',
                borderRadius: '8px'
            }}>
            <p style={{ color: s.status === 'confirmed' ? 'white' : 'black' }}>
                {s.workshop_title} — {s.time}
            </p>
            <p style={{ color: s.status === 'confirmed' ? 'white' : 'black' }}>
                {s.bookings_count} / {s.capacity} participants
            </p>
            {s.status === 'confirmed' && s.bookings_count >= s.capacity &&
                <p style={{ color: 'white', fontWeight: 'bold' }}>COMPLET</p>
            }
            {s.status === 'confirmed' && s.bookings_count < s.capacity &&
                <p style={{ color: 'white' }}>{s.capacity - s.bookings_count} place(s) restante(s)</p>
            }
            {s.status !== 'confirmed' &&
                <p style={{ color: 'gray' }}>En attente de confirmation</p>
            }
            </div>
        ))}
        </div>
    )
}
