const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit'); // ADDED
const { body, validationResult } = require('express-validator'); // ADDED
const saltRounds = 10;

const app = express();
app.use(cors());
app.use(express.json());

// --- ADDED: SECURITY RATE LIMITER ---
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5, 
    message: { success: false, message: "Too many login attempts. Try again in 15 minutes." }
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Roshini@28', 
    database: 'smartit_hub'
});

// --- ADDED: AUDIT LOG FUNCTION ---
const logSecurityEvent = (tenantId, action, details) => {
    const sql = "INSERT INTO security_logs (tenant_id, action, details) VALUES (?, ?, ?)";
    db.query(sql, [tenantId, action, details], (err) => {
        if (err) console.error("Audit Log Error:", err);
    });
};

// 1. REGISTER ROUTE (Updated with Validation)
app.post('/api/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], async (req, res) => {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const { name, email, password, phone, building, floor } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const sql = "INSERT INTO tenants (name, email, password, phone, building, floor) VALUES (?, ?, ?, ?, ?, ?)";
        
        db.query(sql, [name, email, hashedPassword, phone, building, floor], (err, result) => {
            if (err) return res.status(500).json({ success: false, message: err.message });
            
            // Log the registration event
            logSecurityEvent(result.insertId, 'REGISTER', 'New tenant account created');
            res.json({ success: true, message: "Registered successfully!" });
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Hashing failed" });
    }
});

// 2. LOGIN ROUTE (Updated with Rate Limiter & Logging)
app.post('/api/login', loginLimiter, (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM tenants WHERE email = ?";
    
    db.query(sql, [email], async (err, data) => {
        if (err) return res.status(500).json({ success: false, error: err });
        
        if (data.length > 0) {
            const isMatch = await bcrypt.compare(password, data[0].password);
            
            if (isMatch) {
                const user = {
                    id: data[0].id,
                    username: data[0].name,
                    email: data[0].email,
                    building: data[0].building,
                    floor: data[0].floor
                };
                // Log success
                logSecurityEvent(user.id, 'LOGIN_SUCCESS', `Tenant ${user.username} logged in`);
                return res.json({ success: true, user });
            } else {
                // Log failed password
                logSecurityEvent(data[0].id, 'LOGIN_FAILURE', 'Incorrect password used');
                return res.json({ success: false, message: "Invalid password" });
            }
        } else {
            return res.json({ success: false, message: "User not found" });
        }
    });
});

// 3. APPLIANCES ROUTE (Unchanged)
app.get('/api/appliances/:tenantId', (req, res) => {
    const sql = "SELECT * FROM appliances WHERE tenant_id = ?";
    db.query(sql, [req.params.tenantId], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

// 4. TEMP HISTORY ROUTE (Unchanged)
app.get('/api/temp-history/:deviceId', (req, res) => {
    const { deviceId } = req.params;
    const sql = `
        SELECT temp_value, DATE_FORMAT(recorded_at, '%H:%i') as recorded_at 
        FROM temperature_history 
        WHERE device_id = ? 
        ORDER BY recorded_at ASC 
        LIMIT 24
    `;

    db.query(sql, [deviceId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// 5. BILLING ROUTE (Added for your new Sidebar feature)
app.get('/api/bills/:tenantId', (req, res) => {
    const sql = "SELECT * FROM bills WHERE tenant_id = ?";
    db.query(sql, [req.params.tenantId], (err, data) => {
        if (err) return res.status(500).json(err);
        res.json(data);
    });
});

app.listen(3001, () => console.log("Backend Server running on http://localhost:3001"));