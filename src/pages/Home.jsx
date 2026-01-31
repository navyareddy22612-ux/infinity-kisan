import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Activity, TrendingUp, DollarSign, Calendar, MessageSquare, MapPin, CloudSun } from 'lucide-react';
import styles from '../styles/Home.module.css';

const features = [
    {
        title: "Crop Recommendation",
        desc: "Find the best crop for your soil.",
        icon: <Sprout size={32} />,
        color: "emerald",
        link: "/recommend"
    },
    {
        title: "Disease Detection",
        desc: "Scan leaves to detect diseases.",
        icon: <Activity size={32} />,
        color: "red",
        link: "/disease"
    },
    {
        title: "Yield & Profit",
        desc: "Estimate yield and profits.",
        icon: <DollarSign size={32} />,
        color: "yellow",
        link: "/yield"
    },
    {
        title: "Price Forecasting",
        desc: "Predict market prices.",
        icon: <TrendingUp size={32} />,
        color: "blue",
        link: "/forecast"
    },
    {
        title: "Crop Planner",
        desc: "Track your farming schedule.",
        icon: <Calendar size={32} />,
        color: "purple",
        link: "/planner"
    },
    {
        title: "AI Assistant",
        desc: "Ask Questions.",
        icon: <MessageSquare size={32} />,
        color: "teal",
        link: "/chat"
    }
];

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <header className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>Welcome, Farmer!</h1>
                    <p className={styles.subtitle}>AI-Powered Smart Farming Assistant</p>

                    <div className={styles.weatherCard}>
                        <div className={styles.weatherMain}>
                            <div className={styles.location}>
                                <MapPin size={16} /> Punjab, India
                            </div>
                            <div className={styles.temp}>
                                <CloudSun size={24} className="text-yellow-400" />
                                <span>28°C</span>
                            </div>
                        </div>
                        <div className={styles.date}>
                            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
                        </div>
                    </div>
                </div>
            </header>

            <section className="container">
                <h2 className={styles.sectionTitle}>Our Services</h2>
                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <Link to={feature.link} key={index} className={styles.featureCard}>
                            <div className={`${styles.iconWrapper} ${styles[feature.color]}`}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardDesc}>{feature.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
