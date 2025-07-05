function Stat({ value, label }) {
    const isCurrency = label === 'Total Sales' || label === 'Total Sales by User';

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