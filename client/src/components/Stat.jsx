import useStore from "../store/store";

function Stat({ value, label }) {
    const { user } = useStore();
    const isCurrency = label === 'Total Sales' || label === 'Total Sales by User';

    if (user.role !== 'admin' && label === 'Total Sales') {
        return null;
    }

    if (value === undefined || value === null) {
        return null;
    }

    return (
        <div className="stat-card">
            <div className="stat-value">
                {isCurrency ? (
                    <>
                        <span>&#8369;</span>
                        {Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </>
                ) : (
                    value
                )}
            </div>
            <div className="stat-label">{label}</div>
        </div>
    );
}

export default Stat;