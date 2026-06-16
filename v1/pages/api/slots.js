import { mockSlots } from '../../lib/mockData';

export default async function handler(req, res) {
    try {
        await new Promise(resolve => setTimeout(resolve, 600));

        const sortedSlots = [...mockSlots].sort((a, b) => {
            return a.time.localeCompare(b.time);
        });

        return res.status(200).json(sortedSlots);
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
