import React, { useState } from 'react';
import { Calendar, Droplets, Sun, Bug } from 'lucide-react';
import BackButton from '../components/BackButton';
import styles from '../styles/CropPlanner.module.css';

const CropPlanner = () => {
    const [crop, setCrop] = useState('');
    const [sowingDate, setSowingDate] = useState('');
    const [plan, setPlan] = useState(null);

    const generatePlan = (e) => {
        e.preventDefault();
        if (!crop || !sowingDate) return;

        // Mock stages
        const start = new Date(sowingDate);
        const stages = [
            { day: 0, title: 'Sowing', icon: <Calendar />, desc: 'Sow seeds at 2-3cm depth.' },
            { day: 21, title: 'First Irrigation', icon: <Droplets />, desc: 'Critical root initiation stage.' },
            { day: 45, title: 'Fertilization', icon: <Sun />, desc: 'Apply Urea slightly.' },
            { day: 65, title: 'Pest Check', icon: <Bug />, desc: 'Check for aphids.' },
            { day: 120, title: 'Harvest', icon: <Calendar />, desc: 'Crop ready for harvest.' },
        ];

        setPlan(stages.map(s => {
            const d = new Date(start);
            d.setDate(d.getDate() + s.day);
            return { ...s, date: d.toLocaleDateString() };
        }));
    };

    return (
        <div className="container">
            <BackButton />
            <h2 className="text-center" style={{ margin: '1.5rem 0' }}>Smart Crop Planner</h2>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={generatePlan} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label>Crop Selection</label>
                        <select value={crop} onChange={e => setCrop(e.target.value)} required>
                            <option value="">-- Select --</option>
                            <option value="wheat">Wheat</option>
                            <option value="paddy">Paddy</option>
                        </select>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Sowing Date</label>
                        <input type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} required />
                    </div>

                    <button type="submit" className="btn btn-primary">Generate Schedule</button>
                </form>

                {plan && (
                    <div className={styles.timeline}>
                        {plan.map((stage, i) => (
                            <div key={i} className={styles.timelineItem}>
                                <div className={styles.dateCol}>
                                    <span className={styles.dayCount}>Day {stage.day}</span>
                                    <span className={styles.dateText}>{stage.date}</span>
                                </div>
                                <div className={styles.marker}>
                                    <div className={styles.dot}></div>
                                    {i !== plan.length - 1 && <div className={styles.line}></div>}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.iconBox}>{stage.icon}</div>
                                    <div>
                                        <h4>{stage.title}</h4>
                                        <p>{stage.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropPlanner;
