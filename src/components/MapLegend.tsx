export default function MapLegend() {
    const items = [
        { color: '#00C853', label: 'Produzindo' },
        { color: '#00BFFF', label: 'Em perfuração / avaliação' },
        { color: '#FFA500', label: 'Aguardando início' },
        { color: '#FFD600', label: 'Abandonado temporariamente' },
        { color: '#FF3D00', label: 'Abandonado permanentemente' },
        { color: '#2196F3', label: 'Captação de água' },
        { color: '#9E9E9E', label: 'Outros' },
    ];

    return (
        <div style={{
            position: 'absolute',
            bottom: 30,
            left: 10,
            background: 'rgba(0,0,0,0.7)',
            padding: '10px',
            borderRadius: '8px',
            color: 'white',
            zIndex: 1000
        }}>
            <b>Legenda</b>
            {items.map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color }} />
                    <span>{item.label}</span>
                </div>
            ))}
        </div>
    );
}