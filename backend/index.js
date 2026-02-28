const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to communicate
app.use(express.json());

// In-memory data store for members
let members = [
    {
        id: '1',
        name: 'Arjun Verma',
        usn: '1RV21CS001',
        chapter: 'Computer Society (CS)',
        role: 'Chairperson',
        hierarchyLevel: 1,
        email: 'arjun.cs@ieee.org',
        joinDate: new Date('2022-09-01').toISOString(),
        status: 'Active',
        bio: 'Spearheaded national-level hackathons focusing on AI/ML innovations.'
    },
    {
        id: '2',
        name: 'Priya Sharma',
        usn: '1RV21CS002',
        chapter: 'Women in Engineering (WIE)',
        role: 'Vice Chair',
        hierarchyLevel: 2,
        email: 'priya.wie@ieee.org',
        joinDate: new Date('2023-01-15').toISOString(),
        status: 'Active',
        bio: 'Led technical mentorship programs and industry-led workshops.'
    }
];

// Reusable Validation Regex
const usnRegex = /^[A-Za-z0-9]{10}$/;

// ---- Routes ----

/**
 * GET /members
 * Returns a JSON list of all members sorted by hierarchyLevel (ascending order so Chairs appear first).
 */
app.get('/members', (req, res) => {
    const sortedMembers = [...members].sort((a, b) => a.hierarchyLevel - b.hierarchyLevel);
    res.status(200).json(sortedMembers);
});

/**
 * POST /members
 * Adds a new member to the list with Expanded Schema validation.
 */
app.post('/members', (req, res) => {
    const { name, usn, chapter, role, hierarchyLevel, email, status, bio } = req.body;

    // 1. Basic presence validation
    if (!name || !usn || !chapter || !role || hierarchyLevel == null || !email) {
        return res.status(400).json({ error: 'Missing required fields (name, usn, chapter, role, hierarchyLevel, email).' });
    }

    // 2. Exact 10 character USN validation
    if (typeof usn !== 'string' || usn.length !== 10) {
        return res.status(400).json({ error: 'Validation failed: USN must be exactly 10 characters long.' });
    }

    // 3. Unique USN check
    const exists = members.some((m) => m.usn.toUpperCase() === usn.toUpperCase());
    if (exists) {
        return res.status(409).json({ error: 'A member with this USN already exists.' });
    }

    const newMember = {
        id: Date.now().toString(),
        name,
        usn: usn.toUpperCase(),
        chapter,
        role,
        hierarchyLevel: Number(hierarchyLevel),
        email,
        joinDate: new Date().toISOString(),
        status: status || 'Active',
        bio: bio || ''
    };

    members.push(newMember);
    res.status(201).json({ message: 'Member added successfully', data: newMember });
});

/**
 * DELETE /members/:usn
 * Removes a member based on their USN.
 */
app.delete('/members/:usn', (req, res) => {
    const { usn } = req.params;

    if (!usn || usn.length !== 10) {
        return res.status(400).json({ error: 'Invalid USN format provided.' });
    }

    const initialLength = members.length;
    members = members.filter((m) => m.usn.toUpperCase() !== usn.toUpperCase());

    if (members.length === initialLength) {
        return res.status(404).json({ error: 'Member not found.' });
    }

    res.status(200).json({ message: `Member with USN ${usn.toUpperCase()} has been removed.` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
