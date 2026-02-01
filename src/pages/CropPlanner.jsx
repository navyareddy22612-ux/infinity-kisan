import React, { useState } from 'react';
import { Calendar, Droplets, Sun, Bug, Truck, Sprout, Tractor, Scissors, Package, Settings } from 'lucide-react';
import BackButton from '../components/BackButton';
import styles from '../styles/CropPlanner.module.css';
import { useTranslation } from '../services/i18n';

const CROP_SCHEDULES = {
    wheat: [
        { day: -15, title: 'Land Preparation', icon: <Tractor />, desc: 'Plough the field twice followed by harrowing. Apply 10 tons of FYM per ha.' },
        { day: -1, title: 'Seed Treatment', icon: <Sprout />, desc: 'Treat seeds with Vitavax or Thiram @ 2-3g/kg seed to prevent loose smut.' },
        { day: 0, title: 'Sowing', icon: <Calendar />, desc: 'Sow seeds at 4-5cm depth using a seed drill. Spacing: 20-22.5cm between rows.' },
        { day: 21, title: 'CRI Stage (Irrigation)', icon: <Droplets />, desc: 'Critical Root Initiation stage. Apply first irrigation. Most critical for yield.' },
        { day: 40, title: 'Tillering Stage', icon: <Sun />, desc: 'Apply 1/2 dose of Nitrogen (Urea). Maintain weed-free field.' },
        { day: 65, title: 'Jointing Stage', icon: <Droplets />, desc: 'Apply second irrigation if soil moisture is low.' },
        { day: 85, title: 'Flowering Stage', icon: <Sun />, desc: 'Monitor for aphids and rust. Apply propiconazole if rust appears.' },
        { day: 105, title: 'Milking Stage', icon: <Droplets />, desc: 'Grain filling period. Ensure adequate soil moisture.' },
        { day: 125, title: 'Harvesting', icon: <Scissors />, desc: 'Harvest when grain is hard and straw turns golden yellow. Moisture < 14%.' },
        { day: 130, title: 'Transport/Storage', icon: <Truck />, desc: 'Transport to mandi or store in jute bags in a dry, ventilated place.' }
    ],
    paddy: [
        { day: -20, title: 'Nursery Preparation', icon: <Sprout />, desc: 'Prepare raised beds for nursery. Sow seeds for seedlings.' },
        { day: -5, title: 'Main Field Prep', icon: <Tractor />, desc: 'Puddle the field (wet tillage) to reduce percolation. Level the land.' },
        { day: 0, title: 'Transplanting', icon: <Calendar />, desc: 'Transplant 25-30 day old seedlings at 20x10cm spacing.' },
        { day: 15, title: 'Gap Filling', icon: <Sprout />, desc: 'Replant dead hills within 7-10 days to maintain population.' },
        { day: 30, title: 'Tillering / Fertilization', icon: <Sun />, desc: 'Apply first top dressing of Nitrogen. Maintain 2-3cm water level.' },
        { day: 50, title: 'Panicle Initiation', icon: <Droplets />, desc: 'Critical water stage. Keep water level at 5cm.' },
        { day: 70, title: 'Flowering', icon: <Bug />, desc: 'Monitor for Stem Borer and Blast disease. specific pesticides if needed.' },
        { day: 100, title: 'Draining', icon: <Sun />, desc: 'Drain water from field 10 days before expected harvest.' },
        { day: 110, title: 'Harvesting', icon: <Scissors />, desc: 'Harvest when 80% grains are straw colored.' },
        { day: 115, title: 'Threshing & Transport', icon: <Truck />, desc: 'Thresh immediately or after drying. Transport to market.' }
    ],
    maize: [
        { day: -10, title: 'Ploughing', icon: <Tractor />, desc: 'Deep summer ploughing. Apply FYM @ 10-12 tons/ha.' },
        { day: 0, title: 'Sowing', icon: <Calendar />, desc: 'Sow on ridges/furrows. Depth 3-5cm. Spacing 60x20cm.' },
        { day: 20, title: 'Knee High Stage', icon: <Sun />, desc: 'Apply N fertilizer. Do earthing up to support plants.' },
        { day: 45, title: 'Tasseling', icon: <Droplets />, desc: 'Critical irrigation stage. Moisture stress reduces yield significantly.' },
        { day: 60, title: 'Silking', icon: <Bug />, desc: 'Monitor for Fall Armyworm. Apply biological controls if needed.' },
        { day: 90, title: 'Maturity', icon: <Sun />, desc: 'Cob sheath turns yellow/dry. Grain becomes hard.' },
        { day: 100, title: 'Harvesting & Shelling', icon: <Scissors />, desc: 'Harvest cobs. Dry and shell grains.' },
        { day: 105, title: 'Transport', icon: <Truck />, desc: 'Pack in gunny bags and transport.' }
    ],
    cotton: [
        { day: -15, title: 'Land Preparation', icon: <Tractor />, desc: 'Plough field. Apply basal dose of fertilizers.' },
        { day: 0, title: 'Sowing', icon: <Calendar />, desc: 'Sow Bt Cotton seeds. maintain spacing based on variety.' },
        { day: 20, title: 'Thinning', icon: <Scissors />, desc: 'Remove extra seedlings. Keep one healthy plant per hill.' },
        { day: 45, title: 'Square Formation', icon: <Sun />, desc: 'Apply Nitrogen. Inspect for sucking pests.' },
        { day: 65, title: 'Flowering', icon: <Droplets />, desc: 'Irrigate if no rain. Critical stage.' },
        { day: 90, title: 'Boll Development', icon: <Bug />, desc: 'Monitor for Bollworms. Install pheromone traps.' },
        { day: 140, title: 'First Picking', icon: <Package />, desc: 'Pick fully opened bolls during dry hours of the day.' },
        { day: 160, title: 'Second Picking', icon: <Package />, desc: 'Pick remaining bolls. Destroy stalk after last picking.' },
        { day: 165, title: 'Marketing', icon: <Truck />, desc: 'Take cotton to market. Ensure low moisture content.' }
    ],
    sugarcane: [
        { day: -10, title: 'Trench Making', icon: <Tractor />, desc: 'Prepare trenches/ridges. Apply basal fertilizers.' },
        { day: 0, title: 'Planting', icon: <Calendar />, desc: 'Plant 2-3 budded setts. Treat with fungicide.' },
        { day: 45, title: 'Formative Stage', icon: <Sun />, desc: 'Apply Urea. Light earthing up.' },
        { day: 90, title: 'Tillering', icon: <Droplets />, desc: 'Frequent irrigation (10-12 days interval). Control weeds.' },
        { day: 150, title: 'Grand Growth', icon: <Sun />, desc: 'Major earthing up to prevent lodging. Detrash dry leaves.' },
        { day: 250, title: 'Maturity Phase', icon: <Sprout />, desc: 'Stop N fertilizers. Limit water to increase sucrose.' },
        { day: 360, title: 'Harvesting', icon: <Scissors />, desc: 'Cut canes at ground level using sharp knife.' },
        { day: 361, title: 'Transport', icon: <Truck />, desc: 'Rush to mill within 24 hours to prevent inversion.' }
    ],
    tomato: [
        { day: -25, title: 'Nursery Raising', icon: <Sprout />, desc: 'Sow seeds in nursery trays/beds.' },
        { day: 0, title: 'Transplanting', icon: <Calendar />, desc: 'Transplant 4-week old seedlings. Spacing 60x45cm.' },
        { day: 20, title: 'Staking', icon: <Settings />, desc: 'Provide support with stakes/strings for indeterminate varieties.' },
        { day: 40, title: 'Flowering', icon: <Sun />, desc: 'Apply fertilizers. Ensure pollination.' },
        { day: 65, title: 'Fruiting', icon: <Bug />, desc: 'Protect from fruit borers and blight.' },
        { day: 80, title: 'Harvesting Starts', icon: <Scissors />, desc: 'Pick fruits at breaker stage for distant market, red for local.' },
        { day: 90, title: 'Marketing', icon: <Truck />, desc: 'Grade and pack in crates. Transport to market.' }
    ],
    potato: [
        { day: -10, title: 'Field Prep', icon: <Tractor />, desc: 'Plough field. Soil should be friable/loose.' },
        { day: 0, title: 'Planting', icon: <Calendar />, desc: 'Plant tubers on ridges. Spacing 60x20cm.' },
        { day: 30, title: 'Earthing Up', icon: <Sun />, desc: 'Cover developing tubers with soil to prevent greening.' },
        { day: 50, title: 'Tuber Initiation', icon: <Droplets />, desc: 'Maintain moisture. Prevent cracking.' },
        { day: 75, title: 'Late Blight Check', icon: <Bug />, desc: 'Spray Mancozeb if weather is cloudy/humid.' },
        { day: 90, title: 'Dehaulming', icon: <Scissors />, desc: 'Cut vegetative tops 10-15 days before harvest.' },
        { day: 105, title: 'Harvesting', icon: <Package />, desc: 'Dig out tubers. Dry in shade for curing.' },
        { day: 110, title: 'Cold Storage/Transport', icon: <Truck />, desc: 'Sort and grade. Transport to cold storage or market.' }
    ]
};

