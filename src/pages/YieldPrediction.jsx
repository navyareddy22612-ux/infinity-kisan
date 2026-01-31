import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChevronDown, Calculator, DollarSign, Sprout } from 'lucide-react';
import BackButton from '../components/BackButton';
import styles from '../styles/YieldPrediction.module.css';

// Enhanced Mock Data for 15+ Crops
// Costs are per Acre in INR
const CROP_DB = {
    wheat: { name: "Wheat", yield: 20, price: 2275, cost: 15000 },
    paddy: { name: "Rice (Paddy)", yield: 25, price: 2183, cost: 18000 },
    cotton: { name: "Cotton", yield: 10, price: 6600, cost: 22000 },
    sugarcane: { name: "Sugarcane", yield: 300, price: 315, cost: 45000 },
    maize: { name: "Maize", yield: 25, price: 2090, cost: 14000 },
    soybean: { name: "Soybean", yield: 8, price: 4600, cost: 12000 },
    mustard: { name: "Mustard", yield: 6, price: 5650, cost: 10000 },
    groundnut: { name: "Groundnut", yield: 10, price: 6377, cost: 16000 },
    gram: { name: "Gram (Chana)", yield: 8, price: 5440, cost: 11000 },
    tur: { name: "Tur (Arhar)", yield: 6, price: 7000, cost: 13000 },
    potato: { name: "Potato", yield: 80, price: 1200, cost: 35000 },
    onion: { name: "Onion", yield: 100, price: 1500, cost: 40000 },
    tomato: { name: "Tomato", yield: 120, price: 1000, cost: 45000 },
    coffee: { name: "Coffee", yield: 4, price: 18000, cost: 50000 },
    tea: { name: "Tea", yield: 8, price: 15000, cost: 60000 },
    rubber: { name: "Rubber", yield: 6, price: 16000, cost: 40000 },
};

const YieldPrediction = () => {
    const [crop, setCrop] = useState('');
    const [area, setArea] = useState('');
    const [unit, setUnit] = useState('acre'); // 'acre' or 'hectare'
    const [result, setResult] = useState(null);

    const calculate = (e) => {
        e.preventDefault();
        if (!crop || !area) return;

        const cropData = CROP_DB[crop];

        // Convert to Acres for calculation (1 Hectare = 2.47 Acres)
        const areaInAcres = unit === 'hectare' ? parseFloat(area) * 2.47 : parseFloat(area);

        const totalYield = areaInAcres * cropData.yield;
        const revenue = totalYield * cropData.price;
        const totalCost = areaInAcres * cropData.cost;
        const profit = revenue - totalCost;

        // Detailed Breakdown logic (percentages of total cost)
        // Different profiles could be used, but using a standard model for now
        const breakdownData = [
            { name: 'Seeds', value: Math.round(totalCost * 0.12), color: '#0088FE' },
            { name: 'Fertilizers', value: Math.round(totalCost * 0.20), color: '#00C49F' },
            { name: 'Pesticides', value: Math.round(totalCost * 0.10), color: '#FFBB28' },
            { name: 'Irrigation', value: Math.round(totalCost * 0.10), color: '#FF8042' },
            { name: 'Labor', value: Math.round(totalCost * 0.25), color: '#8884d8' },
            { name: 'Harvesting', value: Math.round(totalCost * 0.15), color: '#82ca9d' },
            { name: 'Transport', value: Math.round(totalCost * 0.08), color: '#a4de6c' },
        ];

        setResult({
            yield: totalYield,
            revenue,
            cost: totalCost,
            profit,
            breakdown: breakdownData
        });
    };

    return (
        <div className="container">
            <BackButton />
            <h2 className="text-center" style={{ margin: '1.5rem 0' }}>Yield & Profit Calculator</h2>

            <div className={styles.predictionContainer}>
                <div className="card">
                    <form onSubmit={calculate} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Select Crop (15+ Options)</label>
                            <div className={styles.selectWrapper}>
                                {!crop && <Sprout size={18} className={styles.inputIcon} />}
                                <select
                                    value={crop}
                                    onChange={e => setCrop(e.target.value)}
                                    required
                                    style={{ paddingLeft: crop ? '12px' : '40px' }}
                                >
                                    <option value="">-- Choose Crop --</option>
                                    {Object.entries(CROP_DB).map(([key, data]) => (
                                        <option key={key} value={key}>{data.name}</option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className={styles.chevron} />
                            </div>
                        </div>

                        <div className={styles.inputRow}>
                            <div className={styles.inputGroup} style={{ flex: 1 }}>
                                <label>Area Size</label>
                                <input type="number" value={area} onChange={e => setArea(e.target.value)} placeholder="e.g. 5" step="0.1" required />
                            </div>
                            <div className={styles.inputGroup} style={{ width: '120px' }}>
                                <label>Unit</label>
                                <select value={unit} onChange={e => setUnit(e.target.value)}>
                                    <option value="acre">Acres</option>
                                    <option value="hectare">Hectares</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary w-full">
                            <Calculator size={18} style={{ marginRight: '8px' }} /> Calculate Profit
                        </button>
                    </form>
                </div>

                {result && (
                    <div className={styles.results}>
                        <div className={styles.summaryGrid}>
                            <div className={`${styles.summaryCard} ${styles.highlight}`}>
                                <label>Net Profit</label>
                                <div className={styles.value}>₹{result.profit.toLocaleString()}</div>
                                <div className={styles.subtext}>Estimated Return</div>
                            </div>
                            <div className={styles.summaryCard}>
                                <label>Total Yield</label>
                                <div className={styles.value}>{Math.round(result.yield).toLocaleString()} Q</div>
                                <div className={styles.subtext}>Quintals</div>
                            </div>
                            <div className={`${styles.summaryCard} ${styles.expense}`}>
                                <label>Total Cost</label>
                                <div className={styles.value}>₹{result.cost.toLocaleString()}</div>
                                <div className={styles.subtext}>Input Expenses</div>
                            </div>
                            <div className={`${styles.summaryCard} ${styles.revenue}`}>
                                <label>Gross Revenue</label>
                                <div className={styles.value}>₹{result.revenue.toLocaleString()}</div>
                                <div className={styles.subtext}>Sales Value</div>
                            </div>
                        </div>

                        <div className={styles.breakdownSection}>
                            <h4 className="text-center" style={{ marginBottom: '1rem' }}>Expense Breakdown</h4>

                            <div className={styles.breakdownGrid}>
                                <div className={styles.chartWrapper}>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={result.breakdown}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {result.breakdown.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(val) => `₹${val.toLocaleString()}`} />
                                            <Legend verticalAlign="bottom" height={36} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className={styles.tableWrapper}>
                                    <table className={styles.costTable}>
                                        <thead>
                                            <tr>
                                                <th>Category</th>
                                                <th className="text-right">Estimated Cost (₹)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {result.breakdown.map((item, i) => (
                                                <tr key={i}>
                                                    <td>
                                                        <span className={styles.dot} style={{ backgroundColor: item.color }}></span>
                                                        {item.name}
                                                    </td>
                                                    <td className="text-right">{item.value.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                            <tr className={styles.totalRow}>
                                                <td><strong>Total</strong></td>
                                                <td className="text-right"><strong>{result.cost.toLocaleString()}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default YieldPrediction;
