import React from 'react';
import { Home, Sprout, Activity, TrendingUp, Calendar, MessageSquare, DollarSign } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import styles from '../styles/BottomNav.module.css';

const BottomNav = () => {
    return (
        <div className={styles.bottomNav}>
            <NavLink to="/" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                <Home size={20} />
                <span>Home</span>
            </NavLink>
            <NavLink to="/recommend" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                <Sprout size={20} />
                <span>Crops</span>
            </NavLink>
            <NavLink to="/disease" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                <Activity size={20} />
                <span>Health</span>
            </NavLink>
            <NavLink to="/yield" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                <DollarSign size={20} />
                <span>Yield</span>
            </NavLink>
            <NavLink to="/planner" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
                <Calendar size={20} />
                <span>Plan</span>
            </NavLink>
        </div>
    );
};

export default BottomNav;
