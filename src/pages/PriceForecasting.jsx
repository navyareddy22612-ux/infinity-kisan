import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowUpRight } from 'lucide-react';
import BackButton from '../components/BackButton';
import styles from '../styles/PriceForecasting.module.css';

const data = [
    { month: 'Jan', price: 2100 },
    { month: 'Feb', price: 2200 },
    { month: 'Mar', price: 2150 },
    { month: 'Apr', price: 2400 },
    { month: 'May', price: 2800 },
    { month: 'Jun', price: 2600 },
];

const PriceForecasting = () => {
    return (
        <div className="container">
            <BackButton />
            <h2 className="text-center" style={{ margin: '1.5rem 0' }}>Price Forecast</h2>

            <div className={styles.marketCard}>
                <div className={styles.header}>
                    <div>
                        <h3>Wheat (Quintal)</h3>
                        <span className={styles.location}>Mandi: Khanna, Punjab</span>
                    </div>
                    <div className={styles.priceTag}>
                        <span className={styles.label}>Predicted Price</span>
                        <span className={styles.value}>₹2,850</span>
                        <span className={styles.trend}><ArrowUpRight size={16} /> +5.2%</span>
                    </div>
                </div>

                <div className={styles.chartContainer}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280' }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="price"
                                stroke="#10B981"
                                strokeWidth={3}
                                dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className={styles.recommendation}>
                    <div className={styles.recIcon}>
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <h4>Strong Sell Signal</h4>
                        <p>Prices are expected to peak in mid-May. Recommend holding stock for 2 more weeks.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceForecasting;