const CropPlanner = () => {
    const { t } = useTranslation();
    const [crop, setCrop] = useState('');
    const [sowingDate, setSowingDate] = useState('');
    const [plan, setPlan] = useState(null);

    const generatePlan = (e) => {
        e.preventDefault();
        if (!crop || !sowingDate) return;

        const schedule = CROP_SCHEDULES[crop];
        if (!schedule) {
            alert("Detailed schedule coming soon for this crop!");
            return;
        }

        const start = new Date(sowingDate);

        setPlan(schedule.map(s => {
            const d = new Date(start);
            d.setDate(d.getDate() + s.day);
            return {
                ...s,
                date: d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            };
        }));
    };

    return (
        <div className="container">
            <BackButton />
            <h2 className="text-center" style={{ margin: '1.5rem 0' }}>{t('crop_planner_title')}</h2>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <form onSubmit={generatePlan} className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label>{t('crops_nav')}</label>
                            <select value={crop} onChange={e => setCrop(e.target.value)} required>
                                <option value="">-- {t('choose_crop')} --</option>
                                <option value="wheat">Wheat</option>
                                <option value="paddy">Paddy (Rice)</option>
                                <option value="maize">Maize (Corn)</option>
                                <option value="cotton">Cotton</option>
                                <option value="sugarcane">Sugarcane</option>
                                <option value="tomato">Tomato</option>
                                <option value="potato">Potato</option>
                            </select>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>{t('sowing_date')}</label>
                            <input type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} required />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                        {t('generate_schedule')}
                    </button>
                </form>

                {plan && (
                    <div className={styles.timeline}>
                        <h3 style={{ margin: '1rem 0 1.5rem', textAlign: 'center', color: '#10b981' }}>
                            {t('cultivation_roadmap')}
                        </h3>
                        {plan.map((stage, i) => (
                            <div key={i} className={styles.timelineItem}>
                                <div className={styles.dateCol}>
                                    <span style={{
                                        fontSize: '0.85rem',
                                        fontWeight: 'bold',
                                        color: stage.day < 0 ? '#ef4444' : '#10b981'
                                    }}>
                                        {stage.day === 0 ? t('sowing_day') : stage.day > 0 ? `${t('day_n')} ${stage.day}` : `${Math.abs(stage.day)} ${t('days_before')}`}
                                    </span>
                                    <span className={styles.dateText}>{stage.date}</span>
                                </div>
                                <div className={styles.marker}>
                                    <div className={styles.dot} style={{ backgroundColor: stage.day < 0 ? '#fca5a5' : '#34d399' }}></div>
                                    {i !== plan.length - 1 && <div className={styles.line}></div>}
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.iconBox} style={{ color: '#059669' }}>{stage.icon}</div>
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
