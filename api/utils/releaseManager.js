import { differenceInDays } from 'date-fns'
import scheduleJSON from '../schedule.json'

export function parseReleases() {
  const scheduleReleases = []
  let yAxisCounter = 0

  const currentLTS = {
    endDate: 0,
    daysRemainingToEOL: 0,
    version: ''
  }
  const newLTS = {
    startDate: 0,
    startActiveDate: 0,
    daysRemainingToStartActive: 0,
    version: ''
  }

  for (const [key, release] of Object.entries(scheduleJSON)) {
    const releaseItems = []
    const releaseFullName = `${key} ${
      release.codename ? ' - ' + release.codename : ''
    }`
    const releaseVersion = key

    const releaseBase = {
      name: releaseFullName,
      phase: releaseVersion,
      start: new Date(release.start).getTime(),
      end: new Date(release.end).getTime(),
      // completed: 0.25
      y: yAxisCounter
    }

    if (!currentLTS.endDate) {
      const currentTime = new Date().getTime()
      const releaseEndTime = new Date(release.end).getTime()
      if (currentTime < releaseEndTime) {
        currentLTS.endDate = releaseEndTime
        currentLTS.daysRemainingToEOL = differenceInDays(
          new Date(currentLTS.endDate),
          new Date()
        )
        currentLTS.version = releaseVersion
      }
    }

    if (release.lts) {
      newLTS.startDate = new Date(release.start).getTime()
      newLTS.startActiveDate = new Date(release.lts).getTime()
      newLTS.daysRemainingToStartActive = differenceInDays(
        newLTS.startActiveDate,
        new Date()
      )
      newLTS.version = releaseVersion
    }

    if (release.lts && release.maintenance) {
      releaseBase.end = new Date(release.lts).getTime()

      const releaseLts = {
        name: releaseFullName,
        phase: 'LTS',
        start: new Date(release.lts).getTime(),
        end: new Date(release.maintenance).getTime(),
        y: yAxisCounter
      }

      const releaseMaintenance = {
        name: releaseFullName,
        phase: 'Maintenance',
        start: new Date(release.maintenance).getTime(),
        end: new Date(release.end).getTime(),
        y: yAxisCounter
      }

      releaseItems.push(releaseBase, releaseLts, releaseMaintenance)
    } else if (release.maintenance) {
      releaseBase.end = new Date(release.maintenance).getTime()

      const releaseMaintenance = {
        name: releaseFullName,
        phase: 'Maintenance',
        start: new Date(release.maintenance).getTime(),
        end: new Date(release.end).getTime(),
        y: yAxisCounter
      }

      releaseItems.push(releaseBase, releaseMaintenance)
    } else {
      releaseItems.push(releaseBase)
    }

    scheduleReleases.push(...releaseItems)
    yAxisCounter++
  }

  return {
    currentLTS,
    newLTS,
    firstReleaseStartDate: scheduleReleases[0].start,
    lastReleaseEndDate: scheduleReleases[scheduleReleases.length - 1].end,
    releasesSortedDesc: scheduleReleases.reverse()
  }
}
