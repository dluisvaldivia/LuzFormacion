import type { IconType } from 'react-icons'
import { LuChefHat, LuHotel, LuLeaf, LuTruck, LuWrench, LuHardHat } from 'react-icons/lu'

/** Empresas inventadas para la demo; el pie de página lo indica. */
export type Client = {
  name: string
  icon: IconType
}

export const CLIENTS: Client[] = [
  { name: 'Hoteles Brisalta', icon: LuHotel },
  { name: 'Verdial Jardines', icon: LuLeaf },
  { name: 'Talleres Arenal', icon: LuWrench },
  { name: 'Almenar Obras', icon: LuHardHat },
  { name: 'Logimar Sur', icon: LuTruck },
  { name: 'Cítrico Catering', icon: LuChefHat },
]
