import React, { useState } from 'react';
import { Camera, AlertTriangle, CheckCircle, Upload } from 'lucide-react';
import BackButton from '../components/BackButton';
import styles from '../styles/DiseaseDetection.module.css';

const DiseaseDetection = () => {
    const [image, setImage] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                analyzeImage();
            };
            reader.readAsDataURL(file);
        }
    };

    const analyzeImage = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setResult({
                name: "Wheat Rust",
                severity: "Moderate",
                treatments: [
                    "Apply fungicide Mancozeb 75 WP @ 2.5 kg/ha",
                    "Remove infected leaves immediately",
                    "Ensure proper drainage"
                ],
                precautions: [
                    "Use rust-resistant varieties",
                    "Avoid excessive nitrogen"
                ]
            });
        }, 2000);
    };

    return (
        <div className="container">
            <BackButton />
            <h2 className="text-center" style={{ margin: '1.5rem 0' }}>Plant Health Doctor</h2>

            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                {!image ? (
                    <div className={styles.uploadArea}>
                        <input type="file" id="file-upload" accept="image/*" onChange={handleImageUpload} hidden />
                        <label htmlFor="file-upload" className={styles.uploadLabel}>
                            <div className={styles.iconCircle}>
                                <Camera size={40} />
                            </div>
                            <h3>Take a photo or upload</h3>
                            <p>Detect pests & diseases instantly</p>
                        </label>
                    </div>
                ) : (
                    <div className={styles.previewContainer}>
                        <img src={image} alt="Uploaded" className={styles.previewImage} />
                        {analyzing && (
                            <div className={styles.overlay}>
                                <div className={styles.scanner}></div>
                                <p>Analyzing Leaf...</p>
                            </div>
                        )}

                        {!analyzing && result && (
                            <div className={styles.resultOverlay}>
                                <div className={styles.resultBadge}>
                                    <AlertTriangle size={16} /> {result.name}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {result && !analyzing && (
                    <div className={styles.resultBox}>
                        <div className={styles.header}>
                            <div className={styles.severityTag}>{result.severity} Severity</div>
                        </div>

                        <div className={styles.section}>
                            <h4><CheckCircle size={18} className="text-green-500" /> Recommended Treatments</h4>
                            <ul>
                                {result.treatments.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                        </div>

                        <div className={styles.section}>
                            <h4>Prevention</h4>
                            <ul>
                                {result.precautions.map((p, i) => <li key={i}>{p}</li>)}
                            </ul>
                        </div>

                        <button className="btn btn-primary w-full" style={{ marginTop: '1rem' }} onClick={() => { setImage(null); setResult(null); }}>
                            Scan Another Crop
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiseaseDetection;
