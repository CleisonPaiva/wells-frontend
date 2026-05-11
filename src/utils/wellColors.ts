//O ?? é o operador nullish coalescing — se não encontrar o status no objeto, retorna cinza.

export const STATUS_COLORS: Record<string, string> = {
    // Ativos → verde
    'PRODUZINDO': '#00C853',
    'PRODUZINDO E INJETANDO': '#00C853',
    'INJETANDO': '#00C853',
    'EM PERFURAÇÃO': '#00BFFF',
    'EM COMPLETAÇÃO': '#00BFFF',
    'EM AVALIAÇÃO': '#00BFFF',
    'EM INTERVENÇÃO': '#00BFFF',
    'EM OBSERVAÇÃO': '#00BFFF',
    'EQUIPADO AGUARDANDO INÍCIO DE OPERAÇÃO': '#FFA500',
    'EQUIPADO AGUARDANDO INÍCIO DE PRODUÇÃO': '#FFA500',
    // Abandonados → vermelho
    'ABANDONADO PERMANENTEMENTE': '#FF3D00',
    'ARRASADO': '#FF3D00',
    'ABANDONADO AGUARDANDO ABANDONO DEFINITIVO/ARRASAMENTO': '#FF3D00',
    'ABANDONADO POR LOGÍSTICA EXPLORATÓRIA': '#FF3D00',
    // Temporários → amarelo
    'ABANDONADO TEMPORARIAMENTE COM MONITORAMENTO': '#FFD600',
    'ABANDONADO TEMPORARIAMENTE SEM MONITORAMENTO': '#FFD600',
    'ABANDONADO/PARADO AGUARDANDO INTERVENÇÃO PARA AVALIAÇÃO, COMPLETAÇÃO OU RESTAURAÇÃO': '#FFD600',
    // Outros → cinza
    'DEVOLVIDO': '#9E9E9E',
    'FECHADO': '#9E9E9E',
    'OUTRO': '#9E9E9E',
    'CEDIDO PARA A CAPTAÇÃO DE ÁGUA': '#2196F3',
    'OPERANDO PARA CAPTAÇÃO DE ÁGUA': '#2196F3',
    'OPERANDO PARA DESCARTE': '#2196F3',
};

export function getWellColor(status: string | undefined): string {
    if (!status) return '#9E9E9E';
    return STATUS_COLORS[status] ?? '#9E9E9E';
}