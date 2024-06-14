import { useState, useEffect } from "react";
import style from "src/components/Cohort/style/cohort.module.scss";

interface ProgressBarProps {
    percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const progressTimeout = setTimeout(() => {
            setProgress(percentage);
        }, 1000);
        return () => clearTimeout(progressTimeout);
    }, []);

    return (
        <div style={{
            width: "324px",
            height: "9.88px",
            flexShrink: "0",
            borderRadius: "16px",
            background: "#F0F4F4",
            marginTop:"7px"
        }}>
            <div style={{
                width: `${progress}%`,
                height: "9.88px",
                flexShrink: "0",
                borderRadius: "16px 0 0 16px",
                background: "#095AD3"
            }}></div>
        </div>
    );
};

export default ProgressBar;
