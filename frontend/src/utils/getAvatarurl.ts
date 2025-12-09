// Aceita um segundo parâmetro opcional 'style'
export function getAvatarUrl(seed: string, style: 'bottts' | 'identicon' = 'bottts') {
  // Se não passar nada, usa 'bottts' (robôs)
  // Se passar 'identicon', usa os padrões geométricos
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
}