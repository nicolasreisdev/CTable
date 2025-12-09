
export function getAvatarUrl(seed: string, style: 'bottts' | 'identicon' = 'bottts') {
  
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
}