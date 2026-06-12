// api/slots.js
export default async function handler(req, res) {
    const { data, error } = await supabase
        .from('slots')
        .select('*, bookings(*), workshops(*)')

    if (error) return res.status(500).json({ error })

    const result = data.map(slot => {
        const bookings_count = slot.bookings.filter(b => b.status === 'confirmed').length
        const status = slot.confirmed === true ? 'confirmed' : 'pending'
        return {
            id: slot.id,
            workshop_title: slot.workshops.title,
            time: slot.starts_at,
            capacity: slot.workshops.capacity,
            bookings_count,
            status
        }
    })

    res.status(200).json(result)
}
