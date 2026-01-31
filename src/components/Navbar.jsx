import React from 'react';
import { Leaf, Globe } from 'lucide-react';
import styles from '../styles/Navbar.module.css';

const Navbar = ({ lang, toggleLang }) => {
    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContent}`}>
                <div className={styles.brand}>
                    <div className={styles.logoIcon}>
                        <Leaf size={24} color="white" />
                    </div>
                    <span className={styles.brandName}>Infinity Kisan</span>
                </div>

                <div className={styles.actions}>
                    <button className={styles.langBtn} onClick={toggleLang}>
                        <Globe size={18} />
                        <span>{lang === 'en' ? 'English' : 'हिन्दी'}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
