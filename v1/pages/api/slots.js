import { mockSlots } from '../../lib/mockData';

export default async function handler(req, res) {
    try {
        await new Promise(resolve => setTimeout(resolve, 600));

        return res.status(200).json(mockSlots);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
