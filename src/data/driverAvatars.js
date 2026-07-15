const F1_MEDIA = 'https://media.formula1.com/image/upload/c_fill,w_400,h_400,g_face/q_auto/v1740000000/common/f1/2026';
const F1_LEGACY = 'https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers';

function webp(team, code) {
  return `${F1_MEDIA}/${team}/${code}/2026${team}${code}right.webp`;
}

function legacy(letter, folder, code) {
  return `${F1_LEGACY}/${letter}/${folder}/${code}.png`;
}

/** Official F1 media headshots keyed by canonical full name. */
export const driverAvatars = {
  'George Russell': webp('mercedes', 'georus01'),
  'Kimi Antonelli': webp('mercedes', 'andant01'),
  'Andrea Kimi Antonelli': webp('mercedes', 'andant01'),
  'Isack Hadjar': webp('redbullracing', 'isahad01'),
  'Charles Leclerc': webp('ferrari', 'chalec01'),
  'Oscar Piastri': webp('mclaren', 'oscpia01'),
  'Lando Norris': webp('mclaren', 'lannor01'),
  'Lewis Hamilton': webp('ferrari', 'lewham01'),
  'Liam Lawson': webp('racingbulls', 'lialaw01'),
  'Arvid Lindblad': webp('racingbulls', 'arvlin01'),
  'Gabriel Bortoleto': webp('audi', 'gabbor01'),
  'Nico Hulkenberg': webp('audi', 'nichul01'),
  'Ollie Bearman': webp('haas', 'olibea01'),
  'Oliver Bearman': webp('haas', 'olibea01'),
  'Esteban Ocon': webp('haas', 'estoco01'),
  'Pierre Gasly': webp('alpine', 'piegas01'),
  'Alex Albon': legacy('A', 'ALXALB01_Alexander_Albon', 'alexal001'),
  'Alexander Albon': legacy('A', 'ALXALB01_Alexander_Albon', 'alexal001'),
  'Franco Colapinto': webp('alpine', 'fracol01'),
  'Fernando Alonso': webp('astonmartin', 'feralo01'),
  'Sergio Perez': webp('cadillac', 'serper01'),
  'Valtteri Bottas': webp('cadillac', 'valbot01'),
  'Max Verstappen': webp('redbullracing', 'maxver01'),
  'Carlos Sainz': webp('williams', 'carsai01'),
  'Lance Stroll': webp('astonmartin', 'lanstr01'),
};

export function getDriverAvatar(name) {
  if (!name) return null;
  return driverAvatars[name] ?? null;
}

export function getDriverInitials(name) {
  return (name ?? '')
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
