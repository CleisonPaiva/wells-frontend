import { useState } from "react";
import { importWells } from "../services/wellService.ts";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { ProgressBar } from "primereact/progressbar";

export default function ImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImport = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);
        setSuccess(false);

        importWells(file)
            .then(() => { setSuccess(true); setFile(null); })
            .catch(() => setError('Erro ao importar. Verifique o formato e tente novamente.'))
            .finally(() => setLoading(false));
    };

    return (
        <div style={{ padding: '32px 40px', maxWidth: 600 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Importar Poços</h1>
            <p style={{ color: '#888', marginBottom: 32 }}>
                Envie um arquivo CSV exportado do portal ANP para atualizar os dados.
            </p>

            <div style={{ border: '2px dashed #333', borderRadius: 8, padding: 32, textAlign: 'center', marginBottom: 24 }}>
                <i className="pi pi-upload" style={{ fontSize: 32, color: '#888', marginBottom: 16, display: 'block' }} />
                <p style={{ color: '#888', marginBottom: 16 }}>Selecione o arquivo CSV</p>
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                <Button
                    label="Escolher arquivo"
                    icon="pi pi-folder-open"
                    text
                    onClick={() => document.getElementById('fileInput')?.click()}
                />
                {file && (
                    <p style={{ marginTop: 12, color: 'white' }}>
                        <i className="pi pi-file" /> {file.name}
                    </p>
                )}
            </div>

            {loading && <ProgressBar mode="indeterminate" style={{ marginBottom: 16 }} />}
            {success && <Message severity="success" text="Importação concluída com sucesso!" style={{ width: '100%', marginBottom: 16 }} />}
            {error && <Message severity="error" text={error} style={{ width: '100%', marginBottom: 16 }} />}

            <Button
                label={loading ? 'Importando...' : 'Importar'}
                icon="pi pi-upload"
                disabled={!file || loading}
                onClick={handleImport}
                style={{ width: '100%' }}
            />
        </div>
    );
}