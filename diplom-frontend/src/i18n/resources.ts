import { drawerListResources } from 'components/drawer-list'
import { equipmentAssignmentResources } from 'components/equipment-assignment-table/i18n'
import { equipmentResources } from 'components/equipment-table/i18n'
import { maintenanceResources } from 'components/maintenance-table'
import { manufacturerResources } from 'components/manufacturer-table'
import { reportResources } from 'components/report-table/i18n'
import { langResources } from 'components/select-language'
import { userTableResources } from 'components/user-table'
import { authResources } from 'pages/auth'
import { validateResources } from 'utils/scheme'

type Resource = Record<string, Record<string, object>>

const combineResources = (resources: Resource[]) => {
  const result: Resource = {
    ru: { translation: {} },
    en: { translation: {} },
  }

  resources.forEach(r => {
    Object.keys(r).forEach(lang => {
      Object.keys(r[lang]).forEach(ns => {
        result[lang][ns] = { ...result[lang][ns], ...r[lang][ns] }
      })
    })
  })

  return result
}

export const resources = combineResources([
  validateResources,
  authResources,
  langResources,
  drawerListResources,
  userTableResources,
  equipmentResources,
  manufacturerResources,
  equipmentAssignmentResources,
  reportResources,
  maintenanceResources,
])
